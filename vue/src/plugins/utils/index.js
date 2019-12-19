/**
 * 定义一些简单的全局工具函数
 * date: 时间函数
 * storage: 存储函数
 */

import Dates from './DateUtil/'
import Storage from './StorageUtil/'
// import UserTool from './UserTool/'
// import Logger from './logger'

export default {
  // 'version': '5.2.3',
  // 'switchLink': (content) => {
  //   // 筛选方法
  //   let _select = (url, str) => {
  //     if (url.indexOf('customLinkUrl') > -1) {
  //     // let _customRule = /href="([a-zA-Z0-9\:\/\_\?\=\.]+)"/
  //       let _u = url.split('url=')[1]
  //       str = str.replace(url, _u)
  //     } else {
  //       let a = ''
  //       // wwc的链接列表
  //       let linkMap = new Map([
  //         ['wwc://platformapi/wwc/orders', '/mobile/mine/orderList.html'],
  //         ['wwc://platformapi/wwc/accountDetail', '/mobile/mine/accountList.html'],
  //         ['wwc://platformapi/wwc/rechargeRecord', '/mobile/studio/#/rechargeRecord'],
  //         ['wwc://platformapi/wwc/withdrawRecord', '/mobile/mine/rechargeList.html?type=1'],
  //         ['wwc://platformapi/wwc/messages', '/mobile/mine/noticeCenter.html'],
  //         ['wwwc://platformapi/wwc/messages', '/mobile/mine/noticeCenter.html'],
  //         ['wwc://platformapi/wwc/securityCenter', '/mobile/mine/editPwd.html'],
  //         ['wwc://platformapi/wwc/onlineService', '/mobile/mine/serviceOnline.html'],
  //         ['wwc://platformapi/wwc/playRules', '/mobile/mall/innerHtml.html?url=/mobile/other/playing.html'],
  //         ['wwc://platformapi/wwc/aboutUs', '/mobile/mine/appAbout.html'],
  //         ['wwc://platformapi/wwc/profitLoss', '/mobile/mine/profitLoss.html'],
  //         ['wwc://platformapi/wwc/friendList', '/mobile/mine/friendList.html?friend'],
  //         ['wwc://platformapi/wwc/followList', '/mobile/mine/friendList.html?attention'],
  //         ['wwc://platformapi/wwc/football', '/mobile/lottery/lotteryFootBall.html?lotteryId=100001'],
  //         ['wwc://platformapi/wwc/betChatRoom', '/mobile/studio/#/lottery?lotteryId=1'],
  //         ['wwc://platformapi/wwc/betting', '/mobile/studio/#/lottery?lotteryId=1'],
  //         ['wwc://platformapi/wwc/chatRoom', '/mobile/studio/#/chatroom?lotteryId=1'],
  //         ['wwc://platformapi/wwc/redPacket?rid=', '/mobile/mine/mine.html'],
  //         ['wwc://platformapi/wwc/privateChat?receiver=', '/mobile/studio/#/chatroom?lotteryId=1'],
  //         ['wwc://platformapi/wwc/activity', '/mobile/mall/preferActive.html'],
  //         ['wwc://platformapi/wwc/webH5', '/mobile/mall/preferActive.html'],
  //         ['default', '/mobile/mine/mine.html']
  //       ])
  //       // console.log(linkMap)
  //       // a = [...linkMap].filter(([key]) => (key === url))
  //       // console.log(a)
  //       a = linkMap.get(url)
  //       // 替换链接
  //       str = str.replace(url, a)
  //     }
  //     return str
  //   }
  //   let _realStr = content
  //   let _linkArr = []
  //   let _wwcReg = /wwc:\/\/platformapi\/wwc\/[^'" ]+/g
  //   _linkArr = _realStr.match(_wwcReg)
  //   if (_linkArr && _linkArr.length > 0) {
  //     _linkArr.forEach((item, inx) => {
  //       _realStr = _select(item, _realStr)
  //     })
  //   }
  //   return _realStr
  // },
  // 'toDecimal2': (x) => {
  //   if (x === undefined) x = 0
  //   let f = parseFloat(x)
  //   if (isNaN(f)) {
  //     return false
  //   }
  //   f = Math.round(x * 100) / 100
  //   let s = f.toString()
  //   let rs = s.indexOf('.')
  //   if (rs < 0) {
  //     rs = s.length
  //     s += '.'
  //   }
  //   while (s.length <= rs + 2) {
  //     s += '0'
  //   }
  //   return s
  // },
  Dates,
  Storage
  // UserTool
  // Logger
}
