// 模型构建页面画布初次加载的数据，用来比对数据有没有被改变
const dataModel = {
  // 命名空间
  namespaced: true,

  state: {
    data: ''
  },

  mutations: {
    SET_DATA_MODEL(state, data) {
      state.data = data
    }
  }
}

export default dataModel
