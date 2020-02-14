---
title: Android Guide | Cashfree
permalink: /android/amazon-pay
layout: guide
platform: android
display_platform: ANDROID
subtitle: Amazon Pay
sortOrder: 7
---


# Amazon Pay

# Initiate Payment

```java
public void doAmazonPayment(Context context, Map<String, String> params, String token, String stage)
```

Initiate the payment in chrome tab (or browser if it is not available) in the customer’s phone. The customer will be taken to amazon pay payment page.  Once the payment is completed/ended and the user closes the chrome tab, they’ll be taken to SDK screen where the payment verification happens. Once the payment is verified the user is redirected to the app again. The response will be delivered through onActivityResult().

<b>Parameters:</b>
<ul>
  <li><code>context</code>: Context object of the calling activity is required for this method. In most of the cases this will mean sending the instance of the calling activity (this). </li>
  <li><code>params</code>: A map of all the relevant parameters described <a href="/android/request-params">here</a></li>
  <li><code>token</code>: The token generated from <a href="/android/integration-steps#step-4:-generate-token-(from-backend)">here</a></li>
  <li><code>stage</code>: Value should be either "TEST" or "PROD" for testing server or production server respectively.</li>
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
<br/>
<br/>