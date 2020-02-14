---
title: Android Guide | Cashfree
permalink: /android/cfandroid-sdk
layout: guide
platform: android
display_platform: ANDROID
subtitle: Cashfree Android SDK
sortOrder: 3
---

# Cashfree Android SDK

Our Android SDK provides following following APIs for integration.


##Web Checkout
This is the standard integration for Cashfree SDK. With this integration you can load a webview which will  render cashfree payment page where the customer will fill in the details and complete the payment. After completing payment they will be redirected back to your app and you will get a response through onActivityResult() of the calling activity.
<ul>
   <li><b>Normal</b> - Customer selects the payment mode and enters the payment details inside the Cashfree's web payment page and does payment.</li>
<li><b>Seamless</b> - Customer selects the payment mode and enters payment details in your App which is then passed to cashfree backend through the SDK. Webview is launched only for the Two-factor Authentication.</li>

<li><b>Google Pay</b> - Customer is directly taken to Google Pay app for payment. </li>

<li><b>Amazon Pay</b> - Amazon pay integration using chrome custom tabs. </li>

</ul>

##UPI Intent 
 
 <ul>
    <li><b>Normal</b> - Customer is shown the list of UPI apps available in the phone and the customer selects which app to make payment.</li>
    <li><b>Seamless</b> - Customer selects which app the payment has to be done in your app and the SDK automatically redirects them to the app if it is present in the phone.</li>
   </ul>

    1. getUpiClients - Get a list of UPI apps present in the phone.
    2. selectUpiClient - Set the UPI client package
##Others
<ul>
  <li> <b>setOrientation </b>- Set screen orientation to portrait or landscape.</li>
  <li> <b>setConfirmOnExit</b> - Ask the user to confirm payment cancellation using a alert dialog.</li>