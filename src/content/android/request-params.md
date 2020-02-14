---
title: Android Guide | Cashfree
permalink: /android/request-params
layout: guide
platform: android
display_platform: ANDROID
subtitle: Request Parameters
sortOrder: 12
---


# Request Parameters

| Parameter                                 | Required | Description                                      |
|-------------------------------------|-----------|----------------------------------------------------|
| <code>appId</code>            | Yes      | Your app id      |
| <code>orderId</code> | Yes       | Order/Invoice Id  |
| <code>orderAmount</code> | Yes       | Bill amount of the order      |
| <code>orderNote</code>            | No       | A help text to make customers know more about the order                                |
| <code>customerName</code> | No    | Name of the customer     |
| <code>customerPhone</code> | Yes    | Phone number of customer     |
| <code>customerEmail</code> | Yes    | Email id of the customer     |
| <code>notifyUrl</code> | No    | Notification URL for server-server communication. Useful when user’s connection drops after completing payment.     |
| <code>paymentModes</code> | No    | Allowed payment modes for this order. Available values: cc, dc, nb, paypal, upi, wallet. <strong>Leave it blank if you want to display all modes</strong>     |

