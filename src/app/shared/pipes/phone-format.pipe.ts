import { Pipe, PipeTransform } from '@angular/core';
import { CommonModule } from '@angular/common'
// import { parsePhoneNumber, CountryCode } from 'libphonenumber-js/min';
import { parsePhoneNumber } from 'libphonenumber-js/min';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {

  transform(phoneValue: string): any {
    try {
      const phoneNumber: any = parsePhoneNumber(phoneValue, 'US');
      return phoneNumber.formatNational();
    }
    catch (error) {
      console.log('Error:', error);
      return phoneValue;
    }
  }
}