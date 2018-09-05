// api
// 负责用instance和服务端进行交互

import axios from 'axios';
import store from '@/store'
const instance = axios.create({
  // baseURL: 'https://api.example.com',
});
instance.defaults.headers.post['Content-Type'] = 'application/json'
// instance.defaults.baseURL = 'https://api.example.com';
/* sessionStorage.getItem('jwt')是带引号的字符串
    Bearer token(通过Authorization头部字段发送到服务端便于验证)的格式：Bearer XXXXXXXXXX
  */
if (sessionStorage.getItem('jwt')) {
  instance.defaults.headers.common['Authorization'] = "Bearer " + sessionStorage.getItem('jwt')
}
// axios拦截请求
instance.interceptors.request.use(config => {
  store.dispatch('showProgress', 20)
  return config
}, err => {
  store.dispatch('showProgress', 100)
  return Promise.reject(err)
})
// axios拦截响应
instance.interceptors.response.use(response => {
  store.dispatch('showProgress', 100)
  return response
}, err => {
  store.dispatch('showProgress', 100)
  return Promise.reject(err)
})
export default {
  // 注册
  localReg(data) {
    return instance.post('/auth/userReg', data)
  },
  // 登录
  localLogin(data) {
    return instance.post('/auth/userLogin', data)
  },
  // //获取文章列表{不带分页获取}
  getArticleList(params) {
    return instance.post('/auth/article/lists',params);
  },
  getArticleListByTag(params) {
    return instance.post('/auth/article/getListByTag',params);
  },
  // // 创建文章
  createArticle(params) {
    return instance.post('/api/article/create', params);
  },
  // // 删除一篇文章
  removeOneArticle(params) {
    return instance.post('/api/article/remove', params);
  },
  // // 根据postID获取一篇文章(带权限)
  getOneArticle(params) {
    return instance.post('/auth/article/onePage', params);
  },
  // // 编辑一篇文章
  editArticle(params) {
    return instance.post('/api/article/edit', params);
  },
  // 获取分类列表
  getClassify() {
    return instance.get('/auth/getTabsList');
  },

  // // 删除某一个分类
  removeClassifyList(params) {
    return instance.post('/api/tabs/remove', params);
  },
  // 添加分类
  addClassify(params) {
    return instance.post('/api/tabs/add', params);
  },

  // // 编辑分类
  editClassfy(params) {
    return instance.post('/api/tabs/edit', params);
  }
}
