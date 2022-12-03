/*
{"id":1,
"firstName":"Osmond",
"lastName":"Paradyce",
"email":"oparadyce0@plala.or.jp",
"address":{
  "zip":"329274",
  "country":"Argentina",
  "city":"San Carlos de Bariloche",
  "street":"7570 Londonderry Hill",
  "notes":"nullam varius nulla facilisi cras non velit nec nisi vulputate nonummy maecenas tincidunt lacus at velit vivamus vel nulla"},
"active":false}
*/

export class Customer {
  [x: string]: any;
  id: number = 0;
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  address: {
    zip: number,
    country: string,
    city: string,
    street: string,
    notes: string
  } = {
      zip: 0,
      country: '',
      city: '',
      street: '',
      notes: ''
    }
  active: boolean = true;
};
