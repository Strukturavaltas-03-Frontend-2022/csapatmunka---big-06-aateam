/*
{"id":1,
"orderID":360,
"amount":5656,
"status":"paid"}
*/

export class Bill {
  [x: string]: any;
  id: number = 0;
  orderID: number = 0;
  amount: number = 1;
  status: string = 'new'
}
