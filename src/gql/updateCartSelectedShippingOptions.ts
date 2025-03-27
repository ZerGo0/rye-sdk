import { graphql } from '../graphql';

export const UPDATE_CART_SELECTED_SHIPPING_OPTIONS_MUTATION = graphql(`
  mutation UpdateCartSelectedShippingOptions($input: UpdateCartSelectedShippingOptionsInput!, $key: String!) {
    updateCartSelectedShippingOptions(input: $input) {
      __typename
      ...CartResponseFragment
    }
  }
`);
