<template>
  <el-row>
  </el-row>
</template>

<script>
export default {
  name: 'gameTabs',
  data () {
    return {
      cols: [
        { tab: '红包', content: 'aaa component' }
      ],
      content: {}
    }
  },
  method: {
    init () {
      console.log('init')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
