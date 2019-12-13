/*
 * @Description: store getters
 * @Author: Liyc
 * @Date: 2019-08-01 17:40:33
 * @LastEditors: liyc
 * @LastEditTime: 2019-09-16 14:25:47
 */
const getters = {
  userInfo: state => state.user.userInfo,
  dataSource: state => state.dataSource.data,
  dataModel: state => state.dataModel.data,
  appConfig: state => state.appConfig.data,
  routeQuery: state => state.routeQuery.data,
  eventDelConn: state => state.eventJsplumb.dConn,
  eventAddConn: state => state.eventJsplumb.aConn
}

export default getters
