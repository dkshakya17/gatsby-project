---
title: Subscription| Cashfree
permalink: /subscription/charge-subscription
layout: guide
platform: subscription
display_platform: SUBSCRIPTION
subtitle: charge subscription 
sortOrder: 8
---

# Charge Subscription

For an ON-DEMAND plan, you will have to explicitly debit the customer's account.
The customer will receive a notification from their respective bank regarding the payment.

## Request Configuration for Charge Subscription

| Type                                  | Value                                      |
|-------------------------------------|-----------|
| HTTP Method      | <code class="highlighter-rouge">POST</code>      |
| URL      | <code class="highlighter-rouge"><span class="custom-parse-server-mount">/api/v2/</span>subscriptions/:subReferenceId/charge</code>      |
| Content-Type      | <code class="highlighter-rouge">application/json</code>      |


## URL Parameter for Charge Subscription

| Parameter             | Required                     | Description                                      |
|-------------------------------------|-----------|----------------------------------------------------|
| subReferenceId   | Yes   | A unique Id which was generated when the subscription was created (Numeric)     |


## Post Parameters for Charge Subscription

| Parameter             | Required                     | Description                                      |
|-------------------------------------|-----------|----------------------------------------------------|
| amount   | Yes   |  The amount which will be debited from the customer (Numeric)     |
| remarks   | Optional   |  Details of this payment (Alphanumeric)     |


## Sample Request for Charge Subscription

```bash
curl -XPOST -H 'cache-control: no-cache' -H 'content-type: application/json' -H
'X-Client-Id: asdf1234' -H 'X-Client-Secret: qwer9876' -d '{"amount":"12"}'
'https://test.cashfree.com/api/v2/subscriptions/123/charge'
```

## Sample Response for Charge Subscription

```json
{
  "status":"OK",
  "message":"Subscription charged",
  "payment": {
    "paymentId": 113,
    "amount": 12,
    "status": "SUCCESS",
    "addedOn": "2018-01-20 12:23:34"
	} 
}
```