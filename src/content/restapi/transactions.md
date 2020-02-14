---
title: REST API Guide | Cashfree
permalink: /restapi/transactions
layout: guide
platform: rest
display_platform: REST
subtitle: Transactions
sortOrder: 3
---

# Fetch Transactions

To fetch all the transactions processed on your Cashfree Account

#BEGIN_CODE

```bash

  curl --request POST \
  --url https://test.cashfree.com/api/v1/transactions \
  --header 'cache-control: no-cache' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data 'appId=${APPLICATION_ID}&secretKey=${SECRET_KEY}&startDate=2018-01-01&endDate=2018-01-11&txStatus=SUCCESS&lastId=&count='


```

```php
$curl = curl_init();

    curl_setopt_array($curl, array(
    CURLOPT_URL => "https://test.cashfree.com/api/v1/transactions",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "POST",
    CURLOPT_POSTFIELDS => "appId=${APPLICATION_ID}&secretKey=${SECRET_KEY}&startDate=2018-01-01&endDate=2018-01-11&txStatus=SUCCESS&lastId=&count=",
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

## Transactions Request Parameters

| Parameter                                 | Required | Description                                      |
|-------------------------------------|-----------|----------------------------------------------------|
| <code class="highlighter-rouge">appId</code>            | Yes      | Your app id      |
| <code class="highlighter-rouge">secretKey</code>            | Yes      | Your Secret Key      |
| <code class="highlighter-rouge">startDate</code> | Yes       | Date(in the format of YYYY-MM-DD), from which you want the data  |
| <code class="highlighter-rouge">endDate</code> | Yes       | Date till you want the data (this date is included)      |
| <code class="highlighter-rouge">txStatus</code>            | No       | Filter the transactions as per the status. Valid status values are SUCCESS, FAILED, PENDING, FLAGGED and CANCELLED                                |
| <code class="highlighter-rouge">lastId</code> | Yes    | Use it for paginated response. Transactions having id greater than this value will be returned     |
| <code class="highlighter-rouge">count</code> | Yes    | Number of transactions you want to receive. Default is 20 and max is 50.     |

## Transactions Response Parameters

| Parameter                                 | Description                                      |
|-------------------------------------|---------------------------------|
| <code class="highlighter-rouge">status</code>        | Status of API call. Values are - OK and ERROR  |
| <code class="highlighter-rouge">settlements</code>        | List of transaction      |
| <code class="highlighter-rouge">message</code>        |  response message (will have the reason when status is sent as ERROR)                        |
| <code class="highlighter-rouge">lastId</code>        |  ID of the last transaction returned. Use it in your next request if current one didn't return all the transactions                        |
| <code class="highlighter-rouge">transactions</code>        |  An array of transactions (see table below)             |

## Transactions Array

| Parameter                                 | Description                                      |
|-------------------------------------|-------------------------------------------------------------|
| <code class="highlighter-rouge">id</code>        | id of the entry  |
| <code class="highlighter-rouge">orderId</code>        | merchant order id that is passed during payment request      |
| <code class="highlighter-rouge">orderAmount</code>        |  Order Amount                        |
| <code class="highlighter-rouge">orderNote</code>        |  Order Note                        |
| <code class="highlighter-rouge">customerName</code>        |  Customer Name                        |
| <code class="highlighter-rouge">customerPhone</code>        |  Customer Phone                     |
| <code class="highlighter-rouge">customerEmail</code>        |  Customer Email       |
| <code class="highlighter-rouge">referenceId</code>        |  Transaction Reference Id       |
| <code class="highlighter-rouge">txAmount</code>        |  Transaction Amount       |
| <code class="highlighter-rouge">txStatus</code>        |  Transaction Status       |
| <code class="highlighter-rouge">txTime</code>        |  Transaction Time       |
| <code class="highlighter-rouge">settlementStatus</code>        |  Settlement Status       |
| <code class="highlighter-rouge">refundStatus</code>        |  Refund Status       |
