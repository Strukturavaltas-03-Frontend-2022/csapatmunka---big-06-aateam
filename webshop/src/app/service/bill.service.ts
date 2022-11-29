import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bill } from '../model/bill';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class BillService extends BaseService<Bill> {

  public override entityName: string = 'bill';

  constructor(
    public override http: HttpClient
  ) {
    super(http);
  }
}

