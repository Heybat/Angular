import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { Observable } from 'rxjs/Observable';
import { Category } from '../../../models/category';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss']
})
export class ProductFilterComponent {

  categories$: Observable<Category[]>;
  @Input('category') category: string;

  constructor(private categoryService: CategoryService ) {
    this.categories$ = this.categoryService.getAll();
   }


}
