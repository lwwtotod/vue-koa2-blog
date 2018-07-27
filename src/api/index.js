// 各种api
// 负责用instance和服务端进行交互

import axios from 'axios';
import store from '../vuex'
const instance = axios.create();
// const front_instance = axios.create();
instance.defaults.headers.post['Content-Type'] = 'application/json'
if (sessionStorage.getItem('jwt')) {
  /* sessionStorage.getItem('jwt')是带引号的字符串
    Bearer token(通过Authorization头部字段发送到服务端便于验证)的格式：Bearer XXXXXXXXXX
  */
 console.log(11111)
 instance.defaults.headers.common['Authorization'] = "Bearer "+sessionStorage.getItem('jwt')
}else{
  console.log(22222)
}
// axios拦截请求
// axios.interceptors.request.use = instance.interceptors.request.use = front_instance.interceptors.request.use
// front_instance.interceptors.request.use(config => {
//   store.dispatch('showProgress', 20)
//   return config
// }, err => {
//   // store.dispatch('showProgress',100)
//   return Promise.reject(err)
// })
// // axios拦截响应
// front_instance.interceptors.response.use(response => {
//   store.dispatch('showProgress', 100)
//   return response
// }, err => {
//   store.dispatch('showProgress', 100)
//   return Promise.reject(err)
// })
export default {
  // 注册
  localReg(data) {
    return axios.post('/auth/userReg', data)
  },
  // 登录
  localLogin(data) {
    return axios.post('/auth/userLogin', data)
  },
  // //获取文章列表{不带分页获取}
  getArticleList() {
    return instance.get('/api/article/lists');
  },
  // // 不带分页获取文章
  // getArticleLists(params) {
  //   return front_instance.post('/api/article/articleLists', params);
  // },
  // // 根据classify获取文章列表
  // getArticlesByClassify(params) {
  //   return front_instance.post('/api/article/noAuthArtilcelists', params);
  // },
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
    return instance.post('/api/article/onePage', params);
  },
  // // 根据postID获取一篇文章(不带权限)
  // getOneArticleNoAuth(params) {
  //   return front_instance.post('/api/article/noAuth', params);
  // },
  // // 编辑一篇文章
  editArticle(params) {
    return instance.post('/api/article/edit', params);
  },
  // 获取分类列表
  getClassify() {
    return instance.get('/api/getTabsList');
  },
  // getNoAuthClass() {
  //   return front_instance.get('/api/classify/noAuth');
  // },

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
