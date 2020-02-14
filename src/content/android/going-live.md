---
title: Android Guide | Cashfree
permalink: /android/going-live
layout: guide
platform: android
display_platform: ANDROID
subtitle: Going Live
sortOrder: 14
---

# Going Live

# Checklist for going live
<ul>
  <li>Ensure you are triggering https://api.cashfree.com/api/v2/cftoken/order endpoint for generating Token </li>
  <li>Pass the Production appId/secretKey in the x-client-id and x-client-secret of the token request API. Obtain these appId/secretKey from <a href="https://merchant.cashfree.com/merchant/pg#api-key">here</a> under the "Production" section.</li>
  <li>When calling doPayment()/upiPayment() ensure that the stage parameter is "PROD".</li>
  <li>When calling doPayment()/upiPayment() the params map is sent your appId. Please ensure it is correct production appId.</li>
</ul>

# Checklist for reverting to test
<ul>
  <li>Ensure you are triggering https://test.cashfree.com/api/v2/cftoken/order endpoint for generating Token </li>
  <li>Pass the Test appId/secretKey in the x-client-id and x-client-secret of the token request API. Obtain these appId/secretKey from <a href="https://merchant.cashfree.com/merchant/pg#api-key">here</a> under the "Sandbox" section.</li>
  <li>When calling doPayment()/upiPayment() ensure that the stage parameter is "TEST".</li>
  <li>When calling doPayment()/upiPayment() the params map is sent your appId. Please ensure it is correct test appId.</li>
</ul>

