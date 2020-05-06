/*
 * @Description:
 * @Author: Liangqq
 * @Date: 2020-04-29 18:04:28
 * @LastEditors: Liangqq
 * @LastEditTime: 2020-04-29 18:05:27
 */
/* eslint-disable */
export function isString(obj) {
  return Object.prototype.toString.call(obj) === "[object String]"
}

export function isObject(obj) {
  return Object.prototype.toString.call(obj) === "[object Object]"
}

export function isHtmlElement(node) {
  return node && node.nodeType === Node.ELEMENT_NODE
}

export const isFunction = functionToCheck => {
  const getType = {}
  return functionToCheck && getType.toString.call(functionToCheck) === "[object Function]"
}

export const isUndefined = val => val === void 0

export const isDefined = val => val !== undefined && val !== null
