import _axios from 'Plugins/axios'

// // 获取全局配置
// export const globalConfigAPi = params => {
//   return _axios.getFast('/front/get_global_config.do', params || {})
// }

// // 获取访问令牌
// export const accessTokenApi = params => {
//   return _axios.getFast('/chat_room/access_token.do', params || {})
// }

// // 获取六合彩号码配置
// export const lhcConfigApi = params => {
//   return _axios.getFast('/front/lottery/sixmark_attribute.do', params || {})
// }

// // 账户明细状态配置
// export const accountListConfigApi = params => {
//   return _axios.getOnce('/front/homepage/get_account_type_config.do', params || {})
// }

// // 刷新用户数据
// export const userInfoApi = params => {
//   return _axios.getOnce('/passport/check_status.do', params || {})
// }

// // 心跳
// export const heartbeatApi = params => {
//   return _axios.getFast('/im/customer_service/customer_heartbeat.do', params || {})
// }

// // 获取sessionId
// export const sessionIdApi = params => {
//   return _axios.getFast('/passport/distribute_sessionid.do', params || {})
// }

// // 来源api
// export const sourceHearApi = params => {
//   return _axios.getFast('/counter/sourceHearBeat.do', params || {})
// }

export const commonInitApi = params => {
  return _axios.getFast('/common/init', params || {})
}
