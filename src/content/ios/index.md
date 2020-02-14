---
title: iOS Developer Guide | Cashfree
permalink: /ios
layout: guide
platform: ios
display_platform: iOS
subtitle: Getting Started
sortOrder: 1
---


# Getting Started


Use our SDK to integrate the Cashfree Payment Gateway directly into your app for iOS versions 10.3 and above. CFSDK has been designed to offload the complexity of handling and integrating payments in your app

# Cashfree Payment Flow

## STEP 1: CREATING TOKEN FOR ORDER
<ul>
	<li>Customer initiates payment for an order from the app</li>
	<li>Order details are sent to your server</li>
	<li>Server makes call to CashFree server to generate an order token</li>
	<li>This token is passed from your server to app</li>
</ul>

<aside class='notice'> For more details refer to the token generation step </aside>

## STEP 2: PAYMENT
<ul>
	<li>App passes the order info and the token to the SDK</li>
	<li>Customer is shown the payment screen where he completes the payment</li>
	<li>Once the payment is complete SDK verifies the payment</li>
	<li>App receives the response from SDK and handles it appropriately</li>
</ul>

<aside class='warning'> There can be scenarios where the SDK is not able to verify the payment within a short period of time. The status of such orders will be <b>PENDING</b> </aside>


#Cashfree SDK
<ul>
We provide two types of integration for iOS

<li>Webview Checkout - Customer does payment in Cashfree’s web payment page inside a Webview in your app </li>
<li>Seamless - Customer does payment in your App directly and the request is sent to cashfree backend. A Webview is launched for the Two-factor/Authorization process</li>
</ul>

<aside class='notice'> <b>ENABLE_BITCODE</b> should be set to <b>YES</b> </aside>


| Xcode Version  | Swift Version  | Supported Architectures  | Framework Download Link  |
|---|---|---|---|
| 10.3 | 4.2  |  arm, armv7, arm64 |  <a href="https://drive.google.com/open?id=1AYA1VpRj91rL3FgjOEVxj-U_9uWZEKPu">Download SDK</a> |
| 10.3  | 4.2  | x86_64, i386  | <a href="https://drive.google.com/open?id=1CvRQLAM_0jXLwZwAGkncUQAYDF55ZK_6">Download SDK</a>  |
| 11.0  | 5.0.1  | arm, armv7, arm64  | <a href="https://drive.google.com/open?id=1arfussvnd1B0srmUFlSmmEYRhY-8Bd3c">Download SDK</a>  |
| 11.0  |  5.0.1 |  x86_64, i386 | <a href="https://drive.google.com/open?id=15e7NKracCbWxMJ0lwdimlw3sXmk7GVbi">Download SDK</a>  |
| 11.1  | 5.1  | arm, armv7, arm64  | <a href="https://drive.google.com/open?id=19Ixn4UQPx2CzCPCK7zyP3viT3_6Jf9RR">Download SDK</a>  |
| 11.1  |  5.1 |  x86_64, i386 | <a href="https://drive.google.com/open?id=1BWtXCAuCEUCwc_4Ow-Di7r1jYdTIEzjq">Download SDK</a>  |
| 11.2  | 5.1.2  | arm, armv7, arm64  | <a href="https://drive.google.com/file/d/1gXstJ9JPYx0qZZrfeg51eUkmRkCjsZPp">Download SDK</a>  |
| 11.2  |  5.1.2 |  x86_64, i386 | <a href="https://drive.google.com/open?id=1HaPF8Kxffa0Z6ubiUCOc20zqu4g1rRKV">Download SDK</a>  |


