/*
 * @Author: your name
 * @Date: 2019-11-01 16:53:59
 * @LastEditTime: 2019-11-01 16:55:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cp8h5\vue\src\views\generalize\sessionUtil.js
 */
const sessionUtil = {
  /* 清除本地储存 */
  clear: function () {
    if (!localStorage) {
      return false
    }
    localStorage.clear()
  },
  /* 存入 */
  save: function (key, stringVal, time) {
    try {
      if (!localStorage) {
        return false
      }
      if (!time || isNaN(time)) {
        time = 12 * 60 * 60
      } // 定时，12小时后为失效存储
      // if (key == "sessionid") {
      //     localStorage.setItem(key, stringVal);
      //     return ;
      // }
      var cacheExpireDate = (new Date() - 1) + time * 1000
      var cacheVal = {
        val: stringVal,
        exp: cacheExpireDate
      }
      localStorage.setItem(key, JSON.stringify(cacheVal)) // 存入缓存值
    } catch (e) { }
    return stringVal
  },
  /* 获取缓存 */
  get: function (key) {
    try {
      if (!localStorage) {
        return false
      }
      var cacheVal = localStorage.getItem(key)
      // if (key == "sessionid") {
      //     // console.log(cacheVal);
      //     return cacheVal; // TODO 待优化
      // }
      var result = JSON.parse(cacheVal)
      var now = new Date() - 1
      if (!result) {
        return null
      } // 缓存不存在
      if (now > result.exp) { // 缓存过期
        this.remove(key)
        return ''
      }
      // console.log("get cache:"+key);
      return result.val
    } catch (e) {
      this.remove(key)
      return null
    }
  },
  /* 移除 */
  remove: function (key) {
    if (!localStorage) {
      return false
    }
    localStorage.removeItem(key)
  }
}
export { sessionUtil }
