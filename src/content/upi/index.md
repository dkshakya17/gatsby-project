---
title: Resources Guide| Cashfree
permalink: /upi
layout: guide
platform: upi
display_platform: UPI
subtitle: Getting Started
sortOrder: 1
---

# Cashfree UPI
This guide documents how to use the Cashfree UPI in the below modes.
- API
- Intent

# API
The seamless UPI API flow allows merchants to collect UPI payments. The primary API is used to
create a collect request to customer’s phone. Once the payment is confirmed a callback will be
sent to the notifyUrl.
As an alternate Order Status API also can be used to poll the status of the order.
As well as to improve success rates, Validate VPA API can also be used(Refer Rest API docs)

##Available UPI Modes

1. Collect: Send a collect request to a particular user vpa.(DEFAULT)
2. Google Pay: Send direct notification to google pay for the customer to pay.
3. QR Code: Customer can scan and pay the qr code using any UPI app.
4. Link: Pay using an UPI scheme link using any UPI app.

# Endpoints

| URL                                 | Environment         |
|-------------------------------------|--------------------------------|
| <code class="highlighter-rouge">https://test.cashfree.com/billpay/checkout/post/submit</code>            |  TEST     |
| <code class="highlighter-rouge">https://www.cashfree.com/checkout/post/submit</code> | PRODUCTION      |

## Request Parameters(Content-Type-multipart/form-data)

| Parameter                                 | Required | Description                                      |
|-------------------------------------|-----------|----------------------------------------------------|
| <code class="highlighter-rouge">appId</code>            | Yes      | Your app id      |
| <code class="highlighter-rouge">secretKey</code>            | Yes      | Your Secret Key      |
| <code class="highlighter-rouge">orderId</code> | Yes       | Order/Invoice Id  |
| <code class="highlighter-rouge">orderAmount</code> | Yes       | Bill amount of the order      |
| <code class="highlighter-rouge">orderCurrency</code>            | No      | Currency for the order. INR if left empty. See the Currency Codes below for a list of available currencies. Please contact care@cashfree.com to enable new currencies       |
| <code class="highlighter-rouge">orderNote</code>            | No       | A help text to make customers know more about the order                                |
| <code class="highlighter-rouge">customerName</code> | Yes    | Name of the customer     |
| <code class="highlighter-rouge">customerPhone</code> | Yes    | Phone number of customer     |
| <code class="highlighter-rouge">customerEmail</code> | Yes    | Email id of the customer     |
| <code class="highlighter-rouge">returnUrl</code> | Yes    | Return URL to which user will be redirected after the payment (max-len 500)     |
| <code class="highlighter-rouge">notifyUrl</code> | No    | Notification URL for server-server communication. Useful when user’s connection drops while re-directing (max-len 500) <br/> <b>notifyUrl should be an https URL</b>   |
| <code class="highlighter-rouge">signature</code> | Yes    | Request signature    |
| <code class="highlighter-rouge">paymentOption</code> | Yes    | Value should be "upi"   |
| <code class="highlighter-rouge">responseType</code> | Yes    | Value should be "json"    |
| <code class="highlighter-rouge">upiMode</code> | No    | The mode of UPI request that is being used. By default a collect request is raised. Optional Values are as follows -  1.‘gpay’(Google Pay) which will use customerPhone instead of upi_vpa parameter to send notification directly to Google Pay app</br> 2.’qrcode’ this will provide with qrCode in response</br> 3.’link’ this will provide the upi pay scheme link as response    |
| <code class="highlighter-rouge">upi_vpa</code> | Yes    | User vpa for the transaction. Not required for upiMode = ‘gpay’,’qrcode’,’link’. Mandatory for other collect request |



## Response (Content-Type-application/json)

| Parameter                                 | Type | Description                                      |
|-------------------------------------|-----------|----------------------------------------------------|
| <code class="highlighter-rouge">status</code>            | String      | Status of API call “OK”, “ERROR”     |
| <code class="highlighter-rouge">orderId</code> | String       | Order/Invoice Id  |
| <code class="highlighter-rouge">referenceId</code> | String       | ReferenceId of the UPI transaction      |
| <code class="highlighter-rouge">message</code>            | String      | Message if any     |
| <code class="highlighter-rouge">qr</code>            | String       | Base64 png image. This is returned when upiMode ‘qrcode’ is used                               |
| <code class="highlighter-rouge">link</code> | String    | UPI scheme link that can used to pay using an UPI app returned when upiMode ‘link’is used    |

##Example
```bash
curl -X POST \
https://test.cashfree.com/billpay/checkout/post/submit \
-H 'Cache-Control: no-cache' \
-H 'content-type: multipart/form-data' \
-F appId=test \
-F orderId=A001 \
-F orderAmount=1 \
-F customerName=Test \
-F customerPhone=9895270649 \
-F customerEmail=test@gmail.com \
-F returnUrl= \
-F notifyUrl=https://test.cashfree.com/notify.php \
-F responseType=json \
-F paymentOption=upi \
-F upi_vpa=testsuccess@gocash \
-F signature=0LqbexARvzFuKfMg0I6GoUunr7239G5gZdZZGAXNMXA=
```

## Callback Response

| Parameter                                 | Description                                      |
|-------------------------------------|------------------------------|
| <code class="highlighter-rouge">orderId</code>        | Order id for which transaction has been processed. Ex: GZ-212” |
| <code class="highlighter-rouge">orderAmount</code>        | Amount of the order. Ex: 256.00      |
| <code class="highlighter-rouge">referenceId</code>                 | transaction reference id, if payment has been attempted       |
| <code class="highlighter-rouge">txStatus</code>                 | transaction status, if a payment has been attempted             |
| <code class="highlighter-rouge">paymentMode</code>                 | payment mode of transaction, if payment has been attempted       |
| <code class="highlighter-rouge">txMsg</code>                 | transaction message, if payment has been attempted             |
| <code class="highlighter-rouge">txTime</code>                 | transaction time, if payment has been attempted             |
| <code class="highlighter-rouge">signature</code>                 | response signature       |


# Endpoint to verify the keys

| URL                                 | Environment         |
|-------------------------------------|--------------------------------|
| <code class="highlighter-rouge">https://test.cashfree.com/api/v2/</code>            |  TEST     |
| <code class="highlighter-rouge">https://api.cashfree.com/api/v2/</code> | PRODUCTION      |


Cashfree uses API keys to allow access to the API. Once you have signed up at our merchant
site, you will be able to retrieve your AppId and SecretKey (API keys)

<aside class="notice">You can find your <b>appId</b> and <b>secret key</b> from the merchant dashboard <a href="https://merchant.cashfree.com/merchant/pg#api-key">linked here </a></aside>

CashFree expects API key to be included in all API requests to the server.
Use the endpoint /api/v1/credentials/verify to verify your credentials first (check Rest API docs).

##Headers
| Parameter                                 | Type | Description                                      |
|-------------------------------------|-----------|----------------------------------------------------|
| <code class="highlighter-rouge">X-Client-Id</code>            | String      | Your app id     |
| <code class="highlighter-rouge">X-Client-Secret</code> | String       | Secret Key  |
| <code class="highlighter-rouge">Content-Type</code> | String       | application/json      |

#Validate VPA
<b>GET /upi/validate/@vpa</b>

##Path Variables
| Parameter                                 | Type | Description                                      |
|-------------------------------------|-----------|----------------------------------------------------|
| <code class="highlighter-rouge">vpa</code>            | String      | Upi Vpa of the user     |


##Response
| Parameter                                 | Type | Description                                      |
|-------------------------------------|-----------|----------------------------------------------------|
| <code class="highlighter-rouge">status</code>            | String      | Status of API call “OK”, “ERROR”     |
| <code class="highlighter-rouge">valid</code>            | String      | Vpa validation status- True or False     |
| <code class="highlighter-rouge">name</code>            | String      | Vpa User Name this can be “NA” in some cases     |
| <code class="highlighter-rouge">vpa</code>            | String      | Upi Vpa of the user     |


##Example
```
curl -X GET \
http://test.cashfree.com/api/v2/upi/validate/testsucces@gocash \
-H 'Cache-Control: no-cache' \
-H 'X-Client-Id: Test \
-H 'X-Client-Secret: Test
```

#Order Status
<b>GET /orders/@orderId/status</b>

##Path Variables
| Parameter                                 | Type | Description                                      |
|-------------------------------------|-----------|----------------------------------------------------|
| <code class="highlighter-rouge">orderId</code>            | String      | OrderId used for creating the payment     |

## Response
| Parameter                                 | Description                                      |
|-------------------------------------|------------------------------|
| <code class="highlighter-rouge">status</code>        | Status of API call “OK”, “ERROR” |
| <code class="highlighter-rouge">txStatus</code>                 | transaction status, if a payment has been attempted             |
| <code class="highlighter-rouge">txMsg</code>                 | transaction message, if payment has been attempted             |
| <code class="highlighter-rouge">txTime</code>                 | transaction time, if payment has been attempted             |
| <code class="highlighter-rouge">referenceId</code>                 | transaction time, if payment has been attempted             |
| <code class="highlighter-rouge">paymentMode</code>                 | payment mode of transaction, if payment has been attempted       |
| <code class="highlighter-rouge">orderCurrency</code>                 | rcurrency of the order       |
| <code class="highlighter-rouge">txTime</code>                 | transaction time, if payment has been attempted             |
| <code class="highlighter-rouge">paymentDetails.paymentMode</code>                 | payment mode of transaction, if payment has been attempted             |
| <code class="highlighter-rouge">paymentDetails.bankName </code>                 | Name of the bank if payment has been attempted (only incase of Netbanking)       |
| <code class="highlighter-rouge">paymentDetails.cardNumber</code>                 | Masked card number if payment has been attempted(only in case of Debit & Credit Cards)       |
| <code class="highlighter-rouge">paymentDetails.cardCountry</code>                 | Country code of the card if payment has been attempted (only in case of Debit & Credit Cards)            |
| <code class="highlighter-rouge">paymentDetails.cardScheme</code>                 | Scheme of the card (eg:VISA) if payment has been attempted (only in case of Debit & Credit Cards)             |
| <code class="highlighter-rouge">paymentDetails.utr </code>                 | UTR of UPI transaction(only in case of UPI)       || <code class="highlighter-rouge">paymentDetails.vpa</code>                 | VPA of the User of the UPI transaction(only in case of UPI)       |

##Example
```bash
curl -X GET \
http://test.cashfree.com/api/v2/orders/1540568899/status \
-H 'Cache-Control: no-cache' \
-H 'X-Client-Id: Test \
-H 'X-Client-Secret: Test
```





