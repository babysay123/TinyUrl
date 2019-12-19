import {
  getAmountAvailable,
  getAmountAvailableSingle,
  getAmountConverLog,
  getBettingLog
} from 'Plugins/api'
import Vue from 'vue'
export default {
  state: {
    amountCell: [],
    platforms: [],
    amountConverLogs: [],
    amountConverLogLoaded: false,
    bettingLogs: [],
    bettingLogLoaded: false,
    signErrorData: false,
    dataError: false,
    errorMsg: ''
  },
  getters: {
    platforms: state => state.platforms,
    resultStatus: state => state.resultStatus,
    errorMsg: state => state.errorMsg
  },
  mutations: {
    setPlatforms (state, platforms) {
      state.platforms = platforms
    },
    setAmountCell (state, amount) {
      state.amountCell = amount
      let platformsArr = []
      amount.forEach((item, index) => {
        platformsArr.push({
          title: `${item.platformName}  ${item.canUsingMoney}`,
          platformName: item.platformName,
          platformCode: item.platformCode,
          canUsingMoney: item.canUsingMoney,
          index: index
        })
      })
      state.platforms = [{
        flex: 1,
        values: platformsArr,
        className: 'slot'
      }]
    },
    updateAmountCellSingle (state, result) {
      // 更新当前平台
      state.amountCell.splice(result.index, 1, result.data)
      const shouldRefreshPlatform = state.platforms[0].values[result.index]
      shouldRefreshPlatform.canUsingMoney = result.data.canUsingMoney
      shouldRefreshPlatform.title = `${result.data.platformName}  ${result.data.canUsingMoney}`
      Vue.set(state.platforms[0].values, result.index, shouldRefreshPlatform)
    },
    getAmountConverLogs (state, logs) {
      if (logs && logs.length === 0) {
        state.amountConverLogLoaded = true
        return
      }
      state.amountConverLogs.push(...logs)
    },
    getBettingLogs (state, logs) {
      if (logs && logs.length === 0) {
        state.bettingLogLoaded = true
        return
      }
      state.bettingLogs.push(...logs)
    },
    updateAmountCell (state, data) {
      data.map(item => {
        state.amountCell.splice(item.index, 1, item)
      })
    },
    updateDataStatus (state, status) {
      state.signErrorData = status
    },
    updateDataError (state, status) {
      state.dataError = status
    }
  },
  actions: {
    getAmountAvailableData ({
      commit
    }) {
      commit('setPlatforms')
    },
    async getAmountCellData ({
      commit,
      state
    }) {
      const res = await getAmountAvailable()
      if (res.code === -1) {
        commit('updateDataError', true)
        state.errorMsg = res.msg
        return
      }
      if (res.code === 300) {
        commit('updateDataStatus', true)
        return
      }
      if (res.code === 0 && res.data != null) {
        commit('setAmountCell', res.data)
      }
    },
    async getAmountCellSingle ({
      commit,
      state
    }, param) {
      const res = await getAmountAvailableSingle({
        'platformCode': param.code
      })
      if (res.code === 300) {
        commit('updateDataStatus', true)
        return
      }
      res.index = param.index
      commit('updateAmountCellSingle', res)
    },
    async getAmountConverLogs ({ commit, state }, params) {
      // 通过传递的参数来判断是否是刷新操作，刷新需要将logs置空
      if (params.pageIndex === 0) {
        state.amountConverLogs = []
        state.amountConverLogLoaded = false
      }
      let res = await getAmountConverLog(params)
      if (res.code === -1) {
        commit('updateDataError', true)
        state.errorMsg = res.msg
        return
      }
      if (res.code === 300) {
        commit('updateDataStatus', true)
        return
      }
      if (res.code === 0 && res.data != null) {
        commit('getAmountConverLogs', res.data.list || [])
      }
    },
    async getBettingLogs ({ commit, state }, params) {
      if (params.offset === 0) {
        state.bettingLogs = []
        state.bettingLogLoaded = false
      }
      const res = await getBettingLog(params)
      if (res.code === -1) {
        commit('updateDataError', true)
        state.errorMsg = res.msg
        return
      }
      if (res.code === 300) {
        commit('updateDataStatus', true)
        return
      }
      if (res.code === 0 && res.data != null) {
        commit('getBettingLogs', res.data || [])
      }
    }
  }
}
