/*
{"id":1,
"name":"Bay Leaf Fresh",
"type":"Health Care",
"catID":2,
"description":"Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.",
"price":156,
"featured":false,
"active":false}
*/

export class Product {
  [x: string]: any;
  id: number = 0;
  name: string = '';
  type: string = '';
  catID: number = 0;
  description: string = '';
  price: number = 0;
  featured: boolean = false;
  active: boolean = true;
}
