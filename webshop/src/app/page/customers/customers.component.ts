import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Customer } from 'src/app/model/customer';
import { ConfigService } from 'src/app/service/config.service';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit {

  customerList$: Observable<Customer[]> = this.customerService.list$
    .pipe(map(result => result.map(customer => {
      // a pruducthoz fölveszünk egy új propertyt, a catID-nek megfelelő categoryt
      customer['addressText'] = `${customer.address.zip} ${customer.address.country} ${customer.address.city} ${customer.address.street}`
      return customer
    }))
    )

  columns = this.config.customerTableColumns;

  constructor(
    private customerService: CustomerService,
    private config: ConfigService,
  ) { }

  ngOnInit(): void {
    this.customerService.getAll();
  }

  onCustomerSelect(customer: Customer): void {
    console.log(customer);
    //this.router.navigate(['/', 'customer', 'edit', customer.id]);
  }

  onCustomerDelete(customer: Customer): void {
    console.log(customer);
    //this.router.navigate(['/', 'customer', 'edit', customer.id]);
  }
}
