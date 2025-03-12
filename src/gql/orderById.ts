import { graphql } from '../graphql';

export const ORDER_BY_ID_QUERY = graphql(`
  query OrderByID($id: ID!) {
    orderByID(id: $id) {
      __typename
      ...OrderFragment
    }
  }
`);
