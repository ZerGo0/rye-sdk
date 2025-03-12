import { graphql } from '../graphql';

export const EXPERIMENTAL_AFFILIATE_MERCHANTS_CONNECTION_QUERY = graphql(`
  query ExperimentalAffiliateMerchantsConnection($pagination: CursorPaginationInput, $filter: ExperimentalAffiliateMerchantsFilterInput) {
    experimentalAffiliateMerchantsConnection(pagination: $pagination, filter: $filter) {
      __typename
      ...ExperimentalAffiliateMerchantsConnectionFragment
    }
  }
`);
