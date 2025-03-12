import { graphql } from '../graphql';

export const INTEGRATED_SHOPIFY_STORE_QUERY = graphql(`
  query IntegratedShopifyStore($canonicalDomain: String!) {
    integratedShopifyStore(canonicalDomain: $canonicalDomain) {
      __typename
      ...IntegratedShopifyStoreFragment
    }
  }
`);
