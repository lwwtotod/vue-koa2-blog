import user from '../models/user.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const getUserInfo = async function (ctx) {
  const id = ctx.params.id // 获取url里传过来的参数里的id
  const result = await user.getUserById(id) // 通过await “同步”地返回查询结果
  ctx.body = result // 将请求的结果放到response的body里返回
}

const postUserLogin = async function (ctx) {
  const data = ctx.request.body // post过来的数据存在request.body里
  console.log(ctx.request.body)
  const userInfo = await user.getUserByName(data.username)
  console.log(userInfo)
  if (userInfo != null) { // 如果查无此用户会返回null
    if (!bcrypt.compareSync(data.password, userInfo.password)) {
      ctx.body = {
        success: false, // success标志位是方便前端判断返回是正确与否
        info: '密码错误！'
      }
    } else {
      const userToken = {
        name: userInfo.user_name,
        id: userInfo.id
      }
      const secret = 'jwtsss' // 指定密钥
      const token = jwt.sign(userToken, secret) // 签发token
      ctx.body = {
        success: true,
        token: token // 返回token
      }
    }
  } else {
    ctx.body = {
      success: false,
      info: '用户不存在' // 如果用户不存在返回用户不存在
    }
  }
}
// 用户注册
const postUserReg = async function (ctx) {
  console.log(ctx)
  const data = ctx.request.body
  const success = await user.createUser(data)
  ctx.body = {
    success
  }
}

export default {
  getUserInfo,
  postUserLogin,
  postUserReg
}
