<!-- 折叠 -->
<template>
  <el-collapse class="coll-content" v-model="activeName" accordion>
    <el-collapse-item class="coll-item" title="一致性 Consistency" name="1">
      <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；在界面中一致：<br />所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
    </el-collapse-item>
    <el-collapse-item
      v-for="(item, i) in collList"
      :key="i + '-coll-apse'"
      class="coll-item"
      :title="item.title"
      :name="i"
    >
      <div>{{ item.content }}</div>
    </el-collapse-item>
    <!-- <el-collapse-item class="coll-item" title="效率 Efficiency" name="3">
      <div>简化流程：设计简洁直观的操作流程；</div>
      <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
      <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
    </el-collapse-item>
    <el-collapse-item class="coll-item" title="可控 Controllability" name="4">
      <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
      <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
    </el-collapse-item> -->
  </el-collapse>
</template>

<script>
export default {
  name: '',
  props: {
    collList: {
      type: Array
    }
  },
  data () {
    return {
      loading: false,
      activeName: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.coll-content {
  // position: relative;
  /deep/ .el-collapse-item__header {
    padding-left: 15px;
    height: 36px !important;
    line-height: 36px !important;
  }
  /deep/ .el-collapse-item__content {
    font-size: 12px;
    padding: 5px;
  }
  // .coll-item {
  // }
}
</style>
