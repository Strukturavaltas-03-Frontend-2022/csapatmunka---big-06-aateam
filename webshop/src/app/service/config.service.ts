import { Injectable } from '@angular/core';
import { ValidatorFn, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

export interface ITableColumn {
  title: string;
  key: string;
  mode: string;
}

/*
export class FormField {
  label: string = '';
  key: string = '';
  type?: string = 'text';
  required?: boolean = true;
  validators?: ValidatorFn[] = [];
}
*/

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  //searchPhrase$: BehaviorSubject<string> = new BehaviorSubject('');

  productTableColumns: ITableColumn[] = [
    { title: 'ID', key: 'id', mode: 'length' },
    { title: 'Name', key: 'name', mode: '' },
    { title: 'Type', key: 'type', mode: '' },
    { title: 'Cat.', key: 'category', mode: '' },
    { title: 'Desc.', key: 'description', mode: '' },
    { title: 'Price', key: 'price', mode: 'sum' },
    { title: 'Featured', key: 'featured', mode: '' },
    { title: 'Active', key: 'active', mode: '' }
  ];

  customerTableColumns: ITableColumn[] = [
    { title: 'ID', key: 'id', mode: 'length' },
    { title: 'First Name', key: 'firstName', mode: '' },
    { title: 'Last name', key: 'lastName', mode: '' },
    { title: 'Email', key: 'email', mode: '' },
    { title: 'Address', key: 'addressText', mode: '' },
    { title: 'Active', key: 'active', mode: 'sum' }
  ];

  orderStatus: string[] = ['new', 'shipped', 'paid',];

  orderTableColumns: ITableColumn[] = [
    { title: 'ID', key: 'id', mode: 'length' },
    { title: 'First Name', key: 'customerFirstName', mode: '' },
    { title: 'Last name', key: 'customerLastName', mode: '' },
    { title: 'Email', key: 'customerEmail', mode: '' },
    { title: 'Product Name', key: 'customerProductName', mode: '' },
    { title: 'Product Price', key: 'customerProductPrice', mode: 'sum' },
    { title: 'Amount', key: 'amount', mode: 'sum' },
    { title: 'Total Price', key: 'orderPrice', mode: 'sum' },
    { title: 'Status', key: 'status', mode: '' }
  ];

  billStatus: string[] = ['new', 'paid',];

  billTableColumns: ITableColumn[] = [
    { title: 'ID', key: 'id', mode: 'length' },
    { title: 'First Name', key: 'customerFirstName', mode: '' },
    { title: 'Last name', key: 'customerLastName', mode: '' },
    { title: 'Email', key: 'customerEmail', mode: '' },
    { title: 'Product Name', key: 'customerProductName', mode: '' },
    //{ title: 'Product Price', key: 'customerProductPrice', mode: 'sum' },
    { title: 'Order Price', key: 'totalPrice', mode: 'sum' },
    { title: 'Amount', key: 'amount', mode: 'sum' },
    { title: 'Status', key: 'status', mode: '' }
  ];

  categoryTableColumns: ITableColumn[] = [
    { title: 'ID', key: 'id', mode: 'length' },
    { title: 'Name', key: 'categoryName', mode: '' },
    { title: 'Description', key: 'categoryDescription', mode: '' },
  ];


  /*
  userEditorFormFields: FormField[] = [
    {
      label: 'Name',
      key: 'name',
      validators: [
        Validators.pattern(/^[A-Ű][A-Űa-Ű .]{4,24}$/),
        Validators.required,
      ],
    },
    {
      label: 'Email',
      key: 'email',
      validators: [
        Validators.email,
        Validators.required,
      ],
    },
    {
      label: 'Category',
      key: 'category',
      validators: [
        Validators.required,
      ]
    },
  ];
  */

  constructor() { }
}
