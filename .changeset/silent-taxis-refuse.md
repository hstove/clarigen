---
'@clarigen/core': patch
---

Fixes a bug when parsing JS-based inputs when the ABI type is a response. This would happen when calling a function where one of the arguments is a response.
