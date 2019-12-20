<style lang="scss">
.modify-content {
  padding-top: 15px;
  height: calc(100% - 1.125rem);
  box-sizing: border-box;
  background: #f5f4f9;
  input {
    width: 100%;
    line-height: 1.25rem;
    height: 1.25rem;
    background: #fff;
    padding: 0 .375rem;
    font-size: 14px;
    box-sizing: border-box;
    border: none;
  }
  .input-tip {
    text-align: right;
    padding: 5px 10px;
  }
  .btn {
    width: calc(100% - 30px);
    display: block;
    box-sizing: border-box;
    margin: 10px auto;
    font-size: 14px;
    height: 1.125rem;
    line-height: 1.125rem;
    border-radius: 5px;
  }
}
</style>

<template>
  <Popup
    v-model="value"
    direction="right"
  >
    <Head :backHandler="() => $emit('input', false)">
      <h3>{{ type }}</h3>
    </Head>
    <component
      :is="currentComp.comp"
      :placeholder="currentComp.placeholder"
      :type="currentComp.type"
      :minLength="currentComp.minLength"
      :maxLength="currentComp.maxLength"
      :rule="currentComp.rule"
      :keyName="currentComp.keyName"
      :confirm="currentComp.confirm"
      :description="currentComp.description"
      :inputType="currentComp.inputType"
      :error="currentComp.error"
      @finished="close"
    />
  </Popup>
</template>

<script>
import Popup from 'Components/global/popup'
import Head from 'Components/global/head'
import ModifyInput from './modifyInput'
import {
  chinese,
  qqValid,
  mobileValid,
  wechatValid,
  emailValid
} from 'Plugins/validator'
export default {
  props: {
    value: {
      type: Boolean,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  components: { Popup, Head },
  data () {
    return {
      inputComp: [
        {
          comp: ModifyInput,
          placeholder: '聊天室昵称',
          minLength: 1,
          maxLength: 6,
          keyName: 'nickname',
          description: '聊天室昵称',
          error: '无法使用该昵称，请重试~'
        },
        {
          comp: ModifyInput,
          placeholder: '请输入真实姓名',
          minLength: 2,
          maxLength: 22,
          rule: chinese,
          keyName: 'username',
          confirm: '是否修改真实姓名?',
          description: '真实姓名',
          error: '请输入正确的2-15中文字符~'
        },
        {
          comp: ModifyInput,
          placeholder: '请输入手机号',
          minLength: 11,
          maxLength: 11,
          rule: mobileValid,
          keyName: 'phone',
          confirm: '是否修改手机号?',
          description: '手机号',
          error: '请输入正确的11位手机号格式~',
          inputType: 'number'
        },
        {
          comp: ModifyInput,
          placeholder: '请输入QQ号',
          minLength: 5,
          maxLength: 13,
          rule: qqValid,
          keyName: 'QQ',
          confirm: '是否修改QQ号?',
          description: 'QQ号',
          error: '请输入正确的5-13位QQ号码~~',
          inputType: 'number'
        },
        {
          comp: ModifyInput,
          placeholder: '请输入邮箱',
          minLength: 2,
          maxLength: 20,
          rule: emailValid,
          keyName: 'email',
          confirm: '是否修改邮箱?',
          description: '邮箱',
          error: '请输入正确的邮箱格式~'
        },
        {
          comp: ModifyInput,
          placeholder: '请输入微信',
          minLength: 6,
          maxLength: 20,
          rule: wechatValid,
          keyName: 'wechat',
          confirm: '是否修改微信?',
          description: '微信',
          error: '微信格式不正确~'
        }
      ]
    }
  },
  computed: {
    currentComp () {
      return this.inputComp[[ '聊天室昵称', '真实姓名', '手机号', 'QQ号', '邮箱', '微信' ].indexOf(this.type)]
    }
  },
  methods: {
    onConfirm (obj) {
      this.confirm = true
    },
    close () {
      this.$emit('input', false)
    }
  }
}
</script>
