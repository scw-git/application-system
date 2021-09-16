import Vue from 'vue'
import VueRouter from 'vue-router'
import { message } from "ant-design-vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login',
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
      // 考生路由
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
      // 管理员路由 
      {
        path: '/admin-noticeManagement',
        name: 'admin-noticeManagement',
        component: () => import('../views/page/admin/noticeManagement.vue')
      },
      {
        path: '/admin-examPlan',
        name: 'admin-examPlan',
        component: () => import('../views/page/admin/examPlan.vue')
      },
      {
        path: '/admin-examineeManagement',
        name: 'admin-examineeManagement',
        component: () => import('../views/page/admin/examineeManagement.vue'),

      }, {
        path: '/admin-payManagement',
        name: 'admin-payManagement',
        component: () => import('../views/page/admin/payManagement.vue')
      },
      {
        path: '/admin-roomManagement',
        name: 'admin-roomManagement',
        component: () => import('../views/page/admin/roomManagement.vue')
      }, {
        path: '/admin-scoreManagement',
        name: 'admin-scoreManagement',
        component: () => import('../views/page/admin/scoreManagement.vue')
      }, {
        path: '/admin-noteManagement',
        name: 'admin-noteManagement',
        component: () => import('../views/page/admin/noteManagement.vue')
      },
      // 报名表
      {
        path: '/applicationForm',
        name: '/applicationForm',
        component: () => import('../views/page/components/applicationForm.vue'),
      }

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
    let loginInfo = JSON.parse(sessionStorage.getItem('loginInfo'))
    if (loginInfo) {
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
