<!--
 * @Author: your name
 * @Date: 2019-10-17 17:09:49
 * @LastEditTime: 2019-11-12 20:07:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /d:\cp8h5\cp8h5\vue\src\views\recharge\newVipToUp.vue
 -->
/* eslint-disable no-unused-vars */
<template>
  <div>
    <Head fixed>
      <h3>{{title}}</h3>
    </Head>
    <div class="user-info recharge-list">
      <p>
        <span class="text-yellow">温馨提示：添加代理微信、支付宝充值24小时在线10秒内到账</span>
      </p>
      <div>
      <div class="account">
        <span>
          我的账号：
          {{ getUserInfo.account }}
        </span>
        <img
        class="btn-style"
        src="/mobile/images/new/app/button_fz.png"
        :data-clipboard-text="getUserInfo.account"
        @click="copyId"
      />
      </div>
      </div>
      <img class="link-style" src="/mobile/images/new/app/button_yw.png" @click="helpAlert"/>
    </div>
    <main>
      <div class="myGener-msgBox" v-for="(item,index) in payways" :key="index">
        <h2>{{item.title}}</h2>
        <h5>{{item.account}}</h5>
        <h5 v-if="item.accountNick !=null">{{item.accountNick}}</h5>
        <h5 v-else style="color:#fff">'暂无昵称'</h5>
        <mt-button
          :class="'a' + item.account"
          :data-clipboard-text="item.account"
          size="small"
          plain
          @click="skipRouse(item.rechargeType,item.account)"
        >复制跳转</mt-button>
      </div>
    </main>
    <informAlert ref="aelrt"></informAlert>
  </div>
</template>
<script>
import Head from 'Components/global/head'
import informAlert from 'Components/global/informAlert'
import { Toast } from 'mint-ui'
import Clipboard from 'clipboard'
export default {
  data () {
    return {
      title: '',
      userInfo: this.Utils.Storage.get('user') || { account: '', userId: 0 },
      payways: []
    }
  },
  computed: {
    getUserInfo: {
      get () {
        return this.userInfo
      },
      set (info) {
        this.userInfo = info
      }
    }
  },
  components: { Head, informAlert },
  mounted () {
    const { payways, title } = this.Utils.Storage.get('rechargeConfig')
    this.title = title
    this.payways = payways
    // console.table('payways:', payways)
    // console.log('title:', title)
  },
  methods: {
    helpAlert () {
      this.$refs.aelrt.openAlert = true
      this.$refs.aelrt.content = `<h4>温馨提示: </h4><p>1.点击按钮后,系统会帮您复制微信和QQ号,3秒后自动跳转到微信、QQ、支付宝,添加好友时,长按屏幕粘贴即可,加完之后10秒内帮您完成充值</p><p>2.付款时备注你的游戏账号,客服将会为您快速上分</p>`
    },
    skipRouse (item, type) {
      var clipboard = new Clipboard('.a' + type)
      clipboard.on('success', e => {
        Toast('复制成功')
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        Toast('该浏览器不支持自动复制')
        clipboard.destroy()
      })
      // 下面是跳转
      var scheme = '' // 需要打开的app scheme 地址
      if (item === 8) {
        window.open(type)
      } else {
        switch (item) {
          case 1:
            scheme = 'alipayqr://platformapi/startapp'
            break
          case 2:
            scheme = 'weixin://'
            break
          case 4:
            scheme = `mqqwpa://im/chat?chat_type=wpa&uin=${type}`
            break
        }
      }
      // console.log(scheme)
      setTimeout(() => {
        window.location.href = scheme // 尝试打开 scheme
        var downloader = setTimeout(() => {
          Toast('跳转失败,请手动打开APP或下载后重试')
        }, 3000)
        document.addEventListener(
          'visibilitychange webkitvisibilitychange',
          function () {
            // 如果页面隐藏，推测打开scheme成功，清除提示
            if (document.hidden || document.webkitHidden) {
              clearTimeout(downloader)
            }
          }
        )
        window.addEventListener('pagehide', function () {
          clearTimeout(downloader)
        })
      }, 100)
    },
    copyId () {
      var clipboard = new Clipboard('.btn-style')
      console.log(clipboard)
      clipboard.on('success', e => {
        Toast('复制成功')
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        Toast('该浏览器不支持自动复制')
        clipboard.destroy()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.recharge-list {
  margin-top: 1.125rem;
  height: calc(100vh - 1.125rem);
  padding: 0.3rem;
  p {
    font-size: 12px;
  }
}
.user-info {
  height: auto;
  position: relative;
  background: rgb(104, 82, 61);
}
.text-yellow {
  color: rgb(240, 232, 64);
}
.account {
  height:.7rem;
  margin-top:.2rem;
  text-align: left;
  display: inline-block;
  span {
    line-height:.7rem;
    color:#fff;
  }
}
.btn-style {
  width: 15%;
  position: relative;
  top:.08rem;
  left:.1rem;
}
.link-style {
  width: 6%;
  position: absolute;
  top:.1rem;
  right:.1rem;
}
main {
  width: 100%;
}
.myGener-msgBox {
  margin: 2.5% 0 0 2.5%;
  float: left;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  text-align: center;
  width: 30%;
  padding: 9px 0;
  background: #fff;
  border-radius: 10px;
  -moz-appearance: none;
  -webkit-appearance: none;
  color: #666;
  -webkit-box-shadow: 0 6px 6px rgba(0, 0, 0, 0.1);
  box-shadow: 0 6px 6px rgba(0, 0, 0, 0.1);
  h2 {
    font-weight: 400;
    line-height: 23px;
    font-size: 18px;
  }
  h5 {
    line-height: 22px;
    font-size: 13px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #a1a1a1;
  }
}
section div:last-child {
  margin-bottom: 30px;
}
.mint-button--small {
  height: 23px;
  font-size: 12px;
}
</style>
