<style lang="scss">
/* footer betting */
.footer-menu .footer-betting{
  display: block;
  max-width: 780px;
  margin: 0 auto;
  border-top: 1px solid rgb(122, 122, 122);
  overflow: hidden;
  position: relative;
  background: #222;
  padding: 0.0625rem 0;
}
.footer-betting p{
  // line-height: 36px;
  // height: 36px;
  // font-size: 14px;
  text-align: center;
  font-size: 12px;
  line-height: 0.5rem;
  height: 0.5rem;
  // &:first-child {
  //   padding-top: 0.0625rem;
  // }
  // &:last-child {
  //   padding-bottom: 0.0625rem;
  // }
}
.footer-betting p span{
  // font-size: 14px;
  // color: #fff;
}
.footer-betting p span.text-red{
  margin-left: 0.25rem;
}
.footer-betting .relative{
  position: relative;
  overflow: hidden;
  height: 1.125rem;
  padding-left: 10px;
}
.footer-betting .relative h4{
  font-weight: 100;
  font-size: 13px;
  // height: 0.625rem;
  // line-height: 0.625rem;
  height: 0.5625rem;
  line-height: 0.5625rem;
}
.footer-betting .relative h5{
  font-weight: 100;
  font-size: 12px;
  // height: 0.5rem;
  // line-height: 0.5rem;
  height: 0.5625rem;
  line-height: 0.5625rem;
}

.footer-betting a{
  display: block;
  position: absolute;
  width: 1.5rem;
  line-height: 0.875rem;
  height: 0.875rem;
  text-align: center;
}
.footer-betting .btn-clear{
  font-size: 13px;
  color: #fff;
  left: 0.125rem;
  top: 0.125rem;
  background:#333;
  border-radius:.15rem;
}
.footer-betting .btn-bet{
  font-size: 14px;
  // color: #222222;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-appearance: none;
  -webkit-appearance : none;
  // background: rgb(253, 190, 37);
  right: 0.125rem;
  top: 0.125rem;
}
// .footer-betting .btn-bet:active{
//   background: #FDBE81;
// }
.footer-fixed-gap{
  margin-bottom: 1.1875rem;
}
</style>

<template>
  <section id="footerMenu" class="footer-menu">
    <div class="footer-betting">
      <p><span class="text-white">{{size?size:0}}注</span><span class="text-red">{{sum?sum:'0.00'}}元</span></p>
      <p style="max-width:74%; margin-left:13%; white-space: nowrap; text-overflow: ellipsis; overflow: hidden;">
        <span class="text-white">{{UserInfo.account?'用户余额':'未登录'}}</span><span class="text-red">{{UserInfo.balance>=0 ?(UserInfo.balance.toFixed(2)-sum).toFixed(2)+'元' : ''}}</span>
      </p>
      <a class="btn-clear" @click="clearBtn()">清空</a>
      <a class="btn-bet btn-bet-col" @click="betBtn()">投注</a>
    </div>
  </section>
</template>

<script>
import { ToastMsg } from './module/tools'
import AllPop from 'Components/allpop'
export default {
  name: 'betting-foot',
  components: { AllPop },
  props: ['size', 'sum', 'isLogin'],
  data () {
    return {
      sizeShow: '',
      noData: '',
      content: '请选择投注',
      popShow: false,
      UserInfo: this.$store.getters.getUserInfo
    }
  },
  watch: {
    '$store.state.UserInfo': function (val) {
      // console.log('betting pop user info ' + val)
      console.log(this.$store.state.UserInfo)
      this.UserInfo = this.$store.state.UserInfo
    }
  },
  methods: {
    clearBtn () {
      this.$emit('clean', true)
      this.$parent.clearSelect()
    },
    betBtn () {
      let _ts = this
      if (!_ts.size || _ts.size < 1) {
        // ToastMsg('亲，请先选择投注哦。')
        this.$emit('childFn', true)
        return false
      }
      // 验证登录
      this.Utils.UserTool.isLogin(function (flag, data) {
        if (flag === 'error') {
          ToastMsg('信号差，请检查网络')
          return false
        }
        if (flag) {
          // 确认登录，把用户信息保存到vuex
          _ts.$store.dispatch('dictSave', {
            'UserInfo': data
          })
          _ts.$store.getters.getUserInfo.balance = _ts.$store.getters.getUserInfo.balance - _ts.sum
          console.log(_ts.$store.getters.getUserInfo.balance)
          _ts.$parent.bettingPop()
        } else {
          ToastMsg('亲，请先登录哦。')
          setTimeout(function () {
            window.location.href = '/mobile/studio/#/login'
          }, 1800)
        }
      })
    }
  },
  created () {
    console.log(this.UserInfo)
  }
}
</script>
