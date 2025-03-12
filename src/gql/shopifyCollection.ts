import { graphql } from '../graphql';

export const SHOPIFY_COLLECTION_QUERY = graphql(`
  query ShopifyCollection($id: String!) {
    shopifyCollection(id: $id) {
      __typename
      ...ShopifyCollectionFragment
    }
  }
`);
