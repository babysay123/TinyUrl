<style lang="scss" scoped>
.withdrawal-shade {
  position: relative;
  &::after {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
.withdrwal-tips {
  padding: 10px;
  p {
    font-size: 14px;
    margin-bottom: 10px;
  }
  span {
    font-size: 12px;
  }
}
.withdrwal-form {
  line-height: 44px;
  .label-form-group:not(:last-child) {
    margin-bottom: 1px;
  }
}
</style>

<template>
  <section :class="{ 'withdrawal-shade': shade }">
    <Head>
      <h3>提现申请</h3>
    </Head>
    <div class="withdrwal-tips">
      <p class="text-red">* 绑定银行卡</p>
      <span>请填写正确的出款银行资料</span>
    </div>
    <div class="withdrwal-form">
      <LabelInput
        v-for="(i, index) in input"
        :key="index"
        :label="i.label"
        :placeholder="i.placeholder"
        :type="i.type"
        v-model="model[i.model]"
        labelAlign="right"
        :divider="false"
        full="10px"
      />
    </div>
    <div class="redBtn" @click="onSubmit">确认信息</div>
  </section>
</template>

<script>
import Head from 'Components/global/head'
import LabelInput from 'Components/global/labelInput'
import { isNull, BankValid, RealNameValid, PayPwdValid } from 'Plugins/utils/ValidatorUtil'
import { bankInfoApi } from 'Plugins/api'
export default {
  components: { Head, LabelInput },
  data () {
    return {
      shade: false,
      model: {
        receivingBank: '',
        bankAccount: '',
        payee: '',
        bankAddress: '',
        payPassword: ''
      },
      input: [
        {
          label: '开户银行:',
          placeholder: '请输入开户银行',
          model: 'receivingBank'
        },
        {
          label: '银行账号:',
          placeholder: '请输入银行账号',
          model: 'bankAccount',
          type: 'number'
        },
        {
          label: '开户人姓名:',
          placeholder: '请输入开户人姓名',
          model: 'payee'
        },
        {
          label: '开户行地址:',
          placeholder: '请输入开户行地址',
          model: 'bankAddress'
        },
        {
          label: '交易密码:',
          placeholder: '请输入6位数字交易密码',
          model: 'payPassword',
          type: 'password'
        }
      ]
    }
  },
  methods: {
    async onSubmit () {
      const { receivingBank, bankAccount, payee, bankAddress, payPassword } = this.model
      const validResults = [
        isNull(this.model),
        RealNameValid(receivingBank),
        BankValid(bankAccount),
        RealNameValid(payee),
        RealNameValid(bankAddress),
        PayPwdValid(payPassword)
      ].filter(e => e !== 'accept')
      if (validResults.length > 0) {
        this.$toast({
          message: validResults[0],
          duration: 1800
        })
      } else {
        this.shade = true
        const res = await bankInfoApi(this.model)
        const { code } = res
        if (code === 0) {
          this.$toast({
            message: '绑定银行成功，即将跳转至提现申请页面~',
            duration: 1800
          })
          setTimeout(() => {
            this.$router.replace('/withdraw')
          }, 1800)
        } else {
          this.shade = false
        }
      }
    }
  }
}
</script>
