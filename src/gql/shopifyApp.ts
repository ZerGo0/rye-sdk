import { graphql } from '../graphql';

export const SHOPIFY_APP_QUERY = graphql(`
  query ShopifyApp($storeCanonicalDomain: String!) {
    shopifyApp {
      __typename
      installationLink(storeCanonicalDomain: $storeCanonicalDomain) {
        ...ShopifyAppInstallationLinkFragment
      }
    }
  }
`);
