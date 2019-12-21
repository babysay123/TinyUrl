import { globalConfigAPi, accessTokenApi, lhcConfigApi, accountListConfigApi, heartbeatApi } from 'Plugins/api'
import WebSocketClass from 'Plugins/webSocketClass'
import Utils from 'Plugins/utils'

export default {
  state: {
    config: {
      // 更新备注：新接口将游戏棋牌开关放置到此处，不再调用getGameSwitch.do及getHotGame.do
      chatRoomOpenStatus: 'close', // 聊天室开关
      chessOpenStatus: 'close', // 棋牌室开关
      customerServiceType: '', // 客服类型
      customerServiceUrl: '' // 客服地址
    },
    socket: {
      connect: null,
      open: null,
      close: null,
      message: msg => {
        console.log(msg)
      },
      error: null
    },
    typeConfig: [],
    notice: {
      maintenance: null,
      notify: null,
      common: null,
      warn: null,
      generalize: null
    }
  },
  getters: {
    // 获取系统配置
    system_config: state => state.config,
    type_config: state => state.typeConfig,
    notice: state => state.notice
  },
  mutations: {
    // 设置系统配置
    setSystemConfig (state, config) {
      state.config = config
    },
    // 设置全局socket连接
    setGlobalSocket (state, url) {
      let { connect, message } = state.socket
      connect = new WebSocketClass(url, message, 'wsName')
      connect.connect('立即与服务器通信')
    },
    setTypeConfig (state, config) {
      state.typeConfig = config
    },
    setNoticeTask (state, task) {
      const { key, val } = task
      state.notice[key] = val
    }
  },
  actions: {
    // 请求系统配置
    async getSystemConfig ({ commit }) {
      const res = await globalConfigAPi()
      commit('setSystemConfig', res.data)
      Utils.Storage.save('serviceConfig', res.data)
      // 获取六合彩配置
      if (!Utils.Storage.get('ballSetColorDic') || !Utils.Storage.get('lotteryArr')) {
        const lhc = await lhcConfigApi()
        Utils.Storage.save('ballSetColorDic', lhc.data)
        Utils.Storage.save('lotteryArr', lhc.rows)
      }
    },
    // 是否开启全局socket连接
    async isConnectSocket ({ commit, getters }) {
      // 判断聊天室开启状态
      if (getters.system_config.chatRoomOpenStatus === 'open') {
        const { chatURL } = Utils.Storage.get('')
        const token = await accessTokenApi()
        console.log(chatURL('ws'), token)
        // const url = `${chatURL}${Storage.get('')}`
        // commit('setGlobalSocket', url)
      }
    },
    async getTypeConfig ({ commit }) {
      const res = await accountListConfigApi()
      const { code, data } = res
      if (code === 0) {
        commit('setTypeConfig', data)
      }
    },
    openHeartbeat ({ commit }) {
      const heartFetch = async () => {
        /**
         * @author Cyan
         * @var {Object} maintenance 维护公告 普通公告
         * @var {Object} notify 推广公告
         * @var {Object} common 普通公告
         * @var {Object} warn 其他公告？
         * @var {String} ReadState 公告的已读状态
         * @deprecated 定时刷新心跳包 获取其中公告类型 赋值到弹窗任务对象
         */
        const res = await heartbeatApi()
        const { maintenance, notify, common, warn } = res.affiche

        const readState = Utils.Storage.get('noticeRead') || {}
        const { common: commonRead, notify: notifyRead, warn: warnRead } = readState

        if (maintenance.code === 103 && maintenance.isLoca === 1) {
          commit('setNoticeTask', { key: 'maintenance', val: maintenance })
        }

        /** 关闭维护公告 */
        if (maintenance.code === 102) {
          commit('setNoticeTask', { key: 'maintenance', val: null })
        }

        if (notifyRead !== 'read' && notify.type === 1) {
          commit('setNoticeTask', { key: 'notify', val: notify.isRead === 0 ? notify : null })
        }

        if (commonRead !== 'read') {
          commit('setNoticeTask', { key: 'common', val: common.code === 105 ? common : null })
        }

        if (warn && warnRead !== 'read') {
          commit('setNoticeTask', { key: 'warn', val: warn.code === 107 ? warn : null })
        }
      }

      heartFetch()

      if (!global.heartInterval) {
        global.heartInterval = setInterval(() => {
          heartFetch()
        }, 12000)
      }
    }
  }
}
