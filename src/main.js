import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/icon/iconfont.css'

import './style/global.scss'

// ant-design组件
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
Vue.use(Antd);
// element ui 组件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
