---
title: Merchant Hosted Guide | Cashfree
permalink: /seamlesspro
layout: guide
platform: seamlesspro
display_platform: SEAMLESSPRO
subtitle: Seamless Pro
sortOrder: 1
---

# Getting Started

The Seamless Pro integration allows you to present your own payment form to your customers and collecting payment details on your webpage. This allows a seamless checkout experience to your customer. You will post the payment details to Cashfree for us to complete the two-factor authentication.


## Endpoints

| URL                                 | Environment         |
|-------------------------------------|--------------------------------|
| <code class="highlighter-rouge">https://test.cashfree.com/billpay/checkout/post/submit</code>            |  TEST     |
| <code class="highlighter-rouge">https://www.cashfree.com/checkout/post/submit</code> | PRODUCTION      |
 

# Step 1: Collecting Payment Details
Ideally your customers will be making a transaction for a particular order. To identify this particular order in your system you'll use an identifier aka `orderId`. As your payments are processed by Cashfree you'll need to send us the `orderId` and the corresponding `orderAmount`. In return after the payment is completed we will inform you about the status of the payment corresponding to this `orderId`.  

There are some additional details also which you need to send us for processing the payment. You can take a look at all the request parameters [here](#request-parameters).

You should first collect all these relevant payment details(request parameters) from your customer. 

<aside class="notice">You can find your <b>appId</b> and <b>secret key</b> from the merchant dashboard <a href="https://merchant.cashfree.com/merchant/pg#api-key">linked here </a></aside>

Cashfree will post the response parameters to the `returnUrl` which you have specified while making the order request. 

Cashfree posts form variables to a URL `notifyUrl` you specify that runs a program to process these variables. Checkout the response parameters which Cashfree will post to these URLs. 


```html
  <form id="redirectForm" method="post" action="<ACTION_URL>">
    <input type="hidden" name="appId" value="<YOUR_APP_ID>"/>
    <input type="hidden" name="orderId" value="<ORDERID>"/>
    <input type="hidden" name="orderAmount" value="<ORDERAMOUNT>"/>
    <input type="hidden" name="orderCurrency" value="<ORDER_CURRENCY>"/>
    <input type="hidden" name="orderNote" value="<ORDERNOTE>"/>
    <input type="hidden" name="customerName" value="<CUSTOMER_NAME>"/>
    <input type="hidden" name="customerEmail" value="<CUSTOMER_EMAIL>"/>
    <input type="hidden" name="customerPhone" value="<CUSTOMER_PHONE>"/>
    <input type="hidden" name="returnUrl" value="<RETURN_URL>"/>
    <input type="hidden" name="notifyUrl" value="<NOTIFY_URL>"/>
    <input type="hidden" name="signature" value="<GENERATED_SIGNATURE>"/>
  </form>
  <script type="text/javascript">
    document.getElementById("redirectForm").submit();
  </script>
```

# Request Parameters

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
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">returnUrl</span></code> | Yes    | The URL to which user will be redirected after the payment     |
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">notifyUrl</span></code> | No    | Notification URL for server-server communication. Useful when user’s connection drops. </br><b>notifyUrl should be an https URL</b>    |
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">signature</span></code>            | Yes      | Request signature, see [more](#step-2:-checksum-generation)      |
 

Each payment method also requires some additional information to be collected. You can refer below to know more about the information required for each method.

# Configuration Parameters

## Cards

<aside class= 'warning' ><b>Note: Accepting card details on your page requires PCI DSS Level 3 Certificate </b></aside>


Please add the following input fields in your form

```html
  <form>
    ....
   <input name="paymentOption" value="card"/>
   <input name="card_number" value="4444333322221111"/>
   <input name="card_holder" value="John Doe"/>
   <input name="card_expiryMonth" value="09"/>
   <input name="card_expiryYear" value="2020"/>
   <input name="card_cvv" value="123"/>
  </form>
```

These parameters are available only for Card Payments

| Parameter                                 | Required | Description                                      |
|-------------------------------------|-----------|----------------------------------------------------|
| <code class="highlighter-rouge">card_number</code>            | Yes      | Card Number. Sixteen digits only. No spaces or Hyphens      |
| <code class="highlighter-rouge">card_expiryMonth</code>            | Yes      | Expiration Month for the Card. In MM format      |
| <code class="highlighter-rouge">card_expiryYear</code> | Yes       | Expiration Year for the Card. In YYYY format  |
| <code class="highlighter-rouge">card_cvv</code> | Yes       | CVV number of the Card      |
| <code class="highlighter-rouge">card_holder</code> | Yes    | Name of the Card Holder     |
| <code class="highlighter-rouge">paymentOption</code> | Yes    | <b>'card'</b> for Debit/Credit Cards     |
 

## Netbanking
For paying through netbanking you need to include the below mentioned parameters in your html form. [See](/resources/netbanking) the complete list of banks available for netbanking on our resources page and their corresponding `paymentCode` values. 

```html
  <form>
  ....
   <input name="paymentOption" value="nb"/>
   <input name="paymentCode" value="3333"/>
  </form>  
```

These parameters are available only for NetBanking Payments

| Parameter                                 | Required | Description                                      |
|-------------------------------------|-----------|----------------------------------------------------|
| <code class="highlighter-rouge">paymentCode</code>            | Yes      | [Refer](/resources/netbanking) the list  for the codes     |
| <code class="highlighter-rouge">paymentOption</code> | Yes    | <b>'nb'</b> for Net banking     |
 

## Wallet
For paying through a wallet you need to set the `paymentOption` as “wallet”. [See](/resources/wallet) the complete list of available wallets and their payment codes in our resources page.

```html
 <form>
  ....
  <input name="paymentOption" value="wallet"/>
  <input name="paymentCode" value="4001"/>
 </form>
```

These parameters are available only for Wallets

| Parameter                                 | Required | Description                                      |
|-------------------------------------|-----------|----------------------------------------------------|
| <code class="highlighter-rouge">paymentCode</code>            | Yes      | [Refer](/resources/wallet) the list for codes      |
| <code class="highlighter-rouge">paymentOption</code> | Yes    | <b>'wallet'</b> for Wallet     |
 

## UPI
We also support payment through UPI, you need to set the `paymentOption` as `upi`.
We support below modes of payment within UPI.

  * Collect
  * Google Pay
  * QR Code

### Collect
  Collect request is sent to customers vpa which is specified in `upi_vpa`.


```html
 <form>
  ....
  <input name="paymentOption" value="upi"/>
  <input name="upi_vpa" value="testsuccess@gocash"/>
 </form> 
```
In our test framework you can use `testsuccess@gocash` as your default upi VPA. 


### Google Pay
  Notification to Google Pay is directly sent to the contact number of the customer as specified in `customerPhone` parameter present in the request parameters. `upiMode` attribute needs to be set to `gpay`. </br>

 <b> NOTE - </b> `upi_vpa`  is not required.


```html
 <form>
  ....
  <input name="paymentOption" value="upi"/>
  <input name="upiMode" value="gpay"/>
 </form> 
```


### QR Code
  Customer will be redirected to QR code page which he can scan to complete the payment.`upiMode` attribute needs to be set to `qrcode`.</br>
   <b> NOTE - </b> `upi_vpa`  is not required.


```html
 <form>
  ....
  <input name="paymentOption" value="upi"/>
  <input name="upiMode" value="qrcode"/>
 </form> 
```


## EMI
You can also accept EMI payments, you need to set the `paymentOption` as `emi`. [See](/resources/emi) the complete list of available EMI providers and their payment codes along with the available plan.

```html
 <form>
  ....
  <input name="paymentOption" value="emi"/>
  <input name="emiPlan" value="2"/>
  <input name="paymentCode" value="6005"/>
 </form> 
```
Note: `emiPlan` is only required in case of Card EMI.

These parameters are available only for EMI

| Parameter                           | Required  | Description                                        |
|-------------------------------------|-----------|----------------------------------------------------|
| <code class="highlighter-rouge">paymentCode</code> | Yes      | [See here](/resources/emi) for the codes |
| <code class="highlighter-rouge">paymentOption</code> | Yes    | <b>'emi'</b> for EMI     |
| <code class="highlighter-rouge">emiPlan</code> | No   | Only required for Card EMI |
 

## Pay Later
We also support Pay Later on payments, you need to set the `paymentOption` as `paylater`. [See](/resources/paylater) the complete list of available Pay Later providers and their payment codes.

```html
 <form>
  ....
  <input name="paymentOption" value="paylater"/>  
  <input name="paymentCode" value="4503"/>  
 </form> 
```

These parameters are available only for Pay Later

| Parameter                           | Required  | Description                                        |
|-------------------------------------|-----------|----------------------------------------------------|
| <code class="highlighter-rouge">paymentCode</code> | Yes      | [See here](/resources/paylater) for the codes|
| <code class="highlighter-rouge">paymentOption</code> | Yes    | <b>'paylater'</b> for Pay Later     |
 

### Paypal
For paying through Paypal you just need to set the `paymentOption` as `paypal`. 

```html
  <form>
   ...
   <input name="paymentOption" value="paypal"/>
  </form>
```

# Step 2: Checksum Generation
Every request to Cashfree must contain authentication information to establish the identity of the user making the request. We use a digital signature (aka a digital thumbprint) to validate each transaction. A digital signature helps us in verifying the originator of the message and also ensures integrity of the signed data against tampering. 

Technically, the signature is generated as the HMAC value of the data being passed which is using SHA256 hash function in combination with merchant’s API secret key.

 We will generate a signature at our end and expect you to do the same with the posted data and match it with the passed argument.

<aside class="notice">You can find your <b>appId</b> and <b>secret key</b> from the merchant dashboard <a href="https://merchant.cashfree.com/merchant/pg#api-key">linked here </a></aside>

<aside class='warning'>
Checksum generation varies across integration methods, please verify if you are using the right signature generation method. </aside>

#BEGIN_CODE

```php

$postData = array( 
  "appId" => $appId, 
  "orderId" = > $orderId, 
  "orderAmount" => $orderAmount, 
  "orderCurrency" => $orderCurrency, 
  "orderNote" => $orderNote, 
  "customerName" => $customerName, 
  "customerPhone" => $customerPhone, 
  "customerEmail" => $customerEmail,
  "returnUrl" => $returnUrl, 
  "notifyUrl" => $notifyUrl,
  "paymentOption" => "nb",
  "paymentCode" => "3333"
);
 // get secret key from your config
 ksort($postData);
 $signatureData = "";
 foreach ($postData as $key => $value){
      $signatureData .= $key.$value;
 }
 $signature = hash_hmac('sha256', $signatureData, $secretKey,true);
 $signature = base64_encode($signature);

```

```python
import hashlib
import hmac
import base64

postData = {
  "appId" : appId, 
  "orderId" : orderId, 
  "orderAmount" : orderAmount, 
  "orderCurrency" : orderCurrency, 
  "orderNote" : orderNote, 
  "customerName" : customerName, 
  "customerPhone" : customerPhone, 
  "customerEmail" : customerEmail, 
  "returnUrl" : returnUrl, 
  "notifyUrl" : notifyUrl,
  "paymentOption" : "nb",
  "paymentCode" : "3333"
}

sortedKeys = sorted(postData)
signatureData = ""
for key in sortedKeys:
  signatureData += key+postData[key];

message = bytes(signatureData).encode('utf-8')
#get secret key from your config
secret = bytes(secretKey).encode('utf-8')
signature = base64.b64encode(hmac.new(secret, message,digestmod=hashlib.sha256).digest())

```

```java 

Map<String, String> postData = new HashMap<String, String>();

postData.put("appId", appId);
postData.put("orderId", ORDERID);
postData.put("orderAmount", ORDERAMOUNT);
postData.put("orderCurrency", ORDER_CURRENCY);
postData.put("orderNote", ORDERNOTE);
postData.put("customerName", CUSTOMER_NAME);
postData.put("customerEmail", CUSTOMER_EMAIL);
postData.put("customerPhone", CUSTOMER_PHONE);
postData.put("returnUrl",RETURN_URL);
postData.put("notifyUrl", NOTIFY_URL);
postData.put("paymentOption", "nb");
postData.put("paymentCode", "3333");

String data = "";
SortedSet<String> keys = new TreeSet<String>(postData.keySet());

for (String key : keys) {
    data = data + key + postData.get(key);
}

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
        
      SortedDictionary<string, string> formParams = new SortedDictionary<string, string>();
      formParams.Add("appId", "<your_app_id>");
      formParams.Add("orderId", "FEX101");
      formParams.Add("orderAmount", "10.00");
      formParams.Add("orderCurrency", "INR");
      formParams.Add("orderNote", "Test payment");
      formParams.Add("customerName", "Customer Name");
      formParams.Add("customerPhone", "9900000085");
      formParams.Add("customerEmail", "test@cashfree.com");
      formParams.Add("returnUrl", "http://example.com");
      formParams.Add("notifyUrl", "http://example.com");
      formParams.Add("paymentOption", "nb");
      formParams.Add("paymentCode", "3333");

      foreach (var kvp in formParams) {
        data = data + kvp.Key + kvp.Value;
      }

      Program n = new Program();
      string signature = n.CreateToken(data, secret);
      Console.WriteLine(signature);
    }
  }
}

```

#END_CODE

Once you have collected this information you need to prepare and send this to Cashfree.

# Submitting Payment
Once you submit these details we will process the payment on your behalf. The payment processing status could be one of the [following](/resources/responsestatus).

# Test Card 
The TEST mode is to check the flow of the transaction. Make sure you always use the TEST appId and secret key only while working on TEST mode.

You will have to use [these](/resources/testdata) cards while making the payment.


# Response Parameters

CashFree will post details about every transaction to both the `returnUrl` and the `notifyUrl`. These parameters will be posted to the services you host on these urls. You should use these details accordingly. 

| Parameter                                  | Description                                      |
|-------------------------------------|------------------------------------------------------------|
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">orderId</span></code>  | Order id for which transaction has been processed. Ex: GZ-212  |
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">orderAmount</span></code> | Amount of the order. Ex: 256.00      |
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">referenceId</span></code>      | Cashfree generated unique transaction Id. Ex: 140388038803                                |
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">txStatus</span></code>   | Payment status for that order. Values can be : SUCCESS, FLAGGED, PENDING, FAILED, CANCELLED. More [here](/resources/responsestatus)   |
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">paymentMode</span></code>   | Payment mode used by customer to make the payment. Ex: DEBIT_CARD, MobiKwik, etc     |
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">txMsg</span></code>   | Message related to the transaction. Will have the reason, if payment failed     |
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">txTime</span></code>  | Time of the transaction    |
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">signature</span></code>  | Response signature, see [more](#response-verification)  |

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
iimport hashlib
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

