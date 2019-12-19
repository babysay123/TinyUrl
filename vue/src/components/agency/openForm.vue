<template>
  <div class="open-form">
    <p>请先为下级设置返点，<span class="text-red" @click="routerLink({ path: '/rebate_list' })">点击查看返点赔率表</span></p>

    <div
      class="open-form-group"
      v-for="s in lotteryShare"
      :key="s.id"
    >
      <label>{{ s.lotteryClassName | lotteryName }}</label>

      <input
        maxlength="3"
        v-model="input[s.lotteryClassName]"
        @input="ele => inputLimit(ele.target.value, s.lotteryClassName)"
        :placeholder="`自身返点${s.share}，可设置返点${minRebate(s.share)}-${numFixed(s.share, 1)}`"
      >

    </div>
    <div class="redBtn" @click="onValid">生成邀请码</div>
  </div>
</template>

<script>
import { addApi } from 'Plugins/api'
import { mapGetters } from 'vuex'
import NumFixed from 'Plugins/filters'

const { numFixed } = NumFixed
const lotteryDic = new Map([
  [ 'FrequentLottery', '时时彩' ],
  [ 'ElevenPickFive', '11选5' ],
  [ 'PCEggs', '快乐8' ],
  [ 'QuickThree', '快3' ],
  [ 'SixMark', '六合彩' ],
  [ 'Three', '排列3' ],
  [ 'PK10', '北京赛车' ]
])
export default {
  props: {
    role: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      input: {
        FrequentLottery: '',
        ElevenPickFive: '',
        PCEggs: '',
        QuickThree: '',
        SixMark: '',
        Three: '',
        PK10: ''
      },
      numFixed
    }
  },
  computed: {
    ...mapGetters([ 'getUserInfo' ]),
    lotteryShare () {
      return this.getUserInfo.shareCodes
    }
  },
  filters: {
    lotteryName (key) {
      return lotteryDic.get(key)
    }
  },
  methods: {
    inputLimit (val, model) {
      let format = val.replace(/[^.\d]/g, '')
      format = format.replace(/\.{2,}/g, '.')
      format = +format > 9 ? '' : format
      this.input[model] = format
    },
    minRebate (share) {
      const min = share - 2
      return min > 0 ? this.numFixed(min, 1) : this.numFixed(0, 1)
    },
    onValid () {
      const objKeys = Object.keys(this.input)
      // 空值校验
      const isNull = objKeys.filter(e => {
        if (!this.input[e]) {
          return e
        }
      })

      if (isNull.length) {
        this.$toast({
          message: `请设置${lotteryDic.get(isNull[0])}返点`,
          duration: 1800
        })
        return
      }

      // 值范围校验
      const isRange = objKeys.filter(e => {
        const currentNum = +this.input[e]
        const limit = this.lotteryShare.find(l => l.lotteryClassName === e).share
        const min = this.numFixed(limit - 2, 1)
        if (currentNum < 0 || currentNum > limit || +currentNum < +min) {
          return e
        }
      })

      if (isRange.length) {
        this.$toast({
          message: `请输入${lotteryDic.get(isRange[0])}的正确返点范围`,
          duration: 1800
        })
        return
      }

      this.createCode()
    },
    async createCode () {
      const res = await addApi({ ...this.input, role: this.role })
      const { code } = res
      if (code === 0) {
        this.$toast({
          message: '生成邀请码成功~',
          duration: 1800
        })
        this.input = {
          ElevenPickFive: '',
          FrequentLottery: '',
          PCEggs: '',
          PK10: '',
          QuickThree: '',
          SixMark: '',
          Three: ''
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.open-form {
  background: #fff;
  overflow: hidden;
  &>p {
    font-size: .36rem;
    padding: 0 2.5% 4%;
  }
  .open-form-group {
    height: 1.25rem;
    font-size: .37rem;
    background: #fff;
    border-bottom: 1px solid #eaeaea;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 8%;
    input {
      width: 65%;
      text-indent: 8px;
      line-height: .875rem;
      font-size: .35rem;
      border: 1px solid #999;
    }
    label {
      padding-left: 2.5%;
    }
  }
  .redBtn {
    margin: 15px 20px;
  }
}
</style>
