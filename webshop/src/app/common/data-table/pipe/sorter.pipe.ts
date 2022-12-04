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
      // ha a column több részből áll, akkor szét kell szedni
      const columns = column.split('.');
      let elema = a, elemb = b; //a rendezésehez átadjuk az adott objektumokat
      // a mélységtől függően mindig az adott objektum key értéke lesz behelyettestve
      // a legvégén a legutolsó elem
      for (let i = 0; i < columns.length; i += 1) {
        elema = elema[columns[i]];
        elemb = elemb[columns[i]];
      }

      if (typeof elema === 'number' && typeof elemb === 'number') {
        if (direct === 'increasing') {
          return elema - elemb;
        }
        return elemb - elema;
      } else {
        const aa: string = ('' + elema).toLowerCase();
        const bb: string = ('' + elemb).toLowerCase();
        if (direct === 'increasing') {
          return aa.localeCompare(bb);
        }
        return bb.localeCompare(aa);
      }
    });
  }
}
