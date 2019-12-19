/**
 * 用户信息管理插件
 */
import Storage from '../StorageUtil/'
let UserTool = {
  info: 'user',
  save: function (dict) {
    if (!dict || !dict.userId) {
      return false
    }
    return Storage.save(this.info, dict)
  },
  get: function () {
    return Storage.get(this.info)
  },
  del: function () {
    Storage.remove(this.info)
  },
  isLogin: function (fn) {
    let _ts = this
    if (!window.axios || typeof window.axios !== 'function') {
      // 没有axios请求
      if (typeof fn === 'function') {
        fn('error')
      }
      return false
    } else {
      // 先检验有没有sessionid
      if (!Storage.get('sessionid')) {
        Storage.remove('sessionid')
        if (typeof fn === 'function') {
          fn(false)
        }
        return false
      } else {
        window.axios.postOnce('/passport/check_status.do', {}).then(function (res) {
          if (res.code === 0) {
            _ts.save(res.data)
            if (typeof fn === 'function') {
              fn(true, res.data)
            }
            return true
          } else {
            if (res.code >= 300 && res.code <= 400) {
              Storage.remove('sessionid')
              Storage.remove('user')
              setTimeout(() => {
                window.location.href = '/mobile/studio/#/login'
              }, 1000)
            }
            if (typeof fn === 'function') {
              fn(false)
            }
            return false
          }
        })
          .catch(() => {})
      }
    }
  }
}
export default UserTool
