<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-06 15:34:43
 * @LastEditTime: 2019-10-17 20:00:39
 * @LastEditors: Please set LastEditors
 -->
<style scoped>
.withdraw-form {
  margin-top: 15px;
  line-height: 44px;
}
.withdraw-form .label-form-group:not(:last-child) {
  margin-bottom: 1px;
}
</style>

<template>
  <section>
    <Head>
      <h3>提现申请</h3>
    </Head>
    <InfoCard title="银行卡" :list="bankInfo" />
    <InfoCard title="消费比例" :list="betData" />
    <div class="withdraw-form">
      <LabelInput
        v-model="input.amount"
        label="提现金额："
        placeholder="请输入提现金额"
        type="number"
        full="10px"
        labelAlign="right"
        :divider="false"
      />
      <LabelInput
        v-model="input.payPassword"
        label="交易密码："
        placeholder="请输入6位数字交易密码"
        type="password"
        full="10px"
        labelAlign="right"
        :divider="false"
      />
    </div>
    <div :class="[ acceptSubmit ? 'redBtn' : 'grayBtn' ]" @click=" show ">提交申请</div>
    <Allpop :asShow="asShow" :imgurl='url' :content='content' :btnaffirm="btnmsg" :closebtn="btnclose" />
  </section>
</template>

<script>
import Head from 'Components/global/head_new'
import InfoCard from 'Components/withdraw/infoCard'
import LabelInput from 'Components/global/labelInput'
import { getBetNumApi, withdrawApi } from 'Plugins/api'
import filters from 'Plugins/filters/filters'
import { isNull, WithdrawValid, PayPwdValid } from 'Plugins/utils/ValidatorUtil'
import Allpop from 'Components/allpop'
export default {
  components: { Head, InfoCard, LabelInput, Allpop },
  data () {
    return {
      betData: [],
      input: {
        amount: '',
        payPassword: ''
      },
      acceptSubmit: false,
      asShow: false,
      url: 'mobile/images/withdraw.png',
      content: '亲~ 转入到余额宝可以获取高额收益哦，确定要提现吗？',
      btnmsg: '转入余额宝',
      btnclose: '立即提现'
    }
  },
  computed: {
    bankInfo () {
      /**
       * @author Cyan
       * @param {String} receivingBank, bankAccount, payee 从缓存拉取的银行名称，卡号，姓名
       * @param {Array} atk * 数组
       * @param {String} hideAccount 将银行卡号进行*号处理的结果
       * @param {Array} list 整理后的数据用于渲染
       * @description 获取缓存中的用户银行卡信息，对卡号进行*处理，然后返回需要的数组格式用作渲染
      */
      const { receivingBank, bankAccount, payee } = this.Utils.Storage.get('bankInfo')
      const atk = []
      for (let i = 0; i < bankAccount.length - 8; i++) {
        atk.push('*')
      }
      const hideAccount = `${bankAccount.slice(0, 4)}${atk.join('')}${bankAccount.slice(-4)}`
      const list = [
        { label: '银行：', content: receivingBank },
        { label: '卡号：', content: hideAccount },
        { label: '姓名：', content: payee }
      ]
      return list
    }
  },
  methods: {
    show () {
      this.asShow = true
    },
    async onSubmit () {
      const { amount, payPassword } = this.input
      const validResults = [ isNull(this.input), WithdrawValid(amount), PayPwdValid(payPassword) ].filter(e => e !== 'accept')
      if (validResults.length > 0) {
        this.$toast({
          message: validResults[0],
          duration: 1800
        })
      } else {
        const res = await withdrawApi(this.input)
        const { code, msg } = res
        if (code !== 0) {
          this.$toast({
            message: msg,
            duration: 1800
          })
        }
      }
    }
  },
  async created () {
    /**
       * @author Cyan
       * @param {String} betNumCurrent, betNumNeed, miniMum 获取需达投注量，已达投注量，最低提款额
       * @param {Function} numFixed - 金额格式处理，保留两位小数
       * @param {Array} numFixed - 整理后的数据用于渲染
       * @param {Boolean} acceptSubmit - 判断用户是否达到提现要求
       * @description 获取消费比例信息，判断用户提现是否达标，返回格式数组渲染数据
      */
    const res = await getBetNumApi()
    const { data } = res
    const { betNumCurrent, betNumNeed, miniMum } = data
    const { numFixed } = filters
    this.betData = [
      { label: '需达投注量：', content: numFixed(betNumNeed) },
      { label: '已达投注量：', content: numFixed(betNumCurrent) },
      { label: '是否可提款：', content: betNumCurrent >= miniMum ? '是' : '否' },
      { label: '最低提款额：', content: numFixed(miniMum) }
    ]
    this.acceptSubmit = betNumCurrent >= miniMum
  }
}
</script>
