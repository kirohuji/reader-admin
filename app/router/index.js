import Vue from "vue";
import VueRouter from "vue-router";
import Layout from '../layout'
Vue.use(VueRouter);

export const constantRoutes = [
  {
    path: '/login',
    name: 'login',
    component: ()=> import("../pages/login")
  },
  {
    path: '/register',
    name: 'register',
    component: ()=> import("../pages/login/register.vue")
  },
  {
    path: '/',
    component: Layout,
    redirect: '/users',
    name: 'users',
    meta: {
      title: '用户中心',
      icon: 'table'
    },
    children: [
      {
        path: 'users',
        component: () => import('../pages/users'),
        name: 'users',
        meta: { title: '用户管理', icon: 'user', affix: true }
      }
    ]
  },
  {
    path: '/books',
    component: Layout,
    name: 'books',
    meta: {
      title: '书籍中心',
      icon: 'table'
    },
    children: [
      {
        path: '/list',
        component: () => import('../pages/books'),
        name: 'book',
        meta: { title: '书籍管理', icon: 'user', affix: true }
      }
    ]
  },
  {
    path: "*",
    name: "not-found",
    component: () => import("../pages/error-page/404.vue"),
  },
];
export const asyncRoutes = []
const createRouter = () =>
  new VueRouter({
    mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,

  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
