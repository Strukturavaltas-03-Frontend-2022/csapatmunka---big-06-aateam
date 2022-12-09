import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillsComponent } from './page/bills/bills.component';
import { CategoriesComponent } from './page/categories/categories.component';
import { CustomersComponent } from './page/customers/customers.component';
import { EditBillComponent } from './page/edit-bill/edit-bill.component';
import { EditCategoriesComponent } from './page/edit-categories/edit-categories.component';
import { EditCustomerComponent } from './page/edit-customer/edit-customer.component';
import { EditOrderComponent } from './page/edit-order/edit-order.component';
import { EditProductComponent } from './page/edit-product/edit-product.component';
import { HomeComponent } from './page/home/home.component';
import { OrdersComponent } from './page/orders/orders.component';
import { ProductsComponent } from './page/products/products.component';
import { ProfileComponent } from './page/profile/profile.component';
import { SingInComponent } from './page/sing-in/sing-in.component';
import { SingUpComponent } from './page/sing-up/sing-up.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'products',
    component: ProductsComponent,
  },
  {
    path: 'product/edit/:id',
    component: EditProductComponent
  },
  {
    path: 'customers',
    component: CustomersComponent,
  },
  {
    path: 'customer/edit/:id',
    component: EditCustomerComponent,
  },
  {
    path: 'orders',
    component: OrdersComponent,
  },
  {
    path: 'order/edit/:id',
    component: EditOrderComponent,
  },
  {
    path: 'bills',
    component: BillsComponent,
  },
  {
    path: 'bill/edit/:id',
    component: EditBillComponent,
  },
  {
    path: 'categories',
    component: CategoriesComponent,
  },
  {
    path: 'category/edit/:id',
    component: EditCategoriesComponent,
  },
  {
    path: 'bill/edit/:id',
    component: EditCategoriesComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'signin',
    component: SingInComponent,
  },
  {
    path: 'signup',
    component: SingUpComponent,
  },
  {
    path: '**',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
