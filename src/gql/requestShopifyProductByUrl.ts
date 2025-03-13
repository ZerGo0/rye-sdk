import { graphql } from '../graphql';

export const REQUEST_SHOPIFY_PRODUCT_BY_URL_MUTATION = graphql(`
  mutation RequestShopifyProductByURL($input: RequestShopifyProductByURLInput!) {
    requestShopifyProductByURL(input: $input) {
      __typename
      ...RequestShopifyProductByURLResponseFragment
    }
  }
`);
