import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService<Product> {

  public override entityName: string = 'product';

  constructor(
    public override http: HttpClient
  ) {
    super(http);
  }
}
