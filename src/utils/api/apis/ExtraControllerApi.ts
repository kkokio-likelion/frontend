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


import * as runtime from '../runtime';
import type {
  ErrorResponse,
  ExtraInfoRequestDTO,
  ExtraInfoResponseDTO,
  PageExtraInfoResponseDTO,
  Pageable,
} from '../models/index';
import {
    ErrorResponseFromJSON,
    ErrorResponseToJSON,
    ExtraInfoRequestDTOFromJSON,
    ExtraInfoRequestDTOToJSON,
    ExtraInfoResponseDTOFromJSON,
    ExtraInfoResponseDTOToJSON,
    PageExtraInfoResponseDTOFromJSON,
    PageExtraInfoResponseDTOToJSON,
    PageableFromJSON,
    PageableToJSON,
} from '../models/index';

export interface CreateExtraInfoRequest {
    menuId: number;
    extraInfoRequestDTO: ExtraInfoRequestDTO;
}

export interface DeleteExtraInfoRequest {
    extraId: number;
}

export interface GetExtraInfoRequest {
    extraId: number;
}

export interface GetExtraInfoByMenuIdRequest {
    menuId: number;
    pageable: Pageable;
}

export interface UpdateExtraInfoRequest {
    extraId: number;
    extraInfoRequestDTO: ExtraInfoRequestDTO;
}

/**
 * 
 */
export class ExtraControllerApi extends runtime.BaseAPI {

    /**
     * 메뉴 추가 옵션 정보 등록
     * 메뉴 추가 옵션 등록
     */
    async createExtraInfoRaw(requestParameters: CreateExtraInfoRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ExtraInfoResponseDTO>> {
        if (requestParameters['menuId'] == null) {
            throw new runtime.RequiredError(
                'menuId',
                'Required parameter "menuId" was null or undefined when calling createExtraInfo().'
            );
        }

        if (requestParameters['extraInfoRequestDTO'] == null) {
            throw new runtime.RequiredError(
                'extraInfoRequestDTO',
                'Required parameter "extraInfoRequestDTO" was null or undefined when calling createExtraInfo().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("jwtAuth", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/extra/info/{menuId}`.replace(`{${"menuId"}}`, encodeURIComponent(String(requestParameters['menuId']))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: ExtraInfoRequestDTOToJSON(requestParameters['extraInfoRequestDTO']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ExtraInfoResponseDTOFromJSON(jsonValue));
    }

    /**
     * 메뉴 추가 옵션 정보 등록
     * 메뉴 추가 옵션 등록
     */
    async createExtraInfo(requestParameters: CreateExtraInfoRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ExtraInfoResponseDTO> {
        const response = await this.createExtraInfoRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * 메뉴 추가 옵션 정보 제거
     * 메뉴 추가 옵션 제거
     */
    async deleteExtraInfoRaw(requestParameters: DeleteExtraInfoRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters['extraId'] == null) {
            throw new runtime.RequiredError(
                'extraId',
                'Required parameter "extraId" was null or undefined when calling deleteExtraInfo().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("jwtAuth", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/extra/info/{extraId}`.replace(`{${"extraId"}}`, encodeURIComponent(String(requestParameters['extraId']))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * 메뉴 추가 옵션 정보 제거
     * 메뉴 추가 옵션 제거
     */
    async deleteExtraInfo(requestParameters: DeleteExtraInfoRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.deleteExtraInfoRaw(requestParameters, initOverrides);
    }

    /**
     * 특정 메뉴 추가 옵션 정보 조회
     * 특정 메뉴 추가 옵션 정보 조회
     */
    async getExtraInfoRaw(requestParameters: GetExtraInfoRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ExtraInfoResponseDTO>> {
        if (requestParameters['extraId'] == null) {
            throw new runtime.RequiredError(
                'extraId',
                'Required parameter "extraId" was null or undefined when calling getExtraInfo().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("jwtAuth", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/extra/info/{extraId}`.replace(`{${"extraId"}}`, encodeURIComponent(String(requestParameters['extraId']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ExtraInfoResponseDTOFromJSON(jsonValue));
    }

    /**
     * 특정 메뉴 추가 옵션 정보 조회
     * 특정 메뉴 추가 옵션 정보 조회
     */
    async getExtraInfo(requestParameters: GetExtraInfoRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ExtraInfoResponseDTO> {
        const response = await this.getExtraInfoRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * 메뉴 ID값기반 메뉴 추가 옵션 정보 조회
     * 메뉴 ID값기반 메뉴 추가 옵션 정보 조회
     */
    async getExtraInfoByMenuIdRaw(requestParameters: GetExtraInfoByMenuIdRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PageExtraInfoResponseDTO>> {
        if (requestParameters['menuId'] == null) {
            throw new runtime.RequiredError(
                'menuId',
                'Required parameter "menuId" was null or undefined when calling getExtraInfoByMenuId().'
            );
        }

        if (requestParameters['pageable'] == null) {
            throw new runtime.RequiredError(
                'pageable',
                'Required parameter "pageable" was null or undefined when calling getExtraInfoByMenuId().'
            );
        }

        const queryParameters: any = {};

        if (requestParameters['pageable'] != null) {
            queryParameters['pageable'] = requestParameters['pageable'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("jwtAuth", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/extra/info/menu/{menuId}`.replace(`{${"menuId"}}`, encodeURIComponent(String(requestParameters['menuId']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PageExtraInfoResponseDTOFromJSON(jsonValue));
    }

    /**
     * 메뉴 ID값기반 메뉴 추가 옵션 정보 조회
     * 메뉴 ID값기반 메뉴 추가 옵션 정보 조회
     */
    async getExtraInfoByMenuId(requestParameters: GetExtraInfoByMenuIdRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PageExtraInfoResponseDTO> {
        const response = await this.getExtraInfoByMenuIdRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * 메뉴 추가 옵션 정보 변경
     * 메뉴 추가 옵션 변경
     */
    async updateExtraInfoRaw(requestParameters: UpdateExtraInfoRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ExtraInfoResponseDTO>> {
        if (requestParameters['extraId'] == null) {
            throw new runtime.RequiredError(
                'extraId',
                'Required parameter "extraId" was null or undefined when calling updateExtraInfo().'
            );
        }

        if (requestParameters['extraInfoRequestDTO'] == null) {
            throw new runtime.RequiredError(
                'extraInfoRequestDTO',
                'Required parameter "extraInfoRequestDTO" was null or undefined when calling updateExtraInfo().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("jwtAuth", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/extra/info/{extraId}`.replace(`{${"extraId"}}`, encodeURIComponent(String(requestParameters['extraId']))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: ExtraInfoRequestDTOToJSON(requestParameters['extraInfoRequestDTO']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ExtraInfoResponseDTOFromJSON(jsonValue));
    }

    /**
     * 메뉴 추가 옵션 정보 변경
     * 메뉴 추가 옵션 변경
     */
    async updateExtraInfo(requestParameters: UpdateExtraInfoRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ExtraInfoResponseDTO> {
        const response = await this.updateExtraInfoRaw(requestParameters, initOverrides);
        return await response.value();
    }

}