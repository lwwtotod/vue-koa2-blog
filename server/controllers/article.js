import articlelist from '../models/article.js'

const getArticlelistAll = async function (ctx) {
    const result = await articlelist.getArticlelist() // 通过await “同步”地返回查询结果
    ctx.body = {
        success: true,
        result // 将请求的结果放到response的body里返回
    }
}

const createArticleById = async function (ctx) {
    const data = ctx.request.body
    const success = await articlelist.createArticle(data)
    ctx.body = {
        success
    }
}

const removeArticleById = async function (ctx) {
    const id = ctx.request.body.id
    const success = await articlelist.removeArticle(id)
    ctx.body = {
        success
    }
}
const getArticleById = async function (ctx) {
    const id = ctx.request.body.id
    const result = await articlelist.getArticle(id) // 通过await “同步”地返回查询结果
    ctx.body = result // 将请求的结果放到response的body里返回
}
const updateArticleById = async function (ctx) {
  const data = ctx.request.body
  const success = await articlelist.updateArticle(data)
  ctx.body = {
    success
  }
}

export default {
    getArticlelistAll,
    createArticleById,
    removeArticleById,
    getArticleById,
    updateArticleById
}
