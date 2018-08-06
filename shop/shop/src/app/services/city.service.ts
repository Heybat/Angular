import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { City } from '../models/city';
import { NavigationBarComponent } from './../components/navigation-bar/navigation-bar.component';

@Injectable()
export class CityService {



  constructor(private db: AngularFireDatabase) { }

  getAll(){
    let array: City[] = [];
    return this.db.list('/cities').snapshotChanges()
    .map(actions => {
      actions.forEach(action => 
      array.push({
      key: action.key,
      name: action.payload.val().name
    }))
    return array;
    }
    );
  }
}
