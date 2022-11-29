import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sorter'
})
export class SorterPipe implements PipeTransform {

  transform(value: any[], column: string, direct: string): any[] {

    if (!Array.isArray(value) || !column || !direct) {
      return value;
    }

    return value.sort(function (a: any, b: any) {
      if (typeof a[column] === 'number' && typeof b[column] === 'number') {
        if (direct === 'increasing') {
          return a[column] - b[column];
        }
        return b[column] - a[column];
      } else {
        const aa: string = ('' + a[column]).toLowerCase();
        const bb: string = ('' + b[column]).toLowerCase();
        if (direct === 'increasing') {
          return aa.localeCompare(bb);
        }
        return bb.localeCompare(aa);
      }
    });
  }
}
