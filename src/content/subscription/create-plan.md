---
title: Subscription| Cashfree
permalink: /subscription/create-plan
layout: guide
platform: subscription
display_platform: SUBSCRIPTION
subtitle: create plan
sortOrder: 2
---
## API guide

CashFree uses API keys to allow access to the API. Once you have signed up at our merchant site, you will be able to retrieve your AppId and SecretKey (API keys).

CashFree expects API key to be included in all API requests to the server.
Use the endpoint `/api/v1/credentials/verify` to verify your credentials (check <b>API reference</b> section).

## Endpoints

| URL                                 | Environment         |
|-------------------------------------|--------------------------------|
| <code class="highlighter-rouge">https://test.cashfree.com/</code>            |  TEST     |
| <code class="highlighter-rouge">https://api.cashfree.com/</code> | PRODUCTION      |


# Quick Reference


| URL                                 | HTTP Verb | Functionality       |
|-----------------|---------------|-------------------------------------|
| <code class="highlighter-rouge">/api/v2/subscription-plans</code>            | POST      | [To create plans](#create-plan)      |
| <code class="highlighter-rouge">/api/v2/subscriptions</code> | POST       | [To create subscriptions](/subscription/create-subscription)  |
| <code class="highlighter-rouge">/api/v2/subscriptions</code> | POST       | [To create seamless subscriptions](/subscription/create-subscription#create-seamless-subscription)      |
| <code class="highlighter-rouge">/api/v2/subscriptions/:subReferenceId</code>            | GET       | [To get subscription detail](/subscription/get-subscription)                                |
| <code class="highlighter-rouge">/api/v2/subscriptions/:subReferenceId/payments?lastId=:lastId&count=:count</code> | GET    | [To get all subcription payments](#get-all-subscription-payments)      |
| <code class="highlighter-rouge">/api/v2/subscriptions/:subReferenceId/payments/:paymentId</code> | GET    | [To get single subcription payment](#get-single-subscription-payment)      |
| <code class="highlighter-rouge">/api/v2/subscriptions/:subReferenceId/cancel</code> | POST    | [To cancel subcription](#cancel-subscription)       |
| <code class="highlighter-rouge">/api/v2/subscriptions/:subReferenceId/charge</code> | POST    | [To charge on-demand subcription](#charge-subscription)       |


# Create Plan

To create a new plan on Cashfree, send a POST request to the class URL containing the contents of the plan. The request configurations and the parameters are listed below:

## Request Configuration

| Type                                  | Value                                      |
|-------------------------------------|-----------|----------------------------------------------------|
| HTTP Method      | <code class="highlighter-rouge">POST</code>      |
| URL      | <code class="highlighter-rouge"><span class="custom-parse-server-mount">/api/v2/</span>subscription-plans</code>      |
| Content-Type      | <code class="highlighter-rouge">application/json</code>      |


## Headers

| Type                                  | Value                                      |
|------------------------------------------|----------------------------------------------------|
| X-Client-Id      | <code class="highlighter-rouge">appId</code>      |
| X-Client-Secret      | <code class="highlighter-rouge">secretKey</code>      |


## Request Parameters

| Parameter             | Required                     | Description                                      |
|-------------------------------------|-----------|----------------------------------------------------|
| planId   | Yes   | Unique identifier for the plan (Alphanumeric)      |
| planName  | Yes    | Specify name for easy reference (Alphanumeric)      |
| type      | Yes |  The type can be PERIODIC or ON_DEMAND. For more details refer to Appendix 1 for description (Alphanumeric)     |
| maxCycles   | Optional   |  Maximum number of debits set for the plan. The subscription will automatically change to COMPLETED status once this limit is reached (Numeric)      |
| amount | Optional      |  The amount to be charged for PERIODIC plan (Numeric)      |
| maxAmount | Optional |  The maximum amount to be charged for ON_DEMAND plan (Numeric) |
| intervalType   | Optional   |  The type of interval for a PERIODIC plan like daily, weekly, monthly, yearly (Alphanumeric)      |
| intervals | Optional      |  Number of intervals of intervalType between every subscription payment. For example for charging customer bi weekly use intervalType as “week” and intervals as 2. Required for PERIODIC plan (Numeric)     |
| description  | Optional      | A brief note for the plan (Alphanumeric)     |


## Sample Request

For POST requests, Content-Type header should be set to `application/json`.

Authentication is done via parameters. The appId parameter identifies which merchant account you are accessing, and the secretKey parameter authenticates the endpoint.

```bash
curl -XPOST -H 'cache-control: no-cache' -H 'content-type: application/json' -H
'X-Client-Id: asdf1234' -H 'X-Client-Secret: qwer9876' -d '{
"planId":"BASIC", "planName":"Basic subscription plan", "amount":12,
"intervalType":"week", "intervals":2,"description":"This is the standard plan
for our services"}' 'https://test.cashfree.com/api/v2/subscription-plans'
```

## Sample Response

The response format for all requests is a JSON object.

```json
{
  "status":"OK",
  "message":"Subscription Plan created successfully"
}
```