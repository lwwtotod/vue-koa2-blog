module.exports = app =>{
    const {router,controller} = app
    var adminauth = app.middleware.adminauth()
    router.get('/admin/index',controller.admin.main.index)
    router.get('/admin/getTypeInfo',adminauth ,controller.admin.main.getTypeInfo)
    router.post('/admin/addArticle',adminauth,controller.admin.main.addArticle)
    router.post('/admin/updateArticle',adminauth,controller.admin.main.updateArticle)
    router.get('/admin/getArticleList',adminauth,controller.admin.main.getArticleList)
    router.get('/admin/delArticle/:id',adminauth,controller.admin.main.delArticle)
    router.get('/admin/getArticleById/:id',adminauth,controller.admin.main.getArticleById)
    router.post('/admin/checkLogin',controller.admin.main.checkLogin)
    router.post('/admin/checkOpenId',controller.admin.main.checkOpenId)
    router.post('/admin/outLogin',adminauth,controller.admin.main.outLogin)
    router.post('/admin/addVideo',adminauth,controller.admin.main.addVideo)
    router.get('/admin/getListVideo',adminauth,controller.admin.main.getListVideo)
    router.get('/admin/delVideobyId/:id',adminauth,controller.admin.main.delVideobyId)
    router.post('/admin/updateIsTop',adminauth,controller.admin.main.updateIsTop)
}