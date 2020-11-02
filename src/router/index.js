import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/views/Layout/layout.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login",
    meta: { name: "主页" },
    hidden: true
  },
  {
    path: "/login",
    name: "Login",
    meta: { name: "登录" },
    hidden: true,
    component: () => import("../views/Login/index.vue")
  },
  {
    path: "/console",
    name: "Layout",
    redirect: "Index",
    meta: { name: "控制台", icon: "iconfont icon-kongzhitai" },
    component: Layout,
    children: [
      {
        path: "/index",
        name: "Index",
        component: () => import("../views/Console/console.vue"),
        meta: { name: "首页" }
      }
    ]
  },
  {
    path: "/infoManage",
    name: "InfoManage",
    meta: { name: "信息管理", icon: "iconfont icon-xinxiguanli" },
    component: Layout,
    children: [
      {
        path: "/infoList",
        name: "InfoList",
        component: () => import("../views/Info/infoList.vue"),
        meta: { name: "信息列表" }
      },
      {
        path: "/infoCategory",
        name: "InfoCategory",
        component: () => import("../views/Info/infoCategory.vue"),
        meta: { name: "信息分类" }
      }
    ]
  },
  {
    path: "/userManage",
    name: "UserManage",
    meta: { name: "用户管理", icon: "iconfont icon-yonghuguanli" },
    component: Layout,
    children: [
      {
        path: "/userList",
        name: "UserList",
        component: () => import("../views/User/userList.vue"),
        meta: { name: "用户列表" }
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
