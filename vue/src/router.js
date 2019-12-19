/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-06 15:34:43
 * @LastEditTime: 2019-11-14 15:45:55
 * @LastEditors: Please set LastEditors
 */
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
let router = new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    name: '',
    redirect: '/index'
  },
  {
    path: '/index',
    name: 'index',
    component: resolve => require(['Views/index/index.vue'], resolve),
    meta: {
      title: '首页'
    }
  }
  // {
  //   path: '/',
  //   name: '',
  //   component: () => import('Views/lottery/index.vue'),
  //   redirect: '/index',
  //   children: [{
  //     path: '/lottery',
  //     name: 'lottery',
  //     component: () => import('@/components/lottery/betting/betting'),
  //     meta: {
  //       title: '游戏投注'
  //     }
  //   },
  //   {
  //     path: '/bannedList',
  //     name: 'moreMessage',
  //     props: {
  //       modal: router => ({
  //         type: 'friendList'
  //       })
  //     },
  //     meta: {
  //       title: '我的好友'
  //     },
  //     component: () => import('@/components/lottery/chatroom/bannedList')
  //   },
  //   {
  //     path: '/chatroom',
  //     name: 'chatroom',
  //     meta: {
  //       title: '直播大厅'
  //     },
  //     children: [{
  //       path: '/chatroom',
  //       name: 'room',
  //       meta: {
  //         title: '直播大厅'
  //       },
  //       component: () => import('@/components/lottery/chatroom/room')
  //     },
  //     {
  //       path: '/moreChat',
  //       name: 'moreChat',
  //       component: () => import('@/components/lottery/chatroom/moreChat')
  //     }],
  //     component: () => import('@/components/lottery/chatroom/chatroom')
  //   },
  //   {
  //     path: '/moreRoom',
  //     name: 'moreRoom',
  //     meta: {
  //       title: '聊天室'
  //     },
  //     component: () => import('@/components/lottery/chatroom/module/moreRoom') // 更多聊天室
  //   }]
  // }
  // {
  //   path: '/invite',
  //   name: 'invite',
  //   meta: {
  //     title: '邀请奖'
  //   },
  //   component: () => import('@/views/active/invite')
  // },
  // {
  //   path: '/dragon',
  //   name: 'dragon',
  //   component: () => import('@/components/lottery/chatroom/module/dragon') // 更多聊天室
  // },
  // {
  //   path: '/switchIdentity',
  //   name: 'switchIdentity',
  //   meta: {
  //     title: '切换身份'
  //   },
  //   component: () => import('@/components/lottery/chatroom/switchIdentity') // 切换身份页
  // },
  // {
  //   path: '/privateChat',
  //   name: 'privateChat',
  //   meta: {
  //     title: '私人聊天'
  //   },
  //   component: () => import('@/components/lottery/chatroom/privateChat') // 私人聊天页 和 客服聊天页
  // },
  // // 测试
  // // {
  // //   path: '/s',
  // //   name: 's',
  // //   meta: {
  // //     title: 's'
  // //   },
  // //   component: () => import('@/components/result/switchVariety') // 测试
  // // },
  // {
  //   path: '/betSuccess',
  //   name: 'betSuccess',
  //   meta: {
  //     title: '投注成功'
  //   },
  //   component: () => import('@/components/lottery/betting/module/betSuccess') // 投注成功
  // },
  // {
  //   path: '/lotteryResult', // 结算页
  //   name: 'lotteryResult',
  //   meta: {
  //     title: '结算页'
  //   },
  //   component: () => import('@/components/lottery/betting/result')
  // },
  // {
  //   path: '/noticeDefaile', // 公告页
  //   name: 'noticeDefaile',
  //   meta: {
  //     title: '群公告'
  //   },
  //   component: () => import('@/components/lottery/chatroom/module/noticeDefaile')
  // },
  // {
  //   path: '/rechargeList',
  //   name: 'rechargeList',
  //   component: resolve => require(['Views/recharge/rechargeList.vue'], resolve),
  //   meta: {
  //     title: '充值'
  //   }
  // },
  // {
  //   path: '/income',
  //   name: 'income',
  //   component: resolve => require(['Views/recharge/income.vue'], resolve),
  //   meta: {
  //     title: '充值'
  //   }
  // },
  // {
  //   path: '/rechargeDetails',
  //   name: 'rechargeDetails',
  //   component: resolve => require(['Views/recharge/rechargeDetails.vue'], resolve),
  //   meta: {
  //     title: '订单详情'
  //   }
  // },
  // {
  //   path: '/rechargeRecord',
  //   name: 'rechargeRecord',
  //   component: resolve => require(['Views/recharge/rechargeRecord.vue'], resolve),
  //   meta: {
  //     title: '充值记录'
  //   }
  // },
  // {
  //   path: '/rechargeResult',
  //   name: 'rechargeResult',
  //   component: resolve => require(['Views/recharge/rechargeResult.vue'], resolve),
  //   meta: {
  //     title: '充值记录'
  //   }
  // },
  // {
  //   path: '/resultList',
  //   name: 'resultList',
  //   component: resolve => require(['Views/result/resultList.vue'], resolve),
  //   meta: {
  //     title: '开奖大厅'
  //   }
  // },
  // {
  //   path: '/resultDetails',
  //   name: 'resultDetails',
  //   component: resolve => require(['Views/result/resultDetails.vue'], resolve),
  //   meta: {
  //     title: '开奖大厅'
  //   }
  // },
  // {
  //   path: '/buyMall',
  //   name: 'buyMall',
  //   component: resolve => require(['Views/buyMall/buyMall.vue'], resolve),
  //   meta: {
  //     title: '购彩大厅'
  //   }
  // },
  // {
  //   path: '/preferActive',
  //   name: 'preferActive',
  //   component: resolve => require(['Views/active/preferActive.vue'], resolve),
  //   meta: {
  //     title: '优惠活动'
  //   }
  // },
  // {
  //   path: '/limitmenoy',
  //   name: 'limitmenoy',
  //   component: resolve => require(['Views/mine/limitmenoy.vue'], resolve),
  //   meta: {
  //     title: '余额宝明细',
  //     noReLogin: true
  //   }
  // },
  // {
  //   path: '/activeDetails',
  //   name: 'activeDetails',
  //   component: resolve => require(['Views/active/activeDetails.vue'], resolve),
  //   meta: {
  //     title: '活动详情'
  //   }
  // },
  // {
  //   path: '/login',
  //   name: 'login',
  //   component: resolve => require(['Views/login/login.vue'], resolve),
  //   meta: {
  //     title: '登录'
  //   }
  // },
  // {
  //   path: '/register',
  //   name: 'register',
  //   component: resolve => require(['Views/login/register.vue'], resolve),
  //   meta: {
  //     title: '快速注册'
  //   }
  // },
  // {
  //   path: '/mine',
  //   name: 'mine',
  //   component: resolve => require(['Views/mine/mine.vue'], resolve),
  //   meta: {
  //     title: '个人中心'
  //   }
  // },
  // {
  //   path: '/amountConver',
  //   name: 'amountConver',
  //   component: resolve => require(['Views/mine/amountConver.vue'], resolve),
  //   meta: {
  //     title: '额度转换',
  //     noReLogin: true
  //   }
  // },
  // {
  //   path: '/balance',
  //   name: 'balance',
  //   component: resolve => require(['Views/mine/balance.vue'], resolve),
  //   meta: {
  //     title: '余额宝',
  //     noReLogin: true
  //   }
  // },
  // {
  //   path: '/agency',
  //   name: 'agency',
  //   component: resolve => require(['Views/agency/routerView.vue'], resolve),
  //   redirect: '/agency_center',
  //   children: [{
  //     path: '/agency_center',
  //     name: 'agency_center',
  //     component: resolve => require(['Views/agency/agency_center.vue'], resolve),
  //     meta: {
  //       title: '代理中心',
  //       noReLogin: true
  //     }
  //   },
  //   {
  //     path: '/agency_reports',
  //     name: 'agency_reports',
  //     component: resolve => require(['Views/agency/agency_reports.vue'], resolve),
  //     meta: {
  //       title: '代理报表',
  //       noReLogin: true
  //     }
  //   },
  //   {
  //     path: '/subordinate_reports',
  //     name: 'subordinate_reports',
  //     component: resolve => require(['Views/agency/subordinate_reports.vue'], resolve),
  //     meta: {
  //       title: '下级报表',
  //       noReLogin: true
  //     }
  //   },
  //   {
  //     path: '/subordinate_open',
  //     name: 'subordinate_open',
  //     component: resolve => require(['Views/agency/subordinate_open.vue'], resolve),
  //     meta: {
  //       title: '下级开户',
  //       noReLogin: true
  //     }
  //   },
  //   {
  //     path: '/member',
  //     name: 'member',
  //     component: resolve => require(['Views/agency/member.vue'], resolve),
  //     meta: {
  //       title: '会员管理',
  //       noReLogin: true
  //     }
  //   },
  //   {
  //     path: '/myGeneralize',
  //     name: 'myGeneralize',
  //     component: resolve => require(['Views/generalize/myGeneralize.vue'], resolve),
  //     meta: {
  //       title: '我的推广'
  //     }
  //   },
  //   {
  //     path: '/directlyUnderSearch',
  //     name: 'directlyUnderSearch',
  //     component: resolve => require(['Views/generalize/directlyUnderSearch.vue'], resolve),
  //     meta: {
  //       title: '直属查询'
  //     }
  //   },
  //   {
  //     path: '/performanceSearch',
  //     name: 'performanceSearch',
  //     component: resolve => require(['Views/generalize/performanceSearch.vue'], resolve),
  //     meta: {
  //       title: '业绩查询'
  //     }
  //   },
  //   {
  //     path: '/agencyExplain',
  //     name: 'agencyExplain',
  //     component: resolve => require(['Views/generalize/agencyExplain.vue'], resolve),
  //     meta: {
  //       title: '代理说明'
  //     }
  //   },
  //   {
  //     path: '/lottery_record',
  //     name: 'lottery_record',
  //     component: resolve => require(['Views/agency/lottery_record.vue'], resolve),
  //     meta: {
  //       title: '彩票记录',
  //       noReLogin: true
  //     }
  //   },
  //   {
  //     path: '/football_record',
  //     name: 'football_record',
  //     component: resolve => require(['Views/agency/football_record.vue'], resolve),
  //     meta: {
  //       title: '足彩记录',
  //       noReLogin: true
  //     }
  //   },
  //   {
  //     path: '/transaction_details',
  //     name: 'transaction_details',
  //     component: resolve => require(['Views/agency/transaction_details.vue'], resolve),
  //     meta: {
  //       title: '交易明细',
  //       noReLogin: true
  //     }
  //   },
  //   {
  //     path: '/orderList',
  //     name: 'orderList',
  //     component: resolve => require(['Views/mine/orderList.vue'], resolve),
  //     meta: {
  //       title: '我的注单',
  //       noReLogin: true
  //     }
  //   },
  //   // {
  //   //   path: '/withdraw',
  //   //   name: 'withdraw',
  //   //   component: resolve => require(['Views/mine/withdraw.vue'], resolve),
  //   //   meta: {
  //   //     title: '提现',
  //   //     noReLogin: true
  //   //   }
  //   // },
  //   {
  //     path: '/mine/onlineService',
  //     name: 'onlineService',
  //     component: resolve => require(['Views/mine/onlineService.vue'], resolve),
  //     meta: {
  //       title: '客服列表'
  //     }
  //   },
  //   {
  //     path: '/agency_explain',
  //     name: 'agency_explain',
  //     component: resolve => require(['Views/agency/agency_explain.vue'], resolve),
  //     meta: {
  //       title: '代理说明',
  //       noReLogin: true
  //     }
  //   },
  //   {
  //     path: '/rebate_list',
  //     name: 'rebate_list',
  //     component: resolve => require(['Views/agency/rebate_list.vue'], resolve),
  //     meta: {
  //       title: '返点赔率表',
  //       noReLogin: true
  //     }
  //   },
  //   {
  //     path: '/rebate_details',
  //     name: 'rebate_details',
  //     component: resolve => require(['Views/agency/rebate_details.vue'], resolve),
  //     meta: {
  //       title: '返点赔率表',
  //       noReLogin: true
  //     }
  //   }]
  // },
  // {
  //   path: '/userVipAward',
  //   name: 'userVipAward',
  //   component: resolve => require(['Views/active/userVipAward.vue'], resolve),
  //   meta: {
  //     title: '每日嘉奖'
  //   }
  // },
  // {
  //   path: '/userVipdetails',
  //   name: 'userVipdetails',
  //   component: resolve => require(['Views/active/userVipdetails.vue'], resolve),
  //   meta: {
  //     title: '详情'
  //   }
  // },
  // {
  //   path: '/chess',
  //   name: 'qiPai',
  //   component: resolve => require(['@/components/index/chess.vue'], resolve),
  //   meta: {
  //     title: '棋牌'
  //   }
  // },
  // {
  //   path: '/gameContent',
  //   name: 'gameContent',
  //   meta: {
  //     title: '游戏'
  //   },
  //   component: resolve => require(['Views/iframContainer.vue'], resolve)
  // },
  // {
  //   path: '/userVipLevel',
  //   name: 'userVipLevel',
  //   component: resolve => require(['Views/active/userVipLevel.vue'], resolve),
  //   meta: {
  //     title: '晋级奖励'
  //   }
  // },
  // {
  //   path: '/generalizeNav',
  //   name: 'generalizeNav',
  //   component: resolve => require(['Views/generalize/generalizeNav.vue'], resolve),
  //   meta: {
  //     title: '推广赚钱'
  //   },
  //   beforeEnter: (to, from, next) => {
  //     let isLogin = localStorage.getItem('user')
  //     if (isLogin) {
  //       next()
  //     } else {
  //       next('/login')
  //     }
  //   }
  // },
  // {
  //   path: '/subordinate',
  //   name: 'subordinate',
  //   component: resolve => require(['Views/generalize/subordinate.vue'], resolve),
  //   meta: {
  //     title: '下级开户'
  //   },
  //   beforeEnter: (to, from, next) => {
  //     let isLogin = localStorage.getItem('user')
  //     if (isLogin) {
  //       next()
  //     } else {
  //       next('/login')
  //     }
  //   }
  // },
  // {
  //   path: '/agentCenter',
  //   name: 'agentCenter',
  //   component: resolve => require(['Views/generalize/agentCenter.vue'], resolve),
  //   meta: {
  //     title: '代理中心'
  //   },
  //   beforeEnter: (to, from, next) => {
  //     let isLogin = localStorage.getItem('user')
  //     if (isLogin) {
  //       next()
  //     } else {
  //       next('/login')
  //     }
  //   }
  // },
  // {
  //   path: '/reportForm',
  //   name: 'reportForm',
  //   component: resolve => require(['Views/generalize/reportForm.vue'], resolve),
  //   meta: {
  //     title: '代理报表'
  //   },
  //   beforeEnter: (to, from, next) => {
  //     let isLogin = localStorage.getItem('user')
  //     if (isLogin) {
  //       next()
  //     } else {
  //       next('/login')
  //     }
  //   }
  // },
  // {
  //   path: '/subordinateReport',
  //   name: 'subordinateReport',
  //   component: resolve => require(['Views/generalize/subordinateReport.vue'], resolve),
  //   meta: {
  //     title: '下级报表'
  //   },
  //   beforeEnter: (to, from, next) => {
  //     let isLogin = localStorage.getItem('user')
  //     if (isLogin) {
  //       next()
  //     } else {
  //       next('/login')
  //     }
  //   }
  // },
  // {
  //   path: '/platformAgency',
  //   name: 'platformAgency',
  //   component: resolve => require(['Views/generalize/platformAgency.vue'], resolve),
  //   meta: {
  //     title: '平台代理'
  //   }
  // },
  // {
  //   path: '/gameList',
  //   name: 'gameList',
  //   component: resolve => require(['@/components/index/gameList.vue'], resolve),
  //   meta: {
  //     title: '游戏'
  //   }
  // },
  // {
  //   path: '/newVipToUp',
  //   name: 'newVipToUp',
  //   component: resolve => require(['Views/recharge/newVipToUp.vue'], resolve),
  //   meta: {
  //     title: 'VIP充值'
  //   }
  // },
  // // 洗码页面
  // {
  //   path: '/mine/cleanCode',
  //   name: 'cleanCode',
  //   component: resolve => require(['Views/mine/cleanCode.vue'], resolve),
  //   meta: {
  //     title: '洗码'
  //   }
  // },
  // // 我的注单
  // {
  //   path: '/mine/orderList',
  //   name: 'orderList',
  //   component: resolve => require(['Views/mine/orderList.vue'], resolve),
  //   meta: {
  //     title: '我的注单'
  //   }
  // },
  // {
  //   path: '/newProfitLoss',
  //   name: 'newProfitLoss',
  //   component: resolve => require(['Views/mine/newProfitLoss.vue'], resolve),
  //   meta: {
  //     title: '今日盈亏'
  //   }
  // },
  // {
  //   path: '/agentTitle',
  //   name: 'agentTitle',
  //   component: resolve => require(['Views/agency/agentTitle.vue'], resolve),
  //   meta: {
  //     title: '平台代理说明'
  //   }
  // }

  ]
})
// eslint-disable-next-line eol-last
export default router