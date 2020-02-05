<template>
  <div class="login-group" :class="{ 'login-group-focus': focus }">
    <!-- <i class="login-group-icon icon iconfont" :class="[ iconClass, focus ? 'icon-focus' : '' ]" /> -->
    <i
      :class="'login-group-icon icon-' + icon"
    ></i>
    <input
      v-model="val"
      :type="inputType === 'password' ? 'password' : 'text'"
      :placeholder="placeholder"
      :minLength="minLength"
      :maxLength="maxLength"
      :disabled="disabled"
      :style="{ color: disabled ? '#333' : 'inherit' }"
      @input="ele => inputNumber(ele.target.value)"
    >
    <a
      v-if="isMail"
      class="login-send-valid"
      @click="sendMail"
    >{{ sendMsg + (!this.canSend && 's') }}</a>
    <!-- @focus="focus = true"
      @blur="focus = false" -->
  </div>
</template>

<script>
import { mailvalidApi } from 'Plugins/api'
import { mobileValid } from 'Plugins/validator'

export default {
  props: {
    // 短信验证码用
    isMail: {
      type: Boolean
    },
    // 短信验证码的手机value
    needMobile: {
      type: String
    },
    value: {
      type: [ String, Number ],
      required: true
    },
    placeholder: {
      type: String
    },
    inputType: {
      type: String,
      default: 'text'
    },
    required: {
      type: Boolean,
      default: false
    },
    rule: {
      type: Function
    },
    iconSize: {
      type: String
    },
    icon: {
      type: String
    },
    minLength: {
      type: [ Number, String ]
    },
    maxLength: {
      type: [ Number, String ]
    },
    disabled: {
      type: Boolean
    }
  },
  data () {
    return {
      val: this.value,
      focus: false,
      canSend: true,
      sendMsg: '发送验证码'
    }
  },
  computed: {
    iconClass () {
      const iconMap = new Map([
        [ 'user', 'id' ],
        [ 'password', 'suo' ],
        [ 'qq', 'qqicon' ],
        [ 'wechat', 'weixin' ],
        [ 'real_name', 'name' ],
        [ 'email', 'mail' ],
        [ 'phone', 'phone' ],
        [ 'referrer', 'code' ]
      ])
      return `icon-${iconMap.get(this.icon)}`
    }
  },
  methods: {
    inputNumber (val) {
      if (this.inputType === 'number') {
        this.val = val.replace(/[^\d]/g, '')
      }
      this.$emit('input', this.val)
    },
    countDown () {
      if (this.canSend) {
        this.canSend = false
        this.sendMsg = 60
      }
      if (!this.canSend && this.sendMsg === 0) {
        this.canSend = true
        this.sendMsg = '发送验证码'
        return
      }

      setTimeout(() => {
        this.sendMsg -= 1
        this.countDown()
      }, 1000)
    },
    async sendMail () {
      // console.log(this.needMobile)
      let height = window.innerHeight - 80
      if (!this.needMobile || !mobileValid(this.needMobile)) {
        this.$message({
          duration: 2 * 1000,
          message: '请输入正确的手机号码',
          offset: height,
          // type: 'none'
          type: 'error'
        })
        return
      }
      // 倒计时 60s 结束前不能发送请求
      if (this.canSend) {
        this.countDown()
      } else {
        return
      }

      // 传参
      let params = {
        type: 'REG', // 注册时专用
        account: this.needMobile,
        code: 86, // 国家代码，固定86
        language: 'cn-ZH' // 短信语言，固定中文
      }
      // console.log(params)
      const res = await mailvalidApi(params)
      // console.log(res)
      const { code } = res
      if (code === 0) {
        this.$message({
          duration: 2 * 1000,
          message: '验证码发送成功~',
          offset: height,
          type: 'success'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'Assets/css/base.color.scss';
.login-group {
  width: 100%;
  display: flex;
  align-items: flex-end;
  // height: 50px;
  // line-height: 50px;
  height: 44px;
  line-height: 44px;
  background-image: linear-gradient($baseCol, $baseCol), linear-gradient(#e2e2e2, #e2e2e2);
  background-position: center bottom, center bottom;
  background-size: 0 2px, 100% 1px;
  background-repeat: no-repeat;
  transition: .35s ease;
  position: relative;

  .login-group-icon {
    width: 30px;
    height: 100%;
    // height: 42px;
    // height: 35px;
    // font-size: 26px;
    color: #979797;
    &.icon-mobile {
      background: url('/mobile/img/login/login_phone@3x.png') no-repeat center center;
      background-size: 22px;
    }
    &.icon-lock {
      background: url('/mobile/img/login/login_password@3x.png') no-repeat center center;
      background-size: 22px;
    }
    &.icon-referrer {
      background: url('/mobile/img/login/login_invite@3x.png') no-repeat center center;
      background-size: 22px;
    }
    &.icon-mail {
      background: url('/mobile/img/login/login_verification@3x.png') no-repeat center center;
      background-size: 22px;
    }
  }
  .icon-focus {
    color: $baseCol;
  }
  input {
    background: none;
    flex: 1;
    outline: none;
    height: 42px;
    line-height: 42px;
    padding-left: 2px;
    font-size: 14px;
    border: none;
  }
}
.login-group-focus {
  background-size: 100% 2px, 100% 1px;
}

.login-send-valid {
  // display: none;
  position: absolute;
  line-height: 24px;
  color: #fff;
  background: #d81e06;
  height: 24px;
  right: 6px;
  top: 8px;
  padding: 0 6px;
  border-radius: 4px;
  width: 60px;
  text-align: center;
}

</style>
