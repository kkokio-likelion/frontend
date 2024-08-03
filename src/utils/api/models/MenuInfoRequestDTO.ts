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
 * 메뉴 정보 요청에 대한 DTO
 * @export
 * @interface MenuInfoRequestDTO
 */
export interface MenuInfoRequestDTO {
    /**
     * 메뉴 이름
     * @type {string}
     * @memberof MenuInfoRequestDTO
     */
    menuName: string;
    /**
     * 메뉴 가격
     * @type {number}
     * @memberof MenuInfoRequestDTO
     */
    menuPrice?: number;
    /**
     * 메뉴 설명
     * @type {string}
     * @memberof MenuInfoRequestDTO
     */
    menuSummary: string;
}

/**
 * Check if a given object implements the MenuInfoRequestDTO interface.
 */
export function instanceOfMenuInfoRequestDTO(value: object): value is MenuInfoRequestDTO {
    if (!('menuName' in value) || value['menuName'] === undefined) return false;
    if (!('menuSummary' in value) || value['menuSummary'] === undefined) return false;
    return true;
}

export function MenuInfoRequestDTOFromJSON(json: any): MenuInfoRequestDTO {
    return MenuInfoRequestDTOFromJSONTyped(json, false);
}

export function MenuInfoRequestDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): MenuInfoRequestDTO {
    if (json == null) {
        return json;
    }
    return {
        
        'menuName': json['menuName'],
        'menuPrice': json['menuPrice'] == null ? undefined : json['menuPrice'],
        'menuSummary': json['menuSummary'],
    };
}

export function MenuInfoRequestDTOToJSON(value?: MenuInfoRequestDTO | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'menuName': value['menuName'],
        'menuPrice': value['menuPrice'],
        'menuSummary': value['menuSummary'],
    };
}
