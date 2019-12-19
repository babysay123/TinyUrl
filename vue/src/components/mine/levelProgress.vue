<style scoped>
.progress {
  border: 1px solid #fff;
  position: relative;
  overflow: hidden;
}
.progress-percent {
  position: absolute;
  width: 0;
  top: 0;
  left: 0;
  height: 100%;
}
.progress-percent-animation {
  width: 100%;
  height: 100%;
  background: #fff;
  animation: progress .5s ease;
}
.progress-text {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  font-size: 12px;
  text-align: center;
}
@keyframes progress {
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
}
</style>

<template>
  <div class="progress" :style="`height: ${height}; border-radius: ${height}`">
    <div class="progress-percent" :style="`width: ${!maxLevel ? progress * 1000 / 10 : 100}%`">
      <div class="progress-percent-animation" />
    </div>
    <span
      class="progress-text"
      :style="`line-height: ${height}`"
      v-html="textCol(progress)"
    >
    <!-- :class="{ 'text-red': progress > .5 }" -->
      <!-- {{ (progress * 10000) / 100 }}% -->
    </span>
  </div>
</template>

<script>
export default {
  props: {
    progress: {
      type: Number,
      default: 0
    },
    maxLevel: {
      type: Boolean
    },
    width: {
      type: String,
      default: '80px'
    },
    height: {
      type: String,
      default: '12px'
    }
  },
  methods: {
    textCol (progress) {
      if (this.maxLevel) {
        return `<span class="text-red">100%</span>`
      }
      let str = ((progress * 1000 / 10) + '%').split('')
      let arr = str.map((item, inx) => {
        if (progress * 100 > 43 && inx === 0) {
          return `<span class="text-red">${item}</span>`
        } else if (progress * 100 > 49 && inx === 1) {
          return `<span class="text-red">${item}</span>`
        } else if (progress * 100 > 58) {
          return `<span class="text-red">${item}</span>`
        } else {
          return `<span>${item}</span>`
        }
      })
      return arr.join('')
    }
  }
}
</script>
