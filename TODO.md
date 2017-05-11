- add functionality for retrieving all titles, without need for refresh, but with progress events (new CustomEvent)
- add functions for querying on metadata (author, title, date) on downloaded titles

# Addendum 2017
Kindle has got a vastly improved admin page, that now supports easier deletion facilities. Still leaves some to be desired, though, like a "Delete all" checkmark, but it lets you filter on titles at least. It is 99% feature complete of what I had envisioned for a standalone utility. 

## New API
The 2017 version uses a new API. The old one still works, but this supports bulk deletes:

POST sent to `https://www.amazon.com/mn/dcw/myx/ajax-activity/ref=myx_ajax` with this payload to delete three titles:
```
data:{"param":{"DeleteContent":{"asinDetails":{"3RSCWFGCUIZ3LD2EEROJUI6M5X63RAE2":{"category":"KindlePDoc"},"375SVWE22FINQY3FZNGIIDRBZISBGJTD":{"category":"KindlePDoc"},"4KMPV2CIWUACT4QHQPETLHCVTWEJIM4N":{"category":"KindlePDoc"}}}}}
csrfToken:gEABCzVR2QsRk3F2QVkLcdKuQzYCPcpGkFNte0SAAAAAJAAAAAFkUgW5yYXcAAAAA
```

Unsure how the CSRF token is created, so not sure if I am able to use the API.
