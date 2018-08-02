export default [{
    path: "/",
    redirect: "home",
    component: () =>
      import ("@/components/web/Home"),
    meta: {
      auth: false
    }
  },
  {
    path: "home",
    component: () =>
      import ("@/components/web/Home"),
    meta: {
      auth: false
    }
  },
  {
    path: "about",
    // component: About,
    component: () =>
      import ("@/components/web/About"),
    meta: {
      auth: false
    }
  },
  {
    path: "tags",
    // component: Tags,
    component: () =>
      import ("@/components/web/Tags"),
    meta: {
      auth: false
    }
  },
  {
    path: "article/:id",
    // component: Article,
    component: () =>
      import ("@/components/web/Article"),
    meta: {
      auth: false,
      scrollToTop: true
    }
  }
];
