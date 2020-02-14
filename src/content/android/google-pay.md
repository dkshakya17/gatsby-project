---
title: Android Guide | Cashfree
permalink: /android/google-pay
layout: guide
platform: android
display_platform: ANDROID
subtitle: Google Pay
sortOrder: 6
---

<H1>Google Pay<H1>

# Dependencies for GPay Integration

Add the google maven repository to your project in the top level build.gradle.

```gradle
allprojects{
  repositories {
    google()
    ...
  }
}
```

Add the following dependencies to your module


```gradle
implementation project(":google-pay-client-api-1.0.0")
implementation 'com.google.android.gms:play-services-tasks:15.0.1'
```

# Initiate Payment 

```java
public void gPayPayment(Context context, Map<String, String> params, String token, String stage)
```
Once the payment is initiated the Google Pay app is opened directly and once the payment is done, the SDK verifies the payment and the result is delivered through onActivityResult() to the calling activity.

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
