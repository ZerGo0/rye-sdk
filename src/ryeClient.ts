// PLEASE AUTO IMPORT USING VSCODE "Add all missing imports" FEATURE!

import { Client, OperationResult, OperationResultSource } from '@urql/core';

import { DEFAULT_ENVIRONMENT, ENVIRONMENT, OPERATION } from './constants';
import { ADD_CART_ITEMS_MUTATION } from './gql/addCartItems';
import { CANCEL_ORDER_MUTATION } from './gql/cancelOrder';
import { CHECKOUT_BY_CART_ID_QUERY } from './gql/checkoutByCartID';
import { CREATE_CART_MUTATION } from './gql/createCart';
import { DELETE_CART_ITEMS_MUTATION } from './gql/deleteCartItems';
import { ENVIRONMENT_TOKEN_QUERY } from './gql/environmentToken';
import { EXPERIMENTAL_AFFILIATE_COMMISSION_QUERY } from './gql/experimentalAffiliateCommission';
import { EXPERIMENTAL_AFFILIATE_MERCHANTS_CONNECTION_QUERY } from './gql/experimentalAffiliateMerchantsConnection';
import { GET_CART_QUERY } from './gql/getCart';
import { INTEGRATED_SHOPIFY_STORE_QUERY } from './gql/integratedShopifyStore';
import { ORDER_BY_ID_QUERY } from './gql/orderByID';
import { PRODUCT_BY_ID_QUERY } from './gql/productByID';
import { PRODUCTS_BY_DOMAIN_V2_QUERY } from './gql/productsByDomainV2';
import { PRODUCTS_BY_IDS_QUERY } from './gql/productsByIds';
import { PROPOSE_SHOPIFY_MERCHANT_COMMISSION_MUTATION } from './gql/proposeShopifyMerchantCommission';
import { REMOVE_CART_MUTATION } from './gql/removeCart';
import { REQUEST_AMAZON_PRODUCT_BY_URL_MUTATION } from './gql/requestAmazonProductByURL';
import { REQUEST_PRODUCT_BY_URL_MUTATION } from './gql/requestProductByURL';
import { REQUEST_SHOPIFY_PRODUCT_BY_URL_MUTATION } from './gql/requestShopifyProductByURL';
import { REQUEST_STORE_BY_URL_MUTATION } from './gql/requestStoreByURL';
import { RETURN_BY_ID_QUERY } from './gql/returnByID';
import { RETURN_ORDER_MUTATION } from './gql/returnOrder';
import { SHOPIFY_APP_QUERY } from './gql/shopifyApp';
import { SHOPIFY_COLLECTION_QUERY } from './gql/shopifyCollection';
import { SUBMIT_CART_MUTATION } from './gql/submitCart';
import { UPDATE_CART_BUYER_IDENTITY_MUTATION } from './gql/updateCartBuyerIdentity';
import { UPDATE_CART_ITEMS_MUTATION } from './gql/updateCartItems';
import { UPDATE_CART_SELECTED_SHIPPING_OPTIONS_MUTATION } from './gql/updateCartSelectedShippingOptions';
import {
  AddCartItemsMutation,
  AddCartItemsMutationVariables,
  CancelOrderMutation,
  CancelOrderMutationVariables,
  CheckoutByCartIdQuery,
  CheckoutByCartIdQueryVariables,
  CreateCartMutation,
  CreateCartMutationVariables,
  DeleteCartItemsMutation,
  DeleteCartItemsMutationVariables,
  EnvironmentTokenQuery,
  EnvironmentTokenQueryVariables,
  ExperimentalAffiliateCommissionQuery,
  ExperimentalAffiliateCommissionQueryVariables,
  ExperimentalAffiliateMerchantsConnectionQuery,
  ExperimentalAffiliateMerchantsConnectionQueryVariables,
  GetCartQuery,
  GetCartQueryVariables,
  IntegratedShopifyStoreQuery,
  IntegratedShopifyStoreQueryVariables,
  OrderByIdQuery,
  OrderByIdQueryVariables,
  ProductByIdQuery,
  ProductByIdQueryVariables,
  ProductsByDomainV2Query,
  ProductsByDomainV2QueryVariables,
  ProductsByIdsQuery,
  ProductsByIdsQueryVariables,
  ProposeShopifyMerchantCommissionMutation,
  ProposeShopifyMerchantCommissionMutationVariables,
  RemoveCartMutation,
  RemoveCartMutationVariables,
  RequestAmazonProductByUrlMutation,
  RequestAmazonProductByUrlMutationVariables,
  RequestProductByUrlMutation,
  RequestProductByUrlMutationVariables,
  RequestShopifyProductByUrlMutation,
  RequestShopifyProductByUrlMutationVariables,
  RequestStoreByUrlMutation,
  RequestStoreByUrlMutationVariables,
  ReturnByIdQuery,
  ReturnByIdQueryVariables,
  ReturnOrderMutation,
  ReturnOrderMutationVariables,
  ShopifyAppQuery,
  ShopifyAppQueryVariables,
  ShopifyCollectionQuery,
  ShopifyCollectionQueryVariables,
  SubmitCartMutation,
  SubmitCartMutationVariables,
  UpdateCartBuyerIdentityMutation,
  UpdateCartBuyerIdentityMutationVariables,
  UpdateCartItemsMutation,
  UpdateCartItemsMutationVariables,
  UpdateCartSelectedShippingOptionsMutation,
  UpdateCartSelectedShippingOptionsMutationVariables,
} from './graphql/graphql';
import { apiRequest, initializeClient } from './ryeClientHelper';

interface IRyeClient {
  addCartItems(
    params: AddCartItemsMutationVariables,
  ): Promise<
    OperationResultSource<OperationResult<AddCartItemsMutation, AddCartItemsMutationVariables>>
  >;

  cancelOrder(
    params: CancelOrderMutationVariables,
  ): Promise<
    OperationResultSource<OperationResult<CancelOrderMutation, CancelOrderMutationVariables>>
  >;

  checkoutByCartID(
    params: CheckoutByCartIdQueryVariables,
  ): Promise<
    OperationResultSource<OperationResult<CheckoutByCartIdQuery, CheckoutByCartIdQueryVariables>>
  >;

  createCart(
    params: CreateCartMutationVariables,
  ): Promise<
    OperationResultSource<OperationResult<CreateCartMutation, CreateCartMutationVariables>>
  >;

  deleteCartItems(
    params: DeleteCartItemsMutationVariables,
  ): Promise<
    OperationResultSource<
      OperationResult<DeleteCartItemsMutation, DeleteCartItemsMutationVariables>
    >
  >;

  environmentToken(
    params: EnvironmentTokenQueryVariables,
  ): Promise<
    OperationResultSource<OperationResult<EnvironmentTokenQuery, EnvironmentTokenQueryVariables>>
  >;

  experimentalAffiliateCommission(
    params: ExperimentalAffiliateCommissionQueryVariables,
  ): Promise<
    OperationResultSource<
      OperationResult<
        ExperimentalAffiliateCommissionQuery,
        ExperimentalAffiliateCommissionQueryVariables
      >
    >
  >;

  experimentalAffiliateMerchantsConnection(
    params: ExperimentalAffiliateMerchantsConnectionQueryVariables,
  ): Promise<
    OperationResultSource<
      OperationResult<
        ExperimentalAffiliateMerchantsConnectionQuery,
        ExperimentalAffiliateMerchantsConnectionQueryVariables
      >
    >
  >;

  getCart(
    params: GetCartQueryVariables,
  ): Promise<OperationResultSource<OperationResult<GetCartQuery, GetCartQueryVariables>>>;

  integratedShopifyStore(
    params: IntegratedShopifyStoreQueryVariables,
  ): Promise<
    OperationResultSource<
      OperationResult<IntegratedShopifyStoreQuery, IntegratedShopifyStoreQueryVariables>
    >
  >;

  orderByID(
    params: OrderByIdQueryVariables,
  ): Promise<OperationResultSource<OperationResult<OrderByIdQuery, OrderByIdQueryVariables>>>;

  productByID(
    params: ProductByIdQueryVariables,
  ): Promise<OperationResultSource<OperationResult<ProductByIdQuery, ProductByIdQueryVariables>>>;

  productsByDomainV2(
    params: ProductsByDomainV2QueryVariables,
  ): Promise<
    OperationResultSource<
      OperationResult<ProductsByDomainV2Query, ProductsByDomainV2QueryVariables>
    >
  >;

  productsByIds(
    params: ProductsByIdsQueryVariables,
  ): Promise<
    OperationResultSource<OperationResult<ProductsByIdsQuery, ProductsByIdsQueryVariables>>
  >;

  proposeShopifyMerchantCommission(
    params: ProposeShopifyMerchantCommissionMutationVariables,
  ): Promise<
    OperationResultSource<
      OperationResult<
        ProposeShopifyMerchantCommissionMutation,
        ProposeShopifyMerchantCommissionMutationVariables
      >
    >
  >;

  removeCart(
    params: RemoveCartMutationVariables,
  ): Promise<
    OperationResultSource<OperationResult<RemoveCartMutation, RemoveCartMutationVariables>>
  >;

  requestAmazonProductByURL(
    params: RequestAmazonProductByUrlMutationVariables,
  ): Promise<
    OperationResultSource<
      OperationResult<RequestAmazonProductByUrlMutation, RequestAmazonProductByUrlMutationVariables>
    >
  >;

  requestProductByURL(
    params: RequestProductByUrlMutationVariables,
  ): Promise<
    OperationResultSource<
      OperationResult<RequestProductByUrlMutation, RequestProductByUrlMutationVariables>
    >
  >;

  requestShopifyProductByURL(
    params: RequestShopifyProductByUrlMutationVariables,
  ): Promise<
    OperationResultSource<
      OperationResult<
        RequestShopifyProductByUrlMutation,
        RequestShopifyProductByUrlMutationVariables
      >
    >
  >;

  requestStoreByURL(
    params: RequestStoreByUrlMutationVariables,
  ): Promise<
    OperationResultSource<
      OperationResult<RequestStoreByUrlMutation, RequestStoreByUrlMutationVariables>
    >
  >;

  returnByID(
    params: ReturnByIdQueryVariables,
  ): Promise<OperationResultSource<OperationResult<ReturnByIdQuery, ReturnByIdQueryVariables>>>;

  returnOrder(
    params: ReturnOrderMutationVariables,
  ): Promise<
    OperationResultSource<OperationResult<ReturnOrderMutation, ReturnOrderMutationVariables>>
  >;

  shopifyApp(
    params: ShopifyAppQueryVariables,
  ): Promise<OperationResultSource<OperationResult<ShopifyAppQuery, ShopifyAppQueryVariables>>>;

  shopifyCollection(
    params: ShopifyCollectionQueryVariables,
  ): Promise<
    OperationResultSource<OperationResult<ShopifyCollectionQuery, ShopifyCollectionQueryVariables>>
  >;

  submitCart(
    params: SubmitCartMutationVariables,
  ): Promise<
    OperationResultSource<OperationResult<SubmitCartMutation, SubmitCartMutationVariables>>
  >;

  updateCartBuyerIdentity(
    params: UpdateCartBuyerIdentityMutationVariables,
  ): Promise<
    OperationResultSource<
      OperationResult<UpdateCartBuyerIdentityMutation, UpdateCartBuyerIdentityMutationVariables>
    >
  >;

  updateCartItems(
    params: UpdateCartItemsMutationVariables,
  ): Promise<
    OperationResultSource<
      OperationResult<UpdateCartItemsMutation, UpdateCartItemsMutationVariables>
    >
  >;

  updateCartSelectedShippingOptions(
    params: UpdateCartSelectedShippingOptionsMutationVariables,
  ): Promise<
    OperationResultSource<
      OperationResult<
        UpdateCartSelectedShippingOptionsMutation,
        UpdateCartSelectedShippingOptionsMutationVariables
      >
    >
  >;
}

interface RyeClientOptions {
  authHeader: string;
  /** @default {ENVIRONMENT.PRODUCTION} */
  environment?: ENVIRONMENT;
  shopperIp: string;
}

class RyeClient implements IRyeClient {
  private authHeader: string | null;
  private shopperIp: string | null;
  private environment: ENVIRONMENT;
  private ryeClient: Client;

  /**
   * @deprecated This signature is deprecated. Please use the alternate constructor signature that takes a {@link RyeClientOptions} bag.
   */
  constructor(authHeader: string, shopperIp: string, environment?: ENVIRONMENT);
  constructor(options: RyeClientOptions);
  constructor(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...args: any[]
  ) {
    if (args.length === 1) {
      const options = args[0];
      this.authHeader = options.authHeader;
      this.shopperIp = options.shopperIp;
      this.environment = options.environment || DEFAULT_ENVIRONMENT;
    } else {
      const [authHeader, shopperIp, environment] = args;
      this.authHeader = authHeader;
      this.shopperIp = shopperIp;
      this.environment = environment || DEFAULT_ENVIRONMENT;
    }

    this.ryeClient = this.initializeClient();
  }

  /**
   * Initialize the client with the specified authentication header and shopper IP.
   * @returns A new instance of the Client class.
   */
  private initializeClient() {
    return initializeClient(this.authHeader!, this.shopperIp!, this.environment);
  }

  /**
   * addCartItems operation.
   * @param params - The params for the addCartItems operation.
   * @returns A promise that resolves to the operation result.
   */
  addCartItems = async (
    params: AddCartItemsMutationVariables,
  ): Promise<
    OperationResultSource<OperationResult<AddCartItemsMutation, AddCartItemsMutationVariables>>
  > => {
    return await apiRequest(this.ryeClient, ADD_CART_ITEMS_MUTATION, params, OPERATION.MUTATION);
  };

  /**
   * cancelOrder operation.
   * @param params - The params for the cancelOrder operation.
   * @returns A promise that resolves to the operation result.
   */
  cancelOrder = async (
    params: CancelOrderMutationVariables,
  ): Promise<
    OperationResultSource<OperationResult<CancelOrderMutation, CancelOrderMutationVariables>>
  > => {
    return await apiRequest(this.ryeClient, CANCEL_ORDER_MUTATION, params, OPERATION.MUTATION);
  };

  /**
   * checkoutByCartID operation.
   * @param params - The params for the checkoutByCartID operation.
   * @returns A promise that resolves to the operation result.
   */
  checkoutByCartID = async (
    params: CheckoutByCartIdQueryVariables,
  ): Promise<
    OperationResultSource<OperationResult<CheckoutByCartIdQuery, CheckoutByCartIdQueryVariables>>
  > => {
    return await apiRequest(this.ryeClient, CHECKOUT_BY_CART_ID_QUERY, params);
  };

  /**
   * createCart operation.
   * @param params - The params for the createCart operation.
   * @returns A promise that resolves to the operation result.
   */
  createCart = async (
    params: CreateCartMutationVariables,
  ): Promise<
    OperationResultSource<OperationResult<CreateCartMutation, CreateCartMutationVariables>>
  > => {
    return await apiRequest(this.ryeClient, CREATE_CART_MUTATION, params, OPERATION.MUTATION);
  };

  /**
   * deleteCartItems operation.
   * @param params - The params for the deleteCartItems operation.
   * @returns A promise that resolves to the operation result.
   */
  deleteCartItems = async (
    params: DeleteCartItemsMutationVariables,
  ): Promise<
    OperationResultSource<
      OperationResult<DeleteCartItemsMutation, DeleteCartItemsMutationVariables>
    >
  > => {
    return await apiRequest(this.ryeClient, DELETE_CART_ITEMS_MUTATION, params, OPERATION.MUTATION);
  };

  /**
   * environmentToken operation.
   * @param params - The params for the environmentToken operation.
   * @returns A promise that resolves to the operation result.
   */
  environmentToken = async (
    params: EnvironmentTokenQueryVariables,
  ): Promise<
    OperationResultSource<OperationResult<EnvironmentTokenQuery, EnvironmentTokenQueryVariables>>
  > => {
    return await apiRequest(this.ryeClient, ENVIRONMENT_TOKEN_QUERY, params);
  };

  /**
   * experimentalAffiliateCommission operation.
   * @param params - The params for the experimentalAffiliateCommission operation.
   * @returns A promise that resolves to the operation result.
   */
  experimentalAffiliateCommission = async (
    params: ExperimentalAffiliateCommissionQueryVariables,
  ): Promise<
    OperationResultSource<
      OperationResult<
        ExperimentalAffiliateCommissionQuery,
        ExperimentalAffiliateCommissionQueryVariables
      >
    >
  > => {
    return await apiRequest(this.ryeClient, EXPERIMENTAL_AFFILIATE_COMMISSION_QUERY, params);
  };

  /**
   * experimentalAffiliateMerchantsConnection operation.
   * @param params - The params for the experimentalAffiliateMerchantsConnection operation.
   * @returns A promise that resolves to the operation result.
   */
  experimentalAffiliateMerchantsConnection = async (
    params: ExperimentalAffiliateMerchantsConnectionQueryVariables,
  ): Promise<
    OperationResultSource<
      OperationResult<
        ExperimentalAffiliateMerchantsConnectionQuery,
        ExperimentalAffiliateMerchantsConnectionQueryVariables
      >
    >
  > => {
    return await apiRequest(
      this.ryeClient,
      EXPERIMENTAL_AFFILIATE_MERCHANTS_CONNECTION_QUERY,
      params,
    );
  };

  /**
   * getCart operation.
   * @param params - The params for the getCart operation.
   * @returns A promise that resolves to the operation result.
   */
  getCart = async (
    params: GetCartQueryVariables,
  ): Promise<OperationResultSource<OperationResult<GetCartQuery, GetCartQueryVariables>>> => {
    return await apiRequest(this.ryeClient, GET_CART_QUERY, params);
  };

  /**
   * integratedShopifyStore operation.
   * @param params - The params for the integratedShopifyStore operation.
   * @returns A promise that resolves to the operation result.
   */
  integratedShopifyStore = async (
    params: IntegratedShopifyStoreQueryVariables,
  ): Promise<
    OperationResultSource<
      OperationResult<IntegratedShopifyStoreQuery, IntegratedShopifyStoreQueryVariables>
    >
  > => {
    return await apiRequest(this.ryeClient, INTEGRATED_SHOPIFY_STORE_QUERY, params);
  };

  /**
   * orderByID operation.
   * @param params - The params for the orderByID operation.
   * @returns A promise that resolves to the operation result.
   */
  orderByID = async (
    params: OrderByIdQueryVariables,
  ): Promise<OperationResultSource<OperationResult<OrderByIdQuery, OrderByIdQueryVariables>>> => {
    return await apiRequest(this.ryeClient, ORDER_BY_ID_QUERY, params);
  };

  /**
   * productByID operation.
   * @param params - The params for the productByID operation.
   * @returns A promise that resolves to the operation result.
   */
  productByID = async (
    params: ProductByIdQueryVariables,
  ): Promise<
    OperationResultSource<OperationResult<ProductByIdQuery, ProductByIdQueryVariables>>
  > => {
    return await apiRequest(this.ryeClient, PRODUCT_BY_ID_QUERY, params);
  };

  /**
   * productsByDomainV2 operation.
   * @param params - The params for the productsByDomainV2 operation.
   * @returns A promise that resolves to the operation result.
   */
  productsByDomainV2 = async (
    params: ProductsByDomainV2QueryVariables,
  ): Promise<
    OperationResultSource<
      OperationResult<ProductsByDomainV2Query, ProductsByDomainV2QueryVariables>
    >
  > => {
    return await apiRequest(this.ryeClient, PRODUCTS_BY_DOMAIN_V2_QUERY, params);
  };

  /**
   * productsByIds operation.
   * @param params - The params for the productsByIds operation.
   * @returns A promise that resolves to the operation result.
   */
  productsByIds = async (
    params: ProductsByIdsQueryVariables,
  ): Promise<
    OperationResultSource<OperationResult<ProductsByIdsQuery, ProductsByIdsQueryVariables>>
  > => {
    return await apiRequest(this.ryeClient, PRODUCTS_BY_IDS_QUERY, params);
  };

  /**
   * proposeShopifyMerchantCommission operation.
   * @param params - The params for the proposeShopifyMerchantCommission operation.
   * @returns A promise that resolves to the operation result.
   */
  proposeShopifyMerchantCommission = async (
    params: ProposeShopifyMerchantCommissionMutationVariables,
  ): Promise<
    OperationResultSource<
      OperationResult<
        ProposeShopifyMerchantCommissionMutation,
        ProposeShopifyMerchantCommissionMutationVariables
      >
    >
  > => {
    return await apiRequest(
      this.ryeClient,
      PROPOSE_SHOPIFY_MERCHANT_COMMISSION_MUTATION,
      params,
      OPERATION.MUTATION,
    );
  };

  /**
   * removeCart operation.
   * @param params - The params for the removeCart operation.
   * @returns A promise that resolves to the operation result.
   */
  removeCart = async (
    params: RemoveCartMutationVariables,
  ): Promise<
    OperationResultSource<OperationResult<RemoveCartMutation, RemoveCartMutationVariables>>
  > => {
    return await apiRequest(this.ryeClient, REMOVE_CART_MUTATION, params, OPERATION.MUTATION);
  };

  /**
   * requestAmazonProductByURL operation.
   * @param params - The params for the requestAmazonProductByURL operation.
   * @returns A promise that resolves to the operation result.
   */
  requestAmazonProductByURL = async (
    params: RequestAmazonProductByUrlMutationVariables,
  ): Promise<
    OperationResultSource<
      OperationResult<RequestAmazonProductByUrlMutation, RequestAmazonProductByUrlMutationVariables>
    >
  > => {
    return await apiRequest(
      this.ryeClient,
      REQUEST_AMAZON_PRODUCT_BY_URL_MUTATION,
      params,
      OPERATION.MUTATION,
    );
  };

  /**
   * requestProductByURL operation.
   * @param params - The params for the requestProductByURL operation.
   * @returns A promise that resolves to the operation result.
   */
  requestProductByURL = async (
    params: RequestProductByUrlMutationVariables,
  ): Promise<
    OperationResultSource<
      OperationResult<RequestProductByUrlMutation, RequestProductByUrlMutationVariables>
    >
  > => {
    return await apiRequest(
      this.ryeClient,
      REQUEST_PRODUCT_BY_URL_MUTATION,
      params,
      OPERATION.MUTATION,
    );
  };

  /**
   * requestShopifyProductByURL operation.
   * @param params - The params for the requestShopifyProductByURL operation.
   * @returns A promise that resolves to the operation result.
   */
  requestShopifyProductByURL = async (
    params: RequestShopifyProductByUrlMutationVariables,
  ): Promise<
    OperationResultSource<
      OperationResult<
        RequestShopifyProductByUrlMutation,
        RequestShopifyProductByUrlMutationVariables
      >
    >
  > => {
    return await apiRequest(
      this.ryeClient,
      REQUEST_SHOPIFY_PRODUCT_BY_URL_MUTATION,
      params,
      OPERATION.MUTATION,
    );
  };

  /**
   * requestStoreByURL operation.
   * @param params - The params for the requestStoreByURL operation.
   * @returns A promise that resolves to the operation result.
   */
  requestStoreByURL = async (
    params: RequestStoreByUrlMutationVariables,
  ): Promise<
    OperationResultSource<
      OperationResult<RequestStoreByUrlMutation, RequestStoreByUrlMutationVariables>
    >
  > => {
    return await apiRequest(
      this.ryeClient,
      REQUEST_STORE_BY_URL_MUTATION,
      params,
      OPERATION.MUTATION,
    );
  };

  /**
   * returnByID operation.
   * @param params - The params for the returnByID operation.
   * @returns A promise that resolves to the operation result.
   */
  returnByID = async (
    params: ReturnByIdQueryVariables,
  ): Promise<OperationResultSource<OperationResult<ReturnByIdQuery, ReturnByIdQueryVariables>>> => {
    return await apiRequest(this.ryeClient, RETURN_BY_ID_QUERY, params);
  };

  /**
   * returnOrder operation.
   * @param params - The params for the returnOrder operation.
   * @returns A promise that resolves to the operation result.
   */
  returnOrder = async (
    params: ReturnOrderMutationVariables,
  ): Promise<
    OperationResultSource<OperationResult<ReturnOrderMutation, ReturnOrderMutationVariables>>
  > => {
    return await apiRequest(this.ryeClient, RETURN_ORDER_MUTATION, params, OPERATION.MUTATION);
  };

  /**
   * shopifyApp operation.
   * @param params - The params for the shopifyApp operation.
   * @returns A promise that resolves to the operation result.
   */
  shopifyApp = async (
    params: ShopifyAppQueryVariables,
  ): Promise<OperationResultSource<OperationResult<ShopifyAppQuery, ShopifyAppQueryVariables>>> => {
    return await apiRequest(this.ryeClient, SHOPIFY_APP_QUERY, params);
  };

  /**
   * shopifyCollection operation.
   * @param params - The params for the shopifyCollection operation.
   * @returns A promise that resolves to the operation result.
   */
  shopifyCollection = async (
    params: ShopifyCollectionQueryVariables,
  ): Promise<
    OperationResultSource<OperationResult<ShopifyCollectionQuery, ShopifyCollectionQueryVariables>>
  > => {
    return await apiRequest(this.ryeClient, SHOPIFY_COLLECTION_QUERY, params);
  };

  /**
   * submitCart operation.
   * @param params - The params for the submitCart operation.
   * @returns A promise that resolves to the operation result.
   */
  submitCart = async (
    params: SubmitCartMutationVariables,
  ): Promise<
    OperationResultSource<OperationResult<SubmitCartMutation, SubmitCartMutationVariables>>
  > => {
    return await apiRequest(this.ryeClient, SUBMIT_CART_MUTATION, params, OPERATION.MUTATION);
  };

  /**
   * updateCartBuyerIdentity operation.
   * @param params - The params for the updateCartBuyerIdentity operation.
   * @returns A promise that resolves to the operation result.
   */
  updateCartBuyerIdentity = async (
    params: UpdateCartBuyerIdentityMutationVariables,
  ): Promise<
    OperationResultSource<
      OperationResult<UpdateCartBuyerIdentityMutation, UpdateCartBuyerIdentityMutationVariables>
    >
  > => {
    return await apiRequest(
      this.ryeClient,
      UPDATE_CART_BUYER_IDENTITY_MUTATION,
      params,
      OPERATION.MUTATION,
    );
  };

  /**
   * updateCartItems operation.
   * @param params - The params for the updateCartItems operation.
   * @returns A promise that resolves to the operation result.
   */
  updateCartItems = async (
    params: UpdateCartItemsMutationVariables,
  ): Promise<
    OperationResultSource<
      OperationResult<UpdateCartItemsMutation, UpdateCartItemsMutationVariables>
    >
  > => {
    return await apiRequest(this.ryeClient, UPDATE_CART_ITEMS_MUTATION, params, OPERATION.MUTATION);
  };

  /**
   * updateCartSelectedShippingOptions operation.
   * @param params - The params for the updateCartSelectedShippingOptions operation.
   * @returns A promise that resolves to the operation result.
   */
  updateCartSelectedShippingOptions = async (
    params: UpdateCartSelectedShippingOptionsMutationVariables,
  ): Promise<
    OperationResultSource<
      OperationResult<
        UpdateCartSelectedShippingOptionsMutation,
        UpdateCartSelectedShippingOptionsMutationVariables
      >
    >
  > => {
    return await apiRequest(
      this.ryeClient,
      UPDATE_CART_SELECTED_SHIPPING_OPTIONS_MUTATION,
      params,
      OPERATION.MUTATION,
    );
  };
}

export { RyeClient };
