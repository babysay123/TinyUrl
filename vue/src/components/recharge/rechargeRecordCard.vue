<style lang="scss" scoped>
.recharge-list-card {
  background: #fff;
  padding: 0 10px 5px;
  margin-bottom: 1px;
  font-size: 13px;
  .recharge-list-card-title,
  .recharge-list-card-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .recharge-list-card-title {
    height: 35px;
  }
  .recharge-list-card-content p {
    line-height: 30px;
  }
}
</style>

<template>
  <div class="recharge-list-card" @click="checkResult">
    <div class="recharge-list-card-title">
      <span class="one-line">订单号:{{ data.orderId }}</span>
      <span :class="[ status.color ]">{{ status.text }}</span>
    </div>
    <div class="recharge-list-card-content">
      <div>
        <p>金额:{{ data.amount }}</p>
        <p class="text-gray" style="font-size: 12px;">{{ data.applyTime }}</p>
      </div>
      <i class="fa fa-angle-right text-gray"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    status () {
      switch (this.data.status) {
        case 0:
          return { text: '等待处理', color: 'text-orange' }
        case 1:
          return { text: '处理中', color: 'text-orange' }
        case 2:
          return { text: '充值成功', color: 'text-red' }
        case 3:
          return { text: '充值失败', color: 'text-black' }
        default:
          return { text: '', color: 'text-black' }
      }
    }
  },
  methods: {
    checkResult () {
      this.Utils.Storage.save('rechrageResult', this.data)
      this.routerLink({ path: '/rechargeResult' })
    }
  }
}
</script>
