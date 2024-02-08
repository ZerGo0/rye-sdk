import {
  AnyVariables,
  cacheExchange,
  Client,
  DocumentInput,
  fetchExchange,
  OperationResult,
  OperationResultSource,
} from "urql";

import {
  ENVIRONMENT,
  GRAPHQL_ENDPOINTS,
  OPERATION,
  RYE_SHOPPER_IP,
} from "./constants";
import { CREATE_CART_MUTATION } from "./gql/createCart";
import { GET_CART_QUERY } from "./gql/getCart";
import { CreateCartMutation, GetCartQuery } from "./graphql/graphql";
import { CreateCartParams, GetCartParams } from "./types";

interface IRyeClient {
  getCart(
    getCartParams: GetCartParams,
  ): Promise<GetCartQuery["getCart"] | undefined>;

  createCart(
    createCartParams: CreateCartParams,
  ): Promise<CreateCartMutation["createCart"] | undefined>;
}

class RyeClient implements IRyeClient {
  private authHeader: string | null;
  private shopperIp: string | null;
  private environment: ENVIRONMENT;
  private ryeClient: Client;

  constructor(
    authHeader: string,
    shopperIp: string,
    environment = ENVIRONMENT.PRODUCTION,
  ) {
    this.authHeader = authHeader;
    this.shopperIp = shopperIp;
    this.environment = environment;
    this.ryeClient = this.initializeClient();
  }

  /**
   * The function initializes a client with the specified authentication header and shopper IP.
   * @returns The function `initializeClient` returns a new instance of the `Client` class.
   */
  private initializeClient() {
    if (!this.authHeader || !this.shopperIp) {
      throw new Error(
        "RyeClient requires an authHeader and shopperIp to be set.",
      );
    }
    return new Client({
      url: GRAPHQL_ENDPOINTS[this.environment],
      exchanges: [cacheExchange, fetchExchange],
      fetchOptions: () => {
        return {
          headers: {
            Authorization: this.authHeader!,
            [RYE_SHOPPER_IP]: this.shopperIp!,
          },
        };
      },
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
      console.error("Error requesting Rye API. ", {
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
  ): Promise<GetCartQuery["getCart"] | undefined> => {
    const response = await this.apiRequest(GET_CART_QUERY, getCartParams);
    return response?.data?.getCart;
  };

  /**
   * Creates a cart.
   * @param createCartParams - The params for the createCart mutation.
   * @returns A promise that resolves to the cart data or undefined.
   */
  createCart = async (
    createCartParams: CreateCartParams,
  ): Promise<CreateCartMutation["createCart"] | undefined> => {
    const response = await this.apiRequest(
      CREATE_CART_MUTATION,
      createCartParams,
      OPERATION.MUTATION,
    );
    return response.data?.createCart;
  };
}

export { RyeClient };
