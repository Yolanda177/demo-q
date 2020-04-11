import Vue from 'vue'

import App from '@/App.vue'
import router from '@/router'
import store from '@/store'

import '@/register'

Vue.config.productionTip = false

function init() {
  // 挂载vue
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
}

init()
