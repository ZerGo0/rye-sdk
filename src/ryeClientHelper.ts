import {
  type AnyVariables,
  Client,
  type DocumentInput,
  fetchExchange,
  type OperationResult,
  type OperationResultSource,
} from '@urql/core';
import { retryExchange, type RetryExchangeOptions } from '@urql/exchange-retry';

import { ENVIRONMENT, GRAPHQL_ENDPOINTS, OPERATION, RYE_SHOPPER_IP } from './constants';
import { warnIfAuthHeaderInvalid } from './utils';

/**
 * Initialize the URQL client with proper configuration
 */
export function initializeClient(authHeader: string, shopperIp: string, environment: ENVIRONMENT) {
  if (!authHeader || !shopperIp) {
    throw new Error('RyeClient requires an authHeader and shopperIp to be set.');
  }
  if (typeof fetch !== 'function') {
    throw new Error(
      'RyeClient requires a global fetch function to be available. Try setting up `node-fetch`: https://www.npmjs.com/package/node-fetch#providing-global-access',
    );
  }

  warnIfAuthHeaderInvalid(authHeader);

  // Track the last request time globally
  let lastRequestTime = 0;
  const MIN_REQUEST_SPACING = 100;
  const DEFAULT_WAIT_TIME = 1_000;
  const MAX_WAIT_TIME = 30_000;
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

      // Throw a network error that will be caught by the retry exchange
      // This leverages the existing retry mechanism which supports multiple retries
      const error = new Error('Rate limit exceeded (detected from headers)') as Error & {
        networkError: boolean;
      };
      error.networkError = true;
      throw error;
    }

    return response;
  }

  return new Client({
    url: GRAPHQL_ENDPOINTS[environment],
    exchanges: [retryExchange(retryOptions), fetchExchange],
    fetchOptions: () => {
      return {
        headers: {
          Authorization: authHeader,
          [RYE_SHOPPER_IP]: shopperIp,
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
 * @param client - The URQL client instance
 * @param query - The GraphQL query or mutation
 * @param variables - The variables to include in the API request.
 * @param method - either query or mutation.
 * @returns The response data from the API.
 */
export async function apiRequest<TResult, TVariables extends AnyVariables>(
  client: Client,
  query: DocumentInput<TResult, TVariables>,
  variables: TVariables,
  method: OPERATION = OPERATION.QUERY,
): Promise<OperationResultSource<OperationResult<TResult, TVariables>>> {
  try {
    return await client[method](query, variables);
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
