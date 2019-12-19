<template>
  <div>
    <section class="nav-style">
      <div>
        <ul :class="ulStyle">
          <li
            class="report-data"
            v-for="(t,index) in headDataList"
            :key="t.key"
            :class="{ 'actived': active === t.key }"
            @click="changeType(t.key,t.name,index)"
          >{{t.name}}</li>
        </ul>
          <div style="clear: both;"></div>
      </div>
    </section>
  </div>
</template>
<script>
import TimestampParse from 'Plugins/moment'
export default {
  props: {
    headDataList: {
      type: Array
    },
    selectType: {
      type: String
    }
  },
  data () {
    return {
      active: '',
      selectedName: ''
    }
  },
  computed: {
    ulStyle () {
      return this.headDataList.length > 4 ? 'report-datas' : 'report-datas1'
    }
  },
  methods: {
    changeType (type = this.headDataList[0].key, name = this.headDataList[0].name, index) {
      if (type === this.active) return
      this.active = type
      this.selectedName = name
      if (this.selectType === 'date') {
        this.$emit('getHeadSelect', TimestampParse(type))
      } else {
        this.$emit('getHeadSelect', type)
      }
      if (this.headDataList.length < 5) return
      this.titleLocation(index)
    },
    titleLocation (index) {
      let container = document.querySelector('.report-datas')
      if (index < 2 || !index) {
        container.scrollLeft = 0
        return
      }
      let viewWidth = document.querySelectorAll('body')[0].offsetWidth // 视口总宽度
      let childWidth = viewWidth * 0.22 // 元素宽度
      let centerView = (viewWidth / 2) - (childWidth / 2) // 居中的位置离左侧屏幕的距离
      let elWidth = (childWidth + (viewWidth * 0.023)) * 2 + (viewWidth * 0.023) // 元素当前位置距离左侧屏幕的距离
      index -= 2
      container.scrollLeft = (elWidth - centerView) + (childWidth + viewWidth * 0.023) * index
      // console.log('元素居中初始所需偏移量: ', elWidth - centerView)
      // console.log('元素最终位移: 初始偏移量+单个元素宽度+外边距')
    }
  },
  mounted () {
    this.changeType()
  }
}
</script>
<style lang="scss" scoped>
// @import 'Assets/css/base.color.scss';
.nav-style {
  // padding: 1.125rem 2.5% 0.2rem;
  // float: left;
  font-family: 'Microsoft YaHei', 'Arial', '\5B8B\4F53', 'sans-serif';
}
.report-datas,
.report-datas1,
.nav-style {
  width: 100%;
}
.report-datas {
  float: left; /*一定要设置左侧浮动*/
  white-space: nowrap; /*规定段落中的文本不进行换行*/
  overflow-x: scroll; /*水平方向，超出部分添加滚动机制*/
  overflow-y: hidden; /*竖直方向，超出部分隐藏*/
  padding-top: 7px;
}
.report-datas1 {
  display: flex;
  justify-content: space-evenly;
  li {
    margin-left: 0 !important;
  }
}
.report-datas .report-data ,
.report-datas1 .report-data{
  display:inline-block;
  // float: left;
  margin-right: 2.3%;
  height: 0.75rem;
  line-height: 0.75rem;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  font-size: 0.4rem;
  color: #59585a;
  list-style: none;
  width: 22%;
  text-align: center;
}
.actived {
  color: $baseCol !important;
  border-bottom: 2px solid $baseCol !important;
}
.report-datas {
	&::-webkit-scrollbar-track
	{
			background-color: transparent;
	}
	/*定义滚动条高宽及背景*/
	&::-webkit-scrollbar
	{
			height:0;
			background-color: transparent
	}
	/*定义滚动条*/
	&::-webkit-scrollbar-thumb
	{
			background-color: transparent;
	}
	.mint-tab-item-label {
			position: relative;
			display: inline-block;
	}
	scroll-behavior: smooth;
  }
</style>
