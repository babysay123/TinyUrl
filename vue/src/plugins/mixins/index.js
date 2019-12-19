/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-06 15:34:43
 * @LastEditTime: 2019-08-11 21:06:30
 * @LastEditors: Please set LastEditors
 */
import { sessionIdApi } from 'Plugins/api'
import Utils from 'Plugins/utils'

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
    async getSessionId () {
      // 获取sessionid
      const res = await sessionIdApi()
      Utils.Storage.save('sessionid', res.data.sessionid)
      Utils.Storage.save('temporaryId', res.data.temporaryId)
    }
  }
}
