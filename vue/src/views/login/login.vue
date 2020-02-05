<!--  -->
<template>
  <section>
    <Head>
      <h3>登录</h3>
    </Head>

    <!-- <div class="login-logo">
      <img src="/mobile/images/weblogo.png">
    </div> -->

    <div class="login-form">
      <LoginInput
        v-model="input.account"
        placeholder="请输入账号"
        iconSize="big"
        icon="mobile"
        minLength="4"
        maxLength="16"
      />
      <LoginInput
        v-model="input.password"
        :inputType="'password'"
        placeholder="请输入密码"
        icon="lock"
        minLength="6"
        maxLength="12"
      />
      <!-- <Verification
        v-model="input.headImg"
        :baseimg="base64url"
        @switch = "switch1"
      ></Verification> -->
    </div>

    <div class="common-btn redBtn" @click="onSubmit">登录</div>

    <div class="forget">
      <a @click="routerLink({ path: '/forgetPwd' })">忘记密码？</a>
    </div>

    <!-- <div
      class="rememberLabel"
      :class="{ 'remember': isRemember }"
      @click="isRemember = !isRemember"
    >
      记住密码
    </div> -->

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
        没有账号？
        <router-link to='/register'>立即注册</router-link>
      </span>
    </div> -->
    <LinkService title="登录失败？请联系客服" />
    <!-- <div v-if="mask" class="submit-mask"></div> -->
    <!-- <img :src="this.base64url"> -->
  </section>
</template>

<script>
import Head from 'Components/global/head'
import LoginInput from 'Components/login/loginInput'
import LinkService from 'Components/login/linkService'
import Verification from 'Components/login/verification'
import {
  // usernameValid,
  mobileValid,
  passwordValid
} from 'Plugins/validator'
import { loginApi } from 'Plugins/api'
import {
  // mapMutations,
  mapActions
} from 'vuex'
// import { Base64 } from 'js-base64'
export default {
  components: {
    Head,
    LoginInput,
    LinkService,
    Verification
  },
  data () {
    return {
      input: {
        account: '',
        password: ''
        // headImg: ''
      },
      isRemember: false,
      mask: false,
      base64url: ''
    }
  },
  methods: {
    // ...mapMutations([ 'updateUserInfo' ]),
    ...mapActions([
      // 'getNewAccessToken',
      'setUserInfo',
      'LinkWS'
    ]),
    base64ImgtoFile (dataurl, filename = 'file') {
      let arr = dataurl.split(',')
      let mime = arr[0].match(/:(.*?);/)[1]
      let suffix = mime.split('/')[1]
      let bstr = atob(arr[1])
      let n = bstr.length
      let u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], `${filename}.${suffix}`, {
        type: mime
      })
    },
    onValid () {
      const { account, password } = this.input

      if (!account) {
        return '请输入手机号~'
      } else {
        // if (!usernameValid(account)) {
        //   return '账号格式错误，请重新输入~'
        // }
        if (!mobileValid(account)) {
          return '账号格式错误，请重新输入~'
        }
      }

      if (!password) {
        return '请输入密码~'
      } else {
        if (!passwordValid(password)) {
          return '密码格式错误，请重新输入~'
        }
      }
      // if (!headImg) {
      //   return '请输入验证码~'
      // }
    },
    async onSubmit () {
      /**
       * @author Cyan
       * @var validResult 验证结果
       * @description 验证结果如果有返回值 则说明校验不通过 进行弹窗提醒 校验通过 更新个人信息并跳转个人中心页面
       */
      // const { Storage } = this.Utils
      const validResult = this.onValid()
      // let height = window.innerHeight - 80
      if (validResult) {
        this.warnMsgs(validResult)
      } else {
        const res = await loginApi(this.input)
        const { code, data } = res
        if (code === 0) {
          //
          this.setUserInfo(data)
          this.successMsgs('登录成功~')
          // 链接socket
          this.LinkWS()

          setTimeout(() => {
            this.routerLink({
              path: '/malls/gameMall'
            })
          }, 2 * 1000)
        } else {
          // // 临时用户信息
          // const data = {
          //   'id': 24, // 用户编码，需缓存，所以得请求都需要在头部上带上User-Id字段
          //   'nickname': '未命名用户',	// 用户昵称
          //   'account': '13300776696', // 用户账号
          //   'portrait': 'default',	// 用户头像
          //   'balance': 0, // 用户余额，以分为单位
          //   'role': 'MEMBER', // 用户角色，需缓存，所以得请求都需要在头部上带上User-Role字段
          //   'auth': 0, // 用户权限，暂定
          //   'enable': true, // 用户是否被禁用
          //   'logined': 1576912526361, // 登录时间
          //   'accessToken': '0fbf8e83-9ca1-45d7-85bc-955cc620231e', // 访问令牌，需缓存，所以得请求都需要在头部上带上Access-Token字段
          //   'socketToken': 'MjR8TUVNQkVSfDBmYmY4ZTgzLTljYTEtNDVkNy04NWJjLTk1NWNjNjIwMjMxZQ==' // socket连接令牌，用与连接socket
          // }
          // this.setUserInfo(data)
          // // Storage.save('userInfo', data)
          // // Storage.save('accessToken', data.accessToken)
          // // Storage.save('socketToken', data.socketToken)
          // console.log('user info')
          // // this.routerLink({
          // //   path: '/malls/gameMall'
          // // })
        }

        // this.mask = true
        // try {
        //   await this.getSessionId()
        //   const res = await loginApi(this.input)
        //   const { code, msg } = res
        //   if (code === 0) {
        //     const { data } = res
        //     this.updateUserInfo(data)
        //     Storage.save('user', data)
        //     // 登录后，清楚公告显示，让公告重新生成
        //     Storage.remove('noticeRead')
        //     if (this.isRemember) {
        //       Storage.save('remember', btoa(JSON.stringify(this.input)))
        //     }
        //     // this.$store.dispatch('websocket')
        //     this.$toast({
        //       message: '登录成功~',
        //       duration: 1800
        //     })
        //     setTimeout(async () => {
        //       // window.location.replace('/mobile/mine/mine.html')
        //       try {
        //         await this.getNewAccessToken()
        //         this.websocket()
        //       } catch (error) {
        //         console.log(error)
        //       }
        //       this.$router.replace('/mine')
        //     }, 1800)
        //   } else {
        //     this.$toast({
        //       message: msg,
        //       duration: 1800
        //     })
        //     this.switch1()
        //     this.mask = false
        //   }
        // } catch (error) {
        //   this.mask = false
        //   if (error.response.status === 600) {
        //     this.$toast({
        //       message: '提交信息含有敏感字符，请修改后重新提交~',
        //       duration: 1800
        //     })
        //   }
        // }
      }
    }

  },
  created () {
    // if (this.Utils.Storage.get('remember')) {
    //   this.isRemember = true
    //   this.input = JSON.parse(atob(this.Utils.Storage.get('remember')))
    // }
    // this.Utils.Storage.remove('ws')
  }
}
</script>

<style lang="scss" scoped>
@import 'Assets/css/base.color.scss';
.forget {
  margin: 0 5px;
  text-align: right;
  margin-top: -12px;
  line-height: 16px;
  height: 16px;
  a {
    color: $baseRed;
    font-size: 12px;
  }
}
</style>
