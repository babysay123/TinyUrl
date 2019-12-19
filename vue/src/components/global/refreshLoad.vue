<template>
  <mt-loadmore
    :top-method="loadTop"
    ref="loadmore"
  >
    <slot></slot>
  </mt-loadmore>
</template>

<script>
export default {
  props: {
    pullload: {
      type: Function,
      required: true
    }
  },
  methods: {
    async loadTop () {
      // 下拉刷新，调用传递的函数，完成过后完成加载状态，并弹出信息提示
      await this.pullload()
      this.$refs.loadmore.onTopLoaded()
      this.$toast({
        message: '加载完成',
        position: 'top',
        duration: 500
      })
    }
  }
}
</script>
