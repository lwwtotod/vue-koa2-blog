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
      import ('@/view/admin/main/components/ArticleList'),
    name: "文章管理",
    icon: "ios-albums-outline"
  },
  {
    path: "articleCreate",
    component: () =>
      // import ('@/components/admin/articleCreate'),
      import ('@/view/admin/main/components/ArticleEdit'),
    name: "创建文章",
    hidden: true
  },
  {
    path: "articleEdit/:id",
    component: () =>
      // import ('@/components/admin/ArticleEdit'),
      import ('@/view/admin/main/components/ArticleEdit'),
    hidden: true,
    name: "编辑文章"
  },
  {
    path: "classList",
    component: () =>
      // import ('@/components/admin/ClassList'),
      import ('@/view/admin/main/components/ClassList'),
    name: "分类管理",
    icon: "ios-albums-outline"
  }
];
