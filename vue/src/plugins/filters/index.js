export default {
  numFixed (num, bit = 2) {
  // 数字保留小数位数
    if (isNaN(num)) {
      return Number(0).toFixed(bit)
    } else {
      if (bit > 0) {
        if (num.toString().indexOf('.') === -1) {
          let suffix = '.'
          for (let i = 0; i < bit; i++) {
            suffix += '0'
          }
          return num + suffix
        } else {
          const splitNum = num.toString().split('.')
          if (splitNum[1].length >= bit) {
            return splitNum[0] + '.' + splitNum[1].slice(0, bit)
          } else {
            let suffix = ''
            for (let i = 0; i < bit - splitNum[1].length; i++) {
              suffix += '0'
            }
            return splitNum[0] + '.' + splitNum[1] + suffix
          }
        }
      } else {
        return Math.floor(num)
      }
    }
  }
}
