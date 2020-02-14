---
title: iOS Developer Guide | Cashfree
permalink: /ios/running
layout: guide
platform: ios
display_platform: iOS
subtitle: Running your App
sortOrder: 6
---

# Running your App

The CFSDK Dynamic Framework works on iOS 10 and above.

If you are any facing issues with the integration, please send us an <a href="mailto:techsupport@cashfree.com" target="_blank">email</a> or reach us on the Chat on our [homepage](https://www.cashfree.com)

# Test Credentials

| Parameter                                 | Required | Description                                      |
|-------------------------------------|-----------|----------------------------------------------------|
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">Card Number</span></code>            | Yes      | 4111111111111111      |
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">Card Holder</span></code> | Yes       | Test  |
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">Expiry Month</span></code> | Yes       | 10      |
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">Expiry Year</span></code>            | Yes       | 22                                |
| <code class="highlighter-rouge"><span class="custom-parse-server-mount">CVV/CVC</span></code> | Yes    | 123     |

# FAQS

1. How to set orientation for the CFViewController?
</br>
 This code should be put in the AppDelegate class of the calling application. 

```swift
//If the flag is off, Only portrait mode is supported.
internal var shouldRotate = true
func application(_ application: UIApplication, supportedInterfaceOrientationsFor window: UIWindow?) -> UIInterfaceOrientationMask {
    return shouldRotate ? .allButUpsideDown : .portrait
}
```
