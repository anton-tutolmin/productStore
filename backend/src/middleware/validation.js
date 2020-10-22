async function validationMiddleware(ctx, next) {
  await next();
}

module.exports = {
  validationMiddleware,
};
