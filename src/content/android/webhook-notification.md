---
title: Android Guide | Cashfree
permalink: /android/webhook-notification
layout: guide
platform: android
display_platform: ANDROID
subtitle: Webhook Notification
sortOrder: 11
---

# Webhook Notification


We send a notification from our backend to your backend whenever an order is successful. This is useful in cases where the user internet connection breaks after payment. This will allow you to reconcile all the successful orders on your end. The notification will be sent to notifyUrl which is specified at order creation. The parameters sent in notification are described [here](/android/request-params) .

To specify notifyUrl just add it alongside other parameters (orderId, orderAmount etc.) like the following:

```java
params.put(PARAM_NOTIFY_URL, "https://example.com/path/to/notify/url/");
```

Please make a note of the following:
<ul>
  <li>Notification can take upto one minute to hit your server after payment.</li>
  <li>Notifications are sent only in the case of successful payments. Failed or pending payments wont lead to a notification being sent.</li>
  <li>There might be cases where we send the same notification two or more times. It is recommended to rely on the first notification for reconciliation and silently ignore any subsequent notifications.</li>
</ul>


