import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Customer } from 'src/app/model/customer';
import { Order } from 'src/app/model/order';
import { Product } from 'src/app/model/product';
import { ConfigService } from 'src/app/service/config.service';
import { CustomerService } from 'src/app/service/customer.service';
import { OrderService } from 'src/app/service/order.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss']
})
export class EditOrderComponent {

  order$: Observable<Order | null> = this.orderService.selected$;
  customerList$: Observable<Customer[]> = this.customerService.list$;
  productList$: Observable<Product[]> = this.productService.list$;


  constructor(
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
          params => this.orderService.get(params['id'])
        )
      }
      else {
        this.order$ = of(new Order)
      }
    });
    //this.customerService.getAll();
    //this.productService.getAll();
  }

  onUpdate(order: Order): void {

    if (order.id === 0) {
      this.orderService.create(order);
    }
    else {
      this.orderService.update(order);
    }
    this.router.navigate(['/', 'orders']);

  }
}

