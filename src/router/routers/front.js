export default [{
    path: "/",
    redirect: "home",
    component: () =>
      import ("@/components/home"),
    meta: {
      auth: false
    }
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
      import ("@/components/web/Article"),
    meta: {
      auth: false,
      scrollToTop: true
    }
  }
];
