import Vue from 'vue'
import VueRouter from 'vue-router'
import { message } from "ant-design-vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/list',
  },
  {
    path: '/list',
    name: 'list',
    component: () => import('../views/list/index.vue')
  },
  {
    path: '/index',
    name: 'index',
    redirect: '/notice',
    component: () => import('../views/index.vue'),
    children: [
      {
        path: '/notice',
        name: 'notice',
        component: () => import('../views/page/notice.vue')
      },
      {
        path: '/testRegistration',
        name: 'testRegistration',
        component: () => import('../views/page/testRegistration.vue')
      },
      {
        path: '/payment',
        name: 'payment',
        component: () => import('../views/page/payment.vue')
      }, {
        path: '/writeTicket',
        name: 'writeTicket',
        component: () => import('../views/page/writeTicket.vue')
      }, {
        path: '/arrange',
        name: 'arrange',
        component: () => import('../views/page/arrange.vue')
      },
      {
        path: '/scoreQuery',
        name: 'scoreQuery',
        component: () => import('../views/page/scoreQuery.vue')
      },
      {
        path: '/interviewTicket',
        name: 'interviewTicket',
        component: () => import('../views/page/interviewTicket.vue')
      },
    ]
  },

  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/register.vue')
  }
]

const router = new VueRouter({
  routes
})

const whiteList = ['login', 'register']
router.beforeEach(function (to, from, next) {
  // 白名单免登录
  if (whiteList.indexOf(to.name) != -1) {
    next()
  } else {
    if (sessionStorage.getItem('login')) {
      next()
    } else {
      message.error('亲请先登录哦！')
      next({
        path: '/login'
      })
    }
  }

})

export default router
