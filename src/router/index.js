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
      // 个人资料
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
      // 业务办理
      {
        path: '/student_operation_queryAndApply',
        name: 'student_operation_queryAndApply',
        component: () => import('../views/page/student/operation/queryAndApply.vue')
      },
      {
        path: '/student_operation_pay',
        name: 'student_operation_pay',
        component: () => import('../views/page/student/operation/pay.vue')
      },
      {
        path: '/student_operation_print',
        name: 'student_operation_print',
        component: () => import('../views/page/student/operation/print.vue')
      },
      {
        path: '/student_operation_score',
        name: 'student_operation_score',
        component: () => import('../views/page/student/operation/score.vue')
      },
      {
        path: '/student_operation_interview',
        name: 'student_operation_interview',
        component: () => import('../views/page/student/operation/interview.vue')
      },
      {
        path: '/student_testRegistration',
        name: 'student_testRegistration',
        component: () => import('../views/page/student/testRegistration.vue')
      },

      // 管理员路由 
      {
        path: '/admin_examinee_check',
        name: 'admin_examinee_check',
        component: () => import('../views/page/admin/examinee/check.vue')
      },
      {
        path: '/admin_examinee_written',
        name: 'admin_examinee_written',
        component: () => import('../views/page/admin/examinee/written.vue')
      },
      {
        path: '/admin_examinee_interview',
        name: 'admin_examinee_interview',
        component: () => import('../views/page/admin/examinee/interview.vue')
      },
      {
        path: '/admin_exam_test',
        name: 'admin_exam_test',
        component: () => import('../views/page/admin/exam/test.vue')
      }, {
        path: '/admin_exam_testPaper',
        name: 'admin_exam_testPaper',
        component: () => import('../views/page/admin/exam/testPaper.vue')
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
