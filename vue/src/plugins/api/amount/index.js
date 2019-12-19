import _axios from 'Plugins/axios'

export const getAmountAvailable = params => {
  return _axios.post('/changeMoney/getCanUsingList.do', params || {})
}

export const getAmountAvailableSingle = params => {
  return _axios.postOnce('/changeMoney/getCanUsing.do', params || {})
}
export const changeMoneyAmount = params => {
  return _axios.postOnce('/changeMoney/add.do', params || {})
}
export const getAmountConverLog = params => {
  return _axios.post('/changeMoney/getList.do', params || {})
}
export const getBettingLog = params => {
  return _axios.post('/game/getGameBetRecord.do', params || {})
}
