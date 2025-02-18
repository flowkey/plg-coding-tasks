# API Challenge

## Task Overview

Your goal is to determine a user's current subscription status by processing a set of subscription transactions from various payment providers.

Each provider (App Store, Google Play, etc.) records subscription transactions differently. Your task is to process the transactions and determine:

- When the subscription expires/expired
- The plan the user last subscribed to
- The status of the subscription (is it canceled, refunded, or will auto-renew)

### Expected Outcome

Use the sample jsons in the `transactions` folder to implement this task.

You can breakdown the task down as follows:

1. Determine status from Apple transactions
1. Determine status from Google transactions
1. Determine status for users who have owned subscriptions from both Apple and Google (Ex: userId `3` in the `transactions` provided)

You don't **have** to finish finish all the objectives! Do as much as you can.

### Approach

How you approach the task is upto you. Whether you want to try TDD or develop this as a GraphQL query, it's your choice.

If in doubt, feel free to discuss with us. We're here to help! 😊

## Useful documentation

The following can help you understand how a typical subscription flow works and also the important fields that you need to take into account when implementing the task.

Please note that the actual lifecycle and the fields are a lot more complex and this is a trimmed down version for the purpose of this task.

### Subscription Lifecycle

A typical subscription goes through the following lifecycle:

- **Purchase** - A user subscribes to a plan (Monthly, Yearly, etc.)
  - The plan is set to auto-renew at the end of the billing cycle
- **Renewal** - At the end of the billing cycle, the subscription renews (if it wasn't canceled). A new transaction is usually added for each renewal.
- **Cancelation** - A subscription can be canceled at any time. A canceled subscription expires at the end of the current billing cycle.
- **Refund** - Eligible users are able to request a refund. A refunded subscription ends immediately.
- **Expiry** - A canceled subscription eventually expires.

### Transactions

Here is a summary of the important fields from each of the payment providers. For this code challenge we'll use Apple AppStore and Google Play Store:

#### Apple AppStore

Apple uses a `JWSTransaction` to store a subscription's transaction info and a `JWSRenewalInfo` to determine the information related to the renewal of the subscription. Here are the key fields:

- `transactionId`: A unique identifier for the specific transaction.

- `originalTransactionId`: This is the `transactionId` of the very first purchase (you can think of it as the `subscriptionId`). It is used to track the status of the subscription regardless of the current `transactionId`

- `productId`: The identifier of the purchased product, as specified in App Store Connect.

- `purchaseDate`: The date when the transaction occurred.

- `expiresDate`: The date indicating when the subscription expires or expired.

- `revocationDate`: The date when the App Store refunded the transaction.

- `autoRenewStatus`: Indicates whether the subscription is set to auto-renew (`1` for active, `0` for inactive).

For detailed information, refer to Apple's official documentation on [JWSTransactionDecodedPayload](https://developer.apple.com/documentation/appstoreserverapi/jwstransactiondecodedpayload) & [JWSRenewalInfoDecodedPayload](https://developer.apple.com/documentation/appstoreserverapi/jwsrenewalinfodecodedpayload).

Here's a sample JSON of a auto-renewing subscription transaction (we've left out fields that aren't too relevant)

```json
{
  "transactionId": "530002091551182",
  "originalTransactionId": "530001258333141",
  "productId": "flowkey.eu.1mo",
  "purchaseDate": "2025-02-17T12:47:17.000Z",
  "expiresDate": "2025-03-17T11:47:17.000Z"
}
```

and the `JWSRenewalInfo` for that subscription

```json
{
  "originalTransactionId": "530001258333141",
  "autoRenewProductId": "flowkey.eu.1mo",
  "productId": "flowkey.eu.1mo",
  "autoRenewStatus": 1,
  "renewalDate": "2025-03-17T11:47:17.000Z"
}
```

#### Google Play Store

Google uses a subscription order to manage transactions. Here are the key fields:

- **`startTimeMillis`**: The time at which the subscription was started.

- **`expiryTimeMillis`**: The time at which the subscription will expire/expired.

- **`autoRenewing`**: A boolean value indicating whether the subscription is set to automatically renew.

- **`userCancellationTimeMillis`**: The time at which the user canceled the subscription.

- **`orderId`**: The unique order identifier for the subscription / transaction

- **`productId`**: The identifier of the product that was purchased

For detailed information, refer to the official [Google Play Developer API documentation](https://developers.google.com/android-publisher/api-ref/rest/v3/purchases.subscriptions).

Here's a sample response JSON

```json
{
  "productId": "com.example.app.subscription",
  "startTimeMillis": "1632165562798",
  "expiryTimeMillis": "1647803820057",
  "autoRenewing": false,
  "userCancellationTimeMillis": "1632494173278",
  "orderId": "GPA.3394-0710-5317-35262..1"
}
```

**Notes**

- All dates are in milliseconds since Epoch

- Google appends a serial number to the `orderId` on subsequent renewals.

  Example:

  - When purchased: GPA.3394-0710-5317-35262

  - Upon renewal:
    GPA.3394-0710-5317-35262..0

  - Upon subsequent renewals: GPA.3394-0710-5317-35262..1, etc.

- **Refunds** - On Google refunded transactions don't have a specific field. When a subscription is refunded the `expiryTimeMillis` is set to the same value as `userCancellationTimeMillis`
