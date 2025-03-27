import { graphql } from '../graphql';

export const UPDATE_CART_BUYER_IDENTITY_MUTATION = graphql(`
  mutation UpdateCartBuyerIdentity($input: CartBuyerIdentityUpdateInput!, $key: String!) {
    updateCartBuyerIdentity(input: $input) {
      __typename
      ...CartResponseFragment
    }
  }
`);
