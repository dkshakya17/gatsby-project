---
title: API Reference
permalink: /cf-checkout/errors
layout: guide
platform: cf-checkout
display_platform: CF-CHECKOUT
subtitle: Common Errors
sortOrder: 5
---

# Signature Mismatch Error

## 1. How can I solve the signature mismatch error?

At the time of initiating a payment if you see “signature mismatch” error, it could be due to any of the two reasons -

<ul>
    <li>You have entered incorrect credentials (appId/secret key) - for test or production</li>
    <li>The parameters (orderId, order amount etc) are incorrect or missing</li>
</ul>

Whenever you encounter a signature mismatch error go back to the payment page and follow the below steps to debug this further. See the video below for more detail.

<ul>
    <li>Right click on the page and select inspect</li>
    <li>Go to the Network tab and check both the options Preserve log and Disable cache</li>
    <li>Make sure to clear the network activity section before proceeding</li>
    <li>Click on Payment button(to make the payment)</li>
    <li>Once you click on the payment button, you will see a submit document being added to the network activity area</li>
    <li>Click on submit (doc)  and scroll down, you will see the form data which specifies your appId, orderId, signature etc</li>
</ul>

Copy the parameter values and use this tool to generate the signature. You should verify that the signature you have generated matches with the one being generated by the tool.  
You can also refer to this [video](https://www.youtube.com/watch?time_continue=3&v=CpE6g4eN_8k)

# Activate Paytm

## 2. How can I activate Paytm as a payment option?

To show Paytm as a payment option on your checkout page, you need to create a Paytm business account and then connect Paytm with Cashfree. 

The process takes 24-48 hours, and once completed, Paytm will be available as a payment option for your customers.

Step 1: Go to  https://business.paytm.com/ and create your test account with Paytm business.

Step 2: Once the test account is successfully created, you will receive a mail from Paytm highlighting your Merchant Staging Credentials. You need to forward this mail to Team Cashfree.

Or you can go to your Paytm dashboard. Here you will see the details under Test API Details tab. 

Step 3: You need to share the above details with your Cashfree Account Manager. In order to activate your production account, 3 test orders need to be created on Paytm which will be done by Team cashfree. Your account manager will share the status of the orders which you need to forward to Paytm.

Step 4: Paytm will verify and generate below Production credentials for your merchant account:  

<ul>
    <li>Website (For web) </li>
    <li>Merchant ID</li>
    <li>Merchant Key </li>
    <li>Industry_type_ID </li>
    <li>Channel_ID (For web)</li>
    <li>Production server URL</li>
</ul>

Step 5: Now share the above details with Cashfree Account Manager and Paytm payment option will be activated for your account.
In case of any queries talk to your Account Manager or write to us at care@cashfree.com.

# Customize Checkout Page

## 3. I want to have only some specific payment modes on my checkout page. How can I customize?

You can pass your desired payment modes while creating an order request. Refer to [this](/cf-checkout#request-parameters) list of request parameters.
NOTE- Not passing anything in the paymentMode parameter shows all the payment modes.

# Webhook Notification

## 4.How can I receive webhook notification for my orders?

You need to add an HTTPS url as a value for the “notifyUrl” parameter in the create order request to receive webhook (POST) notification from Cashfree (only on successful transaction).

# Customize Checkout Form

## 5. Can I customize the checkout form?

The checkout form is hosted by Cashfree so you cannot customize the checkout form. Instead you can use our seamless integration to create your own checkout page.

# Verify Merchant Credentials

## 6.How can I solve the error “Failed to verify merchant credentials”?

Please verify whether the signature which you are generating is correct using our [checksum](/cf-checkout/checkout-checksum) tool. Please ensure to pass all the required parameters while generating the signature.

# Return URL

## 7. How can I return to my website post payment?

You need to pass your  webpage URL in the returnURL parameter while creating an order request so that cashfree can redirect the user to the specified URL post payment.
NOTE - We recommend you to use an HTTPS URL for the returnURL

# App ID and Secret Key

## 8. Where can I find my appId and secret key?

You can get your test as well as production appId and secret key from [here](https://merchant.cashfree.com/merchant/pg#api-key).

# Integration Kit

## 9. Where can I find the integration kit?

We have integration kits supporting all major platforms. You can find the links [here](/cf-checkout/integration-kits).