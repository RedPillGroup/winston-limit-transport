const Transport = require('winston-transport');
const hash = require('object-hash');

class WinstonLimit extends Transport {
  constructor(options) {
    super(options);

    const transportOptions = { ...options };
    delete transportOptions.Transport;
    delete transportOptions.timeout;

    this.timeout = options.timeout || 15000;
    this.lastLogs = {};
    this.logger = options.transport;
  }

  log(info, callback) {
    setImmediate(() => {
      this.emit('logged', info);
    });

    if (!callback) {
      callback = () => {};
    }
    const { message } = info;
    const logHash = hash({ message });
    const now = Date.now();
    const previousLog = this.lastLogs[logHash];
    if (!previousLog || now > (previousLog + this.timeout)) {
      this.lastLogs[logHash] = now;
      this.logger.log(info);
      setTimeout(() => {
        delete this.lastLogs[logHash];
      }, this.timeout);
      return callback(null, true);
    }
    return callback(null, true);
  }
}

module.exports = WinstonLimit;
