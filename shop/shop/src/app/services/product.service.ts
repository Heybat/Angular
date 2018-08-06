import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Product } from '../models/product';

@Injectable()
export class ProductService {

  constructor(private db: AngularFireDatabase) { }


  create(product){
   return this.db.list('/products').push(product);
  }

  getAll(){
    return this.db.list<Product>('products').snapshotChanges().map(actions => {
      let array: Product[] = [];
      actions.forEach(action =>  { 
      array.push({
      key: action.key, 
      title: action.payload.val().title,
      price: action.payload.val().price,
      category: action.payload.val().category,
      imageUrl: action.payload.val().imageUrl
       })
    });
    return array;
  });
  }

  get(productId){
    return this.db.object<Product>('/products/' + productId).valueChanges();
  }

  update(productId, product){
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId){
    return this.db.object('/products/' + productId).remove();
  }

}
