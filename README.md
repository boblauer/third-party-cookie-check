# third-party-cookie-check
A simple way to check for third party cookie support.

### Warning

This module can be imported on the server and in a browser without issue, but it will likely throw an error if you call the function on the server.

You know your environment better than I do, so I leave it to you to ensure your code is running in a browser before calling this module.

### Installation

```
npm install third-party-cookie-check
```

### Usage
```
import cookieCheck from 'third-party-cookie-check';

const thirdPartyCookiesSupported = await cookieCheck();
```