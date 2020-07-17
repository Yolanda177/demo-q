/*
 * @Description:
 * @Author: Liangqq
 * @Date: 2020-04-11 22:27:08
 * @LastEditors: Liangqq
 * @LastEditTime: 2020-07-16 22:38:03
 */
// 统一注册全局配置、组件以及指令

import Vue from 'vue'

// eslint-disable-next-line import/no-extraneous-dependencies
import debouncethrottle from 'v-debounce-throttle'

// 引入饼状图
import 'echarts/lib/chart/pie'
// 引入柱状图
import 'echarts/lib/chart/bar'
// 引入折线图
import 'echarts/lib/chart/line'
// 引入提示框
import 'echarts/lib/component/tooltip'
// 引入标题
import 'echarts/lib/component/title'
// 引入图例
import 'echarts/lib/component/legend'
// 引入基本工具
import 'echarts/lib/component/toolbox'
// 引入标记点
import 'echarts/lib/component/markPoint'

// 注册全局组件
import '@/components'

// // 注册全局指令
// import '@/directives'

// 注册饿了么ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 全局css
import '@/styles/index.scss'

// // 引入iconfont
// import '@/icons/iconfont/iconfont.css'
// 加载全部svg
import '@/icon/svg'

Vue.use(ElementUI)
Vue.use(debouncethrottle)

// 开发环境导入mockjs
// if (process.env.NODE_ENV === 'development') {
//   /* eslint-disable */
//   require('@/mock')
// }
