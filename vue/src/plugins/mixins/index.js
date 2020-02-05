/* */
// import { sessionIdApi } from 'Plugins/api'
// import Utils from 'Plugins/utils'

export default {
  methods: {
    routerLink ({ path, name, params, redirect }) {
      if (redirect) {
        window.location.href = path + (params || '')
        return
      }

      const currentParams = this.$route.query

      if (!name) {
        this.$router.push({ path, query: { ...currentParams, ...params } })
      } else {
        this.$router.push({ name, params: { ...currentParams, ...params } })
      }
    },
    _msgTips ({ msg, type, duration }) {
      let height = window.innerHeight - 90
      this.$message({
        duration: duration || 2 * 1000,
        message: msg,
        offset: height,
        type: type || 'none'
      })
    },
    successMsgs (msg, duration) {
      this._msgTips({
        type: 'success',
        duration,
        msg
      })
    },
    errorMsgs (msg, duration) {
      this._msgTips({
        type: 'error',
        duration,
        msg
      })
    },
    warnMsgs (msg, duration) {
      this._msgTips({
        type: 'warning',
        duration,
        msg
      })
    },
    /* randomWord 产生任意长度随机字母数字组合 */
    // randomFlag, min,
    randomWord (max) {
      let str = ''
      // let range = min
      let arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

      // 随机产生
      // if (randomFlag) {
      //   range = Math.round(Math.random() * (max-min)) + min
      // }
      for (var i = 0; i < max; i++) {
        let pos = Math.round(Math.random() * (arr.length - 1))
        str += arr[pos]
      }
      return str
    }
    // async getSessionId () {
    //   // 获取sessionid
    //   const res = await sessionIdApi()
    //   Utils.Storage.save('sessionid', res.data.sessionid)
    //   Utils.Storage.save('temporaryId', res.data.temporaryId)
    // }
  }
}
