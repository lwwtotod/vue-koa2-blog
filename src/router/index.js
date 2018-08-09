import Vue from "vue";
import VueRouter from "vue-router";
import frontRouter from "./routers/front.js"
import backRouter from './routers/back'

Vue.use(VueRouter);

//路由滚动行为
const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition;
  } else {
    return {
      x: 0,
      y: 0
    };
  }
};

export default new VueRouter({
  mode: "history", //HTML5 History 模式
  routes: [
    // 注册
    {
      path: "/signup",
      component: () =>
        import ('@/view/back-end/sign-up'),
      meta: {
        auth: false
      },
      hidden: true
    },
    // 登录 
    {
      path: "/login",
      component: () =>
        import ('@/view/back-end/sign-in'),
      hidden: true
    },
    {
      path: "/",
      component: () =>
        import ('@/components/web/Front.vue'),
      hidden: true,
      children: frontRouter

    },
    {
      // 后台路由
      path: "/admin",
      component: () =>
        // import ('@/components/admin/Admin'),
        import ('@/view/back-end/Main'),
      name: "Home",
      // iconCls: "el-icon-message",
      children: backRouter

    },
    {
      path: "*",
      component: () =>
        import ('@/view/error-page/404.vue'),
      hidden: true
    }
  ],
  scrollBehavior
});
