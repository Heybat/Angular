import { Component, OnInit } from '@angular/core';
import { CategoryService } from './../../../services/category.service';
import { ProductService } from '../../../services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';
import { Product } from '../../../models/product';
import { Observable } from 'rxjs/Observable';
import { Category } from '../../../models/category';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  categories$: Observable<Category[]>;
  product: Product = {};
  id: string;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private categoryService: CategoryService,
              private productService: ProductService) {
    this.categories$ = categoryService.getAll();

     this.id = this.activatedRoute.snapshot.paramMap.get('id');
     if(this.id){
       this.productService.get(this.id).take(1).subscribe(product =>  this.product = product );
     }


   }

  ngOnInit() {
  }

  save(product){
    if(this.id){
      this.productService.update(this.id, product);
    }
    else{
      this.productService.create(product);
    }
    this.router.navigate(['/admin/products']);
  }

  delete(){
    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);    
  }

}
