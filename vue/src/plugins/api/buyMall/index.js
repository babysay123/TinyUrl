import _axios from 'Plugins/axios'

export const getNavigatorApi = parmas => {
  return _axios.postFast('/game/getNavigator.do', parmas || {})
}
// 合并接口，不再使用此接口
export const getGameSwitchApi = parmas => {
  return _axios.postFast('/game/getGameSwitch.do', parmas || {})
}
