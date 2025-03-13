import { graphql } from '../graphql';

export const EXPERIMENTAL_AFFILIATE_COMMISSION_QUERY = graphql(`
  query ExperimentalAffiliateCommission($orderId: ID!) {
    experimentalAffiliateCommission(orderId: $orderId) {
      __typename
      ...ExperimentalAffiliateCommissionFragment
    }
  }
`);
