<!--
 * @Author: your name
 * @Date: 2019-11-12 17:00:43
 * @LastEditTime: 2019-11-12 21:05:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cp8h5\vue\src\views\recharge\vipreacharg.vue
 -->
<style lang="scss" scoped>
@import 'Assets/css/base.color.scss';

.content{
width: 100%;
display: flex;
flex-wrap: wrap;
    background: #fff;
    margin-top: 4px;
li{
    width: 28%;
    text-align: center;
    border: 1px solid #eee;
    margin-left: 15px;
    margin-top: 12px;
    border-radius: 5px;
  img{
    width: 16%;
    vertical-align: middle;
  }
  :nth-child(3){
    color: #999;
  }
  p{
    line-height: .7rem;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  div{
    width: 100%;
    a{
    width: 72%;
    margin: auto;
    display: block;
    background: $baseCol;
    border-radius: 4px;
    line-height: .5rem;
    margin-bottom: 10px;
    color: cornsilk;
    }
  }
}
}
</style>
<template>
  <div>
    <ul class="content">
      <li v-for="(item, index) in vipchannel.payways" :key="index">
        <p>
          <img :src="item.icon">
          {{item.title}}
        </p>
        <p>{{item.accountNick}}</p>
        <p>{{item.account}}</p>
        <div>
          <a  @click="skipRouse(item.rechargeType,item.account)">复制跳转</a>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { Toast } from 'mint-ui'
import Clipboard from 'clipboard'
export default {
  props: ['vipchannel'],
  methods: {
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
    }
  }
}
</script>
