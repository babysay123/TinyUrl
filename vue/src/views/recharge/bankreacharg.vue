<!--
 * @Author: your name
 * @Date: 2019-11-12 20:13:39
 * @LastEditTime: 2019-11-14 15:02:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cp8h5\vue\src\views\recharge\bankreacharg.vue
 -->
<style lang="scss" scoped>
.big-box{
  width: 100%;
  li{
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    background: #fff;
    margin-top: 1px;
    img{
    width: 34px;
    height: 34px;
    margin: auto;
    }
    .title{
      width: 72%;
      p{
            height: .7rem;
    line-height: .7rem;
      }
    }
    .sele{
    width: .7rem;
    margin-right: 20px;
    height: .7rem;
    margin: auto;
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
}
.spancolor{
  color: #d81e06;
}
.label{
     background: orange;
    line-height: .4rem;
    margin-left: 4px;
    margin-top: 2px;
    border-radius: 4px;
    display: inline-block;
    color: #fff;
    padding-left: 3px;
    padding-right: 3px;
}
</style>
<template>
  <div>
    <ul class="big-box">
      <li v-for="(item,index) in vipchannel.payways" :key="index" @click="bankEntrance(item,index,vipchannel.type)">
        <img :src="vipchannel.icon">
        <div class="title">
           <p class="text">
              {{vipchannel.title}}({{item|way}})￥：<span>{{item.minAmount}}-{{item.maxAmount}}</span>
              <span class="label" v-if="item.discount">{{item.discount}}</span>
           </p>
         <p class="text">{{item.receiveBank || item.title}}</p>
         <span v-if="item.descriptions" class="spancolor">{{item.descriptions}}</span>
        </div>
        <div class="sele">
          <img :src="status===index?'/mobile/images/xz.png':'/mobile/images/wxz.png'" :style="{width:status===index?'75%':'',height:status===index?'75%':'',marginLeft:status===index?'4px':''}" alt="">
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: ['vipchannel', 'status'],
  filters: {
    way (item) {
      console.log(item)
      if (item.address) {
        return '扫码支付'
      } else if (item.maxAmount > 0) {
        return '任意金额'
      } else {
        return '固定金额'
      }
    }
  },
  methods: {
    bankEntrance (item, index, type) {
      this.$parent.bankEntrance(item, index, type)
    }
  }
}

</script>
