// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'
import store from './vuex/index'
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
router.beforeEach((to, from, next) => {
  nprogress.start();
  const token = sessionStorage.getItem('jwt');
  if (to.path == '/login') {
    if (token != 'null' && token != null) {
      next('/admin')
    }
    next();
  } else {
    if (token != 'null' && token != null) {
        Axios.defaults.headers.common['Authorization'] = 'Bearer ' + token; // 全局设定header的token验证，注意Bearer后有个空格
      next()
    } else {
      next()
    }
  }
})

router.afterEach(transition => {
  nprogress.done()
})


new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
