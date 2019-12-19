import date from './DateUtil'
class Logger {
  constructor () {
    this.time = date.getNewTime()
  }
  info (info, ...other) {
    console.info('%c%s%s%s', 'color: #d8b930', `info ${this.time} content: `, info, other.toLocaleString())
  }
  log (info, ...other) {
    console.log('%c%s%s%s', 'color: #5a52d1', `log ${this.time} content: `, info, other.toLocaleString())
  }
  warn (info, ...other) {
    console.warn('%c%s%s%s', 'color: #FFC107', `warn ${this.time} content: `, info, other.toLocaleString())
  }
  error (info, ...other) {
    console.error('%c%s%s%s', 'color: #DE2F2F', `warn ${this.time} content: `, info, other.toLocaleString())
  }
}
export default new Logger()
