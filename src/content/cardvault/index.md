---
title: Resources Guide| Cashfree
permalink: /cardvault
layout: guide
platform: cardvault
display_platform: CARD_VAULT
subtitle: Getting Started
sortOrder: 1
---


# Cashfree Vault

This document guides you how to integrate Cashfree's card vault API to avail the saved card feature 

## Save Card
Refer to the seamless pro docs here to save the card.

```html
<form>
....
<input name="paymentOption" value="card"/>
<input name="card_number" value="4444333322221111"/>
<input name="card_holder" value="John Doe"/>
<input name="card_expiryMonth" value="09"/>
<input name="card_expiryYear" value="2020"/>
<input name="card_cvv" value="123"/>
<input name="card_save" value="1"/>
</form>

```

Add additional parameter ‘card_save’ and set it to 1 to save the card in seamless pro flow.
Cards are only saved once the transaction is successful.

<aside class="notice">Please note that the card gets saved against the phone number provided in the above request. To fetch the <b>card token</b> you'll have to call the <b>getCards</b> API (see below). </aside>

##Use Saved Card
Please use the below form to submit a saved card.

```html
<form>
....
<input name="paymentOption" value="savedCard"/>
<input name="card_id" value="A83091283HDKASHKJDH2132"/>
<input name="card_cvv" value="123"/>
</form>

```
Please use the below endpoints to get Saved Cards

# Endpoints

| URL                                 | Environment         |
|-------------------------------------|--------------------------------|
| <code class="highlighter-rouge">https://test.cashfree.com/</code>            |  TEST     |
| <code class="highlighter-rouge">https://api.cashfree.com/</code> | PRODUCTION      |


Cashfree uses API keys to allow access to the API. Once you have signed up at our merchant
site, you will be able to retrieve your AppId and SecretKey (API keys)

<aside class="notice">You can find your <b>appId</b> and <b>secret key</b> from the merchant dashboard <a href="https://merchant.cashfree.com/merchant/pg#api-key">linked here </a></aside>

CashFree expects API key to be included in all API requests to the server.
Use the endpoint /api/v1/credentials/verify to verify your credentials first (check Rest API docs).

# Get all Cards associated with a customer.

URL - <b> POST  /api/v1/vault/cards/getCards</b>

## Request Parameters

| Parameter                                               | Required | Description                                                                                                                                                          |
|---------------------------------------------------------|----------|---------------------------------|
| <code class="highlighter-rouge">appId</code>            | Yes      | Your app id                                                                                                                                                          |
| <code class="highlighter-rouge">secretKey</code>        | Yes      | Your Secret Key                                                                                                                                                      |
| <code class="highlighter-rouge">phone</code>      | Yes      | String Phone number used to identify user |
                                                                                          
## Response Parameters

| Parameter                                               | Required | Description                                                                                                                                                          |
|---------------------------------------------------------|----------|---------------------------------|
| <code class="highlighter-rouge">cardId</code>            | Yes      | Your Card Id             |                                                                                                                                             |
| <code class="highlighter-rouge">maskedCard</code>        | Yes      | Masked Card Number                                                                                                                                                      |
| <code class="highlighter-rouge">cardScheme</code>      | Yes      | Card scheme eg .Visa, Mastercard |

###Example

Request
```html
curl -X POST \
https://test.cashfree.com/api/v1/vault/cards/getCards \
-H 'Cache-Control: no-cache' \
-H 'Content-Type: application/x-www-form-urlencoded' \
-d 'appId=XXXX&secretKey=XXXX&phone=9895XXX649'
```

Response
```html
[
{
"cardId":"63E6E4B4208A11E8B6EFB84A4B991DC5",
"maskedCard":"411111XXXXXX1132",
"cardScheme":"visa"
},
{
"cardId":"AC94D8B80D9011E8B6EFB84A4B991DC5",
"maskedCard":"411111XXXXXX1133",
"cardScheme":"visa"
}
]
```


# Delete Card associated with a customer.
URL - <b>POST /api/v1/vault/cards/deleteCard</b>

## Request Parameters

| Parameter                                               | Required | Description                                                                                                                                                          |
|---------------------------------------------------------|----------|---------------------------------|
| <code class="highlighter-rouge">appId</code>            | Yes      | Your app id                                                                                                                                                          |
| <code class="highlighter-rouge">secretKey</code>        | Yes      | Your Secret Key                                                                                                                                                      |
| <code class="highlighter-rouge">phone</code>      | Yes      | String Phone number used to identify user |
| <code class="highlighter-rouge">cardId</code>            | Yes      | Your Card Id             |  

## Response Parameters

| Parameter                                               | Required | Description                                                                                                                                                          |
|---------------------------------------------------------|----------|---------------------------------|
| <code class="highlighter-rouge">status</code>            | Yes      | API call status, values - OK and ERROR |                                         

###Example
Request
```html
curl -X POST \
https://test.cashfree.com/api/v1/vault/cards/deleteCard \
-H 'Cache-Control: no-cache' \
-H 'Content-Type: application/x-www-form-urlencoded' \
-d
'appId=XXXX&secretKey=XXX&phone=9895XXX649&cardId=B3BF498612E611E8A15B0AC95
3478514'
```

Response
```html
{
“status”:”OK”
“message”: “Deleted Successfully”
}
```