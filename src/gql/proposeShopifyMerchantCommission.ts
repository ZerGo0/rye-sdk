import { graphql } from '../graphql';

export const PROPOSE_SHOPIFY_MERCHANT_COMMISSION_MUTATION = graphql(`
  mutation ProposeShopifyMerchantCommission($input: ProposeShopifyMerchantCommissionInput!) {
    proposeShopifyMerchantCommission(input: $input) {
      __typename
      ...ShopifyMerchantCommissionFragment
    }
  }
`);
