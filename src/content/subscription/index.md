---
title: Subscription| Cashfree
permalink: /subscription
layout: guide
platform: subscription
display_platform: SUBSCRIPTION
subtitle: getting started
sortOrder: 1
---


# Getting Started

Cashfree Subscription enables you to manage recurring payments. You can easily create and manage subscriptions and charge your customers automatically as per the plans defined by you.
Whatever be your business model, you can use Cashfree as your building block.
The Subscription service is available through the Dashboard and API.
To get started with Subscription you need to follow the below steps -

<ul>
<li>Create plans</li>
<li>Create subscriptions and Authorize</li>
<li>Manage  subscriptions</li>
</ul>


Get started easily with Cashfree Subscriptions by downloading the following collection and importing it in Postman from 
[here](/assets/SubscriptionPostman.json)




# Dashboard Guide


## Step 1: Create Plan

To get started with a subscription, you need to create a plan. This plan is basically a template where you define the details and the amount which you will be charging your customers.

To create a new plan go to  the `Cashfree dashboard` ->`Subscriptions` -> `Plans` -> `New Plan`. You need to provide the below details to create a new plan:

<ul>
<li>Plan ID - used to uniquely identify each plan (mandatory field)</li>
<li>Plan Name - specify a name to the plan for easy reference (mandatory field)</li>
<li>Description - a brief used for later reference (optional field)</li>
<li>Plan Type - can be a periodic plan or an on-demand plan</li>
<li>Interval Type - interval as per choice say monthly, weekly, etc</li>
<li>Amount - the cost of the plan (mandatory field)</li>
</ul>



![subscription](./images/sbc1.png)
## Step 2:Create Subscription

After you have successfully created the plan, the next step is to create a subscription to charge the customers as per the plan created in the previous step

To create a new Subscription go to  `Cashfree Merchant dashboard` -> `Subscriptions` -> `View Subscriptions` -> click on `New Subscription`. 

The Subscription section captures information related to the plan:
<ul>
<li>Subscription Id - used to uniquely identify each subscription (mandatory field)</li>
<li>Plan - name of the plan created earlier</li>
<li>Customer Email & Customer Phone- contact details of the customer</li>
<li>Expiry date - the last day till the subscription is valid</li>
<li>Note - brief for future reference (optional)</li>
<li>ReturnURL - valid url to which customer will be redirected  after the subscription has been authorized (optional)</li>
</ul>

Click on Create, the subscription is created! 


![subscription](./images/sbc2.png)

Once you have created the subscription, a Reference Id and an Authorization link (refer screenshot) will be generated. You need to share this link with the customer, who can easily authorize the subscription either by providing the card details under the card section or the account number under the E-mandate section.

![subscription](./images/sbc3.png)

![subscription](./images/sbc4.png)

## Step 3: Manage Subscription

Once the customer has authorized the subscription, you can easily debit their account either periodically or as per an on-demand plan. In case of a periodic plan, Cashfree will auto-debit the customer's account as per the plan interval. For an On-Demand plan, you will have to explicitly debit the customer's account.

The customer will receive a notification from their respective bank regarding the payment.
 
If by any chance the subscription fails either due to deauthorization of payment, expiration of payment method or insufficient funds at payment method, the status of the subscription changes to `ON-HOLD`. You will have to contact the customer regarding the issue and later after your consent, Cashfree will change the status to `ACTIVE`.


If at any instance you wish to cancel a subscription, you can  go to the Cashfree merchant dashboard -> `Subscriptions` -> `View Subscriptions` ->  `Subscription Details` -> click on `Cancel`. The customer will no longer be charged (Refer screenshot) 

<aside class='notice'> Subscription once cancelled cannot be reactivated </aside>

![subscription](./images/sbc5.png)


