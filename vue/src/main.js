import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App'
import router from './router/index'
// import router from './router/index'
// import store from '@/store'
// import Mint from 'mint-ui'
import store from './stores/index'
import Utils from 'Plugins/utils'
import VueAwesomeSwiper from 'vue-awesome-swiper'
// import BenAmrRecorder from 'benz-amr-recorder'
// import indexedDB from '@/assets/js/betting/chatRoom/indexedDB'
// 引入全局打包配置
// import TEMPLATE_CONFIG from '../statics.config'
import VueLazyload from 'vue-lazyload'
// import { Howl, Howler } from 'howler'
// 插件注册
// import '@/plugins/axios' // axiosAjax
import 'Plugins/rem/flexible'
import 'swiper/dist/css/swiper.css'
// import 'Assets/fonts/iconfont.css'
// import 'Assets/icon/iconfont.css'
// 导入 MUI 的样式表， 和 Bootstrap 用法没有差别
// import './lib/mui/css/mui.css'
// 导入 MUI 的样式表，扩展图标样式，购物车图标
// 还需要加载图标字体文件
// import './lib/mui/css/icons-extra.css'

// import 'mint-ui/lib/style.css' // mint css和js分离

// 自定义全局指令
import Directives from 'Plugins/directives'
// 自定义全局过滤器
import Filters from 'Plugins/filters'
// mixins
import Mixins from 'Plugins/mixins'

// 二维码插件
// import VueQriously from 'vue-qriously'

import _axios from 'Plugins/axios'

// login, register style
import 'Assets/css/login/index.scss' // vue 原型链配置 utils （全局）
import 'element-ui/lib/theme-chalk/index.css'

// import { InfiniteScroll } from 'vue-ydui/dist/lib.rem/infinitescroll'
// import 'vue-ydui/dist/ydui.base.css'
// import { sourceHearApi } from 'Plugins/api/global'

// Vue.component(InfiniteScroll.name, InfiniteScroll)
Plugin.install = (Vue, options) => {
  Vue.axios = _axios
  window.axios = _axios
  Object.defineProperties(Vue.prototype, {
    axios: {
      get () { return _axios }
    },
    $axios: {
      get () { return _axios }
    }
  })
}

Vue.use(Plugin)

// lazy
Vue.use(VueLazyload, {
  // 加载中图片，一定要有，不然会一直重复加载占位图
  loading: require('../public/img/lottery/icon_lottery_placeholderImage@3x.png'),
  // 加载失败图片
  error: require('../public/img/lottery/icon_revocation1@3x.png')
})

Object.keys(Directives).map(key => Vue.directive(key, Directives[key]))
Object.keys(Filters).map(key => Vue.filter(key, Filters[key]))
Vue.mixin(Mixins)
// Vue.use(VueQriously)

// console.log(TEMPLATE_CONFIG)
// 更新版本号
// Utils.XRequestedWith = 'XMLHttpRequest-Utils'
// Utils.version = TEMPLATE_CONFIG.clientVersion || '5.2.0'
// Utils['projectName'] = TEMPLATE_CONFIG.name || '彩票8'
// Utils['package'] = TEMPLATE_CONFIG.package || 'cp01'

// Utils['chatURL'] = (type) => {
//   // let b = 'msg2-service.0234.co'
//   // if (type === 'ws') {
//   //   return 'ws://' + b
//   // } else {
//   //   return 'http://' + b
//   // }
//   // if (type === 'file') {
//   //   return 'http://ftp.27o1.cn/upload/image'
//   // } else if (type === 'ws') {
//   //   // return 'ws://d9a72789-cp01-msg-ws.0234.co'
//   //   return 'ws://msg2-service.0234.co'
//   // } else {
//   //   // return 'http://d9a72789-cp01-msg.0234.co'
//   //   return 'http://msg2-service.0234.co'
//   // }

//   // global 替换
//   if (type === 'file') {
//     return TEMPLATE_CONFIG.ftp ? location.protocol + '//' + TEMPLATE_CONFIG.ftp + '/upload/image' : location.protocol + '//' + 'ftp.27o1.cn/upload/image'
//   } else if (type === 'ws') {
//     if (location.protocol.indexOf('https') > -1) {
//       return TEMPLATE_CONFIG.chatWs ? 'wss://' + TEMPLATE_CONFIG.chatWs : 'wss://msg2-service.0234.co'
//     } else {
//       return TEMPLATE_CONFIG.chatWs ? 'ws://' + TEMPLATE_CONFIG.chatWs : 'ws://msg2-service.0234.co'
//     }
//   } else {
//     return TEMPLATE_CONFIG.chatHttp ? location.protocol + '//' + TEMPLATE_CONFIG.chatHttp : 'https://msg2-service.0234.co'
//   }
// }

// vue 配置和use其他
// Vue.use(Mint) // vue全局安装mint
Vue.use(VueAwesomeSwiper)
Vue.use(ElementUI)
Vue.config.productionTip = false
// Vue.prototype.$Amr = BenAmrRecorder
// Vue.prototype.$Howl = Howl
// Vue.prototype.$Howler = Howler
Vue.prototype.Utils = Utils

router.beforeEach((to, from, next) => {
  const { title } = to.meta
  // 'register'
  // let sourceQuery = ['index', 'register']
  document.title = title
  if (from.query.c && !to.query.c) {
    to.query.c = from.query.c
    next({ path: to.path, query: from.query })
  } else {
    next()
  }

  // if (sourceQuery.includes(to.name)) {
  //   try {
  //     sourceHearApi({ 'operationType': 1 })
  //   } catch (error) {}
  // }
})

// if (TEMPLATE_CONFIG.source && typeof TEMPLATE_CONFIG.source === 'function') {
//   TEMPLATE_CONFIG.source()
// }

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
