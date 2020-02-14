---
title: Subscription| Cashfree
permalink: /subscription/cancel-subscription
layout: guide
platform: subscription
display_platform: SUBSCRIPTION
subtitle: cancel subscription 
sortOrder: 7
---

# Cancel Subscription

You can cancel the subscription at any point so that the subscription will no longer be charged to customer

Please Note that a subscription once cancelled cannot be reactivated.The status of the subscription will be CANCELLED (Refer Appendix 1a).

## Request Configuration for Cancel Subscription

| Type                                  | Value                                      |
|-------------------------------------|-----------|
| HTTP Method      | <code class="highlighter-rouge">POST</code>      |
| URL      | <code class="highlighter-rouge"><span class="custom-parse-server-mount">/api/v2/</span>subscriptions/:subReferenceId/cancel</code>      |
| Content-Type      | <code class="highlighter-rouge">application/json</code>      |


## Headers for Cancel Subscription

| Type                                  | Value                                      |
|------------------------------------------|----------------------------------------------------|
| X-Client-Id      | <code class="highlighter-rouge">appId</code>      |
| X-Client-Secret      | <code class="highlighter-rouge">secretKey</code>      |


## URL Parameters for Cancel Subscription

| Parameter             | Required                     | Description                                      |
|-------------------------------------|-----------|----------------------------------------------------|
| subReferenceId   | Yes   | A unique Id which was generated when the subscription was created (Numeric)       |


## Sample Request for Cancel Subscription

```bash
curl -XPOST -H 'cache-control: no-cache' -H 'content-type: application/json' -H
'X-Client-Id: asdf1234' -H 'X-Client-Secret: qwer9876'
'https://test.cashfree.com/api/v2/subscriptions/123/cancel'
```

## Sample Response for Cancel Subscription

```json
{
  "status":"OK",
  "message":"Subscription Cancelled"
}
```