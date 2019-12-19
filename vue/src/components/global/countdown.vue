<template>
  <section>{{ hours }}:{{ minutes }}:{{ seconds }}</section>
</template>

<script>
import { lotteryInfoApi } from 'Plugins/api'
export default {
  props: {
    endTime: {
      type: Number,
      required: true
    },
    systemTime: {
      type: Number,
      required: true
    },
    gameId: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      hours: '00',
      minutes: '00',
      seconds: '00',
      count: 0,
      timer: null,
      dealine: this.endTime,
      syetem_time: this.systemTime
    }
  },
  methods: {
    initCountDown (type) {
      // 获取总的剩余秒数
      this.count = Math.ceil((new Date(this.dealine) - new Date(this.syetem_time)) / 1000)
      // 逐秒递减
      if (this.count > 0) {
        this.timer = setInterval(() => {
          if (this.count > 0) {
            this.count--
            this.timeParser()
          } else {
            // 时间归零过后重新请求倒计时
            this.clearTimer()
            this.getNewTimer()
          }
        }, 1000)
      } else {
        const interval = type === 'h' ? 10000 : 600000
        setTimeout(() => {
          this.getNewTimer()
        }, interval)
      }
    },
    timeParser () {
      // 根据剩余秒数解析小时数和分钟数
      const hh = parseInt(this.count / 60 / 60 % 24, 10)
      const mm = parseInt(this.count / 60 % 60, 10)
      const ss = parseInt(this.count % 60, 10)
      this.hours = hh < 10 ? `0${hh}` : hh + ''
      this.minutes = mm < 10 ? `0${mm}` : mm + ''
      this.seconds = ss < 10 ? `0${ss}` : ss + ''
    },
    clearTimer () {
      window.clearInterval(this.timer)
      this.timer = null
    },
    async getNewTimer () {
      const res = await lotteryInfoApi({ lotteryId: this.gameId })
      this.syetem_time = res.system_time
      this.dealine = res.data.deadline
      this.initCountDown(res.data.type)
    }
  },
  created () {
    this.initCountDown()
  },
  beforeDestroy () {
    this.clearTimer()
  }
}
</script>
