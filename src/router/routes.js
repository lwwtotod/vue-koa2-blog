//前端页面路由
import Front from '../components/web/Front.vue'
import Home from '../components/web/Home.vue'
import Tags from '../components/web/Tags.vue'
import About from '../components/web/About.vue'
import Article from '../components/web/Article.vue'
// 后端页面路由
import Reg from '../components/admin/Reg';
import Login from '../components/admin/Login';
import Admin from '../components/admin/Admin';
import ArticleCreate from '../components/admin/ArticleCreate'
import ArticleList from '../components/admin/ArticleList'
import ArticleEdit from '../components/admin/ArticleEdit'
import ClassList from '../components/admin/ClassList'
import NotFound from '../components/404.vue'
export default [
  {
    path: '/reg',
    component: Reg,
    meta: { auth: false },
    hidden: true
  },
  {
    path: '/login',
    component: Login,
    hidden: true
  },
  {
    path: '/',
    component: Front,
    hidden: true,
    children: [
      { path: '', redirect: 'home', meta: { auth: false } },
      { path: 'home', component: Home, meta: { auth: false } },
      { path: 'about', component: About, meta: { auth: false } },
      { path: 'tags', component: Tags, meta: { auth: false } },
      { path: 'article/:id', component: Article, meta: { auth: false, scrollToTop: true } },
    ]
  },
  {
    // 后台路由
    path: '/admin',
    component: Admin,
    name: '管理面板',
    iconCls: 'el-icon-message',
    children: [{
      // 文章列表单独一个组件(可以删除并且编辑，编辑的时候需要跳转到另一个路由)
      path: '',
      hidden: true,
      redirect: {
        name: '文章管理'
      }
    },
    {
      // 文章列表单独一个组件(可以删除并且编辑，编辑的时候需要跳转到另一个路由)
      path: 'articleList',
      component: ArticleList,
      name: '文章管理'
    },
    {
      // 创建文章单独一个组件
      path: 'articleCreate',
      component: ArticleCreate,
      name: '创建文章',
      hidden: true
    },
    {
      path: 'articleEdit/:id',
      component: ArticleEdit,
      hidden: true,
      name: "编辑文章"
    },
    {
      path: 'classList',
      component: ClassList,
      name: '分类管理'
      // 创建分类直接在分类列表里面出现弹层
    }
    ]
  },
  {
    path: '*', component: NotFound, hidden: true
  }

]
