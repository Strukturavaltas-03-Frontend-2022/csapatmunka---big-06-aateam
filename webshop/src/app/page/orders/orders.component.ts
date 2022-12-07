import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { combineLatest, map, Observable } from 'rxjs';
import { Order } from 'src/app/model/order';
import { ConfigService } from 'src/app/service/config.service';
import { CustomerService } from 'src/app/service/customer.service';
import { OrderService } from 'src/app/service/order.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orderList$: Observable<Order[]> = combineLatest({
    ord: this.orderService.list$,
    cust: this.customerService.list$,
    prod: this.productService.list$,
  }).pipe(map(result => result.ord.map(order => {

    let curcust = result.cust.find(c => c.id === order.customerID);
    order['customerFirstName'] = curcust?.firstName;
    order['customerLastName'] = curcust?.lastName;
    order['customerEmail'] = curcust?.email;

    let curprod = result.prod.find(p => p.id === order.productID);
    order['customerProductName'] = curprod?.name;
    order['customerProductPrice'] = curprod?.price;

    let prodprice = curprod?.price;
    if (!prodprice) prodprice = 1;

    order['orderPrice'] = order.amount * prodprice;

    return order;
  }))
  )

  columns = this.config.orderTableColumns;

  constructor(
    private orderService: OrderService,
    private customerService: CustomerService,
    private productService: ProductService,
    private config: ConfigService,
    private router: Router,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.orderService.getAll();
    this.customerService.getAll();
    this.productService.getAll();
  }


  onOrderSelect(order: Order): void {
    console.log(order);
    this.router.navigate(['/', 'order', 'edit', order.id]);
  }

  onOrderNew(): void {
    //console.log(order);
    this.router.navigate(['/', 'order', 'edit', 0]);
  }

  onOrderDelete(order: Order): void {
    //console.log(order);
    this.orderService.delete(order.id);
    this.toastrService.success('Item deleted successfully!', 'OK', {
      timeOut: 5000,
      positionClass: 'toast-top-right',
      progressBar: true,
    });
  }
}
