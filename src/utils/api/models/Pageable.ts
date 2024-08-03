/* tslint:disable */
/* eslint-disable */
/**
 * Kkokio API
 * <h3>JWT 토큰 구조</h3> <ul>     <li>subject: accountId</li>     <li>issuedAt: 발급 시간</li>     <li>expiration: 만료 시간</li>     <li>claims:</li>     <ol>         <li>username: 보여지는 이름</li>         <li>roles: 권한들</li>     </ol> </ul> 
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface Pageable
 */
export interface Pageable {
    /**
     * 
     * @type {number}
     * @memberof Pageable
     */
    page?: number;
    /**
     * 
     * @type {number}
     * @memberof Pageable
     */
    size?: number;
    /**
     * 
     * @type {Array<string>}
     * @memberof Pageable
     */
    sort?: Array<string>;
}

/**
 * Check if a given object implements the Pageable interface.
 */
export function instanceOfPageable(value: object): value is Pageable {
    return true;
}

export function PageableFromJSON(json: any): Pageable {
    return PageableFromJSONTyped(json, false);
}

export function PageableFromJSONTyped(json: any, ignoreDiscriminator: boolean): Pageable {
    if (json == null) {
        return json;
    }
    return {
        
        'page': json['page'] == null ? undefined : json['page'],
        'size': json['size'] == null ? undefined : json['size'],
        'sort': json['sort'] == null ? undefined : json['sort'],
    };
}

export function PageableToJSON(value?: Pageable | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'page': value['page'],
        'size': value['size'],
        'sort': value['sort'],
    };
}
