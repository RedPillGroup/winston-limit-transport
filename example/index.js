const winston = require('winston');
const WinstonLimit = require('../');

const logger = winston.createLogger({
  level: 'debug',
  transports: [
    new WinstonLimit({
      timeout: 500,
      transport: new winston.transports.Console({
        handleExceptions: true,
      }),
    }),
  ],
});

logger.info('Logger init finish');

const mainTest = () => {
  const logNumber = 10000;
  for (let i = 0; i < logNumber; i += 1) {
    logger.debug('This log will be limited');
    logger.info('This info log is limited too');
  }
};

mainTest();
