---
title: Popup | Cashfree
permalink: /popup
layout: guide
platform: Popup
display_platform: Popup
subtitle: Popup
sortOrder: 1
---

# Getting Started

This mode provides you a JavaScript implementation to integrate with the Cashfree Payment Gateway. Your customers can provide the payment details on your website, without you worrying about PCI compliance. The customers will not be  navigated away from your website, thus providing a richer user flow experience. Customer's payment details are accepted inside a cashfree-managed iframe. You do not have to work on securing the details yourself.


<div class="doc-warning">
<span class="oi" data-glyph="star"></span>
If you'd rather not include our payment form on your page and want to build your own payment page, consider our seamless mode of integration.
<br>

1. [Seamless Basic](/seamless-basic)
2. [Seamless Pro](/seamlesspro)

</div>


# Step 1: Cashfree JavaScript

Cashfree.js is our key JavaScript library for you to start building a payment flow customized to your requirements. You will need to include Cashfree’s javascript library in your page. The payment form will be overlayed on your webpage and you don't need to make any changes to your page layout.

`<script src="https://www.cashfree.com/assets/cashfree.sdk.v1.2.js" type="text/javascript"></script>`

# Step 2: Initialize Cashfree Config
Ideally your customers will be making a transaction for a particular order. To identify this particular order in your system you'll use an identifier aka `orderId`. As your payments are processed by Cashfree you'll need to send us the `orderId` and the corresponding `orderAmount`. In return after the payment is done we will inform you about the status of the payment corresponding to this `orderId`.  
There are some additional details also which you need to send us for processing the payment. You can take a look at all the request parameters [here](#request-parameters).


<!-- There are two ways to use the Merchant Hosted integration inside your website: an Inline mode or a Pop-up mode.  -->

<!-- # Inline Mode
In this mode the Cashfree payment form will be embedded in your web-page. 

<div class="tip info">
<div data-featherlight-gallery data-featherlight-filter="a">
<span class="oi ois" data-glyph="paperclip"></span>
<p>Example Screenshot</p>
<a href="{{ site.baseurl }}/assets/images/inline.png"><img src="{{ site.baseurl }}/assets/images/thumbnail_hosted_inline.png" /></a>
</div></div>

[View Code](https://gist.github.com/basilcf/caac0ac5ae13bd9fa87deb1ccfa7b117)

<script src="https://gist.github.com/basilcf/caac0ac5ae13bd9fa87deb1ccfa7b117.js"></script>
 -->
 

<div class="tip info">
<div data-featherlight-gallery data-featherlight-filter="a">
<span class="oi" data-glyph="paperclip"></span>
<p>Example Screenshot</p>
<a href="{{ site.baseurl }}/assets/images/popup.png"><img src="{{ site.baseurl }}/assets/images/thumbnail_hosted_inline.png" /></a>
</div></div>

[View Code](https://gist.github.com/basilcf/04a720a28b1e3a4d651df10387c613c4)
<script src="https://gist.github.com/basilcf/04a720a28b1e3a4d651df10387c613c4.js"></script>


# Step 3: Checksum Generation

Every request to Cashfree must contain authentication information to establish the identity of the user making the request.We use a digital signature (aka a digital thumbprint) to validate each transaction. A digital signature helps us in verifying the originator of the message and also ensures integrity of the signed data against tampering. 

Technically, the signature is generated as the HMAC value of the data being passed which is using SHA256 hash function in combination with merchant’s API secret key.

 We will generate a signature at our end and expect you to do the same with the posted data and match it with the passed argument.

<aside class="notice">You can find your <b>appId</b> and <b>secret key</b> from the merchant dashboard <a href="https://merchant.cashfree.com/merchant/pg#api-key">linked here </a></aside>

<aside class='warning'>
Checksum generation varies across integration methods, please verify if you are using the right signature generation method. </aside>


#BEGIN_CODE

```php

<?php
   $appId = "APP_ID"; 
   $secretKey = "SECRET_KEY";
   $orderId = "ORDER_ID";
   $orderAmount = "ORDER_AMOUNT";
   $returnUrl = "RETURN_URL"; 
   $paymentModes = ""; //keep it blank to display all supported modes
   $tokenData = "appId=".$appId."&orderId=".$orderId."&orderAmount=".$orderAmount."&returnUrl=".$returnUrl."&paymentModes=".$paymentModes;
   $token = hash_hmac('sha256', $tokenData, $secretKey, true);
   $paymentToken = base64_encode($token); 
 ?>

```

```python

import hashlib
import hmac
import base64

data = "appId=" + appId + "&orderId=" + orderId + "&orderAmount=" + orderAmount + "&returnUrl=" + returnUrl + "&paymentModes=" + paymentModes;
message = bytes(data).encode('utf-8')
secret = bytes(secretKey).encode('utf-8')
paymentToken = base64.b64encode(hmac.new(secret, message,digestmod=hashlib.sha256).digest())

```

```java


String data = "appId=" + appId + "&orderId=" + orderId + "&orderAmount=" + orderAmount + "&returnUrl=" + returnUrl + "&paymentModes=" + paymentModes;
  Mac sha256_HMAC = Mac.getInstance("HmacSHA256");
  SecretKeySpec skspec = new SecretKeySpec(secretKey.getBytes(),"HmacSHA256");
  sha256_HMAC.init(skspec);
  paymentToken = Base64.encodeBase64String(sha256_HMAC.doFinal(data.getBytes()));

```

```csharp

using System;
using System.Security.Cryptography;

namespace HttpUtils
{
  public class CashFreeToken
  {
     private string CreateToken(string message, string secret){
       secret = secret ?? "";
       var encoding = new System.Text.ASCIIEncoding();
       byte[] keyByte = encoding.GetBytes(secret);
       byte[] messageBytes = encoding.GetBytes(message);
       using (var hmacsha256 = new HMACSHA256(keyByte))
       {
         byte[] hashmessage = hmacsha256.ComputeHash(messageBytes);
         return Convert.ToBase64String(hashmessage);
       }
     }

     public static void Main() {
       String appId = "<Your_APP_ID>";
       String orderId = "<Your_Order_ID>";
       String orderAmount = "<Order_amount>";
       String returnUrl = "<return_url>";
       String paymentModes = "";
       String secret = "<secret_key>";

       String data = "appId=" + appId + "&orderId=" + orderId + "&orderAmount=" + orderAmount + "&returnUrl=" + returnUrl + "&paymentModes=" + paymentModes;

       CashFreeToken n = new CashFreeToken();
       String signature = n.CreateToken(data, secret);
       Console.WriteLine(signature);
     }
  }
}

```
#END_CODE

# Step 4: Trigger Payment

To trigger payment from your webpage you need to prepare the payment details and send them to us using the same javascript library. 
You just need to call the `CashFree.makePayment(data, callback)` method in your javascript to process the payment.
	

Cashfree posts form variables to `notifyUrl`(present in request parameters) that should be able to process these variables.



# Request Parameters

You must send us the below <b>JSON</b> data parameters for us to process your request. Please ensure to send us all the <b>required</b> fields mentioned below to process request.

| Parameter                                 | Required | Description                                      |
|-------------------------------------|-----------|----------------------------------------------------|
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">appId</span></code>            | Yes      | Your app id      |
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">orderId</span></code> | Yes       | Order/Invoice Id  |
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">orderAmount</span></code> | Yes       | Bill amount of the order      |
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">orderCurrency</span></code>            | No      | Currency for the order. Default currency is INR. [See](/resources/currencies) the Currency Codes for a list of available currencies. <b> Please contact care@cashfree.com to enable new currencies </b>      |
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">orderNote</span></code>            | No       | A help text to make customers know more about the order                                |
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">customerName</span></code> | Yes    | Name of the customer     |
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">customerPhone</span></code> | Yes    | Phone number of customer     |
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">customerEmail</span></code> | Yes    | Email id of the customer     |
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">returnUrl</span></code> | Yes    | Return URL to which user will be redirected after the payment. Pass an empty string to invoke the callback method     |
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">notifyUrl</span></code> | No    | Notification URL for server-server communication. Useful when user’s connection drops.<br>  <b>notifyUrl should be an https URL</b>    |
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">paymentModes</span></code> | No    | Allowed payment modes for this order. Available values: cc, dc, nb, paypal, upi, wallet. <b>Leave it blank if you want to display all modes</b>      |
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">paymentToken</span></code>            | Yes      | Signature. Refer [here](#step-3-checksum-generation)     |


# Configuration Parameters

The following Configuration parameters are used when initalizing the Cashfree Config. 

| Parameter                                 | Required | Description                                      |
|-------------------------------------|-----------|----------------------------------------------------|
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">mode</span></code>            | Yes      | Integration stages - values can be <b>TEST</b> or <b>PROD</b>      |
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">layout</span></code> | Yes       | javascript object to define layout  |
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">layout.view</span></code> | Yes       | <b>"popup"</b>       |
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">layout.width</span></code>            | No       | Width of payment form. Value should be a number. Could be in range of 500 to 700.                                |


## Test Card 
The TEST mode is to check the flow of the transaction. Make sure you always use the TEST appId and secret key only while working on TEST mode.

You will have to use [these](/resources/testdata) cards while making the payment.

# Response parameters

Cashfree will return details about every transaction to the methods you implement. The response parameters will be sent to the javascript `callback` method. We will also post the same details from our servers to your `notifyUrl`. You should process these details accordingly.

| Parameter                                  | Description                                      |
|-------------------------------------|-----------------------------------------------------------|
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">orderId</span></code>  | Order id for which transaction has been processed. Ex: GZ-212  |
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">orderAmount</span></code> | Amount of the order. Ex: 256.00      |
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">referenceId</span></code>      | Cashfree generated unique transaction Id. Ex: 140388038803                                |
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">txStatus</span></code>   | Payment status for that order. Values can be : SUCCESS, FLAGGED, PENDING, FAILED, CANCELLED. More [here](/resources/responsestatus)    |
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">paymentMode</span></code>   | Payment mode used by customer to make the payment. Ex: DEBIT_CARD, MobiKwik, etc     |
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">txMsg</span></code>   | Message related to the transaction. Will have the reason, if payment failed     |
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">txTime</span></code>  | Time of the transaction    |
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">signature</span></code>  | Response signature, refer [here.](#response-verification) It is mandatory to verify the signature. |

# Response Verification
Similar to every request checksum, we also send a digital signature in our response message. We strongly recommend you to verify this response signature at your end. This will ensure the response is not tampered.
