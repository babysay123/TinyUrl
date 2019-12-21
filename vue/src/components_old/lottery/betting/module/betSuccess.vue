<style lang="less">
.span-header{
  width: 100%;
  align-items: center;
  text-align: center;
  display: block;
  font-size: 14px;
  line-height: 20px;
}
.span-header img{
  width: 55px;
  height: 55px;
  margin-top: 3rem;
  margin-bottom: 0.6875rem;
}
.span-header p:last-child{
  font-size: 13px;
  margin-top: 0.3125rem;
  margin-bottom: 1.5625rem;
}
/* 按钮 */
.success-btns{
  margin: 25px 20px 0 20px;
}
.success-btns .btn{
  display: block;
  text-align: center;
  height: 1rem;
  line-height: 1rem;
  font-size: 16px;
  border: 1px solid #cecece;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-appearance: none;
  -webkit-appearance : none;
}
.success-btns .btn-white{
  // color: @baseCol;
  background: #fff;
}
.success-btns .btn-white:active{
  background: #f5f5f5;
}

</style>

<template>
    <div class="wrap">
      <!-- 头部 -->
     <Head>
        <h3 id="test1">投注</h3>
     </Head>
      <!-- 介绍 -->
      <div class="span-header">
        <img src="/mobile/images/bet/save_order_success.png"/>
        <p class="text-black">投注成功，祝您中奖!</p>
        <!-- <p class="text-gray">资金已冻结，系统正在为您出票</p> -->
      </div>
      <!-- 操作按钮 -->
      <footer class="success-btns">
        <a @click="HeadBack" class="btn btn-col" id="pre">确 认</a>
      </footer>
    </div>
</template>

<script>
import Head from 'Components/global/head.vue'
export default {
  components: {
    Head
  },
  methods: {
    HeadBack () {
      localStorage.setItem('hotup', 1)
      this.$router.go(-2)
    }
  }
}
</script>
