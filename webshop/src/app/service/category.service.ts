import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Category } from '../model/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService<Category> {

  public override entityName: string = 'category';

  constructor(
    public override http: HttpClient
  ) {
    super(http);
  }
}
