import { graphql } from '../graphql';

export const RETURN_ORDER_MUTATION = graphql(`
  mutation ReturnOrder($input: ReturnOrderInput!) {
    returnOrder(input: $input) {
      __typename
      ...ReturnOrderResponseFragment
    }
  }
`);
