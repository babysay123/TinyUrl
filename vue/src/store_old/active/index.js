import { promotionsApi } from 'Plugins/api'

export default {
  state: {
    active: {
      amounts: [],
      everyDayColumns: [],
      tableData: [],
      award: [],
      minAmount: '100+',
      userVipLevel: [],
      awardRecord: []
    }
  },
  getters: {
    active: state => state.active
  },
  mutations: {
    setActive (state, active) {
      state.active = active
    }
  },
  actions: {
    async getActiveData ({ commit }) {
      const res = await promotionsApi()
      const { data } = res

      /** 奖励金额 */
      const amounts = data.amouts.split(',')

      /** 字符串分割解析 返回对应的对象格式 */
      const payload = amounts.map((e, i) => {
        return { title: `${e}+`, key: `percent${i}` }
      })

      /** 说明文本最低金额修改 */
      const minAmount = payload[0].title
      const baseConfig = [
        { title: '投注/投注额', key: 'level' }
      ]

      /** 每日嘉奖 columns 配置 */
      const everyDayColumns = [...baseConfig, ...payload]

      // 跳级等级
      const { jumpLevel } = data

      /** 表格数据进行格式化 */
      const tableData = data.userVipLevel.map((e, i, a) => {
        let percent = {}
        const { level, awardPencent } = e

        let jumpBouns = 0
        for (var index = 0; index < (i + 1); index++) {
          jumpBouns += a[index].riseAward
        }
        // 第二级
        if (i === 1) { jumpBouns = a[1].riseAward }
        jumpBouns = Math.ceil(jumpBouns * jumpLevel)

        // if (i > 1) {
        //   for (let index = 0; index < i; index++) {
        //     jumpBouns += a[index].riseAward
        //   }
        // }

        awardPencent.split(',').forEach((p, i) => {
          percent[`percent${i}`] = `${p}%`
        })

        return { ...e, level: `VIP${level}`, ...percent, jumpBouns }
      })

      commit('setActive', { minAmount, everyDayColumns, tableData, amounts, ...data })
    }
  }
}
