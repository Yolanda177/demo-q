const appConfig = {
  // 命名空间
  namespaced: true,

  state: {
    data: ''
  },

  mutations: {
    SET_APP_CONFIG(state, data) {
      state.data = data
    }
  }
}

export default appConfig
