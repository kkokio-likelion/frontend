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
 * 카테고리 정보
 * @export
 * @interface CategoryDtoOnly
 */
export interface CategoryDtoOnly {
    /**
     * 생성 시간 정보
     * @type {Date}
     * @memberof CategoryDtoOnly
     */
    createdAt?: Date;
    /**
     * 마지막 수정 시간 정보
     * @type {Date}
     * @memberof CategoryDtoOnly
     */
    updatedAt?: Date;
    /**
     * 삭제 시간 정보
     * @type {Date}
     * @memberof CategoryDtoOnly
     */
    deletedAt?: Date;
    /**
     * 카테고리 ID값
     * @type {number}
     * @memberof CategoryDtoOnly
     */
    categoryId?: number;
    /**
     * 카테고리 이름
     * @type {string}
     * @memberof CategoryDtoOnly
     */
    categoryName?: string;
}

/**
 * Check if a given object implements the CategoryDtoOnly interface.
 */
export function instanceOfCategoryDtoOnly(value: object): value is CategoryDtoOnly {
    return true;
}

export function CategoryDtoOnlyFromJSON(json: any): CategoryDtoOnly {
    return CategoryDtoOnlyFromJSONTyped(json, false);
}

export function CategoryDtoOnlyFromJSONTyped(json: any, ignoreDiscriminator: boolean): CategoryDtoOnly {
    if (json == null) {
        return json;
    }
    return {
        
        'createdAt': json['createdAt'] == null ? undefined : (new Date(json['createdAt'])),
        'updatedAt': json['updatedAt'] == null ? undefined : (new Date(json['updatedAt'])),
        'deletedAt': json['deletedAt'] == null ? undefined : (new Date(json['deletedAt'])),
        'categoryId': json['categoryId'] == null ? undefined : json['categoryId'],
        'categoryName': json['categoryName'] == null ? undefined : json['categoryName'],
    };
}

export function CategoryDtoOnlyToJSON(value?: CategoryDtoOnly | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'createdAt': value['createdAt'] == null ? undefined : ((value['createdAt']).toISOString()),
        'updatedAt': value['updatedAt'] == null ? undefined : ((value['updatedAt']).toISOString()),
        'deletedAt': value['deletedAt'] == null ? undefined : ((value['deletedAt']).toISOString()),
        'categoryId': value['categoryId'],
        'categoryName': value['categoryName'],
    };
}

