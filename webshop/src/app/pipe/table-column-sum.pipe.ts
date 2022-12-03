import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tableColumnSum'
})
export class TableColumnSumPipe<T extends { [x: string]: any }> implements PipeTransform {

  transform(rows: T[], colKey: string = '', mode: string = "sum"): string {

    if (!Array.isArray(rows) || !colKey || !mode) {
      return '';
    }

    if (mode == "sum") {
      let output = 0;
      rows.forEach(row => {
        output += Number(row[colKey]);
      });
      return 'Σ ' + output;
    }
    else if (mode == "length") {
      return '' + rows.length;
    }
    else
      return '';


  }

}
