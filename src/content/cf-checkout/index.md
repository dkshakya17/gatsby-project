---
title: API Reference
permalink: /cf-checkout
layout: guide
platform: cf-checkout
display_platform: CF-CHECKOUT
subtitle: Checkout Form
sortOrder: 1
---


# Getting Started

Checkout Form is the simplest way to integrate Cashfree Payment Gateway in your website. In this mode, you prepare the checkout form with order and customer details and redirect the user from your checkout page to cashfree payment page. Your customer will enter the card/bank details on our page and we take care of PCI compliance on your behalf. Integrating checkout form on your website requires as little as you sending us the checkout details with the correct data. 



# Checkout Form

In this method, you will prepare the checkout form with order and customer details and redirect the user to cashfree payment page. Your customer will enter the card/bank details on our page and we take care of PCI compliance on your behalf. Integrating Checkout Form on your website requires as little as you sending us the Checkout details with the correct data.

# Step 1: Creating checkout form

Ideally your customers will be making a transaction for a particular order. To identify this particular order in your system you will have to use an identifier aka `orderId`. 
As your payments are processed by Cashfree you'll need to send us the `orderId` and the corresponding `orderAmount`. In return after the payment is completed we will inform you about the status of the payment corresponding to this `orderId`.

There are some additional details also which you need to send to us for processing a payment. You can take a look at all the request parameters  [here](#request-parameters).

<aside class="warning"> Every request to Cashfree must contain authentication information to establish the identity of the user making the request, we use the <code>signature</code> field for this authentication. See below code on how to generate a valid signature for Checkout integration.</aside>

This integration requires you to create a sample html form like below. 
Always ensure to fill in the correct credentials for `appId` and `secret key`.

<aside class="notice">You can find your <b>appId</b> and <b>secret key</b> from the merchant dashboard <a href="https://merchant.cashfree.com/merchant/pg#api-key">linked here </a></aside>

<copybox>

  For production/live usage set the action attribute of the form to:
   `https://www.cashfree.com/checkout/post/submit`

  For testing set the action attribute to:
   `https://test.cashfree.com/billpay/checkout/post/submit`

</copybox>

```html
  <form id="redirectForm" method="post" action="https://test.cashfree.com/billpay/checkout/post/submit">
    <input type="hidden" name="appId" value="<YOUR_APPID_HERE>"/>
    <input type="hidden" name="orderId" value="order00001"/>
    <input type="hidden" name="orderAmount" value="100"/>
    <input type="hidden" name="orderCurrency" value="INR"/>
    <input type="hidden" name="orderNote" value="test"/>
    <input type="hidden" name="customerName" value="John Doe"/>
    <input type="hidden" name="customerEmail" value="Johndoe@test.com"/>
    <input type="hidden" name="customerPhone" value="9999999999"/>
    <input type="hidden" name="returnUrl" value="<RETURN_URL>"/>
    <input type="hidden" name="notifyUrl" value="<NOTIFY_URL>"/>
    <input type="hidden" name="signature" value="<GENERATED_SIGNATURE>"/>
  </form>
```




# Step 2: Checksum Generation
Every request to Cashfree must contain authentication information to establish the identity of the user making the request. We use a <b>digital signature</b> (aka a digital thumbprint) to validate each transaction. A digital signature helps us in verifying the originator of the message and also ensures integrity of the signed data against tampering.

In the sample form above you need to generate a <b>signature</b> for every checkout. Technically, the signature is generated as the HMAC value of the data being passed which is using SHA256 hash function in combination with your secret key. 

We will generate a signature at our end and expect you to do the same with the posted data and match it with the passed argument.

<aside class="warning">Checksum generation varies across integration methods, please verify if you are using the right signature generation method.</aside>


#BEGIN_CODE
```php
$secretKey = "secret_key";
  $postData = array(
  "appId" => $appId,
  "orderId" => $orderId,
  "orderAmount" => $orderAmount,
  "orderCurrency" => $orderCurrency,
  "orderNote" => $orderNote,
  "customerName" => $customerName,
  "customerPhone" => $customerPhone,
  "customerEmail" => $customerEmail,
  "returnUrl" => $returnUrl,
  "notifyUrl" => $notifyUrl,
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
  "notifyUrl" : notifyUrl
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

# Step 3: Submitting form

Once you have the above form prepared you can either submit the form manually, paste the below html just before the closing `</form>` tag. By default all the fields in the above html form are hidden, you can make them visible by removing the `type="hidden"` text from every input field.

`<input type="submit" value="Pay">`
<aside class="warning">
  Don't add <b>name</b> parameter to the html submit button.
</aside>


Alternatively, you can also prepare the above form and submit it automatically on page load without waiting for user's click - paste the below javascript code just before the closing `</body>` tag.

`<script>document.getElementById("redirectForm").submit();</script>`

# Test Card
The TEST mode is to check the flow of the transaction. Make sure you always use the TEST appId and secret key only while working on TEST mode.

You will have to use [these](/resources/testdata) cards while making the payment.



# Webhook Notification

We send a notification from our backend to your backend whenever an order is successful. This is useful in cases where the user internet connection breaks after payment. This will allow you to reconcile all the successful orders on your end. The notification will be sent to <b>notifyUrl</b> which is a part of request parameter specified while creating an order request.


Please make a note of the following:
<ul>
  <li>Notification can take upto one minute to hit your server after payment.</li>
  <li>Notifications are sent only in the case of successful payments. Incase of failed or pending payments your backend will not receive any notification.</li>
  <li>It might happen that you can receive a notification more than once. It is recommended to rely on the first notification for reconciliation and silently ignore any subsequent notifications.</li>
</ul>



# Request Parameters

Checkout form accepts the below mentioned request parameters. Make sure you send us all the required fields. 

<aside class="warning">
<b>Note:</b> Requests with an invalid `signature` will be rejected. </aside>

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
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">returnUrl</span></code> | Yes    | Return URL to which user will be redirected after the payment     |
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">notifyUrl</span></code> | No    | Notification URL is for server-server communication. Receives a notification for every successful order. <b>notifyUrl must be an https URL</b>    |
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">paymentModes</span></code> | No    | Allowed payment modes for the order. Available values: cc, dc, nb, upi, paypal, wallet.  Example values: "cc", "cc,dc", "paypal,nb" etc.   |
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">signature</span></code>            | Yes      | request signature. More [here](#step-2:-checksum-generation)      |


# Response parameters

CashFree will post details about every transaction to both the `returnUrl` and the `notifyUrl`. These parameters will be posted to the services you host on these urls. You should use these details accordingly. 

The `returnUrl` is the webpage where your customer will be redirected to post payment on Cashfree, we will post the response parameters to this page.

Cashfree also posts form variables to `notifyUrl` you specify that runs a program to process these variables. </br>
See below the response parameters which Cashfree will post to these URLs.

| Parameter                                  | Description                                      |
|-------------------------------------|-----------------------------------------------------------|
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">orderId</span></code>  | Order id for which transaction has been processed. Ex: GZ-212  |
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">orderAmount</span></code> | Amount of the order. Ex: 256.00      |
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">referenceId</span></code>      | Cashfree generated unique transaction Id. Ex: 140388038803                                |
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">txStatus</span></code>   | Payment status for that order. Values can be : SUCCESS, FLAGGED, PENDING, FAILED, CANCELLED. Refer [here](/resources/responsestatus#response-status)    |
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">paymentMode</span></code>   | Payment mode used by customer to make the payment. Ex: DEBIT_CARD, MobiKwik, etc [See](/resources/payment-modes)    |
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">txMsg</span></code>   | Message related to the transaction. Will have the reason, if payment failed     |
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">txTime</span></code>  | Time of the transaction    |
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">signature</span></code>  | Response signature, more [here.](#response-verification) It is mandatory to verify the signature.  |


# Response Verification
Similar to every request checksum, we also send a digital signature in our response message. We strongly recommend you to verify this response signature at your end. This will ensure the response is not tampered.

<aside class='warning'> Verify the response signature to check the authenticity of transaction response. Don't forget to follow the steps mentioned below </aside>

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
<!-- # Authentication

> To authorize, use this code:

```ruby
require 'kittn'

api = Kittn::APIClient.authorize!('meowmeowmeow')
```

```python
import kittn

api = kittn.authorize('meowmeowmeow')
```

```bash
# With shell, you can just pass the correct header with each request
curl "api_endpoint_here"
  -H "Authorization: meowmeowmeow"
```

```javascript
const kittn = require('kittn');

let api = kittn.authorize('meowmeowmeow');
```

> Make sure to replace `meowmeowmeow` with your API key.

Kittn uses API keys to allow access to the API. You can register a new Kittn API key at our [developer portal](http://example.com/developers).

Kittn expects for the API key to be included in all API requests to the server in a header that looks like the following:

`Authorization: meowmeowmeow`

<aside class="notice">
You must replace <code>meowmeowmeow</code> with your personal API key.
</aside>

# Kittens

## Get All Kittens

```ruby
require 'kittn'

api = Kittn::APIClient.authorize!('meowmeowmeow')
api.kittens.get
```

```python
import kittn

api = kittn.authorize('meowmeowmeow')
api.kittens.get()
```

```bash
curl "http://example.com/api/kittens"
  -H "Authorization: meowmeowmeow"
```

```javascript
const kittn = require('kittn');

let api = kittn.authorize('meowmeowmeow');
let kittens = api.kittens.get();
```

> The above command returns JSON structured like this:

```json
[
  {
    "id": 1,
    "name": "Fluffums",
    "breed": "calico",
    "fluffiness": 6,
    "cuteness": 7
  },
  {
    "id": 2,
    "name": "Max",
    "breed": "unknown",
    "fluffiness": 5,
    "cuteness": 10
  }
]
```

This endpoint retrieves all kittens.

### HTTP Request

`GET http://example.com/api/kittens`

### Query Parameters

Parameter | Default | Description
--------- | ------- | -----------
include_cats | false | If set to true, the result will also include cats.
available | true | If set to false, the result will include kittens that have already been adopted.

<aside class="success">
Remember — a happy kitten is an authenticated kitten!
</aside>

## Get a Specific Kitten

```ruby
require 'kittn'

api = Kittn::APIClient.authorize!('meowmeowmeow')
api.kittens.get(2)
```

```python
import kittn

api = kittn.authorize('meowmeowmeow')
api.kittens.get(2)
```

```bash
curl "http://example.com/api/kittens/2"
  -H "Authorization: meowmeowmeow"
```

```javascript
const kittn = require('kittn');

let api = kittn.authorize('meowmeowmeow');
let max = api.kittens.get(2);
```

> The above command returns JSON structured like this:

```json
{
  "id": 2,
  "name": "Max",
  "breed": "unknown",
  "fluffiness": 5,
  "cuteness": 10
}
```

This endpoint retrieves a specific kitten.

<aside class="warning">Inside HTML code blocks like this one, you can't use Markdown, so use <code>&lt;code&gt;</code> blocks to denote code.</aside>

### HTTP Request

`GET http://example.com/kittens/<ID>`

### URL Parameters

Parameter | Description
--------- | -----------
ID | The ID of the kitten to retrieve

## Delete a Specific Kitten

```ruby
require 'kittn'

api = Kittn::APIClient.authorize!('meowmeowmeow')
api.kittens.delete(2)
```

```python
import kittn

api = kittn.authorize('meowmeowmeow')
api.kittens.delete(2)
```

```bash
curl "http://example.com/api/kittens/2"
  -X DELETE
  -H "Authorization: meowmeowmeow"
```

```javascript
const kittn = require('kittn');

let api = kittn.authorize('meowmeowmeow');
let max = api.kittens.delete(2);
```

> The above command returns JSON structured like this:

```json
{
  "id": 2,
  "deleted" : ":("
}
```

This endpoint deletes a specific kitten.

### HTTP Request

`DELETE http://example.com/kittens/<ID>`

### URL Parameters

Parameter | Description
--------- | -----------
ID | The ID of the kitten to delete -->
