---
title: Subscription| Cashfree
permalink: /subscription/appendix-1
layout: guide
platform: subscription
display_platform: SUBSCRIPTION
subtitle: appendix-1 
sortOrder: 10
---

# Appendix 1

## Subscription Status

A description of all possible status for subscription.

| Status                                  | Description                                      |
|--------------------------------------------|----------------------------------------------------|
| INITIALIZED     | The subscription has just been created and is ready to be authorized by the customer.   |
| ACTIVE     | The customer has authorized the subscription and will be debited accordingly.   |
| ON_HOLD      	| The subscription failed due to a deauthorization of payment, expiration of payment method, insufficient funds at payment method.  |
| CANCELLED      	| The subscription was cancelled by the merchant and can no longer be activated. |
| COMPLETED     | The subscription has completed its total active period.  |
| BANK APPROVAL PENDING      	| The subscription mandate has been received but is pending for bank approval.  |


## Payment Status

A description of all possible status for subscription payment.

| Status                                  | Description                                      |
|--------------------------------------------|----------------------------------------------------|
| SUCCESS     | Payment for subscription was processed successfully.   |
| PENDING     | Payment for subscription was attempted but not yet marked successful.   |
| FAILED      	| Payment failed for subscription.  |


## Plan Types

A description of all the various different subscription plan types that are available currently and their operation model.

| Status                                  | Description                                      |
|--------------------------------------------|----------------------------------------------------|
| PERIODIC     | Payments are triggered automatically at fixed intervals defined by the merchant  |
| ON_DEMAND     | Merchant needs to trigger /charge the customer explicitly with the required amount.   |
