<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-14 20:30:10
 * @LastEditTime: 2019-08-20 14:02:19
 * @LastEditors: Please set LastEditors
 -->
<template>
  <section>
    <div></div>
   <Head :fixed="true">
      <h3>余额宝</h3>
  </Head>
  <div class="zw"></div>
  <div class="group">
    <img src="/mobile/images/balance.png">
    <span>余额：{{(data.data.balance).toFixed(2)}}元</span>
    <img class="limitmany" @click="tik" src="/mobile/images/balandetai.png">
  </div>
  <div class="group">
    <img src="/mobile/images/rate.png">
    <span>当日利率：{{data.data.rate}}%，当日收益：{{(data.data.rate/100*data.data.balance).toFixed(2)}}元</span>
  </div>
  <div class="group">
    <img src="/mobile/images/add.png">
    <span>累计收益：{{(data.data.sum).toFixed(2)}}元</span>
  </div>
  <!-- <mt-cell title="余额宝明细">
  <span>点击查看</span>
  <img slot="icon" src="/mobile/images/add.png" width="24" height="24">
</mt-cell> -->
  <div class="bottom">
  <div class="btn-left">
    <mt-button type="primary" @click="goto">转入</mt-button>
  </div>
  <div class="btn-right">
    <mt-button type="danger" @click="goout">转出</mt-button>
  </div>
  </div>
  <mt-popup
  v-model="show"
  position="middel"
   popup-transition="popup-fade"
  @closeOnClickModal="false">
  <Goto @backdrop = "backdrop" :msg="msg"/>
</mt-popup>
<AllPop :asShow="popshow" :content="content" :balanceshow='outshow' :balancehidden='balancehidden' />
  </section>
</template>
<script>
import Head from 'Components/global/head.vue'
import Goto from './goto'
import AllPop from 'Components/allpop'
export default {
  components: { Head, Goto, AllPop },
  data () {
    return {
      data: {
        data: null
      },
      show: false,
      popshow: false,
      content: null,
      msg: null,
      outshow: null,
      balancehidden: null
    }
  },
  computed: {
  },
  methods: {
    tik () {
      location.href = '/mobile/studio/#/limitmenoy'
    },
    backdrop (it) {
      this.show = it[2]
      if (it[3] === '入') {
        this.popshow = it[0]
      } else if (it[3] === 'close') {
        this.balancehidden = !it[0]
      } else {
        this.outshow = it[0]
      }
      this.content = it[1]
    },
    detai () {
      this.axios.post('/interest/rate/detail.do', {}).then(res => {
        if (res.code === 0) this.data.data = res.data
      })
    },
    goto () {
      this.msg = '入'
      this.show = true
    },
    goout () {
      this.msg = '出'
      this.show = true
    }
  },
  created () {
    this.detai()
  }
}
</script>

<style lang="less" scoped>
.zw {
  width:100%;
  height:1.1rem;
}
.group{
  width: 100%;
  line-height: 50px;
  font-size: 15px;
  height: 50px;
  margin-bottom: 10px;
  background: #fff;
  border-radius: 4px;
  overflow: hidden;
  img{
    margin-left: 5px;
    width: 8%;
    vertical-align: middle;
    margin-bottom: 10px;
  }
  .limitmany{
  margin-left: 4.74rem;
  margin-bottom: 0;
}
  span{
    margin-left: 10px;
  }
}
.bottom{
  position: absolute;
  bottom: 10px;
  width: 100%;
}
.btn-left{
  width: 48%;
  float: left;
  text-align: right;
  .mint-button{
    width: 4.3rem;
  }
}
.btn-right{
  width: 48%;
  float:right;
  text-align: left;
  .mint-button{
    width: 4.3rem;
  }
}
.mint-popup{
  width: 86%;
  border-radius: 4px;

}
</style>
