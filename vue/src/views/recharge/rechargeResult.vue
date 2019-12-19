<template>
  <div>
    <Head>
      <h3>充值记录</h3>
    </Head>
    <RechargeStep :data="result" />
    <DetailsCard :details="resultCard" />
  </div>
</template>

<script>
import Head from 'Components/global/head_new'
import RechargeStep from 'Components/recharge/rechargeStep'
import DetailsCard from 'Components/global/detailsCard'
import { rechargeResultAPi } from 'Plugins/api'
export default {
  components: { Head, RechargeStep, DetailsCard },
  data () {
    return {
      result: {}
    }
  },
  computed: {
    resultCard () {
      const {
        applyTime,
        orderId,
        amount,
        paymentPlatform,
        depositor,
        processedTime,
        type
      } = this.result

      let typeText = ''
      switch (type) {
        case 1:
          typeText = '第三方支付'
          break
        case 2:
          typeText = '银行入款'
          break
        case 3:
          typeText = '快速入款'
          break
        case 7:
          typeText = '手工加款'
          break
        default:
          break
      }

      return [
        { label: '申请时间', content: applyTime, color: 'text-red' },
        { label: '订单号', content: orderId, copy: true },
        { label: '充值金额', content: amount },
        { label: '支付平台', content: paymentPlatform },
        { label: '付款人姓名', content: depositor },
        { label: '处理时间', content: processedTime },
        { label: '充值类型', content: typeText }
      ]
    }
  },
  methods: {
    async getData () {
      const { id, type } = this.$route.query
      const res = await rechargeResultAPi({ id, type })
      this.result = res.data
    }
  },
  created () {
    const result = this.Utils.Storage.get('rechrageResult')
    if (!result) {
      this.$router.go(-1)
      return
    }
    this.result = result
  }
}
</script>
