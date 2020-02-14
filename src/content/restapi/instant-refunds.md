---
title: REST API Guide | Cashfree
permalink: /restapi/instant-refunds
layout: guide
platform: rest
display_platform: REST
subtitle: Instant Refunds
sortOrder: 5
---

# Instant Refunds

For each payment mode, the refund payment process is different and takes a variable amount of time. For example, net banking could take 7-8 days, cards can take 5-7 days, Cash on delivery (COD) 15-25 days.

With Cashfree a business can send money back to the customer’s original payment source instantly without any manual intervention.


## Payment Source
<ul>
<li>Cards: Master card & Visa (both debit & credit)</li>
<li>Netbanking: All banks</li>
<li>Wallets: Phonepe, amazon pay & Paytm</li>
<li>UPI: all UPI Apps</li>
</ul>

## Features
<ul>
<li>Integrated refund management. Integrate with payment gateway and release refunds</li>
<li>Use intuitive Dashboard or integrate with the internal product or ERP with simple API</li>
<li>Real-time update on the refund status with Analytics Dashboard</li>
</ul>


## How is it 

| Using Cashfree Payment Gateway           | Using Shopify/Magento | Using any other Payment Gateway                                 |
|-------------------------------------|-----------|----------------------------------------------------|
| Refund requested by the customer, refund received instantly on the original source of payment           | Enable CF instant refunds   You can use Shopify refund flow or use Cashfree dashboard for integrated refunds     | Integrate with Cashfree instant Refund API to send payment details. Track real-time status of refunds with Cashfree Dashboard      |
 


### Request Parameters

| Parameter      | Required | Description           |
|---------------------------------|--------------------------------|-----------------------------|
| <code class="highlighter-rouge">appId</code>            | Yes      | Your app id                                                                                                                                                          |
| <code class="highlighter-rouge">secretKey</code>        | Yes      | Your Secret Key                                                                                                                                                      |
| <code class="highlighter-rouge">referenceId</code>      | Yes      | Cashfree reference Id                                                                                                                                                |
| <code class="highlighter-rouge">refundAmount</code>     | Yes      | Amount to be refunded. Should be lesser than equal to transaction amount                                                                                             |
| <code class="highlighter-rouge">refundNote</code>       | Yes      | A refund note for your reference(max length 90)                                                                                                                                    |
| <code class="highlighter-rouge">refundType</code>       | Yes      | INSTANT for instant refunds                                                                                                                                          |
| <code class="highlighter-rouge">merchantRefundId</code> | Yes       | A merchant generated unique key to identify this refund. Required if refundType is INSTANT (max length 35)                                                                          |
| <code class="highlighter-rouge">mode</code>             | Yes      | Required for INSTANT refund and only if payment mode was netbanking. Can be BANK_TRANSFER or CASHGRAM. In case of other payment modes, refund will be made to source |
| <code class="highlighter-rouge">accountNo</code>        | No       | Account number to transfer refund amount. Required if mode is BANK_TRANSFER                                                                                          |
| <code class="highlighter-rouge">ifsc</code>             | No       | IFSC code. Required if mode is BANK_TRANSFER                                                                                                                         |
 

### Response Parameters

| Parameter                                      | Description                                            |
|---------------------------------------|----------------------------|
| <code class="highlighter-rouge">status</code>  | Status of API call. Values are - OK and ERROR          |
| <code class="highlighter-rouge">message</code> | Message saying if the transaction was refunded or not. |
| <code class="highlighter-rouge">reason</code>  | reason of failure when status is ERROR                 |
 

