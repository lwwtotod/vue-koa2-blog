import auth from '../controllers/user.js'
import koaRouter from 'koa-router'
const router = koaRouter()

router.get('/user/:id', auth.getUserInfo) // 定义url的参数是id
router.post('/user', auth.postUserAuth)
router.post('/reg', auth.postUserReg)
export default router
