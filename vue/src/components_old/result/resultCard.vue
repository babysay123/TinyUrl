<style scoped>
.result-card {
  padding: 0 10px 15px;
  border-bottom: 1px solid #f1f1f1;
  background: #fff;
}
.result-card:active {
  background: rgba(173, 235, 255, .7);
}
.result-info {
  height: 43px;
  line-height: 43px;
}
.result-info span {
  font-size: 12px;
  display: block;
}
.result-info-name {
  font-size: 14px;
  margin-right: 10px;
  float: left;
}
.result-info-issue {
  color: #7a7a7a;
  float: left;
}
.result-info-time {
  color: #7a7a7a;
  float: right;
}
</style>

<template>
  <div class="result-card">
    <div class="result-info">
      <span v-if="name" class="result-info-name text-red one-line">{{ name }}</span>
      <span class="result-info-issue one-line">第{{ issue }}期</span>
      <span class="result-info-time one-line">{{ time }}</span>
    </div>
    <ResultType
      :type="gameType"
      :data="numberSplit"
    />
  </div>
</template>

<script>
import ResultType from './resultType'
export default {
  components: { ResultType },
  props: {
    data: {
      type: String,
      required: true
    },
    name: {
      type: String
    },
    issue: {
      type: [ String, Number ],
      required: true
    },
    time: {
      type: String,
      required: true
    },
    id: {
      type: Number,
      required: true
    }
  },
  computed: {
    numberSplit () {
      return this.data.split(',')
    },
    gameType () {
      // 根据游戏类型渲染不同的排版
      if (this.id === 1 || this.id === 27 || this.id === 30 || this.id === 31) {
        return 'dice'
      }
      if (this.id === 7 || this.id === 17 || this.id === 47) {
        return 'luck'
      }
      if (this.id === 9 || this.id === 28 || this.id === 48) {
        return 'zodiac'
      }
      return 'common'
    }
  }
}
</script>
