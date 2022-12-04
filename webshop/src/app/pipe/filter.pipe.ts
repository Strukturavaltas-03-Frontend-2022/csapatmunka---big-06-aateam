import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe<T extends { [x: string]: any }> implements PipeTransform {

  transform(list: T[], phrase: string = '', key: string = ''): T[] {
    if (!Array.isArray(list) || !phrase) {
      return list;
    }

    phrase = phrase.toLowerCase();

    if (key !== '') {
      return list.filter(item => {
        // ha a key több részből áll, akkor szét kell szedni
        const keys = key.split('.');
        let elem = item; //átadjuk az adott objektumokat
        // a mélységtől függően mindig az adott objektum key értéke lesz behelyettestve
        // a legvégén a legutolsó elem

        for (let i = 0; i < keys.length; i += 1) {
          elem = elem[keys[i]];
        }

        if (typeof elem === 'number') {
          return Number(phrase) === elem;
        }
        return ('' + elem).toLowerCase().includes(phrase);
      });
    }

    return list.filter(
      item => Object.values(item).join(' ').toLowerCase().includes(phrase)
    );
  }


}
