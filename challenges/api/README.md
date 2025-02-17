# API Challenge

## Task Overview

💡 Your goal is to determine a user's current subscription status by processing a set of subscription transactions from multiple payment providers.

Each provider (App Store, Google Play, etc.) records subscription transactions differently. Your task is to process the transactions and determine:

- The plan the user is subscribed to (and which payment provider)
- When the subscription expires/expired
- The current status of the subscription

You can find the transaction jsons under the `transactions` folder.

- user id 3 has purchases from **both apple and google**

## Subscription Lifecycle

A typical subscription goes through the following lifecycle:

- **Purchase** - A user subscribes to a plan (Monthly, Yearly, etc.)
  - The plan is set to expire or auto-renew at the end of the billing cycle
- **Renewal** - At the end of the current cycle, if the subscription isn't canceled, it auto-renews based on the billing cycle
- **Cancelation** - A subscription can be canceled at any time. A canceled subscription expires at the end of the current billing cycle.
- **Refund** - Eligible users are able to request a refund. A refunded subscription ends immediately.
- **Overdue** - An auto-renewing subscription can become overdue if it wasn't renewed on time (Ex: due to a payment error). In such cases, the subscription could be renewed (recovered) up to 30 days later. If not recovered, it is canceled after 30 days.
- **Expiry** - A canceled subscription eventually expires.

## Transactions

Here is a summary of the important fields from each of the payment providers. For this code challenge we'll use Apple AppStore and Google Play Store:

### Apple AppStore

Apple uses a `JWSTransaction` to store a subscription's transaction info. Here are the key fields:

- `transactionId`: A unique identifier for the specific transaction.
- `originalTransactionId`: The identifier of the original purchase transaction. This can be thought of as the `subscriptionId`.
- `productId`: The identifier of the purchased product, as specified in App Store Connect.
- `purchaseDate`: The UNIX timestamp (in milliseconds) when the transaction occurred.
- `expiresDate`: The UNIX timestamp (in milliseconds) indicating when the subscription expires or expired.
- `autoRenewStatus`: Indicates whether the subscription is set to auto-renew (`1` for active, `0` for inactive).
- `revocationDate`: The UNIX timestamp (in milliseconds) when the App Store refunded the transaction.
- `isInBillingRetryPeriod`: An optional boolean value (`"true"` or `"false"`) indicating whether the App Store is attempting to renew the subscription after a failed attempt.

For detailed information, refer to Apple's official documentation on the [JWSTransactionDecodedPayload](https://developer.apple.com/documentation/appstoreserverapi/jwstransactiondecodedpayload).

Here's a sample JSON of a auto-renewing subscription transaction.

```json
{
  "transactionId": "1000000900001234",
  "originalTransactionId": "1000000900001234",
  "productId": "com.example.app.subscription",
  "purchaseDate": 1618675200000,
  "expiresDate": 1621353600000,
  "autoRenewStatus": 1
}
```

### Google Play Store

Google uses a subscription order to manage transactions. Here are the key fields:

- **`startTimeMillis`**: The time at which the subscription was started, in milliseconds since the Epoch.

- **`expiryTimeMillis`**: The time at which the subscription will expire/expired, in milliseconds since the Epoch.

- **`autoRenewing`**: A boolean value indicating whether the subscription is set to automatically renew.

- **`paymentState`**: The payment status of the subscription. Possible values are:

  - `0`: Payment pending
  - `1`: Payment received

- **`userCancellationTimeMillis`**: The time at which the user canceled the subscription, in milliseconds since the Epoch.

- **`orderId`**: The unique order identifier for the latest recurring order associated with the subscription purchase.

- **`productId`**: The identifier of the product that was purchased. In reality Google's subscription information doesn't contain this, but for the purpose of this exercise, let's assume this is available.

For detailed information, refer to the official [Google Play Developer API documentation](https://developers.google.com/android-publisher/api-ref/rest/v3/purchases.subscriptions).

Here's a sample response JSON

```json
{
  "productId": "com.example.app.subscription",
  "startTimeMillis": "1632165562798",
  "expiryTimeMillis": "1647803820057",
  "autoRenewing": false,
  "userCancellationTimeMillis": "1632494173278",
  "paymentState": 1,
  "orderId": "GPA.3394-0710-5317-35262..1"
}
```

### Notes

- **Refunds** - On Google refunded transactions don't have a specific field. When a subscription is refunded the `expiryTimeMillis` is set to the same value as `userCancellationTimeMillis`
- **Overdue** - On Google `paymentState` can be used to determine this
- **Identifying transactions** - Google appends a serial number to the `orderId` on subsequent renewals.
  Example: when purchased: GPA.3394-0710-5317-35262, upon renewal: when purchased: GPA.3394-0710-5317-35262..0, when purchased: GPA.3394-0710-5317-35262..1, etc.
