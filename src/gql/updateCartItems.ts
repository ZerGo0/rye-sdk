import { graphql } from '../graphql';

export const UPDATE_CART_ITEMS_MUTATION = graphql(`
  mutation UpdateCartItems($input: CartItemsUpdateInput!, $key: String!) {
    updateCartItems(input: $input) {
      __typename
      ...CartResponseFragment
    }
  }
`);
