---
title: Android Guide | Cashfree
permalink: /android/response-param
layout: guide
platform: android
display_platform: ANDROID
subtitle: Response parameters
sortOrder: 13
---


# Response parameters

These parameters are sent as extras to the onActivityResult(). They contain the details of the transaction.

| Parameter                                  | Description                                      |
|------------------------------------------------|----------------------------------------------------|
| <code>orderId</code>  | Order id for which transaction has been processed. Ex: GZ-212  |
| <code>orderAmount</code> | Amount of the order. Ex: 256.00      |
| <code>paymentMode</code> | Payment mode of the transaction.      |
| <code>referenceId</code>      | Cashfree generated unique transaction Id. Ex: 140388038803                                |
| <code>txStatus</code>   | Payment status for that order. Values can be : SUCCESS, FLAGGED, PENDING, FAILED, CANCELLED.     |
| <code>paymentMode</code>   | Payment mode used by customer to make the payment. Ex: DEBIT_CARD, MobiKwik, etc     |
| <code>txMsg</code>   | Message related to the transaction. Will have the reason, if payment failed     |
| <code>txTime</code>  | Time of the transaction    |
| <code>type</code>  | Fixed value : <b>CashFreeResponse</b>. To identify the response is from cashfree SDK.    |
| <code>signature</code>  | Response signature, more [here.](/cf-checkout#response-verification)    |



