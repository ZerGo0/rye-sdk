import { graphql } from '../graphql';

export const ADD_CART_ITEMS_MUTATION = graphql(`
  mutation AddCartItems($input: CartItemsAddInput!, $key: String!) {
    addCartItems(input: $input) {
      __typename
      ...CartResponseFragment
    }
  }
`);
