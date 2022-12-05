import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest, map, Observable } from 'rxjs';
import { Bill } from 'src/app/model/bill';
import { BillService } from 'src/app/service/bill.service';
import { ConfigService } from 'src/app/service/config.service';
import { CustomerService } from 'src/app/service/customer.service';
import { OrderService } from 'src/app/service/order.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.scss'],
})
export class BillsComponent implements OnInit {


  billList$: Observable<Bill[]> = combineLatest({
    bill: this.billService.list$,
    ord: this.orderService.list$,
    cust: this.customerService.list$,
    prod: this.productService.list$,
  }).pipe(map(result => result.bill.map(curbill => {

    let curord = result.ord.find(o => o.id === curbill.orderID);

    let curcust = result.cust.find(c => c.id === curord?.customerID);

    curbill['customerFirstName'] = curcust?.firstName;
    curbill['customerLastName'] = curcust?.lastName;
    curbill['customerEmail'] = curcust?.email;

    let curprod = result.prod.find(p => p.id === curord?.productID);
    curbill['customerProductName'] = curprod?.name;
    curbill['customerProductPrice'] = curprod?.price;

    let prodprice = curprod?.price;
    if (!prodprice) prodprice = 1;
    let ordamount = curord?.amount;
    if (!ordamount) ordamount = 1;

    curbill['totalPrice'] = ordamount * prodprice;

    return curbill;
  }))
  )

  columns = this.config.billTableColumns;

  constructor(
    private billService: BillService,
    private orderService: OrderService,
    private customerService: CustomerService,
    private productService: ProductService,
    private config: ConfigService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.billService.getAll();
    this.orderService.getAll();
    this.customerService.getAll();
    this.productService.getAll();
  }


  onBillSelect(bill: Bill): void {
    //console.log(bill);
    this.router.navigate(['/', 'bill', 'edit', bill.id]);
  }

  onBillNew(): void {
    //console.log(bill);
    this.router.navigate(['/', 'bill', 'edit', 0]);
  }

  onBillDelete(bill: Bill): void {
    //console.log(bill);
    this.orderService.delete(bill.id);
  }
}

