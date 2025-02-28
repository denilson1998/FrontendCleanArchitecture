import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyBolivian',
  standalone: true
})
export class CurrencyBolivianPipe implements PipeTransform {

  transform(valor: number): string {
    if (valor === null || valor === undefined) {
      return '';
    }

    const formato = new Intl.NumberFormat('es-BO', {
      style: 'currency',
      currency: 'BOB',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      useGrouping: true,
    });
    return formato.format(valor).replace(/\s+/g, '');
  }

}
