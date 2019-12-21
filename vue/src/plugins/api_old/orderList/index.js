/*
 * @Author: your name
 * @Date: 2019-11-14 20:11:54
 * @LastEditTime: 2019-11-14 21:33:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cp8h5\vue\src\plugins\api\orderList\index.js
 */
import _axios from 'Plugins/axios'
export const logList = params => {
  return _axios.postOnce('/front/bet/log_list.do', params || {})
}
// 获取导航
export const getGameDetailForBet = params => {
  return _axios.postOnce('/game/getGameDetailForBet.do', params || {})
}
// 获取彩票数据
export const categories = params => {
  return _axios.postOnce('/front/lottery/categories.do', params || {})
}
// 获取游戏数据
export const getNewAppBettingRecord = params => {
  return _axios.postOnce('/game/getNewAppBettingRecord.do', params || {})
}
