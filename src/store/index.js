import Vue from 'vue'
import Vuex from 'vuex'
import routeQuery from './modules/route-query'
import dataSource from './modules/data-source'
import dataModel from './modules/data-model'
import appConfig from './modules/app-config'
import eventJsplumb from './modules/event-jsplumb'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    dataSource,
    dataModel,
    appConfig,
    routeQuery,
    eventJsplumb
  },
  getters
})
