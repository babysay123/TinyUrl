<template>
  <section class="personal-cell">

    <!-- <div
      v-for="(c, index) in data"
      :key="index"
      class="personal-cell-item"
      :class="{ 'personal-cell-message': c.id === 5 }"
      @click="directLink(c.url)"
    >
      <img v-lazy="c.iconUrl">
      <span class="one-line">{{ c.iconDes }}</span>

      <div class="personal-cell-message-badge bg-col" v-if="c.id === 5 && c.badge">{{ c.badge }}</div>
    </div>

    <div class="personal-cell-item" v-if="data.length % 3 === 1">
      <div class="personal-cell-item-placeholder">
      </div>
      <span>&nbsp;</span>
    </div> -->
    <nav class="cell-head">
      <a>红包</a>
      <a>电子</a>
      <a>棋牌</a>
      <a>休闲</a>
    </nav>
    <div class="cell-main">
      <ul>
        <li>福利</li>
        <li>扫雷</li>
        <li>牛牛</li>
        <li>禁枪</li>
        <li>抢庄牛牛</li>
      </ul>
    </div>

  </section>
</template>

<script>
// import { mineTableApi } from 'Plugins/api'
// import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      data: []
    }
  },
  computed: {
    // ...mapGetters([ 'system_config' ])
  },
  methods: {
    async getConfigList () {
      // const res = await mineTableApi()
      // this.data = res.data
    },
    directLink (link) {
      console.log(link)
      /**
       * @author Cyan
       * @var {String} shouldLink 导航块需要跳转的地址
       * @var {String} serviceUrl 客服地址
       * @var {Map} commonMap 普通导航地址库匹配
       * @description 解析配置跳转地址 对代理中心做单独处理 其余跳转直接替换地址库地址
       */
      // let shouldLink = ''
      // if (/agent/.test(link) || link.indexOf('url=') > -1) {
      //   shouldLink = '/mobile/agent/agentCenter.html'
      //   // shouldLink = '/mobile/studio/#/agency_center'
      // } else {
      //   // const { customerServiceUrl } = this.system_config.status
      //   const commonMap = new Map([
      //     ['spread', '/mobile/studio/#/generalizeNav'],
      //     [ 'orders', '/mobile/studio/#/orderList' ],
      //     [ 'accountDetail', '/mobile/mine/accountList.html' ],
      //     [ 'rechargeRecord', '/mobile/studio/#/rechargeRecord' ],
      //     [ 'transferAmount', '/mobile/studio/#/amountConver' ],
      //     [ 'withdrawRecord', '/mobile/mine/rechargeList.html?type=1' ],
      //     [ 'messages', '/mobile/mine/noticeCenter.html' ],
      //     [ 'securityCenter', '/mobile/mine/editPwd.html' ],
      //     [ 'profitLoss', '/mobile/studio/#/newProfitLoss' ],
      //     // [ 'onlineService', customerServiceUrl ],
      //     [ 'onlineService', '/mobile/studio/#/mine/onlineService' ],
      //     [ 'playRules', '/mobile/mall/innerHtml.html?url=/mobile/other/playing.html' ],
      //     ['interestRateBao', '/mobile/studio/#/balance'],
      //     ['cleanCode', '/mobile/studio/#/mine/cleanCode']
      //   ])
      //   shouldLink = commonMap.get(link.replace(/[\s\S]*\/wwc\//, ''))
      // }
      // if (shouldLink === '/mobile/studio/#/generalizeNav') {
      //   this.$store.commit('voice', 'generalize')
      // } else if (shouldLink === '/mobile/studio/#/mine/onlineService') {
      //   this.$store.commit('voice', 'service')
      // }
      // this.routerLink({
      //   path: shouldLink,
      //   redirect: true
      // })
    }
  },
  created () {
    // this.getConfigList()
    // this.$axios.get('/changeMoney/getCanUsing.do').then(data => {
    //   console.loig(data)
    // })
  }
}
</script>

<style lang="scss" scoped>
@import 'Assets/css/base.color.scss';
.personal-cell {
  width: 100%;
  background: #fff;
  overflow: hidden;
  margin-bottom: 49px;

  .cell-head {
    margin: 10px 10px 0 10px;
    text-align: center;
    a {
      box-sizing: border-box;
      // padding: 10px;
      display: inline-block;
      width: 25%;
      line-height: 26px;
      height: 26px;
      border-bottom: 1px solid #eee;
    }
  }
  .cell-main {
    margin: 0 10px 0px 10px;
    ul {
      text-align: center;
      li {
        display: inline-block;
        line-height: 26px;
        width: 25%;
        // padding: 8px;
        box-sizing: border-box;
      }
    }
  }
  // .personal-cell-item {
  //   float: left;
  //   padding: .7rem;
  //   text-align: center;
  //   font-size: 14px;
  //   width: calc(100% / 3 - 1px);
  //   box-sizing: border-box;
  //   border-bottom: 1px solid #f5f4f9;
  //   border-right: 1px solid #f5f4f9;
  //   &:nth-child(3n) {
  //     border-right: none;
  //   }
  //   img {
  //     width: 1rem;
  //     display: block;
  //     margin: 0 auto 6px;
  //   }
  //   .personal-cell-item-placeholder {
  //     height: 1rem;
  //     margin-bottom: 6px;
  //   }
  // }
  // .personal-cell-message {
  //   position: relative;
  //   .personal-cell-message-badge {
  //     position: absolute;
  //     width: 20px;
  //     height: 20px;
  //     text-align: center;
  //     line-height: 20px;
  //     right: 1rem;
  //     top: .7rem;
  //     color: #fff;
  //     border-radius: 50%;
  //   }
  // }
}
</style>
