/*
 * @Description:
 * @Author: Liangqq
 * @Date: 2020-04-11 22:27:08
 * @LastEditors: Liangqq
 * @LastEditTime: 2020-07-03 14:16:27
 */
import Vue from 'vue'

import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import { initVue, bind } from '@/utils/test'

import '@/register'

Vue.config.productionTip = false
initVue()

// function init() {
//   // 挂载vue
//   new Vue({
//     router,
//     store,
//     render: h => h(App)
//   }).$mount('#app')
// }
const vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

bind(vm)
console.log(Vue.config.optionMergeStrategies)
// init()
