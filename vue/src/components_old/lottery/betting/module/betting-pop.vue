<style lang="scss">
@import 'Assets/css/mix.scss';
.mint-popup.mt-nobg {
  background: none;
}
.recharge {
  text-align: left;
  position: relative;
  // margin: -50px -30px;
  width: 90vw;
  max-width: 640px;
  background: #fff;
  @include rounded-corners(5px);
}
.recharge-header {
  text-align: center;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}
.recharge-header h4 {
  font-weight: 200;
  font-size: 13px;
  line-height: 16px;
}
.recharge-header h5 {
  font-weight: 200;
  font-size: 12px;
  line-height: 18px;
  color:#A1A1A1;
}
.recharge-header h5 span {
  font-size: 12px;
}
.recharge-body > h4 {
  font-weight: 200;
  font-size: 12px;
  overflow: hidden;
  line-height: 26px;
  padding: 4px 10px 22px 10px;
  // margin-bottom: 3px;
}
.recharge-body > h4.no-rebate {
  padding: 4px 10px 4px 10px;
}
.recharge-body > h4 span {
  font-size: 12px;
}
.recharge-body h4 .left {
  float: left;
}
.recharge-body h4 .right {
  float: right;
}
.recharge-body .recharge-input {
  // margin-top: 20px;
  padding: 0 10px;
  margin-top: 6px;
  font-size: 12px;
  overflow: hidden;
  line-height: 26px;
}
.recharge-body .recharge-input span {
  font-size: 12px;
  margin-right: 5px;
  vertical-align: middle;
}
.recharge-body .recharge-input input {
  font-size: 12px;
  vertical-align: middle;
  height: 24px;
  box-sizing: border-box;
  padding: 0 5px;
  width: 52%;
  width: -moz-calc(100% - 48px - 5px - 24px * 2 - 6px * 2);
  width: -webkit-calc(100% - 48px - 5px - 24px * 2 - 6px * 2);
  width: calc(100% - 48px - 5px - 24px * 2 - 6px * 2);
  border: 1px solid #ccc;
}
.recharge-body .recharge-input a {
  font-size: 12px;
  padding: 4px 6px;
  color:#333;
  vertical-align: middle;
  margin-left: 5px;
}
.recharge-block {
  // padding: 10px;
  padding: 10px 10px 2px 10px;
}
.recharge-block .num {
  overflow: hidden;
}
.recharge-block .num li {
  float: left;
  margin-right: 10px;
  width: 30.5%;
  width: -moz-calc((100% - 20px) / 3);
  width: -webkit-calc((100% - 20px) / 3);
  width: calc((100% - 20px) / 3);
  text-align: center;
  margin-bottom: 10px;
}
.recharge-block .num li:nth-child(3n) {
  margin: 0;
}
.recharge-block .num li a {
  display: block;
  color: #A1A1A1;
  background: #eee;
  line-height: 28px;
  height: 28px;
  font-size: 12px;
}
.recharge-block .num li a:active, .recharge-block .num li.active a {
  color: #fff;
}
.recharge-block .sum li {
  font-size: 12px;
  line-height: 26px;
}
.recharge-block .sum li.gray {
  color: #A1A1A1;
}
.recharge-block .sum li span {
  font-size: 12px;
}
.recharge-btns {
  border-top: 1px solid #eee;
  padding: 10px;
  text-align: center;
  font-size:0;
  overflow: hidden;
}
.recharge-btns a {
  width: 30%;
  line-height: 36px;
  height: 36px;
  display:inline-block;
  vertical-align:middle;
  font-size: 13px;
  color: #fff;
  border-radius: 5px;
}
.recharge-btns .cancel {
  background: #999;
}
.recharge-btns2 a {
  width: 40%;
}
.recharge-btns2 .submit{
  margin-left:10%;
}
.recharge-share{
  padding-right:1px;
  font-size: 13px;
  color: #a1a1a1;
  float: left;
  line-height: 27px;
}
.recharge-btns /deep/ .mint-switch{height:26px;margin-bottom:.3rem;}
.recharge-btns /deep/ .mint-switch-core{width:45px;height:25px;}
.recharge-btns /deep/ .mint-switch-core::before{width:43px;height:23px;}
.recharge-btns /deep/ .mint-switch-core::after{width:23px;height:23px;}
.fastBettings{font-size:13px;color:#a1a1a1;}
.fastBetting{margin:0 5%;}
@media screen and (max-width: 350px) {
  .recharge-btns /deep/ .mint-switch-core{width:54px;height:25px;}
}
</style>

<template>
  <!-- 投注弹窗 -->
  <mt-popup
    :class="'mt-nobg'"
    v-model="bettingPop"
    popup-transition="popup-fade"
  >
    <div class="recharge">
      <div class="recharge-header">
        <h4>注单设定</h4>
        <h5 v-if="UserInfo.account">(当前余额：<span class="text-red">{{UserInfo.balance}}</span>元)</h5>
      </div>
      <div class="recharge-body">
        <h4 class="title no-rebate">
          <span class="left" id="odds">赔率：{{maxOdds ? maxOdds : '0.00'}}</span>
          <div class="clearfix"></div>
        </h4>
        <!-- <div class="clearfix"></div> -->
        <div class="recharge-input">
          <span>单注金额</span>
          <input type="tel" name="itemPrize" v-model="inputFee" maxlength="8" placeholder="输入单注金额">
          <a prize="1" class="active" href="javascript:void(0);">元</a>
          <!-- <a prize="0.1" href="javascript:void(0);">角</a>
          <a prize="0.01" href="javascript:void(0);">分</a> -->
        </div>
        <div class="clearfix"></div>
        <div class="recharge-block">
          <ul class="num">
            <li v-for="(num, inx) in quickList" :key="inx"><a href="javascript:void(0);" @click="quickBtn(num)">{{num}}</a></li>
          </ul>
          <div class="clearfix"></div>
          <ul class="sum">
            <li>下注注数：{{payment.size}}注</li>
            <li>下注总额：{{(inputFee * payment.size).toFixed(2)}}元</li>
            <li class="gray">若中奖，单注最高中<span class="text-red">{{threeDecimal(inputFee * maxOdds)}}</span>元</li>
          </ul>
        </div>
        <div class="recharge-btns" :class="{'recharge-btns2': payment.shares}">
          <section v-if="!payment.shares">
            <span class="recharge-share">分享注单:</span>
            <section class="tl fastBettings">
              <mt-switch v-model="value" class="dInV">
                <slot>(快捷投注时分享注单到当前房间)</slot>
              </mt-switch>
            </section>
          </section>
          <a class="cancel" @click="cancelBtn">取消</a>
          <a v-if="!payment.shares" class="submit-col fastBetting" @click="fastBetting">快捷投注</a>
          <a class="submit" @click="betBtn()">提交</a>
        </div>
      </div>
    </div>
  </mt-popup>
</template>

<script>
import { Switchs } from 'mint-ui'
import { ChangeThreeDecimal, ToastMsg } from './tools'
import { mapState } from 'vuex'
export default {
  name: 'betting-pop',
  inject: ['reload'],
  props: ['lotteryLayout', 'payment', 'isLogin', 'maxOdds'],
  data () {
    return {
      inputFee: '',
      bettingPop: false,
      quickList: ['10', '100', '1000', '5000', '10000', '50000'],
      UserInfo: {},
      value: false,
      shareBettingMoney: false,
      roomId: null,
      ws: null,
      loading: false // 防重复提交
    }
  },
  watch: {
    '$store.state.UserInfo': function (val) {
      // console.log('betting pop user info ' + val)
      this.UserInfo = this.$store.state.UserInfo
    },
    'maxOdds': function (val) {
    },
    'inputFee': function (val) {
      if (!val) {
        val = ''
        return
      } else {
        val = val.replace(/[^\d]/g, '') // 清除“数字”和“.”以外的字符
      }
      // val = val.replace(/\.{2,}/g, '.') // 只保留第一个. 清除多余的
      // val = val.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
      // val = val.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3')// 只能输入两个小数
      if (val.indexOf('.') < 0 && val !== '') {
        // 以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
        val = parseFloat(val)
      }
      this.inputFee = val + '' // 替换input的值
      this.payment.unitFee = val * 100 // 更新单注金额
      this.$parent.payment.unitFee = val * 100
      // console.log(this.$parent.payment)
    }
  },
  computed: {
    ...mapState({
      init (state) {
        return state.chatRoom.init
      }
    })
  },
  created () {
    this.shareBettingMoney = this.Utils.Storage.get('shareBettingMoney')
  },
  methods: {
    fastBetting () {
      // let _paymentArr = this.$store.getters.getPayments
      // _paymentArr.unshift(this.payment)
      let _lotteryMsg = this.$store.state.Lottery.lotteryMsg
      if (this.payment.issue !== _lotteryMsg.currentIssue) {
        this.payment.issue = _lotteryMsg.currentIssue
      }
      let arr = [
        this.payment
      ]
      if (Number(this.inputFee) > 10000000) {
        this.$toast({
          message: '金额超过最大限额(1千万)',
          position: 'middle',
          duration: 1500
        })
        return
      }
      if (this.loading) {
        this.$toast({
          message: '正在提交..请稍等..',
          duration: 1500
        })
        return
      } else {
        this.loading = true
      }
      if (this.inputFee.replace(/^\s+|\s+$/gm, '').length !== 0) {
        this.axios.postOnce('/front/bet/betting.do', arr)
          .then((res) => {
            setTimeout(() => {
              this.loading = false
            }, 2000)
            if (res.code === 0) {
              let type = 4
              this.roomId = this.init.message.chatRooms[0].roomId

              if (this.value && this.init) {
                if (this.init.message.member.type === 2) {
                  type = 10
                }
                if (this.shareBettingMoney && this.shareBettingMoney.currentRoom) {
                  this.roomId = this.shareBettingMoney.currentRoom.roomId
                }
                this.axios.get('/chat_room/share_order.do', {
                  params: {
                    orderId: res.data[0].orderId,
                    subId: res.data[0].subId,
                    roomId: this.roomId,
                    type: type,
                    openid: this.init.message.member.openid
                  }
                })
                  .then((res) => {
                    this.bettingPop = false
                    if (res.code === 0) {
                      this.$toast({
                        message: '分享成功',
                        position: 'middle',
                        duration: 3000
                      })
                      this.goWhere()
                    } else if (res.code === 1500) {
                      // if (res.msg === '操作失败(你已经被踢出该房间)' || res.msg.indexOf('被踢出') > -1) {
                      //   this.$toast({
                      //     message: '投注成功, 分享失败(你已经被踢出该房间)',
                      //     position: 'middle',
                      //     duration: 3000
                      //   })
                      // } else {
                      //   this.$toast({
                      //     message: '投注成功, 分享失败! ' + res.msg,
                      //     position: 'middle',
                      //     duration: 3000
                      //   })
                      // }
                      this.$toast({
                        message: '投注成功, 分享失败! ' + res.msg,
                        position: 'middle',
                        duration: 3000
                      })
                    }
                  })
                  .catch(() => {})
              } else {
                this.bettingPop = false
                this.$parent.clearSelect()
                this.$toast({
                  message: '快捷投注成功',
                  position: 'middle',
                  duration: 3000
                })
              }
            } else {
              if (res.code !== 403) {
                this.$toast({
                  message: res.msg,
                  position: 'middle',
                  duration: 3000
                })
              } else {
                this.$toast({
                  message: '当前已过期',
                  position: 'middle',
                  duration: 3000
                })
              }
            }
          })
          .catch(() => {})
      } else {
        this.$toast({
          message: '请输入数字金额',
          position: 'middle',
          duration: 3000
        })
      }
      this.Utils.Storage.save('unitFee', this.inputFee * 100)
    },
    goWhere () {
      setTimeout(() => {
        if (this.shareBettingMoney && this.shareBettingMoney.currentRoom) {
          let newRoomFlag = false
          if (!this.$route.params.reload) {
            newRoomFlag = true
          }
          this.$router.push({
            name: 'moreRoom',
            params: {
              reload: newRoomFlag
            }
          })
        } else {
          let reload = false
          if (!this.$store.state.chatRoom.init) {
            reload = true
          }
          this.$router.push({
            path: '/chatroom',
            name: 'chatroom',
            params: {
              reload: reload
            }
          })
        }
      }, 200)
    },
    togglePop () {
      if (this.bettingPop) {
        this.bettingPop = false
      } else {
        // this.payment.unitFee = ''
        this.inputFee = this.payment && this.payment.unitFee ? ((this.payment.unitFee / 100) + '') : ''
        this.bettingPop = true
      }
    },
    threeDecimal (val) {
      return ChangeThreeDecimal(val)
    },
    quickBtn (n) {
      this.inputFee = n
    },
    cancelBtn () {
      this.bettingPop = false
      // this.$parent.clearSelect()
    },
    betBtn () {
      if (!this.inputFee || this.inputFee <= 0) {
        ToastMsg('单注金额要大于0')
        return
      }
      if (Number(this.inputFee) > 10000000) {
        this.$toast({
          message: '金额超过最大限额(1千万)',
          position: 'middle',
          duration: 1500
        })
        return
      }
      // 回调或调用父级方法
      if (typeof this.$parent.popSubmit === 'function') {
        this.$parent.popSubmit(this.inputFee)
      }
      // // 把payment存到vuex里，转到result
      // this.$store.dispatch('updatePayments', this.payment)
      // this.$router.push({
      //   path: '/lotteryResult',
      //   query: {
      //     lotteryId: this.$store.state.Lottery.lotteryId
      //   }
      // })
    }
  },
  components: {
    Switchs
  }
}
</script>
