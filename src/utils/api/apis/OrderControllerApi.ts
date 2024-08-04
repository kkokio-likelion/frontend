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
  OrderInfoRequestDTO,
  OrderInfoResponseDTO,
  OrderTimeResponseDTO,
  PageOrderInfoResponseDTO,
  Pageable,
} from '../models/index';
import {
    ErrorResponseFromJSON,
    ErrorResponseToJSON,
    OrderInfoRequestDTOFromJSON,
    OrderInfoRequestDTOToJSON,
    OrderInfoResponseDTOFromJSON,
    OrderInfoResponseDTOToJSON,
    OrderTimeResponseDTOFromJSON,
    OrderTimeResponseDTOToJSON,
    PageOrderInfoResponseDTOFromJSON,
    PageOrderInfoResponseDTOToJSON,
    PageableFromJSON,
    PageableToJSON,
} from '../models/index';

export interface CookOrderInfoRequest {
    orderId: number;
}

export interface CreateOrderInfoRequest {
    storeId: number;
    orderInfoRequestDTO: Array<OrderInfoRequestDTO>;
}

export interface DeleteOrderInfoRequest {
    orderId: number;
}

export interface FinishOrderInfoRequest {
    orderId: number;
}

export interface GetOrderInfoByOrderIdRequest {
    orderId: number;
}

export interface GetOrderInfoByStoreIdRequest {
    storeId: number;
    pageable: Pageable;
}

export interface GetOrderInfoByStoreIdAndCategoryIdRequest {
    storeId: number;
    categoryId: number;
    pageable: Pageable;
}

export interface UpdateOrderInfoRequest {
    orderId: number;
    orderInfoRequestDTO: Array<OrderInfoRequestDTO>;
}

/**
 * 
 */
export class OrderControllerApi extends runtime.BaseAPI {

    /**
     * 등록된 주문에 대한 요리 시작 정보 등록
     * 주문 요리 시작
     */
    async cookOrderInfoRaw(requestParameters: CookOrderInfoRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<OrderTimeResponseDTO>> {
        if (requestParameters['orderId'] == null) {
            throw new runtime.RequiredError(
                'orderId',
                'Required parameter "orderId" was null or undefined when calling cookOrderInfo().'
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
            path: `/order/cook/{orderId}`.replace(`{${"orderId"}}`, encodeURIComponent(String(requestParameters['orderId']))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => OrderTimeResponseDTOFromJSON(jsonValue));
    }

    /**
     * 등록된 주문에 대한 요리 시작 정보 등록
     * 주문 요리 시작
     */
    async cookOrderInfo(requestParameters: CookOrderInfoRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<OrderTimeResponseDTO> {
        const response = await this.cookOrderInfoRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * 주문 정보 등록
     * 주문 등록
     */
    async createOrderInfoRaw(requestParameters: CreateOrderInfoRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<OrderInfoResponseDTO>> {
        if (requestParameters['storeId'] == null) {
            throw new runtime.RequiredError(
                'storeId',
                'Required parameter "storeId" was null or undefined when calling createOrderInfo().'
            );
        }

        if (requestParameters['orderInfoRequestDTO'] == null) {
            throw new runtime.RequiredError(
                'orderInfoRequestDTO',
                'Required parameter "orderInfoRequestDTO" was null or undefined when calling createOrderInfo().'
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
            path: `/order/info/{storeId}`.replace(`{${"storeId"}}`, encodeURIComponent(String(requestParameters['storeId']))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters['orderInfoRequestDTO']!.map(OrderInfoRequestDTOToJSON),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => OrderInfoResponseDTOFromJSON(jsonValue));
    }

    /**
     * 주문 정보 등록
     * 주문 등록
     */
    async createOrderInfo(requestParameters: CreateOrderInfoRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<OrderInfoResponseDTO> {
        const response = await this.createOrderInfoRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * 등록된 주문 정보 삭제
     * 주문 삭제
     */
    async deleteOrderInfoRaw(requestParameters: DeleteOrderInfoRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters['orderId'] == null) {
            throw new runtime.RequiredError(
                'orderId',
                'Required parameter "orderId" was null or undefined when calling deleteOrderInfo().'
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
            path: `/order/info/{orderId}`.replace(`{${"orderId"}}`, encodeURIComponent(String(requestParameters['orderId']))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * 등록된 주문 정보 삭제
     * 주문 삭제
     */
    async deleteOrderInfo(requestParameters: DeleteOrderInfoRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.deleteOrderInfoRaw(requestParameters, initOverrides);
    }

    /**
     * 등록된 주문에 대한 요리 완료 및 서빙 시작 시간 등록
     * 주문 요리 완료
     */
    async finishOrderInfoRaw(requestParameters: FinishOrderInfoRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<OrderTimeResponseDTO>> {
        if (requestParameters['orderId'] == null) {
            throw new runtime.RequiredError(
                'orderId',
                'Required parameter "orderId" was null or undefined when calling finishOrderInfo().'
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
            path: `/order/finish/{orderId}`.replace(`{${"orderId"}}`, encodeURIComponent(String(requestParameters['orderId']))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => OrderTimeResponseDTOFromJSON(jsonValue));
    }

    /**
     * 등록된 주문에 대한 요리 완료 및 서빙 시작 시간 등록
     * 주문 요리 완료
     */
    async finishOrderInfo(requestParameters: FinishOrderInfoRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<OrderTimeResponseDTO> {
        const response = await this.finishOrderInfoRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * 특정 주문 정보 조회
     * 주문 조회
     */
    async getOrderInfoByOrderIdRaw(requestParameters: GetOrderInfoByOrderIdRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<OrderInfoResponseDTO>> {
        if (requestParameters['orderId'] == null) {
            throw new runtime.RequiredError(
                'orderId',
                'Required parameter "orderId" was null or undefined when calling getOrderInfoByOrderId().'
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
            path: `/order/info/{orderId}`.replace(`{${"orderId"}}`, encodeURIComponent(String(requestParameters['orderId']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => OrderInfoResponseDTOFromJSON(jsonValue));
    }

    /**
     * 특정 주문 정보 조회
     * 주문 조회
     */
    async getOrderInfoByOrderId(requestParameters: GetOrderInfoByOrderIdRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<OrderInfoResponseDTO> {
        const response = await this.getOrderInfoByOrderIdRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * 가게 ID를 기반으로 주문 정보 조회
     * 주문 조회
     */
    async getOrderInfoByStoreIdRaw(requestParameters: GetOrderInfoByStoreIdRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PageOrderInfoResponseDTO>> {
        if (requestParameters['storeId'] == null) {
            throw new runtime.RequiredError(
                'storeId',
                'Required parameter "storeId" was null or undefined when calling getOrderInfoByStoreId().'
            );
        }

        if (requestParameters['pageable'] == null) {
            throw new runtime.RequiredError(
                'pageable',
                'Required parameter "pageable" was null or undefined when calling getOrderInfoByStoreId().'
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
            path: `/order/info/store/{storeId}`.replace(`{${"storeId"}}`, encodeURIComponent(String(requestParameters['storeId']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PageOrderInfoResponseDTOFromJSON(jsonValue));
    }

    /**
     * 가게 ID를 기반으로 주문 정보 조회
     * 주문 조회
     */
    async getOrderInfoByStoreId(requestParameters: GetOrderInfoByStoreIdRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PageOrderInfoResponseDTO> {
        const response = await this.getOrderInfoByStoreIdRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * 가게 ID와 카테고리 ID값을 기반으로 주문 정보 조회
     * 주문 조회
     */
    async getOrderInfoByStoreIdAndCategoryIdRaw(requestParameters: GetOrderInfoByStoreIdAndCategoryIdRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PageOrderInfoResponseDTO>> {
        if (requestParameters['storeId'] == null) {
            throw new runtime.RequiredError(
                'storeId',
                'Required parameter "storeId" was null or undefined when calling getOrderInfoByStoreIdAndCategoryId().'
            );
        }

        if (requestParameters['categoryId'] == null) {
            throw new runtime.RequiredError(
                'categoryId',
                'Required parameter "categoryId" was null or undefined when calling getOrderInfoByStoreIdAndCategoryId().'
            );
        }

        if (requestParameters['pageable'] == null) {
            throw new runtime.RequiredError(
                'pageable',
                'Required parameter "pageable" was null or undefined when calling getOrderInfoByStoreIdAndCategoryId().'
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
            path: `/order/info/store/{storeId}/category/{categoryId}`.replace(`{${"storeId"}}`, encodeURIComponent(String(requestParameters['storeId']))).replace(`{${"categoryId"}}`, encodeURIComponent(String(requestParameters['categoryId']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PageOrderInfoResponseDTOFromJSON(jsonValue));
    }

    /**
     * 가게 ID와 카테고리 ID값을 기반으로 주문 정보 조회
     * 주문 조회
     */
    async getOrderInfoByStoreIdAndCategoryId(requestParameters: GetOrderInfoByStoreIdAndCategoryIdRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PageOrderInfoResponseDTO> {
        const response = await this.getOrderInfoByStoreIdAndCategoryIdRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * 등록된 주문의 내용을 변경
     * 주문 변경
     */
    async updateOrderInfoRaw(requestParameters: UpdateOrderInfoRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<OrderInfoResponseDTO>> {
        if (requestParameters['orderId'] == null) {
            throw new runtime.RequiredError(
                'orderId',
                'Required parameter "orderId" was null or undefined when calling updateOrderInfo().'
            );
        }

        if (requestParameters['orderInfoRequestDTO'] == null) {
            throw new runtime.RequiredError(
                'orderInfoRequestDTO',
                'Required parameter "orderInfoRequestDTO" was null or undefined when calling updateOrderInfo().'
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
            path: `/order/info/{orderId}`.replace(`{${"orderId"}}`, encodeURIComponent(String(requestParameters['orderId']))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters['orderInfoRequestDTO']!.map(OrderInfoRequestDTOToJSON),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => OrderInfoResponseDTOFromJSON(jsonValue));
    }

    /**
     * 등록된 주문의 내용을 변경
     * 주문 변경
     */
    async updateOrderInfo(requestParameters: UpdateOrderInfoRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<OrderInfoResponseDTO> {
        const response = await this.updateOrderInfoRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
