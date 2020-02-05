import { Message } from 'element-ui'
import router from '../../router/index'

// vuex fns
const InvalidStatus = (res) => {
  // 登录失效，重新登录
  let height = window.innerHeight - 90
  // 提示
  Message({
    type: 'warning',
    // message: res.data,
    message: '需要重新登录哦~',
    offset: height
  })
  // 跳转
  if (!location.hash.includes('login')) {
    setTimeout(() => {
      router.replace('/login')
    }, 1200)
  }
}

const initSuccess = () => {
  return false
}

class WsOnMessage {
  constructor (evt, commit) {
    this.state = {
      type: 'WsOnMessage',
      evtData: JSON.parse(evt.data)
    }
    // console.log(evt, commit)
    this.init(commit)
  }
  init (commit) {
    // console.log('ws on message')
    const { evtData } = this.state
    const { event } = evtData
    // 初始化成功
    if (event === 'INIT_SUCCESS') {
      commit('setInit', evtData)
      initSuccess()
    }
    // 无效访问令牌，请重新登录
    if (event === 'INVALID_ACCESS_TOKEN') {
      commit('setInit', evtData)
      InvalidStatus(evtData)
    }
    // 在其他地方新开了一条socket，本socket即将关闭
    if (event === 'RESET_SOCKET') {
      // 需要重新链接socket
      // 重连
      commit('resetWs', evtData)
    }
    // 聊天事件
    if (event === 'CHAT') {
      console.log('chat event', evtData)
      commit('setLogs', evtData)
    }
    // 红包事件
    if (event === 'RED_PACKETE') {
      console.log('red packete event', evtData)
      commit('setLogs', evtData)
    }
  }
}

export default WsOnMessage
