import { graphql } from '../graphql';

export const SHOPIFY_APP_QUERY = graphql(`
  query ShopifyApp {
    shopifyApp {
      __typename
      ...ShopifyAppFragment
    }
  }
`);
