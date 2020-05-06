/*
 * @Description:
 * @Author: Liangqq
 * @Date: 2020-04-29 18:02:49
 * @LastEditors: Liangqq
 * @LastEditTime: 2020-04-29 18:03:02
 */
/* eslint-disable */
export default function (target) {
  for (let i = 1, j = arguments.length; i < j; i++) {
    const source = arguments[i] || {}
    for (const prop in source) {
      if (source.hasOwnProperty(prop)) {
        const value = source[prop]
        if (value !== undefined) {
          target[prop] = value
        }
      }
    }
  }

  return target
}
