import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { HomeComponent } from './page/home/home.component';
import { HeaderComponent } from './common/header/header.component';
import { SingInComponent } from './page/sing-in/sing-in.component';
import { SingUpComponent } from './page/sing-up/sing-up.component';
import { ProductsComponent } from './page/products/products.component';
import { OrdersComponent } from './page/orders/orders.component';
import { CustomersComponent } from './page/customers/customers.component';
import { BillsComponent } from './page/bills/bills.component';
import { ProfileComponent } from './page/profile/profile.component';
import { DataTableComponent } from './common/data-table/data-table.component';
import { SorterPipe } from './common/data-table/pipe/sorter.pipe';
import { FilterPipe } from './pipe/filter.pipe';
import { EditProductComponent } from './page/edit-product/edit-product.component';
import { TableColumnSumPipe } from './pipe/table-column-sum.pipe';
import { EditCustomerComponent } from './page/edit-customer/edit-customer.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HomeComponent,
    HeaderComponent,
    SingInComponent,
    SingUpComponent,
    ProductsComponent,
    OrdersComponent,
    CustomersComponent,
    BillsComponent,
    ProfileComponent,
    DataTableComponent,
    SorterPipe,
    FilterPipe,
    EditProductComponent,
    TableColumnSumPipe,
    EditCustomerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
