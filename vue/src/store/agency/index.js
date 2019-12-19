export default {
  state: {
    // 请求参数
    agencyParams: {},
    // 请求函数
    agencyFunc: null
  },
  getters: {
    agencyParams: state => state.agencyParams,
    agencyFunc: state => state.agencyFunc
    // currentData: state => state.currentData
  },
  mutations: {
    // 通用修改 state
    setAgencyState (state, params) {
      const objKeys = Object.keys(params)
      if (objKeys.length) {
        objKeys.forEach(e => {
          state[e] = params[e]
        })
      }
    }
  },
  actions: {
    agencyParamsCallback ({ commit, getters }, params) {
      const { agencyParams } = getters
      return new Promise((resolve, reject) => {
        try {
          commit('setAgencyState', {
            agencyParams: {
              ...agencyParams, ...params
            }
          })
          resolve()
        } catch (error) {
          reject(error)
        }
      })
    }
  }
}
