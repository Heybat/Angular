import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { ProductService } from './../../../services/product.service';
import { Subscription } from 'rxjs/Subscription';
import { query } from '@angular/core/src/animation/dsl';
import { Product } from '../../../models/product';
import { DataTableResource } from 'angular5-data-table'; 
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnDestroy, AfterViewInit {

  products: Product[];
  subscription: Subscription;
  filteredProducts: Product[];
  displayedColumns = ['title', 'price', 'link'];
  dataSource: MatTableDataSource<Product>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll().subscribe(products => {
      this.filteredProducts = this.products = products;
      this.initializeTable(products);
    });
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private initializeTable(products: Product[]) {
    this.dataSource = new MatTableDataSource(products);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  filter(query: string){
    this.filteredProducts = (query) ? this.products.filter(product => product.title.toLowerCase().includes(query.trim().toLowerCase())) : this.products;
    this.initializeTable(this.filteredProducts);
  }

}
