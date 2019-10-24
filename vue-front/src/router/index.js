import Vue from "vue";
import VueRouter from "vue-router";
import frontRouter from "./routers/front.js"
import backRouter from './routers/back'
// import signUp from "./../view/back-end/sign-up";
// import signIn from "./../view/back-end/sign-in";

//前端页面路由
// import Front from "../components/web/Front.vue";
// import Home from "../components/web/Home.vue";
// import Tags from "../components/web/Tags.vue";
// import About from "../components/web/About.vue";
// import Article from "../components/web/Article.vue";
// 后端页面路由
// import Admin from "../components/admin/Admin";
// import ArticleCreate from "../components/admin/ArticleCreate";
// import ArticleList from "../components/admin/ArticleList";
// import ArticleEdit from "../components/admin/ArticleEdit";
// import ClassList from "../components/admin/ClassList";
// import NotFound from "../components/404.vue";
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
    //注册
    // {
    //     path: "/signup",
    //     component: signUp,
    //     meta: { auth: false },
    //     hidden: true
    // },
    //登录
    // {
    //     path: "/login",
    //     component: signIn,
    //     hidden: true
    // },
    {
      path: "/",
      component: () =>
        import ('@/components/web/Front.vue'),
      // redirect: '/home',
      hidden: true,
      children: frontRouter

    },
    {
      // 后台路由
      path: "/admin",
      component: () =>
        import ('@/components/admin/Admin'),
      name: "管理面板",
      iconCls: "el-icon-message",
      children: backRouter

    },
    // {
    //   path: "*",
    //   component: NotFound,
    //   hidden: true
    // }
  ],
  scrollBehavior
});
