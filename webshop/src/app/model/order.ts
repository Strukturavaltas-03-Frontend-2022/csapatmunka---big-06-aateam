/*
{"id":1,
"customerID":656,
"productID":214,
"amount":3767,
"status":"shipped"}
*/

export class Order {
  [x: string]: any;
  id: number = 0;
  customerID: number = 0;
  productID: number = 0;
  amount: number = 1;
  status: string = "new";
}
