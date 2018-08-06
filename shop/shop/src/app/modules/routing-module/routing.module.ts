import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../../components/home/home.component';
import { ProductsComponent } from '../../components/products/products.component';
import { ShoppingCartComponent } from '../../components/shopping-cart/shopping-cart.component';
import { CheckOutComponent } from '../../components/check-out/check-out.component';
import { OrderSuccessComponent } from '../../components/order-success/order-success.component';
import { LoginComponent } from '../../components/login/login.component';
import { AdminProductsComponent } from '../../components/admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from '../../components/admin/admin-orders/admin-orders.component';
import { OrdersComponent } from '../../components/orders/orders.component';
import { AuthGuardService } from '../../services/auth-guard.service';
import { AdminAuthGuardService } from '../../services/admin-auth-guard.service';
import { ProductFormComponent } from '../../components/admin/product-form/product-form.component';
import { SignUpComponent } from '../../components/login/sign-up/sign-up.component';
import { SignInComponent } from '../../components/login/sign-in/sign-in.component';

const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'login/sign-up', component: SignUpComponent },
  { path: 'login/sign-in', component: SignInComponent },
  { path: 'login', component: LoginComponent },
  
  { path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuardService] },
  { path: 'order-success', component: OrderSuccessComponent, canActivate: [AuthGuardService] },
  { path: 'order-success', component: OrderSuccessComponent, canActivate: [AuthGuardService] },
  { path: 'my/orders', component: OrdersComponent, canActivate: [AuthGuardService] },

  { path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AuthGuardService, AdminAuthGuardService]},
  { path: 'admin/products/new', component: ProductFormComponent, canActivate: [AuthGuardService, AdminAuthGuardService]},
  { path: 'admin/products/:id', component: ProductFormComponent, canActivate: [AuthGuardService, AdminAuthGuardService]},
  { path: 'admin/products', component: AdminProductsComponent, canActivate: [AuthGuardService, AdminAuthGuardService]}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
   RouterModule 
  ],
  declarations: []
})
export class RoutingModule { }
