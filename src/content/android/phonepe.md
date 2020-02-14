---
title: Android Guide | Cashfree
permalink: /android/phonepe
layout: guide
platform: android
display_platform: ANDROID
subtitle: PhonePe
sortOrder: 8
---

<H1>PhonePe<H1>

# Initiate Payment 

```java
public void phonePePayment(Context context, Map<String, String> params, String token, String stage)
```
Once the payment is initiated the PhonePe app is opened directly for payment and once the payment is done, the SDK verifies the payment and the result is delivered through onActivityResult() to the calling activity.

<b>Parameters:</b>
<ul>
  <li><code>context</code>: Context object of the calling activity is required for this method. In most of the cases this will mean sending the instance of the calling activity (this). </li>
  <li><code>params</code>: A map of all the relevant parameters described <a href="/android/request-params">here</a></li>
  <li><code>token</code>: The token generated <a href="/android/integration-steps#step-4:-generate-token-(from-backend)">here</a></li>
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
