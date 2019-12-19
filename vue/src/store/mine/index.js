export default {
  state: {
    setting: false,
    personalInfo: false,
    avatar: false,
    detailsSetting: false
  },
  getters: {
    setting: state => state.setting,
    personalInfo: state => state.personalInfo,
    avatar: state => state.avatar,
    detailsSetting: state => state.detailsSetting
  },
  mutations: {
    popupControl (state, config) {
      /** 通用修改 popup 状态操作 */
      const { key, val } = config
      state[key] = val
    }
  },
  actions: {

  }
}
