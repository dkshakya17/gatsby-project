---
title: Subscription| Cashfree
permalink: /subscription/get-subscription-payments
layout: guide
platform: subscription
display_platform: SUBSCRIPTION
subtitle: subscription payments
sortOrder: 6
---


# Get All Subscription Payments

You can get all the payment details for a subscription with just one request.

## Request Configuration for Subscription Payments

| Type                                  | Value                                      |
|-------------------------------------|-----------|
| HTTP Method      | <code class="highlighter-rouge">GET</code>      |
| URL      | <code class="highlighter-rouge"><span class="custom-parse-server-mount">/api/v2/</span>subscriptions/:subReferenceId/payments?lastId=:lastId&count=:count</code>      |
| Content-Type      | <code class="highlighter-rouge">application/json</code>      |


## Headers for Subscription Payments

| Type                                  | Value                                      |
|------------------------------------------|----------------------------------------------------|
| X-Client-Id      | <code class="highlighter-rouge">appId</code>      |
| X-Client-Secret      | <code class="highlighter-rouge">secretKey</code>      |


## URL Parameters for Subscription Payments

| Parameter             | Required                     | Description                                      |
|-------------------------------------|-----------|----------------------------------------------------|
| subReferenceId   | Yes   | A unique Id which was generated when the subscription was created (Numeric)      |
| lastId | Optional | The pagination counter to return results from (Numeric) |
| count | Optional |  The total number of payments to be shown in a paginated query (Numeric) |


## Sample Request for Subscription Payments

```bash
curl -i -H 'cache-control: no-cache' -H 'content-type: application/json' -H 'X- Client-Id: asdf1234' -H 'X-Client-Secret: qwer9876' 'https://test.cashfree.com/api/v2/subscriptions/123/payments?last=114&count=2'
```

## Sample Response for Subscription Payments

```json
{
  "status":"OK",
  "message":"Subscription Payments",
  "payments":
    [{
      "paymentId": 113,
      "cycle": 15,
      "amount": 12,
      "status": "SUCCESS",
      "addedOn": "2018-01-20 12:23:34"
    },{
      "paymentId": 112,
      "cycle": 14,
      "amount": 12,
      "status": "SUCCESS",
      "addedOn": "2018-01-19 12:23:34"
    }],
  "lastId": 112
}
```

## NOTE
<ul>
<li>lastId and count help in paginating queries for ease of use. Every query returns "count" number of payments. To fetch next page set lastId of the previous page. To get first page do not include lastId in the request</li>
<li>Cycle indicates after how many intervals was this payment processed.</li>
<li>Payment status field values are described in Appendix 1b.</li>
</ul>

# Get Single Subscription Payment

You can also easily fetch the details of a particular payment of the subscription 

## Request Configuration for a Subscription Payment

| Type                                  | Value                                      |
|-------------------------------------|-----------|
| HTTP Method      | <code class="highlighter-rouge">GET</code>      |
| URL      | <code class="highlighter-rouge"><span class="custom-parse-server-mount">/api/v2/</span>subscriptions/:subReferenceId/payments/:paymentId</code>      |
| Content-Type      | <code class="highlighter-rouge">application/json</code>      |


## Headers for a Subscription Payment

| Type                                  | Value                                      |
|------------------------------------------|----------------------------------------------------|
| X-Client-Id      | <code class="highlighter-rouge">appId</code>      |
| X-Client-Secret      | <code class="highlighter-rouge">secretKey</code>      |


## URL Parameters for a Subscription Payment

| Parameter             | Required                     | Description                                      |
|-------------------------------------|-----------|----------------------------------------------------|
| subReferenceId   | Yes   | A unique Id which was generated when the subscription was created (Numeric)      |
| paymentId | Yes |  A unique Id for the payment (Numeric)|


## Sample Request for a Subscription Payment

```bash
curl -i -H 'cache-control: no-cache' -H 'content-type: application/json' -H 'X- Client-Id: asdf1234' -H 'X-Client-Secret: qwer9876' 'https://test.cashfree.com/api/v2/subscriptions/123/payments/113'
```

## Sample Response for a Subscription Payment

```json
{
  "status":"OK",
  "message":"Subscription Payments",
  "payment":
    {
      "paymentId": 113,
      "cycle": 15,
      "amount": 12,
      "status": "SUCCESS",
      "addedOn": "2018-01-20 12:23:34"
    } 
}
```

## NOTE
<ul>
<li>Payment Id is generated at every payment.</li>
<li>Cycle indicates after how many intervals was this payment processed.</li>
<li>Payment status field values are described in Appendix 1b.</li>
</ul>