const dataSource = {
  // 命名空间
  namespaced: true,

  state: {
    data: ''
  },

  mutations: {
    SET_DATA_SOURCE(state, data) {
      state.data = data
    }
  }
}

export default dataSource
