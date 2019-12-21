<style lang="scss" scoped>
@import 'Assets/css/base.color.scss';
.dialog-content {
  background: #fff;
    position: absolute;
    z-index: 2;
    width: 8rem;
    left: 50%;
    top: 50%;
    border-radius: 5px;
    transform: translate(-50%, -50%);
    animation: scale .35s ease;
    border: 4px solid $baseCol;
    .dialog-generalize-close {
      position: absolute;
      right: 0;
      top: 0;
      transform: translateY(-120%);
      img {
        width: 20px;
        padding: 2px;
        border: 2px solid #fff;
        border-radius: 50%;
      }
    }
    .dialog-generalize img {
      width: 100%;
    }
    .dialog-notify-close {
      position: absolute;
      bottom: 0;
      left: 50%;
      z-index: 2;
      transform: translate(-50%, 100%);
      img {
        width: 24px;
        border: 2px solid #fff;
        border-radius: 50%;
        padding: 2px;
      }
    }
    .dialog-notify {
      position: relative;
      width: 100%;
      overflow: hidden;
      display: block;
      img {
        width: 100%;
      }
      p {
        position: absolute;
        bottom: 19%;
        max-width: 60%;
        text-align: center;
        left: 50%;
        transform: translateX(-50%);
        font-size: .6rem;
        color: yellow;
        font-weight: 400;
      }
    }
  }
  .dialog-common {
    z-index: 99999;
  background: #fff;
  min-height: 100px;
  .common-title {
    color: #fff;
    height: 0.7rem;
    left: -1px;
    top: -1px;
    width: 28%;
    background: $baseCol;
    line-height: .7rem;
    text-align: center;
    position: relative;
    font-weight: 500;
    float: left;
    img {
      width: 14px;
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .common-content {
    padding-top: 8px;
    padding-bottom: 29px;
    margin: auto;
    text-align: center;
    font-weight: 400;
  }
}
  .btn-qr{
  display: flex;
   justify-content:center;
  width: 100%;
  height: .7rem;
  color: #fff;
  margin-bottom: 10px;
  div{
    width: 60px;
    height: .7rem;
    background: $baseCol;
    border-radius: 4px;
    text-align: center;
    line-height: .7rem;
    margin: auto;
    cursor:pointer;
  }
}
.btn-qr1{
  margin: auto;
     float: right;
  width: 50%;
  height: .7rem;
  color: #fff;
  margin-bottom: 10px;
  div{
    width: 60px;
    height: .7rem;
    background: $baseCol;
    border-radius: 4px;
    text-align: center;
    line-height: .7rem;
    margin: auto;
    cursor:pointer;
  }
}
.dialong-right{
  float: right;
  margin-top: -35px;
  margin-right: -11px;
  border-radius: 50%;
  overflow: hidden;
}
.dialong-right img{
  width: 26px;
}
.hd{
  background:url('../../../../assets/images/hudu.png') repeat;
  background-size: 100% 100%;
  background-color: $baseCol;
  width: 71%;
  float: left;
  height: .7rem;
  margin-left: -.1rem;
  margin-top: -1px;
}
.success{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
   img {
    width: 22px;
  }
}
/* end */
</style>

<template>

    <!-- <mt-popup
      :class="'mt-nobg'"
      v-model="myPopupReissue"
      z-index="2333"
      :closeOnClickModal="false"
      popup-transition="popup-fade"
    >
      <section class="reissue">
        <h3 class="reissue-title">温馨提示</h3>
        <h4 class="reissue-words">{{tipsData.title}}</h4>
        <h5 class="reissue-tips">{{tipsData.tips}}</h5>
        <div class="reissue-btns">
          <a id="" @click="tipsData.yes" class="btn">确定</a>
          <a id="BetReissueNext" @click="tipsData.no" class="btn btn-right">取消(5s)</a>
        </div>
      </section>
    </mt-popup> -->
    <div class="dialog-content dialog-common" v-if="myPopupReissue" >
        <div class="common-title">
          <span>温馨提示</span>
        </div>
        <div class="hd">
        </div>
        <div class="dialong-right">
          <img src="../../../../assets/images/clear.png">
        </div>
        <div class="success">
          <img src="../../../../assets/images/hint.png">
        </div>
        <div class="common-content">
          {{tipsData.title}}
         </div>
        <div class="btn-qr">
          <div @click="tipsData.yes">
            <span>确认</span>
          </div>
          <div @click="tipsData.no">
            <span id="BetReissueNext">
              取消({{close}}s)
            </span>
            </div>
        </div>
      </div>
</template>

<script>
export default {
  name: 'betting-reissue',
  props: ['popupReissue'],
  data () {
    return {
      close: 5,
      myPopupReissue: this.popupReissue,
      tipsData: { // 弹出提示的信息
        title: '当前期结束，是否要清空已投注内容？',
        tips: '要清空内容请点"确定"，延到下一期请点击"取消"',
        yes: function () {
        },
        no: function () {
        }
      }
    }
  },
  watch: {
    popupReissue (val) {
      // console.log('popup status ' + val)
      this.myPopupReissue = val
      if (val === true) {
        // 弹出，则重启取消倒计时
        let _timer = setInterval(() => {
          if (this.close < 1) {
            clearInterval(_timer)
            this.updateIssue()
            // console.log('end')
            return false
          }
          this.close--
        }, 1000)
        // 设置确定和取消的方法
        this.tipsData.yes = () => {
          this.$store.dispatch('removePayments', 'clear')
          this.myPopupReissue = false
        }
        this.tipsData.no = () => {
          clearInterval(_timer)
          this.updateIssue()
        }
      }
    },
    myPopupReissue (val) {
      // console.log(this.$emit('changeReissue', val))
      this.$parent.changeReissue(val)
    }
  },
  methods: {
    updateIssue () {
      // 更新期数
      let _lotteryId = this.$store.state.Lottery.lotteryId
      let _paymentArr = this.$store.getters.getPayments
      // let _message = this.$store.getters.getLayoutMsg // 获取最新一期彩种信息，有bug，如果网络差的时候，会不奏效
      this.axios.postOnce('/front/lottery/draw_info.do', {
        'lotteryId': _lotteryId
      }).then((res) => {
        if (res.code === 0) {
          let _message = res.data // 获取最新一期，但多一次请求，会更慢

          for (let inx = 0; inx < _paymentArr.length; inx++) {
            // let pay = _paymentArr[inx]
            _paymentArr[inx].issue = _message.currentIssue
          }
          // console.log(_paymentArr)
          this.$store.dispatch('updatePayments', _paymentArr)
          this.myPopupReissue = false
        }
      }).catch(() => {
      })
    }
  },
  mounted () {
  }
}
</script>
