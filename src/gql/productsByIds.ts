import { graphql } from '../graphql';

export const PRODUCTS_BY_IDS_QUERY = graphql(`
  query ProductsByIds(
    $input: [ProductByIDInput!]!
    $includeAdditionalProductDetails: Boolean = false
  ) {
    productsByIds(input: $input) {
      products {
        ...ProductDetails
        ...AdditionalProductDetails @include(if: $includeAdditionalProductDetails)
      }
      errors {
        code
        field
        message
      }
    }
  }
`);
