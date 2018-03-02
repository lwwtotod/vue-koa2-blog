import db from '../config/db.js' // 引入todolist的表结构
import uuid from 'uuid/v1'
const articleModel = '../schema/article.js'
const TestDb = db.Test // 引入数据库

const articlelist = TestDb.import(articleModel)

const getArticlelist = async function () {
    const Articlelist = await articlelist.findAll({ // 查找全部的todolist
        attributes: ['id', 'user_id', 'user_name', 'classification', 'content', 'Creation_time', 'founder'] // 只需返回这三个字段的结果即可
    })
    return Articlelist // 返回数据
}

const createArticle = async function (data) {
    let articleid = uuid();
    await articlelist.create({
        id: articleid,
        user_id: data.user_id,
        user_name: data.user_name,
        classification: data.classification,
        content: data.content,
        Creation_time: "2016-08-03 00:00:00",
        founder: data.founder,
    })
    return true
}

const removeArticle = async function (id) {
    const result = await articlelist.destroy({
        where: {
            id: id
        }
    })
    return result === 1 // 如果成功删除了记录，返回1，否则返回0
}

const getArticle = async function (id) { // 注意是async function 而不是function。对于需要等待promise结果的函数都需要async await。
    const userInfo = await articlelist.findOne({ // 用await控制异步操作，将返回的Promise对象里的数据返回出来。也就实现了“同步”的写法获取异步IO操作的数据
        where: {
            id: id
        }
    })
    return userInfo // 返回数据
}
const updateArticle = async function (data) {
    const result = await articlelist.update(
        {
            id: data.id,
            user_id: data.user_id,
            user_name: data.user_name,
            classification: data.classification,
            content: data.content,
            Creation_time: data.Creation_time,
            founder: data.founder,
        },
        {
            where: {
                id: data.id,
            }
        }
    )
    return result[0] === 1 // 返回一个数组，更新成功的条目为1否则为0。由于只更新一个条目，所以只返回一个元素
}

export default {
    getArticlelist,
    createArticle,
    removeArticle,
    getArticle,
    updateArticle
}
