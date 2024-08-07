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
 * 로그인 비밀번호 변경 요청 DTO
 * @export
 * @interface LoginPasswordUpdateDto
 */
export interface LoginPasswordUpdateDto {
    /**
     * 현재 로그인 비밀번호
     * @type {string}
     * @memberof LoginPasswordUpdateDto
     */
    currentPassword: string;
    /**
     * 새로운 로그인 비밀번호
     * @type {string}
     * @memberof LoginPasswordUpdateDto
     */
    newPassword: string;
    /**
     * 
     * @type {boolean}
     * @memberof LoginPasswordUpdateDto
     */
    samePassword?: boolean;
}

/**
 * Check if a given object implements the LoginPasswordUpdateDto interface.
 */
export function instanceOfLoginPasswordUpdateDto(value: object): value is LoginPasswordUpdateDto {
    if (!('currentPassword' in value) || value['currentPassword'] === undefined) return false;
    if (!('newPassword' in value) || value['newPassword'] === undefined) return false;
    return true;
}

export function LoginPasswordUpdateDtoFromJSON(json: any): LoginPasswordUpdateDto {
    return LoginPasswordUpdateDtoFromJSONTyped(json, false);
}

export function LoginPasswordUpdateDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): LoginPasswordUpdateDto {
    if (json == null) {
        return json;
    }
    return {
        
        'currentPassword': json['currentPassword'],
        'newPassword': json['newPassword'],
        'samePassword': json['samePassword'] == null ? undefined : json['samePassword'],
    };
}

export function LoginPasswordUpdateDtoToJSON(value?: LoginPasswordUpdateDto | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'currentPassword': value['currentPassword'],
        'newPassword': value['newPassword'],
        'samePassword': value['samePassword'],
    };
}

