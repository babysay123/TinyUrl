/*
 * @Author: your name
 * @Date: 2019-09-16 14:07:14
 * @LastEditTime: 2019-11-06 16:54:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cp8h5\vue\src\plugins\api\agency\index.js
 */
import _axios from 'Plugins/axios'

// 代理报表
export const reportFormApi = params => {
  return _axios.postOnce('/agent/subordinate/global_report_new.do', params || {})
}

// 会员管理
export const memberApi = data => {
  return _axios.postOnce('/agent/subordinate/list.do', data || {})
}

//
export const shareListApi = data => {
  return _axios.postOnce('/agent/lottery_share/share_list.do', data || {})
}

// 代理中心 => 彩票记录 获取彩种
export const categoriesApi = params => {
  return _axios.getOnce('/front/lottery/categories.do', params || {})
}

// 代理中心 => 彩票记录
export const subordinateOrderApi = data => {
  return _axios.postOnce('/agent/subordinate/order.do', data || {})
}

// 代理中心 => 交易明细
export const transactionDetailsApi = data => {
  return _axios.postOnce('/agent/subordinate/user_account_change.do', data || {})
}

// 下级报表
export const subordinateReportApi = data => {
  return _axios.postOnce('/agent/subordinate/subordinate_report.do', data || {})
}

// 代理中心 => 下级开户 邀请管理
export const openManageApi = data => {
  return _axios.postOnce('/agent/lottery_share/list.do', data || {})
}

// 代理中心 => 下级开户 生成邀请码
export const addApi = data => {
  return _axios.postOnce('/agent/lottery_share/add.do', data || {})
}

// 代理中心 => 下级开户 删除邀请码
export const deleteCodeApi = data => {
  return _axios.postOnce('/agent/lottery_share/delete.do', data || {})
}

// 足彩记录 开奖详情
export const footballDetailsApi = data => {
  return _axios.postOnce('/front/lottery/football_betting_detail.do', data || {})
}

// 赔率详情表
export const rebateDetailsApi = data => {
  return _axios.postOnce('/agent/lottery_share/prizeExcel.do', data || {})
}
// 我的推广 领取佣金记录
export const myGetHistoryApi = data => {
  return _axios.postOnce('/game/share/getGameAwardRecord.do', data || {})
}
// 我的推广 立即领取
export const getNowImmediatelyApi = data => {
  return _axios.postOnce('/game/share/receiveAward.do', data || {})
}
// 我的推广 可领取佣金和总佣金
export const isNowCommissionApi = data => {
  return _axios.postOnce('/game/share/getAwardTotal.do', data || {})
}
// 我的推广 基本信息
export const myGeneralizeApi = data => {
  return _axios.postOnce('/agent/report/get_popularize.do', data || {})
}
// 直属查询
export const getDirectlyUnderApi = data => {
  return _axios.postOnce('/agent/report/get_direct_agent.do', data || {})
}
// 业绩查询
export const getPerformanceApi = data => {
  return _axios.postOnce('/agent/report/get_performance.do', data || {})
}
// 代理说明 厂商列表
export const getVendorListApi = data => {
  return _axios.postOnce('/game/share/get_list.do', data || {})
}
// 代理说明 厂商列表对应佣金表
export const getVendorListDataApi = data => {
  return _axios.postOnce('/game/share/get_detail.do', data || {})
}
// 今日盈利导航
export const getTodayProfitNavApi = params => {
  return _axios.postOnce('/game/navbar_profit.do', params || {})
}
// 获取今日盈利具体选项的内容
export const getTodayProfitApi = params => {
  return _axios.postOnce('/game/detail_profit.do', params || {})
}
