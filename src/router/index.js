import Vue from "vue";
import VueRouter from "vue-router";

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
  //HTML5 History 模式
  mode: "history", 
  routes: [
    // Admin signIn
    {
      path: "/signup",
      component: () =>
        import ('@/view/admin/sign-up'),
      meta: {
        auth: false
      },
      hidden: true
    },
    // Admin login
    {
      path: "/login",
      component: () =>
        import ('@/view/admin/sign-in'),
      hidden: true
    },
    {
      // Admin pages
      path: "/admin",
      component: () =>
        import ('@/view/admin/main'),
      name: "Home",
      children: [{
          path: "",
          hidden: true,
          redirect: {
            name: "文章管理"
          }
        },
        {
          path: "articleList",
          component: () =>
            import ('@/view/admin/main/components/ArticleList'),
          name: "文章管理",
          icon: "ios-albums-outline"
        },
        {
          path: "articleCreate",
          component: () =>
            import ('@/view/admin/main/components/ArticleEdit'),
          name: "创建文章",
          hidden: true
        },
        {
          path: "articleEdit/:id",
          component: () =>
            import ('@/view/admin/main/components/ArticleEdit'),
          hidden: true,
          name: "编辑文章"
        },
        {
          path: "classList",
          component: () =>
            import ('@/view/admin/main/components/ClassList'),
          name: "分类管理",
          icon: "ios-albums-outline"
        }
      ]
    },
    //blogs pages
    {
      path: "/",
      component: () =>
        import ('@/view/blogs/main'),
      hidden: true,
      children: [{
          path: "/",
          redirect: "home",
        },
        {
          path: "home",
          component: () =>
            import ("@/components/home"),
          meta: {
            auth: false
          }
        },
        {
          path: "about",
          component: () =>
            import ("@/components/About"),
          meta: {
            auth: false
          }
        },
        {
          path: "tags",
          component: () =>
            import ("@/components/tags"),
          meta: {
            auth: false
          }
        },
        {
          path: "article/:id",
          component: () =>
            import ("@/components/Article"),
          meta: {
            auth: false,
            scrollToTop: true
          }
        }
      ]
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
