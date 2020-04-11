/*
 * @Description: 全局组件注册器
 * @Author: Liyc
 * @Date: 2019-08-08 10:08:13
 * @LastEditors: liyc
 * @LastEditTime: 2019-08-20 17:24:43
 */
import Vue from 'vue'

// 检索目录下的模块
const req = require.context('.', true, /\.vue$/)

req.keys().forEach(fileName => {
  // require模块
  const componentConfig = req(fileName)
  const name = fileName.name
    || fileName
      .replace(/^\.\/.*\//, '')
      .replace(/\.vue$/, '')
      .toLowerCase()
  Vue.component(name, componentConfig.default || componentConfig)
})
