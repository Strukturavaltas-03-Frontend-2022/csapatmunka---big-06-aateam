import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Order } from '../model/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends BaseService<Order> {

  public override entityName: string = 'order';

  constructor(
    public override http: HttpClient
  ) {
    super(http);
  }
}
