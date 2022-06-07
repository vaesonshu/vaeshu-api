export default (ctx, next) => {
  return next().catch((err) => {
    if(401 == err.status) {
      ctx.status = 401
      ctx.body = {
        code: 401,
        msg: '用户没有权限'
      }
    } else {
      ctx.status = err.status || 500
      ctx.body = {
        code: 500,
        msg: err.message
      }
    }
  })
}