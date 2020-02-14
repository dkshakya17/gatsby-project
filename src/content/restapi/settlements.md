---
title: REST API Guide | Cashfree
permalink: /restapi/settlements
layout: guide
platform: rest
display_platform: REST
subtitle: Settlements
sortOrder: 6
---

# Fetch All Settlements

To fetch the details of all settlements processed on your Cashfree Account

#BEGIN_CODE
```bash
  curl --request POST \
  --url https://test.cashfree.com/api/v1/settlements \
  --header 'cache-control: no-cache' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data 'appId=${APPLICATION_ID}&secretKey=${SECRET_KEY}&startDate=2018-01-01&endDate=2018-01-15&lastId=&count='

```

```php
$curl = curl_init();

curl_setopt_array($curl, array(
CURLOPT_URL => "https://test.cashfree.com/api/v1/settlements",
CURLOPT_RETURNTRANSFER => true,
CURLOPT_ENCODING => "",
CURLOPT_MAXREDIRS => 10,
CURLOPT_TIMEOUT => 30,
CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
CURLOPT_CUSTOMREQUEST => "POST",
CURLOPT_POSTFIELDS => "appId=${APPLICATION_ID}&secretKey=${SECRET_KEY}&startDate=2018-01-01&endDate=2018-01-15&lastId=&count=",
CURLOPT_HTTPHEADER => array(
"cache-control: no-cache",
"content-type: application/x-www-form-urlencoded",
"postman-token: 20dbc7f5-dbb9-58d3-bc0a-afdcba7a60be"
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

## All Settlements Request Parameters

| Parameter                                 | Required | Description                                      |
|-------------------------------------|-----------|----------------------------------------------------|
| <code class="highlighter-rouge">appId</code>            | Yes      | Your app id      |
| <code class="highlighter-rouge">secretKey</code>            | Yes      | Your Secret Key      |
| <code class="highlighter-rouge">startDate</code> | Yes       | Date(in the format of YYYY-MM-DD), from which you want the data  |
| <code class="highlighter-rouge">endDate</code> | Yes       | Date till you want the data (this date is included)      |
| <code class="highlighter-rouge">lastId</code> | No    | Use it for paginated response. Settlements having id greater than this value will be returned     |
| <code class="highlighter-rouge">count</code> | No    | Number of settlements you want to receive. Default is 20 and max is 50.     |

## All Settlements Response Parameters

| Parameter                                 | Description                                      |
|-------------------------------------|---------------------------------------------------------------|
| <code class="highlighter-rouge">status</code>        | Status of API call. Values are - OK and ERROR  |
| <code class="highlighter-rouge">settlements</code>        | List of settlements      |
| <code class="highlighter-rouge">message</code>        |  response message (will have the reason when status is sent as ERROR)                        |
| <code class="highlighter-rouge">lastId</code>        |  ID of the last transaction returned. Use it in your next request if current one didn't return all the transactions                        |

## Settlement Array

| Parameter                           | Description                                      |
|-------------------------------------|--------------------------------------------------------------|
| <code class="highlighter-rouge">id</code>        | Settlement Id (use it to fetch transactions that are part of this settlement)  |
| <code class="highlighter-rouge">totalTxAmount</code>        | Total transactions amount      |
| <code class="highlighter-rouge">settlementAmount</code>        |  Amount after deducting the TDR             |
| <code class="highlighter-rouge">adjustment</code>        |  Any adjustments (because of refunds OR disputes)              |
| <code class="highlighter-rouge">amountSettled</code>        |  Amount settled after including the adjustments             |
| <code class="highlighter-rouge">transactionFrom</code>        |  transaction included from this day                     |
| <code class="highlighter-rouge">transactionTill</code>        |  transactions included till this day       |
| <code class="highlighter-rouge">utr</code>        |  Bank Reference number       |
| <code class="highlighter-rouge">settledOn</code>        |  Time of settlement (this could be different than credit date shown on the account statement)   |



# Fetch Single Settlement
To fetch the transactions details that are part of a settlement

#BEGIN_CODE

```bash

  curl --request POST \
  --url https://test.cashfree.com/api/v1/settlement \
  --header 'cache-control: no-cache' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data 'appId=${APPLICATION_ID}&secretKey=${SECRET_KEY}&settlementId=123456&lastId=&count='

```

```php
    $curl = curl_init();

    curl_setopt_array($curl, array(
    CURLOPT_URL => "https://test.cashfree.com/api/v1/settlement",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "POST",
    CURLOPT_POSTFIELDS => "appId=${APPLICATION_ID}&secretKey=${SECRET_KEY}&settlementId=123456&lastId=&count=",
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

## Single Settlement Request Parameters

| Parameter                                 | Required | Description                                      |
|-------------------------------------|-----------|----------------------------------------------------|
| <code class="highlighter-rouge">appId</code>            | Yes      | Your app id      |
| <code class="highlighter-rouge">secretKey</code>            | Yes      | Your Secret Key      |
| <code class="highlighter-rouge">settlementId</code> | Yes       | ID of the settlement  |
| <code class="highlighter-rouge">lastId</code> | No    | Use it for paginated response. Transactions having id greater than this value will be returned     |
| <code class="highlighter-rouge">count</code> | No    | Number of transactions you want to receive. Default is 20 and max is 50.     |

## Single Settlement Response Parameters

| Parameter                                 | Description                                      |
|-------------------------------------|-----------------------------------------------------------|
| <code class="highlighter-rouge">status</code>        | Status of API call. Values are - OK and ERROR  |
| <code class="highlighter-rouge">transactions</code>        | List of transactions      |
| <code class="highlighter-rouge">message</code>        |  response message (will have the reason when status is sent as ERROR)                        |
| <code class="highlighter-rouge">lastId</code>        |  ID of the last transaction returned. Use it in your next request if current one didn't return all the transactions                        |


## Transaction Array

| Parameter                                 | Description                                      |
|-------------------------------------|-------------------------------------------------------------|
| <code class="highlighter-rouge">id</code>        | Settlement Id (use it to fetch transactions that are part of this settlement)  |
| <code class="highlighter-rouge">orderId</code>        | Total transactions amount      |
| <code class="highlighter-rouge">referenceId</code>        |  Amount after deducting the TDR             |
| <code class="highlighter-rouge">txAmount</code>        |  Any adjustments (because of refunds OR disputes)              |
| <code class="highlighter-rouge">paymentMode</code>        |  Amount settled after including the adjustments             |
| <code class="highlighter-rouge">bankName</code>        |  transaction included from this day                     |
| <code class="highlighter-rouge">serviceCharge</code>        |  Charges applicable for the transaction       |
| <code class="highlighter-rouge">serviceTax</code>        |  Service tax levied on the service charge      |
| <code class="highlighter-rouge">settlementAmount</code>        |  Amount after deducting service charge and service tax from transaction amount   |
| <code class="highlighter-rouge">txTime</code>        |  Transaction Time   |
