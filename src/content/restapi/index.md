---
title: REST API Guide | Cashfree
permalink: /restapi
layout: guide
platform: rest
display_platform: REST
subtitle: Introduction
sortOrder: 1
---

#Getting Started


<p>Get started easily with Cashfree API by downloading the following collection and importing it in Postman.</p>
<p><a href="{{ site.baseurl }}/assets/postman/CashfreePG.postman_collection" download><span style="color:#cd853f !important;"> Download Postman Collection</span></a>
</p>


CashFree uses API keys to allow access to the API. Once you have signed up at our merchant site, you will be able to retreive your AppId and SecretKey (API keys).
<aside class="notice">You can find your <b>appId</b> and <b>secret key</b> from the merchant dashboard <a href="https://merchant.cashfree.com/merchant/pg#api-key">linked here </a></aside>

CashFree expects API key to be included in all API requests to the server.

# Endpoints

| URL                                 | Environment         |
|-------------------------------------|--------------------------------|
| <code class="highlighter-rouge">https://test.cashfree.com/</code>            |  TEST     |
| <code class="highlighter-rouge">https://api.cashfree.com/</code> | PRODUCTION      |


# Order API

| URL                                 | HTTP Verb | Functionality                                      |
|-------------------------------------|-----------|----------------------------------------------------|
| <code class="highlighter-rouge">/api/v1/order/create</code>            | POST      | [To create orders](#create-orders)      |
| <code class="highlighter-rouge">/api/v1/order/info/link</code> | POST       | [Returns payment link for an existing order](#get-link)  |
| <code class="highlighter-rouge">/api/v1/order/info/status</code> | POST       | [Returns payment status of an existing order](#get-status)      |
| <code class="highlighter-rouge">/api/v1/order/email</code>            | POST       | [Sends Email with payment link to the customer’s mailbox](#trigger-payment-email)                                |
| <code class="highlighter-rouge">/api/v1/order/refund</code> | POST    | [Can do partial/full refund of the payment made for the order](#order-refund)      |

# Transactions API

| URL                       | HTTP Verb | Functionality                                                      |
|---------------------------|-----------|--------------------------------------------------------------------|
| <code class="highlighter-rouge">/api/v1/transactions</code>                | POST      | [List the transactions](#transactions) <br/> |

# Refunds API

| URL                       | HTTP Verb |Functionality                               |
|---------------------------|-----------|--------------------------------------------|
| <code class="highlighter-rouge">/api/v1/refunds</code>             | POST      | [List the refunds](#refunds) |


# Settlements API

| URL                   | HTTP Verb | Functionality                               |
|-----------------------|-----------|---------------------------------------------|
| <code class="highlighter-rouge">/api/v1/settlements</code>            | POST      | [Fetch settlements processed on your CashFree Account](#all-settlements)     |
| <code class="highlighter-rouge">/api/v1/settlement</code> | POST       | [Fetch transactions that are part of a settlement](#settlement) |

# Credentials Verify API

| URL                   | HTTP Verb | Functionality                             |
|-----------------------|-----------|-------------------------------------------|
| <code class="highlighter-rouge">/api/v1/credentials/verify</code> | POST      | [Verifying Credentials](#verify-credentials) |

# Request Format

For POST requests, `Content-Type` header should be set to `application/x-www-form-urlencoded`.

Authentication is done via 2 parameters appId and secret key. The `appId` parameter identifies which merchant account you are accessing, and the `secretKey` parameter authenticates the endpoint.


## Response Format

The response format for all requests is a <b>JSON</b> object.

Whether a request is successful or failed is indicated by the HTTP status code. A 2xx status code indicates success, whereas a 4xx status code indicates failure. 
When a request fails, the response body is still JSON and contains the fields `status` and `reason` (only if status is an error) which you can inspect for debugging. For example, trying to save an object with invalid keys will return the below message:




```json

{
  "status": "ERROR",
  "error": "An order with the same id exists."
}

```
