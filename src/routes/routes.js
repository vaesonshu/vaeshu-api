import combineRouters from "koa-combine-routers";
import PublicRouter from './publicRouter'
import loginRouter from './loginRouter'
// 整合所有的路由并导出
export default combineRouters(PublicRouter, loginRouter)