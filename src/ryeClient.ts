import {
  type AnyVariables,
  Client,
  type DocumentInput,
  fetchExchange,
  type OperationResult,
  type OperationResultSource,
} from '@urql/core';
import { retryExchange, type RetryExchangeOptions } from '@urql/exchange-retry';

import {
  DEFAULT_ENVIRONMENT,
  ENVIRONMENT,
  GRAPHQL_ENDPOINTS,
  OPERATION,
  RYE_SHOPPER_IP,
} from './constants';
import { ADD_CART_ITEMS_MUTATION } from './gql/addCartItems';
import { CHECKOUT_BY_CART_ID_QUERY } from './gql/checkoutByCartId';
import { CREATE_CART_MUTATION } from './gql/createCart';
import { DELETE_CART_ITEMS_MUTATION } from './gql/deleteCartItems';
import { ENVIRONMENT_TOKEN_QUERY } from './gql/environmentToken';
import { GET_CART_QUERY } from './gql/getCart';
import { INTEGRATED_SHOPIFY_STORE_QUERY } from './gql/integratedShopifyStore';
import { ORDER_BY_ID_QUERY } from './gql/orderById';
import { PRODUCT_BY_ID_QUERY } from './gql/productById';
import { PRODUCTS_BY_DOMAIN_V2_QUERY } from './gql/productsByDomainV2';
import { REMOVE_CART_MUTATION } from './gql/removeCart';
import { REQUEST_PRODUCT_BY_URL_MUTATION } from './gql/requestProductByURL';
import { REQUEST_STORE_BY_URL_MUTATION } from './gql/requestStoreByURL';
import { SHOPIFY_APP_QUERY } from './gql/shopifyApp';
import { SHOPIFY_COLLECTION_QUERY } from './gql/shopifyCollection';
import { SUBMIT_CART_MUTATION } from './gql/submitCart';
import { UPDATE_CART_BUYER_IDENTITY_MUTATION } from './gql/updateCartBuyerIdentity';
import { UPDATE_CART_ITEMS_MUTATION } from './gql/updateCartItems';
import { UPDATE_CART_SELECTED_SHIPPING_OPTIONS_MUTATION } from './gql/updateCartSelectedShippingOptions';
import {
  AddCartItemsMutation,
  CheckoutByCartIdQuery,
  CreateCartMutation,
  DeleteCartItemsMutation,
  EnvironmentTokenQuery,
  GetCartQuery,
  IntegratedShopifyStoreQuery,
  OrderByIdQuery,
  ProductByIdQuery,
  ProductsByDomainV2Query,
  RemoveCartMutation,
  RequestProductByUrlMutation,
  RequestStoreByUrlMutation,
  ShopifyAppQuery,
  ShopifyCollectionQuery,
  SubmitCartMutation,
  UpdateCartBuyerIdentityMutation,
  UpdateCartItemsMutation,
  UpdateCartSelectedShippingOptionsMutation,
} from './graphql/graphql';
import type {
  AddCartItemsParams,
  CheckoutByCartIdParams,
  CreateCartParams,
  DeleteCartItemsParams,
  GetCartParams,
  IntegratedShopifyStoreParams,
  OrderByIdParams,
  ProductByIdParams,
  ProductsByDomainV2Params,
  RemoveCartParams,
  RequestProductByUrlParams,
  RequestStoreByUrlParams,
  ShopifyAppParams,
  ShopifyCollectionParams,
  SubmitCartParams,
  UpdateCartBuyerIdentityParams,
  UpdateCartItemsParams,
  UpdateCartSelectedShippingOptionsParams,
} from './types';
import { warnIfAuthHeaderInvalid } from './utils';

interface IRyeClient {
  getCart(
    getCartParams: GetCartParams,
  ): Promise<OperationResultSource<OperationResult<GetCartQuery, GetCartParams>>>;

  createCart(
    createCartParams: CreateCartParams,
  ): Promise<OperationResultSource<OperationResult<CreateCartMutation, CreateCartParams>>>;

  addCartItems(
    addCartItemsParams: AddCartItemsParams,
  ): Promise<OperationResultSource<OperationResult<AddCartItemsMutation, AddCartItemsParams>>>;

  deleteCartItems(
    deleteCartItemsParams: DeleteCartItemsParams,
  ): Promise<
    OperationResultSource<OperationResult<DeleteCartItemsMutation, DeleteCartItemsParams>>
  >;

  updateCartItems(
    updateCartItemsParams: UpdateCartItemsParams,
  ): Promise<
    OperationResultSource<OperationResult<UpdateCartItemsMutation, UpdateCartItemsParams>>
  >;

  removeCart(
    removeCartItemsParams: RemoveCartParams,
  ): Promise<OperationResultSource<OperationResult<RemoveCartMutation, RemoveCartParams>>>;

  updateCartBuyerIdentity(
    updateCartBuyerIdentityParams: UpdateCartBuyerIdentityParams,
  ): Promise<
    OperationResultSource<
      OperationResult<UpdateCartBuyerIdentityMutation, UpdateCartBuyerIdentityParams>
    >
  >;

  updateCartSelectedShippingOptions(
    updateCartSelectedShippingOptionsParams: UpdateCartSelectedShippingOptionsParams,
  ): Promise<
    OperationResultSource<
      OperationResult<
        UpdateCartSelectedShippingOptionsMutation,
        UpdateCartSelectedShippingOptionsParams
      >
    >
  >;

  submitCart(
    submitCartParams: SubmitCartParams,
  ): Promise<OperationResultSource<OperationResult<SubmitCartMutation, SubmitCartParams>>>;

  orderById(
    orderByIdParams: OrderByIdParams,
  ): Promise<OperationResultSource<OperationResult<OrderByIdQuery, OrderByIdParams>>>;

  checkoutByCartId(
    checkoutByCartIdParams: CheckoutByCartIdParams,
  ): Promise<OperationResultSource<OperationResult<CheckoutByCartIdQuery, CheckoutByCartIdParams>>>;

  getEnvironmentToken(): Promise<OperationResultSource<OperationResult<EnvironmentTokenQuery>>>;

  getShopifyAppInformation(
    shopifyAppParams: ShopifyAppParams,
  ): Promise<OperationResultSource<OperationResult<ShopifyAppQuery>>>;

  requestProductByUrl(
    requestProductByUrlParams: RequestProductByUrlParams,
  ): Promise<OperationResultSource<OperationResult<RequestProductByUrlMutation>>>;

  requestStoreByUrl(
    requestStoreByUrlParams: RequestStoreByUrlParams,
  ): Promise<OperationResultSource<OperationResult<RequestStoreByUrlMutation>>>;

  getProductById(
    productByIdParams: ProductByIdParams,
  ): Promise<OperationResultSource<OperationResult<ProductByIdQuery>>>;

  getProductsByDomainV2(
    productsByDomainV2Params: ProductsByDomainV2Params,
  ): Promise<OperationResultSource<OperationResult<ProductsByDomainV2Query>>>;

  getIntegratedShopifyStore(
    integratedShopifyStoreParams: IntegratedShopifyStoreParams,
  ): Promise<OperationResultSource<OperationResult<IntegratedShopifyStoreQuery>>>;

  getShopifyCollection(
    shopifyCollectionParams: ShopifyCollectionParams,
  ): Promise<OperationResultSource<OperationResult<ShopifyCollectionQuery>>>;
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
   * The function initializes a client with the specified authentication header and shopper IP.
   * @returns The function `initializeClient` returns a new instance of the `Client` class.
   */
  private initializeClient() {
    if (!this.authHeader || !this.shopperIp) {
      throw new Error('RyeClient requires an authHeader and shopperIp to be set.');
    }
    if (typeof fetch !== 'function') {
      throw new Error(
        'RyeClient requires a global fetch function to be available. Try setting up `node-fetch`: https://www.npmjs.com/package/node-fetch#providing-global-access',
      );
    }

    warnIfAuthHeaderInvalid(this.authHeader);

    // Track the last request time globally
    let lastRequestTime = 0;
    const MIN_REQUEST_SPACING = 100; // ms
    const DEFAULT_WAIT_TIME = 1000; // 1 second
    const MAX_WAIT_TIME = 30 * 1000; // 30 seconds
    const MAX_RETRIES = 10;

    const retryOptions: RetryExchangeOptions = {
      initialDelayMs: DEFAULT_WAIT_TIME,
      maxDelayMs: MAX_WAIT_TIME,
      maxNumberAttempts: MAX_RETRIES,
      randomDelay: false,
      retryIf: (error, operation) => {
        // Retry on network errors
        if (error.networkError) return true;

        // Check for rate limiting in GraphQL errors
        const hitRateLimit = error.graphQLErrors?.some(
          (graphQLError) =>
            graphQLError.message?.toLowerCase().includes('rate limit') ||
            graphQLError.extensions?.code === 'TOO_MANY_REQUESTS',
        );

        if (hitRateLimit) {
          console.warn(
            `[RyeClient] GraphQL rate limit hit. Retrying operation...`,
            'operation:',
            operation.key,
          );
          return true;
        }

        return false;
      },
    };

    // Custom fetch implementation to handle request spacing and header-based rate limiting
    async function customFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
      // Ensure minimum spacing between requests
      const now = Date.now();
      const timeSinceLastRequest = now - lastRequestTime;
      if (timeSinceLastRequest < MIN_REQUEST_SPACING) {
        const waitTime = MIN_REQUEST_SPACING - timeSinceLastRequest;
        await new Promise((resolve) => setTimeout(resolve, waitTime));
      }
      lastRequestTime = Date.now();

      const response = await fetch(input, init);

      // Check for header-based rate limiting
      const rateLimitRemaining = parseInt(response.headers.get('ratelimit-remaining') ?? '100', 10);
      const rateLimitReset = parseInt(response.headers.get('ratelimit-reset') ?? '0', 10) * 1000; // Convert to milliseconds

      if (rateLimitRemaining === 0 && rateLimitReset > Date.now()) {
        const waitTime = rateLimitReset - Date.now();
        console.warn(
          `[RyeClient] Header rate limit hit. Waiting ${waitTime}ms before continuing...`,
          'input:',
          JSON.stringify(input),
        );
        await new Promise((resolve) => setTimeout(resolve, waitTime));
        // The retry exchange will handle the actual retry
      }

      return response;
    }

    return new Client({
      url: GRAPHQL_ENDPOINTS[this.environment],
      exchanges: [retryExchange(retryOptions), fetchExchange],
      fetchOptions: () => {
        return {
          headers: {
            Authorization: this.authHeader!,
            [RYE_SHOPPER_IP]: this.shopperIp!,
            'rye-debug': 'true',
            'rye-user-agent': `Rye/v1 Node/wish.ly`,
          },
        };
      },
      fetch: customFetch,
    });
  }

  /**
   * Make an API request.
   * @param query
   * @param variables - The variables to include in the API request.
   * @param method - either query or mutation.
   * @returns The response data from the API.
   */
  private async apiRequest<TResult, TVariables extends AnyVariables>(
    query: DocumentInput<TResult, TVariables>,
    variables: TVariables,
    method: OPERATION = OPERATION.QUERY,
  ): Promise<OperationResultSource<OperationResult<TResult, TVariables>>> {
    const tryRequest = async () => {
      return await this.ryeClient[method](query, variables);
    };

    try {
      return await tryRequest();
    } catch (e) {
      console.error('Error requesting Rye API. ', {
        query,
        variables,
        method,
        error: e,
      });
      throw e;
    }
  }

  /**
   * Fetches cart details.
   * @param getCartParams - The params for the getCart query.
   * @returns A promise that resolves to the cart data or undefined.
   */
  getCart = async (
    getCartParams: GetCartParams,
  ): Promise<OperationResultSource<OperationResult<GetCartQuery, GetCartParams>>> => {
    return await this.apiRequest(GET_CART_QUERY, getCartParams);
  };

  /**
   * Creates a cart.
   * @param createCartParams - The params for the createCart mutation.
   * @returns A promise that resolves to the cart data or undefined.
   */
  createCart = async (
    createCartParams: CreateCartParams,
  ): Promise<OperationResultSource<OperationResult<CreateCartMutation, CreateCartParams>>> => {
    return await this.apiRequest(CREATE_CART_MUTATION, createCartParams, OPERATION.MUTATION);
  };

  /**
   * Add items to your cart.
   * @param addCartItemsParams - The params for the addCartItems mutation.
   * @returns A promise that resolves to the cart data or undefined.
   */
  addCartItems = async (
    addCartItemsParams: AddCartItemsParams,
  ): Promise<OperationResultSource<OperationResult<AddCartItemsMutation, AddCartItemsParams>>> => {
    return await this.apiRequest(ADD_CART_ITEMS_MUTATION, addCartItemsParams, OPERATION.MUTATION);
  };

  /**
   * Delete items from your cart.
   * @param deleteCartItemsParams - The params for the deleteCartItems mutation.
   * @returns A promise that resolves to the cart data or undefined.
   */
  deleteCartItems = async (
    deleteCartItemsParams: DeleteCartItemsParams,
  ): Promise<
    OperationResultSource<OperationResult<DeleteCartItemsMutation, DeleteCartItemsParams>>
  > => {
    return await this.apiRequest(
      DELETE_CART_ITEMS_MUTATION,
      deleteCartItemsParams,
      OPERATION.MUTATION,
    );
  };

  /**
   * Update item quantities for your cart.
   * @param updateCartItemsParams - The params for the updateCartItems mutation.
   * @returns A promise that resolves to the cart data or undefined.
   */
  updateCartItems = async (
    updateCartItemsParams: UpdateCartItemsParams,
  ): Promise<
    OperationResultSource<OperationResult<UpdateCartItemsMutation, UpdateCartItemsParams>>
  > => {
    return await this.apiRequest(
      UPDATE_CART_ITEMS_MUTATION,
      updateCartItemsParams,
      OPERATION.MUTATION,
    );
  };

  /**
   * Removes/Deletes the cart.
   * @param removeCartItemsParams - The params for the removeCart mutation.
   * @returns A promise that resolves to the cart ID or undefined.
   */
  removeCart = async (
    removeCartItemsParams: RemoveCartParams,
  ): Promise<OperationResultSource<OperationResult<RemoveCartMutation, RemoveCartParams>>> => {
    return await this.apiRequest(REMOVE_CART_MUTATION, removeCartItemsParams, OPERATION.MUTATION);
  };

  /**
   * Update buyer identity for the cart.
   * @param updateCartBuyerIdentityParams - The params for the updateCartBuyerIdentity mutation.
   * @returns A promise that resolves to the cart data or undefined.
   */
  updateCartBuyerIdentity = async (
    updateCartBuyerIdentityParams: UpdateCartBuyerIdentityParams,
  ): Promise<
    OperationResultSource<
      OperationResult<UpdateCartBuyerIdentityMutation, UpdateCartBuyerIdentityParams>
    >
  > => {
    return await this.apiRequest(
      UPDATE_CART_BUYER_IDENTITY_MUTATION,
      updateCartBuyerIdentityParams,
      OPERATION.MUTATION,
    );
  };

  /**
   * Update shipping options for a cart.
   * @param  updateCartSelectedShippingOptionsParams - The params for the updateCartSelectedShippingOptions mutation.
   * @returns A promise that resolves to the cart data or undefined.
   */
  updateCartSelectedShippingOptions = async (
    updateCartSelectedShippingOptionsParams: UpdateCartSelectedShippingOptionsParams,
  ): Promise<
    OperationResultSource<
      OperationResult<
        UpdateCartSelectedShippingOptionsMutation,
        UpdateCartSelectedShippingOptionsParams
      >
    >
  > => {
    return await this.apiRequest(
      UPDATE_CART_SELECTED_SHIPPING_OPTIONS_MUTATION,
      updateCartSelectedShippingOptionsParams,
      OPERATION.MUTATION,
    );
  };

  /**
   * Submit cart for checkout.
   * @param submitCartParams - The params for the submitCart mutation.
   * @returns A promise that resolves to the cart data or undefined.
   */
  submitCart = async (
    submitCartParams: SubmitCartParams,
  ): Promise<OperationResultSource<OperationResult<SubmitCartMutation, SubmitCartParams>>> => {
    return await this.apiRequest(SUBMIT_CART_MUTATION, submitCartParams, OPERATION.MUTATION);
  };

  /**
   * Get order by ID.
   * @param orderByIdParams - The params for the orderById query.
   * @returns A promise that resolves to the order data or undefined.
   */
  orderById = async (
    orderByIdParams: OrderByIdParams,
  ): Promise<OperationResultSource<OperationResult<OrderByIdQuery, OrderByIdParams>>> => {
    return await this.apiRequest(ORDER_BY_ID_QUERY, orderByIdParams);
  };

  /**
   * Get checkout details of cart by ID.
   * @param checkoutByCartIdParams - The params for the checkoutByCartId query.
   * @returns A promise that resolves to the checked out cart data or undefined.
   */
  checkoutByCartId = async (
    checkoutByCartIdParams: CheckoutByCartIdParams,
  ): Promise<
    OperationResultSource<OperationResult<CheckoutByCartIdQuery, CheckoutByCartIdParams>>
  > => {
    return await this.apiRequest(CHECKOUT_BY_CART_ID_QUERY, checkoutByCartIdParams);
  };

  /**
   * Get Rye Pay env token.
   * @returns A promise that resolves to the env token or undefined.
   */
  getEnvironmentToken = async (): Promise<
    OperationResultSource<OperationResult<EnvironmentTokenQuery>>
  > => {
    return await this.apiRequest(ENVIRONMENT_TOKEN_QUERY, {});
  };

  /**
   * Get ShopifyApp information.
   * @param shopifyAppParams - The params for the shopifyApp query.
   * @returns A promise that resolves to the Shopify app details or undefined.
   */
  getShopifyAppInformation = async (
    shopifyAppParams: ShopifyAppParams,
  ): Promise<OperationResultSource<OperationResult<ShopifyAppQuery>>> => {
    return await this.apiRequest(SHOPIFY_APP_QUERY, shopifyAppParams);
  };

  /**
   * Request product by URL to be tracked by Rye.
   * @param requestProductByUrlParams - The params for the requestProductByUrl query.
   * @returns A promise that resolves to the product ID or undefined.
   */
  requestProductByUrl = async (
    requestProductByUrlParams: RequestProductByUrlParams,
  ): Promise<OperationResultSource<OperationResult<RequestProductByUrlMutation>>> => {
    return await this.apiRequest(
      REQUEST_PRODUCT_BY_URL_MUTATION,
      requestProductByUrlParams,
      OPERATION.MUTATION,
    );
  };

  /**
   * Request a store by URL to be tracked by Rye.
   * @param requestStoreByUrlParams - The params for the requestStoreByUrl query.
   * @returns A promise that resolves to the request ID or undefined.
   */
  requestStoreByUrl = async (
    requestStoreByUrlParams: RequestStoreByUrlParams,
  ): Promise<OperationResultSource<OperationResult<RequestStoreByUrlMutation>>> => {
    return await this.apiRequest(
      REQUEST_STORE_BY_URL_MUTATION,
      requestStoreByUrlParams,
      OPERATION.MUTATION,
    );
  };

  /**
   * Fetch product information via Product ID.
   * @param productByIdParams - The params for the productById query.
   * @returns A promise that resolves to the product data or undefined.
   */
  getProductById = async (
    productByIdParams: ProductByIdParams,
  ): Promise<OperationResultSource<OperationResult<ProductByIdQuery>>> => {
    return await this.apiRequest(PRODUCT_BY_ID_QUERY, productByIdParams);
  };

  /**
   * Fetch all products information via domain.
   * @param productsByDomainV2Params - The params for the productsByDomainV2 query.
   * @returns A promise that resolves to the array of products or undefined.
   */
  getProductsByDomainV2 = async (
    productsByDomainV2Params: ProductsByDomainV2Params,
  ): Promise<OperationResultSource<OperationResult<ProductsByDomainV2Query>>> => {
    return await this.apiRequest(PRODUCTS_BY_DOMAIN_V2_QUERY, productsByDomainV2Params);
  };

  /**
   * Returns information about an integrated Shopify store, including products and collections.
   * @param integratedShopifyStoreParams - The params for the integratedShopifyStore query.
   * @returns A promise that resolves to the store data.
   */
  getIntegratedShopifyStore = async (
    integratedShopifyStoreParams: IntegratedShopifyStoreParams,
  ): Promise<OperationResultSource<OperationResult<IntegratedShopifyStoreQuery>>> => {
    return await this.apiRequest(INTEGRATED_SHOPIFY_STORE_QUERY, integratedShopifyStoreParams);
  };

  /**
   * Returns information about a shopify collection.
   * @param shopifyCollectionParams - The params for the shopifyCollection query.
   * @returns A promise that resolves to the shopify collection.
   */
  getShopifyCollection = async (
    shopifyCollectionParams: ShopifyCollectionParams,
  ): Promise<OperationResultSource<OperationResult<ShopifyCollectionQuery>>> => {
    return await this.apiRequest(SHOPIFY_COLLECTION_QUERY, shopifyCollectionParams);
  };
}

export { RyeClient };
