import { graphql } from '../graphql';

export const CHECKOUT_BY_CART_ID_QUERY = graphql(`
  query CheckoutByCartID($cartID: ID!, $key: String!) {
    checkoutByCartID(cartID: $cartID) {
      __typename
      ...CheckoutFragment
    }
  }
`);
