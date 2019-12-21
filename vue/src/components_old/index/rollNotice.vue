<style lang="scss" scoped>
.roll-notice {
  height: 180px;
  overflow: hidden;
  font-size: 14px;
  padding: 0 18px;
  background: #fff;
  color: #333;
  li {
    height: 30px;
    line-height: 30px;
    span {
      width: calc(100% / 3);
      display: inline-block;
      &:nth-child(2) {
        text-align: center;
      }
      &:last-child {
        text-align: right;
      }
    }
  }
}
</style>

<template>
  <section class="roll-notice">
    <ul class="roll-notice-ul">
      <li class="roll-notice-li" v-for="(r, index) in data" :key="index">
        <span class="one-line">{{ r.username }}</span>
        <span class="one-line text-red">喜中{{ r.winFee }}元</span>
        <span class="one-line">{{ r.lotteryCategory }}</span>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      count: 0,
      animated: null,
      copyData: this.data
    }
  },
  methods: {
    noticeAnimated () {
      /**
        * @author cyan
        * @var {HTMLElement} container ul容器
        * @var {Number} counter 计数器
        * @var {Array} firstLi 拷贝数组第一个元素
        * @description 让容器的 translateY 逐帧 -1，第一个子元素消失过后移动至最底部，循环动画
      */
      let container = document.querySelector('.roll-notice-ul')
      this.count--
      if (this.count < -30) {
        // window.cancelAnimationFrame(this.animated)
        clearTimeout(this.animated)
        let firstLi = container.firstChild
        container.appendChild(firstLi)
        this.count = 0
      }
      container.style.transform = `translateY(${this.count}px)`
      // this.animated = requestAnimationFrame(this.noticeAnimated)
      this.animated = setTimeout(() => {
        this.noticeAnimated()
      }, 1000 / 30)
    }
  },
  updated () {
    // 启动动画
    this.$nextTick(() => {
      this.noticeAnimated()
    })
  },
  beforeDestroy () {
    // 关闭页面删除动画
    // window.cancelAnimationFrame(this.animated)
    clearTimeout(this.animated)
  }
}
</script>
