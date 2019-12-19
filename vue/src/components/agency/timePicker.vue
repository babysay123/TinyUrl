<template>
  <div :class="[ pickerClass ]">
    <div
      class="time-block"
      v-for="t in timeConfig"
      :key="t.key"
      :class="{ 'actived': active === t.key }"
      @click="changeTime(t.key)"
    >
      {{ t.val }}
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import TimestampParse from 'Plugins/moment'
export default {
  props: {
    month: {
      type: Boolean,
      default: true
    },
    isThirty: Boolean
  },
  data () {
    return {
      active: ''
    }
  },
  computed: {
    ...mapGetters([ 'agencyParams', 'agencyFunc' ]),
    timeConfig () {
      const baseConfig = [
        { key: 'today', val: '今天' },
        { key: 'yesterday', val: '昨天' }
      ]

      const dynamicConfig = this.month
        ? [
          { key: 'month', val: '本月' },
          { key: 'lastMonth', val: '上月' }
        ]
        : [
          { key: 'week', val: '7天' }
        ]
      const thirtyDays = this.isThirty ? [{ key: 'thirtyDays', val: '30天' }] : []
      return [ ...baseConfig, ...dynamicConfig, ...thirtyDays ]
    },
    pickerClass () {
      return this.month ? 'timePicker-month' : 'timePicker'
    }
  },
  methods: {
    ...mapMutations([ 'setAgencyState' ]),
    ...mapActions([ 'agencyParamsCallback' ]),
    async changeTime (type = 'today') {
      if (type === this.active) return

      this.active = type
      const { begin, end } = TimestampParse(type)
      await this.agencyParamsCallback({ begin, end })
      this.agencyFunc('time')
    }
  },
  created () {
    this.changeTime()
  }
}
</script>

<style lang="scss" scoped>
.timePicker,
.timePicker-month {
  padding: 10px;
  display: flex;
  justify-content: space-between;
}

.time-block {
  height: 30px;
  line-height: 30px;
  border-radius: 5px;
  box-sizing: border-box;
  font-size: .375rem;
  border: 1px solid #bcbcbc;
  color: #59585a;
  text-align: center;
  background: #fff;
  &.actived {
    background: #D81E06;
    border: 1px solid #D81E06;
    color: #fff;
  }
}

.timePicker .time-block {
  width: 23%;
}
.timePicker-month .time-block {
  width: 22%;
}
</style>
