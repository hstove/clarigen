---
'@clarigen/test': patch
---

When a validated response (ie with `txOk` or `rovOk`) returns an error, the error message now attempts to find a matching error key in the exception message.
