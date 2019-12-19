import Vue from 'vue'

const { axios } = Vue

export default {
  state: {
    // 投注列表
    bettingList: [],
    filterList: [],
    // 今日比赛
    todayList: [],
    // 开奖结果
    resultList: [],
    // 所有赛事
    matches: [],
    // 赛事筛选
    matchFilter: [],
    // 投注模式
    bettingModel: '混投',
    // 投注弹窗
    playPopup: {
      show: false
    },
    selectMatches: [],
    // 投注参数
    lotteryParams: {}
  },
  getters: {
    betting_list: state => {
      /*
        * @author Cyan
        * @param {Object} b, d 投注数据的两层循环体
        * @description 数据结构解析，将所有赔率解析为数组，并且计算让球的颜色
      */
      if (state.bettingList.length > 0) {
        return state.bettingList.map(b => {
          b.data.map(d => {
            d.oddSpf = typeof d.oddSpf !== 'object' ? d.oddSpf.split(',') : d.oddSpf
            d.oddSpfR = typeof d.oddSpfR !== 'object' ? d.oddSpfR.split(',') : d.oddSpfR
            d.oddGoal = typeof d.oddGoal !== 'object' ? d.oddGoal.split(',') : d.oddGoal
            d.oddRateF = typeof d.oddRateF !== 'object' ? d.oddRateF.split(',') : d.oddRateF
            d.oddRateP = typeof d.oddRateP !== 'object' ? d.oddRateP.split(',') : d.oddRateP
            d.oddRateS = typeof d.oddRateS !== 'object' ? d.oddRateS.split(',') : d.oddRateS
            d.oddSpfHf = typeof d.oddSpfHf !== 'object' ? d.oddSpfHf.split(',') : d.oddSpfHf
            d.rangBgColor = d.oddRang > 0 ? 'bg-col' : 'bg-green'
            d.rangTxtColor = d.oddRang > 0 ? 'text-col' : 'text-green'
            return d
          })
          return b
        })
      }
      return state.bettingList
    },
    filter_list: state => state.filterList,
    today_list: state => state.todayList,
    result_list: state => state.resultList,
    matches: state => state.matches,
    match_filter: state => state.matchFilter,
    betting_model: state => state.bettingModel,
    play_popup: state => state.playPopup,
    select_matches: state => state.selectMatches,
    lottery_params: state => state.lotteryParams
  },
  mutations: {
    setStateData (state, data) {
      const { key, val } = data
      state[key] = val
    },
    setLotteryParams (state, { type, key, data }) {
      switch (type) {
        case 'change':
          state.lotteryParams[key] = data
          break
        case 'delete':
          delete state.lotteryParams[key]
          break
        default:
          state.lotteryParams = []
          break
      }
    }
  },
  actions: {
    async getFootballData ({ commit }, config) {
      const { api, key } = config
      const resArr = await axios.getAll(api)
      key.forEach((e, i) => {
        commit('setStateData', { key: e, val: resArr[i].data })
      })
    },
    matchFilterComputed ({ commit, getters }, match) {
      // eslint-disable-next-line camelcase
      const { match_filter } = getters
      match_filter.includes(match) ? match_filter.splice(match_filter.indexOf(match), 1) : match_filter.push(match)
      commit('setStateData', { key: 'matchFilter', val: match_filter })
    },
    changeLotteryParams ({ commit, getters }, { key, play, title, prize }) {
      // eslint-disable-next-line camelcase
      const { lottery_params } = getters
      if (lottery_params[key]) {
        const playObj = lottery_params[key][play]
        if (playObj) {
          const titleArr = playObj.map(e => e.title)
          if (titleArr.includes(title)) {
            const titleIndex = titleArr.indexOf(title)
            playObj.splice(titleIndex, 1)
          } else {
            playObj.push({ title, prize })
          }
          return commit('setLotteryParams', { type: 'change', key, data: playObj })
        }
      }
      commit('setLotteryParams', { type: 'change', key, data: { [play]: [ { title, prize } ] } })
    }
  }
}
