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
  CategoryInfoRequestDTO,
  CategoryInfoResponseDTO,
  ErrorResponse,
  PageCategoryInfoResponseDTO,
  Pageable,
} from '../models/index';
import {
    CategoryInfoRequestDTOFromJSON,
    CategoryInfoRequestDTOToJSON,
    CategoryInfoResponseDTOFromJSON,
    CategoryInfoResponseDTOToJSON,
    ErrorResponseFromJSON,
    ErrorResponseToJSON,
    PageCategoryInfoResponseDTOFromJSON,
    PageCategoryInfoResponseDTOToJSON,
    PageableFromJSON,
    PageableToJSON,
} from '../models/index';

export interface CreateCategoryInfoRequest {
    storeId: number;
    categoryInfoRequestDTO: CategoryInfoRequestDTO;
}

export interface DeleteCategoryInfoRequest {
    categoryId: number;
}

export interface GetCategoryInfoRequest {
    categoryId: number;
}

export interface GetCategoryInfo1Request {
    storeId: number;
    pageable: Pageable;
}

export interface UpdateCategoryInfoRequest {
    categoryId: number;
    categoryInfoRequestDTO: CategoryInfoRequestDTO;
}

/**
 * 
 */
export class CategoryControllerApi extends runtime.BaseAPI {

    /**
     * 가게의 상품 혹은 음식에 대한 카테고리 정보 등록 기존에 저장된 동일한 카테고리 정보를 다시 저장하는 것은 불가능
     * 카테고리 정보 등록
     */
    async createCategoryInfoRaw(requestParameters: CreateCategoryInfoRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<CategoryInfoResponseDTO>> {
        if (requestParameters['storeId'] == null) {
            throw new runtime.RequiredError(
                'storeId',
                'Required parameter "storeId" was null or undefined when calling createCategoryInfo().'
            );
        }

        if (requestParameters['categoryInfoRequestDTO'] == null) {
            throw new runtime.RequiredError(
                'categoryInfoRequestDTO',
                'Required parameter "categoryInfoRequestDTO" was null or undefined when calling createCategoryInfo().'
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
            path: `/category/info/{storeId}`.replace(`{${"storeId"}}`, encodeURIComponent(String(requestParameters['storeId']))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CategoryInfoRequestDTOToJSON(requestParameters['categoryInfoRequestDTO']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => CategoryInfoResponseDTOFromJSON(jsonValue));
    }

    /**
     * 가게의 상품 혹은 음식에 대한 카테고리 정보 등록 기존에 저장된 동일한 카테고리 정보를 다시 저장하는 것은 불가능
     * 카테고리 정보 등록
     */
    async createCategoryInfo(requestParameters: CreateCategoryInfoRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<CategoryInfoResponseDTO> {
        const response = await this.createCategoryInfoRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * 등록된 카테고리 정보를 제거
     * 카테고리 정보 제거
     */
    async deleteCategoryInfoRaw(requestParameters: DeleteCategoryInfoRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters['categoryId'] == null) {
            throw new runtime.RequiredError(
                'categoryId',
                'Required parameter "categoryId" was null or undefined when calling deleteCategoryInfo().'
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
            path: `/category/info/{categoryId}`.replace(`{${"categoryId"}}`, encodeURIComponent(String(requestParameters['categoryId']))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * 등록된 카테고리 정보를 제거
     * 카테고리 정보 제거
     */
    async deleteCategoryInfo(requestParameters: DeleteCategoryInfoRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.deleteCategoryInfoRaw(requestParameters, initOverrides);
    }

    /**
     * 특정 카테고리 정보 조회
     * 특정 카테고리 정보 조회
     */
    async getCategoryInfoRaw(requestParameters: GetCategoryInfoRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<CategoryInfoResponseDTO>> {
        if (requestParameters['categoryId'] == null) {
            throw new runtime.RequiredError(
                'categoryId',
                'Required parameter "categoryId" was null or undefined when calling getCategoryInfo().'
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
            path: `/category/info/{categoryId}`.replace(`{${"categoryId"}}`, encodeURIComponent(String(requestParameters['categoryId']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => CategoryInfoResponseDTOFromJSON(jsonValue));
    }

    /**
     * 특정 카테고리 정보 조회
     * 특정 카테고리 정보 조회
     */
    async getCategoryInfo(requestParameters: GetCategoryInfoRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<CategoryInfoResponseDTO> {
        const response = await this.getCategoryInfoRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * 가게 ID값 기반으로 등록된 카테고리 정보 조회
     * 카테고리 정보 조회
     */
    async getCategoryInfo1Raw(requestParameters: GetCategoryInfo1Request, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PageCategoryInfoResponseDTO>> {
        if (requestParameters['storeId'] == null) {
            throw new runtime.RequiredError(
                'storeId',
                'Required parameter "storeId" was null or undefined when calling getCategoryInfo1().'
            );
        }

        if (requestParameters['pageable'] == null) {
            throw new runtime.RequiredError(
                'pageable',
                'Required parameter "pageable" was null or undefined when calling getCategoryInfo1().'
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
            path: `/category/info/store/{storeId}`.replace(`{${"storeId"}}`, encodeURIComponent(String(requestParameters['storeId']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PageCategoryInfoResponseDTOFromJSON(jsonValue));
    }

    /**
     * 가게 ID값 기반으로 등록된 카테고리 정보 조회
     * 카테고리 정보 조회
     */
    async getCategoryInfo1(requestParameters: GetCategoryInfo1Request, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PageCategoryInfoResponseDTO> {
        const response = await this.getCategoryInfo1Raw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * 등록된 카테고리 정보를 변경
     * 카테고리 정보 변경
     */
    async updateCategoryInfoRaw(requestParameters: UpdateCategoryInfoRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<CategoryInfoResponseDTO>> {
        if (requestParameters['categoryId'] == null) {
            throw new runtime.RequiredError(
                'categoryId',
                'Required parameter "categoryId" was null or undefined when calling updateCategoryInfo().'
            );
        }

        if (requestParameters['categoryInfoRequestDTO'] == null) {
            throw new runtime.RequiredError(
                'categoryInfoRequestDTO',
                'Required parameter "categoryInfoRequestDTO" was null or undefined when calling updateCategoryInfo().'
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
            path: `/category/info/{categoryId}`.replace(`{${"categoryId"}}`, encodeURIComponent(String(requestParameters['categoryId']))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: CategoryInfoRequestDTOToJSON(requestParameters['categoryInfoRequestDTO']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => CategoryInfoResponseDTOFromJSON(jsonValue));
    }

    /**
     * 등록된 카테고리 정보를 변경
     * 카테고리 정보 변경
     */
    async updateCategoryInfo(requestParameters: UpdateCategoryInfoRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<CategoryInfoResponseDTO> {
        const response = await this.updateCategoryInfoRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
