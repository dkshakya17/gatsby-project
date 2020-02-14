---
title: REST API Guide | Cashfree
permalink: /restapi/refunds
layout: guide
platform: rest
display_platform: REST
subtitle: Refunds
sortOrder: 4
---


#Initiate Refund

To initiate refund for a transaction

#BEGIN_CODE

```bash
  curl --request POST \
  --url https://test.cashfree.com/api/v1/order/refund \
  --header 'cache-control: no-cache' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data 'appId=${APPLICATION_ID}&secretKey=${SECRET_KEY}&orderId=Testx1&referenceId=13307&refundAmount=102.00&refundNote=Sample%20Refund%20note'
```

```php
    $curl = curl_init();
    curl_setopt_array($curl, array(
    CURLOPT_URL => "https://test.cashfree.com/api/v1/order/refund",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "POST",
    CURLOPT_POSTFIELDS => "appId=${APPLICATION_ID}&secretKey=${SECRET_KEY}&orderId=Testx1&referenceId=13307&refundAmount=102.00&refundNote=Sample%20Refund%20note",
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

| Parameter                                               | Required | Description                                                                                                                                                          |
|---------------------------------------------------------|----------|---------------------------------|
| <code class="highlighter-rouge">appId</code>            | Yes      | Your app id                                                                                                                                                          |
| <code class="highlighter-rouge">secretKey</code>        | Yes      | Your Secret Key                                                                                                                                                      |
| <code class="highlighter-rouge">referenceId</code>      | Yes      | Cashfree reference Id                                                                                                                                                |
| <code class="highlighter-rouge">refundAmount</code>     | Yes      | Amount to be refunded. Should be lesser than equal to transaction amount                                                                                             |
| <code class="highlighter-rouge">refundNote</code>       | Yes      | A refund note for your reference (max length 90)                                                                                                                                   |
| <code class="highlighter-rouge">merchantRefundId</code> | No       | A merchant generated unique key to identify this refund. Will be auto generated if left blank (max length 35)                                                                       |
| <code class="highlighter-rouge">refundType</code>       | No       | Required for instant refunds. Value - INSTANT                                                                                                                                        |
| <code class="highlighter-rouge">mode</code>             | No       | Required for INSTANT refund and only if payment mode was netbanking. Can be BANK_TRANSFER or CASHGRAM. In case of other payment modes, refund will be made to source |
| <code class="highlighter-rouge">accountNo</code>        | No       | Account number to transfer refund amount. Required if mode is BANK_TRANSFER                                                                                          |
| <code class="highlighter-rouge">ifsc</code>             | No       | IFSC code. Required if mode is BANK_TRANSFER                                                                                                                         |

## Response Parameters

| Parameter                                      | Description                                 |
|------------------------------------------------|---------------------------------------------|
| <code class="highlighter-rouge">status</code>  | Status of API call. Values are - OK and ERROR          |
| <code class="highlighter-rouge">message</code> | Message saying if the transaction was refunded or not. |
| <code class="highlighter-rouge">reason</code>  | reason of failure when status is ERROR                 |

# Fetch All Refunds

To fetch refunds processed on your Cashfree Account. 

# BEGIN_CODE
```bash
  curl --request POST \
  --url https://test.cashfree.com/api/v1/refunds \
  --header 'cache-control: no-cache' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data 'appId=${APPLICATION_ID}&secretKey=${SECRET_KEY}&startDate=2018-01-01&endDate=2018-01-15&lastId=&count='
```

```php
    $curl = curl_init();
    curl_setopt_array($curl, array(
    CURLOPT_URL => "https://test.cashfree.com/api/v1/refunds",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "POST",
    CURLOPT_POSTFIELDS => "appId=${APPLICATION_ID}&secretKey=${SECRET_KEY}&startDate=2018-01-01&endDate=2018-01-15&lastId=&count=",
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

## Refund Request Parameters

| Parameter                                        | Required | Description   |
|----------------------------------------------|---------------------------|----------------------------------------------------|
| <code class="highlighter-rouge">appId</code>     | Yes      | Your app id                                                                               |
| <code class="highlighter-rouge">secretKey</code> | Yes      | Your Secret Key                                                                           |
| <code class="highlighter-rouge">startDate</code> | Yes      | Date(in the format of YYYY-MM-DD), from which you want the data.                          |
| <code class="highlighter-rouge">endDate</code>   | Yes      | Date till you want the data (this date is included).                                      |
| <code class="highlighter-rouge">lastId</code>    | No       | Use it for paginated response. Refunds having id greater than this value will be returned |
| <code class="highlighter-rouge">count</code>     | No       | Number of refunds you want to receive. Default is 20 and max is 50.                       |

## Refund Response Parameters

| Parameter                                          | Description                                                                                                        |
|-----------------------------------------------|-----------------------------------------------------------------|
| <code class="highlighter-rouge">status</code>      | Status of API call. Values are - OK and ERROR                                                                      |
| <code class="highlighter-rouge">settlements</code> | List of transaction                                                                                                |
| <code class="highlighter-rouge">message</code>     | response message (will have the reason when status is sent as ERROR)                                               |
| <code class="highlighter-rouge">lastId</code>      | ID of the last transaction returned. Use it in your next request if current one didn't return all the transactions |
| <code class="highlighter-rouge">refund</code>      | The details of the refund (see table below)                                                                        |

##Refund Array

| Parameter                                           | Description                                                        |
|-----------------------------------------------------|--------------------------------------------------------------------|
| <code class="highlighter-rouge">refundId</code>     | Id of the refund                                                   |
| <code class="highlighter-rouge">orderId</code>      | merchant order id that is passed during payment request            |
| <code class="highlighter-rouge">arn</code>          | Acquirer Reference number that was generated for this refund       |
| <code class="highlighter-rouge">referenceId</code>  | Cashfree reference id of the transaction                           |
| <code class="highlighter-rouge">txAmount</code>     | Transaction Amount                                                 |
| <code class="highlighter-rouge">refundAmount</code> | Amount supposed to be refunded                                     |
| <code class="highlighter-rouge">refundNote</code>   | Note provided during refund initiation                             |
| <code class="highlighter-rouge">processed</code>    | Refund processing status (Values will be YES or NO)                |
| <code class="highlighter-rouge">initiatedOn</code>  | DateTime of refund initiation                                      |
| <code class="highlighter-rouge">processedOn</code>  | DateTime of refund processing (Will be blank for unprocessed ones) |



# Fetch Single Refund

To fetch details of a single refund processed on your CashFree Account

# BEGIN_CODE

```bash

  curl --request POST \
  --url https://test.cashfree.com/api/v1/refundStatus/ \
  --header 'cache-control: no-cache' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data 'appId=${APPLICATION_ID}&secretKey=${SECRET_KEY}&refundId=123'

```

```php
$curl = curl_init();
    curl_setopt_array($curl, array(
    CURLOPT_URL => "https://test.cashfree.com/api/v1/refundStatus/",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "POST",
    CURLOPT_POSTFIELDS => "appId=${APPLICATION_ID}&secretKey=${SECRET_KEY}&refundId=123",
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


## Refund Request Parameters

| Parameter                                               | Required | Description                                                                                                                                                                                                                         |
|---------------------------------------------------------|----------|--------------|
| <code class="highlighter-rouge">appId</code>            | Yes      | Your app id                                                                                                                                                                                                                         |
| <code class="highlighter-rouge">secretKey</code>        | Yes      | Your Secret Key                                                                                                                                                                                                                     |
| <code class="highlighter-rouge">refundId</code>         | No       | Refund Id of the refund you want to fetch. Either refundId or merchantRefundId needs to be provided                                                                       |
| <code class="highlighter-rouge">merchantRefundId</code> | No       | Merchant generated id corresponding to the refund the details of which you want to fetch. Either refundId or merchantRefundId needs to be provided. If both are provided then refundId will have precedence |

## Refund Response Parameters

| Parameter                                      | Description                                                          |
|-----------------------------------------------|--------------------------------------------------------------------|
| <code class="highlighter-rouge">status</code>  | Status of API call. Values are - OK and ERROR                        |
| <code class="highlighter-rouge">message</code> | response message (will have the reason when status is sent as ERROR) |
| <code class="highlighter-rouge">refund</code>  | The details of the refund (see table below)                          |

## Refund Array

| Parameter                                           | Description                                                        |
|----------------------------------------------------|-------------------------------------------------------------------|
| <code class="highlighter-rouge">refundId</code>     | Id of the refund                                                   |
| <code class="highlighter-rouge">orderId</code>      | merchant order id that is passed during payment request            |
| <code class="highlighter-rouge">arn</code>          | Acquirer Reference number that was generated for this refund       |
| <code class="highlighter-rouge">referenceId</code>  | Cashfree reference id of the transaction                           |
| <code class="highlighter-rouge">txAmount</code>     | Transaction Amount                                                 |
| <code class="highlighter-rouge">refundAmount</code> | Amount supposed to be refunded                                     |
| <code class="highlighter-rouge">refundNote</code>   | Note provided during refund initiation                             |
| <code class="highlighter-rouge">processed</code>    | Refund processing status (Values will be YES or NO)                |
| <code class="highlighter-rouge">initiatedOn</code>  | DateTime of refund initiation                                      |
| <code class="highlighter-rouge">processedOn</code>  | DateTime of refund processing (Will be blank for unprocessed ones) |
