/* */
'use strict'

// import Vue from 'vue'
import axios from 'axios'
import Utils from 'Plugins/utils'
// import { Indicator, Toast } from 'mint-ui'
// import router from '../../router'
// import store from '../../store/index.js'
// import showToast from '../toast/mytoast'

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 0: success 成功
// 101: success 特殊情况下的成功
// 100~200: unknow 未知错误(系统直接返回msg信息)
// 300~400: relogin 登录失效
// 500: system error 服务器错误

// const devProxy = []
// 区分环境
// let devEnv = require('./config/dev.env') // 开发环境
// let uatEnv = require('./config/uat.env') // 测试环境
// let proEnv = require('./config/pro.env') // 生产环境
// const env = process.env.NODE_ENV

let config = {
  headers: {
    'sessionid': null,
    // 'X-Requested-With': Utils.XRequestedWith || 'XMLHttpRequest',
    // 'Content-Type': 'application/json; charset=utf-8',
    'client-version': Utils.version
  },
  config: null,
  timeout: 60 * 1000 // Timeout
  // withCredentials: true // Check cross-site Access-Control
}
let OnceStatus = ''

// switch (process.env.NODE_ENV) {
//   case 'development':
//     config.baseURL = devEnv.hosturl
//     break
//   // case 'production':
//   //   config.baseURL = proEnv.hosturl
//   //   break
// }

// console.log(devEnv)
// 请求模式切换
const envModeSwitch = ($config) => {
  if (process.env.NODE_ENV === 'development') {
    // console.log($config.url.indexOf('api') === -1 && $config.url.indexOf('cpi') === -1)
    if ($config.url.indexOf('/api/') === -1 && $config.url.indexOf('/cpi/') === -1) {
      $config.url = $config.url.replace('/', '/api/')
    }
    // if ($config.url.indexOf('/cpi/') > -1) {
    //   // $config.baseURL = Utils.chatURL
    //   $config.url = $config.url.replace('/cpi', Utils.chatURL('http'))
    // }
  } else if (process.env.NODE_ENV === 'production') {
    if ($config.url.indexOf('/cpi/') > -1) {
      // $config.baseURL = Utils.chatURL
      $config.url = $config.url.replace('/cpi', Utils.chatURL('http'))
    }
  }
  return $config
}

const _axios = axios.create(config)
_axios.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    // config.baseURL = devEnv.hosturl
    envModeSwitch(config)
    // 新版头部
    // // temporary-sessionId
    // let Temporary = Utils.Storage.get('temporaryId') || null
    // if (Temporary) {
    //   config.headers['temporary-sessionId'] = Temporary
    // }
    // user-agent-app
    // let _user_agent_app = Utils.Storage.get('user-agent-app') || null
    // if (_user_agent_app) {
    //   config.headers['user-agent-app'] = _user_agent_app
    // }
    let userAgentApp = Utils.userAgent || null
    if (userAgentApp) {
      config.headers['user-agent-app'] = userAgentApp
    }
    // 把公共请求部分拦截实时赋值
    // let _sessionid = Utils.Storage.get('sessionid') ? Utils.Storage.get('sessionid') : null
    // config.headers.sessionid = _sessionid
    // config.headers.openId = store.state['chatRoom']['init'] ? store.state['chatRoom']['init']['message']['member']['openid'] : null
    // config.headers['client-version'] = Utils.version
    // let RequestedWith = Utils.Storage.get('X-Requested-With') || 'XMLHttpRequest'
    // if (RequestedWith) {
    //   config.headers['X-Requested-With'] = RequestedWith
    // }
    if (!config.noIndicator) {
      // Indicator.open({
      //   spinnerType: 'fading-circle'
      // })
    }
    if (config.postOnce) {
      if (OnceStatus === '') {
        OnceStatus = '1'
      } else {
        return false
      }
    }
    // console.log(config)
    return config
  },
  (error) => {
    // Do something with request error
    // Indicator.close()
    if (OnceStatus === '1') {
      OnceStatus = ''
    }
    // Toast({
    //   message: '网络差，请稍后刷新重试',
    //   position: 'middle',
    //   duration: 1800
    // })
    return Promise.reject(error)
  }
)

// Add a response interceptor
_axios.interceptors.response.use(
  (response) => {
    // Do something with response data
    // Indicator.close()
    if (OnceStatus === '1') {
      OnceStatus = ''
    }
    console.log(response)
    // // 链接成功并后台有返回
    // if (response.status >= 200 || response.status <= 304) {
    //   const { code, msg } = response.data
    //   if (code === 0 || code === 101) {
    //     return response.data
    //   } else if (code >= 300 && code < 400) {
    //     // 登录失效，重新登录
    //     // Toast({
    //     //   message: msg,
    //     //   duration: 1800
    //     // })
    //     // showToast(msg, 1800)
    //     // 重连websocket
    //     // setTimeout(() => {
    //     //   store.dispatch('websocket')
    //     //   Utils.Storage.remove('user')
    //     //   Utils.Storage.remove('sessionid')

    //     //   const {
    //     //     history: {
    //     //       current: {
    //     //         meta: {
    //     //           noReLogin
    //     //         }
    //     //       }
    //     //     }
    //     //   } = router

    //     //   if (!noReLogin) {
    //     //     router.replace('/login')
    //     //   }
    //     // }, 1800)
    //   } else if (code !== 102 && code !== 606 && code !== 1404 && code !== 1500) {
    //     if ((msg && msg.indexOf('无效访问令牌') > -1) || code === 1312) {
    //       Utils.Storage.remove('sessionid')
    //       Utils.Storage.remove('user')
    //       // window.location.href = '/mobile/studio/#/login'
    //       Toast({
    //         message: '请刷新页面或重新登录~',
    //         duration: 800
    //       })
    //       setTimeout(() => {
    //         window.location.reload(true)
    //       }, 500)
    //     } else {
    //       Toast({
    //         message: msg,
    //         duration: 1800
    //       })
    //     }
    //   }
    //   return response.data
    // } else {
    //   if (response.data.msg.indexOf('无效访问令牌') > -1 || response.data.code === 1312) {
    //     Utils.Storage.remove('sessionid')
    //     Utils.Storage.remove('user')
    //     // window.location.href = '/mobile/studio/#/login'
    //     Toast({
    //       message: '请刷新页面或重新登录~',
    //       duration: 800
    //     })
    //     setTimeout(() => {
    //       window.location.reload(true)
    //     }, 500)
    //   } else {
    //     // 报错不主动显示
    //     if (config.config && config.config.type === 'notips') {
    //     } else {
    //       Toast({
    //         message: response.data.msg,
    //         duration: 1800
    //       })
    //     }
    //   }

    //   // response.data['msg'] = '网络差，请稍后刷新重试'
    //   // Toast({
    //   //   message: '网络差，请稍后刷新重试',
    //   //   position: 'middle',
    //   //   duration: 1800
    //   // })
    //   return response.data
    // }
  },
  (error) => {
    // Do something with response error
    // Indicator.close()
    if (OnceStatus === '1') {
      OnceStatus = ''
    }
    // Toast({
    //   message: '网络差，请稍后刷新重试',
    //   position: 'middle',
    //   duration: 1800
    // })
    return Promise.reject(error)
  }
)

// 不显示loading的axios请求
_axios.postFast = function (url, data, custom) {
  config.config = custom
  return _axios.post(url, data, {
    noIndicator: true
  })
}

// 防止重复提交
_axios.postOnce = function (url, data) {
  return _axios.post(url, data, {
    postOnce: true
  })
}
// get
// 不显示loading的axios请求
_axios.getFast = function (url) {
  return _axios.get(url, {
    noIndicator: true
  })
}

// 防止重复提交
_axios.getOnce = function (url, params) {
  return _axios.get(url, params, {
    postOnce: true
  })
}

export default _axios
