import { graphql } from '../graphql';

export const AddressValidationErrorDetailsFragment = graphql(`
  fragment AddressValidationErrorDetailsFragment on AddressValidationErrorDetails {
    suggestedValue
  }
`);
export const AmazonAccountFragment = graphql(`
  fragment AmazonAccountFragment on AmazonAccount {
    groupId
    email
  }
`);
export const AmazonCartLineFragment = graphql(`
  fragment AmazonCartLineFragment on AmazonCartLine {
    quantity
    product {
      ...AmazonProductFragment
    }
  }
`);
export const AmazonCategoryFragment = graphql(`
  fragment AmazonCategoryFragment on AmazonCategory {
    name
    url
    categoryID
  }
`);
export const AmazonDeliveryEstimateRangeFragment = graphql(`
  fragment AmazonDeliveryEstimateRangeFragment on AmazonDeliveryEstimateRange {
    productId
    earliest
    latest
  }
`);
export const AmazonOfferErrorFragment = graphql(`
  fragment AmazonOfferErrorFragment on AmazonOfferError {
    code
    message
    details {
      ...AmazonOfferErrorDetailsFragment
    }
  }
`);
export const AmazonOfferErrorDetailsFragment = graphql(`
  fragment AmazonOfferErrorDetailsFragment on AmazonOfferErrorDetails {
    productIds
    reasons {
      ...AmazonStoreErrorReasonFragment
    }
  }
`);
export const AmazonOrderMetadataFragment = graphql(`
  fragment AmazonOrderMetadataFragment on AmazonOrderMetadata {
    account {
      ...AmazonAccountFragment
    }
  }
`);
export const AmazonProtectionPlanFragment = graphql(`
  fragment AmazonProtectionPlanFragment on AmazonProtectionPlan {
    id
    title
    price {
      ...PriceFragment
    }
  }
`);
export const AmazonSpecificationFragment = graphql(`
  fragment AmazonSpecificationFragment on AmazonSpecification {
    name
    value
  }
`);
export const AmazonStoreErrorFragment = graphql(`
  fragment AmazonStoreErrorFragment on AmazonStoreError {
    message
    code
    details {
      ...AmazonStoreErrorDetailsFragment
    }
  }
`);
export const AmazonStoreErrorDetailsFragment = graphql(`
  fragment AmazonStoreErrorDetailsFragment on AmazonStoreErrorDetails {
    productIds
    reasons {
      ...AmazonStoreErrorReasonFragment
    }
  }
`);
export const AmazonStoreErrorReasonFragment = graphql(`
  fragment AmazonStoreErrorReasonFragment on AmazonStoreErrorReason {
    productId
    reason
    code
  }
`);
export const AmazonSubtitleFragment = graphql(`
  fragment AmazonSubtitleFragment on AmazonSubtitle {
    text
    url
  }
`);
export const AmazonVariantDimensionFragment = graphql(`
  fragment AmazonVariantDimensionFragment on AmazonVariantDimension {
    name
    value
  }
`);
export const AttributeFragment = graphql(`
  fragment AttributeFragment on Attribute {
    key
    value
  }
`);
export const CancelAmazonOrderItemFragment = graphql(`
  fragment CancelAmazonOrderItemFragment on CancelAmazonOrderItem {
    amazonOrderId
    status
    failReason
  }
`);
export const CancelAmazonOrderResultFragment = graphql(`
  fragment CancelAmazonOrderResultFragment on CancelAmazonOrderResult {
    items {
      ...CancelAmazonOrderItemFragment
    }
  }
`);
export const CancelOrderErrorFragment = graphql(`
  fragment CancelOrderErrorFragment on CancelOrderError {
    message
    code
  }
`);
export const CancelOrderResponseFragment = graphql(`
  fragment CancelOrderResponseFragment on CancelOrderResponse {
    error {
      ...CancelOrderErrorFragment
    }
    result {
      __typename
    }
  }
`);
export const CancelOrderResultFragment = graphql(`
  fragment CancelOrderResultFragment on CancelOrderResult {
    __typename
  }
`);
export const CancelShopifyOrderResultFragment = graphql(`
  fragment CancelShopifyOrderResultFragment on CancelShopifyOrderResult {
    status
  }
`);
export const CartErrorFragment = graphql(`
  fragment CartErrorFragment on CartError {
    message
    code
    details {
      __typename
    }
  }
`);
export const CartErrorDetailsFragment = graphql(`
  fragment CartErrorDetailsFragment on CartErrorDetails {
    __typename
  }
`);
export const CartLineFragment = graphql(`
  fragment CartLineFragment on CartLine {
    __typename
  }
`);
export const CartResponseFragment = graphql(`
  fragment CartResponseFragment on CartResponse {
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
    redirectURL
  }
`);
export const DeletedCartFragment = graphql(`
  fragment DeletedCartFragment on DeletedCart {
    deletedId
  }
`);
export const EnvironmentTokenResponseFragment = graphql(`
  fragment EnvironmentTokenResponseFragment on EnvironmentTokenResponse {
    token
  }
`);
export const ExperimentalAffiliateCommissionFragment = graphql(`
  fragment ExperimentalAffiliateCommissionFragment on ExperimentalAffiliateCommission {
    updatedAt
  }
`);
export const ExperimentalAffiliateCommissionConfirmedFragment = graphql(`
  fragment ExperimentalAffiliateCommissionConfirmedFragment on ExperimentalAffiliateCommissionConfirmed {
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
    updatedAt
  }
`);
export const ExperimentalAffiliateCommissionRateFragment = graphql(`
  fragment ExperimentalAffiliateCommissionRateFragment on ExperimentalAffiliateCommissionRate {
    __typename
  }
`);
export const ExperimentalAffiliateCommissionRateFixedFragment = graphql(`
  fragment ExperimentalAffiliateCommissionRateFixedFragment on ExperimentalAffiliateCommissionRateFixed {
    amountCents
    currency
  }
`);
export const ExperimentalAffiliateCommissionRatePercentageFragment = graphql(`
  fragment ExperimentalAffiliateCommissionRatePercentageFragment on ExperimentalAffiliateCommissionRatePercentage {
    rate
  }
`);
export const ExperimentalAffiliateCommissionUnconfirmedFragment = graphql(`
  fragment ExperimentalAffiliateCommissionUnconfirmedFragment on ExperimentalAffiliateCommissionUnconfirmed {
    updatedAt
  }
`);
export const ExperimentalAffiliateMerchantDomainFragment = graphql(`
  fragment ExperimentalAffiliateMerchantDomainFragment on ExperimentalAffiliateMerchantDomain {
    name
    canonicalDomain
  }
`);
export const ExperimentalAffiliateMerchantEdgeFragment = graphql(`
  fragment ExperimentalAffiliateMerchantEdgeFragment on ExperimentalAffiliateMerchantEdge {
    cursor
    node {
      ...ExperimentalAffiliateMerchantFragment
    }
  }
`);
export const ExperimentalAffiliateMerchantsConnectionFragment = graphql(`
  fragment ExperimentalAffiliateMerchantsConnectionFragment on ExperimentalAffiliateMerchantsConnection {
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
    id
    name
  }
`);
export const ImageFragment = graphql(`
  fragment ImageFragment on Image {
    url
  }
`);
export const OrderCancelFailedOrderEventFragment = graphql(`
  fragment OrderCancelFailedOrderEventFragment on OrderCancelFailedOrderEvent {
    id
    createdAt
    reason
  }
`);
export const OrderCancelStartedOrderEventFragment = graphql(`
  fragment OrderCancelStartedOrderEventFragment on OrderCancelStartedOrderEvent {
    id
    createdAt
  }
`);
export const OrderCancelSucceededOrderEventFragment = graphql(`
  fragment OrderCancelSucceededOrderEventFragment on OrderCancelSucceededOrderEvent {
    id
    createdAt
  }
`);
export const OrderEventFragment = graphql(`
  fragment OrderEventFragment on OrderEvent {
    id
    createdAt
  }
`);
export const OrderLineItemFragment = graphql(`
  fragment OrderLineItemFragment on OrderLineItem {
    __typename
  }
`);
export const OrderMetadataFragment = graphql(`
  fragment OrderMetadataFragment on OrderMetadata {
    __typename
  }
`);
export const OrderPlacedOrderEventFragment = graphql(`
  fragment OrderPlacedOrderEventFragment on OrderPlacedOrderEvent {
    id
    createdAt
  }
`);
export const OrderRequiredActionFragment = graphql(`
  fragment OrderRequiredActionFragment on OrderRequiredAction {
    __typename
  }
`);
export const OrderSubmissionStartedOrderEventFragment = graphql(`
  fragment OrderSubmissionStartedOrderEventFragment on OrderSubmissionStartedOrderEvent {
    id
    createdAt
  }
`);
export const OrderSubmissionSucceededOrderEventFragment = graphql(`
  fragment OrderSubmissionSucceededOrderEventFragment on OrderSubmissionSucceededOrderEvent {
    id
    createdAt
  }
`);
export const PaymentFailedOrderEventFragment = graphql(`
  fragment PaymentFailedOrderEventFragment on PaymentFailedOrderEvent {
    id
    createdAt
  }
`);
export const PaymentRefundedOrderEventFragment = graphql(`
  fragment PaymentRefundedOrderEventFragment on PaymentRefundedOrderEvent {
    id
    createdAt
  }
`);
export const PaymentSucceededOrderEventFragment = graphql(`
  fragment PaymentSucceededOrderEventFragment on PaymentSucceededOrderEvent {
    id
    createdAt
  }
`);
export const PriceFragment = graphql(`
  fragment PriceFragment on Price {
    value
    currency
    displayValue
  }
`);
export const ProductErrorFragment = graphql(`
  fragment ProductErrorFragment on ProductError {
    code
    field
    message
  }
`);
export const ProductOptionFragment = graphql(`
  fragment ProductOptionFragment on ProductOption {
    name
    position
    values
  }
`);
export const ProductsByIDsResponseFragment = graphql(`
  fragment ProductsByIDsResponseFragment on ProductsByIDsResponse {
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
    productId
  }
`);
export const RequestProductResponseFragment = graphql(`
  fragment RequestProductResponseFragment on RequestProductResponse {
    productID
  }
`);
export const RequestShopifyProductByURLResponseFragment = graphql(`
  fragment RequestShopifyProductByURLResponseFragment on RequestShopifyProductByURLResponse {
    canonicalDomain
    productId
    variantId
  }
`);
export const RequestStoreResponseFragment = graphql(`
  fragment RequestStoreResponseFragment on RequestStoreResponse {
    canonicalDomain
    requestID
  }
`);
export const ReturnAcceptedOrderEventFragment = graphql(`
  fragment ReturnAcceptedOrderEventFragment on ReturnAcceptedOrderEvent {
    id
    createdAt
  }
`);
export const ReturnAmazonOrderItemFragment = graphql(`
  fragment ReturnAmazonOrderItemFragment on ReturnAmazonOrderItem {
    amazonOrderId
    returnId
    lineItems {
      ...AmazonReturnLineItemFragment
    }
  }
`);
export const ReturnAmazonOrderResultFragment = graphql(`
  fragment ReturnAmazonOrderResultFragment on ReturnAmazonOrderResult {
    orders {
      ...ReturnAmazonOrderItemFragment
    }
  }
`);
export const ReturnApprovedOrderEventFragment = graphql(`
  fragment ReturnApprovedOrderEventFragment on ReturnApprovedOrderEvent {
    id
    createdAt
  }
`);
export const ReturnClosedOrderEventFragment = graphql(`
  fragment ReturnClosedOrderEventFragment on ReturnClosedOrderEvent {
    id
    createdAt
  }
`);
export const ReturnDeniedOrderEventFragment = graphql(`
  fragment ReturnDeniedOrderEventFragment on ReturnDeniedOrderEvent {
    id
    createdAt
  }
`);
export const ReturnLineItemFragment = graphql(`
  fragment ReturnLineItemFragment on ReturnLineItem {
    __typename
  }
`);
export const ReturnOrderFragment = graphql(`
  fragment ReturnOrderFragment on ReturnOrder {
    __typename
  }
`);
export const ReturnOrderErrorFragment = graphql(`
  fragment ReturnOrderErrorFragment on ReturnOrderError {
    message
    code
  }
`);
export const ReturnOrderResponseFragment = graphql(`
  fragment ReturnOrderResponseFragment on ReturnOrderResponse {
    error {
      ...ReturnOrderErrorFragment
    }
    result {
      __typename
    }
  }
`);
export const ReturnOrderResultFragment = graphql(`
  fragment ReturnOrderResultFragment on ReturnOrderResult {
    __typename
  }
`);
export const ReturnRequestAcceptedOrderEventFragment = graphql(`
  fragment ReturnRequestAcceptedOrderEventFragment on ReturnRequestAcceptedOrderEvent {
    id
    createdAt
  }
`);
export const ReturnRequestedOrderEventFragment = graphql(`
  fragment ReturnRequestedOrderEventFragment on ReturnRequestedOrderEvent {
    id
    createdAt
  }
`);
export const ReturnShopifyOrderResultFragment = graphql(`
  fragment ReturnShopifyOrderResultFragment on ReturnShopifyOrderResult {
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
  }
`);
export const ShopifyAppInstallationLinkFragment = graphql(`
  fragment ShopifyAppInstallationLinkFragment on ShopifyAppInstallationLink {
    canonicalDomain
    url
  }
`);
export const ShopifyCartLineFragment = graphql(`
  fragment ShopifyCartLineFragment on ShopifyCartLine {
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
    cursor
    node {
      ...ShopifyCollectionFragment
    }
  }
`);
export const ShopifyCollectionsConnectionFragment = graphql(`
  fragment ShopifyCollectionsConnectionFragment on ShopifyCollectionsConnection {
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
    variantId
    productId
    quantity
  }
`);
export const ShopifyMerchantCommissionFragment = graphql(`
  fragment ShopifyMerchantCommissionFragment on ShopifyMerchantCommission {
    currentRatePercent
    commissionProposal {
      ...ShopifyMerchantCommissionProposalFragment
    }
  }
`);
export const ShopifyMerchantCommissionProposalFragment = graphql(`
  fragment ShopifyMerchantCommissionProposalFragment on ShopifyMerchantCommissionProposal {
    ratePercent
    createdAt
  }
`);
export const ShopifyOfferErrorFragment = graphql(`
  fragment ShopifyOfferErrorFragment on ShopifyOfferError {
    code
    message
    details {
      ...ShopifyOfferErrorDetailsFragment
    }
  }
`);
export const ShopifyOfferErrorDetailsFragment = graphql(`
  fragment ShopifyOfferErrorDetailsFragment on ShopifyOfferErrorDetails {
    variantIds
  }
`);
export const ShopifyProductEdgeFragment = graphql(`
  fragment ShopifyProductEdgeFragment on ShopifyProductEdge {
    cursor
    node {
      ...ShopifyProductFragment
    }
  }
`);
export const ShopifyProductReviewEdgeFragment = graphql(`
  fragment ShopifyProductReviewEdgeFragment on ShopifyProductReviewEdge {
    cursor
    node {
      ...ShopifyProductReviewFragment
    }
  }
`);
export const ShopifyProductReviewsConnectionFragment = graphql(`
  fragment ShopifyProductReviewsConnectionFragment on ShopifyProductReviewsConnection {
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
    message
    code
    details {
      ...ShopifyStoreErrorDetailsFragment
    }
  }
`);
export const ShopifyStoreErrorDetailsFragment = graphql(`
  fragment ShopifyStoreErrorDetailsFragment on ShopifyStoreErrorDetails {
    variantIds
  }
`);
export const StoreFragment = graphql(`
  fragment StoreFragment on Store {
    __typename
  }
`);
export const SubmitCartDataFragment = graphql(`
  fragment SubmitCartDataFragment on SubmitCartData {
    id
    stores {
      ...SubmitStoreResultFragment
    }
  }
`);
export const SubmitCartResultFragment = graphql(`
  fragment SubmitCartResultFragment on SubmitCartResult {
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
    message
    code
    details {
      __typename
    }
  }
`);
export const SubmitStoreResultErrorFragment = graphql(`
  fragment SubmitStoreResultErrorFragment on SubmitStoreResultError {
    message
    code
  }
`);
export const TrackingObtainedOrderEventFragment = graphql(`
  fragment TrackingObtainedOrderEventFragment on TrackingObtainedOrderEvent {
    id
    createdAt
  }
`);
export const VariantFragment = graphql(`
  fragment VariantFragment on Variant {
    id
    title
    image {
      ...ImageFragment
    }
  }
`);
export const AmazonImageFragment = graphql(`
  fragment AmazonImageFragment on AmazonImage {
    url
    position
    width
    height
  }
`);
export const AmazonLineItemFragment = graphql(`
  fragment AmazonLineItemFragment on AmazonLineItem {
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
    productId
    quantity
    status
    price
  }
`);
export const AmazonStoreFragment = graphql(`
  fragment AmazonStoreFragment on AmazonStore {
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
    id
    attributes {
      ...AttributeFragment
    }
    stores {
      __typename
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
      __typename
    }
    maximumCommissionRate {
      __typename
    }
    averageDailySales
    averageOrderValue {
      ...PriceFragment
    }
  }
`);
export const IntegratedShopifyStoreFragment = graphql(`
  fragment IntegratedShopifyStoreFragment on IntegratedShopifyStore {
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
    id
    status
    requiredActions {
      __typename
    }
    events {
      ...OrderEventFragment
    }
    returns {
      ...OrderReturnFragment
    }
    lineItems {
      __typename
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
      __typename
    }
  }
`);
export const OrderFailedOrderEventFragment = graphql(`
  fragment OrderFailedOrderEventFragment on OrderFailedOrderEvent {
    id
    createdAt
    reason
    reasonCode
    retryable
  }
`);
export const OrderReturnFragment = graphql(`
  fragment OrderReturnFragment on OrderReturn {
    id
    shippingLabelUrl
    lineItems {
      __typename
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
    carrierName
    carrierTrackingNumber
    carrierTrackingUrl
    status
    expectedDeliveryDate
  }
`);
export const PageInfoFragment = graphql(`
  fragment PageInfoFragment on PageInfo {
    endCursor
    hasNextPage
    hasPreviousPage
    startCursor
  }
`);
export const ProductFragment = graphql(`
  fragment ProductFragment on Product {
    id
    marketplace
    title
    description
    vendor
    url
    isAvailable
    tags
    images {
      ...ImageFragment
    }
    variants {
      ...VariantFragment
    }
    price {
      ...PriceFragment
    }
  }
`);
export const ReturnAmazonFragment = graphql(`
  fragment ReturnAmazonFragment on ReturnAmazon {
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
    url
    position
    width
    height
    id
    variantIDs
    createdAt
    updatedAt
  }
`);
export const ShopifyOfferFragment = graphql(`
  fragment ShopifyOfferFragment on ShopifyOffer {
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
    variantId
    quantity
    status
    currencyCode
    price
  }
`);
export const ShopifyStoreFragment = graphql(`
  fragment ShopifyStoreFragment on ShopifyStore {
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
    store {
      __typename
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
