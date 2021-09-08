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
        path: '/student-notice',
        name: 'student-notice',
        component: () => import('../views/page/student/notice.vue')
      },
      {
        path: '/student-testRegistration',
        name: 'student-testRegistration',
        component: () => import('../views/page/student/testRegistration.vue')
      },
      {
        path: '/student-payment',
        name: 'student-payment',
        component: () => import('../views/page/student/payment.vue')
      }, {
        path: '/student-writeTicket',
        name: 'student-writeTicket',
        component: () => import('../views/page/student/writeTicket.vue')
      }, {
        path: '/student-arrange',
        name: 'student-arrange',
        component: () => import('../views/page/student/arrange.vue')
      },
      {
        path: '/student-scoreQuery',
        name: 'student-scoreQuery',
        component: () => import('../views/page/student/scoreQuery.vue')
      },
      {
        path: '/student-interviewTicket',
        name: 'student-interviewTicket',
        component: () => import('../views/page/student/interviewTicket.vue')
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
