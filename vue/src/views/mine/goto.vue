<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-10 15:13:26
 * @LastEditTime: 2019-08-20 19:50:22
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div>
    <div class="big-div">
      <p>转{{msg}}余额宝<span class="close" @click="goout">x</span></p>
      <div v-if="msg === '入'">
        系统余额：{{(bouns.balance).toFixed(2)}}元
      </div>
      <div :class="msg === '入'?'':'divpadding'">
        转{{msg}}额度：
        <input v-model="val" placeholder="请输入额度">
      </div>
    </div>
  <div class="bottom">
  <div class="btn-left">
    <mt-button type="primary" @click="goto">确定</mt-button>
  </div>
  <div class="btn-right">
    <mt-button type="danger" @click="goout">取消</mt-button>
  </div>
  </div>
  </div>
</template>
<script>
export default {
  props: ['msg'],
  data () {
    return {
      bouns: this.Utils.Storage.get('user'),
      val: null,
      url: this.msg === '入' ? '/interest/rate/deposit.do' : '/interest/rate/withdrawal.do',
      popshow: false
    }
  },
  methods: {
    goto () {
      if (/((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/.test(this.val)) {
        this.axios.post(this.msg === '入' ? '/interest/rate/deposit.do' : '/interest/rate/withdrawal.do', { 'amount': this.val }).then(res => {
          if (res.code === 0) {
            this.$emit('backdrop', [true, res.msg, false, this.msg])
          }
        })
        setTimeout(() => {
          location.reload()
        }, 1800)
      } else {
        this.$toast({
          message: `请输入正确金额`,
          duration: 1800
        })
        this.val = null
      }
    },
    goout () {
      this.$emit('backdrop', [true, '', false, 'close'])
      this.val = null
    }
  }
}
</script>
<style lang="less" scoped>
.big-div{
  width: 100%;
  overflow: hidden;
  border-radius: 4px;
  p{
    width: 96%;
    height: 30px;
    line-height: 30px;
    font-size: 16px;
    background: #F8F8F8;
    margin-left: 13px;
    .close{
      float: right;
      font-size: 27px;
      margin-right: 10px;
    }
  }
  .divpadding{
    margin-top: 18px;
  }
  div{
    width: 200px;
    height: 30px;
    font-size: 16px;
    line-height: 30px;
    margin-top: 10px;
    margin-left: 13px;
    input{
      width: 57%;
      border: 1px solid #26a2ff;
      border-radius: 4px;
      height: 26px;
    }
  }
}
.bottom{
  width: 100%;
  overflow: hidden;
  margin-top: 40px;
  margin-bottom: 20px;
}
.btn-left{
  width: 48%;
  float: left;
  text-align: right;
  .mint-button{
    width: 2.3rem;
    height: .7rem;
  }
}
.btn-right{
  width: 48%;
  float:right;
  text-align: left;
  .mint-button{
    width: 2.3rem;
    height: .7rem;
  }
}
</style>
