import { graphql } from '../graphql';

export const AddressValidationErrorDetailsFragment = graphql(`
  fragment AddressValidationErrorDetailsFragment on AddressValidationErrorDetails {
    __typename
    suggestedValue
  }
`);
export const AmazonAccountFragment = graphql(`
  fragment AmazonAccountFragment on AmazonAccount {
    __typename
    groupId
    email
  }
`);
export const AmazonCartLineFragment = graphql(`
  fragment AmazonCartLineFragment on AmazonCartLine {
    __typename
    quantity
    product {
      ...AmazonProductFragment
    }
  }
`);
export const AmazonCategoryFragment = graphql(`
  fragment AmazonCategoryFragment on AmazonCategory {
    __typename
    name
    url
    categoryID
  }
`);
export const AmazonDeliveryEstimateRangeFragment = graphql(`
  fragment AmazonDeliveryEstimateRangeFragment on AmazonDeliveryEstimateRange {
    __typename
    productId
    earliest
    latest
  }
`);
export const AmazonOfferErrorFragment = graphql(`
  fragment AmazonOfferErrorFragment on AmazonOfferError {
    __typename
    code
    message
    details {
      ...AmazonOfferErrorDetailsFragment
    }
  }
`);
export const AmazonOfferErrorDetailsFragment = graphql(`
  fragment AmazonOfferErrorDetailsFragment on AmazonOfferErrorDetails {
    __typename
    productIds
    reasons {
      ...AmazonStoreErrorReasonFragment
    }
  }
`);
export const AmazonOrderMetadataFragment = graphql(`
  fragment AmazonOrderMetadataFragment on AmazonOrderMetadata {
    __typename
    account {
      ...AmazonAccountFragment
    }
  }
`);
export const AmazonProtectionPlanFragment = graphql(`
  fragment AmazonProtectionPlanFragment on AmazonProtectionPlan {
    __typename
    id
    title
    price {
      ...PriceFragment
    }
  }
`);
export const AmazonSpecificationFragment = graphql(`
  fragment AmazonSpecificationFragment on AmazonSpecification {
    __typename
    name
    value
  }
`);
export const AmazonStoreErrorFragment = graphql(`
  fragment AmazonStoreErrorFragment on AmazonStoreError {
    __typename
    message
    code
    details {
      ...AmazonStoreErrorDetailsFragment
    }
  }
`);
export const AmazonStoreErrorDetailsFragment = graphql(`
  fragment AmazonStoreErrorDetailsFragment on AmazonStoreErrorDetails {
    __typename
    productIds
    reasons {
      ...AmazonStoreErrorReasonFragment
    }
  }
`);
export const AmazonStoreErrorReasonFragment = graphql(`
  fragment AmazonStoreErrorReasonFragment on AmazonStoreErrorReason {
    __typename
    productId
    reason
    code
  }
`);
export const AmazonSubtitleFragment = graphql(`
  fragment AmazonSubtitleFragment on AmazonSubtitle {
    __typename
    text
    url
  }
`);
export const AmazonVariantDimensionFragment = graphql(`
  fragment AmazonVariantDimensionFragment on AmazonVariantDimension {
    __typename
    name
    value
  }
`);
export const AttributeFragment = graphql(`
  fragment AttributeFragment on Attribute {
    __typename
    key
    value
  }
`);
export const CancelAmazonOrderItemFragment = graphql(`
  fragment CancelAmazonOrderItemFragment on CancelAmazonOrderItem {
    __typename
    amazonOrderId
    status
    failReason
  }
`);
export const CancelAmazonOrderResultFragment = graphql(`
  fragment CancelAmazonOrderResultFragment on CancelAmazonOrderResult {
    __typename
    items {
      ...CancelAmazonOrderItemFragment
    }
  }
`);
export const CancelOrderErrorFragment = graphql(`
  fragment CancelOrderErrorFragment on CancelOrderError {
    __typename
    message
    code
  }
`);
export const CancelOrderResponseFragment = graphql(`
  fragment CancelOrderResponseFragment on CancelOrderResponse {
    __typename
    error {
      ...CancelOrderErrorFragment
    }
    result {
      ...CancelOrderResultFragment
    }
  }
`);
export const CancelShopifyOrderResultFragment = graphql(`
  fragment CancelShopifyOrderResultFragment on CancelShopifyOrderResult {
    __typename
    status
  }
`);
export const CartErrorFragment = graphql(`
  fragment CartErrorFragment on CartError {
    __typename
    message
    code
    details {
      ...CartErrorDetailsFragment
    }
  }
`);
export const CartResponseFragment = graphql(`
  fragment CartResponseFragment on CartResponse {
    __typename
    cart {
      ...CartFragment
    }
    errors {
      ...CartErrorFragment
    }
  }
`);
export const CheckoutFragment = graphql(`
  fragment CheckoutFragment on Checkout {
    __typename
    cart {
      ...CartFragment
    }
    status
    orders {
      ...OrderFragment
    }
  }
`);
export const CompletePaymentChallengeFragment = graphql(`
  fragment CompletePaymentChallengeFragment on CompletePaymentChallenge {
    __typename
    redirectURL
  }
`);
export const DeletedCartFragment = graphql(`
  fragment DeletedCartFragment on DeletedCart {
    __typename
    deletedId
  }
`);
export const EnvironmentTokenResponseFragment = graphql(`
  fragment EnvironmentTokenResponseFragment on EnvironmentTokenResponse {
    __typename
    token
  }
`);
export const ExperimentalAffiliateCommissionConfirmedFragment = graphql(`
  fragment ExperimentalAffiliateCommissionConfirmedFragment on ExperimentalAffiliateCommissionConfirmed {
    __typename
    commissionAmount {
      ...PriceFragment
    }
    orderAmount {
      ...PriceFragment
    }
    updatedAt
  }
`);
export const ExperimentalAffiliateCommissionUpdatedFragment = graphql(`
  fragment ExperimentalAffiliateCommissionUpdatedFragment on ExperimentalAffiliateCommissionUpdated {
    __typename
    commissionAmount {
      ...PriceFragment
    }
    orderAmount {
      ...PriceFragment
    }
    updatedAt
  }
`);
export const ExperimentalAffiliateCommissionFinalizedFragment = graphql(`
  fragment ExperimentalAffiliateCommissionFinalizedFragment on ExperimentalAffiliateCommissionFinalized {
    __typename
    commissionAmount {
      ...PriceFragment
    }
    orderAmount {
      ...PriceFragment
    }
    updatedAt
  }
`);
export const ExperimentalAffiliateCommissionPendingFragment = graphql(`
  fragment ExperimentalAffiliateCommissionPendingFragment on ExperimentalAffiliateCommissionPending {
    __typename
    updatedAt
  }
`);
export const ExperimentalAffiliateCommissionRateFixedFragment = graphql(`
  fragment ExperimentalAffiliateCommissionRateFixedFragment on ExperimentalAffiliateCommissionRateFixed {
    __typename
    amountCents
    currency
  }
`);
export const ExperimentalAffiliateCommissionRatePercentageFragment = graphql(`
  fragment ExperimentalAffiliateCommissionRatePercentageFragment on ExperimentalAffiliateCommissionRatePercentage {
    __typename
    rate
  }
`);
export const ExperimentalAffiliateCommissionUnconfirmedFragment = graphql(`
  fragment ExperimentalAffiliateCommissionUnconfirmedFragment on ExperimentalAffiliateCommissionUnconfirmed {
    __typename
    updatedAt
  }
`);
export const ExperimentalAffiliateMerchantDomainFragment = graphql(`
  fragment ExperimentalAffiliateMerchantDomainFragment on ExperimentalAffiliateMerchantDomain {
    __typename
    name
    canonicalDomain
  }
`);
export const ExperimentalAffiliateMerchantEdgeFragment = graphql(`
  fragment ExperimentalAffiliateMerchantEdgeFragment on ExperimentalAffiliateMerchantEdge {
    __typename
    cursor
    node {
      ...ExperimentalAffiliateMerchantFragment
    }
  }
`);
export const ExperimentalAffiliateMerchantsConnectionFragment = graphql(`
  fragment ExperimentalAffiliateMerchantsConnectionFragment on ExperimentalAffiliateMerchantsConnection {
    __typename
    edges {
      ...ExperimentalAffiliateMerchantEdgeFragment
    }
    pageInfo {
      ...PageInfoFragment
    }
  }
`);
export const ExperimentalAffiliateProductCategoryFragment = graphql(`
  fragment ExperimentalAffiliateProductCategoryFragment on ExperimentalAffiliateProductCategory {
    __typename
    id
    name
  }
`);
export const OrderCancelFailedOrderEventFragment = graphql(`
  fragment OrderCancelFailedOrderEventFragment on OrderCancelFailedOrderEvent {
    __typename
    id
    createdAt
    reason
  }
`);
export const OrderCancelStartedOrderEventFragment = graphql(`
  fragment OrderCancelStartedOrderEventFragment on OrderCancelStartedOrderEvent {
    __typename
    id
    createdAt
  }
`);
export const OrderCancelSucceededOrderEventFragment = graphql(`
  fragment OrderCancelSucceededOrderEventFragment on OrderCancelSucceededOrderEvent {
    __typename
    id
    createdAt
  }
`);
export const OrderPlacedOrderEventFragment = graphql(`
  fragment OrderPlacedOrderEventFragment on OrderPlacedOrderEvent {
    __typename
    id
    createdAt
  }
`);
export const OrderSubmissionStartedOrderEventFragment = graphql(`
  fragment OrderSubmissionStartedOrderEventFragment on OrderSubmissionStartedOrderEvent {
    __typename
    id
    createdAt
  }
`);
export const OrderSubmissionSucceededOrderEventFragment = graphql(`
  fragment OrderSubmissionSucceededOrderEventFragment on OrderSubmissionSucceededOrderEvent {
    __typename
    id
    createdAt
  }
`);
export const PaymentFailedOrderEventFragment = graphql(`
  fragment PaymentFailedOrderEventFragment on PaymentFailedOrderEvent {
    __typename
    id
    createdAt
  }
`);
export const PaymentRefundedOrderEventFragment = graphql(`
  fragment PaymentRefundedOrderEventFragment on PaymentRefundedOrderEvent {
    __typename
    id
    createdAt
  }
`);
export const PaymentSucceededOrderEventFragment = graphql(`
  fragment PaymentSucceededOrderEventFragment on PaymentSucceededOrderEvent {
    __typename
    id
    createdAt
  }
`);
export const PriceFragment = graphql(`
  fragment PriceFragment on Price {
    __typename
    value
    currency
    displayValue
  }
`);
export const ProductErrorFragment = graphql(`
  fragment ProductErrorFragment on ProductError {
    __typename
    code
    field
    message
  }
`);
export const ProductOptionFragment = graphql(`
  fragment ProductOptionFragment on ProductOption {
    __typename
    name
    position
    values
  }
`);
export const ProductsByIDsResponseFragment = graphql(`
  fragment ProductsByIDsResponseFragment on ProductsByIDsResponse {
    __typename
    products {
      ...ProductFragment
    }
    errors {
      ...ProductErrorFragment
    }
  }
`);
export const RequestAmazonProductByURLResponseFragment = graphql(`
  fragment RequestAmazonProductByURLResponseFragment on RequestAmazonProductByURLResponse {
    __typename
    productId
  }
`);
export const RequestProductResponseFragment = graphql(`
  fragment RequestProductResponseFragment on RequestProductResponse {
    __typename
    productID
  }
`);
export const RequestShopifyProductByURLResponseFragment = graphql(`
  fragment RequestShopifyProductByURLResponseFragment on RequestShopifyProductByURLResponse {
    __typename
    canonicalDomain
    productId
    variantId
  }
`);
export const RequestStoreResponseFragment = graphql(`
  fragment RequestStoreResponseFragment on RequestStoreResponse {
    __typename
    canonicalDomain
    requestID
  }
`);
export const ReturnAcceptedOrderEventFragment = graphql(`
  fragment ReturnAcceptedOrderEventFragment on ReturnAcceptedOrderEvent {
    __typename
    id
    createdAt
  }
`);
export const ReturnAmazonOrderItemFragment = graphql(`
  fragment ReturnAmazonOrderItemFragment on ReturnAmazonOrderItem {
    __typename
    amazonOrderId
    returnId
    lineItems {
      ...AmazonReturnLineItemFragment
    }
  }
`);
export const ReturnAmazonOrderResultFragment = graphql(`
  fragment ReturnAmazonOrderResultFragment on ReturnAmazonOrderResult {
    __typename
    orders {
      ...ReturnAmazonOrderItemFragment
    }
  }
`);
export const ReturnApprovedOrderEventFragment = graphql(`
  fragment ReturnApprovedOrderEventFragment on ReturnApprovedOrderEvent {
    __typename
    id
    createdAt
  }
`);
export const ReturnClosedOrderEventFragment = graphql(`
  fragment ReturnClosedOrderEventFragment on ReturnClosedOrderEvent {
    __typename
    id
    createdAt
  }
`);
export const ReturnDeniedOrderEventFragment = graphql(`
  fragment ReturnDeniedOrderEventFragment on ReturnDeniedOrderEvent {
    __typename
    id
    createdAt
  }
`);
export const ReturnOrderErrorFragment = graphql(`
  fragment ReturnOrderErrorFragment on ReturnOrderError {
    __typename
    message
    code
  }
`);
export const ReturnOrderResponseFragment = graphql(`
  fragment ReturnOrderResponseFragment on ReturnOrderResponse {
    __typename
    error {
      ...ReturnOrderErrorFragment
    }
    result {
      ...ReturnOrderResultFragment
    }
  }
`);
export const ReturnRequestAcceptedOrderEventFragment = graphql(`
  fragment ReturnRequestAcceptedOrderEventFragment on ReturnRequestAcceptedOrderEvent {
    __typename
    id
    createdAt
  }
`);
export const ReturnRequestedOrderEventFragment = graphql(`
  fragment ReturnRequestedOrderEventFragment on ReturnRequestedOrderEvent {
    __typename
    id
    createdAt
  }
`);
export const ReturnShopifyOrderResultFragment = graphql(`
  fragment ReturnShopifyOrderResultFragment on ReturnShopifyOrderResult {
    __typename
    orderId
    returnId
    lineItems {
      ...ShopifyReturnLineItemFragment
    }
  }
`);
export const ShopifyAppFragment = graphql(`
  fragment ShopifyAppFragment on ShopifyApp {
    __typename
    __typename
  }
`);
export const ShopifyAppInstallationLinkFragment = graphql(`
  fragment ShopifyAppInstallationLinkFragment on ShopifyAppInstallationLink {
    __typename
    canonicalDomain
    url
  }
`);
export const ShopifyCartLineFragment = graphql(`
  fragment ShopifyCartLineFragment on ShopifyCartLine {
    __typename
    quantity
    product {
      ...ShopifyProductFragment
    }
    variant {
      ...ShopifyVariantFragment
    }
  }
`);
export const ShopifyCollectionEdgeFragment = graphql(`
  fragment ShopifyCollectionEdgeFragment on ShopifyCollectionEdge {
    __typename
    cursor
    node {
      ...ShopifyCollectionFragment
    }
  }
`);
export const ShopifyCollectionsConnectionFragment = graphql(`
  fragment ShopifyCollectionsConnectionFragment on ShopifyCollectionsConnection {
    __typename
    edges {
      ...ShopifyCollectionEdgeFragment
    }
    pageInfo {
      ...PageInfoFragment
    }
  }
`);
export const ShopifyLineItemFragment = graphql(`
  fragment ShopifyLineItemFragment on ShopifyLineItem {
    __typename
    variantId
    productId
    quantity
  }
`);
export const ShopifyMerchantCommissionFragment = graphql(`
  fragment ShopifyMerchantCommissionFragment on ShopifyMerchantCommission {
    __typename
    currentRatePercent
    commissionProposal {
      ...ShopifyMerchantCommissionProposalFragment
    }
  }
`);
export const ShopifyMerchantCommissionProposalFragment = graphql(`
  fragment ShopifyMerchantCommissionProposalFragment on ShopifyMerchantCommissionProposal {
    __typename
    ratePercent
    createdAt
  }
`);
export const ShopifyOfferErrorFragment = graphql(`
  fragment ShopifyOfferErrorFragment on ShopifyOfferError {
    __typename
    code
    message
    details {
      ...ShopifyOfferErrorDetailsFragment
    }
  }
`);
export const ShopifyOfferErrorDetailsFragment = graphql(`
  fragment ShopifyOfferErrorDetailsFragment on ShopifyOfferErrorDetails {
    __typename
    variantIds
  }
`);
export const ShopifyProductEdgeFragment = graphql(`
  fragment ShopifyProductEdgeFragment on ShopifyProductEdge {
    __typename
    cursor
    node {
      ...ShopifyProductFragment
    }
  }
`);
export const ShopifyProductReviewEdgeFragment = graphql(`
  fragment ShopifyProductReviewEdgeFragment on ShopifyProductReviewEdge {
    __typename
    cursor
    node {
      ...ShopifyProductReviewFragment
    }
  }
`);
export const ShopifyProductReviewsConnectionFragment = graphql(`
  fragment ShopifyProductReviewsConnectionFragment on ShopifyProductReviewsConnection {
    __typename
    edges {
      ...ShopifyProductReviewEdgeFragment
    }
    pageInfo {
      ...PageInfoFragment
    }
  }
`);
export const ShopifyProductsConnectionFragment = graphql(`
  fragment ShopifyProductsConnectionFragment on ShopifyProductsConnection {
    __typename
    edges {
      ...ShopifyProductEdgeFragment
    }
    pageInfo {
      ...PageInfoFragment
    }
  }
`);
export const ShopifyStoreErrorFragment = graphql(`
  fragment ShopifyStoreErrorFragment on ShopifyStoreError {
    __typename
    message
    code
    details {
      ...ShopifyStoreErrorDetailsFragment
    }
  }
`);
export const ShopifyStoreErrorDetailsFragment = graphql(`
  fragment ShopifyStoreErrorDetailsFragment on ShopifyStoreErrorDetails {
    __typename
    variantIds
  }
`);
export const SubmitCartDataFragment = graphql(`
  fragment SubmitCartDataFragment on SubmitCartData {
    __typename
    id
    stores {
      ...SubmitStoreResultFragment
    }
  }
`);
export const SubmitCartResultFragment = graphql(`
  fragment SubmitCartResultFragment on SubmitCartResult {
    __typename
    cart {
      ...SubmitCartDataFragment
    }
    errors {
      ...SubmitCartResultErrorFragment
    }
  }
`);
export const SubmitCartResultErrorFragment = graphql(`
  fragment SubmitCartResultErrorFragment on SubmitCartResultError {
    __typename
    message
    code
    details {
      ...CartErrorDetailsFragment
    }
  }
`);
export const SubmitStoreResultErrorFragment = graphql(`
  fragment SubmitStoreResultErrorFragment on SubmitStoreResultError {
    __typename
    message
    code
  }
`);
export const TrackingObtainedOrderEventFragment = graphql(`
  fragment TrackingObtainedOrderEventFragment on TrackingObtainedOrderEvent {
    __typename
    id
    createdAt
  }
`);
export const AmazonImageFragment = graphql(`
  fragment AmazonImageFragment on AmazonImage {
    __typename
    url
    position_AmazonImage: position
    width_AmazonImage: width
    height_AmazonImage: height
  }
`);
export const AmazonLineItemFragment = graphql(`
  fragment AmazonLineItemFragment on AmazonLineItem {
    __typename
    productId
    quantity
    amazonBusinessPrice {
      ...PriceFragment
    }
    price {
      ...PriceFragment
    }
  }
`);
export const AmazonOfferFragment = graphql(`
  fragment AmazonOfferFragment on AmazonOffer {
    __typename
    subtotal {
      ...PriceFragment
    }
    margin {
      ...PriceFragment
    }
    notAvailableIds
    shippingMethods {
      ...ShippingMethodFragment
    }
    selectedShippingMethod {
      ...ShippingMethodFragment
    }
    errors {
      ...AmazonOfferErrorFragment
    }
    productDeliveryEstimateRanges {
      ...AmazonDeliveryEstimateRangeFragment
    }
  }
`);
export const AmazonProductFragment = graphql(`
  fragment AmazonProductFragment on AmazonProduct {
    __typename
    id
    marketplace
    title
    description
    vendor
    url
    price {
      ...PriceFragment
    }
    amazonBusinessPrice {
      ...PriceFragment
    }
    isAvailable
    tags
    images {
      ...ImageFragment
    }
    variants {
      ...VariantFragment
    }
    ASIN
    titleExcludingVariantName
    featureBullets
    parentID
    protectionPlans {
      ...AmazonProtectionPlanFragment
    }
    categories {
      ...AmazonCategoryFragment
    }
    ratingsTotal
    reviewsTotal
    subtitle {
      ...AmazonSubtitleFragment
    }
    videos {
      ...AmazonVideoFragment
    }
    specifications {
      ...AmazonSpecificationFragment
    }
    color
    manufacturer
    weight
    firstAvailable
    dimensions
    modelNumber
  }
`);
export const AmazonReturnLineItemFragment = graphql(`
  fragment AmazonReturnLineItemFragment on AmazonReturnLineItem {
    __typename
    productId
    quantity
    status
    price
  }
`);
export const AmazonStoreFragment = graphql(`
  fragment AmazonStoreFragment on AmazonStore {
    __typename
    store
    cartLines {
      ...AmazonCartLineFragment
    }
    offer {
      ...AmazonOfferFragment
    }
    errors {
      ...AmazonStoreErrorFragment
    }
    requestId
    orderId
    isSubmitted
    shipsToCountries
    isShippingRequired
  }
`);
export const AmazonVariantFragment = graphql(`
  fragment AmazonVariantFragment on AmazonVariant {
    __typename
    id
    title
    image {
      ...ImageFragment
    }
    url
    dimensions {
      ...AmazonVariantDimensionFragment
    }
  }
`);
export const AmazonVideoFragment = graphql(`
  fragment AmazonVideoFragment on AmazonVideo {
    __typename
    durationSeconds
    width
    height
    url
    thumbnailURL
    title
  }
`);
export const BuyerIdentityFragment = graphql(`
  fragment BuyerIdentityFragment on BuyerIdentity {
    __typename
    firstName
    lastName
    email
    phone
    address1
    address2
    city
    provinceCode
    countryCode
    postalCode
  }
`);
export const CartFragment = graphql(`
  fragment CartFragment on Cart {
    __typename
    id
    attributes {
      ...AttributeFragment
    }
    stores {
      ...StoreFragment
    }
    buyerIdentity {
      ...BuyerIdentityFragment
    }
    cost {
      ...CartCostFragment
    }
    isShippingRequired
  }
`);
export const CartCostFragment = graphql(`
  fragment CartCostFragment on CartCost {
    __typename
    subtotal {
      ...PriceFragment
    }
    tax {
      ...PriceFragment
    }
    margin {
      ...PriceFragment
    }
    shipping {
      ...PriceFragment
    }
    total {
      ...PriceFragment
    }
    isEstimated
  }
`);
export const ExperimentalAffiliateMerchantFragment = graphql(`
  fragment ExperimentalAffiliateMerchantFragment on ExperimentalAffiliateMerchant {
    __typename
    id
    name
    domains {
      ...ExperimentalAffiliateMerchantDomainFragment
    }
    description
    specialConditions
    categories {
      ...ExperimentalAffiliateProductCategoryFragment
    }
    logoUrl
    averageCommissionRate {
      ...ExperimentalAffiliateCommissionRatePercentageFragment
    }
    minimumCommissionRate {
      ...ExperimentalAffiliateCommissionRateFragment
    }
    maximumCommissionRate {
      ...ExperimentalAffiliateCommissionRateFragment
    }
    averageDailySales
    averageOrderValue {
      ...PriceFragment
    }
  }
`);
export const IntegratedShopifyStoreFragment = graphql(`
  fragment IntegratedShopifyStoreFragment on IntegratedShopifyStore {
    __typename
    canonicalDomain
    logoUrl
    collectionsConnection {
      ...ShopifyCollectionsConnectionFragment
    }
    productsConnection {
      ...ShopifyProductsConnectionFragment
    }
    commission {
      ...ShopifyMerchantCommissionFragment
    }
    email
    displayName
  }
`);
export const OrderFragment = graphql(`
  fragment OrderFragment on Order {
    __typename
    id
    status
    requiredActions {
      ...OrderRequiredActionFragment
    }
    events {
      ...OrderEventFragment
    }
    returns {
      ...OrderReturnFragment
    }
    lineItems {
      ...OrderLineItemFragment
    }
    marketplace
    shipments {
      ...OrderShipmentFragment
    }
    marketplaceOrderIds
    cartId
    cart {
      ...CartFragment
    }
    subtotal {
      ...PriceFragment
    }
    shipping {
      ...PriceFragment
    }
    tax {
      ...PriceFragment
    }
    total {
      ...PriceFragment
    }
    createdAt
    metadata {
      ...OrderMetadataFragment
    }
  }
`);
export const OrderFailedOrderEventFragment = graphql(`
  fragment OrderFailedOrderEventFragment on OrderFailedOrderEvent {
    __typename
    id
    createdAt
    reason
    reasonCode
    retryable
  }
`);
export const OrderReturnFragment = graphql(`
  fragment OrderReturnFragment on OrderReturn {
    __typename
    id
    shippingLabelUrl
    lineItems {
      ...ReturnLineItemFragment
    }
    createdAt
    updatedAt
    marketplace
    orderId
    marketplaceOrderId
  }
`);
export const OrderShipmentFragment = graphql(`
  fragment OrderShipmentFragment on OrderShipment {
    __typename
    carrierName
    carrierTrackingNumber
    carrierTrackingUrl
    status
    expectedDeliveryDate
  }
`);
export const PageInfoFragment = graphql(`
  fragment PageInfoFragment on PageInfo {
    __typename
    endCursor
    hasNextPage
    hasPreviousPage
    startCursor
  }
`);
export const ReturnAmazonFragment = graphql(`
  fragment ReturnAmazonFragment on ReturnAmazon {
    __typename
    marketplace
    amazonOrderId
    returnId
    lineItems {
      ...AmazonReturnLineItemFragment
    }
  }
`);
export const ReturnShopifyFragment = graphql(`
  fragment ReturnShopifyFragment on ReturnShopify {
    __typename
    orderId
    marketplace
    returnId
    lineItems {
      ...ShopifyReturnLineItemFragment
    }
  }
`);
export const ShippingMethodFragment = graphql(`
  fragment ShippingMethodFragment on ShippingMethod {
    __typename
    id
    label
    price {
      ...PriceFragment
    }
    taxes {
      ...PriceFragment
    }
    total {
      ...PriceFragment
    }
  }
`);
export const ShopifyCollectionFragment = graphql(`
  fragment ShopifyCollectionFragment on ShopifyCollection {
    __typename
    id
    title
    description
    productsConnection {
      ...ShopifyProductsConnectionFragment
    }
  }
`);
export const ShopifyImageFragment = graphql(`
  fragment ShopifyImageFragment on ShopifyImage {
    __typename
    url
    position_ShopifyImage: position
    width_ShopifyImage: width
    height_ShopifyImage: height
    id
    variantIDs
    createdAt
    updatedAt
  }
`);
export const ShopifyOfferFragment = graphql(`
  fragment ShopifyOfferFragment on ShopifyOffer {
    __typename
    subtotal {
      ...PriceFragment
    }
    margin {
      ...PriceFragment
    }
    notAvailableIds
    shippingMethods {
      ...ShippingMethodFragment
    }
    selectedShippingMethod {
      ...ShippingMethodFragment
    }
    errors {
      ...ShopifyOfferErrorFragment
    }
  }
`);
export const ShopifyProductFragment = graphql(`
  fragment ShopifyProductFragment on ShopifyProduct {
    __typename
    id
    marketplace
    title
    description
    vendor
    url
    price {
      ...PriceFragment
    }
    isAvailable
    tags
    images {
      ...ImageFragment
    }
    variants {
      ...VariantFragment
    }
    descriptionHTML
    collectionHandle
    handle
    maxPrice
    maxPriceV2 {
      ...PriceFragment
    }
    minPrice
    minPriceV2 {
      ...PriceFragment
    }
    productType
    createdAt
    publishedAt
    storeCanonicalURL
    storeDomain
    options {
      ...ProductOptionFragment
    }
    reviewsConnection {
      ...ShopifyProductReviewsConnectionFragment
    }
  }
`);
export const ShopifyProductReviewFragment = graphql(`
  fragment ShopifyProductReviewFragment on ShopifyProductReview {
    __typename
    id
    body
    helpfulnessCount
    rating
    submittedAt
    reviewerDisplayName
    merchantReply
  }
`);
export const ShopifyReturnLineItemFragment = graphql(`
  fragment ShopifyReturnLineItemFragment on ShopifyReturnLineItem {
    __typename
    variantId
    quantity
    status
    currencyCode
    price
  }
`);
export const ShopifyStoreFragment = graphql(`
  fragment ShopifyStoreFragment on ShopifyStore {
    __typename
    store
    cartLines {
      ...ShopifyCartLineFragment
    }
    offer {
      ...ShopifyOfferFragment
    }
    errors {
      ...ShopifyStoreErrorFragment
    }
    requestId
    orderId
    isSubmitted
    shipsToCountries
    isShippingRequired
    checkoutUrl
  }
`);
export const ShopifyVariantFragment = graphql(`
  fragment ShopifyVariantFragment on ShopifyVariant {
    __typename
    title
    name
    image {
      ...ImageFragment
    }
    id
    isAvailable
    quantityAvailable
    compareAtPrice
    price
    priceV2 {
      ...PriceFragment
    }
    priceCents
    isShippingRequired
    SKU
    isTaxable
    weight
    option1
    option2
    option3
  }
`);
export const SubmitStoreResultFragment = graphql(`
  fragment SubmitStoreResultFragment on SubmitStoreResult {
    __typename
    store {
      ...StoreFragment
    }
    status
    requestId
    orderId
    isSubmitted
    errors {
      ...SubmitStoreResultErrorFragment
    }
  }
`);
export const ExperimentalAffiliateCommissionFragment = graphql(`
  fragment ExperimentalAffiliateCommissionFragment on ExperimentalAffiliateCommission {
    __typename
    updatedAt
    ... on ExperimentalAffiliateCommissionConfirmed {
      ...ExperimentalAffiliateCommissionConfirmedFragment
    }
    ... on ExperimentalAffiliateCommissionUpdated {
      ...ExperimentalAffiliateCommissionUpdatedFragment
    }
    ... on ExperimentalAffiliateCommissionFinalized {
      ...ExperimentalAffiliateCommissionFinalizedFragment
    }
    ... on ExperimentalAffiliateCommissionPending {
      ...ExperimentalAffiliateCommissionPendingFragment
    }
    ... on ExperimentalAffiliateCommissionUnconfirmed {
      ...ExperimentalAffiliateCommissionUnconfirmedFragment
    }
  }
`);
export const ImageFragment = graphql(`
  fragment ImageFragment on Image {
    __typename
    url
    ... on AmazonImage {
      ...AmazonImageFragment
    }
    ... on ShopifyImage {
      ...ShopifyImageFragment
    }
  }
`);
export const OrderEventFragment = graphql(`
  fragment OrderEventFragment on OrderEvent {
    __typename
    id
    createdAt
    ... on OrderCancelFailedOrderEvent {
      ...OrderCancelFailedOrderEventFragment
    }
    ... on OrderCancelStartedOrderEvent {
      ...OrderCancelStartedOrderEventFragment
    }
    ... on OrderCancelSucceededOrderEvent {
      ...OrderCancelSucceededOrderEventFragment
    }
    ... on OrderFailedOrderEvent {
      ...OrderFailedOrderEventFragment
    }
    ... on OrderPlacedOrderEvent {
      ...OrderPlacedOrderEventFragment
    }
    ... on OrderSubmissionStartedOrderEvent {
      ...OrderSubmissionStartedOrderEventFragment
    }
    ... on OrderSubmissionSucceededOrderEvent {
      ...OrderSubmissionSucceededOrderEventFragment
    }
    ... on PaymentFailedOrderEvent {
      ...PaymentFailedOrderEventFragment
    }
    ... on PaymentRefundedOrderEvent {
      ...PaymentRefundedOrderEventFragment
    }
    ... on PaymentSucceededOrderEvent {
      ...PaymentSucceededOrderEventFragment
    }
    ... on ReturnAcceptedOrderEvent {
      ...ReturnAcceptedOrderEventFragment
    }
    ... on ReturnApprovedOrderEvent {
      ...ReturnApprovedOrderEventFragment
    }
    ... on ReturnClosedOrderEvent {
      ...ReturnClosedOrderEventFragment
    }
    ... on ReturnDeniedOrderEvent {
      ...ReturnDeniedOrderEventFragment
    }
    ... on ReturnRequestAcceptedOrderEvent {
      ...ReturnRequestAcceptedOrderEventFragment
    }
    ... on ReturnRequestedOrderEvent {
      ...ReturnRequestedOrderEventFragment
    }
    ... on TrackingObtainedOrderEvent {
      ...TrackingObtainedOrderEventFragment
    }
  }
`);
export const ProductFragment = graphql(`
  fragment ProductFragment on Product {
    __typename
    id
    marketplace
    title
    description
    vendor
    url
    isAvailable
    tags
    ... on AmazonProduct {
      ...AmazonProductFragment
    }
    ... on ShopifyProduct {
      ...ShopifyProductFragment
    }
  }
`);
export const VariantFragment = graphql(`
  fragment VariantFragment on Variant {
    __typename
    id
    title
    ... on AmazonVariant {
      ...AmazonVariantFragment
    }
    ... on ShopifyVariant {
      ...ShopifyVariantFragment
    }
  }
`);
export const CancelOrderResultFragment = graphql(`
  fragment CancelOrderResultFragment on CancelOrderResult {
    __typename
    ... on CancelShopifyOrderResult {
      ...CancelShopifyOrderResultFragment
    }
    ... on CancelAmazonOrderResult {
      ...CancelAmazonOrderResultFragment
    }
  }
`);
export const CartErrorDetailsFragment = graphql(`
  fragment CartErrorDetailsFragment on CartErrorDetails {
    __typename
    ... on AddressValidationErrorDetails {
      ...AddressValidationErrorDetailsFragment
    }
  }
`);
export const CartLineFragment = graphql(`
  fragment CartLineFragment on CartLine {
    __typename
    ... on ShopifyCartLine {
      ...ShopifyCartLineFragment
    }
    ... on AmazonCartLine {
      ...AmazonCartLineFragment
    }
  }
`);
export const ExperimentalAffiliateCommissionRateFragment = graphql(`
  fragment ExperimentalAffiliateCommissionRateFragment on ExperimentalAffiliateCommissionRate {
    __typename
    ... on ExperimentalAffiliateCommissionRatePercentage {
      ...ExperimentalAffiliateCommissionRatePercentageFragment
    }
    ... on ExperimentalAffiliateCommissionRateFixed {
      ...ExperimentalAffiliateCommissionRateFixedFragment
    }
  }
`);
export const OrderLineItemFragment = graphql(`
  fragment OrderLineItemFragment on OrderLineItem {
    __typename
    ... on AmazonLineItem {
      ...AmazonLineItemFragment
    }
    ... on ShopifyLineItem {
      ...ShopifyLineItemFragment
    }
  }
`);
export const OrderMetadataFragment = graphql(`
  fragment OrderMetadataFragment on OrderMetadata {
    __typename
    ... on AmazonOrderMetadata {
      ...AmazonOrderMetadataFragment
    }
  }
`);
export const OrderRequiredActionFragment = graphql(`
  fragment OrderRequiredActionFragment on OrderRequiredAction {
    __typename
    ... on CompletePaymentChallenge {
      ...CompletePaymentChallengeFragment
    }
  }
`);
export const ReturnLineItemFragment = graphql(`
  fragment ReturnLineItemFragment on ReturnLineItem {
    __typename
    ... on AmazonReturnLineItem {
      ...AmazonReturnLineItemFragment
    }
    ... on ShopifyReturnLineItem {
      ...ShopifyReturnLineItemFragment
    }
  }
`);
export const ReturnOrderFragment = graphql(`
  fragment ReturnOrderFragment on ReturnOrder {
    __typename
    ... on ReturnShopify {
      ...ReturnShopifyFragment
    }
    ... on ReturnAmazon {
      ...ReturnAmazonFragment
    }
  }
`);
export const ReturnOrderResultFragment = graphql(`
  fragment ReturnOrderResultFragment on ReturnOrderResult {
    __typename
    ... on ReturnShopifyOrderResult {
      ...ReturnShopifyOrderResultFragment
    }
    ... on ReturnAmazonOrderResult {
      ...ReturnAmazonOrderResultFragment
    }
  }
`);
export const StoreFragment = graphql(`
  fragment StoreFragment on Store {
    __typename
    ... on AmazonStore {
      ...AmazonStoreFragment
    }
    ... on ShopifyStore {
      ...ShopifyStoreFragment
    }
  }
`);
