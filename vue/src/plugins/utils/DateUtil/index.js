/**
 * 对Date的扩展，将 Date 转化为指定格式的String
 * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 */

// Date.prototype.format = function(fmt) {
// let o = {
// 'M+' : this.getMonth() + 1, // 月份
// 'd+' : this.getDate(), // 日
// 'h+' : this.getHours(), // 小时
// 'm+' : this.getMinutes(), // 分
// 's+' : this.getSeconds(), // 秒
// 'q+' : Math.floor((this.getMonth() + 3) / 3), // 季度
// 'S' : this.getMilliseconds()
// 毫秒
// }
// //修改时区，统一东八区
/**
 * 对Date 重新封装和拓展
 */
// // 当月天数
// const getMonthDays = function (month, year) {
//   let monthStartDate = new Date(year, month, 1)
//   let monthEndDate = new Date(year, month + 1, 1)
//   let days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24)
//   return days
// }
// 初始化时间
const dateInit = function (date) {
  let $n = new Date()
  if (date) {
    $n = new Date(date)
  }
  let $offset = $n.getTimezoneOffset() * 60 * 1000
  let $zone = 8 // 北京时区
  return new Date($n.getTime() + $offset + $zone * 60 * 60 * 1000)
}
// // 精确开始时间 到分钟
// const timesStart = function (date) {
//   let hours = 1000 * 60 * 60 * new Date(date).getHours()
//   let afterTime = new Date(date).getTime() - hours
//   return afterTime
// }
// // 精确结束时间 到分钟
// const timesEnd = function (date) {
//   let hours = 1000 * 60 * 60 * (23.99 - new Date(date).getHours())
//   let afterTime = new Date(date).getTime() + hours
//   return afterTime
// }
class DateUtil {
  constructor () {
    // new 当前时间
    this.oneDay = 24 * 60 * 60 * 1000
    this.__Now = dateInit()
    this.__d = {
      month: this.__Now.getMonth() + 1,
      year: this.__Now.getFullYear(),
      day: this.__Now.getDate(),
      dayOfWeek: 0
    }
    this.__d.dayOfWeek = this.__Now.getDay() === 0 ? 7 : this.__Now.getDay()
  }
  updateDate (date) {
    // 更新时间
    this.__Now = dateInit(date)
    this.__d = {
      month: this.__Now.getMonth() + 1,
      year: this.__Now.getFullYear(),
      day: this.__Now.getDate(),
      dayOfWeek: 0
    }
    this.__d.dayOfWeek = this.__Now.getDay() === 0 ? 7 : this.__Now.getDay()
    return this
  }
  getDate () {
    return this.__Now
  }
  // 格式化
  formatDate (date, fmt) {
    var _date = new Date(date)
    var o = {
      'M+': _date.getMonth() + 1, // 月份
      'd+': _date.getDate(), // 日
      'h+': _date.getHours(), // 小时
      'm+': _date.getMinutes(), // 分
      's+': _date.getSeconds(), // 秒
      'q+': Math.floor((_date.getMonth() + 3) / 3), // 季度
      'S': _date.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (_date.getFullYear() + '')
        .substr(4 - RegExp.$1.length))
    }
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
    }
    return fmt
  }
}

class DateControl extends DateUtil {
  constructor () {
    super()
    // console.log('this')
    this.getDetail = function () {
      return this.__d
    }
  }
  // 获取今天
  getNow () {
    let _str = this.formatDate(this.__Now, 'yyyy/MM/dd')
    return {
      begin: dateInit(_str + ' 00:00:00'),
      end: dateInit(_str + ' 23:59:59')
    }
  }
  getNewTime () {
    return this.formatDate(this.__Now, 'yyyy/MM/dd hh:mm:ss')
  }
  // 获取昨天
  getYesterday () {
    let _yesterday = dateInit(this.__Now.getTime() - this.oneDay)
    let _str = this.formatDate(_yesterday, 'yyyy/MM/dd')
    return {
      begin: dateInit(_str + ' 00:00:00'),
      end: dateInit(_str + ' 23:59:59')
    }
  }
  // 获取本周
  getWeek () {
    let beginTime = this.__Now.getTime() - (this.__d.dayOfWeek - 1) * this.oneDay
    let endTime = this.__Now.getTime() + (7 - this.__d.dayOfWeek) * this.oneDay
    beginTime = this.formatDate(dateInit(beginTime), 'yyyy/MM/dd')
    endTime = this.formatDate(dateInit(endTime), 'yyyy/MM/dd')
    return {
      begin: dateInit(beginTime + ' 00:00:00'),
      end: dateInit(endTime + ' 23:59:59')
    }
  }
  // 获取上周
  getLastWeek () {
    let beginTime = this.__Now.getTime() - (7 + this.__d.dayOfWeek - 1) * this.oneDay
    let endTime = this.__Now.getTime() + (7 - this.__d.dayOfWeek - 7) * this.oneDay
    beginTime = this.formatDate(dateInit(beginTime), 'yyyy/MM/dd')
    endTime = this.formatDate(dateInit(endTime), 'yyyy/MM/dd')
    return {
      begin: dateInit(beginTime + ' 00:00:00'),
      end: dateInit(endTime + ' 23:59:59')
    }
  }
  // 获取本月
  getMonth () {
    let beginTime = new Date(this.__Now.getFullYear(), this.__Now.getMonth(), 1, 0, 0, 0)
    let endTime = new Date(this.__Now.getFullYear(), this.__Now.getMonth() + 1, 0, 23, 59, 59)

    return {
      begin: dateInit(beginTime),
      end: dateInit(endTime)
    }
  }
  // 获取上月
  getLastMonth () {
    let beginTime = new Date(this.__Now.getFullYear(), this.__Now.getMonth() - 1, 1, 0, 0, 0)
    let endTime = new Date(this.__Now.getFullYear(), this.__Now.getMonth(), 0, 23, 59, 59)

    return {
      begin: dateInit(beginTime),
      end: dateInit(endTime)
    }
  }
  // 获取指定时间 和现在的 间隔时间 参数可是毫秒  或者是 年- 月- 日- 小时:分钟:秒
  getDayName (d) {
    let td = new Date()
    td = new Date(td.getFullYear(), td.getMonth(), td.getDate())
    let od = new Date(d)
    od = new Date(od.getFullYear(), od.getMonth(), od.getDate())
    let hours = new Date(d).getHours()
    let minutes = new Date(d).getMinutes()
    if (hours < 10) {
      hours = '0' + hours
    }
    if (minutes < 10) {
      minutes = '0' + minutes
    }
    let xc = (od - td) / 1000 / 60 / 60 / 24
    if (xc < -2) {
      return -xc + '天前' + ' ' + hours + ':' + minutes
    } else if (xc < -1) {
      return '前天' + ' ' + hours + ':' + minutes
    } else if (xc < 0) {
      return '昨天' + ' ' + hours + ':' + minutes
    } else if (xc === 0) {
      return '今天' + ' ' + hours + ':' + minutes
    }
  }
  // // 获得今天开始日期
  // getDayStart () {
  //   let monthStartDate = this.getDate()
  //   return timesStart(monthStartDate)
  // }
  // // 获得今天结束日期
  // getDayEnd () {
  //   let monthStartDate = this.getDate()
  //   return timesEnd(monthStartDate)
  // }
  // // 获得昨天开始日期
  // getYestoDayStart () {
  //   let monthStartDate = this.getDate()
  //   monthStartDate.setDate(monthStartDate.getDate() - 1)
  //   return timesStart(monthStartDate)
  // }
  // // 获得昨天结束日期
  // getYestoDayEnd () {
  //   let monthStartDate = this.getDate()
  //   monthStartDate.setDate(monthStartDate.getDate() - 1)
  //   return timesEnd(monthStartDate)
  // }
  // // 获得本周的开始日期
  // getWeekStartDate () {
  //   let _dateDetail = this.getDetail()
  //   let weekStartDate = new Date(_dateDetail.year, _dateDetail.month, this.nowDay - _dateDetail.dayOfWeek + 1)
  //   return timesStart(weekStartDate)
  // }
  // // 获得本周的结束日期
  // getWeekEndDate () {
  //   let _dateDetail = this.getDetail()
  //   let weekEndDate = new Date(_dateDetail.year, _dateDetail.month, this.nowDay + (7 - _dateDetail.dayOfWeek))
  //   return timesEnd(weekEndDate)
  // }
  // // 获得上周的开始日期
  // getLastWeekStartDate () {
  //   let _dateDetail = this.getDetail()
  //   let weekStartDate = new Date(this.__Now.getTime() - (_dateDetail.dayOfWeek + 6) * this.oneDay)
  //   return timesStart(weekStartDate)
  // }
  // // 获得上周的结束日期
  // getLastWeekEndDate () {
  //   let _dateDetail = this.getDetail()
  //   let weekEndDate = new Date(this.__Now.getTime() - _dateDetail.dayOfWeek * this.oneDay)
  //   return timesEnd(weekEndDate)
  // }
  // // 获得本月的开始日期
  // getMonthStartDate () {
  //   let _dateDetail = this.getDetail()
  //   let monthStartDate = new Date(_dateDetail.year, _dateDetail.month, 1)
  //   return timesStart(monthStartDate)
  // }
  // // 获得本月的结束日期
  // getMonthEndDate () {
  //   let _dateDetail = this.getDetail()
  //   let monthEndDate = new Date(_dateDetail.year, _dateDetail.month, getMonthDays(_dateDetail.month, _dateDetail.year))
  //   return timesEnd(monthEndDate)
  // }
  // // 获得上月开始时间
  // getLastMonthStartDate () {
  //   let m = 1
  //   let _dateDetail = this.getDetail()
  //   if (_dateDetail.month === 0) {
  //     m = 12 - 1
  //   } else if (_dateDetail.month === 1) {
  //     m = 12
  //   } else {
  //     m = _dateDetail.month - 1
  //   }
  //   let d = getMonthDays(m, _dateDetail.year)
  //   let s = new Date(_dateDetail.year, _dateDetail.month, 1)
  //   let lastMonthStartDate = new Date(s.getTime() - d * this.oneDay)
  //   return timesStart(lastMonthStartDate)
  // }
  // // 获得上月结束时间
  // getLastMonthEndDate () {
  //   let _dateDetail = this.getDetail()
  //   let s = new Date(_dateDetail.year, _dateDetail.month, 1)
  //   let lastMonthEndDate = new Date(s.getTime() - this.oneDay)
  //   return timesEnd(lastMonthEndDate)
  // }
}

export default new DateControl()
