<!--  -->
<template>
  <section style="margin-top: 1.125rem; overflow: hidden; margin-bottom: 50px;">
    <Head fixed>
      <h3>注册</h3>
    </Head>

    <!-- <div class="register-logo">
      <img src="/mobile/images/weblogo.png">
    </div> -->

    <div class="login-form">

      <LoginInput
        v-for="b in base"
        :key="b.model"
        :icon="b.icon"
        v-model="input[b.model]"
        :placeholder="b.placeholder"
        :inputType="b.inputType"
        :maxLength="b.maxLength"
        :minLength="b.minLength"
      />

      <LoginInput
        v-for="c in config"
        :key="c.model"
        :icon="c.model"
        v-model="subjoin[c.model]"
        :placeholder="`请填写${c.name}${c.required === 0 ? '(选填)' : '(必填)' }`"
        :inputType="c.inputType"
        :maxLength="c.maxLength"
        :minLength="c.minLength"
        :disabled="c.model === 'referrer' && hasReferrer"
      />

      <!-- <Verification
        v-model="input.verifyImg"
        :baseimg="base64url"
        @switch = "switch1"
      ></Verification> -->
    </div>

    <!-- <div class="lawLabel" >
      注册即代表我已满18岁并同意
      <a @click="agreement = true">《用户服务协议》</a>
    </div> -->

    <div class="redBtn" @click="onSubmit">注册</div>

    <!-- <div
      class="whitBtn"
      @click="routerLink({
        path: '/mobile/other/download.html',
        params: $route.query.c ? `?c=${$route.query.c}` : null,
        redirect: true
      })"
    >
      下载App
    </div> -->

    <!-- <div class="login-tip">
      <span>
        已有账号？
        <router-link to='/login'>立即登录</router-link>
      </span>
    </div> -->

    <div class="law-popup" v-if="agreement">
      <Head :backHandler="() => { this.agreement = !this.agreement }">
        <h3>法律声明</h3>
      </Head>
      <div class="law-textarea" v-html="law" />
    </div>

    <div v-if="mask" class="submit-mask" />
  </section>
</template>

<script>
import Head from 'Components/global/head'
import LoginInput from 'Components/login/loginInput'
import Verification from 'Components/login/verification'
// import { registerConfigApi, registerApi, verificationApi } from 'Plugins/api'
import {
  usernameValid,
  passwordValid,
  repeatPwdValid,
  chinese,
  qqValid,
  mobileValid,
  wechatValid,
  emailValid,
  referrerValid
} from 'Plugins/validator'
// import { mapMutations } from 'vuex'

import Law from './law.js'
export default {
  components: {
    Head,
    LoginInput,
    Verification
  },
  data () {
    return {
      mask: false,
      base64url: '',
      agreement: '',
      law: Law.law,
      input: {
        account: '',
        password: '',
        repassword: '',
        verifyImg: ''
      },
      hasReferrer: false,
      subjoin: {
        real_name: '',
        qq: '',
        phone: '',
        email: '',
        wechat: '',
        referrer: ''
      },
      base: [
        // {
        //   model: 'account',
        //   placeholder: '请输入账号(4-16个英文字母或数字)',
        //   icon: 'user',
        //   minLength: '4',
        //   maxLength: '16'
        // },
        {
          model: 'mobile',
          placeholder: '请输入手机号码',
          icon: 'mobile',
          minLength: '11',
          maxLength: '11'
        },
        {
          model: 'mail',
          placeholder: '请输入短信验证码',
          icon: 'user',
          minLength: '4',
          maxLength: '16'
        },
        {
          model: 'password',
          placeholder: '请输入密码(6-12个英文字母或数字)',
          inputType: 'password',
          icon: 'password',
          minLength: '6',
          maxLength: '12'
        },
        {
          model: 'repassword',
          placeholder: '请再次输入密码',
          inputType: 'password',
          icon: 'password',
          minLength: '6',
          maxLength: '12'
        }
      ],
      config: []
    }
  },
  methods: {
    // ...mapMutations([ 'updateUserInfo' ]),
    onValid () {
      /** 将附加参数中必填和选填已有值的对象添加到 input 对象中 */
      this.config.forEach(e => {
        if (e.required === 1 || this.subjoin[e.model]) {
          this.input = { ...this.input, [e.model]: this.subjoin[e.model] }
        }
      })

      /**
       * @var {Array} needValidKey 当前需要验证对象的 keys 数组
       * @var {Array} validResults 验证对象的结果返回
       * @description 根据需要验证的 keys 数组进行校验 返回
       */
      const needValidKey = Object.keys(this.input)
      const validResults = needValidKey.map(e => {
        if (!this.input[e]) {
          switch (e) {
            case 'account':
              return '账号不能为空~'
            case 'password':
              return '密码不能为空~'
            case 'repassword':
              return '请再次输入密码~'
            case 'real_name':
              return '真实姓名为必填内容~'
            case 'qq':
              return 'QQ为必填内容~'
            case 'phone':
              return '手机号为必填内容~'
            case 'email':
              return '邮箱为必填内容~'
            case 'wechat':
              return '微信为必填内容~'
            case 'referrer':
              return '邀请码为必填内容~'
            case 'verifyImg':
              return '请输入验证码'
          }
        } else {
          const val = this.input[e]
          switch (e) {
            case 'account':
              return !usernameValid(val) ? '账号格式不正确~' : null
            case 'password':
              return !passwordValid(val) ? '密码格式不正确~' : null
            case 'repassword':
              return !repeatPwdValid(this.input.password, val) ? '两次密码不一致~' : null
            case 'real_name':
              return !chinese(val) ? '请输入正确的2-15中文字符~' : null
            case 'qq':
              return !qqValid(val) ? '请输入正确的5-13位QQ号码~' : null
            case 'phone':
              return !mobileValid(val) ? '请输入正确的11位手机号格式~' : null
            case 'email':
              return !emailValid(val) ? '请输入正确的邮箱格式~' : null
            case 'wechat':
              return !wechatValid(val) ? '微信格式不正确~' : null
            case 'referrer':
              return !referrerValid(val) ? '请输入8位非0纯数字邀请码~' : null
          }
        }
      }).filter(e => e)
      /** 校验结果如果有值 则校验未通过 返回其值 弹窗提示 */
      if (validResults.length > 0) {
        return validResults[0]
      }
    },
    switch1 () {
      // verificationApi().then(res => {
      //   if (res.code === 0) this.base64url = res.data
      // })
    },
    async onSubmit () {
      // const validResult = this.onValid()
      // if (validResult) {
      //   this.$toast({
      //     message: validResult,
      //     duration: 1800
      //   })
      // } else {
      //   this.mask = true
      //   try {
      //     const res = await registerApi(this.input)
      //     const { code, msg } = res
      //     if (code === 0) {
      //       const { data } = res
      //       this.updateUserInfo(data)
      //       this.Utils.Storage.save('user', data)
      //       this.$toast({
      //         message: '注册成功~',
      //         duration: 1800
      //       })
      //       setTimeout(() => {
      //         this.$router.replace('/mine')
      //       }, 1800)
      //       return
      //     } else {
      //       this.$toast({
      //         message: msg,
      //         duration: 1800
      //       })
      //       this.mask = false
      //     }
      //   } catch (error) {
      //     this.mask = false
      //     if (error.response.status === 600) {
      //       this.$toast({
      //         message: '提交信息含有敏感字符，请修改后重新提交~',
      //         duration: 1800
      //       })
      //     }
      //   }
      //   this.switch1()
      // }
    },
    async getConfig () {
      /**
       * @author Cyan
       * @description 获取注册所需配置 过滤掉不需要展示的并将邀请码排序到最后 同时添加循环渲染所需要的 input 参数
       */
      // const res = await registerConfigApi()
      // if (res.code === 0) {
      //   const { data } = res
      //   this.config = data.filter(e => e.show === 1)
      //     .sort((a, b) => a.type > b.type || a.type === 5 ? 1 : -1)
      //     .map(e => {
      //       switch (e.type) {
      //         case 0:
      //           e.model = 'real_name'
      //           e.inputType = 'text'
      //           e.minLength = '2'
      //           e.maxLength = '20'
      //           return e
      //         case 1:
      //           e.model = 'qq'
      //           e.inputType = 'number'
      //           e.minLength = '5'
      //           e.maxLength = '12'
      //           return e
      //         case 2:
      //           e.model = 'phone'
      //           e.inputType = 'number'
      //           e.minLength = '11'
      //           e.maxLength = '11'
      //           return e
      //         case 3:
      //           e.model = 'email'
      //           e.inputType = 'text'
      //           e.minLength = '2'
      //           e.maxLength = '20'
      //           return e
      //         case 4:
      //           e.model = 'wechat'
      //           e.inputType = 'text'
      //           e.minLength = '2'
      //           e.maxLength = '20'
      //           return e
      //         case 5:
      //           e.model = 'referrer'
      //           e.inputType = 'number'
      //           e.minLength = '8'
      //           e.maxLength = '8'
      //           return e
      //         default:
      //           return e
      //       }
      //     })
      // }
    }
  },
  created () {
    // const c = this.$route.query.c
    // if (c) {
    //   this.subjoin.referrer = c
    //   this.hasReferrer = true
    //   this.input = { ...this.input, referrer: c }
    // }
    // this.getSessionId()
    // this.getConfig()
    // this.switch1()
  }
}
</script>
