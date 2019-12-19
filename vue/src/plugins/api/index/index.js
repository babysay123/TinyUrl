/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-06 15:34:43
 * @LastEditTime: 2019-11-08 16:39:30
 * @LastEditors: Please set LastEditors
 */
import _axios from 'Plugins/axios'

//  old banner接口  已弃用
// export const carouselApi = params => {
//   return _axios.getFast('/front/discountoff/list.do', params || {})
// }
export const carouselApi = params => {
  return _axios.postFast('/app/appView/pageList.do', params || {})
}

export const noticeApi = params => {
  return _axios.getFast('/front/homepage/init.do', params || {})
}

export const gameListApi = params => {
  return _axios.getFast('/front/lottery/hot.do', params || {})
}

export const dialogApi = params => {
  return _axios.getFast('/front/news/notice.do', params || {})
}
// 已合并接口，不再调用此接口
export const indexTabsApi = params => {
  return _axios.postFast('/game/getHotGame.do', params || {})
}
export const indexGameListApi = params => {
  return _axios.postFast('/game/getGameDetail.do', params || {})
}
export const loginGameApi = params => {
  return _axios.postFast('/game/loginGame.do', params || {})
}
export const transferMoney = (params, config) => {
  return _axios.postFast('/changeMoney/transfer.do', params || {}, config)
}
