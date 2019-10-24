import tabs from '../controllers/tabs.js.js'
import article from '../controllers/article.js.js'
import auth from '../controllers/user.js.js'
import koaRouter from 'koa-router'
const router = koaRouter()

// router.get('/user/:id', auth.getUserInfo) // 定义url的参数是id
router.get('/getTabsList', tabs.getTabslist)
router.get('/article/lists', article.getArticlelistAll)
router.post('/article/onePage', article.getArticleById)


router.post('/userLogin', auth.postUserLogin)
router.post('/userReg', auth.postUserReg)
export default router
// 不走jwt验证的模块