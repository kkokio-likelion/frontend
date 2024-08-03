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
import type { MenuDtoAndCategoryDto } from './MenuDtoAndCategoryDto';
import {
    MenuDtoAndCategoryDtoFromJSON,
    MenuDtoAndCategoryDtoFromJSONTyped,
    MenuDtoAndCategoryDtoToJSON,
} from './MenuDtoAndCategoryDto';

/**
 * 주문 메뉴 및 카테고리 정보 DTO
 * @export
 * @interface OrdersMenuDtoAndMenuDtoAndCategoryDto
 */
export interface OrdersMenuDtoAndMenuDtoAndCategoryDto {
    /**
     * 
     * @type {MenuDtoAndCategoryDto}
     * @memberof OrdersMenuDtoAndMenuDtoAndCategoryDto
     */
    menuDtoAndCategoryDto?: MenuDtoAndCategoryDto;
    /**
     * 메뉴 수량
     * @type {number}
     * @memberof OrdersMenuDtoAndMenuDtoAndCategoryDto
     */
    amount?: number;
}

/**
 * Check if a given object implements the OrdersMenuDtoAndMenuDtoAndCategoryDto interface.
 */
export function instanceOfOrdersMenuDtoAndMenuDtoAndCategoryDto(value: object): value is OrdersMenuDtoAndMenuDtoAndCategoryDto {
    return true;
}

export function OrdersMenuDtoAndMenuDtoAndCategoryDtoFromJSON(json: any): OrdersMenuDtoAndMenuDtoAndCategoryDto {
    return OrdersMenuDtoAndMenuDtoAndCategoryDtoFromJSONTyped(json, false);
}

export function OrdersMenuDtoAndMenuDtoAndCategoryDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): OrdersMenuDtoAndMenuDtoAndCategoryDto {
    if (json == null) {
        return json;
    }
    return {
        
        'menuDtoAndCategoryDto': json['menuDtoAndCategoryDto'] == null ? undefined : MenuDtoAndCategoryDtoFromJSON(json['menuDtoAndCategoryDto']),
        'amount': json['amount'] == null ? undefined : json['amount'],
    };
}

export function OrdersMenuDtoAndMenuDtoAndCategoryDtoToJSON(value?: OrdersMenuDtoAndMenuDtoAndCategoryDto | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'menuDtoAndCategoryDto': MenuDtoAndCategoryDtoToJSON(value['menuDtoAndCategoryDto']),
        'amount': value['amount'],
    };
}

