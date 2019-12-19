<style lang="scss" scoped>
.rechargeTips {
  background: rgb(253, 253, 236);
  color:rgb(249, 163, 99);
  border: 1px solid rgb(249, 229, 109);
  font-weight: 400;
  margin: 10px;
  font-size: 14px;
  padding: 5px;
  white-space: pre-wrap;
}
</style>

<template>
  <div class="rechargeTips">
    <p v-html="tips" />
  </div>
</template>

<script>
export default {
  props: {
    tips: {
      type: String,
      required: true
    }
  }
}
</script>
