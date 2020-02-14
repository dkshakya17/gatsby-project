---
title: React Native Guide| Cashfree
permalink: /react-native
layout: guide
platform: react-native
display_platform: REACT-NATIVE
subtitle: Getting Started
sortOrder: 1
---





# Getting Started

Use our library to integrate the Cashfree Payment Gateway directly into your app using Cashfree SDK for React Native. 
Cashfree SDK has been designed to offload the complexity of handling and integrating payments in your app.

The Cashfree SDK is available as an npm package. Instructions on importing the package is also provided.

<a href='https://www.npmjs.com/package/cashfreereactnativepg' target='_blank'>https://www.npmjs.com/package/cashfreereactnativepg</a>

<aside class='notice'>This doc is for cashfreereactnativepg v2.0.0, if you are using an older version please upgrade to the latest one</aside>

We provide two types of integration with the reactNativeSDK
<ul>
<li>Webview Checkout - Customer does payment in Cashfree’s web payment page inside a webview in your app.</li>
<li>Seamless Pro - Customer does payment in your App directly and the request is sent to cashfree backend. A Webview is launched for the Two-factor/Authorization process.</li>
</ul>


# Step 1 : Setup
`cd /path-to-project-directory`

`npm install cashfreereactnativepg`

# Step 2: Generate token
You will need to generate a token and pass it to SDK while initiating payments for security reasons. For generating token you need to use our token generation API. Please take care that this API is called only from your backend as it uses secretKey which should never be sent to frontend. 


For production/live usage set the endpoint will be:  `https://api.cashfree.com/api/v2/cftoken/order`


For testing the endpoint will be: </br>
`https://test.cashfree.com/api/v2/cftoken/order`


You need to send orderId, orderCurrency and orderAmount as a JSON object to the API endpoint and in response a token will received. Please see  the description of request below

<br/>

# Request Description

For production/live usage set the endpoint will be: `https://api.cashfree.com/api/v2/cftoken/order`

For testing the endpoint will be: </br>
`https://test.cashfree.com/api/v2/cftoken/order`

```bash
curl -XPOST -H 'Content-Type: application/json' 
-H 'x-client-id: <YOUR_APP_ID>' 
-H 'x-client-secret: <YOUR_SECRET_KEY>' 
-d '{
  "orderId": "<ORDER_ID>",
  "orderAmount":<ORDER_AMOUNT>,
  "orderCurrency": "INR"
}' 'https://test.cashfree.com/api/v2/cftoken/order'
```
<br/>

# Request Example

```bash
curl -XPOST -H 'Content-Type: application/json' -H 'x-client-id: 275432e3853bd165afbf5272' -H 'x-client-secret: 2279c0ffb9550ad0f9e0652741c8d06a49409517' -d '{
  "orderId": "Order0001",
  "orderAmount":1,
  "orderCurrency":"INR"
}' 'https://test.cashfree.com/api/v2/cftoken/order'
```
<br/>

# Response Example

```json
{
"status": "OK",
"message": "Token generated",
"cftoken": "v79JCN4MzUIJiOicGbhJCLiQ1VKJiOiAXe0Jye.s79BTM0AjNwUDN1EjOiAHelJCLiIlTJJiOik3YuVmcyV3QyVGZy9mIsEjOiQnb19WbBJXZkJ3biwiIxADMwIXZkJ3TiojIklkclRmcvJye.K3NKICVS5DcEzXm2VQUO_ZagtWMIKKXzYOqPZ4x0r2P_N3-PRu2mowm-8UXoyqAgsG"
}
```

The "cftoken" attribute is the token that needs to be used to secure your request.
<br/>

# Checkout

Add the component

`import  { CashfreePG } from 'cashfreereactnativepg';`

```js
render() {    
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
         
         <CashfreePG 
          appId="YOUR_APP_ID" 
          orderId="YOUR_ORDER_ID"
          orderAmount = "100"
          orderCurrency = "INR"
          orderNote = "This is an order note"
          source = "reactsdk"
          customerName = "John"
          customerEmail = "abc@email.com"
          customerPhone = "1234561234"
          notifyUrl = "YOUR_NOTIFY_URL"
          paymentModes = ""
          env = "test" //blank for prod
          tokenData = "TOKENDATA"
          callback = {(eventData)=>{
                /*
                callback function that will be executed once the transaction has been completed
                */
            }}
          />
      </View>

    );
  }
```

<aside class='notice'>
The value for parameter source <b>MUST</b> be "reactsdk".
</aside>

