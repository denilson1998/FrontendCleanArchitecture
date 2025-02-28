import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'concatPipe',
  standalone: true
})
export class ConcatPipe implements PipeTransform {

  transform(data: any[], attribute: string, separator:string): any {
    return data.map(d => d[attribute]).join(separator+' ')
  }

}