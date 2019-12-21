const commonMap = new Map([
    [ 'orders', '/mobile/mine/orderList.html' ],
    [ 'accountDetail', '/mobile/mine/accountList.html' ],
    [ 'rechargeRecord', '/mobile/studio/#/rechargeRecord' ],
    [ 'withdrawRecord', '/mobile/mine/rechargeList.html?type=1' ],
    [ 'messages', '/mobile/mine/noticeCenter.html' ],
    [ 'securityCenter', '/mobile/mine/editPwd.html' ],
    [ 'profitLoss', '/mobile/mine/profitLoss.html' ],
    [ 'onlineService', 'customerServiceUrl' ],
    [ 'playRules', '/mobile/mall/innerHtml.html?url=/mobile/other/playing.html' ]
  ])

  console.log(commonMap.get('onlineService'))