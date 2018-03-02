import tablist from '../models/tabs.js'

const getTabslist = async function (ctx) {
    const result = await tablist.getTabsById() // 通过await “同步”地返回查询结果
    ctx.body = {
        success: true,
        result // 将请求的结果放到response的body里返回
    }
}

const createTabslist = async function (ctx) {
    const data = ctx.request.body
    const success = await tablist.createTabs(data)
    ctx.body = {
        success
    }
}

const removeTabsById = async function (ctx) {
  const id = ctx.request.body.id
  const success = await tablist.removeTabs(id)
  ctx.body = {
    success
  }
}

const updateTabsById = async function (ctx) {
  const id = ctx.request.body.id
  const name = ctx.request.body.name
  const success = await tablist.updateTabs(id, name)

  ctx.body = {
    success
  }
}

export default {
    getTabslist,
    createTabslist,
    removeTabsById,
    updateTabsById
}
