import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './user.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { User } from '../models/user';



@Injectable()
export class AuthService {

  user$: Observable<firebase.User>;
  
  constructor(private angularFireAuth: AngularFireAuth,
              private userService: UserService ) { 
    this.user$ = angularFireAuth.authState;    
  }


  login(value: string, email?, password?, isRememberMe?): Promise<any>{
    let promise;
    if(value === 'google'){
    promise = this.angularFireAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    }
    else if(value === 'facebook'){
    promise = this.angularFireAuth.auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider());
    }
    else if(value === 'emailAndPwd'){
      if (isRememberMe){
        promise = this.angularFireAuth.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(()=> {
          return this.angularFireAuth.auth.signInWithEmailAndPassword(email, password);
        });
      } 
      else{
        promise = this.angularFireAuth.auth.setPersistence(firebase.auth.Auth.Persistence.SESSION)
        .then(()=> {
          return this.angularFireAuth.auth.signInWithEmailAndPassword(email, password);
        });
      }
    }
    return promise;
  }

  logout(){
    this.angularFireAuth.auth.signOut();
  }

  get appUser$(): Observable<User> {
    return this.user$.switchMap(user => {
      if(user){
      let object =  this.userService.get(user.uid);
      return object.valueChanges();
      }
      else{
        return Observable.of(null);
      }
    })
  }

  sendEmailVerifiction(user: firebase.User): Promise<any>{
     return user.sendEmailVerification();
  }

  restorePassword(email: string): Promise<any>{
    return this.angularFireAuth.auth.sendPasswordResetEmail(email);
  }

}


