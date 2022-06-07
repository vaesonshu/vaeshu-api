import Koa from 'koa'
import JWT from 'koa-jwt'
import Router from'koa-router'
import helmet from 'koa-helmet'
import statics from 'koa-static'
import router from './routes/routes.js'
import koaBody from 'koa-body'
import jsonutil from 'koa-json'
import compose from 'koa-compose'
import compress from 'koa-compress'
import config from './config/index'
import errorhandle from './common/ErrorHandle'
const app = new Koa()
const cors = require('@koa/cors') // koa2处理跨域问题

// 演示async await
// router.get('/async', async (ctx) => {
//   let result = await new Promise((resolve) => {
//     setTimeout(function () {
//       resolve('Hello world 2s later')
//     }, 2000)
//   })
//   ctx.body = result
// })

// router.post('/post', async (ctx) => {
//   let { body } = ctx.request
//   console.log(body)
//   console.log(ctx.request)
//   ctx.body = {
//     ...body
//   }
// })

const isDevMode = process.env.NODE_ENV === 'production' ? false : true
// 定义公共路径，不需要jwt鉴权
const jwt = JWT({secret: config.JWT_SECRET}).unless({ path: [/^\/public/, /\/login/] })
// 使用koa-compose 集成中间件
const middleware = compose([
  koaBody(),
  cors(),
  jsonutil({ pretty: false, param: 'pretty'}),
  helmet(),
  errorhandle,
  jwt
])

if(!isDevMode) {
  app.use(compress())
}
app.use(middleware)
app.use(router())
app.listen(3001)