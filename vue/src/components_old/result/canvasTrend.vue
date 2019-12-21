<template>
  <div class='canvasTrend'>
    <!-- 左边期数显示 -->
    <div class="periods-info">
      <table>
        <tr>
          <th>期数</th>
        </tr>
        <tr v-for='(tmp,index) in periods' :key='index'>
          <td>{{tmp | hidstr}}</td>
        </tr>
        <tr  v-show="show === 'true'">
          <td>出现次数</td>
        </tr>
        <tr  v-show="show === 'true'">
          <td>平均遗漏</td>
        </tr>
        <tr  v-show="show === 'true'">
          <td>最大遗漏</td>
        </tr>
        <tr  v-show="show === 'true'">
          <td>最大连出</td>
        </tr>
      </table>
    </div>
    <!-- 右边canvers -->
    <div class="p1">
       <canvas id="c1"></canvas>
    </div>
  </div>
</template>
<script>
// import Logger from '@/plugins/utils/logger'
import { mapGetters } from 'vuex'
export default {
  name: 'canvasTrend',
  data () {
    return {
      cols: [], // canvars的列数
      periods: [], // 要展示的期数信息第多少期
      show: 'true',
      win: [] // 存 后台拿来的中奖数字
    }
  },
  props: [
    // 所有的彩种信息
    'data',
    'nums', // 彩票可能出现的数字
    'trendTab',
    'hierarchy',
    'count'
  ],
  watch: {
    'data': {
      handler: function (e) {
        console.log(this.data)
        // this.data = e.slice(0, this.count + 1)
        this.getCols(this.data2, this.nums)
        this.draw(this.win, this.nums, this.trendTab, this.periods, this.cols, this.hierarchy)
      },
      // immediate: true,
      deep: true
    },
    'nums': {
      handler: function () {
        console.log('num', this.nums)
        this.getCols(this.data2, this.nums)
        this.draw(this.win, this.nums, this.trendTab, this.periods, this.cols, this.hierarchy)
      },
      deep: true
    },
    'trendTab': {
      handler: function () {
        // console.log('index2', this.trendTab)
        // this.getCols(this.data, this.nums)
        this.draw(this.win, this.nums, this.trendTab, this.periods, this.cols, this.hierarchy)
      },
      deep: true
    },
    'hierarchy': {
      handler: function () {
        console.log('index2', this.hierarchy)
        // this.getCols(this.data, this.nums)
        // this.getCols(this.data, this.nums)
        // this.show = this.hierarchy
        // console.log('show', this.show)
        this.show = this.hierarchy.statistics
        // console.log(this.show)
        this.draw(this.win, this.nums, this.trendTab, this.periods, this.cols, this.hierarchy)
      },
      // immediate: true,
      deep: true
    }
  },
  filters: {
    hidstr: function (val) {
      // console.log(val)
      if (val.length > 8) {
        val = '...' + val.slice(-7)
      }
      return val
    }
  },
  methods: {
    // 绘制canvars 中奖数字  起始和结尾数字 tabindex 期数  列数   控制显示参数
    draw (win, nums, trendTab, periods, cols, hierarchy) {
      console.log(this.data, this.nums, this.trendTab, periods, cols, this.hierarchy)
      let canvas = document.querySelector('#c1')
      let ctx = canvas.getContext('2d')
      let rectH = 24
      let rows = periods.length // 彩票一次加载行数
      // 获取中奖数  这个从后台取  默认我这里先取index=0试试
      trendTab = trendTab - 1
      let gwin = win[trendTab]
      canvas.width = window.screen.availWidth - 0.2 * window.screen.availWidth
      canvas.height = (rows + 5) * rectH
      // canvas.style.border = '1px solid ebeae5'
      // 定义每个小格的宽
      let rectW = canvas.width / cols
      // 绘制横向矩形
      for (let i = 0; i < rows + 5; i++) {
        // ctx.moveTo(0, i * rectH)
        // ctx.lineTo(canvas.width, i * rectH)
        // 绘制横向的白色背景
        ctx.fillStyle = '#fff'
        ctx.fillRect(0, (2 * i + 1) * rectH, canvas.width, rectH)
        ctx.fillStyle = '#dbd2ca'
        ctx.fillRect(0, 0, canvas.width, rectH)
      }
      // 绘制竖线
      // for (let j = 0; j < canvas.width / rectW; j++) {
      //   ctx.moveTo(j * rectW, 0)
      //   ctx.lineTo(j * rectW, canvas.height)
      // }
      // let a = ctx.lineWidth = 0.5
      // ctx.strokeStyle = '#555'
      // ctx.stroke()
      // 绘制最后四行的颜色
      ctx.fillStyle = '#f7edeb'
      ctx.fillRect(0, (rows + 1) * rectH, canvas.width, rectH)
      ctx.fillStyle = '#fffdd2'
      ctx.fillRect(0, (rows + 2) * rectH, canvas.width, rectH)
      ctx.fillStyle = '#e0f9fd'
      ctx.fillRect(0, (rows + 3) * rectH, canvas.width, rectH)
      ctx.fillStyle = '#eaf8e5'
      ctx.fillRect(0, (rows + 4) * rectH, canvas.width, rectH)
      // 绘制出现次数 最大遗漏 最大联除 平均遗漏
      let count = [] // 出现次数
      let maxw = [] // 最大遗漏
      let maxl = [] // 最大连出
      let index = -1 // 保存上面三个数字的index
      // 彩票可能出现的数字 这里先试试1-10
      for (let k = nums.start; k <= nums.end; k++) {
        index++
        let a = 0
        let b = [] // 找到k元素出现的所有位置
        let m = 0 // b的 index
        let s = [] // 存相邻差值
        let j = [] // 存相同元素在一起的个数
        gwin.forEach((e) => {
          if (Number(e) === k) { a++ }count[index] = a
        })
        for (let i = 0; i < gwin.length; i++) {
          if (Number(gwin[i]) === k) {
            b[m] = i
            m++
          }
        }
        //  console.log(b)
        if (b) { // 计算差值
          for (let i = 0; i < b.length; i++) {
            if (i === 0) { s[i] = b[i] } else { s[i] = b[i] - b[i - 1] - 1 }
            if (i === b.length - 1) { s[i + 1] = rows - 1 - b[i] }
          }

          let p = 1 // 计算相同元素位置是否相邻
          for (let i = 1; i < b.length; i++) {
            if ((b[i] - b[i - 1]) === 1) { p++ } else { p = 1 }
            j.push(p)
          }
        }
        maxw[index] = Math.max(...s)
        maxl[index] = Math.max(...j)
        // 绘制向上的矩形竖条
        if (hierarchy.layered === 'true') {
          ctx.fillStyle = '#def7f6'
          if (b.length > 0) {
            ctx.fillRect(index * rectW, b[b.length - 1] * rectH + 2 * rectH, rectW, canvas.height - 6 * rectH - b[b.length - 1] * rectH)
          } else {
            ctx.fillRect(index * rectW, rectH, rectW, canvas.height - 5 * rectH)
          }
        }
        // console.log(b)
        // 绘制最后四行文本
        ctx.beginPath()
        ctx.fillStyle = '#000 '
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(count[index], (index + 1) * rectW - rectW / 2, (rows + 2) * rectH - rectH / 2) // 出现次数
        if (count[index] !== 0) {
          ctx.fillText(Math.round((rows - count[index]) / count[index]), (index + 1) * rectW - rectW / 2, (rows + 3) * rectH - rectH / 2) // 平均遗漏
          ctx.fillText(maxw[index], (index + 1) * rectW - rectW / 2, (rows + 4) * rectH - rectH / 2) // 最大遗漏
          if (b.length === 1) {
            ctx.fillText(1, (index + 1) * rectW - rectW / 2, (rows + 5) * rectH - rectH / 2) // 最大连出
          } else {
            ctx.fillText(maxl[index], (index + 1) * rectW - rectW / 2, (rows + 5) * rectH - rectH / 2) // 最大连出
          }
        } else {
          ctx.fillText(rows, (index + 1) * rectW - rectW / 2, (rows + 3) * rectH - rectH / 2) // 平均遗漏
          ctx.fillText(rows, (index + 1) * rectW - rectW / 2, (rows + 4) * rectH - rectH / 2) // 最大遗漏
          ctx.fillText(0, (index + 1) * rectW - rectW / 2, (rows + 5) * rectH - rectH / 2) // 最大连出
        }
      }
      // 绘制背景数字  这里和上面一样 彩票可能出现的数字  试试1-10（后来才发现 背景数字是遗漏 我晕死）
      let figure = 0 // 保证起始值为0的时候不出现偏移
      for (let k = nums.start; k <= nums.end; k++) {
        figure++
        // for (let i = 1; i <= canvas.height / rectH - 5; i++) {
        //   // ctx.textAlign = 'center'
        //   // ctx.textBaseline = 'middle'
        //   // ctx.fillStyle = '#000'
        //   // ctx.fillText(k, figure * rectW - rectW / 2, (i + 1) * rectH - rectH / 2)
        // }
        ctx.font = '13px  600 serif'
        ctx.fillText(k, figure * rectW - rectW / 2, rectH - rectH / 2) // 绘制的首行数字
      }
      // 绘制背景遗漏
      if (hierarchy.omission === 'true') {
        let b = [] // 存每个数字出现的index情况
        let m = 0 // b的 index
        for (let k = nums.start; k <= nums.end; k++) {
          b[m] = []
          for (let i = 0; i < gwin.length; i++) {
            if (Number(gwin[i]) === k) {
              b[m].push(i)
            }
          }
          m++
        // console.log(b)
        }
        for (let j = 0; j < cols; j++) {
          let bg = 0
          let f = -1
          for (let k = 0; k < rows; k++) {
            bg++
            f++
            if (b[j].length > 0 && b[j].includes(f)) { bg = 0 }

            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.fillStyle = '#000'
            ctx.fillText(bg, (j + 1) * rectW - rectW / 2, (k + 2) * rectH - rectH / 2)
          }
        }
      }
      // 绘制竖线
      for (let j = 0; j < canvas.width / rectW; j++) {
        ctx.moveTo(j * rectW, 0)
        ctx.lineTo(j * rectW, canvas.height)
      }
      ctx.lineWidth = 0.5
      ctx.strokeStyle = '#ccc'
      ctx.stroke()
      // 绘制折线
      // console.log(show.brokenLine)
      if (hierarchy.brokenLine === 'true') {
        for (let k = 0; k < gwin.length - 1; k++) {
          let q = 0
          if (nums.start === 0) { q = rectW }
          ctx.beginPath()
          ctx.moveTo(gwin[k] * rectW - rectW / 2 + q, ((k + 2) * rectH - rectH / 2))
          ctx.lineTo(gwin[k + 1] * rectW - rectW / 2 + q, ((k + 3) * rectH - rectH / 2))
          ctx.strokeStyle = '#f00c06'
          ctx.lineWidth = 1
          ctx.stroke()
        }
      }
      // 绘制红色的圆白色数字
      for (let k = 0; k <= gwin.length - 1; k++) {
        // 绘制红色的圆遮住之前的黑色数字
        // 防止起始值位0出现的偏移
        let q = 0
        if (nums.start === 0) { q = rectW }
        ctx.beginPath()
        ctx.moveTo(gwin[k] * rectW - rectW / 2 - 10 + q, 0)
        ctx.fillStyle = '#f00c06'
        ctx.arc(gwin[k] * rectW - rectW / 2 + q, ((k + 2) * rectH - rectH / 2), 10, 0, Math.PI * 2)
        ctx.textAlign = 'center'
        ctx.fill()
        // 绘制白色的字
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.font = '14px serif'
        ctx.fillStyle = '#fff'
        ctx.fillText(gwin[k], gwin[k] * rectW - rectW / 2 + q, (k + 2) * rectH - rectH / 2)
      }
      // 不要统计的时候清掉最后四行
      if (hierarchy.statistics === 'false') {
        ctx.clearRect(0, (rows + 1) * rectH, canvas.width, 4 * rectH)
      }
    },
    getCols (data, nums) {
      console.log(data, nums)
      // console.log(this.data)
      // 计算canvas有多少列
      this.cols = nums.end - nums.start + 1
      this.periods = data.map((e) => {
        return e.issue
      })
      for (let i = 0; i < data[0].number.split(',').length; i++) {
        this.win[i] = data.map((e) => {
          return e.number.split(',')[i]
        })
      }
      // console.log('win', this.win)
    }
  },
  computed: {
    // 在这里面获取到config设置的值
    ...mapGetters(['lotteryVarietyConfig']),
    data2 () {
      return this.data.slice(0, this.count)
    }
  },
  mounted () {
    // Logger.log('走势图表')
    // draw (win, nums, trendTab, periods, cols)
    this.draw(this.win, this.nums, this.trendTab, this.periods, this.cols, this.hierarchy)
  },
  created () {
    this.getCols(this.data2, this.nums)
    // console.log(this.data2)
  }
}
</script>
<style lang="scss" scoped>
// 走势图表样式
.canvasTrend{
  width: 100%;
  display: flex;
  justify-content: center;
  .periods-info{
    width: 20%;
    table{
      table-layout: fixed;
      width: 100%;
    }
    tr {
    //  border:1px solid #ebeae5;
     height: 22px;
     td {
       width: 100%;
       text-align: center
     }
     &:nth-child(2n){
       background: #edecea;
     }
     &:nth-child(2n+1){
       background: #e8e4dA
     }
    }
  }
  .p1{
    width: 80%;
    transform: scale(0.5,1);
  }
  #c1{
     width: 100%;
    transform: scale(2,1);
    border-top: 1px solid  #dbd2ca

  }
  // background: #fff;
}
</style>
