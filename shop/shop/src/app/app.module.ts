import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './components/main/app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { HomeComponent } from './components/home/home.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ProductsComponent } from './components/products/products.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { AdminProductsComponent } from './components/admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './components/admin/admin-orders/admin-orders.component';
import { RoutingModule } from './modules/routing-module/routing.module';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OrdersComponent } from './components/orders/orders.component';
import { AuthService } from './services/auth.service';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { AuthGuardService } from './services/auth-guard.service';
import { UserService } from './services/user.service';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { ProductFormComponent } from './components/admin/product-form/product-form.component';
import { CategoryService } from './services/category.service';
import { FormsModule } from '@angular/forms';
import { ProductService } from './services/product.service';
import { CustomFormsModule } from 'ng2-validation'
import { DataTableModule } from 'angular5-data-table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material-module/material.module';
import { ProgressBarService } from './services/progress-bar.service';
import { ProductFilterComponent } from './components/products/product-filter/product-filter.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ShoppingCartService } from './services/shopping-cart.service';
import { SignInComponent } from './components/login/sign-in/sign-in.component';
import { SignUpComponent } from './components/login/sign-up/sign-up.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CityService } from './services/city.service';
import { LimitSymbolsPipe } from './pipes/limit-symbols.pipe';
import { HttpClientModule, HttpClient } from '@angular/common/http';






@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ShoppingCartComponent,
    ProductsComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    OrdersComponent,
    NavigationBarComponent,
    ProductFormComponent,
    ProductFilterComponent,
    ProductCardComponent,
    SignInComponent,
    SignUpComponent,
    LimitSymbolsPipe
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RouterModule,
    RoutingModule, 
    NgbModule.forRoot(),
    FormsModule,
    CustomFormsModule,
    DataTableModule,
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AuthService, AuthGuardService, UserService,
              AdminAuthGuardService, CategoryService, ProductService,
              ProgressBarService, ShoppingCartService, CityService, 
              HttpClientModule],
     
  bootstrap: [AppComponent]
})
export class AppModule { }
