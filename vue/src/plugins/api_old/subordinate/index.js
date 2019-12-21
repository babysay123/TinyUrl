/*
 * @Author: your name
 * @Date: 2019-10-28 16:47:54
 * @LastEditTime: 2019-10-29 16:16:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /d:\cp8h5\cp8h5\vue\src\plugins\api\subordinate\index.js
 */
import _axios from 'Plugins/axios'
export const LotteryShare = params => {
  return _axios.postOnce('/agent/lottery_share/add.do', params || {})
}

export const ShareList = params => {
  return _axios.postOnce('/agent/lottery_share/share_list.do', params || {})
}

export const LotteryShareUpdate = params => {
  return _axios.postOnce('/agent/lottery_share/update.do', params || {})
}
export const LotteryShareDelete = params => {
  return _axios.postOnce('/agent/lottery_share/delete.do', params || {})
}
export const CodeList = params => {
  return _axios.postOnce('/agent/lottery_share/list.do', params || {})
}
