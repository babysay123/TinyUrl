import Vue from 'vue'
// 保留3位小数，不够用0补充
let ChangeThreeDecimal = function (x) {
  let fx = parseFloat(x)
  if (isNaN(fx)) {
    return 0
  }
  fx = Math.round(x * 1000) / 1000
  let sx = fx.toString()
  let posdecimal = sx.indexOf('.')
  if (posdecimal < 0) {
    posdecimal = sx.length
    sx += '.'
  }
  while (sx.length <= posdecimal + 3) {
    sx += '0'
  }
  return sx
}

let ToastMsg = function (msg, time) {
  if (!msg) msg = ''
  if (!time) time = 1500
  // className: 'toast-whole',
  Vue.$toast({
    message: msg,
    position: 'bottom',
    duration: time
  })
}

const numFixed = (num, bit = 2) => {
  // 数字保留小数位数
  if (isNaN(num)) {
    return Number(0).toFixed(bit)
  } else {
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
  }
}

export {
  ChangeThreeDecimal,
  ToastMsg,
  numFixed
}
