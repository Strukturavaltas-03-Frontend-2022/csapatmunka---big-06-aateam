import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from 'src/app/model/category';

export interface ITableCol {
  [x: string]: any;
  title: string;
  key: string;
  mode: string;
}

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent<T extends { [x: string]: any }> implements OnInit {

  @Input() list: T[] = [];

  @Input() columns: ITableCol[] = [];

  @Output() onSelect: EventEmitter<T> = new EventEmitter();
  @Output() onDelete: EventEmitter<T> = new EventEmitter();

  page: number = 1;

  phrase: string = '';

  filterKey: string = '';

  currentHeader: string = 'id';
  sortColumn: string = 'id';
  sortDirect: string = 'increasing';
  sortIcon: string = 'fa fa-long-arrow-up';

  constructor() { }

  ngOnInit(): void {
  }

  raiseSelect(row: T): void {
    this.onSelect.emit(row);
  }

  raiseDelete(row: T): void {
    this.onDelete.emit(row);
  }


  onColumnSelect(columnHeader: string): void {
    this.sortColumn = columnHeader;
    if (columnHeader !== this.currentHeader) {
      this.sortDirect = 'increasing';
      this.sortIcon = 'fa fa-long-arrow-up';
    }

    if (columnHeader == this.currentHeader) {
      if (this.sortDirect == 'increasing') {
        this.sortDirect = 'decreasing';
        this.sortIcon = 'fa fa-long-arrow-down';
      }
      else {
        this.sortDirect = 'increasing';
        this.sortIcon = 'fa fa-long-arrow-up';
      }
    }
    this.currentHeader = columnHeader;
  }

}
