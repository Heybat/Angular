import { Component, OnInit } from '@angular/core';
import { ProductService } from './../../services/product.service';
import { Observable } from 'rxjs/Observable';
import { Product } from '../../models/product';
import { Category } from '../../models/category';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;

  constructor(private productService: ProductService, 
              private actvatedRoute: ActivatedRoute) { 
    this.productService.getAll().switchMap(products => {
      this.products = products;
      return actvatedRoute.queryParamMap;
    }).subscribe( params => {
        this.category = params.get('category');
  
        this.filteredProducts = (this.category) ? this.products.filter(p => p.category === this.category) : this.products;
      })
  }

 

}
