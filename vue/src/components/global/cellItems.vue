<style lang="scss" scoped>
.cell-items {
  height: 1.25rem;
  background: #fff;
  padding: 0 .4375rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  &:active {
    background: rgba(0, 0, 0, .1);
  }
  &:not(:last-child) {
    border-bottom: 1px solid #eee;
  }
  i {
    margin-left: 10px;
  }
}
.noFeedback:active {
  background: #fff;
}
</style>

<template>
  <div class="cell-items" :class="{ 'noFeedback': !callback }" @click="callback && callback(title)">

    <slot name="title">
      <span class="cell-items-title">{{ title }}</span>
    </slot>

    <div>

      <slot name="right"/>

      <slot name="arrow" v-if="arrow">
        <i class="fa fa-angle-right fa-lg text-gray"></i>
      </slot>

    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    },
    callback: {
      type: Function
    },
    link: {
      type: String
    },
    arrow: {
      type: Boolean,
      default: true
    }
  }
}
</script>
