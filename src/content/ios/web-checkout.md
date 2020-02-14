---
title: iOS Developer Guide | Cashfree
permalink: /ios/web-checkout
layout: guide
platform: ios
display_platform: iOS
subtitle: Web Checkout
sortOrder: 3
---

# Webview Checkout

When integrating our iOS SDK, the invoking `UIViewController` should be embedded inside a `UINavigationController`. If your UIViewController is inside a `UITabBarController` you should embed the `UIViewController` inside a `UINavigationController`

# Step 1: Import the SDK
```swift
import CFSDK
```

# Step 2: Input Params Dictionary

Once you generate the <a href="token-generation" target="_blank">token </a> from server. Create the input params dictionary with the following values

<aside class='notice'> The order details sent from the server should match the values sent from the app to SDK otherwise you'll see this error <b>"Invalid order data"</b></aside> 


```swift
func getPaymentParams() -> Dictionary<String, String> {
    return [
        "orderId": "Order100003",
        "tokenData" : "Wm9JCN4MzUIJiOicGbhJCLiQ1VKJiOiAXe0Jye.Y90nIwETYzMWOxcjMygDZ1IiOiQHbhN3XiwyN3cjMwQTM3UTM6ICc4VmIsIiUOlkI6ISej5WZyJXdDJXZkJ3biwSM6ICduV3btFkclRmcvJCLiMDMwADMxIXZkJ3TiojIklkclRmcvJye.chqKQ6dsBcOPWt5nXyYdjcftSD_W1hwIJQ6lsWqNjo_s0-ug4fKsI8dPqO6KxQr_fq",
        "orderAmount": "1",
        "customerName": "Arjun",
        "orderNote": "Order Note",
        "orderCurrency": "INR",
        "customerPhone": "9012341234",
        "customerEmail": "sample@gmail.com",
        "notifyUrl": "https://test.gocashfree.com/notify"
    ]
}

```

# Step 3 : Create CFViewController
Create an object of CFViewController from the SDK and push it to the NavigationController. Set the `env`(env can be either be <b>TEST or PROD</b>) and `appId`
<aside class="notice">You can find your <b>appId</b> and <b>secret key</b> from the merchant dashboard <a href="https://merchant.cashfree.com/merchant/pg#api-key">linked here </a></aside>



```swift
let cashfreeVC = CFViewController(params: getPaymentParams(), appId: self.appId, env: self.environment, callBack: self)
self.navigationController?.pushViewController(cashfreeVC, animated: true)
```

# Step 4 : Result Delegate
Once the payment is done, you’ll get a response in your ResultDelegate implementation


```swift
extension ViewController: ResultDelegate {
    func onPaymentCompletion(msg: String) {
        print("Result Delegate : onPaymentCompletion")
        print(msg)
        // Handle the result here
    }
}

```

