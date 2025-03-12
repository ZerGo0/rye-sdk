import { graphql } from '../graphql';

export const CANCEL_ORDER_MUTATION = graphql(`
  mutation CancelOrder($input: CancelOrderInput!) {
    cancelOrder(input: $input) {
      __typename
      ...CancelOrderResponseFragment
    }
  }
`);
