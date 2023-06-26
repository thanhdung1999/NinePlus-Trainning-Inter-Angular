import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'CurrencyVND',
})
export class CurrencyVND implements PipeTransform {
    transform(rawNum: any) {
        if (rawNum) {
            let priceWithCommas = rawNum.toLocaleString('vi');
            return priceWithCommas + ' VND';
        }
        return null;
    }
}
