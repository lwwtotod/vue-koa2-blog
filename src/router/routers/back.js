export default [{
    path: "",
    hidden: true,
    redirect: {
      name: "文章管理"
    }
  },
  {
    path: "articleList",
    component: () =>
      // import ('@/components/admin/ArticleList'),
      import ('@/view/back-end/Main/Components/ArticleList'),
    name: "文章管理",
    icon: "ios-albums-outline"
  },
  {
    path: "articleCreate",
    component: () =>
      import ('@/components/admin/articleCreate'),
    name: "创建文章",
    hidden: true
  },
  {
    path: "articleEdit/:id",
    component: () =>
      import ('@/components/admin/ArticleEdit'),
    hidden: true,
    name: "编辑文章"
  },
  {
    path: "classList",
    component: () =>
      import ('@/components/admin/ClassList'),
    name: "分类管理",
    icon: "ios-albums-outline"
  }
];
