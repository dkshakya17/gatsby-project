---
title: Subscription| Cashfree
permalink: /subscription/appendix-2
layout: guide
platform: subscription
display_platform: SUBSCRIPTION
subtitle: appendix-2
sortOrder: 11
---


# Appendix 2

Please use the following examples as illustrations for how to generate signature. If the language you are using is not mentioned here please contact us at support@cashfree.com.

## Pseudo Code

```
data = "";
iterate keys as key in POST request alphabetically:
  if (key starts with "cf_"):
    data = data + key + POST[key]
computedSignature = base64 of (hash of (data) with secretKey as hashKey)
if (computedSignature != POST["signature"]):
  // An invalid/fraud request do not mark subscription as successfull
```



#BEGIN_CODE

```php

<?php
  $data = "";
  $postData = $_POST;
  ksort($postData);
  foreach ($postData as $key => $value) {
    if (substr($key, 0, 3) == "cf_") {
      $data .= $key . $value;
} }
  $hash_hmac = hash_hmac('sha256', $data, $secretkey, true) ;
  $computedSignature = base64_encode($hash_hmac);
  if ($postData["signature"] != $computedSignature) {
    // An invalid/fraud request do not mark subscription as successfull
  }
?>
```


```java
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import javax.servlet.*;
import javax.servlet.http.*;
import java.io.*;
import java.util.*;
public class ChecksumServlet extends HttpServlet {
  @Override
  protected void doPost(HttpServletRequest request, HttpServletResponse
response) throws ServletException, IOException {
    try {
      String secretKey = "ac7960e7995536f0177fd210f3b3937fc2d974a4";
      Map<String, String[]> postData = request.getParameterMap();
      // ensuring appId gets initialized
      String data = "";
      SortedSet<String> keys = new TreeSet<String>(postData.keySet());
      for (String key : keys) {
        if ((key.length() > 3) && (key.substring(0, 3).equals("cf_"))) {
          data = data + key + ((String[])postData.get(key))[0];
}
}
      Mac sha256_HMAC = Mac.getInstance("HmacSHA256");
      SecretKeySpec secret_key_spec = new
SecretKeySpec(secretKey.getBytes(),"HmacSHA256");
      sha256_HMAC.init(secret_key_spec);
      String computedSignature =
Base64.getEncoder().encodeToString(sha256_HMAC.doFinal(data.getBytes()));
      if (!computedSignature.equals(postData.get("signature"))) {
        // An invalid/fraud request do not mark subscription as successfull
} }
    catch (Exception ex) {
      // handle
} }
}

```
#END_CODE

