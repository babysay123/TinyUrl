import _axios from 'Plugins/axios'

// 获取每日嘉奖和晋级奖励
export const promotionsApi = params => {
  return _axios.getOnce('/front/discountoff/promotions.do', params || {})
}

// 领取
export const getAwardApi = params => {
  return _axios.postOnce('/front/discountoff/saveAwardToUser.do', params || {})
}
