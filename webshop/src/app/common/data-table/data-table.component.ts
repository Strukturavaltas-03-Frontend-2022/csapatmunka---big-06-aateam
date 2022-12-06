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
  @Output() onNew: EventEmitter<T> = new EventEmitter();

  page: number = 1;

  phrase: string = '';

  filterKey: string = '';

  currentHeader: string = 'id';
  sortColumn: string = 'id';
  sortDirect: string = 'increasing';
  sortIcon: string = 'fa fa-long-arrow-up';

  lastDragKey = '';

  constructor() { }

  ngOnInit(): void {
  }

  onHeaderDragStart(ev: DragEvent): void {
    this.lastDragKey = (ev.target as HTMLTableCellElement).id;
  }

  onHeaderDrop(ev: DragEvent): void {
    ev.preventDefault();
    const targetID: string = (ev.target as HTMLTableCellElement).id;
    const fromIndex = this.columns.findIndex( col =>
      col.key === this.lastDragKey
     );
    const toIndex = this.columns.findIndex( col =>
      col.key === targetID
     );
    this.swapCols(fromIndex, toIndex);
  }

  swapCols(from: number = 2, to: number = 0): void {
    const temp = {...this.columns[from]};
    this.columns.splice(from , 1);
    this.columns.splice(to, 0, temp);
  }

  raiseSelect(row: T): void {
    this.onSelect.emit(row);
  }

  raiseDelete(): void {
    this.onDelete.emit(this.selectDeletedRow);
  }

  //törlésre kijelölt sor
  selectDeletedRow: T | undefined;

  raiseSelectDelete(row: T): void {
    this.selectDeletedRow = row;
  }

  raiseNew(): void {
    this.onNew.emit();
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
