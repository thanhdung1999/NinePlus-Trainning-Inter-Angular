import { FormGroup } from '@angular/forms';
import { SortMeta } from 'primeng/api';
import { FILTER } from 'src/app/shared';

export class FilterHelper {
    static sortOrderBy(form: FormGroup, orderBy: SortMeta[]): void {
        if (form) {
            form.get(FILTER.SORT_BY)?.setValue(this._handleDataSort(orderBy));
        }
    }
    static sortOrderByNoneMulti(form: FormGroup, fieldName?: string, orderBy?: number): void {
        if (form) {
            form.get(FILTER.SORT_BY)?.setValue(
                fieldName + ' ' + this._handleSortOrderType(orderBy)
            );
        }
    }

    static setPagingSize(form: FormGroup, pageSize: number = 1): void {
        if (form) {
            form.get(FILTER.PAGE_SIZE)?.setValue(pageSize);
        }
    }
    static setPageNumber(form: FormGroup, pageNumber: number = 1): void {
        if (form) {
            form.get(FILTER.PAGE_NUMBER)?.setValue(pageNumber);
        }
    }

    static getPageNumber(first: number, row: number): number {
        return first === 0 ? 1 : first / row + 1;
    }

    static removeNullValue(formObject: any): any {
        Object.keys(formObject).forEach((key) => {
            if (formObject[key] === null) {
                delete formObject[key];
            }
        });
        return formObject;
    }

    private static _handleDataSort(data: SortMeta[]): string {
        let paramSort = '';

        if (data.length > 0) {
            data.forEach((value) => {
                paramSort += `${value.field} ${this._handleSortOrderType(value.order)},`;
            });
        }

        return paramSort.slice(0, -1);
    }

    private static _handleSortOrderType(type?: number): string {
        return type === 1 ? 'asc' : 'desc';
    }
}
