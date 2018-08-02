import Vue from "vue";
import VueRouter from "vue-router";
import signUp from './../view/back-end/sign-up'
import signIn from './../view/back-end/sign-in'
Vue.use(VueRouter);

//路由滚动行为
const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition;
  } else {
    return { x: 0, y: 0 };
  }
};

export default new VueRouter({
  mode: "history", //HTML5 History 模式
  routes: [
    //注册
    {
      path: "/login",
      component: signUp,
      meta: { auth: false },
      hidden: true
    },
    //登录
    {
      path: "/signin",
      component: signIn,
      hidden: true
    }
  ],
  scrollBehavior
});
