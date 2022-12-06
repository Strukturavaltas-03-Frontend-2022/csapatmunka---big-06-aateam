import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Bill } from 'src/app/model/bill';
import { Customer } from 'src/app/model/customer';
import { Order } from 'src/app/model/order';
import { Product } from 'src/app/model/product';
import { BillService } from 'src/app/service/bill.service';
import { CustomerService } from 'src/app/service/customer.service';
import { OrderService } from 'src/app/service/order.service';
import { ProductService } from 'src/app/service/product.service';

export interface Statistics {
  icon: string;
  class: string;
  title: string;
  content: any;
  footer: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  billList$: BehaviorSubject<Bill[]> = this.billService.list$;
  customerList$: BehaviorSubject<Customer[]> = this.customerService.list$;
  orderList$: BehaviorSubject<Order[]> = this.orderService.list$;
  productList$: BehaviorSubject<Product[]> = this.productService.list$;

  notPaidOrders = this.orderList$.pipe(
    map(params => params.filter(item => item.status === 'new' || item.status === 'shipped')?.length));

  activeCustomers = this.customerList$.pipe(
    map(params => params.filter(item => item.active)?.length));

  activeProducts = this.productList$.pipe(
    map(params => params.filter(item => item.active)?.length));

  notPaidBillsAmount = this.billList$.pipe(
    map(params => params.filter(item => item.status === 'new').
      reduce((acc, one) => acc + parseInt('' + one.amount), 0)));

  /*
    stats: Statistics[] = [
      {
        title: 'Customers',
        content: this.activeCustomers,
        class: 'card-header-warning',
        footer: 'Number of active customers.',
        icon: 'account_circle',
      },
      {
        title: 'Products',
        content: this.activeProducts,
        cardClass: 'card-header-success',
        footer: 'Number of active products.',
        icon: 'store',
      },
      {
        title: 'Orders',
        content: this.notPaidOrders,
        cardClass: 'card-header-primary',
        footer: 'Number of unpaid orders.',
        icon: 'content_paste',
      },
      {
        title: 'Invoices',
        content: this.notPaidBillsAmount,
        cardClass: 'card-header-info',
        footer: 'Amount of unpaid bills in HUF.',
        icon: 'library_books',
      }
    ];
  */
  constructor(
    private billService: BillService,
    private customerService: CustomerService,
    private orderService: OrderService,
    private productService: ProductService,
  ) { }

  ngOnInit(): void {
    this.billService.getAll();
    this.customerService.getAll();
    this.orderService.getAll();
    this.productService.getAll();
  }

}
