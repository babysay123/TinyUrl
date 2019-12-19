const StorageUtil = {
  /* 清除本地储存 */
  clear: function () {
    if (!localStorage) {
      return false
    }
    // localStorage.clear()
  },
  /* 存入 */
  save: function (key, stringVal, time) {
    try {
      if (!localStorage) {
        return false
      }
      // 定时，12小时后为失效存储
      if (!time || isNaN(time)) {
        time = 12 * 60 * 60
      }
      // if (key === 'sessionid') {
      //   localStorage.setItem(key, stringVal)
      //   return false
      // }
      var cacheExpireDate = (new Date() - 1) + time * 1000
      var cacheVal = {
        val: stringVal,
        exp: cacheExpireDate
      }
      localStorage.setItem(key, JSON.stringify(cacheVal)) // 存入缓存值
      // console.log(key+":存入缓存，"+new Date(cacheExpireDate)+"到期")
    } catch (e) {}
    return stringVal
  },
  /* 获取缓存 */
  get: function (key) {
    try {
      if (!localStorage) {
        return false
      }
      var cacheVal = localStorage.getItem(key)
      // if (key === 'sessionid') {
      //   return cacheVal
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
      // console.log("get cache:"+key)
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
  },
  /** 包装 */
  package: function (name) {
    this.name = name
    return {
      save: function (dict, time) {
        // let _private = StorageUtil.get(name)
        // if (!_private || JSON.stringify(_private) === '{}') {
        //   StorageUtil.save(name, dict)
        //   return JSON.stringify(_private)
        // }
        // for (const e in dict) {
        //   if (dict.hasOwnProperty(e)) {
        //     let item = dict[e]
        //     _private[e] = item
        //   }
        // }
        // StorageUtil.save(name, _private)
        // return JSON.stringify(_private)
        return StorageUtil.save(name, dict, time)
      },
      get: function () {
        return StorageUtil.get(name)
      },
      remove: function () {
        return StorageUtil.remove(name)
      }
    }
  }
}

export default StorageUtil
