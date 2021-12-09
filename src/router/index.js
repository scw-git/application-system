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
    redirect: '/student_notice',
    component: () => import('../views/index.vue'),
    children: [
      // 考生路由
      {
        path: '/student_notice',
        name: 'student_notice',
        component: () => import('../views/page/student/notice.vue')
      },
      {
        path: '/student_info_image',
        name: 'student_info_image',
        component: () => import('../views/page/student/info/image.vue')
      },
      {
        path: '/student_info_basic',
        name: 'student_info_basic',
        component: () => import('../views/page/student/info/basic.vue')
      },
      {
        path: '/student_info_work',
        name: 'student_info_work',
        component: () => import('../views/page/student/info/work.vue')
      },
      {
        path: '/student_info_home',
        name: 'student_info_home',
        component: () => import('../views/page/student/info/home.vue')
      },
      {
        path: '/student_testRegistration',
        name: 'student_testRegistration',
        component: () => import('../views/page/student/testRegistration.vue')
      },
      {
        path: '/student_payment',
        name: 'student_payment',
        component: () => import('../views/page/student/payment.vue')
      }, {
        path: '/student_writeTicket',
        name: 'student_writeTicket',
        component: () => import('../views/page/student/writeTicket.vue')
      }, {
        path: '/student_arrange',
        name: 'student_arrange',
        component: () => import('../views/page/student/arrange.vue')
      },
      {
        path: '/student_scoreQuery',
        name: 'student_scoreQuery',
        component: () => import('../views/page/student/scoreQuery.vue')
      },
      {
        path: '/student_interviewTicket',
        name: 'student_interviewTicket',
        component: () => import('../views/page/student/interviewTicket.vue')
      },
      // 管理员路由 
      {
        path: '/admin_noticeManagement',
        name: 'admin_noticeManagement',
        component: () => import('../views/page/admin/noticeManagement.vue')
      },
      {
        path: '/admin_examPlan',
        name: 'admin_examPlan',
        component: () => import('../views/page/admin/examPlan.vue')
      },
      {
        path: '/admin_examineeManagement',
        name: 'admin_examineeManagement',
        component: () => import('../views/page/admin/examineeManagement.vue'),

      }, {
        path: '/admin_payManagement',
        name: 'admin_payManagement',
        component: () => import('../views/page/admin/payManagement.vue')
      },
      {
        path: '/admin_roomManagement',
        name: 'admin_roomManagement',
        component: () => import('../views/page/admin/roomManagement.vue')
      }, {
        path: '/admin_scoreManagement',
        name: 'admin_scoreManagement',
        component: () => import('../views/page/admin/scoreManagement.vue')
      }, {
        path: '/admin_noteManagement',
        name: 'admin_noteManagement',
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
