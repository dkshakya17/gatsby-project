---
title: Android Guide | Cashfree
permalink: /android/seamless-integration
layout: guide
platform: android
display_platform: ANDROID
subtitle: Seamless Integration
sortOrder: 5
---


<h1>Seamless Integration</h1>

Seamless integration can be used when there is a requirement for a more customized payment flow. In seamless integration you can implement the payment page yourself and then use our SDK to authorize the payment. Once the payment details are collected the OTP/2FA page will open in a webview. After the payment is confirmed the webview closes and you will get a callback. 

Please note that seamless integration will require an activation from our end. Also the integration tends to be longer because the payment page needs to be implemented by you. We recommend that you do [Checkout integration](/android/checkout-integration) unless you are certain that seamless integration is required.

The following sections describe the additional parameters for each of the payment methods.

# Credit/Debit Card
Add the following parameters to params map as illustrated before invoking doPayment() for initiating a seamless card transaction.

```java
params.put(PARAM_PAYMENT_OPTION, "card");
params.put(PARAM_CARD_NUMBER, "4434260000000008");//Replace Card number
params.put(PARAM_CARD_MM, "05"); // Card Expiry Month in MM 
params.put(PARAM_CARD_YYYY, "2021"); // Card Expiry Year in YYYY 
params.put(PARAM_CARD_HOLDER, "John Doe"); // Card Holder name
params.put(PARAM_CARD_CVV, "123"); // Card CVV
```
<br/>

# Net Banking
Add the following parameters to params map as illustrated before invoking doPayment() for initiating a seamless net banking transaction.

```java
params.put(PARAM_PAYMENT_OPTION, "nb");
params.put(PARAM_BANK_CODE, "3333");// Put correct bank code here
```

All valid Bank Code could can be seen [here](/docs/resources/#net-banking).
<br/>

# Wallet
Add the following parameters to params map as illustrated before invoking doPayment() for initiating a seamless wallet transaction.

```java
params.put(PARAM_PAYMENT_OPTION, "wallet");
params.put(PARAM_BANK_CODE, "4001");// Put correct wallet code here
```

All valid Wallet Codes could can be seen [here](/docs/resources/#wallet).
<br/>

# UPI
Add the following parameters to params map as illustrated before invoking doPayment() for initiating a seamless UPI transaction.

```java
params.put(PARAM_PAYMENT_OPTION, "upi");
params.put(PARAM_UPI_VPA, "testsuccess@gocash");// Put correct upi vpa here
```
<br/>

# Paypal
Add the following parameter to params map as illustrated before invoking doPayment() for initiating a seamless Paypal transaction.

```java
params.put(PARAM_PAYMENT_OPTION, "paypal");
```
<br/>

