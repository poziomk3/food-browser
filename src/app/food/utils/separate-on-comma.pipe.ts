import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'separateOnComma',
  standalone: true
})
export class SeparateOnCommaPipe implements PipeTransform {

  transform(value: string): string[] {
    return value?value.split(','):[];
  }

}
