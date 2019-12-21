<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-06 15:34:43
 * @LastEditTime: 2019-08-24 16:17:06
 * @LastEditors: Please set LastEditors
 -->
<template>
  <!--分享订单的我要投注-->
  <section class="beeting-look-bg">
    <section class="beeting-look-box fw">
      <div class="beeting-look-title"><!--:class="{bg5F5F5F : data.theme === 1}"-->
        {{ data.theme === 0 ? '注单详情' : '我要跟投' }}
        <span class="beeting-look-close" @click="close">X</span>
      </div>
      <p class="beeting-look-names">
        <span class="beeting-look-name">{{data.senderType && data.senderType === 2 ? '计划员: ' : ''}}{{ data.name }}</span>
        分享的注单方案
      </p>
      <p class="beeting-look-lotterys">
        <span class="fr">{{ data.issue }}期</span>
        {{ data.lotteryName }}
      </p>
      <p class="beeting-look-bettings">投注内容</p>
      <p class="beeting-look-betting">
        <span v-if="data.playName && data.playName !== ''">
          【{{ data.playName }}】
        </span>
        {{ data.content }}
      </p>
      <section class="fw tc ft0" v-if="data.theme === 1">
        <div class="beeting-look-money-box tl">
          <section class="beeting-look-moneys dInV tc">
            共{{ data.count }}注
            <!-- @input.native="clearNoNum($event)" -->
            <input type="tel" @keyup="clearNoNum($event)" placeholder="输入投注金额" maxlength="8" class="beeting-look-money tl" v-model="totalFee">
          </section>
          共计 <span class="beeting-look-moneys-number">{{(data.count * totalFee).toFixed(2)}} ￥</span>
        </div>
        <button class="beeting-look-btn dInV" @click="bet">确定</button>
      </section>
    </section>
  </section>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'shareBetting',
  props: ['data'],
  data () {
    return {
      totalFee: '',
      may: false
    }
  },
  mounted () {
    // console.log(this.data.timesTotal, 'test')
    this.totalFee = this.data.timesTotal ? this.data.timesTotal : ''
  },
  computed: {
    ...mapState({
      chatRoom (state) {
        return state.chatRoom
      },
      init (state) {
        return state.chatRoom.init
      }
    })
  },
  methods: {
    // 禁止输入小数点
    clearNoNum (event) {
      this.totalFee = event.target.value.replace(/[^\d]/g, '')
    },
    bet () {
      if (this.may) return
      let _this = this
      let number = []
      // 跟投
      if (Number(this.totalFee) > 10000000) {
        this.$toast({
          message: '金额超过最大限额(1千万)',
          position: 'middle',
          duration: 1500
        })
        return
      }
      if (_this.data.lotteryId === 28 || _this.data.lotteryId === 9) {
        let numbers = _this.data.content.split(',')
        if (!isNaN(numbers[0])) { // 去掉数字前面的0
          console.log('是数字')
          let numbersLeng = numbers.length
          for (let i = 0; i < numbersLeng; i++) {
            number.push(parseInt(numbers[i]))
          }
          number = number.join(',')
        } else {
          console.log('不是数字')
          number = _this.data.content
        }
      } else {
        number = _this.data.content
      }

      if (('' + _this.totalFee).replace(/^\s+|\s+$/gm, '').length !== 0) {
        let params = []
        _this.data.unitFee = _this.totalFee * 100
        _this.data.numbers = number
        _this.data.title = _this.data.playName
        _this.data.size = _this.data.count
        params.push(_this.data)
        _this.axios.postOnce('/front/bet/betting.do', params)
          .then((res) => {
            this.may = true
            if (res.code === 0) {
              _this.$emit('closeH')
              this.$toast({
                message: '跟投成功',
                position: 'middle',
                duration: 1500
              })
            } else {
              _this.$emit('closeH')
              if (res.code !== 403) {
                this.$toast({
                  message: res.msg,
                  position: 'middle',
                  duration: 2000
                })
              } else {
                this.$toast({
                  message: '当前已过期',
                  position: 'middle',
                  duration: 1500
                })
              }
            }
          })
          .catch(() => {})
      } else {
        this.$toast({
          message: '请输入数字金额',
          position: 'middle',
          duration: 1500
        })
        this.may = false
      }
      _this.lookBetTotalFee = ''
    },
    close () {
      this.$emit('closeH')
    }
  }
}
</script>

<style scoped>
  .beeting-look-bg{position:fixed;top:0;z-index:400;max-width:780px;margin:0 auto;width:100%;height:100%;background:rgba(0, 0, 0, .6);}
  .beeting-look-box{overflow:hidden;width:9rem;padding-bottom:.3rem;margin:2.5rem auto 0;background:#fff;border-radius:.2rem;}
  .beeting-look-title{text-align:center;height:1rem;line-height:1.05rem;font-size:.4rem;color:#fff;background:url(../../../assets/images/chatroom/chat_order_check.png) no-repeat;background-size:100%;}
  .beeting-look-close{float:right;margin-right:.3rem;font-size:.5rem;}
  .beeting-look-lotterys,
  .beeting-look-bettings{padding:.25rem .4rem .35rem;font-size:.35rem;}
  .beeting-look-names{padding: .4rem .4rem .15rem;color:#666;font-size:.35rem;}
  .beeting-look-name{color:#D81E06;}
  .beeting-look-lotterys{color:#666666;}
  .beeting-look-bettings{color:#FF6500;padding: 0 0 .2rem .35rem;}
  .beeting-look-betting{margin:0 .4rem;color:#666;border:1px solid #BFBFBF;padding:.15rem;line-height:.6rem;font-size:.3rem;word-break: break-all;word-wrap: break-word;}
  .beeting-look-money-box{padding:.31rem 0 .33rem .4rem;font-size:.35rem;color:#333;border-bottom:1px solid #DEDEDE;}
  .beeting-look-moneys{margin-right:.2rem;height: .8rem;border: 1px solid #FF8400;border-radius: .15rem;width: 4.5rem;background: #FF8400;overflow: hidden;line-height: .8rem;color:#fff;}
  .beeting-look-money{padding-left:.15rem;float: right;width: 2.5rem;height: 100%;border: 0;color:#333;}
  .beeting-look-btn{margin-top:.3rem;width:2.7rem;height:1rem;color:#fff;line-height:1rem;text-align:center;font-size:.4rem;border-radius: .15rem;background:url(../../../assets/images/chatroom/chat_order_check2.jpg) no-repeat;background-size:100%;}
  .beeting-look-moneys-number{color:#D54545;}
</style>
