---
title: Android Guide | Cashfree
permalink: /android/checkout-integration
layout: guide
platform: android
display_platform: ANDROID
subtitle: Web Checkout Integration
sortOrder: 4
---

<h1> Web Checkout Integration</h1>

# How to integrate

For both the modes (normal and seamless) you need to invoke the <b>doPayment()</b> method. However, there are a few extra parameters you need to pass incase of seamless mode. 

# doPayment

```java
public void doPayment(Context context, Map<String, String> params, String token, String stage)
```
Initiate the payment in a webview. The customer will be taken to the payment page on cashfree server where they will have the option of paying through any payment option that is activated on their account. Once the payment is done the webview will close and the response will be delivered through onActivityResult().

<b>Parameters:</b>
<ul>
  <li><code>context</code>: Context object of the calling activity is required for this method. In most of the cases this will mean sending the instance of the calling activity (this). </li>
  <li><code>params</code>: A map of all the relevant parameters described <a href="/android/request-params">here</a></li>
  <li><code>token</code>: The token generated <a href="/android/integration-steps#step-4:-generate-token-(from-backend)">here</a></li>
  <li><code>stage</code>: Value should be either "TEST" or "PROD" for testing server or production server respectively.</li>
</ul>

# doPayment - with Custom toolbar Theme

```java
public void doPayment(Context context, Map<String, String> params, String token, String stage, String color1, String color2)
```
Initiate the payment in a webview. The customer will be taken to the payment page on cashfree server where they will have the option of paying through any payment option that is activated on their account. Once the payment is done the webview will close and the response will be delivered through onActivityResult().


<b>Parameters:</b>
<ul>
  <li><code>context</code>: Context object of the calling activity is required for this method. In most of the cases this will mean sending the instance of the calling activity (this). </li>
  <li><code>params</code>: A map of all the relevant parameters described <a href="/android/request-params">here</a></li>
  <li><code>token</code>: The token generated <a href="/android/integration-steps#step-4:-generate-token-(from-backend)">here</a></li>
  <li><code>stage</code>: Value should be either "TEST" or "PROD" for testing server or production server respectively.</li>
  <li><code>color1</code>: Toolbar brackground color</li>
  <li><code>color2</code>: Toolbar text and back arrow color</li>
</ul>


# Receive Response

Once the payment is done you will receive the response on the onActivityResult() function inside the invoking activity. In the intent extras you will receive a set of [response parameters](/android/response-param) which you can use to determine if the transaction was successful. Request code will always be equal to CFPaymentService.REQ_CODE.

```java
@Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        //Same request code for all payment APIs. 
        Log.d(TAG, "ReqCode : " + CFPaymentService.REQ_CODE);
        Log.d(TAG, "API Response : ");
        //Prints all extras. Replace with app logic.
        if (data != null) {
            Bundle bundle = data.getExtras();
            if (bundle != null)
                for (String key : bundle.keySet()) {
                    if (bundle.getString(key) != null) {
                        Log.d(TAG, key + " : " + bundle.getString(key));
                    }
                }
        }
    }
```
<br/>

###NOTE 
There can be scenarios where the SDK is not able to verify the payment within a short period of time. The status of such orders will be <code><b>PENDING</b></code>.

