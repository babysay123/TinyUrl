<template>
  <section style="margin-top: 1.125rem;">
    <Head fixed>
      <h3>{{ title }}</h3>
    </Head>
    <RechargeForm />
  </section>
</template>

<script>
import Head from 'Components/global/head'
import RechargeForm from 'Components/recharge/rechargeForm'
export default {
  components: { Head, RechargeForm },
  computed: {
    title () {
      return this.Utils.Storage.get('rechargeConfig') ? this.Utils.Storage.get('rechargeConfig').title : '充值'
    }
  }
}
</script>
