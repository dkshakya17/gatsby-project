---
title: Subscription| Cashfree
permalink: /subscription/get-subscription
layout: guide
platform: subscription
display_platform: SUBSCRIPTION
subtitle: subscription details
sortOrder: 5
---

# Get Subscription Details

You can also extract the details of the subscription whenever you want.

## Request Configuration for Subscription Details

| Type                                  | Value                                      |
|-------------------------------------|-----------|
| HTTP Method      | <code class="highlighter-rouge">GET</code>      |
| URL      | <code class="highlighter-rouge"><span class="custom-parse-server-mount">/api/v2/</span>subscriptions/:subReferenceId</code>      |
| Content-Type      | <code class="highlighter-rouge">application/json</code>      |


## Headers for Subscription Details

| Type                                  | Value                                      |
|------------------------------------------|----------------------------------------------------|
| X-Client-Id      | <code class="highlighter-rouge">appId</code>      |
| X-Client-Secret      | <code class="highlighter-rouge">secretKey</code>      |


## URL Paramaters for Subscription Details

| Parameter             | Required                     | Description                                      |
|-------------------------------------|-----------|----------------------------------------------------|
| subReferenceId   | Yes   |  A unique Id which was generated when the subscription was created (Numeric)      |


## Sample Request for Subscription Details

```bash
curl -i -H 'cache-control: no-cache' -H 'content-type: application/json' -H 'X-
Client-Id: asdf1234' -H 'X-Client-Secret: qwer9876'
'https://test.cashfree.com/api/v2/subscriptions/123'
```

## Sample Response for Subscription Details

```json
{
  "status":"OK",
  "message":"Subscription Details",
  "subscription": {
    "subscriptionId": "sub1",
    "subReferenceId": "123",
    "planId": "BASIC",
    "customerName": "",
    "customerEmail": "test@gmail.com",
    "customerPhone": "9900012345",
    "mode": "CREDIT_CARD",
    "cardNumber":"411111XXXXXX1111",
    "status": "INITIALIZED",
    "addedOn": "2018-01-01 12:23:34",
    "scheduledOn": "2018-02-01 09:00:00",
    "currentCycle": 14
	}
}
```


## NOTE
<ul>
<li>Card Number is available only when payment is done by credit card.</li>
<li>Status values and their description are listed in Appendix 1a.</li>
<li>Current cycle shows how many payments have been initiated for the subscription.</li>
<li>scheduledOn will be null for ON_DEMAND type subscriptions</li>
</ul>