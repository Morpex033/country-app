import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class CountryCodePipe implements PipeTransform {
  transform(value: string) {
    return value.trim().toUpperCase();
  }
}
