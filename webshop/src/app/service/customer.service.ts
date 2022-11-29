import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../model/customer';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends BaseService<Customer> {

  public override entityName: string = 'customer';

  constructor(
    public override http: HttpClient
  ) {
    super(http);
  }
}
