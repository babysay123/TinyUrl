<style lang="scss" scoped>
@import 'Assets/css/base.color.scss';
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
.rechargeForm-items-qrcode {
  padding: 10px 10px 10px 12px;
}
.img-checker {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  .img-checker-mask {
    @extend .img-checker;
    position: absolute;
    z-index: 0;
    background: rgba(0, 0, 0, .5);
  }
  img {
    position: absolute;
    width: 90%;
    top: 50%;
    left: 50%;
    z-index: 1;
    transform: translate(-50%, -50%);
    animation: scale .35s ease;
  }
}
@keyframes scale {
  0% {
    transform: translate(-50%, -50%) scale(0);
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
  }
}
// 充值金额固定style and 通道
.new-rechargeForm-items {
  background: #fff;
  line-height: 40px;
  padding-left: 12px;
  padding-right: 10px;
  font-weight: 400;
  font-size: 14px;
  .fixa-label {
    width: 100%;
    span {
      margin-left: 10px;
      color: #999;
    }
  }
  .fixa-ul {
    padding-top: 3px;
    // padding-bottom: 10px;
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    :nth-child(4n+1) {
      margin-left: 0
    }
    div {
      width: 23%;
      border: #999 1px solid;
      border-radius: 4px;
      margin-left: 2%;
      text-align: center;
      line-height: .81rem;
      position: relative;
      margin-bottom: 10px;
    }
    .active {
      background: $baseCol;
      border: $baseCol 1px solid;
      color: #f5f4f9;
    }
  }

  .form-discount {
    position: absolute;
    line-height: 16px;
    padding: 0 2px;
    font-size: 11px;
    color: #fff;
    background: #f08e19;
    margin: 0;
    border-radius: 3px;
    left: 0;
    top: -14px;
  }
}

</style>

<template>
  <div class="rechargeForm">
    <div class="new-rechargeForm-items">
      <!-- 6.19xioyu：修改通道style -->
      <p class="fixa-label">{{ rechargeConfig.type === 'bank' ? '收款银行' : '充值通道' }}<span>{{ rechargeConfig.type === 'bank' ? '请选择收款银行' : '请选择充值通道' }} </span></p>
      <div class="fixa-ul">
        <div v-for="(c, index) in formConfig" :key="index" :class="index === activAisle ? 'active' : ''" @click="addaisle(index)" >
          {{rechargeConfig.type === 'bank' ? c.receiveBank : `${c.title}`}}
          <span class="form-discount" v-if="c.discount">{{ c.discount }}</span>
        </div>
      </div>
      <!-- <span class="rechargeForm-label">{{ rechargeConfig.type === 'bank' ? '收款银行' : '充值通道' }}</span>
      <select v-model="way">
        <option :value="index" v-for="(c, index) in formConfig" :key="index">
          {{ rechargeConfig.type === 'bank' ? c.receiveBank : `${c.title}${index + 1}` }}
        </option>
      </select> -->
    </div>
    <!-- 6.19xioyu：修改固定金额style -->
    <!-- v-if="formConfig[way].amounts && formConfig[way].amounts.length" -->
    <div class="new-rechargeForm-items" v-if="formConfig[way].isFix && formConfig[way].amounts.length">
      <p class="fixa-label">固定金额值<span>请选择充值金额 </span></p>
      <div class="fixa-ul">
        <div v-for="(c, index) in formConfig[way].amounts" :key="index" @click="addsum(c)" :class="c === activNum ? 'active' : ''">
          {{ c }}元
        </div>
      </div>
      <!-- <select v-model="amount"> -->
        <!-- <option v-for="c in formConfig[way].amounts" :value="c" :key="c">
          {{ c }}元
        </option> -->
      <!-- </select> -->
    </div>

    <div class="rechargeForm-items" v-else>
      <span class="rechargeForm-label">金额范围</span>
      <span>
        {{ formConfig[way].minAmount | numFixed }} - {{ formConfig[way].maxAmount | numFixed }}元
      </span>
    </div>

    <div class="rechargeForm-items" v-if="formConfig[way].receiveBank && rechargeConfig.type !== 'bank'">
      <span class="rechargeForm-label">收款银行</span>
      <div class="rechargeForm-group">
        <span class="copy-bank text-orange">{{ formConfig[way].receiveBank }}</span>
        <span class="copy" v-clipboard:copy-bank>复制</span>
      </div>
    </div>
    <div class="rechargeForm-items" v-if="formConfig[way].receiveName">
      <span class="rechargeForm-label">{{ dynamicData.nameLabel }}</span>
      <div class="rechargeForm-group">
        <span class="copy-name text-orange">{{ formConfig[way].receiveName }}</span>
        <span class="copy" v-clipboard:copy-name>复制</span>
      </div>
    </div>
    <div class="rechargeForm-items" v-if="formConfig[way].bankAccount || formConfig[way].receiveAccount">
      <span class="rechargeForm-label">{{ dynamicData.accountLabel }}</span>
      <div class="rechargeForm-group">
        <span class="copy-account text-orange">{{ formConfig[way].bankAccount || formConfig[way].receiveAccount }}</span>
        <span class="copy" v-clipboard:copy-account>复制</span>
      </div>
    </div>
    <div class="rechargeForm-items" v-if="formConfig[way].bankAddress">
      <span class="rechargeForm-label">开户支行</span>
      <div class="rechargeForm-group">
        <span class="copy-bank-address text-orange">{{ formConfig[way].bankAddress }}</span>
        <span class="copy" v-clipboard:copy-bank-address>复制</span>
      </div>
    </div>
    <!-- formConfig[way].amounts -->
    <div class="rechargeForm-items" v-if="!formConfig[way].isFix">
      <span class="rechargeForm-label">充值金额</span>
      <input
        type="text"
        v-model="amount"
        placeholder="请输入充值金额"
        minlength="0"
        maxlength="11"
        @input="ele => amountLength(ele.target.value)"
      >
    </div>
    <div class="rechargeForm-items" v-if="formConfig[way].payerName">
      <span class="rechargeForm-label">{{ formConfig[way].payerName }}</span>
      <input
        type="text"
        v-model="account"
        :placeholder="`请输入您的${formConfig[way].payerName}`"
        :minlength="rechargeConfig.type.toLowerCase() === 'bank' ? 2 : 1"
        :maxlength="rechargeConfig.type.toLowerCase() === 'bank' ? 15 : 30"
      >
    </div>
    <div class="rechargeForm-items rechargeForm-items-qrcode" style="line-height: 0;" v-if="formConfig[way].address">
      <span class="rechargeForm-label">扫码支付</span>
      <img :src="formConfig[way].address" @click="checker = true">
      <!-- <qriously :value="formConfig[way].address" :size="150" :backgroundAlpha="1"/> -->
    </div>
    <div class="redBtn" :disabled="isNullData" @click="!isNullData && decideWay()">确定</div>
    <RechargeTips v-if="formConfig[way].text" :tips="formConfig[way].text" />
    <div class="img-checker" v-if="checker">
      <div class="img-checker-mask" @click="checker = false"></div>
      <img :src="formConfig[way].address">
    </div>
    <AllPop :asShow='popShow' :content='content' :cancel='cancel'></AllPop>
    <!-- <template>
      <div class="dialog-content dialog-common" v-if="popShow">
        <div class="common-title">
          <span>温馨提示</span>
        </div>
        <div class="hd">
        </div>
        <div class="dialong-right">
          <img @click="close" src="../../assets/images/clear.png">
        </div>
        <div class="success">
          <img src="../../assets/images/ok.png">
        </div>
        <div class="common-content" v-html="content"/>
        <div class="btn-qr">
          <div @click="close">
            <span>确认</span>
          </div>
        </div>
      </div>
    </template> -->
  </div>
</template>

<script>
import RechargeTips from 'Components/recharge/rechargeTips'
import AllPop from 'Components/allpop'
import { amountLimit } from 'Plugins/validator'
import filters from 'Plugins/filters'
export default {
  components: { RechargeTips, AllPop },
  data () {
    return {
      img: '../../assets/images/ok.png',
      cancel: '',
      popShow: false,
      way: 0,
      // 固定金额
      account: '',
      amount: '',
      checker: false,
      content: '订单提交成功，请联系客服！',
      activNum: '0',
      isFix: 0,
      activAisle: 0
    }
  },
  computed: {
    rechargeConfig () {
      return this.Utils.Storage.get('rechargeConfig') ? this.Utils.Storage.get('rechargeConfig') : {}
    },
    formConfig () {
      return this.rechargeConfig.payways
    },
    dynamicData () {
      // 根据各个通道返回动态的数据
      const { type } = this.rechargeConfig
      const params = { amount: this.amount, depositor: this.account, depositName: this.account }
      const { id, thirdCode, thirdMode, payType } = this.formConfig[this.way]
      if (type.toLowerCase() === 'bank') {
        return {
          url: '/front/recharge/deposit_common.do',
          params: { ...params, bankId: id },
          nameLabel: '收款户名',
          accountLabel: '收款账号'
        }
      } else {
        switch (this.formConfig[this.way].payType.toLowerCase()) {
          case 'bank':
            return {
              url: '/front/recharge/preOrder.do',
              params: { ...params, thirdCode, thirdMode, thirdId: id, payType },
              nameLabel: '收款户名',
              accountLabel: '收款账号'
            }
          case 'online':
            return {
              url: '/front/recharge/deposit_third.do',
              params: { ...params, thirdCode, thirdMode, thirdId: id },
              redirect: true
            }
          default:
            return {
              url: '/front/recharge/preOrder.do',
              params: { ...params, thirdCode, thirdMode, thirdId: id, payType },
              nameLabel: '收款人',
              accountLabel: '收款账号'
            }
        }
      }
    },
    isNullData () {
      return !this.amount && !this.formConfig[this.way].payerName && !this.account
    }
  },
  methods: {
    // 选择通道
    addaisle (i) {
      this.way = i
      this.activAisle = i
    },
    // 选择固定金额
    addsum (i) {
      this.activNum = i
      this.amount = i
    },
    amountLength (val) {
      if (isNaN(+val)) {
        this.amount = ''
        return
      }
      this.amount = val.length > 11 || !val ? this.amount.toString().slice(0, 11) : this.amount
    },
    // 成功提交后判断是否需要跳转新页面支付码 或者弹窗提示并清除输入框和缓存用户充值数据
    async onSubmit ({ url, params, redirect = false }) {
      const res = await this.axios.postOnce(url, params)
      const { code, msg, data } = res
      if (code === 0) {
        if (redirect) {
          window.location.replace(data)
        } else {
          // this.$messagebox({
          //   message: '订单提交成功，我们将在5分钟内为您添加额度！',
          //   closeOnClickModal: false
          // }).then(action => {
          //   this.account = ''
          //   this.amount = ''
          // })
          this.popShow = !this.popShow
        }
        const { amount } = params
        this.Utils.Storage.save(`rechargeForm-${this.rechargeConfig.type}`, { account: this.account, amount })
      } else {
        this.$toast({
          message: msg,
          duration: 1800
        })
      }
    },
    decideWay () {
      /**
       * @author Cyan
       * @var {String} type 充值类型
       * @var {Number} minAmount 当前通道最小充值金额
       * @var {Number} maxAmount 当前通道最大充值金额
       * @var {Function} numFixed 小数点修正函数
       * @var {Function} amountLimit 金额区间校验
       * @var {Boolean | String} isLimit 金额校验结果
       * @var {Boolean | String} accountValid 银行户名校验结果
       * @description 判断充值金额是否满足当前通道的限额区间后提交
       */

      if (this.formConfig[this.way].isFix) {
        /** 判断固定金额充值方案进行校验 */
        const { amounts } = this.formConfig[this.way]
        /** 用户充值金额是否符合固定金额的配置 */
        const amountFixed = amounts.some(e => +e === +this.amount)

        if (!amountFixed) {
          this.$toast({
            message: '请输入充值限制的固定额度~',
            duration: 1800
          })
          return
        }
      } else {
        /** 最小最大充值范围金额校验 */
        const { minAmount, maxAmount } = this.formConfig[this.way]
        const { numFixed } = filters

        /** 用户充值金额是否在充值区间内 */
        const isLimit = amountLimit(this.amount, minAmount, maxAmount)

        if (!isLimit) {
          this.$toast({
            message: `充值金额请在${numFixed(minAmount)}元-${numFixed(maxAmount)}元之间~`,
            duration: 1800
          })
          return
        }
      }
      // try {
      // } catch (error) {
      // }

      const { type } = this.rechargeConfig
      const accountValid = /^[\u4E00-\u9FA5\uf900-\ufa2d·]{2,15}$/.test(this.account)
      if (type.toLowerCase() === 'bank' && !accountValid) {
        this.$toast({
          message: '请填写正确的银行户名~',
          duration: 1800
        })
      }
      if (type.toLowerCase() !== 'bank' && this.account.length > 30) {
        this.$toast({
          message: `请填写正确的${this.formConfig[this.way].payerName}~`,
          duration: 1800
        })
        return
      }
      const { url, params, redirect } = this.dynamicData
      const { amount, thirdCode, thirdMode, thirdId } = params

      if (this.formConfig[this.way].gwRedirectUrl) {
        const { gwRedirectUrl } = this.formConfig[this.way]
        /** 网银充值跳转银行列表 */
        const bankList = `${gwRedirectUrl}?amount=${amount}&third_mode=${thirdMode}&third_code=${thirdCode}&third_id=${thirdId}`
        this.routerLink({ path: bankList, redirect: true })
      }

      if (this.account || redirect) {
        url && params && this.onSubmit({ url, params, redirect })
      } else {
        this.$toast({
          message: `请填写${this.formConfig[this.way].payerName}`,
          duration: 1800
        })
      }
    }
  },
  created () {
    const storageData = this.Utils.Storage.get(`rechargeForm-${this.rechargeConfig.type}`)
    if (storageData) {
      this.account = storageData.account
      this.amount = storageData.amount

      if (!('amounts' in this.formConfig[this.way]) || !this.formConfig[this.way].amounts.some(e => +e === +storageData.amount)) {
        this.amount = ''
      }
    }
    // console.log(storageData)
    // console.log(this.formConfig)
  }
}
</script>
