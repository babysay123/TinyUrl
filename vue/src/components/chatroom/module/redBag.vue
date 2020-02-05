<template>
  <div class="messages">
    <!-- 普通红包 -->
    <div
      :class="redBagClass"
      v-if="typeShow === 'normal'"
      @click="doClick"
    >
      <img
        style="width: 100%;"
        :src="redBagBG"
      >
      <div class="msg">
        <img src="/mobile/img/chatroom/redbag/red-icon-disabled_Normal@2x.png" alt="" />
        <h3>0-0</h3>
        <h5>查看红包</h5>
      </div>
      <h4>扫雷红包</h4>
    </div>
    <!-- 福利红包 -->
    <div
      :class="redBagClass"
      v-if="typeShow === 'gift'"
      @click="doClick"
    >
      <img
        style="width: 100%;"
        :src="redBagBG"
        alt="">
      <div class="msg">
        <h5>查看红包</h5>
      </div>
      <h4>福利红包</h4>
    </div>
    <!-- 游戏红包 -->
    <div
      :class="redBagClass"
      v-if="typeShow === 'game'"
      @click="doClick"
    >
      <img
        style="width: 100%;"
        :src="redBagBG"
        alt="">
      <div class="msg">
        <h3>0-0</h3>
        <h5>查看红包</h5>
      </div>
      <h4>牛牛红包</h4>
    </div>
    <div
      :class="redBagClass"
      v-if="typeShow === 'gameDetail'"
      @click="doClick"
    >
      <img
        style="width: 100%;"
        :src="redBagBG"
        alt="">
      <div class="msg">
        <ul>
          <li>庄赢<span>0</span></li>
          <li>闲赢<span>0</span></li>
        </ul>
      </div>
      <div class="detail">
        <img
          src="/mobile/img/icon_loading_Normal1.png"
          alt="">
        <h4 style="margin-top: 2px;">家</h4>
        <h4 class="detail-level">
          <img src="/mobile/img/chatroom/redbag/cow_banker_Normal@2x.png" alt="">
          <img src="/mobile/img/chatroom/redbag/num/cow_0_Normal@3x.png" alt="">
        </h4>
        <a>查看详情</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'message-redBag',
  props: {
    isSelf: {
      type: Boolean,
      default: false
    },
    isReceived: {
      type: Boolean,
      default: false
    },
    typeShow: {
      type: String,
      required: true
    },
    dataMsg: {
      type: Object
    }
  },
  computed: {
    redBagBG () {
      const normal = {
        self: '/mobile/img/chatroom/redbag/redp_back_S_Normal@2x.png',
        selfReceived: '/mobile/img/chatroom/redbag/redp_back_disabled_S_Normal@2x.png',
        other: '/mobile/img/chatroom/redbag/redp_back_R_Normal@2x.png',
        otherReceived: '/mobile/img/chatroom/redbag/redp_back_disabled_R_Normal@2x.png'
      }
      const gift = {
        self: '/mobile/img/chatroom/redbag/redp_back_fu_S_Normal@2x.png',
        selfReceived: '/mobile/img/chatroom/redbag/redp_back_fu_disabled_S_Normal@2x.png',
        other: '/mobile/img/chatroom/redbag/redp_back_fu_R_Normal@2x.png',
        otherReceived: '/mobile/img/chatroom/redbag/redp_back_fu_disabled_R_Normal@2x.png'
      }
      const game = {
        self: '/mobile/img/chatroom/redbag/B1_Normal@2x.png',
        selfReceived: '/mobile/img/chatroom/redbag/B2_Normal@2x.png',
        other: '/mobile/img/chatroom/redbag/A1_Normal@2x.png',
        otherReceived: '/mobile/img/chatroom/redbag/A2_Normal@2x.png'
      }
      const gameDetail = {
        self: '/mobile/img/chatroom/redbag/cattle_result_Normal@2x.png',
        selfReceived: '/mobile/img/chatroom/redbag/cattle_result_Normal@2x.png',
        other: '/mobile/img/chatroom/redbag/cattle_result_Normal@2x.png',
        otherReceived: '/mobile/img/chatroom/redbag/cattle_result_Normal@2x.png'
      }
      const bgs = { normal, gift, game, gameDetail }
      // console.log(this.isReceived, this.isSelf)

      if (this.isSelf) {
        if (this.isReceived) {
          return bgs[this.typeShow].selfReceived
        }
        return bgs[this.typeShow].self
      }
      if (this.isReceived) {
        return bgs[this.typeShow].otherReceived
      }
      return bgs[this.typeShow].other
      // const bgs = {
      //   normal: () => {
      //     return '/mobile/img/chatroom/redbag/redp_back_R_Normal@2x.png'
      //   }
      // }
      // return '/mobile/img/chatroom/redbag/redp_back_R_Normal@2x.png'
    },
    redBagClass () {
      // console.log(this.isSelf)
      return `redBag redBag-${this.typeShow} ${this.isSelf && 'owner'}`
    }
  },
  data () {
    return {
      dict: {}
    }
  },
  methods: {
    doClick () {
      const fns = {
        'normal': this.clickNormal,
        'gift': this.clickGift,
        'game': this.clickGame,
        'gameDetail': this.clickGameDetail
      }
      fns[this.typeShow]()
    },
    clickNormal () {
      console.log('show normal red bag')
      this.$emit('normalCallBack')
    },
    clickGift () {
      console.log('show gift red bag')
    },
    clickGame () {
      console.log('show game red bag')
    },
    clickGameDetail () {
      console.log('show game detail')
    }
  }
}
</script>

<style lang="scss" scoped>
.messages {
  margin: 2px 0 5px;
  & > div {
    max-width: 76%;

    &.owner {
      margin-left: 24%;
    }
  }

  .redBag {}
  .redBag-normal {
    // background:  url('/mobile/img/chatroom/redbag/redp_back_R_Normal@2x.png') no-repeat;
    // background-size: contain;
    // height: 108px;
    font-size: 0;
    position: relative;
    .msg {
      position: absolute;
      top: 0;
      width: 100%;
      padding-left: 0.75rem;
      padding-top: 0.25rem;
      // height: 81px;
      box-sizing: border-box;
      overflow: hidden;
      // padding: 14px 15px 14px 29px;
      font-size: 0;
      color: #fff;
      img {
        width: 1.125rem;
        float: left;
        margin-right: 5px;
      }
      h3 {
        font-weight: 100;
        line-height: 0.6875rem;
        font-size: 15px;
      }
      h5 {
        font-weight: 100;
        line-height: 0.6875rem;
        font-size: 14px;
      }
    }
    h4 {
      position: absolute;
      width: 100%;
      // font-size: 0.375rem;
      font-size: 14px;
      bottom: 0;
      height: 0.6875rem;
      line-height: 0.6875rem;
      font-weight: 400;
      text-indent: 24px;
    }

    // &.received {
    //   background:  url('/mobile/img/chatroom/redbag/redp_back_disabled_R_Normal@2x.png') no-repeat;
    //   background-size: contain;
    // }
    &.owner {
      .msg {
        padding-left: 0.5rem;
      }
    }
  }
  .redBag-gift {
    // background:  url('/mobile/img/chatroom/redbag/redp_back_fu_R_Normal@2x.png') no-repeat;
    // background-size: contain;
    // height: 118px;
    // font-size: 0;
    position: relative;
    .msg {
      position: absolute;
      top: 0;
      color: #fff;
      width: 100%;
      // height: 91px;
      // padding-left: 0.75rem;
      // padding-top: 0.25rem;
      box-sizing: border-box;
      overflow: hidden;
      h5 {
        font-size: 14px;
        font-weight: 100;
        margin-top: 1.4375rem;
        text-indent: 24px;
        text-align: center;
      }
    }
    h4 {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 0.8125rem;
      line-height: 0.8125rem;
      font-weight: 400;
      text-indent: 24px;
    }

    // &.received {
    //   background:  url('/mobile/img/chatroom/redbag/redp_back_fu_disabled_R_Normal@2x.png') no-repeat;
    //   background-size: contain;
    // }

    &.owner {
      .msg {
        h5 {
          text-indent: -16px;
        }
      }
    }
  }

  .redBag-game {
    position: relative;
    // background: url('/mobile/img/chatroom/redbag/A1_Normal@2x.png') no-repeat;
    // background-size: contain;
    // height: 120px;
    .msg {
      position: absolute;
      top: 0;
      box-sizing: border-box;
      overflow: hidden;
      color: #fff;
      margin-top: 0.6875rem;
      margin-left: 1.75rem;
      // height: 91px;
      // margin-top: 4.4vh;
      h3 {
        font-weight: 100;
        line-height: 0.625rem;
        font-size: 15px;
        // margin-top: 36px;
        // margin-left: 72px;
      }
      h5 {
        font-weight: 100;
        line-height: 0.625rem;
        font-size: 14px;
        // margin-left: 72px;
      }
    }
    h4 {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 0.75rem;
      line-height: 0.75rem;
      font-weight: 400;
      text-indent: 22px;
    }

    &.owner {
      .msg {
        margin-left: 1.5625rem;
      }
    }
  }
  .redBag-gameDetail {
    max-width: 85%;
    // background: url('/mobile/img/chatroom/redbag/cattle_result_Normal@2x.png') no-repeat;
    // background-size: contain;
    // height: 200px;
    // margin-top: 5px;
    position: relative;
    overflow: hidden;
    font-size: 0;
    .msg {
      // height: 166px;
      // position: relative;
      // margin-top: 126px;
      position: absolute;
      width: 100%;
      bottom: 1.25rem;
      ul {
        background: palevioletred;
        overflow: hidden;
        li {
          float: left;
          width: 50%;
          text-align: center;
          font-size: 0.5rem;
          font-weight: 600;
          height: 40px;
          line-height: 40px;
          span {
            margin: 0 2px;
            color: #d81e06;
          }
        }
      }
    }
    .detail {
      // position: absolute;
      // bottom: 0;
      width: 100%;
      height: 1.25rem;
      line-height: 1.25rem;
      background: #fff;
      overflow: hidden;
      position: relative;
      img {
        width: 1rem;
        height: 1rem;
        float: left;
        margin: 0.125rem;
        border-radius: 3px;
      }
      h4 {
        line-height: 0.5625rem;
        height: 0.5625rem;
        font-size: 13px;
        font-weight: 100;

        &.detail-level {
          font-size: 0;
          img {
            display: inline-block;
            height: 0.4688rem;
            width: auto;
            margin: 0.0313rem 0.1875rem 0 0;
          }
        }
      }
      a {
        position: absolute;
        right: 6px;
        top: 0;
        font-size: 13px;
      }
    }

    &.owner {
      margin-left: 15%;
    }
  }
}
</style>
