import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitSymbols'
})
export class LimitSymbolsPipe implements PipeTransform {

  transform(value: string, symbols: number): any {
    return value.slice(0, symbols);
  }

}
