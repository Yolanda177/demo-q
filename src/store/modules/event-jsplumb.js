/*
 * @Description: jsplumb发布事件
 * @Author: Liyc
 * @Date: 2019-09-16 14:09:38
 * @LastEditors: liyc
 * @LastEditTime: 2019-09-16 14:25:34
 */
const eventJsplumb = {
  // 命名空间
  namespaced: true,

  state: {
    dConn: '',
    aConn: ''
  },

  mutations: {
    DEL_JP_CONN(state, conn) {
      state.dConn = conn
    },
    ADD_JP_CONN(state, conn) {
      state.aConn = conn
    }
  }
}

export default eventJsplumb
