# winston-limit-transport

A logger transport for winston limiting same messages in logs.
Reducing your cost and readability in your loggers.

## Install
```
yarn add @redpill-paris/winston-limit-transport
```

## Configuration

```javascript
const winston = require('winston');
const WinstonLimit = require('@redpill-paris/winston-limit-transport');

const logger = winston.createLogger({
  level: 'debug',
  transports: [
    new WinstonLimit({
      timeout: 500, // time between two same logs
      transport: new winston.transports.Console({
        handleExceptions: true,
      }), // transport to be used if the log is not limited
    }),
  ],
});

logger.info('Logger init finish');
```

## TODO

 - Include metadata in the hash of the limiter(Only the message is compared to previous logs)
 - Emit to a stream when a log is limited