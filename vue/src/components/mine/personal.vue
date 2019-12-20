<!-- -->
<style lang="scss" scoped>
.personal {
  height: 5rem;
  width: 100%;
  position: relative;
  background: url('/mobile/images/mine/userCenterBg.png') no-repeat;
  background-size: 100% 100%;
  background-position: center;
}
.personal-bg {
  height: 5rem;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: url('/mobile/images/mine/userCenterBg_lines.png') no-repeat;
  background-size: contain;
  background-position: center center;
  .identity {
    position: absolute;
    left: 56%;
    top: 2.5rem;
    padding: 0 .2rem;
    height: .5rem;
    background: #fff;
    border-radius: .2rem;
    color: #EA477A;
    font-size: .3rem;
    line-height: .5rem;
  }
}
.setting-icon {
  width: .75rem;
  height: .75rem;
  position: absolute;
  z-index: 1;
  top: 25%;
  right: .8125rem;
  margin-top: -.5625rem;
}
.avatar-box {
  position: absolute;
  width: 2.5rem;
  height: 2.5rem;
  left: 50%;
  top: 38%;
  margin-left: -1.25rem;
  margin-top: -1.25rem;
  background: url('/mobile/images/mine/userBg.png') no-repeat center center;
  background-size: 100% 100%;
  filter: blur(.2px);
  .avatar-icon {
    position: absolute;
    width: 2.125rem;
    height: 2.125rem;
    top: 50%;
    left: 50%;
    display: block;
    margin-top: -1.0625rem;
    margin-left: -1.0625rem;
  }
}
.personal-info {
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  text-align: center;
  ul {
    overflow: hidden;
    padding: 8px 0;
    li {
      float: left;
      padding: 0 .25rem;
      box-sizing: border-box;
      font-size: .375rem;
      color: #fff;
      &:first-child,
      &:last-child {
        width: 30%;
      }
      &:nth-child(2) {
        width: 40%;
        border-left: 1px solid #fff;
        border-right: 1px solid #fff;
      }
      p {
        height: .625rem;
        line-height: .625rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .refresh-icon {
        width: 12px;
        height: 12px;
        margin-left: 5px;
      }
    }
  }
}
.personal-progress {
  display: flex;
  align-items: center;
  justify-content: center;
}
.refresh{
  -webkit-transition-property: -webkit-transform;
  -webkit-transition-duration: 1s;
  -moz-transition-property: -moz-transform;
  -moz-transition-duration: 1s;
  -webkit-animation: rotate 1s linear infinite;
  -moz-animation: rotate 1s linear infinite;
  -o-animation: rotate 1s linear infinite;
  animation: rotate 1s linear infinite;
 }
  @-webkit-keyframes rotate{from{-webkit-transform: rotate(0deg)}
     to{-webkit-transform: rotate(360deg)}
 }
 @-moz-keyframes rotate{from{-moz-transform: rotate(0deg)}
     to{-moz-transform: rotate(359deg)}
 }
 @-o-keyframes rotate{from{-o-transform: rotate(0deg)}
     to{-o-transform: rotate(359deg)}
 }
 @keyframes rotate{from{transform: rotate(0deg)}
     to{transform: rotate(359deg)}
 }
</style>

<template>
  <div class="personal">
    <div class="personal-bg">

      <img @click="popupControl({ key: 'setting', val: true })" class="setting-icon" src="/mobile/images/mine/userSetting.png">

      <div class="avatar-box">
        <img
          class="avatar-icon"
          :src="getUserInfo.avatar || '/mobile/images/mine/geren_tou.png'"
          @click="popupControl({ key: 'personalInfo', val: true })"
        >
      </div>

      <div class="identity">{{ userInfo.role===0 ?'会员' : '代理' }}</div>

      <div class="personal-info">
        <ul>

          <li>
            <p class="one-line">￥{{ getUserInfo.balance | numFixed }}</p>
            <p class="one-line" @click="doRefresh">
              余额
              <img class="refresh-icon" :class="{'refresh': refreshSty}" src="/mobile/images/mine/userReload.png">
            </p>
          </li>

          <li>
            <p class="one-line">{{ getUserInfo.account }}</p>
            <p class="personal-progress one-line">
              <span>v{{ isLevelMax(getUserInfo.levelId).left }}</span>
              <LevelProgress
                style="flex: 1; margin: 0 5px"
                :progress="getUserInfo.progress"
                :max-level="isLevelMax(getUserInfo.levelId).max"
              />
              <span>v{{ isLevelMax(getUserInfo.levelId).right }}</span>
            </p>
          </li>

          <li>
            <p class="one-line">￥{{ amount | numFixed }}</p>
            <p>最近出款金额</p>
          </li>

        </ul>
      </div>
    </div>

  </div>
</template>

<script>
import LevelProgress from './levelProgress'
import { getWithdrawalApi, transferMoney } from 'Plugins/api'
import { mapGetters, mapMutations, mapActions, mapState } from 'vuex'
// import { Toast } from 'mint-ui'

export default {
  components: { LevelProgress },
  data () {
    return {
      setting: false,
      amount: 0,
      userInfo: this.Utils.Storage.get('user'),
      refreshSty: false
    }
  },
  computed: {
    ...mapGetters([ 'getUserInfo' ]),
    ...mapState({
      init (state) {
        // 刷新页面的时候，会重新初始化，没有值返回false
        return state.chatRoom.init
      } })
    // role () {
    //   // 获取用户等级
    //   return this.getUserInfo.role === 1 ? '代理' : '会员'
    // }
    // withdrawal () {
    //   return this.getUserInfo.amount || 0
    // }
  },
  mounted () {
    this.refreshUserInfo()
    this.getWithdrawal()
  },
  methods: {
    ...mapMutations([ 'popupControl' ]),
    ...mapActions([ 'refreshUserInfo' ]),
    isChangeAvatar (control) {
      /** 是否是直接设置头像 跳过设置页 */
      this.$refs.setting.info = !!control
      this.$refs.setting.skip = !!control
      this.setting = true
    },
    async doRefresh () {
      this.refreshSty = true
      const { code } = await transferMoney({ 'transferStatus': 2 }, { type: 'notips' })
      if (code === 0) {
        this.refreshUserInfo()
        this.getWithdrawal()
      }
      this.refreshSty = false
      // Toast({
      //   message: `正在${data.platformName ? data.platformName : data.fromPlatformName}中进行游戏，请结束后再尝试刷新`,
      //   duration: 1200
      // })
    },
    async getWithdrawal () {
      // 获取提提现金额
      const res = await getWithdrawalApi()
      const { code, data, msg } = res
      if (code === 0) {
        if (data.length === 0) {
          this.amount = 0
        } else {
          this.amount = data[0].amount
        }
      } else {
        this.$toast({
          message: msg,
          duration: 1800
        })
      }
      // return this.getUserInfo.withdrawal ? this.getUserInfo.withdrawal : 0
    },
    isLevelMax (levelId) {
      let maxLevel = 10
      if (levelId < maxLevel) {
        return {
          left: levelId,
          right: levelId + 1,
          max: false
        }
      } else {
        return {
          left: 9,
          right: 10,
          max: true
        }
      }
    }
  }
}
</script>
