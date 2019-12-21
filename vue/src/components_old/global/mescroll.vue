<template>
  <div>
    <!--mescroll滚动区域的基本结构-->
    <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
      <!--内容...-->
      <!-- 把当前子插槽数据传给容器 -->
      <slot name="btnList"></slot>
      <slot name="search"></slot>
      <slot name="table" v-bind:dataList="dataList"></slot>
      <!-- <slot name="popup" v-bind:dataList="dataList"></slot> -->
    </mescroll-vue>
  </div>
</template>
<script>
import MescrollVue from 'mescroll.js/mescroll.vue'
import { Toast } from 'mint-ui'
// import * as api from 'Plugins/api'
export default {
  name: 'xxx',
  components: {
    MescrollVue // 注册mescroll组件
  },
  props: {
    api: {
      type: Function
    },
    param: {
      type: Object
    },
    dataStructure: {
      type: Object
      // default: {
      //   offset: 'offset',
      //   count: 'count',
      //   dataType: 'data'
      // }
    }
  },
  data () {
    return {
      mescroll: null, // mescroll实例对象
      mescrollDown: {}, // 下拉刷新的配置. (如果下拉刷新和上拉加载处理的逻辑是一样的,则mescrollDown可不用写了)
      mescrollUp: {
        // 上拉加载的配置.
        callback: this.upCallback, // 上拉回调,此处简写; 相当于 callback: function(page, mescroll) { }
        // 以下是一些常用的配置,当然不写也可以的.
        page: {
          num: 0, // 当前页 默认0,回调之前会加1; 即callback(page)会从1开始
          size: 15 // 每页数据条数,默认10
        },
        htmlNodata: '<p class="upwarp-nodata">-- END --</p>',
        noMoreSize: 5, // 如果列表已无数据,可设置列表的总数量要大于5才显示无更多数据;
        // 避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
        // 这就是为什么无更多数据有时候不显示的原因
        toTop: {
          // 回到顶部按钮
          src: '/mobile/images/new/app/mescroll-totop.png', // 图片路径,默认null,支持网络图
          offset: 1000 // 列表滚动1000px才显示回到顶部按钮
        }
        // empty: {
        //   // 列表第一页无任何数据时,显示的空提示布局; 需配置warpId才显示
        //   warpId: 'xxid', // 父布局的id (1.3.5版本支持传入dom元素)
        //   icon: './static/mescroll/mescroll-empty.png', // 图标,默认null,支持网络图
        //   tip: '暂无相关数据~' // 提示
        // }
      },
      dataList: [] // 列表数据,
    }
  },
  computed: {},
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$refs.mescroll && vm.$refs.mescroll.beforeRouteEnter()
    })
  },
  beforeRouteLeave (to, from, next) {
    this.$refs.mescroll && this.$refs.mescroll.beforeRouteLeave()
    next()
  },
  methods: {
    mescrollInit (mescroll) {
      this.mescroll = mescroll
    },
    upCallback (page, mescroll) {
      try {
        let more = this.setPageConfig(page)
        let param = Object.assign(more, this.param)
        // console.log(param)
        this.getDataType(param).then(res => {
          let { data, code, msg } = res
          // 返回已经拿到的数据列,用于父元素数据处理
          this.$emit('goBack', data)
          if (code !== 0) {
            console.log(msg)
            Toast(msg)
            this.dataList = []
            mescroll.endSuccess(this.dataList, false)
            return
          }
          if (page.num === 1) this.dataList = []
          this.dataList = [...this.dataList, ...data]
          // 数据渲染成功后,隐藏下拉刷新的状态
          this.$nextTick(() => {
            mescroll.endSuccess(data.length)
          })
          // 判断页数
          this.isNextPage(data, mescroll)
        })
      } catch (error) {
        console.log(error)
      }
    },
    getParmaData () {
      // 重置加载
      this.$nextTick(() => {
        this.mescroll.resetUpScroll()
      })
    },
    setPageConfig (page) {
      let { offset, countType, count } = this.dataStructure
      if (offset === 'offset' && countType === 'count') {
        let more = {
          offset: (page.num - 1) * count,
          count: count
        }
        return more
      }
      if (offset === 'pageNumber' && countType === 'pageSize') {
        let more = {
          pageNumber: page.num + 1,
          pageSize: count
        }
        return more
      }
    },
    async getDataType (param) {
      let { dataType } = this.dataStructure
      let datas
      if (dataType === 'rows') {
        let { rows, code, msg } = await this.api(param)
        datas = { data: rows, code, msg }
      }
      if (dataType === 'data') {
        let { data, code, msg } = await this.api(param)
        datas = { data: data, code, msg }
      }
      if (dataType === 'dataList') {
        let { data, code, msg } = await this.api(param)
        datas = { data: data && data.list, code, msg }
      }
      return datas
    },
    isNextPage (data, mescroll) {
      // 如果是最后一页 就提示 htmlNodata
      let { count } = this.dataStructure
      if (data.length < count) {
        mescroll.endSuccess(data, false)
      } else {
        mescroll.endSuccess(data, true)
      }
    }
  }
}
</script>

<style scoped>
/*通过fixed固定mescroll的高度*/
.mescroll {
  position: fixed;
  top: 0;
  bottom: 0;
  height: auto;
}
</style>
