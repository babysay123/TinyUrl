<template>
  <!-- 分位tab -->
  <div class="quantileTab">
    <mt-navbar class="cp" v-model="tabs">
      <mt-tab-item
        v-for="(l, index) in tabMap"
        @click.native="showCurrentTab(index)"
        :key="index"
        :id="index"
      >{{l+(index!== 0? '走势' : '') }}</mt-tab-item>
    </mt-navbar>
  </div>
</template>
<script>
import Logger from '@/plugins/utils/logger'
// TODO: 这里在使用时可以通过vuex传递相关配置
export default {
  data () {
    return {
      tabMap: [],
      tabs: 0
    }
  },
  props: {
    sumNum: {
      type: Number,
      default: 3
    },
    Tabindex: {
      type: Number,
      default: 1
    },
    tabChange: {
      type: Function
    }
  },
  methods: {
    // 显示tab的类型
    tabNums (val) {
      if (val === 10) {
        this.tabMap.push(
          ...['冠军', '亚军', '季军', '第四', '第五', '第六', '第七', '第八', '第九', '第十']
        )
      } else if (val === 5) {
        this.tabMap.push(...['万位', '千位', '百位', '十位', '个位'])
      } else if (val === 4) {
        this.tabMap.push(...['千位', '百位', '十位', '个位'])
      } else {
        this.tabMap.push(...['百位', '十位', '个位'])
      }
      this.tabMap = this.tabMap.slice(0 - this.sumNum)
      this.tabMap.unshift('开奖')
    },
    // 切换tab
    // FIXME: 该方法可移至公用方法
    showCurrentTab (index) {
      try {
        const currentTab = document.querySelector('.cp').querySelectorAll('a')[index]
        document.querySelector('.cp').scrollLeft =
          index === 0 ? 0 : currentTab.offsetLeft - (window.innerWidth * 0.9) / 2 + currentTab.clientWidth / 2
        // 返回当前tab下标值
        this.$emit('tabChange', index)
      } catch (error) {
        Logger.error('应该是点击tab时获取dom出错了')
      }
    }
  },
  mounted () {
    Logger.log('分位tab')
  },
  watch: {
    'sumNum': {
      immediate: true,
      handler: function (e) {
        console.log(e)
        this.tabNums(e)
      }
    },
    'Tabindex': {
      immediate: true,
      handler: function (e) {
        // console.log(e)
        // this.tabkj()
        this.tabs = e
      }
    }

  },
  // 分位展示，默认值3分位
  created () {
    this.tabNums(this.sumNum)
  }
}
</script>
<style lang="scss" scoped>
@import "./../../assets/css/normalize";
.quantileTab {
  // FIXME: 这部分样式是可以公用的，抽时间将其抽出来，样式组件有：switchVariety.vue, quantileTab.vue, gameList.vue
  .cp{
  overflow-x: auto;
  overflow-y: hidden;
    scroll-behavior: smooth;
    &::-webkit-scrollbar-track {
      background-color: transparent;
    }
    /*定义滚动条高宽及背景*/
    &::-webkit-scrollbar {
      height: 0;
      background-color: transparent;
    }
    /*定义滚动条*/
    &::-webkit-scrollbar-thumb {
      background-color: transparent;
    }
  }
  white-space: nowrap;
  .mint-tab-item {
    padding: 0 10px;
    font-size: 0.56rem;
    height: 1rem;
    text-align: center;
    border-bottom: 3px solid transparent;
    color: #807a80;
    display: flex;
    align-items: center;
    margin-bottom: -3px;
    &.is-selected{
      border-bottom-width: 3px !important;
    }
  }
}
</style>
