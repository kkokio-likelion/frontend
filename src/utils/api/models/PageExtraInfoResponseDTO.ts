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
import type { PageableObject } from './PageableObject';
import {
    PageableObjectFromJSON,
    PageableObjectFromJSONTyped,
    PageableObjectToJSON,
} from './PageableObject';
import type { ExtraInfoResponseDTO } from './ExtraInfoResponseDTO';
import {
    ExtraInfoResponseDTOFromJSON,
    ExtraInfoResponseDTOFromJSONTyped,
    ExtraInfoResponseDTOToJSON,
} from './ExtraInfoResponseDTO';
import type { SortObject } from './SortObject';
import {
    SortObjectFromJSON,
    SortObjectFromJSONTyped,
    SortObjectToJSON,
} from './SortObject';

/**
 * 
 * @export
 * @interface PageExtraInfoResponseDTO
 */
export interface PageExtraInfoResponseDTO {
    /**
     * 
     * @type {number}
     * @memberof PageExtraInfoResponseDTO
     */
    totalPages?: number;
    /**
     * 
     * @type {number}
     * @memberof PageExtraInfoResponseDTO
     */
    totalElements?: number;
    /**
     * 
     * @type {boolean}
     * @memberof PageExtraInfoResponseDTO
     */
    first?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof PageExtraInfoResponseDTO
     */
    last?: boolean;
    /**
     * 
     * @type {PageableObject}
     * @memberof PageExtraInfoResponseDTO
     */
    pageable?: PageableObject;
    /**
     * 
     * @type {number}
     * @memberof PageExtraInfoResponseDTO
     */
    numberOfElements?: number;
    /**
     * 
     * @type {number}
     * @memberof PageExtraInfoResponseDTO
     */
    size?: number;
    /**
     * 
     * @type {Array<ExtraInfoResponseDTO>}
     * @memberof PageExtraInfoResponseDTO
     */
    content?: Array<ExtraInfoResponseDTO>;
    /**
     * 
     * @type {number}
     * @memberof PageExtraInfoResponseDTO
     */
    number?: number;
    /**
     * 
     * @type {SortObject}
     * @memberof PageExtraInfoResponseDTO
     */
    sort?: SortObject;
    /**
     * 
     * @type {boolean}
     * @memberof PageExtraInfoResponseDTO
     */
    empty?: boolean;
}

/**
 * Check if a given object implements the PageExtraInfoResponseDTO interface.
 */
export function instanceOfPageExtraInfoResponseDTO(value: object): value is PageExtraInfoResponseDTO {
    return true;
}

export function PageExtraInfoResponseDTOFromJSON(json: any): PageExtraInfoResponseDTO {
    return PageExtraInfoResponseDTOFromJSONTyped(json, false);
}

export function PageExtraInfoResponseDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): PageExtraInfoResponseDTO {
    if (json == null) {
        return json;
    }
    return {
        
        'totalPages': json['totalPages'] == null ? undefined : json['totalPages'],
        'totalElements': json['totalElements'] == null ? undefined : json['totalElements'],
        'first': json['first'] == null ? undefined : json['first'],
        'last': json['last'] == null ? undefined : json['last'],
        'pageable': json['pageable'] == null ? undefined : PageableObjectFromJSON(json['pageable']),
        'numberOfElements': json['numberOfElements'] == null ? undefined : json['numberOfElements'],
        'size': json['size'] == null ? undefined : json['size'],
        'content': json['content'] == null ? undefined : ((json['content'] as Array<any>).map(ExtraInfoResponseDTOFromJSON)),
        'number': json['number'] == null ? undefined : json['number'],
        'sort': json['sort'] == null ? undefined : SortObjectFromJSON(json['sort']),
        'empty': json['empty'] == null ? undefined : json['empty'],
    };
}

export function PageExtraInfoResponseDTOToJSON(value?: PageExtraInfoResponseDTO | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'totalPages': value['totalPages'],
        'totalElements': value['totalElements'],
        'first': value['first'],
        'last': value['last'],
        'pageable': PageableObjectToJSON(value['pageable']),
        'numberOfElements': value['numberOfElements'],
        'size': value['size'],
        'content': value['content'] == null ? undefined : ((value['content'] as Array<any>).map(ExtraInfoResponseDTOToJSON)),
        'number': value['number'],
        'sort': SortObjectToJSON(value['sort']),
        'empty': value['empty'],
    };
}

