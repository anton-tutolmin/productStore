const userTypeValidator = async (ctx, next) => {
  const type = ctx.request.body.userType;
  if (
    !type ||
    typeof type !== 'string' ||
    (type !== 'client' && type !== 'curier')
  ) {
    throw new Error('Not correct user type');
  }
  await next();
};

module.exports = {
  userTypeValidator,
};
