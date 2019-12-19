<template>
  <section>
    <Head>
      <h3>充值记录</h3>
    </Head>
    <RechargeStep :status="status" />
    <DetailsCard :details="details" />
  </section>
</template>

<script>
import Head from 'Components/global/head_new'
import RechargeStep from 'Components/recharge/rechargeStep'
import DetailsCard from 'Components/global/detailsCard'
import { rechargeListDetailsApi } from 'Plugins/api'
export default {
  components: { Head, RechargeStep, DetailsCard },
  data () {
    return {
      details: [],
      status: {}
    }
  },
  async created () {
    /**
     * @author Cyan
     * @param {Number} id 需要查询数据的id值
     * @description 获取订单详情数据，解析数据为数组格式，用于渲染，解析订单状态为对象，用于传递给Step组件使用
     */
    const { id } = this.$route.query
    const res = await rechargeListDetailsApi({ id })
    const { data } = res
    const { applyTime, orderId, amount, paymentPlatform, depositor, processedTime, status } = data
    this.details = [
      { label: '申请时间', content: applyTime, color: 'text-red' },
      { label: '订单号', content: orderId, copy: true },
      { label: '充值金额', content: amount },
      { label: '充值平台', content: paymentPlatform },
      { label: '付款人姓名', content: depositor },
      { label: '处理时间', content: processedTime },
      { label: '充值类型' }
    ]
    switch (status) {
      case 0:
        this.status = { text: '等待处理', color: 'text-orange', status }
        break
      case 1:
        this.status = { text: '处理中', color: 'text-orange', status }
        break
      case 2:
        this.status = { text: '充值成功', color: 'text-red', status }
        break
      case 3:
        this.status = { text: '充值失败', color: 'text-black', status }
        break
      default:
        this.status = { text: '', color: 'text-black', status }
        break
    }
  }
}
</script>
