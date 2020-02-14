---
title: iOS Developer Guide | Cashfree
permalink: /ios/token-generation
layout: guide
platform: ios
display_platform: iOS
subtitle: Token Generation
sortOrder: 5
---

# Token Generation

You will need to generate a token and pass it to the SDK while initiating payments for security reasons. For generating token you need to use our token generation API. Please take care that this API should be called only from your <b>backend</b> as it uses secretKey which should never be sent to frontend.

For production/live usage set the endpoint will be:

https://api.cashfree.com/api/v2/cftoken/order

For testing the endpoint will be:

https://test.cashfree.com/api/v2/cftoken/order

You need to send order details (orderId, orderCurrency and orderAmount) as a <b>JSON</b> object to the API endpoint and in response a token will received. Please see the description of request below -

<br/>

## Request Description

```bash
curl -XPOST -H 'Content-Type: application/json' 
-H 'x-client-id: <YOUR_APP_ID>' 
-H 'x-client-secret: <YOUR_SECRET_KEY>' 
-d '{
  "orderId": "<ORDER_ID>",
  "orderAmount":<ORDER_AMOUNT>,
  "orderCurrency": "INR"
}' 'https://test.cashfree.com/api/v2/cftoken/order'
```
<br/>

## Request Example

```bash
curl -XPOST -H 'Content-Type: application/json' -H 'x-client-id: 275432e3853bd165afbf5272' -H 'x-client-secret: 2279c0ffb9550ad0f9e0652741c8d06a49409517' -d '{
  "orderId": "Order0001",
  "orderAmount":1,
  "orderCurrency":"INR"
}' 'https://test.cashfree.com/api/v2/cftoken/order'
```
<br/>

## Response Example

```json
{
"status": "OK",
"message": "Token generated",
"cftoken": "v79JCN4MzUIJiOicGbhJCLiQ1VKJiOiAXe0Jye.s79BTM0AjNwUDN1EjOiAHelJCLiIlTJJiOik3YuVmcyV3QyVGZy9mIsEjOiQnb19WbBJXZkJ3biwiIxADMwIXZkJ3TiojIklkclRmcvJye.K3NKICVS5DcEzXm2VQUO_ZagtWMIKKXzYOqPZ4x0r2P_N3-PRu2mowm-8UXoyqAgsG"
}
```

The "cftoken" attribute is the token that needs to be used to secure your request 
<br/>

## Parameters


| Parameter                                 | Required | Description                                      |
|-------------------------------------|-----------|----------------------------------------------------|
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">appId</span></code>            | Yes      | Your app id      |
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">orderId</span></code> | Yes       | Order/Invoice Id  |
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">orderAmount</span></code> | Yes       | Bill amount of the order      |
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">orderCurrency</span></code> | No    | Currency for the order. Default is INR. [See](/resources/currencies) the Currency Codes below for a list of available currencies.<b>Please contact care@cashfree.com to enable new currencies.</b>     |
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">orderNote</span></code>            | No       | A help text to make customers know more about the order                                |
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">customerName</span></code> | Yes    | Name of the customer     |
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">customerPhone</span></code> | Yes    | Phone number of customer     |
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">customerEmail</span></code> | Yes    | Email id of the customer     |
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">notifyUrl</span></code> | No    | Notification URL for server-server communication. Useful when user’s connection drops while      |
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">paymentModes</span></code> | No    | Allowed payment modes for this order. Available values: cc, dc, nb, paypal, wallet. <b>If  left blank displays all enabled modes</b>     |


## Response parameters, shared with callback functions

These parameters are returned to the functions you implement using `paymentVC.getResult()` (see [Step 4](#step-4)). `transactionResult` contains the details of the transaction.

| Parameter                                  | Description                                      |
|-------------------------------------|------------------------------------------------------------|
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">orderId</span></code>  | Order id for which transaction has been processed. Ex: GZ-212  |
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">orderAmount</span></code> | Amount of the order. Ex: 256.00      |
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">referenceId</span></code>      | Cashfree generated unique transaction Id. Ex: 140388038803                                |
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">txStatus</span></code>   | Payment status for that order. Values can be : SUCCESS, FLAGGED, PENDING, FAILED, CANCELLED.     |
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">paymentMode</span></code>   | Payment mode used by customer to make the payment. Ex: DEBIT_CARD, MobiKwik, etc     |
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">txMsg</span></code>   | Message related to the transaction. Will have the reason, if payment failed     |
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">txTime</span></code>  | Time of the transaction    |

