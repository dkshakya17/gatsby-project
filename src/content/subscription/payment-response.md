---
title: Subscription| Cashfree
permalink: /subscription/payment-response
layout: guide
platform: subscription
display_platform: SUBSCRIPTION
subtitle: payment response 
sortOrder: 9
---

# Payment Response

When a subscription is created a returnUrl is provided as a part of the request. When the customer authorizes the payment, he will be redirected to the returnURL. This redirection is done as POST request with the following parameters-

## Request Configuration for Payment Response

| Method                                  | URL                                      |
|-------------------------------------|-----------|
| cf_subReferenceId     |  Unique Id which was generated when the subscription was created (Numeric)       |
| cf_subscriptionId     | Checksum used to authenticate the transaction (Alphanumeric)     |
| cf_authAmount      	|  The money that was charged to authorize the subscription (Numeric)     |
| cf_orderId      	|  The PG Order created for authorization (Alphanumeric)     |
| cf_referenceId     | The referenceId/transactionId of authorization in PG (Numeric)     |
| cf_status     | Status of the subscription. In the returnUrl, the response should be ACTIVE if the authorization was successful or INITIALIZED if the authorization failed (Alphanumeric)    |
| cf_message      	|  A brief note about the payment (Alphanumeric)     |
| signature      	|  The hash of all parameters in request generated using secretKey. Refer Appendix 2 for details (Alphanumeric)      |


# Webhook Support

<ul>
	<li>Contact support@cashfree.com to configure your Webhook endpoint.</li>
	<li>Make sure that you don’t process duplicate events. For instance, if you have already received a success response for Subscription API call. Discard any identical Subscription success events for the corresponding API.</li>
	<li>Please note that there might be new events added in the future.</li>
</ul>

Webhook will be sent to your configured endpoint as a POST request with the body containing the various parameters specifying the details of each event. Each request contains an event parameter that identifies its type. Here are the various events that can be sent to your webhook endpoint:


### SUBSCRIPTION STATUS CHANGE

| Parameter                                  | Description                                      |
|--------------------------------------------|----------------------------------------------------|
| cf_event     |  The event for which the subscription was authorized. The value for this event is `SUBSCRIPTION_STATUS_CHANGE`( Alphanumeric)  |
| cf_subReferenceId     | A unique Id which was generated when the subscription was created (Numeric)   |
| cf_status      	| The new status of the subscription. Refer Appendix 1 for more subscription status values (Alphanumeric) |
| cf_lastStatus      	|  The old status of the subscription. Refer Appendix 1 for the description of different subscription status values (Alphanumeric) |
| cf_eventTime     |  The time when event was dispatched(Alphanumeric) |
| signature     | The hash of all parameters in request generated using secretKey. Refer Appendix 2 for details (Alphanumeric) |


### SUBSCRIPTION NEW PAYMENT

| Parameter                                  | Description                                      |
|-------------------------------------|-----------|
| cf_event     | The event for which the subscription was authorized. The value for this event is `SUBSCRIPTION_NEW_PAYMENT `(Alphanumeric)   |
| cf_subReferenceId     | A unique Id which was generated when the subscription was created (Numeric)   |
| cf_paymentId      	|  The unique paymentId for the payment (Alphanumeric)  |
| cf_amount      	|  The amount of money charged for payment (Numeric) |
| cf_eventTime     | The time when the event was dispatched (Alphanumeric)  |
| signature     | The hash of all parameters in request generated using secretKey. Refer Appendix 2 for details (Alphanumeric) |


### SUBSCRIPTION PAYMENT DECLINED

| Parameter                                  | Description                                      |
|-------------------------------------|-----------|
| cf_event     |  The event for which the subscription was authorized.The value for this event is `SUBSCRIPTION_PAYMENT_DECLINED` (Alphanumeric)  |
| cf_subReferenceId     | A unique Id which was generated when the subscription was created (Numeric) |
| cf_paymentId      	| The unique paymentId for the payment (Alphanumeric)  |
| cf_amount      	| The amount of money charged for payment (Numeric) |
| cf_reasons     |  A possible reason for failure (Alphanumeric)  |
| cf_eventTime     | The time when the event was dispatched (Alphanumeric) |
| signature     | The hash of all parameters in request generated using secretKey. Refer Appendix 2 for details (Alphanumeric) |


