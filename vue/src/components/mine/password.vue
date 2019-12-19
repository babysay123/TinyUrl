<style lang="scss" scoped>
@import 'Assets/css/common.scss';
.password-group {
  margin-top: 13px;
  line-height: 44px;
  .label-form-group:first-child {
    margin-bottom: 10px;
  }
  .label-form-group:nth-child(2) {
    margin-bottom: 1px;
  }
}
</style>

<template>
  <div class="password-group">
    <LabelInput
      label="旧密码"
      v-model="input.password"
      type="password"
      full="10px"
      :divider="false"
      :placeholder="`请输入旧${modifyType.placeholder}`"
    />
    <LabelInput
      label="新密码"
      v-model="input.payPassword"
      type="password"
      full="10px"
      :divider="false"
      :placeholder="`请输入新${modifyType.placeholder}`"
    />
    <LabelInput
      label="确认密码"
      v-model="input.repeatPwd"
      type="password"
      full="10px"
      :divider="false"
      placeholder="请再次输入新密码"
    />
    <div class="redBtn" @click="onsubmit">确认修改</div>
  </div>
</template>

<script>
import { editPwdApi, editPayPwdApi } from 'Plugins/api'
import { isNull, PasswordValid, PayPwdValid, RepeatPwdValid } from 'Plugins/utils/ValidatorUtil'
import LabelInput from '../global/labelInput'
export default {
  props: {
    type: {
      type: String,
      default: 'password'
    }
  },
  components: { LabelInput },
  data () {
    return {
      input: {
        password: '',
        payPassword: '',
        repeatPwd: ''
      }
    }
  },
  computed: {
    modifyType () {
      /**
       * @author Cyan
       * @param {String} placeholder 输入框的提示文字
       * @param {Function} validator 验证器
       * @param {Function} api 请求api
       * @description 根据传递的type 区分是修改密码还是交易密码，返回不同的提示文字，密码验证器，请求api
       */
      return {
        label: this.type === 'password' ? '登录' : '交易',
        placeholder: this.type === 'password' ? '登录密码（6-12位）' : '交易密码（6位纯数字）',
        validator: this.type === 'password' ? PasswordValid : PayPwdValid,
        api: this.type === 'password' ? editPwdApi : editPayPwdApi
      }
    }
  },
  methods: {
    async onsubmit () {
      const { password, payPassword, repeatPwd } = this.input
      const { validator, api } = this.modifyType
      const validResults = [
        isNull(this.input),
        validator(password),
        validator(payPassword),
        validator(repeatPwd),
        RepeatPwdValid(payPassword, repeatPwd, validator)
      ].filter(e => e !== 'accept')
      if (validResults.length > 0) {
        this.$toast({
          message: validResults[0],
          durtion: 1800
        })
      } else {
        const res = await api(this.input)
        const { code, msg } = res
        if (code === 0) {
          this.input = {
            password: '',
            payPassword: '',
            repeatPwd: ''
          }
          this.$toast({
            message: msg,
            durtion: 1800
          })
        } else {
          this.$toast({
            message: msg,
            durtion: 1800
          })
        }
      }
    }
  }
}
</script>
