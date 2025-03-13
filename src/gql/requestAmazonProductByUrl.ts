import { graphql } from '../graphql';

export const REQUEST_AMAZON_PRODUCT_BY_URL_MUTATION = graphql(`
  mutation RequestAmazonProductByURL($input: RequestAmazonProductByURLInput!) {
    requestAmazonProductByURL(input: $input) {
      __typename
      ...RequestAmazonProductByURLResponseFragment
    }
  }
`);
