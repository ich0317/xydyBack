import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true
  },
  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true
  },
  {
    path: "/",
    component: Layout,
    redirect: "/cinema-list",
    name: "college-manage",
    meta: { title: "影院管理", icon: "" },
    children: [
      // {
      //   path: "college-list",
      //   name: "college-list",
      //   component: () => import("@/views/cinema-manage/college-list/index"),
      //   meta: { title: "影院列表"}
      // },
      {
        path: "cinema-list",
        name: "cinema-list",
        component: () => import("@/views/cinema-manage/cinema-list/index"),
        meta: { title: "影院列表"}
      },
      {
        path: "college-list/detail",
        name: "college-detail",
        component: () => import("@/views/cinema-manage/college-list/detail"),
        hidden: true,
        meta: { title: "学校详情"}
      },
      
      {
        path: "cinema-list/detail",
        name: "cinema-detail",
        component: () => import("@/views/cinema-manage/cinema-list/detail"),
        hidden: true,
        meta: { title: "影院详情"}
      },
      {
        path: "cinema-list/plan",
        name: "plan",
        component: () => import("@/views/cinema-manage/plan/plan"),
        hidden: true,
        meta: { title: "影片排期"}
      },
      {
        path: "cinema-list/screen",
        name: "screen-list",
        component: () => import("@/views/cinema-manage/screen-list/index"),
        hidden: true,
        meta: { title: "创建影厅座位"}
      }
    ]
  },
  {
    path: "/film-manage",
    name: "film-manage",
    component: Layout,
    redirect: "/film-list",
    meta: { title: "影片管理", icon: "" },
    children:[
      {
        path: "film-list",
        name: "film-list",
        component: () => import("@/views/film-manage/film-list"),
        meta: { title: "影片列表", icon: "" }
      },
      {
        path: "film-list/detail",
        name: "film-detail",
        component: () => import("@/views/film-manage/detail"),
        hidden: true,
        meta: { title: "影片详情", icon: "" }
      }
    ]
  },
  {
    path: "/order-manage",
    name: "order-manage",
    component: Layout,
    redirect: "/order-list",
    meta: { title: "订单管理", icon: "" },
    children:[
      {
        path: "order-list",
        name: "order-list",
        component: () => import("@/views/order-manage/order-list"),
        meta: { title: "订单列表", icon: "" }
      },
      {
        path: "order-list/detail",
        name: "order-detail",
        component: () => import("@/views/order-manage/detail"),
        meta: { title: "订单详情", icon: "" },
        hidden: true
      }
    ]
  },
  {
    path: "/user-manage",
    name: "user-manage",
    component: Layout,
    redirect: "/user-list",
    meta: { title: "用户管理", icon: "" },
    children:[
      {
        path: "user-list",
        name: "user-list",
        component: () => import("@/views/user-manage/user-list"),
        meta: { title: "用户列表", icon: "" }
      }
    ]
  },
  {
    path: "/news-manage",
    name: "news-manage",
    component: Layout,
    redirect: "/news",
    meta: { title: "发现", icon: "" },
    children:[
      {
        path: "news",
        name: "news",
        component: () => import("@/views/news-manage/news"),
        meta: { title: "新闻列表", icon: "" }
      },
      {
        path: "news/detail",
        name: "news-detail",
        component: () => import("@/views/news-manage/detail"),
        meta: { title: "新闻详情", icon: "" },
        hidden: true
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", hidden: true }
];

const createRouter = () =>
  new Router({
    mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  });

const router = createRouter();
// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
