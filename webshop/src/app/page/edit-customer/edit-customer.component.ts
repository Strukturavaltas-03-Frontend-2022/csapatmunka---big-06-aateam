import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { Customer } from 'src/app/model/customer';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent {
  customer$: Observable<Customer | null> = this.customerService.selected$;


  constructor(
    private customerService: CustomerService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    // this.activatedRoute.params.subscribe(params => console.log(params['id']));
    this.activatedRoute.params.subscribe(params => {
      if (params['id'] !== '0') {
        //console.log('params[id]', params['id'])
        this.activatedRoute.params.subscribe(
          params => this.customerService.get(params['id'])
        )
      }
      else {
        this.customer$ = of(new Customer());
      }
    });
    //ha nincs adat
    if (this.customerService.list$.getValue().length === 0)
      this.customerService.getAll();
  }

  onUpdate(customer: Customer): void {

    if (customer.id === 0) {
      this.customerService.create(customer);
    }
    else {
      this.customerService.update(customer);
    }
    this.router.navigate(['/', 'customers']);

    this.toastrService.success('Item saved successfully!', 'OK', {
      timeOut: 5000,
      positionClass: 'toast-top-right',
      progressBar: true,
    });

  }
}
