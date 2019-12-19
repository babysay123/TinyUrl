<!--
 * @Author: your name
 * @Date: 2019-11-13 15:27:25
 * @LastEditTime: 2019-11-13 19:43:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cp8h5\vue\src\views\recharge\income.vue
 -->
<style lang="scss" scoped>
.rechargeForm-items {
  background: #fff;
  line-height: 40px;
  padding-left: 12px;
  padding-right: 10px;
  display: flex;
  align-items: center;
  font-weight: 400;
  font-size: 14px;
  &:not(:last-child) {
    border-bottom: 1px solid #f5f4f9;
  }
  .rechargeForm-label {
    width: 86px;
    color: #333;
    &+select,
    &+input,
    &+span,
    &+div {
      max-width: calc(100% - 86px);
      flex: 1;
      padding-left: 10px;
    }
    &+img {
      width: 150px;
      height: 150px;
    }
  }
  .rechargeForm-group {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
  }
  .copy {
    font-size: 12px;
    color: #999;
    min-width: 24px;
    height: 40px;
    padding-top: 20px;
    line-height: 20px;
    box-sizing: border-box;
    background: url('/mobile/images/mine/icon_fz@2x.png') no-repeat;
    background-size: 16px;
    background-position: center 4px;
  }
  input {
    border: none;
    outline: none;
  }
  select {
    background: #fff;
    height: 40px;
    border: none;
    outline: none;
    appearance:none;
    -moz-appearance:none;
    -webkit-appearance:none;
    background: url('/mobile/images/mine/NOEEBottomArrow_hui.png') no-repeat;
    background-position: right center;
    background-size: 16px;
  }
  option {
    padding-left: 10px;
  }
}

.zw{
  width: 100%;
  height: 1.2rem;
}
.rechargeForm-items-img img{
  width: 3rem;
}

.rechargeForm-items-pay{
  background: #fff;
  // line-height: 40px;
  padding-left: 12px;
  padding-right: 10px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  font-weight: 400;
  font-size: 14px;
  .rechargeForm-label {
    width: 86px;
    color: #333;
  }
}
</style>
<template>
  <div>
     <Head href="javascript:history.back(-1);">
      <h3>{{formConfig.title}}</h3>
    </Head>
    <div class="zw"></div>
    <div class="rechargeForm-items">
      <span class="rechargeForm-label">金额范围</span>
      <span>
        {{ formConfig.config.minAmount }} - {{ formConfig.config.maxAmount}}元
      </span>
    </div>
        <div class="rechargeForm-items" v-if="formConfig.config.playType">
      <span class="rechargeForm-label">收款银行</span>
      <div class="rechargeForm-group">
        <span class="copy-bank text-orange">{{ formConfig.config.receiveBank }}</span>
        <span class="copy" v-clipboard:copy-bank>复制</span>
      </div>
    </div>
    <div class="rechargeForm-items" v-if="formConfig.config.payerName">
      <span class="rechargeForm-label">收款户名</span>
      <div class="rechargeForm-group">
        <span class="copy-name text-orange">{{ formConfig.config.payerName }}</span>
        <span class="copy" v-clipboard:copy-name>复制</span>
      </div>
    </div>
    <div class="rechargeForm-items" v-if="formConfig.config.bankAccount || formConfig.config.receiveAccount ">
      <span class="rechargeForm-label">收款账号</span>
      <div class="rechargeForm-group">
        <span class="copy-account text-orange">{{ formConfig.config.bankAccount || formConfig.config.receiveAccount }}</span>
        <span class="copy" v-clipboard:copy-account>复制</span>
      </div>
    </div>
    <div class="rechargeForm-items" v-if="formConfig.config.bankAddress">
      <span class="rechargeForm-label">开户支行</span>
      <div class="rechargeForm-group">
        <span class="copy-bank-address text-orange">{{ formConfig.config.bankAddress }}</span>
        <span class="copy" v-clipboard:copy-bank-address>复制</span>
      </div>
    </div>
    <!-- formConfig[way].amounts -->
    <div class="rechargeForm-items" v-if="formConfig.amount">
      <span class="rechargeForm-label">充值金额</span>
      <input
        type="text"
        v-model="formConfig.amount"
        placeholder="请输入充值金额"
        minlength="0"
        maxlength="11"
        disabled
      >
    </div>
    <div class="rechargeForm-items" v-if="formConfig.config.payerName">
      <span class="rechargeForm-label">{{ formConfig.config.payerName }}</span>
      <input
        type="text"
        v-model="account"
        :placeholder="`请输入您的${formConfig.config.payerName}`"
        :minlength="1"
        :maxlength="15"
      >
    </div>
    <div class="rechargeForm-items-pay" v-if="formConfig.config.address">
      <span class="rechargeForm-label">扫码支付</span>
      <div class="rechargeForm-items-img">
        <img :src="formConfig.config.address" alt="erwei">
      </div>
    </div>
      <div class="redBtn"  @click=" decideWay()">确定</div>
    <RechargeTips  v-if="formConfig.config.text" :tips="formConfig.config.text"></RechargeTips>
        <AllPop :asShow='popShow' :content='content' :cancel='cancel'></AllPop>
  </div>
</template>
<script>
import Head from 'Components/global/head.vue'
import RechargeTips from 'Components/recharge/rechargeTips'
import AllPop from 'Components/allpop'
export default {
  components: {
    Head,
    RechargeTips,
    AllPop
  },
  data () {
    return {
      formConfig: '',
      account: '',
      cancel: '',
      popShow: false,
      content: '订单提交成功，请联系客服！'
    }
  },
  computed: {
    dynamicData () {
      let type = this.formConfig.config
      let { type: play } = this.formConfig
      // 根据各个通道返回动态的数据
      const params = { amount: this.formConfig.amount, depositor: this.account, depositName: this.account }
      const { id, thirdCode, thirdMode, payType, gwRedirectUrl } = type
      if (play === 'bank') {
        return {
          url: '/front/recharge/deposit_common.do',
          params: { ...params, bankId: id },
          nameLabel: '收款户名',
          accountLabel: '收款账号'
        }
      }
      if (payType === 'ONLINE' && gwRedirectUrl && gwRedirectUrl.length > 0) {
        const bankList = `${gwRedirectUrl}?amount=${this.formConfig.amount}&third_mode=${thirdMode}&third_code=${thirdCode}&third_id=${id}`
        this.routerLink({ path: bankList, redirect: true })
      }
      if (payType === 'ONLINE') {
        return {
          url: '/front/recharge/deposit_third.do',
          params: { ...params, thirdCode, thirdMode, thirdId: id },
          redirect: true
        }
      }
      return {
        url: '/front/recharge/preOrder.do',
        params: { ...params, thirdCode, thirdMode, thirdId: id, payType },
        nameLabel: '收款人',
        accountLabel: '收款账号'
      }
    }
  },
  methods: {
    decideWay () {
      const accountValid = /^[\u4E00-\u9FA5\uf900-\ufa2d·]{2,15}$/.test(this.account)
      if (this.formConfig.config.payerName && !accountValid) {
        this.$toast({
          message: `请填写正确的${this.formConfig.config.payerName}`,
          duration: 1800
        })
        return
      }
      const { url, params, redirect } = this.dynamicData
      if (this.account || redirect) {
        url && params && this.onSubmit({ url, params, redirect })
      }
    },
    // 成功提交后判断是否需要跳转新页面支付码 或者弹窗提示并清除输入框和缓存用户充值数据
    async onSubmit ({ url, params, redirect = false }) {
      const res = await this.axios.postOnce(url, params)
      const { code, msg, data } = res
      if (code === 0) {
        if (redirect) {
          window.location.replace(data)
        } else {
          this.popShow = !this.popShow
        }
      } else {
        this.$toast({
          message: msg,
          duration: 1800
        })
      }
    }
  },
  created () {
    this.formConfig = this.Utils.Storage.get('rechargeConfig')
  }
}
</script>
