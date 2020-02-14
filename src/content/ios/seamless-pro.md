---
title: iOS Developer Guide | Cashfree
permalink: /ios/seamless-pro
layout: guide
platform: ios
display_platform: iOS
subtitle: Seamless Pro
sortOrder: 4
---


# Seamless

In Seamless payment flow, the customer enters all details on merchant's checkout view itself( Cashfree is whitelabled in this scenario). Once the customer has entered all details related to the payment mode , the request opens in a webview showing the service provider (eg OTP page in case of card payment).

The integration steps for Seamless mode are almost same as the Web Checkout flow except the input params passed will have extra parameters according to the payment mode selected.


Pass the params in the below snippet in addition to the other input params specified [here](web-checkout#step-2:-input-params-dictionary)

## CARD PAYMENT

```swift
let cardParams = [
    "paymentOption": "card",
    "card_number": cardNumberTextbox.text ?? "", //If you don't pass these values then it will not be sent in the request.
    "card_holder": cardHolderTextbox.text ?? "",
    "card_expiryMonth": expiryMonthTextbox.text ?? "",
    "card_expiryYear": expiryYearTextbox.text ?? "",
    "card_cvv": cvvCodeTextbox.text ?? ""
]
```

## UPI PAYMENT

```swift
let upiParams = [
    "paymentOption": "upi",
    "upi_vpa": "testsuccess@gocash",
    "upiMode": "" //Required if you need to use googlepay use "gpay"
]
```

## WALLET PAYMENT
```swift
let walletParams = [
    "paymentOption": "wallet",
    "paymentCode": "4001" // Wallet code https://docs.cashfree.com/docs/resources/#wallet
]
```

## NETBANKING PAYMENT
```swift
let netBankingParams = [
    "paymentOption": "nb",
    "paymentCode": "3333" // Bank code https://docs.cashfree.com/docs/resources/#net-banking
]
```

## PAYPAL PAYMENT
```swift
let paypalParams = [
    "paymentOption": "paypal"
]
```
