import db from '../config/db.js' // 引入todolist的表结构
import uuid from 'uuid/v1'
const tabModel = '../schema/tabs.js'
const TestDb = db.Test // 引入数据库

const Tablist = TestDb.import(tabModel)

const getTabsById = async function () {
    const Tabslist = await Tablist.findAll({ // 查找全部的todolist
        attributes: ['id', 'article_id', 'name'] // 只需返回这三个字段的结果即可
    })

    return Tabslist // 返回数据
}

const createTabs = async function (data) {
    let tabid = uuid();
    await Tablist.create({
        id: tabid,
        article_id: 666,
        name: data.name
    })
    return true
}

const removeTabs = async function (id) {
  const result = await Tablist.destroy({
    where: {
      id: id
    }
  })
  return result === 1 // 如果成功删除了记录，返回1，否则返回0
}

const updateTabs = async function (id, name) {
  const result = await Tablist.update(
    {
      name
    },
    {
      where: {
        id,
      }
    }
  )
  return result[0] === 1 // 返回一个数组，更新成功的条目为1否则为0。由于只更新一个条目，所以只返回一个元素
}

export default {
    getTabsById,
    createTabs,
    removeTabs,
    updateTabs
}
