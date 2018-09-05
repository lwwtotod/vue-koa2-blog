import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

//路由滚动行为
const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition
  } else {
    return {
      x: 0,
      y: 0
    }
  }
}

export default new VueRouter({
  //HTML5 History 模式
  mode: 'history',
  routes: [
    // Admin signIn
    {
      path: '/signup',
      component: () => import('@/views/admin/components/sign-up'),
      meta: {
        auth: false
      },
      hidden: true
    },
    // Admin login
    {
      path: '/login',
      component: () => import('@/views/admin/components/sign-in'),
      hidden: true
    },
    {
      // Admin pages
      path: '/admin',
      component: () => import('@/views/admin'),
      name: 'Home',
      children: [
        {
          path: '',
          hidden: true,
          redirect: {
            name: '文章管理'
          }
        },
        {
          path: 'articleList',
          component: () => import('@/views/admin/components/ArticleList'),
          name: '文章管理',
          icon: 'ios-albums-outline'
        },
        {
          path: 'articleCreate',
          component: () => import('@/views/admin/components/ArticleEdit'),
          name: '创建文章',
          hidden: true
        },
        {
          path: 'articleEdit/:id',
          component: () => import('@/views/admin/components/ArticleEdit'),
          hidden: true,
          name: '编辑文章'
        },
        {
          path: 'classList',
          component: () => import('@/views/admin/components/ClassList'),
          name: '分类管理',
          icon: 'ios-albums-outline'
        }
      ]
    },
    //blogs pages
    {
      path: '/',
      component: () => import('@/views/blogs/main'),
      hidden: true,
      children: [
        {
          path: '/',
          redirect: 'home'
        },
        {
          path: 'home',
          component: () => import('@/components/home'),
          meta: {
            auth: false
          }
        },
        {
          path: 'about',
          component: () => import('@/components/about'),
          meta: {
            auth: false
          }
        },
        {
          path: 'tags',
          component: () => import('@/components/tags'),
          meta: {
            auth: false
          }
        },
        {
          path: 'article/:id',
          component: () => import('@/components/article'),
          meta: {
            auth: false,
            scrollToTop: true
          }
        }
      ]
    },
    {
      path: '*',
      component: () => import('@/views/error/404.vue'),
      hidden: true
    }
  ],
  scrollBehavior
})
