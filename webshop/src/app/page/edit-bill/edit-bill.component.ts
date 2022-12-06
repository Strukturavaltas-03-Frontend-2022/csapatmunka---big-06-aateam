import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, map, Observable, of } from 'rxjs';
import { Bill } from 'src/app/model/bill';
import { Customer } from 'src/app/model/customer';
import { Order } from 'src/app/model/order';
import { Product } from 'src/app/model/product';
import { BillService } from 'src/app/service/bill.service';
import { ConfigService } from 'src/app/service/config.service';
import { CustomerService } from 'src/app/service/customer.service';
import { OrderService } from 'src/app/service/order.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-edit-bill',
  templateUrl: './edit-bill.component.html',
  styleUrls: ['./edit-bill.component.scss']
})
export class EditBillComponent {

  bill$: Observable<Bill | null> = this.billService.selected$;
  //orderList$: Observable<Order[]> = this.orderService.list$;
  //customerList$: Observable<Customer[]> = this.customerService.list$;
  //productList$: Observable<Product[]> = this.productService.list$;

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

  orderStatus: string[] = this.config.orderStatus;
  billStatus: string[] = this.config.billStatus;

  constructor(
    private billService: BillService,
    private orderService: OrderService,
    private customerService: CustomerService,
    private productService: ProductService,
    private config: ConfigService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['id'] !== '0') {
        this.activatedRoute.params.subscribe(
          params => this.billService.get(params['id'])
        )
      }
      else {
        this.bill$ = of(new Bill)
      }
    });

    // ha nincs adat
    if (this.orderService.list$.getValue().length === 0)
      this.orderService.getAll();
    if (this.customerService.list$.getValue().length === 0)
      this.customerService.getAll();
    if (this.productService.list$.getValue().length === 0)
      this.productService.getAll();
  }

  onUpdate(bill: Bill): void {

    if (typeof bill.orderID != 'number') bill.orderID = parseInt(bill.orderID);

    if (bill.id === 0) {
      this.billService.create(bill);
    }
    else {
      this.billService.update(bill);
    }
    this.router.navigate(['/', 'bills']);
  }
}
