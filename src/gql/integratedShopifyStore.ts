import { graphql } from '../graphql';

export const INTEGRATED_SHOPIFY_STORE_QUERY = graphql(`
  query IntegratedShopifyStore($canonicalDomain: String!, $ids: [ID!]!) {
    integratedShopifyStore(canonicalDomain: $canonicalDomain) {
      __typename
      productsByIDs(ids: $ids) {
        ...ShopifyProductFragment
      }
    }
  }
`);
