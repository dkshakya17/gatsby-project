---
title: Resources Guide| Cashfree
permalink: /resources/responsestatus
layout: guide
platform: resources
display_platform: RESOURCES
subtitle: Response Status
sortOrder: 6
---

# Response Status

Response from Cashfree could contain the following status messages. 

| Case                                 | event.name | event.status                                      |
|-------------------------------------|-----------|----------------------------------------------------|
| <code class="highlighter-rouge">Successful Payment</code>            | PAYMENT_RESPONSE      | SUCCESS      |
| <code class="highlighter-rouge">Payment Failed</code>            | PAYMENT_RESPONSE      | FAILED      |
| <code class="highlighter-rouge">Pending Payment</code>            | PAYMENT_RESPONSE      | PENDING      |
| <code class="highlighter-rouge">Payment cancelled by user</code>            | PAYMENT_RESPONSE      | CANCELLED      |
| <code class="highlighter-rouge">Payment successful but kept on hold by risk system</code>            | PAYMENT_RESPONSE      | FLAGGED      |
| <code class="highlighter-rouge">Invalid inputs</code>            | VALIDATION_ERROR      | -      |


