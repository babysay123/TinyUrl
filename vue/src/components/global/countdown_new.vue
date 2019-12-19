<template>
  <section>
    <div v-if="!loading">{{ hours }}:{{ minutes }}:{{ seconds }}</div>
    <div v-else>加载中...</div>
  </section>
</template>

<script>
/* eslint-disable camelcase */
import { mapGetters, mapMutations } from 'vuex'
export default {
  props: {
    gameId: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      loading: true,
      hours: '00',
      minutes: '00',
      seconds: '00',
      count: 0,
      timer: null
    }
  },
  computed: {
    ...mapGetters([ 'allGames' ])
  },
  watch: {
    'allGames': {
      handler: function (e) {
        this.clearTimer()
        this.initCountDown()
      },
      deep: true
    }
  },
  methods: {
    ...mapMutations([ 'addIdStorage' ]),
    initCountDown (type) {
      /**
       * @author Cyan
       * @var {Timestamp} system_time 系统时间
       * @var {Timestamp} deadline 当前彩种的开奖时间
       * @var {Number} count 计算当前彩种倒计时的秒数
       * @description 逐秒渲染彩种倒计时开奖剩余时间
       */
      const { system_time } = this.allGames
      const { deadline } = this.allGames.data[this.name + this.gameId]
      if (deadline - system_time > 0) {
        this.count = Math.ceil((new Date(deadline) - new Date(system_time)) / 1000)
        this.timer = setInterval(() => {
          if (this.count > 0) {
            this.count--
            this.timeParser()
          } else {
            // 倒计时结束后 显示加载中文本 清除当前定时器并向彩种暂存区push当前彩种id
            this.loading = true
            this.clearTimer()
            this.addIdStorage(this.gameId)
          }
        }, 1000)
      } else {
        this.loading = true
        const { type } = this.allGames.data[this.name + this.gameId]
        const interval = type === 'h' ? 10000 : 600000
        setTimeout(() => {
          this.addIdStorage(this.gameId)
        }, interval)
      }
    },
    timeParser () {
      this.loading = false
      // 根据剩余秒数解析小时数和分钟数
      const hh = Math.floor(this.count / 60 / 60)
      const mm = Math.floor(this.count / 60 % 60)
      const ss = Math.floor(this.count % 60)
      this.hours = hh < 10 ? `0${hh}` : hh + ''
      this.minutes = mm < 10 ? `0${mm}` : mm + ''
      this.seconds = ss < 10 ? `0${ss}` : ss + ''
    },
    clearTimer () {
      window.clearInterval(this.timer)
      this.timer = null
    }
  },
  created () {
    this.initCountDown()
  },
  beforeDestroy () {
    clearTimeout(global.gameInfoInterval)
    global.gameInfoInterval = null

    clearTimeout(global.openWaitTimeout)
    global.openWaitTimeout = null
    this.clearTimer()
  }
}
</script>
