<style scoped>
.divider-title {
  height: 40px;
  line-height: 40px;
  padding: 0 10px;
  background: #fff;
}
.divider-title.bt {
  border-top: 1px solid #eee;
}
.divider-title.bb {
  border-bottom: 1px solid #eee;
}
.divider-title::before {
  content: '';
  float: left;
  width: 3px;
  height: 22px;
  margin-top: 10px;
  margin-right: 7px;
  background-color: #d81e06;
}
.divider-title>span {
  font-size: 16px;
  color: #333;
}
</style>

<template>
  <section class="divider-title" :class="{ 'bt': bt, 'bb': bb }">
    <span class="one-line">{{ title }}</span>
  </section>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    bt: {
      type: Boolean,
      default: false
    },
    bb: {
      type: Boolean,
      default: false
    }
  }
}
</script>
