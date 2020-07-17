/*
 * @Description:
 * @Author: Liangqq
 * @Date: 2020-04-28 17:25:07
 * @LastEditors: Liangqq
 * @LastEditTime: 2020-05-06 13:18:34
 */
import { hasOwn } from "../utils/util"
/* eslint-disable */
const RE_NARGS = /(%|)\{([0-9a-zA-Z_]+)\}/g
/**
 *  String format template
 *  - Inspired:
 *    https://github.com/Matt-Esch/string-template/index.js
 */
export default function (Vue) {
  /**
   * template
   *
   * @param {String} string
   * @param {Array} ...args
   * @return {String}
   */

  function template(string, ...args) {
    if (args.length === 1 && typeof args[0] === "object") {
      args = args[0]
    }

    if (!args || !args.hasOwnProperty) {
      args = {}
    }

    return string.replace(RE_NARGS, (match, prefix, i, index) => {
      let result

      if (string[index - 1] === "{"
        && string[index + match.length] === "}") {
        return i
      }
      result = hasOwn(args, i) ? args[i] : null
      if (result === null || result === undefined) {
        return ""
      }

      return result
    })
  }

  return template
}
