---
title: Merchant Hosted Guide | Cashfree
permalink: /seamless-basic
layout: guide
platform: seamlessbasic
display_platform: SEAMLESSBASIC
subtitle: seamless-basic
sortOrder: 1
---

# Getting Started

Seamless Basic integration allows you to provide your own payment form to your customers. With this you can collect all payment details on your webpage and safely send them to Cashfree for processing. You do not have to worry about PCI compliance as we take care of it on your behalf.



 # Step 1: Preparing payment form

You first need to prepare a basic payment form on your webpage (see a basic payment form below). We’ve also added some simple javascript methods to capture the submitted payment details in the below code snippet, these methods will be filled in Step 3.

<script src="https://gist.github.com/basilcf/9e38fffb038287c46a5783492eadc275.js"></script>

 # Step 2: Cashfree Javascript

Once you have the basic html form ready, include Cashfree’s javascript library in your page. You will be using this js sdk to send payment details to Cashfree to make the payment.

`<script src="https://www.cashfree.com/assets/cashfree.sdk.v1.2.js" type="text/javascript"></script>`

 # Step 3: Initializing Config
Ideally your customers will be making a transaction for a particular order. To identify this particular order in your system you'll use an identifier aka `orderId`. As your payments will be processed by Cashfree you'll need to send us the `orderId` and the corresponding `orderAmount`. In return after the payment is completed we will inform you about the status of the payment corresponding to this `orderId`.  

There are some additional details also which you need to send us for processing the payment. You can take a look at all the request parameters [here](#request-parameters).

<aside class='notice'>
There are two ways to use Seamless integration inside your website: a <b>re-direct mode</b> or a <b>pop-up mode</b>
</aside>

<b>Popup Mode</b> </br>
In this mode your customer will enter the two-factor authentication details on the same page and will land back on the same page post payment completion.

[View Code](https://gist.github.com/basilcf/e61a1336a7e8a1a5017feeb4b07408af)

<script src="https://gist.github.com/basilcf/e61a1336a7e8a1a5017feeb4b07408af.js"></script>

<b>Redirect Mode</b></br>
In this mode your customer will be redirected to another page. Upon payment completion the customer will be taken to the return url which you have specified in the order request.

[View Code](https://gist.github.com/basilcf/0733897fefcde54763854f51e3e5a408)

<script src="https://gist.github.com/basilcf/0733897fefcde54763854f51e3e5a408.js"></script>

We have filled in the javascript methods you’ll need when accepting payments in either of the two methods. 


 # Step 4: Checksum Generation
Every request to Cashfree must contain authentication information to establish the identity of the user making the request.We use a digital signature (aka a digital thumbprint) to validate each transaction. A digital signature helps us in verifying the originator of the message and also ensures integrity of the signed data against tampering. 

Technically, the signature is generated as the HMAC value of the data being passed which is using SHA256 hash function in combination with merchant’s API secret key.

 We will generate a signature at our end and expect you to do the same with the posted data and match it with the passed argument.

<aside class="notice">You can find your <b>appId</b> and <b>secret key</b> from the merchant dashboard <a href="https://merchant.cashfree.com/merchant/pg#api-key">linked here </a></aside>

<aside class='warning'>
Checksum generation varies across integration methods, please verify if you are using the right signature generation method. </aside>

<div class='tip info'><div>
Sample code for you to generate a valid `signature`.
</div></div>

#BEGIN_CODE

```php


<?php
   $appId = "<your_app_id>"; //replace it with your appId
   $secretKey = "<your_secret_key">; //replace it with your secret key
   $orderId = "1234";
   $orderAmount = 450;
   $customerEmail = test@gmail.com
   $customerPhone = 9900012345;
   $tokenData = "appId=".$appId."&orderId=".$orderId."&orderAmount=".$orderAmount."&customerEmail=".$customerEmail."&customerPhone=".$customerPhone."&orderCurrency=".$orderCurrency;
   $token = hash_hmac('sha256', $tokenData, $secretKey, true);
   $paymentToken = base64_encode($token);
 ?>

```
```python

import hashlib
import hmac
import base64

data = "appId=" + appId + "&orderId=" + orderId + "&orderAmount=" + orderAmount + "&customerEmail=" + customerEmail + "&customerPhone=" + customerPhone + "&orderCurrency=" + orderCurrency;
message = bytes(data).encode('utf-8')
secret = bytes(secretKey).encode('utf-8')
paymentToken = base64.b64encode(hmac.new(secret, message,digestmod=hashlib.sha256).digest())

```

```java

String data = "appId=" + appId + "&orderId=" + orderId + "&orderAmount=" + orderAmount + "&customerEmail=" + customerEmail + "&customerPhone=" + customerPhone + "&orderCurrency=" + $orderCurrency;
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
       String customerEmail = "<return_url>";
       String customerPhone = "";
       String secret = "<secret_key>";

       String data = "appId=" + appId + "&orderId=" + orderId + "&orderAmount=" + orderAmount + "&customerEmail=" + customerEmail + "&customerPhone=" + customerPhone + "&orderCurrency=" + $orderCurrency;

       CashFreeToken n = new CashFreeToken();
       String signature = n.CreateToken(data, secret);
       Console.WriteLine(signature);
     }
  }
}

```

#END_CODE

 # Step 5: Trigger Payment

Once you have the basic elements in place - the payment form, Cashfree.js and the config object, you can start accepting payments from your customers by using the `CashFree.paySeamless(data, callback)` javascript method.

| Parameter                                 | Description                                      |
|-------------------------------------|---------------------------------------------------------------|
| <code class="highlighter-rouge">data</code>        | A simple JS Object containing all the data related to transaction. All possible parameters are listed [below](#request-parameters) |
| <code class="highlighter-rouge">paymentCallback</code>        |(Optional) A callback method of the form <b>paymentCallback(event)</b>. Event object is described [here](#response-parameters). This is not required for <b>redirect option</b>.      |
 

`paymentCallback` as mentioned above is a javascript method of the form `paymentCallback(event)`. This method will be called once to report the status of the Payment. The event parameter will have details of the transaction. Below are the various possible values of the event parameter. 

| Case                                 | event.name | event.status                                      |
|-------------------------------------|-----------|----------------------------------------------------|
| <code class="highlighter-rouge">Successful Payment</code>            | PAYMENT_RESPONSE      | SUCCESS      |
| <code class="highlighter-rouge">Payment Failed</code>            | PAYMENT_RESPONSE      | FAILED      |
| <code class="highlighter-rouge">Pending Payment</code>            | PAYMENT_RESPONSE      | PENDING      |
| <code class="highlighter-rouge">Payment cancelled by user</code>            | PAYMENT_RESPONSE      | CANCELLED      |
| <code class="highlighter-rouge">Payment successful but kept on hold by risk system</code>            | PAYMENT_RESPONSE      | FLAGGED      |
| <code class="highlighter-rouge">Invalid inputs</code>            | VALIDATION_ERROR      | -      |
 

<div class='tip info'><div>
`CashFree.initPopup()` is required for the popup to work even in case of callback.
</div></div>



 # Request Parameters 

You must send us the below <b>JSON</b> data parameters for us to process your request. Please ensure to send us all the <b>required</b> fields mentioned below to process request.

| Parameter                                 | Required | Description                                      |
|-------------------------------------|-----------|----------------------------------------------------|
| <code class="highlighter-rouge">data.appId</code>            | Yes      | Your app id      |
| <code class="highlighter-rouge">data.orderId</code>            | Yes      | Order/Invoice Id      |
| <code class="highlighter-rouge">data.orderAmount</code> | Yes       | Bill amount of the order  |
| <code class="highlighter-rouge">data.orderCurrency</code> | Yes      | Currency for the order. [See](/resources/currencies) the Currency Codes for a list of available currencies. <b> Please contact care@cashfree.com to enable new currencies </b>      |
| <code class="highlighter-rouge">data.orderNote</code> | No       | A help text to make customers know more about the order      |
| <code class="highlighter-rouge">data.customerName</code> | Yes    | Name of the customer     |
| <code class="highlighter-rouge">data.customerPhone</code> | Yes    | Phone number of customer.     |
| <code class="highlighter-rouge">data.customerEmail</code> | Yes    | Email id of the customer.     |
| <code class="highlighter-rouge">data.notifyUrl</code> | No    | Notification URL for server-server communication. Useful when user’s connection drops while re-directing. notifyUrl should be an https URL     |
| <code class="highlighter-rouge">data.returnUrl</code> | Yes - Redirect NA - Popup   | Return url for redirecting once payment is completed.     |
| <code class="highlighter-rouge">data.paymentToken</code> | Yes    | Request signature, more [here](#step-4-checksum-generation)     |
 

 # Configuration Parameters

 ## CARDS

These parameters are available only for Card Payments

| Parameter                                 | Required | Description                                      |
|-------------------------------------|-----------|----------------------------------------------------|
| <code class="highlighter-rouge">data.card.number</code>            | Yes      | Card Number. Sixteen digits only. No spaces or Hyphens      |
| <code class="highlighter-rouge">data.card.expiryMonth</code>            | Yes      | Expiration Month for the Card. In MM format      |
| <code class="highlighter-rouge">data.card.expiryYear</code> | Yes       | Expiration Year for the Card. In YYYY format  |
| <code class="highlighter-rouge">data.card.cvv</code> | Yes       | CVV number of the  Card      |
| <code class="highlighter-rouge">data.card.holder</code> | Yes    | Name of the Card Holder     |
| <code class="highlighter-rouge">data.paymentOption</code> | Yes    | <b>'card'</b> for Debit/Credit Cards     |
 

 ## NET BANKING

These parameters are available only for Net-Banking

| Parameter                                 | Required | Description                                      |
|-------------------------------------|-----------|----------------------------------------------------|
| <code class="highlighter-rouge">data.nb.code</code>            | Yes      | Code for the Bank See the list below      |
| <code class="highlighter-rouge">data.paymentOption</code> | Yes    | <b>'nb'</b> for Net banking     |
 

 ## WALLET

These parameters are available only for Wallets

| Parameter                                 | Required | Description                                      |
|-------------------------------------|-----------|----------------------------------------------------|
| <code class="highlighter-rouge">data.wallet.code</code>            | Yes      | Code for the Wallet See the list below      |
| <code class="highlighter-rouge">data.paymentOption</code> | Yes    | <b>'wallet'</b> for Wallet     |
 

 ## UPI

These parameters are available only for UPI

| Parameter                                 | Required | Description                                      |
|-------------------------------------|-----------|----------------------------------------------------|
| <code class="highlighter-rouge">data.upi.vpa</code>            | Yes      | UPI VPA for triggering UPI payment      |
| <code class="highlighter-rouge">data.paymentOption</code> | Yes    | <b>'upi'</b> for UPI     |
 

 ## Paypal

These parameters are available only for PayPal

| Parameter                                 | Required | Description                                      |
|-------------------------------------|-----------|----------------------------------------------------|
| <code class="highlighter-rouge">data.paymentOption</code> | Yes    | <b>'paypal'</b> for Paypal     |
 

 # Test Card 
The TEST mode is to check the flow of the transaction. Make sure you always use the TEST appId and secret key only while working on TEST mode.

You will have to use [these](/resources/testdata) cards while making the payment.



# Response parameters

Cashfree will post details about every transaction to both the callback method and the `notify_url`. These parameters will be posted to the services you host on these urls. You should use these details accordingly. 

| Parameter                                  | Description                                      |
|-------------------------------------|------------------------------------------------------------|
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">orderId</span></code>  | Order id for which transaction has been processed. Ex: GZ-212  |
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">orderAmount</span></code> | Amount of the order. Ex: 256.00      |
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">referenceId</span></code>      | Cashfree generated unique transaction Id. Ex: 140388038803                                |
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">txStatus</span></code>   | Payment status for that order. Values can be : SUCCESS, FLAGGED, PENDING, FAILED, CANCELLED. More [here](/resources/responsestatus)   |
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">paymentMode</span></code>   | Payment mode used by customer to make the payment. Ex: DEBIT_CARD, MobiKwik, etc     |
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">txMsg</span></code>   | Message related to the transaction. Will have the reason, if payment failed     |
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">txTime</span></code>  | Time of the transaction    |
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">signature</span></code>  | Response signature, refer [here.](#response-verification) It is recommended to verify the signature at your end  |
 
# Response Verification
Similar to every request checksum, we also send a digital signature in our response message. We strongly recommend you to verify this response signature at your end. This will ensure the response is not tampered.
 
 #BEGIN_CODE

```php



<?php  
 $orderId = $_POST["orderId"];
 $orderAmount = $_POST["orderAmount"];
 $referenceId = $_POST["referenceId"];
 $txStatus = $_POST["txStatus"];
 $paymentMode = $_POST["paymentMode"];
 $txMsg = $_POST["txMsg"];
 $txTime = $_POST["txTime"];
 $signature = $_POST["signature"];
 $data = $orderId.$orderAmount.$referenceId.$txStatus.$paymentMode.$txMsg.$txTime;
 $hash_hmac = hash_hmac('sha256', $data, $secretkey, true) ;
 $computedSignature = base64_encode($hash_hmac);
 if ($signature == $computedSignature) {
    // Proceed
  } else {
   // Reject this call
 }
 ?>

```
```python


import hashlib
import hmac
import base64

@app.route('/notify_url/', methods=["POST"])
def notify_url_process():

 postData = {
  "orderId" : request.form['orderId'], 
  "orderAmount" : request.form['orderAmount'], 
  "referenceId" : request.form['referenceId'], 
  "txStatus" : request.form['txStatus'], 
  "paymentMode" : request.form['paymentMode'], 
  "txMsg" : request.form['txMsg'], 
  "txTime" : request.form['txTime'], 
 }

 signatureData = postData["orderId"] + postData["orderAmount"] + postData["referenceId"] + postData["txStatus"] + postData["paymentMode"] + postData["txMsg"] + postData["txTime"]

 message = bytes(signatureData).encode('utf-8')
 #get secret key from your config
 secret = bytes(secretKey).encode('utf-8')
 signature = base64.b64encode(hmac.new(secret, 
   message,digestmod=hashlib.sha256).digest())

```

```java

LinkedHashMap<String, String> postData = new LinkedHashMap<String, String>();

postData.put("orderId", ORDERID);
postData.put("orderAmount", ORDERAMOUNT);
postData.put("referenceId", REFERENCE_ID);
postData.put("txStatus", TXN_STATUS);
postData.put("paymentMode", PAYMENT_MODE);
postData.put("txMsg", TX_MSG);
postData.put("txTime", TX_TIME);

String data = "";
Set<String> keys = postData.keySet();

for (String key : keys) {
    data = data + postData.get(key);
}
String secretKey = "" // Get secret key from config;
Mac sha256_HMAC = Mac.getInstance("HmacSHA256");
SecretKeySpec secret_key_spec = new
SecretKeySpec(secretKey.getBytes(),"HmacSHA256");
sha256_HMAC.init(secret_key_spec);

String signature = Base64.getEncoder().encodeToString(sha256_HMAC.doFinal(data.getBytes()));

```

```csharp
using System;
using System.Security.Cryptography;
using System.Collections.Generic;
namespace Rextester {
  public class Program {
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

    public static void Main(string[] args) {
        
      string secret = "<your_secret_key>";
      string data = "";  
        
      data = data + "FEX101";
      data = data + "10.00";
      data = data + "19992";
      data = data + "SUCCESS";
      data = data + "pg";
      data = data + "payment done";
      data = data + "2018-02-02 17:29:12";

      Program n = new Program();
      string signature = n.CreateToken(data, secret);
      Console.WriteLine(signature);
    }
  }
}

```

#END_CODE