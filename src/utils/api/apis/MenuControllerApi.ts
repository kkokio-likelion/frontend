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
  CreateMenuInfoRequest,
  ErrorResponse,
  MenuInfoResponseDTO,
  PageMenuInfoResponseDTO,
  Pageable,
  UpdateMenuInfoRequest,
} from '../models/index';
import {
    CreateMenuInfoRequestFromJSON,
    CreateMenuInfoRequestToJSON,
    ErrorResponseFromJSON,
    ErrorResponseToJSON,
    MenuInfoResponseDTOFromJSON,
    MenuInfoResponseDTOToJSON,
    PageMenuInfoResponseDTOFromJSON,
    PageMenuInfoResponseDTOToJSON,
    PageableFromJSON,
    PageableToJSON,
    UpdateMenuInfoRequestFromJSON,
    UpdateMenuInfoRequestToJSON,
} from '../models/index';

export interface CreateMenuInfoOperationRequest {
    categoryId: number;
    createMenuInfoRequest?: CreateMenuInfoRequest;
}

export interface DeleteImage1Request {
    menuId: number;
}

export interface DeleteMenuInfoRequest {
    menuId: number;
}

export interface GetMenuInfoRequest {
    menuId: number;
}

export interface GetMenuInfoStoreIdRequest {
    storeId: number;
    pageable: Pageable;
}

export interface GetMenuInfoStoreIdAndcategoryIdRequest {
    storeId: number;
    categoryId: number;
    pageable: Pageable;
}

export interface UpdateMenuInfoOperationRequest {
    menuId: number;
    updateMenuInfoRequest?: UpdateMenuInfoRequest;
}

/**
 * 
 */
export class MenuControllerApi extends runtime.BaseAPI {

    /**
     * 가게의 메뉴 정보 등록
     * 메뉴 정보 등록
     */
    async createMenuInfoRaw(requestParameters: CreateMenuInfoOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<MenuInfoResponseDTO>> {
        if (requestParameters['categoryId'] == null) {
            throw new runtime.RequiredError(
                'categoryId',
                'Required parameter "categoryId" was null or undefined when calling createMenuInfo().'
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
            path: `/menu/info/{categoryId}`.replace(`{${"categoryId"}}`, encodeURIComponent(String(requestParameters['categoryId']))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CreateMenuInfoRequestToJSON(requestParameters['createMenuInfoRequest']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => MenuInfoResponseDTOFromJSON(jsonValue));
    }

    /**
     * 가게의 메뉴 정보 등록
     * 메뉴 정보 등록
     */
    async createMenuInfo(requestParameters: CreateMenuInfoOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<MenuInfoResponseDTO> {
        const response = await this.createMenuInfoRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * 등록된 메뉴의 이미지 정보 삭제
     * 메뉴 이미지 삭제
     */
    async deleteImage1Raw(requestParameters: DeleteImage1Request, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<MenuInfoResponseDTO>> {
        if (requestParameters['menuId'] == null) {
            throw new runtime.RequiredError(
                'menuId',
                'Required parameter "menuId" was null or undefined when calling deleteImage1().'
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
            path: `/menu/image/{menuId}`.replace(`{${"menuId"}}`, encodeURIComponent(String(requestParameters['menuId']))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => MenuInfoResponseDTOFromJSON(jsonValue));
    }

    /**
     * 등록된 메뉴의 이미지 정보 삭제
     * 메뉴 이미지 삭제
     */
    async deleteImage1(requestParameters: DeleteImage1Request, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<MenuInfoResponseDTO> {
        const response = await this.deleteImage1Raw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * 등록된 메뉴 정보 삭제
     * 메뉴 정보 삭제
     */
    async deleteMenuInfoRaw(requestParameters: DeleteMenuInfoRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters['menuId'] == null) {
            throw new runtime.RequiredError(
                'menuId',
                'Required parameter "menuId" was null or undefined when calling deleteMenuInfo().'
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
            path: `/menu/info/{menuId}`.replace(`{${"menuId"}}`, encodeURIComponent(String(requestParameters['menuId']))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * 등록된 메뉴 정보 삭제
     * 메뉴 정보 삭제
     */
    async deleteMenuInfo(requestParameters: DeleteMenuInfoRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.deleteMenuInfoRaw(requestParameters, initOverrides);
    }

    /**
     * 특정 메뉴 정보 조회
     * 특정 메뉴 조회
     */
    async getMenuInfoRaw(requestParameters: GetMenuInfoRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<MenuInfoResponseDTO>> {
        if (requestParameters['menuId'] == null) {
            throw new runtime.RequiredError(
                'menuId',
                'Required parameter "menuId" was null or undefined when calling getMenuInfo().'
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
            path: `/menu/info/{menuId}`.replace(`{${"menuId"}}`, encodeURIComponent(String(requestParameters['menuId']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => MenuInfoResponseDTOFromJSON(jsonValue));
    }

    /**
     * 특정 메뉴 정보 조회
     * 특정 메뉴 조회
     */
    async getMenuInfo(requestParameters: GetMenuInfoRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<MenuInfoResponseDTO> {
        const response = await this.getMenuInfoRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * 가게 ID값을 기반으로 메뉴 정보 조회
     * 메뉴 정보 조회
     */
    async getMenuInfoStoreIdRaw(requestParameters: GetMenuInfoStoreIdRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PageMenuInfoResponseDTO>> {
        if (requestParameters['storeId'] == null) {
            throw new runtime.RequiredError(
                'storeId',
                'Required parameter "storeId" was null or undefined when calling getMenuInfoStoreId().'
            );
        }

        if (requestParameters['pageable'] == null) {
            throw new runtime.RequiredError(
                'pageable',
                'Required parameter "pageable" was null or undefined when calling getMenuInfoStoreId().'
            );
        }

        const queryParameters: any = {};

        if (requestParameters['pageable'] != null) {
            queryParameters['page'] = requestParameters['pageable']['page'];
            queryParameters['size'] = requestParameters['pageable']['size'];
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
            path: `/menu/info/store/{storeId}`.replace(`{${"storeId"}}`, encodeURIComponent(String(requestParameters['storeId']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PageMenuInfoResponseDTOFromJSON(jsonValue));
    }

    /**
     * 가게 ID값을 기반으로 메뉴 정보 조회
     * 메뉴 정보 조회
     */
    async getMenuInfoStoreId(requestParameters: GetMenuInfoStoreIdRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PageMenuInfoResponseDTO> {
        const response = await this.getMenuInfoStoreIdRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * 가게 ID와 카테고리 ID 값을 기반으로 메뉴 정보 조회
     * 메뉴 정보 조회
     */
    async getMenuInfoStoreIdAndcategoryIdRaw(requestParameters: GetMenuInfoStoreIdAndcategoryIdRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PageMenuInfoResponseDTO>> {
        if (requestParameters['storeId'] == null) {
            throw new runtime.RequiredError(
                'storeId',
                'Required parameter "storeId" was null or undefined when calling getMenuInfoStoreIdAndcategoryId().'
            );
        }

        if (requestParameters['categoryId'] == null) {
            throw new runtime.RequiredError(
                'categoryId',
                'Required parameter "categoryId" was null or undefined when calling getMenuInfoStoreIdAndcategoryId().'
            );
        }

        if (requestParameters['pageable'] == null) {
            throw new runtime.RequiredError(
                'pageable',
                'Required parameter "pageable" was null or undefined when calling getMenuInfoStoreIdAndcategoryId().'
            );
        }

        const queryParameters: any = {};

        if (requestParameters['pageable'] != null) {
            queryParameters['page'] = requestParameters['pageable']['page'];
            queryParameters['size'] = requestParameters['pageable']['size'];
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
            path: `/menu/info/store/{storeId}/category/{categoryId}`.replace(`{${"storeId"}}`, encodeURIComponent(String(requestParameters['storeId']))).replace(`{${"categoryId"}}`, encodeURIComponent(String(requestParameters['categoryId']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PageMenuInfoResponseDTOFromJSON(jsonValue));
    }

    /**
     * 가게 ID와 카테고리 ID 값을 기반으로 메뉴 정보 조회
     * 메뉴 정보 조회
     */
    async getMenuInfoStoreIdAndcategoryId(requestParameters: GetMenuInfoStoreIdAndcategoryIdRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PageMenuInfoResponseDTO> {
        const response = await this.getMenuInfoStoreIdAndcategoryIdRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * 등록된 메뉴 정보 변경
     * 메뉴 정보 변경
     */
    async updateMenuInfoRaw(requestParameters: UpdateMenuInfoOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<MenuInfoResponseDTO>> {
        if (requestParameters['menuId'] == null) {
            throw new runtime.RequiredError(
                'menuId',
                'Required parameter "menuId" was null or undefined when calling updateMenuInfo().'
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
            path: `/menu/info/{menuId}`.replace(`{${"menuId"}}`, encodeURIComponent(String(requestParameters['menuId']))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: UpdateMenuInfoRequestToJSON(requestParameters['updateMenuInfoRequest']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => MenuInfoResponseDTOFromJSON(jsonValue));
    }

    /**
     * 등록된 메뉴 정보 변경
     * 메뉴 정보 변경
     */
    async updateMenuInfo(requestParameters: UpdateMenuInfoOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<MenuInfoResponseDTO> {
        const response = await this.updateMenuInfoRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
