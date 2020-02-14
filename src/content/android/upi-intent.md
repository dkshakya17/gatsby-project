---
title: Android Guide | Cashfree
permalink: /android/upi-intent
layout: guide
platform: android
display_platform: ANDROID
subtitle: UPI Intent
sortOrder: 9
---

<h1>UPI Intent</h1>

# Initiate Payment

```java
public void upiPayment(Context context, Map<String, String> params, String token, String stage)
```
Payment done through a UPI intent. When the method is invoked the customer will be presented with a list showing all the installed UPI Apps on their device. If instead you want to preselect the client that should be chosen for payment use this method. Once the customer selects their preffered app, the payment confirmation page on the app will open. Once the payment is done on their UPI App the response will be delivered through onActivityResult().

<b>Parameters:</b>
<ul>
  <li><code>context</code>: Context object of the calling activity is required for this method. In most of the cases this will mean sending the instance of the calling activity (this). </li>
  <li><code>params</code>: A map of all the relevant parameters described <a href="/android/request-params">here</a></li>
  <li><code>token</code>: The token generated <a href="/android/integration-steps#step-4:-generate-token-(from-backend)">here</a></li>
  <li><code>stage</code>: Value should be either "TEST" or "PROD" for testing server or production server respectively.</li>
</ul>


# selectUpiClient
```java
public void selectUpiClient(String upiClientPackage)
```
When initiating the UPI intent the customer is presented with a list of all the UPI client Apps (BHIM, GPay, PhonePe etc.) on their phone. This allows the customer to choose any UPI App they want to pay with. If instead you want the customer to pay with a particular app you can use this method. After calling this method whenever upiPayment is called the customer will be no longer be shown an App selection screen and instead will be redirected to the App whose package is provided in the argument.

<b>Parameters:</b>
<ul>
  <li><code>upiClientPackage</code>: The string describing the java package of the upi client that is to be selected. </li>
</ul>

# getUpiClients
```java
public String[] getUpiClients(Context context)
```
Get the packages of all the UPI Clients installed on the device as a string array. These packages can then be passed to selectUpiClient() method to initiate payment.

<b>Parameters:</b>
<ul>
  <li><code>context</code>: Context object of the calling activity is required for this method. In most of the cases this will mean sending the instance of the calling activity (this). </li>
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