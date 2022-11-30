import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Bill } from 'src/app/model/bill';
import { BillService } from 'src/app/service/bill.service';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.scss'],
})
export class BillsComponent implements OnInit {

  billList$: Observable<Bill[]> = this.billService.list$;

  constructor(
    private billService: BillService,
  ) { }

  ngOnInit(): void {
    this.billService.getAll();
  }
}
