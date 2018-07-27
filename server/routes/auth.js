import auth from '../controllers/user.js'
import koaRouter from 'koa-router'
const router = koaRouter()

// router.get('/user/:id', auth.getUserInfo) // 定义url的参数是id
router.post('/userLogin', auth.postUserLogin)
router.post('/userReg', auth.postUserReg)
export default router
