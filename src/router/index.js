import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import Index from '@/views/cinema-manage/cinema-list/index'
import CinemaDetail from '@/views/cinema-manage/cinema-list/detail'
import Plan from '@/views/cinema-manage/plan/plan'
import Screen from '@/views/cinema-manage/screen-list/index'
import Film from '@/views/film-manage/film-list'
import FilmDetail from '@/views/film-manage/detail'
import Order from '@/views/order-manage/order-list'
import OrderDetail from '@/views/order-manage/detail'
import News from '@/views/news-manage/news'
import NewsDetail from '@/views/news-manage/detail'
import User from '@/views/user-manage/user-list'

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
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/cinema-list',
    children: [
      {
        path: '/cinema-list',
        name: 'cinema-list',
        component: Index,
        meta: { title: '影院管理', icon: 'cinema' }
      },
      {
        path: 'cinema-list/add',
        name: 'add-cinema-detail',
        component: CinemaDetail,
        hidden: true,
        meta: { title: '添加影院' }
      },
      {
        path: 'cinema-list/edit',
        name: 'edit-cinema-detail',
        component: CinemaDetail,
        hidden: true,
        meta: { title: '修改影院' }
      },
      {
        path: 'cinema-list/plan',
        name: 'plan',
        component: Plan,
        hidden: true,
        meta: { title: '影片排期' }
      },
      {
        path: 'cinema-list/screen',
        name: 'screen-list',
        component: Screen,
        hidden: true,
        meta: { title: '创建影厅座位' }
      }
    ]
  },
  {
    path: '/film-list',
    component: Layout,
    children: [
      {
        path: '/film-list',
        name: 'film-list',
        component: Film,
        meta: { title: '影片管理', icon: 'film' }
      },
      {
        path: 'add',
        name: 'add-film-detail',
        component: FilmDetail,
        hidden: true,
        meta: { title: '添加影片' }
      },
      {
        path: 'edit',
        name: 'edit-film-detail',
        component: FilmDetail,
        hidden: true,
        meta: { title: '修改影片' }
      }
    ]
  },
  {
    path: '/order-list',
    component: Layout,
    children: [
      {
        path: '/order-list',
        name: 'order-list',
        component: Order,
        meta: { title: '订单管理', icon: 'order' }
      },
      {
        path: 'detail',
        name: 'order-detail',
        component: OrderDetail,
        meta: { title: '订单详情' },
        hidden: true
      }
    ]
  },
  {
    path: '/news-list',
    component: Layout,
    children: [
      {
        path: '/news-list',
        name: 'news',
        component: News,
        meta: { title: '新闻管理', icon: 'news' }
      },
      {
        path: 'add',
        name: 'add-news-detail',
        component: NewsDetail,
        meta: { title: '添加文章' },
        hidden: true
      },
      {
        path: 'edit',
        name: 'edit-news-detail',
        component: NewsDetail,
        meta: { title: '修改文章' },
        hidden: true
      }
    ]
  },
  {
    path: '/user-list',
    component: Layout,
    children: [
      {
        path: '/user-list',
        name: 'user-list',
        component: User,
        meta: { title: '用户管理', icon: 'user' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    base: '/admin/',
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()
// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
