const pino = require('pino')();

const logger = async (ctx, next) => {
  pino.info({ url: ctx.request.url, method: ctx.request.method });
  await next();
  pino.info('REQUEST COMPLETED');
};

module.exports = logger;
