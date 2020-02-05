/*
 * @Author: your name
 * @Date: 2019-09-16 14:07:14
 * @LastEditTime: 2019-11-14 20:16:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cp8h5\vue\src\plugins\api\mine\index.js
 */
import _axios from 'Plugins/axios'

// 获取个人中心需要显示的配置
export const mineTableApi = params => {
  return _axios.getOnce('/front/appshow/get_list.do', params || {})
}

// // 获取头像用于修改
// export const getAvatarApi = params => {
//   return _axios.getOnce('/front/personal_center/get_avatar.do', params || {})
// }

// // 更新头像提交
// export const updateAvatarApi = params => {
//   return _axios.postOnce('/front/personal_center/update.do', params || {})
// }
// export const getServiceListApi = params => {
//   return _axios.postOnce('/game/getCustomer.do', params || {})
// }

// // 更新个人中心资料
// export const personalUpdateApi = params => {
//   return _axios.postOnce('/front/personal_center/update.do', params || {})
// }

// // 更新个人中心资料
// export const nickNameUpdateApi = params => {
//   return _axios.getOnce(`/chat_room/update_nickname.do?${params}`)
// }

// // 退出登录接口
// export const logoutApi = params => {
//   return _axios.getOnce('/passport/logout.do', params || {})
// }

// // 获取银行卡信息
// export const getBankInfoApi = params => {
//   return _axios.getOnce('/account/manage/get_bankinfo.do', params || {})
// }

// // 获取最近出款
// export const getWithdrawalApi = params => {
//   return _axios.postOnce('/capital/manage/withdrawal_log_list.do', params || {})
// }

// // 厂商列表
// export const getShareListApi = params => {
//   return _axios.postOnce('/game/share/get_list.do', params || {})
// }

// // 洗码page
// export const getCodePageApi = params => {
//   return _axios.postOnce('/game/share/getCleanCodePage.do', params || {})
// }

// // 洗码比例
// export const getCodeScaleApi = params => {
//   return _axios.postOnce('/game/share/getCleanCodeScale.do', params || {})
// }

// // 洗码历史
// export const getCodeDetailApi = params => {
//   return _axios.postOnce('/game/share/getCleanCodeDetail.do', params || {})
// }

// // 手动洗码
// export const getCodeAwardApi = params => {
//   return _axios.postOnce('/game/share/receiveCleanCodeAward.do', params || {})
// }
