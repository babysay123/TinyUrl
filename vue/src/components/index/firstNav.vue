<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-17 14:12:25
 * @LastEditTime: 2019-11-08 16:34:40
 * @LastEditors: Please set LastEditors
 -->
<template>
  <section class="tabDetails">
    <div
      class="positioning"
      v-for="(i, index) in gameList"
      :key="index + '-detail'"
      @click="i.enable ? play(i) : maintenance()"
      :style="i.gameName === 'ag体育' ? 'width:100%; height:auto;' : ''"
    >
      <p v-if="!i.enable" class="grayTaxt">维护中</p>
      <img
        v-lazy="i.url"
        :key="i.url"
        data-was-processed="true"
        :class="i.enable?'':'gray'"
        :style="i.gameName === 'ag体育' ? 'width:100%; height:auto;' : ''"
      />
    </div>
  </section>
</template>
<script>
import { Toast, Indicator } from 'mint-ui'
import { loginGameApi, transferMoney, userInfoApi } from 'Plugins/api'
export default {
  props: ['platformlist', 'platformType', 'gameList'],
  data () {
    return {
    }
  },
  created () {},
  methods: {
    getuserinfo () {
      userInfoApi().then(v => {
        this.$store.commit('updateUserInfo', v.data)
      })
    },
    async getTransferMoney (item) {
      Indicator.open('加载中...')
      transferMoney({ 'transferStatus': 2 }, { type: 'notips' }).then(val => {
        if (val.code !== 0) {
          // Toast({
          //   message: '正在' + (val.data.platformName ? val.data.platformName : val.data.fromPlatformName) + '中进行游戏',
          //   duration: 1500
          // })
          return
        }
        Indicator.open('加载中...')
        transferMoney(item ? { 'gameCode': item.platformCode, 'transferStatus': 1 } : { 'transferStatus': 2 }, { type: 'notips' }).then(data => {
          if (item && data.code !== 0) {
            Toast({
              message: '当前正在' + (data.data.platformName ? data.data.platformName : data.data.fromPlatformName) + '中进行游戏，账户不能同时进行其他游戏。',
              duration: 1500
            })
            return
          }
          setTimeout(() => {
            Indicator.open('加载中...')
          }, 100)
          loginGameApi({ 'platformCode': item.platformCode, 'gameKindId': item.gameKindId, 'gameCode': item.gameCode }).then(res => {
            // this.open = window.open(res.data || 'javascript:void(0);', 'game')
            window.location.href = res.data
            if (!this.open) {
              window.location.href = res.data
            }
          })
          userInfoApi().then(v => {
            this.$store.commit('updateUserInfo', v.data)
          })
        })
      })
    },
    async play (item) {
      let loginInfo = this.Utils.Storage.get('user')
      if (loginInfo) {
        this.getTransferMoney(item)
      } else {
        Toast({
          message: '请登录',
          duration: 1000
        })
        window.location.href = '/mobile/studio/#/login'
      }
    },
    maintenance () {
      Toast({
        message: '此游戏正在维护中',
        duration: 1000
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.box {
  position: relative;
  display: block;
  width: 49%;
  border-radius: 4px;
  overflow: hidden;
  float: left;
  margin-top: 4px;
  &:nth-child(2n) {
    margin-left: 2%;
  }
  .box-img {
    width: 100%;
  }
}
.tabDetails {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  flex: 1;
  background: rgba(255, 255, 255, 1);
  // background: rgb(245,244,249);
  .positioning {
    position: relative;
    display: block;
    // flex: 1;
    width: 25%;
    text-align: center;
    margin: 6px 0px;

    img {
      // width: 60%;
      width: 80%;
      padding: 1px;
    }
  }
}
.gray {
  -webkit-filter: grayscale(100%);
  -moz-filter: grayscale(100%);
  -ms-filter: grayscale(100%);
  -o-filter: grayscale(100%);
  filter: grayscale(100%);
  filter: gray;
}
.grayTaxt {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 200;
  transform: translate(-50%,-50%);
  color: #fff;
  font-size: 15px;
  font-weight: bold;
}
</style>
