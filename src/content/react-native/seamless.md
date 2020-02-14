---
title: React Native Guide| Cashfree
permalink: /react-native/seamless
layout: guide
platform: react-native
display_platform: REACT-NATIVE
subtitle: Seamless
sortOrder: 2
---

# Seamless

In seamless payment flow, the customer enters all details on merchant's checkout view itself( Cashfree is whitelabled in this scenario). To use seamless, import the component as before. The integration steps for Seamless mode are almost same as the Checkout flow except the input params passed will have extra parameters according to the payment mode selected.

# Card Payment


```js
{
card_number= "4111111111111111"
card_holder=  "Test"
card_cvv= "123"
card_expiryMonth="07"
card_expiryYear="2023"
paymentOption="card"
}
```



# Net Banking


```js
{
paymentOption="nb"
paymentCode=//bank code
}
```

You can get a list of bank codes here: [net banking](/resources/netbanking)

# Wallets


```js
{
paymentOption="wallet"
paymentCode=//wallet code
}
```

You can get a list of wallet codes here: [wallet codes](/resources/wallet)

# UPI

```js
{
paymentOption="upi"
upi_vpa=//VPA of client
upiMode=//to be used for google pay only, upiMode has to be gpay
}

```





# Request Parameters

| Parameter                                 | Required | Description                                      |
|-------------------------------------|-----------|----------------------------------------------------|
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">appId</span></code>            | Yes      | Your app id      |
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">orderId</span></code> | Yes       | Order/Invoice Id  |
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">orderAmount</span></code> | Yes       | Bill amount of the order      |
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">orderCurrency</span></code> | No    | Currency for the order. INR if left empty. See the Currency Codes below for a list of available currencies.<strong>Please contact care@gocashfree.com to enable new currencies.</strong>     |
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">orderNote</span></code>            | No       | A help text to make customers know more about the order                                |
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">customerName</span></code> | Yes    | Name of the customer     |
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">customerPhone</span></code> | Yes    | Phone number of customer     |
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">customerEmail</span></code> | Yes    | Email id of the customer     |
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">notifyUrl</span></code> | No    | Notification URL for server-server communication. Useful when user’s connection drops while      |
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">paymentModes</span></code> | No    | Allowed payment modes for this order. Available values: cc, dc, nb, paypal, wallet, upi. If left blank, display all payment modes   |
 

# Response parameters, shared with callback function

These parameters are returned to the function you implement, contains a stringified obj with the details of the transaction.

| Parameter                                  | Description                                      |
|-------------------------------------|--------------------------------------------------------------|
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">orderId</span></code>  | Order id for which transaction has been processed. Ex: GZ-212  |
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">orderAmount</span></code> | Amount of the order. Ex: 256.00      |
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">referenceId</span></code>      | Cashfree generated unique transaction Id. Ex: 140388038803                                |
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">txStatus</span></code>   | Payment status for that order. Values can be : SUCCESS, FLAGGED, PENDING, FAILED, CANCELLED.     |
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">paymentMode</span></code>   | Payment mode used by customer to make the payment. Ex: DEBIT_CARD, MobiKwik, etc     |
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">txMsg</span></code>   | Message related to the transaction. Will have the reason, if payment failed     |
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">txTime</span></code>  | Time of the transaction    |
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">signature</span></code>  | signature generated to verify the authenticity of the transaction  |
 
