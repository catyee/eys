import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
/* Layout */
export const constantRoutes = [

  // auth页面 因为每次退出登录之后 切换角色重新登录 会跳转到path '',此时路由会受上一次的影响，会redirect上次的‘’对应的地址(路由多个角色都有一个‘’路由对应不同的路由跳转)
  // 没有想到更好的办法 因此加了一个默认的‘’这样每次都跳转到auth，然后如果是要跳转到auth则在permission里面更改beforeEach中的to，让其直接跳转到根据角色获取到的路由链接
  {
    path: '',
    name: 'index',
    component: () => import(/* webpackChunkName: "main" */ '../views/main/main.vue'),
    redirect: 'index',
    hidden: true
  },
  {
    path: '/login',
    name: 'login',
    hidden: true,
    component: () => import(/* webpackChunkName: "login" */ '../views/login')
  },
  // 模块入口页面
  {
    path: '/index',
    component: () => import('@/views/index'),
    name: 'Index',
    hidden: true,
    meta: { title: '模块入口' }
  },
  {
    path: '/404',
    component: (resolve) => require(['@/views/error/404'], resolve),
    hidden: true
  },
  {
    path: '/401',
    component: (resolve) => require(['@/views/error/401'], resolve),
    hidden: true
  },
  { path: '*', component: (resolve) => require(['@/views/error/404'], resolve), hidden: true }
]

const router = new VueRouter({
  base: '/',
  mode: 'history', // 去掉url中的#
  routes: constantRoutes
})
// 防止连续点击多次路由报错
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return routerPush.call(this, location).catch(err => err)
}
export default router
