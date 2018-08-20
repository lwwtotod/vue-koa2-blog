import Vue from "vue";
import VueRouter from "vue-router";
import frontRouter from "./routers/front"
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
        import ('@/view/admin/sign-up'),
      meta: {
        auth: false
      },
      hidden: true
    },
    // 登录 
    {
      path: "/login",
      component: () =>
        import ('@/view/admin/sign-in'),
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
        import ('@/view/admin/main'),
      name: "Home",
      children: backRouter

    },
    {
      path: "*",
      component: () =>
        import ('@/view/error/404.vue'),
      hidden: true
    }
  ],
  scrollBehavior
});
