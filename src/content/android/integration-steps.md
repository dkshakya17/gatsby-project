---
title: Android Guide | Cashfree
permalink: /android/integration-steps
layout: guide
platform: android
display_platform: ANDROID
subtitle: Integration Steps
sortOrder: 2
---

# Cashfree SDK Integration Steps
<ul>
<li>Create a Cashfree account and get the API keys </li>
<li>Download and Integrate the CashFree SDK in your app</li>
<li>Implement Order token generation API in your server</li>
<li>When the Customer initiates payment for an order from the app, invoke a payment API from the SDK with the token generated from the previous step</li>
<li>Customer is shown the appropriate payment screen and payment flow ensues</li>
<li>SDK verifies the payment flow is complete (Success/Failure)</li>
<li>Handle the payment result in your app</li>
<li> Get the payment result from webhook(Optional)</li>
<li> Verify payment with the signature verification(Optional)</li>

</ul>

# Step 1: CashFree Account Creation
<ul>
<li>Create a Cashfree account from <a href="https://merchant.cashfree.com/merchant/login">this link</a></li>
<li>Go to Payment Gateway Dashboard and select Credentials option from the left pane</li>
<li>Copy the App ID and the Secret Key.  These values are required to create order token from your server.</li>
</ul>


# Step 2: SDK Integration

## Step 1: Download Library

The Cashfree SDK is bundled as an AAR file according to the latest Android standards. Please download and include this library as a dependency in your app. 

| Version      |     Download Link       |
|-----------|----------------------------------------------------|
| <code class="highlighter-rouge">1.2</code> | <a href="https://drive.google.com/file/d/1CwGZF5UT01bddD8e9s7GztBMD4JS3hCP/">Support Library Version</a>  |
| <code class="highlighter-rouge">1.2</code> | <a href="https://drive.google.com/file/d/1KfH-tPtMAxs1b5-6fbfalXngojQJcU1g">AndroidX Version</a>  |

## Step 2: Add Dependency

###First way: Using Android Studio

<ul>
  <li>File -> New -> New Module -> Import .jar/.aar and select your .aar file.</li>
  <li>Then in your project’s build.gradle (the one under ‘app’) add the following:</li>
</ul>

```xml
  dependencies {
    implementation project(‘:cashfreesdk)
  }
```
<ul>
  <li>Clean Build after all the above steps.</li>
</ul>

Read more [here](https://developer.android.com/studio/projects/android-library#AddDependency)


###Second way: (Used in this doc)
<ul>
  <li>Create <b>libs</b> folder inside your module. <br> ex: <b>app/libs</b> should be location for <b>app</b> module</li>
  <li>Copy your .aar file to this libs folder</li>
  <li>Open <b>build.gradle</b> file inside the module(the one under ‘app’) and add dependency :</li>
</ul>

```xml
  dependencies {
    implementation files(‘libs/cashfreesdk-1.0-release.aar)
  }
```
<br/>

# Step 3: Add permissions

The CashfreeSDK requires that you add the permissions shown below in your `Android Manifest` file.
We support integration from API level 16. Do ensure that the minSdkVersion in the build.gradle of your app is equal to (or greater than) that.

```xml
<manifest ...>
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<application ...>
```

Add [Volley](https://developer.android.com/training/volley/index.html) dependency in your build.gradle 

```xml
dependencies {
    ...
    implementation 'com.android.volley:volley:1.1.1'
}
```

Set the tools:node attribute to "merge" in the definition of your application element in the Android Manifest file.

```xml
<application
        ...
        tools:node="merge">
</application>
```

<br>

# Step 4: Generate Token (From Backend)
You will need to generate a token and pass it to SDK while initiating payments. For generating token you need to use our token generation API. Please take care that this API is called only from your <b><u>backend</u></b> as it uses secretKey. Thus this API should <b>never be called from App</b>.

<br/>

## Request Description

<copybox>

  For production/live usage set the action attribute of the form to:
   `https://api.cashfree.com/api/v2/cftoken/order`

  For testing set the action attribute to:
   `https://test.cashfree.com/api/v2/cftoken/order`

</copybox>

You need to send orderId, orderCurrency and orderAmount as a JSON object to the API endpoint and in response a token will received. Please see  the description of request below.

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

## Request Example

```bash
curl -XPOST -H 'Content-Type: application/json' -H 'x-client-id: 275432e3853bd165afbf5272' -H 'x-client-secret: 2279c0ffb9550ad0f9e0652741c8d06a49409517' -d '{
  "orderId": "Order0001",
  "orderAmount":1,
  "orderCurrency":"INR"
}' 'https://test.cashfree.com/api/v2/cftoken/order'
```
<br/>

## Response Example

```bash
{
"status": "OK",
"message": "Token generated",
"cftoken": "v79JCN4MzUIJiOicGbhJCLiQ1VKJiOiAXe0Jye.s79BTM0AjNwUDN1EjOiAHelJCLiIlTJJiOik3YuVmcyV3QyVGZy9mIsEjOiQnb19WbBJXZkJ3biwiIxADMwIXZkJ3TiojIklkclRmcvJye.K3NKICVS5DcEzXm2VQUO_ZagtWMIKKXzYOqPZ4x0r2P_N3-PRu2mowm-8UXoyqAgsG"
}
```

The "cftoken" is the token that is used authenticate your payment request that will be covered in the next step.
<br/>

# Step 5: Initiate Payment

<ul>

<li>App passes the order info and the token to the SDK</li>
<li>Customer is shown the payment screen where he completes the payment</li>
<li>Once the payment is complete SDK verifies the payment</li>
<li>App receives the response from SDK and handles it appropriately</li>

</ul>

## NOTE
<ul>
<li>The order details passed during the token generation and the payment initiation should match. Otherwise you'll get a<b>"invalid order details"</b> error.</li>
<li>Wrong appId and token will result in <b>"Unable to authenticate merchant"</b> error. The token generated for payment is valid for 5 mins within which the payment has to be initiated. Otherwise you'll get a <b>"Invalid token"</b> error.</li>
</ul>