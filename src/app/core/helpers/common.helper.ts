import { isObject, get, isEqual, isNull, isDate } from 'lodash';
import { isMoment } from 'moment';
import { MESSAGE_TITLE, PermissionModel, MsgModel } from 'src/app/shared';
import * as moment from 'moment';
import { FormGroup } from '@angular/forms';

export class CommonHelper {
    static flattenObject(obj: any): any {
        const keys = CommonHelper.flattenKeys(obj);
        const flattenObj: any = {};
        keys.forEach((key: string) => {
            flattenObj[key] = get(obj, key);
        });

        return flattenObj;
    }
    static flattenKeys(obj: any): string[] {
        const flattened: any = [];
        Object.keys(obj).forEach((key) => {
            const value = obj[key];
            if (isObject(value) && !isMoment(value)) {
                const internalKeys = CommonHelper.flattenKeys(value);
                internalKeys.forEach((internalKey: string) => {
                    flattened.push(`${key}.${internalKey}`);
                });
            } else {
                flattened.push(key);
            }
        });
        return flattened;
    }

    static parseJSON(json: any): any {
        let parsed;

        try {
            parsed = JSON.parse(json);
        } catch (e) {}

        return parsed;
    }

    static objectDeepDiff = (newData: object | any, oldData: object | any) => {
        const record: any = {};
        Object.keys(newData).forEach((key: string) => {
            const newTypeData = typeof newData[key];
            const newDataValue = newData[key];
            const oldDataValue = oldData[key];
            const isAMomentObject = newDataValue ? newDataValue._isAMomentObject : false;
            if (isAMomentObject) {
                if (!isEqual(newDataValue, oldDataValue)) {
                    record[key] = newDataValue.toDate();
                }
            } else if (Array.isArray(newDataValue)) {
                if (!isEqual(newDataValue, oldDataValue)) {
                    record[key] = newDataValue;
                }
            } else if (newTypeData === 'object') {
                if (!isEqual(newDataValue, oldDataValue)) {
                    record[key] = CommonHelper.objectDeepDiff(
                        newDataValue || {},
                        oldDataValue || {}
                    );
                }

                if (isNull(newDataValue) && !isNull(oldDataValue)) {
                    record[key] = null;
                }
            } else {
                if (!isEqual(newDataValue, oldDataValue)) {
                    record[key] = newDataValue;
                }
            }
        });
        return record;
    };

    static isHaveDataChange(objectData: any) {
        if (Array.isArray(objectData)) {
            return true;
        }
        if (
            objectData === undefined ||
            objectData === null ||
            Object.keys(objectData).length === 0
        ) {
            return false;
        }
        return true;
    }

    static handleDataPermissions(data: any): PermissionModel {
        return {
            canAccess: data.canAccess,
            canAdd: data.canAdd,
            canEdit: data.canEdit,
            canDelete: data.canDelete,
        };
    }

    static getNotifyMsg(message: MsgModel, locale: string): string | undefined {
        let msg;
        switch (locale) {
            case 'vn':
                msg = message?.message_VN;
                break;
            case 'en':
                msg = message?.message_EN;
                break;
            case 'ja':
                msg = message?.message_JP;
                break;
            default:
                break;
        }
        return msg;
    }

    static getErrorMsg(listErr: MsgModel[], errId: string, locale: string): string | undefined {
        let msg;
        switch (locale) {
            case 'vn':
                msg = errId && listErr.find((e) => e.id === errId)?.message_VN;
                break;
            case 'en':
                msg = errId && listErr.find((e) => e.id === errId)?.message_EN;
                break;
            case 'ja':
                msg = errId && listErr.find((e) => e.id === errId)?.message_JP;
                break;
            default:
                break;
        }
        return msg === undefined ? MESSAGE_TITLE.CAN_NOT_FIND_MESSAGE : msg;
    }
    static convertDateUtcIso8601(body: any): void {
        debugger;
        Object.fromEntries(
            Object.entries(body).map(([key, val]): any => [
                key,
                isDate(val) ? moment(val).utc(true).format() : val,
            ])
        );
    }

    static formatFormGroupDateIso8601(formData: any, formGroup: FormGroup): void {
        for (const [key, value] of Object.entries(formData)) {
            if (isDate(value)) {
                formGroup.get(key)?.setValue(moment(formGroup.get(key)?.value).utc(true).format());
            }
        }
    }
    static formatDateIso8601(formData: any): void {
        Object.keys(formData).forEach((key) => {
            if (isDate(formData[key])) {
                formData[key] = moment(formData[key]).utc(true).format();
            }
        });
        return formData;
    }

    private static makeNewKey(keyProp: string, itr: number, sep: string, obj: any): string {
        const newKey = [keyProp, sep, itr].join('');
        if (Object.keys(obj).indexOf(newKey) === -1) {
            return newKey;
        } else {
            return CommonHelper.makeNewKey(keyProp, ++itr, sep, obj);
        }
    }

    static decodeToken(token: string) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(
            window
                .atob(base64)
                .split('')
                .map(function (c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                })
                .join('')
        );

        return JSON.parse(jsonPayload);
    }
}
