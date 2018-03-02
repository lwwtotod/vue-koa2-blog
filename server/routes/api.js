import tabs from '../controllers/tabs.js'
import article from '../controllers/article.js'
import koaRouter from 'koa-router'
const router = koaRouter()

router.get('/getTabsList', tabs.getTabslist)
router.post('/tabs/add', tabs.createTabslist)
router.post('/tabs/remove', tabs.removeTabsById)
router.post('/tabs/edit', tabs.updateTabsById)

router.get('/article/lists', article.getArticlelistAll)
router.post('/article/create', article.createArticleById)
router.post('/article/remove', article.removeArticleById)
router.post('/article/onePage', article.getArticleById)
router.post('/article/edit', article.updateArticleById)

export default router
