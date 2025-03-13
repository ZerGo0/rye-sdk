import { graphql } from '../graphql';

export const SUBMIT_CART_MUTATION = graphql(`
  mutation SubmitCart($input: CartSubmitInput!) {
    submitCart(input: $input) {
      __typename
      ...SubmitCartResultFragment
    }
  }
`);
