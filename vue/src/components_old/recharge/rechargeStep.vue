<style lang="scss" scoped>
.recharge-step {
  padding: 10px;
  display: flex;
  .recharge-step-icon {
    margin-right: 10px;
    .step-icon {
      img {
        width: 20px;
      }
      &:not(:last-child) {
        margin-bottom: 15px;
      }
    }
    .step-icon-done {
      position: relative;
      &::after {
        position: absolute;
        content: '';
        height: 17px;
        width: 2px;
        background: #86b451;
        left: 50%;
        margin-left: -2px;
        bottom: 0;
        transform: translateY(15px);
      }
    }
  }
}
.recharge-step-description {
  font-size: 13px;
  p {
    min-height: 35px;
    line-height: 24px;
    &:first-child {
      font-size: 15px;
    }
  }
}
</style>

<template>
  <div class="recharge-step">
    <div class="recharge-step-icon">
      <div class="step-icon step-icon-done">
        <img src="/mobile/images/mine/withdrawal_success_done.png">
      </div>
      <div class="step-icon">
        <img :src="setpIcon">
      </div>
    </div>
    <div class="recharge-step-description">
      <p>您的充值申请提交成功</p>
      <p :class="[ status.color ]">{{ status.text || data.remark || '充值成功' }}</p>
      <p v-if="data.status === 2 || data.type === 7" class="text-red">充值成功后，您的余额将在1分钟内更新，请稍后查看，若届时仍未到账，请联系在线客服。</p>
      <p v-if="data.status === 3" class="text-gray">如需了解具体情况，请联系在线客服。</p>
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
    },
    setpIcon () {
      return this.data.status === 2 || this.data.type === 7 ? '/mobile/images/mine/withdrawal_success_done.png' : '/mobile/images/mine/withdrawal_success_undone.png'
    }
  }
}
</script>
