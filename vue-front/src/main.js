// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import './assets/css/commen.css';
import Axios from 'axios'

// Vue.prototype.$http = Axios // 类似于vue-resource的调用方法，之后可以在实例里直接用this.$http.get()
Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(nprogress)
/* eslint-disable no-new */
// router.beforeEach(({ meta, path }, from, next) => {
//   store.dispatch('showProgress', 0)
//   let { auth = true } = meta
//   let isLogin = Boolean(store.state.token)
//   /*
//       访问不需要权限的设置meta:false
//       注册也要设置成meta:false
//   */
//   if (auth && !isLogin && path !== '/login') {
//     return next({ path: '/login' })
//   }
//   // 如果登录了以后再访问reg和login则路由到Home
//   if (isLogin && (path == '/login' || path == '/reg')) {
//     return next({ path: '/admin' });
//   }
//   // 未登录的情况下访问reg则直接路由
//   next();
// })

new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
