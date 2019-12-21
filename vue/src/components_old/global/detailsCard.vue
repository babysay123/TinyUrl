<style lang="scss" scoped>
.details-card {
  padding: 10px;
  background: #fff;
  .details-card-title {
    font-size: 13px;
    margin-bottom: 5px;
  }
  p {
    height: 25px;
    line-height: 25px;
    font-size: 13px;
    color: #a1a1a1;
    display: flex;
    align-items: center;
    span:first-child {
      width: 70px;
      text-align: right;
      margin-right: 10px;
    }
  }
  .copy {
    width: 40px;
    color: #333;
    margin-left: 10px;
    border: 1px solid #333;
    border-radius: 3px;
    height: 20px;
    line-height: 20px;
    text-align: center;
  }
}
</style>

<template>
  <div class="details-card">
    <div class="details-card-title">{{ title }}</div>
    <p v-for="(d, index) in details" :key="index">
      <span>{{ d.label }}</span>
      <span class="one-line" :class="[ d.color, d.copy ? 'copy-target' : '' ]">{{ d.content }}</span>
      <span v-clipboard:copy-target v-if="d.copy" class="copy">复制</span>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '订单详情'
    },
    details: {
      type: Array,
      required: true
    }
  }
}
</script>
