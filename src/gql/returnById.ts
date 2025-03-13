import { graphql } from '../graphql';

export const RETURN_BY_ID_QUERY = graphql(`
  query ReturnByID($input: ReturnByIdInput!) {
    returnByID(input: $input) {
      __typename
      ...ReturnOrderFragment
    }
  }
`);
