/* eslint-disable camelcase */

import { buyMallApi, lotteryInfosApi } from 'Plugins/api'

export default {
  state: {
    // 所有游戏类型
    allGames: {
      data: {},
      system_time: ''
    },
    // 开奖倒计时到后的游戏id暂存
    idStorage: []
  },
  getters: {
    allGames: state => state.allGames,
    idStorage: state => state.idStorage
  },
  mutations: {
    setAllGames (state, games) {
      /**
       * @author Cyan
       * @var {Timestamp} system_time 系统时间
       * @var {Array} data 彩种数据
       * @var {Number} interval 未开奖情况下轮询间隔
       * @description 保存最新的系统时间和彩种数据 并且如果正好有未开奖的彩种则根据其频率类型 再度查询
       */
      const { system_time, data } = games
      state.allGames.system_time = system_time
      // 将游戏数据以 游戏名+id 的键值对赋值到 state 确保其唯一性以方便countdown组件获取
      data.forEach(e => {
        state.allGames.data[e.name + e.lotteryId] = e
        const { deadline } = e
        if (e.lastLuckyNumbers === '正在开奖' || deadline - system_time < 0) {
          const interval = e.type === 'h' ? 10000 : 600000

          if (global.openWaitTimeout) {
            clearTimeout(global.openWaitTimeout)
            global.openWaitTimeout = null
          }

          global.openWaitTimeout = setTimeout(() => {
            this.commit('addIdStorage', e.lotteryId)
          }, interval)
        }
      })
    },
    addIdStorage (state, id) {
      /**
       * @author Cyan
       * @description 彩种倒计时结束后的请求暂存 三秒内没有新的彩种到期 则并发请求所有缓存的彩种数据
       */

      if (+id > 10000) return

      !state.idStorage.includes(id) && state.idStorage.push(id)

      if (global.gameInfoInterval) {
        clearTimeout(global.gameInfoInterval)
        global.gameInfoInterval = null
      }

      global.gameInfoInterval = setTimeout(() => {
        this.dispatch('refreshGameInfos')
      }, 2000)
    },
    // 清空彩种暂存
    clearIdStorage: state => { state.idStorage = [] }
  },
  actions: {
    async initGameInfo ({ commit }) {
      // 获取购彩大厅所有数据
      const res = await buyMallApi()
      commit('setAllGames', res)
    },
    async refreshGameInfos ({ getters, commit }) {
      // 从暂存区里取出需要请求的彩种ID 刷新数据
      const { idStorage } = getters
      if (!idStorage.join(',')) {
        return
      }
      const res = await lotteryInfosApi({ lotteryIds: idStorage.join(',') })
      commit('clearIdStorage')
      commit('setAllGames', res)
    }
  }
}
