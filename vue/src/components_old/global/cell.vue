<style lang="scss" scoped>
.cell {
  margin-bottom: .375rem;
}
.cell-head {
  font-weight: 400;
  line-height: .8rem;
  height: .8rem;
  padding: 0 .4375rem;
  color: #666;
}
</style>

<template>
  <div :class="{ 'cell': !head }">
    <div v-if="head" class="cell-head">
      {{ head }}
    </div>
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    head: {
      type: String
    }
  }
}
</script>
