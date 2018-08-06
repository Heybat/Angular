import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { query } from '@angular/core/src/animation/dsl';
import { Category } from '../models/category';

@Injectable()
export class CategoryService {

  constructor(private firebase: AngularFireDatabase) { }

  getAll() {
    return this.firebase.list('/categories', data => {
      return data.orderByChild('name');
  }).snapshotChanges().map(actions => {
      let array: Category[] = [];
      actions.forEach(action =>  { 
      array.push({
        key: action.key,
        name: action.payload.val().name
       })
    });
    return array;
  });
  }
}
