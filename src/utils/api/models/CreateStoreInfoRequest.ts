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
import type { StoreInfoRequestDTO } from './StoreInfoRequestDTO';
import {
    StoreInfoRequestDTOFromJSON,
    StoreInfoRequestDTOFromJSONTyped,
    StoreInfoRequestDTOToJSON,
} from './StoreInfoRequestDTO';

/**
 * 
 * @export
 * @interface CreateStoreInfoRequest
 */
export interface CreateStoreInfoRequest {
    /**
     * 
     * @type {StoreInfoRequestDTO}
     * @memberof CreateStoreInfoRequest
     */
    storeInfoRequestDTO: StoreInfoRequestDTO;
    /**
     * 
     * @type {Blob}
     * @memberof CreateStoreInfoRequest
     */
    image?: Blob;
}

/**
 * Check if a given object implements the CreateStoreInfoRequest interface.
 */
export function instanceOfCreateStoreInfoRequest(value: object): value is CreateStoreInfoRequest {
    if (!('storeInfoRequestDTO' in value) || value['storeInfoRequestDTO'] === undefined) return false;
    return true;
}

export function CreateStoreInfoRequestFromJSON(json: any): CreateStoreInfoRequest {
    return CreateStoreInfoRequestFromJSONTyped(json, false);
}

export function CreateStoreInfoRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): CreateStoreInfoRequest {
    if (json == null) {
        return json;
    }
    return {
        
        'storeInfoRequestDTO': StoreInfoRequestDTOFromJSON(json['storeInfoRequestDTO']),
        'image': json['image'] == null ? undefined : json['image'],
    };
}

export function CreateStoreInfoRequestToJSON(value?: CreateStoreInfoRequest | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'storeInfoRequestDTO': StoreInfoRequestDTOToJSON(value['storeInfoRequestDTO']),
        'image': value['image'],
    };
}

