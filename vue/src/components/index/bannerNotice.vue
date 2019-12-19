<style lang="scss" scoped>
.index-notice {
  padding-left: 10px;
  overflow: hidden;
  background: #fff;
  .notice-icon {
    width: 24px;
    height: 24px;
    margin-top: 4px;
  }
  .notice-container {
    float: right;
    width: calc(100% - 34px);
    height: 32px;
    overflow: hidden;
    ul {
      width: max-content;
      height: 32px;
    }
    li {
      display: inline-block;
      height: 32px;
      line-height: 32px;
      color: #111;
      font-size: 14px;
      font-weight: 500;
      margin-right: 10px;
    }
  }
}
</style>

<template>
  <section class="index-notice">
    <img class="notice-icon" src="/mobile/images/index/notify@3x.png">
    <div class="notice-container">
      <ul class="notice-ul">
        <li v-for="(n, index) in notices" :key="index">{{ n.content }}</li>
      </ul>
    </div>
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
      timer: null,
      containerW: 0,
      count: 0,
      animated: null
    }
  },
  computed: {
    notices () {
      return this.data.length > 0 ? this.data : [ { content: '暂无新通告' } ]
    }
  },
  methods: {
    noticeAnimated () {
      /**
        * @author cyan
        * @var {Number} minW 最小父容器宽度
        * @var {HTMLElement} container ul容器
        * @var {Number} containerW 容器总宽度
        * @var {Number} counter 计数器
        * @description 获取容器宽度 让容器的 translateX 逐帧 -1 实现动画效果 当容器已经全部消失完成初始化到最右侧出现
      */
      let minW = document.querySelector('.notice-container').clientWidth
      let container = document.querySelector('.notice-ul')
      this.containerW = container.clientWidth
      this.count--
      container.style.transform = `translateX(${this.count}px)`
      if (this.count < -this.containerW) {
        this.count = this.containerW < minW ? minW : this.containerW
      }
      this.animated = requestAnimationFrame(this.noticeAnimated)
    }
  },
  updated () {
    // 当dom元素已经加载完毕后调用
    this.$nextTick(() => {
      this.noticeAnimated()
    })
  },
  beforeDestroy () {
    // 关闭页面删除动画
    window.cancelAnimationFrame(this.animated)
  }
}
</script>
