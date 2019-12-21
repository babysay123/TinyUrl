import _axios from 'Plugins/axios'

// 购彩大厅游戏接口
export const buyMallApi = params => {
  return _axios.getOnce('/front/lottery/init.do', params || {})
}

// 获取彩种信息
export const lotteryInfoApi = params => {
  return _axios.postFast('/front/lottery/draw_info.do', params || {})
}

// 获取多个彩种信息
export const lotteryInfosApi = params => {
  return _axios.postFast('/front/lottery/draw_infos.do', params || {})
}

// 新版游戏大厅一级目录
export const getHallInfosApi = params => {
  return _axios.postOnce('/game/getHall.do', params || {})
}

// 新版游戏大厅二级目录
export const getPlatformApi = params => {
  return _axios.postFast('/game/getPlatform.do', params || {})
}
// 新版三级游戏
export const getGameDetailsApi = params => {
  return _axios.postFast('/game/getGameDetails.do', params || {})
}
