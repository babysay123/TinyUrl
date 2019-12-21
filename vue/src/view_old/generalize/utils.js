/*
 * @Author: your name
 * @Date: 2019-11-01 15:26:52
 * @LastEditTime: 2019-11-01 15:28:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cp8h5\vue\src\views\generalize\utils.js
 */
const newSessionStorage = {
  /* 清除本地储存 */
  /* 坑爹的vivo浏览器。为了兼容你要把底层的东西都改掉。你要不要这么坑？ */
  clear: function () {
    if (!sessionStorage) {
      return false
    }
    sessionStorage.clear()
  },
  /* 存入 */
  save: function (key, stringVal, time) {
    try {
      if (!sessionStorage) {
        return false
      }
      if (!time || isNaN(time)) {
        time = 12 * 60 * 60
      } // 定时，12小时后为失效存储
      // if (key == "sessionid") {
      //     sessionStorage.setItem(key, stringVal);
      //     return ;
      // }
      var cacheExpireDate = (new Date() - 1) + time * 1000
      var cacheVal = {
        val: stringVal,
        exp: cacheExpireDate
      }
      sessionStorage.setItem(key, JSON.stringify(cacheVal)) // 存入缓存值
      // console.log(key+":存入缓存，"+new Date(cacheExpireDate)+"到期");
    } catch (e) { }
    return stringVal
  },
  /* 获取缓存 */
  get: function (key) {
    try {
      if (!sessionStorage) {
        return false
      }
      var cacheVal = sessionStorage.getItem(key)
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
    if (!sessionStorage) {
      return false
    }
    sessionStorage.removeItem(key)
  }
}
export { newSessionStorage }
