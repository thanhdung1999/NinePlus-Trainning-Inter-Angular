import { HttpParams, HttpParameterCodec } from '@angular/common/http';
import { isArray, keys } from 'lodash';
import { MasterDataModel } from 'src/app/shared';

export class HttpHelper {
    static objectToHttpParams(object: any): HttpParams {
        let httpParams = new HttpParams({ encoder: new CustomHttpParameterCodex() });
        keys(object).forEach((key: string) => {
            if (isArray(object[key])) {
                object[key].forEach((e: MasterDataModel) => {
                    httpParams = e && httpParams.append(key, e.id);
                });
            } else {
                httpParams = httpParams.append(key, object[key]);
            }
        });
        return httpParams;
    }
}

export class CustomHttpParameterCodex implements HttpParameterCodec {
    decodeKey(key: string): string {
        return decodeURIComponent(key);
    }

    decodeValue(value: string): string {
        return decodeURIComponent(value);
    }

    encodeKey(key: string): string {
        return encodeURIComponent(key);
    }

    encodeValue(value: string): string {
        return encodeURIComponent(value);
    }
}
