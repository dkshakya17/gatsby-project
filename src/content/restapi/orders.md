---
title: REST API Guide | Cashfree
permalink: /restapi/orders
layout: guide
platform: rest
display_platform: REST
subtitle: Orders
sortOrder: 2
---


#Create Orders

To create a new order on Cashfree, send a POST request to the class URL containing the contents of the order. For example, to create the order from sample code below:

#BEGIN_CODE

```bash

  curl -X POST \
  https://test.cashfree.com/api/v1/order/create \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/x-www-form-urlencoded' \
  -d 'appId=curl -X POST \
  https://test.cashfree.com/api/v1/order/create \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/x-www-form-urlencoded' \
  -d 'appId=${APPLICATION_ID}&secretKey=${SECRET_KEY}&orderId=xBasilxTestx1&orderAmount=154&orderNote=Subscription&customerName=Test%20Name&customerPhone=9111122222&customerEmail=basil%40cashfree.com&sellerPhone=&returnUrl=https%3A%2F%2Fexample.com%2Freturn&notifyUrl=https%3A%2F%2Fexample.com%2Fnotify&paymentModes=&pc='

```


```php
$apiEndpoint = "https://test.cashfree.com";
   $opUrl = $apiEndpoint."/api/v1/order/create";
  
   $cf_request = array();
   $cf_request["appId"] = "${APPLICATION_ID}";
   $cf_request["secretKey"] = "${SECRET_KEY}";
   $cf_request["orderId"] = "ORDER-104"; 
   $cf_request["orderAmount"] = 100;
   $cf_request["orderNote"] = "Subscription";
   $cf_request["customerPhone"] = "9000012345";
   $cf_request["customerName"] = "Test Name";
   $cf_request["customerEmail"] = "test@cashfree.com";
   $cf_request["returnUrl"] = "RETURNURL";
   $cf_request["notifyUrl"] = "NOTIFYURL";

   $timeout = 10;
   
   $request_string = "";
   foreach($cf_request as $key=>$value) {
     $request_string .= $key.'='.rawurlencode($value).'&';
   }
   
   $ch = curl_init();
   curl_setopt($ch, CURLOPT_URL,"$opUrl?");
   curl_setopt($ch,CURLOPT_POST, count($cf_request));
   curl_setopt($ch,CURLOPT_POSTFIELDS, $request_string);
   curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
   curl_setopt($ch, CURLOPT_TIMEOUT, $timeout);
   $curl_result=curl_exec ($ch);
   curl_close ($ch);

   $jsonResponse = json_decode($curl_result);
   if ($jsonResponse->{'status'} == "OK") {
     $paymentLink = $jsonResponse->{"paymentLink"};
     //Send this payment link to customer over email/SMS OR redirect to this link on browser
   } else {
    //Log request, $jsonResponse["reason"]
   } 
```

#END_CODE



## Request Parameters

| Parameter                                 | Required | Description                                      |
|-------------------------------------|-----------|----------------------------------------------------|
| <code class="highlighter-rouge">appId</code>            | Yes      | Your app id      |
| <code class="highlighter-rouge">secretKey</code>            | Yes      | Your Secret Key      |
| <code class="highlighter-rouge">orderId</code> | Yes       | Order/Invoice Id  |
| <code class="highlighter-rouge">orderAmount</code> | Yes       | Bill amount of the order      |
| <code class="highlighter-rouge">orderCurrency</code>            | No      | Currency for the order. INR if left empty. See the Currency Codes below for a list of available currencies. Please contact care@cashfree.com to enable new currencies       |
| <code class="highlighter-rouge">orderNote</code>            | No       | A help text to make customers know more about the order                                |
| <code class="highlighter-rouge">customerName</code> | Yes    | Name of the customer     |
| <code class="highlighter-rouge">customerPhone</code> | Yes    | Phone number of customer     |
| <code class="highlighter-rouge">customerEmail</code> | Yes    | Email id of the customer     |
| <code class="highlighter-rouge">sellerPhone</code> | No    | Notification phone number, which will get notified when payment for the order succeeds. Use it to accept COD payments     |
| <code class="highlighter-rouge">returnUrl</code> | Yes    | Return URL to which user will be redirected after the payment (max-len 500)     |
| <code class="highlighter-rouge">notifyUrl</code> | No    | Notification URL for server-server communication. Useful when user’s connection drops while re-directing (max-len 500) <br/> <b>notifyUrl should be an https URL</b>   |
| <code class="highlighter-rouge">paymentModes</code> | No    | Allowed payment modes for this order. Available values: cc, dc, nb, upi, paypal, wallet.      |



## Response Parameters

| Parameter                                 | Description                                      |
|-------------------------------------|--------------------------|
| <code class="highlighter-rouge">status</code>        | Status of API call. Values are - OK and ERROR  |
| <code class="highlighter-rouge">paymentLink</code>        | link of payment page for that order. Returned when status is OK      |
| <code class="highlighter-rouge">reason</code>                 | reason of failure when status is ERROR                                |


# Get Link

Returns payment link for an existing order. Further, you can send it the customer via email or sms. For example, to get the order link refer the sample code below:

#BEGIN_CODE

```bash
  curl -X POST \
  https://test.cashfree.com/api/v1/order/info/link \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/x-www-form-urlencoded' \
  -d 'appId=${APPLICATION_ID}&secretKey=${SECRET_KEY}&orderId=Testx1'
```

```php
$curl = curl_init();
    curl_setopt_array($curl, array(
    CURLOPT_URL => "https://test.cashfree.com/api/v1/order/info/link",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "POST",
    CURLOPT_POSTFIELDS => "appId=${APPLICATION_ID}&secretKey=${SECRET_KEY}&orderId=Testx1",
    CURLOPT_HTTPHEADER => array(
        "cache-control: no-cache",
        "content-type: application/x-www-form-urlencoded"
    ),
    ));

    $response = curl_exec($curl);
    $err = curl_error($curl);

    curl_close($curl);

    if ($err) {
    echo "cURL Error #:" . $err;
    } else {
    echo $response;
    } 

```
#END_CODE

<br>

## Request Parameters

| Parameter                                 | Required | Description                                      |
|-------------------------------------|-----------|----------------------------------------------------|
| <code class="highlighter-rouge">appId</code>            | Yes      | Your app id      |
| <code class="highlighter-rouge">secretKey</code>            | Yes      | Your Secret Key      |
| <code class="highlighter-rouge">orderId</code> | Yes       | Order/Invoice Id  |


## Response Parameters

| Parameter                                 | Description                                      |
|-------------------------------------|-------------------------------------------------------------|
| <code class="highlighter-rouge">status</code>        | status of API call. Values are - OK and ERROR  |
| <code class="highlighter-rouge">paymentLink</code>        | returns payment link for that order when the status is OK      |
| <code class="highlighter-rouge">reason</code>                 | returns failure reason when status is ERROR                                |


#Get Details

Returns all the details for an order(not transaction)


#BEGIN_CODE

```bash

  curl --request POST \
  --url https://test.cashfree.com/api/v1/order/info/ \
  --header 'cache-control: no-cache' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data 'appId=${APPLICATION_ID}&secretKey=${SECRET_KEY}&orderId=Testx1'
```

```php
$curl = curl_init();
    curl_setopt_array($curl, array(
    CURLOPT_URL => "https://test.cashfree.com/api/v1/order/info/",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "POST",
    CURLOPT_POSTFIELDS => "appId=${APPLICATION_ID}&secretKey=${SECRET_KEY}&orderId=Testx1",
    CURLOPT_HTTPHEADER => array(
        "cache-control: no-cache",
        "content-type: application/x-www-form-urlencoded"
    ),
    ));

    $response = curl_exec($curl);
    $err = curl_error($curl);

    curl_close($curl);

    if ($err) {
    echo "cURL Error #:" . $err;
    } else {
    echo $response;
    } 

```
#END_CODE

<br>

## Request Parameters

| Parameter                                 | Required | Description                                      |
|-------------------------------------|-----------|----------------------------------------------------|
| <code class="highlighter-rouge">appId</code>            | Yes      | Your app id      |
| <code class="highlighter-rouge">secretKey</code>            | Yes      | Your Secret Key      |
| <code class="highlighter-rouge">orderId</code> | Yes       | Order/Invoice Id  |

## Response Parameters

| Parameter                                 | Description                                      |
|-------------------------------------|----------------------------------|
| <code class="highlighter-rouge">status</code>        | Status of API call. Values are - OK and ERROR  |
| <code class="highlighter-rouge">details.orderId</code>        | Merchant generated order Id for the order |
| <code class="highlighter-rouge">details.orderAmount</code>                 | Total Amount to be paid for this order |
| <code class="highlighter-rouge">details.orderNote</code>                 | A brief associated with order |
| <code class="highlighter-rouge">details.customerName</code>                 | Name of the payee |
| <code class="highlighter-rouge">details.customerPhone</code>                 | Phone number of the payee|
| <code class="highlighter-rouge">details.orderStatus</code>                 | The status of the order payment. Either "ACTIVE" or "PAID"|
| <code class="highlighter-rouge">details.addedOn</code>                 | The time of creation of order|


#Get Status

Returns payment status of an existing order. This can also be used to query order status at any point of time.


#BEGIN_CODE

```bash

  curl --request POST \
  --url https://test.cashfree.com/api/v1/order/info/status \
  --header 'cache-control: no-cache' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data 'appId=${APPLICATION_ID}&secretKey=${SECRET_KEY}&orderId=Testx1'
```

```php
..
    $curl = curl_init();
    curl_setopt_array($curl, array(
    CURLOPT_URL => "https://test.cashfree.com/api/v1/order/info/status",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "POST",
    CURLOPT_POSTFIELDS => "appId=${APPLICATION_ID}&secretKey=${SECRET_KEY}&orderId=Testx1",
    CURLOPT_HTTPHEADER => array(
        "cache-control: no-cache",
        "content-type: application/x-www-form-urlencoded"
    ),
    ));

    $response = curl_exec($curl);
    $err = curl_error($curl);

    curl_close($curl);

    if ($err) {
    echo "cURL Error #:" . $err;
    } else {
    echo $response;
    }  
..
```
#END_CODE
<br>

## Request Parameters

| Parameter                                 | Required | Description                                      |
|-------------------------------------|-----------|----------------------------------------------------|
| <code class="highlighter-rouge">appId</code>            | Yes      | Your app id      |
| <code class="highlighter-rouge">secretKey</code>            | Yes      | Your Secret Key      |
| <code class="highlighter-rouge">orderId</code> | Yes       | Order/Invoice Id  |

## Response Parameters

| Parameter                                 | Description                                      |
|-------------------------------------|------------------------------|
| <code class="highlighter-rouge">status</code>        | Status of API call. Values are - OK and ERROR  |
| <code class="highlighter-rouge">paymentLink</code>        | link of payment page for that order. Returned when status is OK      |
| <code class="highlighter-rouge">reason</code>                 | reason of failure when status is ERROR                                |
| <code class="highlighter-rouge">txStatus</code>                 | transaction status, if a payment has been attempted             |
| <code class="highlighter-rouge">txTime</code>                 | transaction time, if payment has been attempted             |
| <code class="highlighter-rouge">txMsg</code>                 | transaction message, if payment has been attempted             |
| <code class="highlighter-rouge">referenceId</code>                 | transaction reference id, if payment has been attempted       |
| <code class="highlighter-rouge">paymentMode</code>                 | payment mode of transaction, if payment has been attempted       |
| <code class="highlighter-rouge">orderCurrency</code>                 | currency of the order       |
| <code class="highlighter-rouge">paymentDetails.paymentMode</code>                 | payment mode of transaction, if payment has been attempted       |
| <code class="highlighter-rouge">paymentDetails.bankName</code>                 | Name of the bank if payment has been attempted (only in case of Netbanking)      |
| <code class="highlighter-rouge">paymentDetails.cardNumber</code>                 | Masked card number if payment has been attempted (only in case of Debit & Credit Cards)      |
| <code class="highlighter-rouge">paymentDetails.cardCountry</code>                 | Country code of the card if payment has been attempted (only in case of Debit & Credit Cards)      |
| <code class="highlighter-rouge">paymentDetails.cardScheme</code>                 | Scheme of the card (eg: VISA) if payment has been attempted (only in case of Debit & Credit Cards)      |

## Status Response

- If No payment is attempted against an order, then the status of the order will be <b>ACTIVE</b> :

```json
{
    "orderStatus": "ACTIVE",
    "status": "OK"
}
```


- <code>txStatus</code> would be CANCELLED in the response if a user lands on the payment page and clicks on 'back to merchant' instead of selecting a payment mode and proceeding with the transaction.

- <code>paymentDetails</code> are only available for Netbanking and Credit/Debit Cards.


```json
{
    "orderStatus": "ACTIVE",
    "txStatus": "PENDING",
    "txTime": "2018-03-29 15:33:42",
    "txMsg": null,
    "referenceId": "2610",
    "paymentMode": "NET_BANKING",
    "orderCurrency": "INR",
    "paymentDetails": {
        "paymentMode": "NET_BANKING",
        "bankName": "Yes Bank Ltd"
    },
    "status": "OK"
}
```

- Response for a succesful payment made against an order :

```json
{
    "orderStatus": "PAID",
    "txStatus": "SUCCESS",
    "txTime": "2017-05-08 20:35:11",
    "txMsg": "transaction successful",
    "referenceId": "2602",
    "paymentMode": "AIRTEL_MONEY",
    "orderCurrency": "INR",
    "status": "OK"
}
```

- Order status when a transaction gets FLAGGED and then goes to SUCCESS /CANCELLED :

```json
{
     "orderStatus": "PROCESSED",
    "txStatus": "FLAGGED" // This will get updated based on whether transaction was approved (SUCCESS) or rejected (CANCELLED)
    "txTime": "2017-05-08 20:35:11",
    "txMsg": "Transaction successful",
    "referenceId": "2603",
    "paymentMode": "CREDIT_CARD",
    "orderCurrency": "INR",
    "paymentDetails": {
        "paymentMode": "CREDIT_CARD",
        "cardNumber": "3400XXXXX0009",
        "cardCountry": "IN",
        "cardScheme": "AMEX"
    },
    "status": "OK"
}
```

# Trigger Payment Email

Returns message stating if the payment successful email was delivered or not

```bash

  curl --request POST \
  --url https://test.cashfree.com/api/v1/order/email \
  --header 'cache-control: no-cache' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data 'appId=${APPLICATION_ID}&secretKey=${SECRET_KEY}&orderId=Testx1'
```

```php
..
    $curl = curl_init();
    curl_setopt_array($curl, array(
    CURLOPT_URL => "https://test.cashfree.com/api/v1/order/email",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "POST",
    CURLOPT_POSTFIELDS => "appId=${APPLICATION_ID}&secretKey=${SECRET_KEY}&orderId=Testx1",
    CURLOPT_HTTPHEADER => array(
    "cache-control: no-cache",
    "content-type: application/x-www-form-urlencoded",
    "postman-token: 5b4a0cff-1e77-115e-c7be-a46387687913"
    ),
    ));

    $response = curl_exec($curl);
    $err = curl_error($curl);

    curl_close($curl);

    if ($err) {
    echo "cURL Error #:" . $err;
    } else {
    echo $response;
    }  
..
```

<br>

## Request Parameters

| Parameter                                 | Required | Description                                      |
|-------------------------------------|-----------|----------------------------------------------------|
| <code class="highlighter-rouge">appId</code>            | Yes      | Your app id      |
| <code class="highlighter-rouge">secretKey</code>            | Yes      | Your Secret Key      |
| <code class="highlighter-rouge">orderId</code> | Yes       | Order/Invoice Id  |

## Response Parameters

| Parameter                                 | Description                                      |
|-------------------------------------|---------------------------|
| <code class="highlighter-rouge">status</code>        | Status of API call. Values are - OK and ERROR  |
| <code class="highlighter-rouge">message</code>        | Message saying if the email was delivered or not.      |
| <code class="highlighter-rouge">reason</code>                 | reason of failure when status is ERROR                                |
