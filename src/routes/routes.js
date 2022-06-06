import combineRouters from "koa-combine-routers";
import PublicRouter from './publicRouter.js'
import loginRouter from './loginRouter.js'
// 整合所有的路由并导出
export default combineRouters(PublicRouter, loginRouter)