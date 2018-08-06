import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../models/user';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {

  constructor(private db: AngularFireDatabase, private angularFireAuth: AngularFireAuth) { }
  
  save(user: firebase.User){  
    this.db.object('/users/' + user.uid).update(
      (user.displayName) ? 
      { name: user.displayName,
        email: user.email } 
      : 
      { email: user.email }
    );
  }

  saveUserData(userUid:string, gender?: string, firstName?: string, lastName?: string, city?: string, address?: string ){
      return this.db.object('/users/' + userUid).update({
      'gender': gender,
      'name': firstName + ' ' + lastName,
      'city': city,
      'address': address,
      'isEmailVerified': false
    });
  }

  get(uid: string):AngularFireObject<User> {
      return this.db.object('/users/' + uid);
  }

  getAll(){
    return this.db.list<User>('users').snapshotChanges().map(actions => {
      let array: User[] = [];
      actions.forEach(action =>  { 
      array.push({
      key: action.key, 
      name: action.payload.val().name,
      gender: action.payload.val().gender,
      city: action.payload.val().city,
      address: action.payload.val().address,
      email: action.payload.val().email,
      isEmailVerified: action.payload.val().isEmailVerified
       })
    });
    return array;
  });
  }

  createUserWithEmailAndPassword(email: string, password: string): Promise<firebase.User>{
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  getUserByEmail(email: string): Observable<User>{
    let userOut = null;
     return this.getAll().map((users)=>{
       users.forEach((user) => {
        if(user.email.toLowerCase() === email.toLowerCase()){
          console.log(JSON.stringify(user));  
          userOut = user; 
        }
      }) 
      return userOut;
    })
  }
}
