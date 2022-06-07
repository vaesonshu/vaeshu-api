import Router from 'koa-router'
import publicController from '../api/PublicController.js'

const router = new Router()
router.prefix('/public')
router.get('/getCaptcha', publicController.getCaptcha)

export default router