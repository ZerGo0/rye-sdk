import { graphql } from '../graphql';

export const CREATE_CART_MUTATION = graphql(`
  mutation CreateCart($input: CartCreateInput!, $key: String!) {
    createCart(input: $input) {
      __typename
      ...CartResponseFragment
    }
  }
`);
