import _axios from 'Plugins/axios'

// 开奖大厅游戏列表
export const resultListApi = params => {
  return _axios.postOnce('/front/lottery/luck_number.do', params || {})
}
export const resultListApiSingle = params => {

}
