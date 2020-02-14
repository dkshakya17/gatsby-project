---
title: Android Guide | Cashfree
permalink: /android/other-common
layout: guide
platform: android
display_platform: ANDROID
subtitle: Others
sortOrder: 10
---

# Other Common SDK functions

# setOrientation
```java
public void setOrientation(Context context, int val)
```
Choose the orientation (portrait or landscape) of the payment page. By default the payment page is shown in portrait orientation.

<b>Parameters:</b>
<ul>
  <li><code>val</code>: An integer value if this is zero the orientation will be portrait. Else it will be landscape </li>
  <li><code>context</code>: Context object of the calling activity is required for this method. In most of the cases this will mean sending the instance of the calling activity (this). </li>
</ul>


# setConfirmOnExit
```java
public void setConfirmOnExit(Context context, boolean confirmOnExit)
```
Choose whether or not the exit confirmation popup is shown when the user presses back on payment page. By default the popup is shown.

<b>Parameters:</b>
<ul>
  <li><code>context</code>: Context object of the calling activity is required for this method. In most of the cases this will mean sending the instance of the calling activity (this). </li>
  <li><code>confirmOnExit</code>: Value should be true if you want to show a confirmation popup on pressing back during payment. </li>
</ul>


