<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-29 15:49:25
 * @LastEditTime: 2019-08-25 14:41:29
 * @LastEditors: Please set LastEditors
 -->
    <template>
      <div class="dialog-content dialog-common" v-if="show" :style="{top:topnum}">
        <div class="common-title">
          <span>温馨提示</span>
        </div>
        <div class="hd">
        </div>
        <div class="dialong-right">
          <img @click="close1" src="../../assets/images/clear.png">
        </div>
        <div class="success">
          <img :src="url">
        </div>
        <div class="common-content" v-html="content || cleancon"/>
        <div class="btn-qr">
          <div @click="close">
            <span>{{btnmsg}}</span>
          </div>
          <div v-if="cancel != 1?false: true" @click="closeove">
            <span>
              {{btnclose}}
            </span>
            </div>
        </div>
      </div>
    </template>

<script>
export default {
  props: ['popShow', 'content', 'cancel', 'claeanshow', 'cleancon', 'cancel1', 'topnum', 'asShow', 'balanceshow', 'balancehidden', 'imgurl', 'btnaffirm', 'closebtn'],
  data () {
    return {
      show: false,
      url: '/mobile/images/hint.png',
      btnmsg: '确认',
      btnclose: '取消'
    }
  },
  methods: {
    close () {
      this.show = false
      if (this.cancel === 1) {
        window.location.href = '/mobile/studio/#/index'
      } else if (this.cancel === 9) {
        window.location.href = '/mobile/studio/#/preferActive'
      }
    },
    closeove () {
      this.show = false
      if (this.cancel === 1) {
        this.$emit('childFn1', false)
      }
    },
    close1 () {
      this.show = false
      this.$emit('childFn1', false)
    }
  },
  watch: {
    popShow (val, old) {
      if (this.$router.history.current.meta.title !== '游戏投注') {
        window.history.back(1)
      } else {
        this.show = true
      }
    },
    asShow () {
      if (this.cancel === 8) {
        this.imgsrc = '/mobile/images/wallet.png'
      }
      this.show = true
    },
    balanceshow () {
      this.show = true
    },
    balancehidden () {
      this.show = false
    },
    imgurl () {
      this.url = this.imgurl
    },
    btnaffirm () {
      this.btnmsg = this.btnaffirm
    },
    closebtn () {
      this.btnclose = this.closebtn
    }
  }
}
</script>
<style scoped lang="scss">
@import 'Assets/css/base.color.scss';
.dialog-content {
  background: #fff;
    position: fixed;
    z-index: 2;
    width: 8rem;
    left: 50%;
    top: 50% !important;
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
    position: fixed;
    z-index: 9999;
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
  background:url('../../assets/images/hudu.png') repeat;
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
</style>
