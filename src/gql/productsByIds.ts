import { graphql } from '../graphql';

export const PRODUCTS_BY_IDS_QUERY = graphql(`
  query ProductsByIds($input: [ProductByIDInput!]!) {
    productsByIds(input: $input) {
      __typename
      ...ProductsByIDsResponseFragment
    }
  }
`);
