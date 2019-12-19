import Logger from 'Plugins/utils/logger'
import { resultListApiSingle } from 'Plugins/api/result'
export default {
  state: {
    pageIndex: 0, // 当前彩种开奖结果页码
    pageSize: 15, // 当前彩种开奖结果条数
    tabNumber: 0, // tab走势，分位走势，简单说就是应该出现几个tab，（eg:pk有10个）可以不用，通过当前获取到的开奖结果来判断位数
    lotteryVarietyNum: 0, // 当前彩种个数，最大值11
    lotteryVarietyConfig: {}, // 彩种常规配置 折线，遗漏，统计，分层 等
    lotteryId: 0, // 彩种id
    brokenLine: 1, // 折线
    omission: 1, // 遗漏
    statistics: 1, // 统计
    layered: 1, // 分层
    currentQuantile: 0, // 当前分位，0:表示最大分位，如pk10 0：表示冠军走势
    lotteryVarietyData: [] // canvas 配置数据 数组结构，内容包含 期数，及当前开奖结果
  },
  getters: {
    // 当前基本信息
    lotteryVarietyConfig: state => {
      state.lotteryVarietyConfig = {
        brokenLine: state.brokenLine,
        omission: state.omission,
        statistics: state.statistics,
        layered: state.layered
      }
      return state.lotteryVarietyConfig
    },
    // 获取当前基本配置信息
    brokenLine: state => state.brokenLine,
    omission: state => state.omission,
    statistics: state => state.statistics,
    layered: state => state.layered,
    // 当前彩种开奖结果信息
    lotteryVarietyData: state => state.lotteryVarietyData
  },
  mutations: {
    /**
     *
     * @param {*} state
     * @param {Array} data 当前开奖信息数据
     */
    getLotteryVarietyData (state, data) {
      if (!Array.isArray(data)) {
        Logger.error('胸弟，数据集怎么也应该是个数组吧~')
        return false
      } else {
        state.lotteryVarietyData = data
      }
    }
  },
  actions: {
    // 获取数据接口
    async setLotteryVarietyData ({ commit, state }, params) {
      const res = await resultListApiSingle(params)
      if (res.code === -1) {
        Logger.error('请求出错啦~~')
        return false
      } else {
        commit('getLotteryVarietyData', res.data || [])
      }
    }
  }
}
