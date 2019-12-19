<!--
 * @Author: your name
 * @Date: 2019-11-12 15:50:06
 * @LastEditTime: 2019-11-16 13:47:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cp8h5\vue\src\views\recharge\rechargmiddle.vue
 -->
<style lang="scss" scoped>
@import 'Assets/css/base.color.scss';
.title{
  width:100%;
  height: 1rem;
  line-height: 1rem;
  span{
  margin-left:11px;
  }
  input{
    width: 80%;
    height: .7rem;
    margin-left: 10px;
    border: 1px solid rgb(211,211,211);
    border-radius: 4px;
    font-size: 12px;
    background: #fff;
  }
}
.numsele{
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  min-height: 2rem;
  li{
    width: 20%;
    width: 23%;
    height: .6rem;
    line-height: .6rem;
    border: 1px solid #999;
    border-radius: 4px;
    margin-left: 6px;
    text-align: center;
    margin-bottom: 8px;
    color:rgb(143,143,143);
    background: #fff;
  }
}
.banklist{
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  li{
    width: 25%;
    line-height: 1rem;
    background: #fff;
    text-align: center;
    border-right: 1px #eee solid;
    margin-top: 1px;
    position: relative;
}
    img{
      width: 20%;
      vertical-align: middle;
    }
}
.active{
  border: 1px $baseCol solid !important;
  color:  $baseCol !important;
}
.ash{
  background: #ccc !important;
  border: 1px solid #ccc !important;
}
.btn{
  position: fixed;
  width: 92%;
  bottom: 10px;
  height: 1rem;
  text-align: center;
  line-height: 1rem;
  left: 4%;
  background: $baseCol;
  color: #fff;
  border-radius:4px;
}
.discount{
      position: absolute;
    display: block;
    width: 45%;
    background: orange;
    line-height: .5rem;
    right: -8px;
    border-radius: 4px;
    color: #fff;
    -webkit-transform: scale(0.7);
    transform: scale(0.6);
    top: -3px;
}
</style>
<template>
  <div>
    <div class="title">
      <span>充值金额</span>
      <input type="text" placeholder="  请输入充值金额" :class="ash==='vipRechargeConfigList'?'ash':''" :readonly="(ash==='vipRechargeConfigList') || (ash ==='fixedMaount')?'readonly':false"   v-model="amount" minlength="0" maxlength="11" @input="ele => amountLength(ele.target.value)" >
    </div>
    <ul class="numsele">
      <li v-for="(num,index) in nums" :class="ash==='vipRechargeConfigList'?'ash':money==num?'active':''" :key="index" @click="seleMoney(num)">
        {{num}}
      </li>
    </ul>
    <ul class="banklist">
      <li v-if="DepositList.vipRechargeConfigList" :class="active==='all'?'active':''" v-for="item in DepositList.vipRechargeConfigList" :key="item.title" @click="switrech(item,'all')">
        <img :src="item.icon">
        {{item.title}}
      </li>
      <li v-for="(item,index) in DepositList.rechargeList" :key="index"  :class="active===index?'active':''" @click="switrech(item,index)">
        <img :src="item.icon">
        {{item.title}}
        <span v-if="item.discount" class="discount">优惠</span>
      </li>
    </ul>
    <Vipreacharg v-if="flag" :vipchannel="vipchannel"></Vipreacharg>
    <bankreacharg v-if="!flag" :vipchannel="vipchannel" :status="status"></bankreacharg>
    <div class="btn" v-if="ash!=='vipRechargeConfigList'" @click="sumbit">
      下一步
    </div>
  </div>
</template>
<script>
// axios请求函数
import { getDepositList } from 'Plugins/api'
// vip 通道组件
import Vipreacharg from './vipreacharg'
// 引入银行通道组件
import Bankreacharg from './bankreacharg'
export default {
  components: {
    Vipreacharg,
    Bankreacharg
  },
  data () {
    return {
      // 固定金额集合
      nums: [10, 100, 300, 500, 1000, 3000, 5000, 10000],
      // 充值通道集合
      DepositList: '',
      // 获取用户信息
      userInfo: this.Utils.Storage.get('user') || { account: '', userId: 0 },
      // 传入vip组件props
      vipchannel: '',
      flag: true,
      active: 'all',
      money: 10,
      amount: null,
      ash: '',
      status: 0,
      rechargeConfig: {}
    }
  },
  methods: {
    sumbit () {
      if (this.rechargeConfig.config.amounts) {
        if (this.amount > this.nums[this.nums.length - 1]) {
          this.$toast('您的充值金额已超出限制')
          return
        } else if (this.amount < this.nums[0]) {
          this.$toast('您的充值金额低于最小充值金额')
          return
        }
      } else if (this.amount < this.rechargeConfig.config.minAmount) {
        this.$toast('您的充值金额低于最小充值金额')
        return
      } else if (this.amount > this.rechargeConfig.config.maxAmount) {
        this.$toast('您的充值金额已超出限制')
        return
      }
      this.rechargeConfig.amount = this.amount
      this.Utils.Storage.save('rechargeConfig', this.rechargeConfig)
      this.$router.push({ path: '/income' })
    },
    // 切换支付二级通道
    bankEntrance (item, index, type) {
      this.nums = [10, 100, 300, 500, 1000, 3000, 5000, 10000]
      // if (item.amounts) {
      //   this.nums = item.amounts
      // } else {
      //   this.fifter(item)
      // }
      this.rechargeConfig.config = item
      this.rechargeConfig.type = type
      this.status = index
      // 判断是否是固定金额
      if (item.amounts && item.maxAmount === '0' && item.maxAmount === '0') {
        this.ash = 'fixedMaount'
        this.nums = item.amounts
      } else {
        this.fifter(item)
        this.ash = ''
      }
      this.money = this.nums[0]
    },
    // 金额正则
    amountLength (val) {
      if (isNaN(+val)) {
        this.amount = ''
        return
      }
      this.amount = val.length > 11 || !val ? this.amount.toString().slice(0, 11) : this.amount
    },
    // 选择充值固定金额
    seleMoney (num) {
      if (this.ash === 'vipRechargeConfigList') return
      this.money = num
      this.amount = num
    },
    // 获取通道配置
    getGalleryList () {
      // 请求接口
      getDepositList({
        platform: 'WEB',
        userId: this.userInfo.userId,
        version: '1.0.0' }).then(res => {
        if (res.code === 0) {
          this.DepositList = res.data
          // 初始化渲染首条数据
          if (this.DepositList.vipRechargeConfigList) {
            this.vipchannel = this.DepositList.vipRechargeConfigList[0]
            this.ash = 'vipRechargeConfigList'
          } else {
            this.vipchannel = this.DepositList.rechargeList[0]
          }
        } else {
          this.$toast(res.msg)
        }
        let sta
        this.DepositList.rechargeList.map(res => {
          sta = res.payways.findIndex(v => {
            return v.discount
          })
          if (sta === 0) {
            res.discount = 1
          }
        })
      })
    },
    // 点击切换银行通道
    switrech (item, index) {
      // 重新赋值
      this.nums = [10, 100, 300, 500, 1000, 3000, 5000, 10000]
      // 判断是否为vip通道 是则渲染vip组件
      if (item.type === 'vip') {
        this.flag = true
        this.vipchannel = item
        this.active = index
        this.amount = null
        this.ash = 'vipRechargeConfigList'
      } else {
        if (item.payways[0].amounts && item.payways[0].maxAmount === '0' && item.payways[0].maxAmount === '0') {
          this.ash = 'fixedMaount'
          this.nums = item.payways[0].amounts
        } else {
          this.fifter(item.payways[0])
          this.ash = ''
        }
        // 银行通道传值
        this.vipchannel = item
        // 区别vip充值显隐
        this.flag = false
        // 点击高亮
        this.active = index
        // 取出固定额度区间数
        // this.fifter(item.payways[0])
        this.rechargeConfig.config = item.payways[0]
        this.rechargeConfig.title = item.title
        this.rechargeConfig.type = item.type
        this.status = 0
      }
    },
    fifter (item) {
      this.nums = this.nums.filter(data => {
        if (data < Number(item.maxAmount) && Number(item.minAmount) < data) {
          return data
        }
      })
      // 选择通道赋值固定金额高亮
      this.money = this.nums[0]
      // 赋值输入框
      this.amount = this.money
    }
  },
  created () {
    this.getGalleryList()
  }
}
</script>
