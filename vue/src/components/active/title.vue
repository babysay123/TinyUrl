<template>
  <h3 class="active-title">
    {{ title }}
  </h3>
</template>

<script>
export default {
  props: {
    title: String,
    required: true
  }
}
</script>

<style scoped>
.active-title {
  color: #333;
  font-size: 18px;
  border-left: 7.5px solid #ed0404;
  padding-left: 10px;
  margin-bottom: 10px;
}
</style>
