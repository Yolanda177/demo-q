/*
 * @Description: url参数
 * @Author: Liyc
 * @Date: 2019-08-12 13:39:14
 * @LastEditors: liyc
 * @LastEditTime: 2019-08-12 13:41:04
 */
const routeQuery = {
  // 命名空间
  namespaced: true,

  state: {
    data: ''
  },

  mutations: {
    SET_ROUTE_QUERY(state, data) {
      state.data = data
    }
  }
}

export default routeQuery
