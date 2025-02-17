# API Challenge

## Task Overview

💡 Your goal is to determine a user's current subscription status by processing a set of subscription transactions from multiple payment providers.

Each provider (App Store, Google Play, Braintree, etc.) records subscription transactions differently. Your task is to process the transactions and determine:

1️⃣ The plan the user is subscribed to (and which payment provider)
2️⃣ When the subscription expires/expired
3️⃣ The current status of the subscription

## Subscription Lifecycle

A typical subscription goes through the following lifecycle:

- **Purchase** - A user subscribes to a plan (Monthly, Yearly, etc.)
  - The plan is set to expire or auto-renew at the end of the billing cycle
- **Renewal** - At the end of the current cycle, if the subscription isn't canceled, it auto-renews based on the billing cycle
- **Cancelation** - A subscription can be canceled at any time. A canceled subscription expires at the end of the current billing cycle.
- **Refund** - Eligible users are able to request a refund. A refunded subscription ends immediately.
- **Overdue** - An auto-renewing subscription can become overdue if it wasn't renewed on time (Ex: due to a payment error). In such cases, the subscription could be renewed up to 30 days later.
- **Expiry** - A canceled subscription eventually expires.
