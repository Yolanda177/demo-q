/*
 * @Description:
 * @Author: Liangqq
 * @Date: 2020-07-03 14:04:27
 * @LastEditors: Liangqq
 * @LastEditTime: 2020-07-03 14:10:06
 */
import Vue from 'vue'

const notifyVisibilityChange = (lifeCycleName, vm) => {
  const lifeCycles = vm.$options[lifeCycleName]
  if (lifeCycles && lifeCycles.length) {
    lifeCycles.forEach(lifecycle => {
      lifecycle.call(vm)
    })
  }
  if (vm.$children && vm.$children.length) {
    vm.$children.forEach(child => {
      notifyVisibilityChange(lifeCycleName, child)
    })
  }
}

export function initVue() {
  const { optionMergeStrategies } = Vue.config
  optionMergeStrategies.pageVisible = optionMergeStrategies.beforeCreate
  optionMergeStrategies.pageHidden = optionMergeStrategies.created
}

export function bind(rootVm) {
  window.addEventListener('visibilitychange', () => {
    // 判断调用哪个生命周期函数
    let lifeCycleName
    if (document.visibilityState === 'hidden') {
      lifeCycleName = 'pageHidden'
    } else if (document.visibilityState === 'visible') {
      lifeCycleName = 'pageVisible'
    }
    if (lifeCycleName) {
      // 通过所有组件生命周期发生变化了
      notifyVisibilityChange(lifeCycleName, rootVm)
    }
  })
}
