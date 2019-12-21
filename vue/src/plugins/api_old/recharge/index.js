/*
 * @Author: your name
 * @Date: 2019-09-16 14:07:14
 * @LastEditTime: 2019-11-12 16:23:47
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \cp8h5\vue\src\plugins\api\recharge\index.js
 */
import _axios from 'Plugins/axios'

export const rechargeRecordApi = params => {
  return _axios.post('/capital/manage/recharge_log_list.do', params || {})
}

export const rechargeResultAPi = params => {
  return _axios.postOnce('/capital/manage/recharge_log.do', params || {})
}
export const getDepositList = params => {
  return _axios.postOnce('/front/recharge/get_deposit_list.do', params || {})
}
