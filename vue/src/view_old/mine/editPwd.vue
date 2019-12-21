<style scoped>
.mint-navbar .mint-tab-item.is-selected {
  border-bottom: 1px solid #d81e06!important;
  margin-bottom: -1px;
}
</style>

<template>
  <section>
    <Head>
      <h3>修改{{ title }}</h3>
    </Head>
    <mt-navbar v-model="loginPwd">
      <mt-tab-item :id="true">修改登录密码</mt-tab-item>
      <mt-tab-item :id="false">修改交易密码</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="loginPwd" swipeable>
      <mt-tab-container-item :id="true">
        <Password />
      </mt-tab-container-item>
      <mt-tab-container-item :id="false">
        <Password type="payPassword" />
      </mt-tab-container-item>
    </mt-tab-container>
  </section>
</template>

<script>
import Head from 'Components/global/head'
import Password from 'Components/mine/password'
export default {
  components: { Head, Password },
  data () {
    return {
      loginPwd: true
    }
  },
  computed: {
    title () {
      return this.loginPwd ? '登录密码' : '交易密码'
    }
  }
}
</script>
