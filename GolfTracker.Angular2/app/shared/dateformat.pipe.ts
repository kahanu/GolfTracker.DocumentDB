import { Pipe, PipeTransform } from '@angular/core';
import { DateFormatter } from '@angular/common/src/facade/intl';

var defaultLocale: string = 'en-US';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
  transform(date, args) {
    return new Date(date);
  }
}