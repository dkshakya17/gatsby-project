---
title: Popup | Cashfree
permalink: /popup/error
layout: guide
platform: popup
display_platform: Popup
subtitle: Common Error
sortOrder: 3
---

# Signature Mismatch Error

## 1. How can I solve the unable to verify token credentials?

You are not doing the payment token generation for the request correctly.
http://prod.cashfree.com/pg/#step-3-checksum-generation

# Callback function error

## 2. Why is the callback function not called?
If the returnUrl is specified, a redirect will be made to the return address. Your server can then process and render an appropriate page. To use callbacks you could pass the return url as an empty string. The callback function will be called once the transaction is completed.

# CORS policy error

## 3. Cashfree test links not working because of CORS policy?
Check if you are invoking cashfree API from the frontend/client? If this is the case please move the API invocation completely to the backend because invocation of API requires "secretKey" which should not be exposed on the frontend. If this is so we request you to prioritise the moving of Cashfree API invocation from frontend to backend because of the security risk. CORS errors are usually seen when the Cashfree APIs are invoked from frontend.