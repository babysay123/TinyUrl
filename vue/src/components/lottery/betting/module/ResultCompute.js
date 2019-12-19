// const { result } = new LotteryCompute('OneMinuteSixMark', 'selected4in4', [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ])
// 传入的的data 数组 根据玩法 传入 一维数组,或者二维数组

export default class LotteryCompute {
  constructor (game, type, data) {
    this.game = this.gameClassify(game)
    this.type = type
    this.data = data
    this.pickArr = []
    this.result = this.computeType()
  }
  gameClassify (game) {
    /**
     * @author Cyan
     * @description 根据游戏名返回游戏大类型
     */
    if (game.indexOf('PCEggs') > -1 || game.indexOf('Luck') > -1) {
      return 'luck28'
    }
    if (game.indexOf('ArrangeThree') > -1 || game.indexOf('QuickThree') > -1) {
      return 'k3'
    }
    if (game.indexOf('PK10') > -1) {
      return 'pk10'
    }
    if (game.indexOf('SixMark') > -1) {
      return 'lhc'
    }
    if (game.indexOf('ElevenPickFive') > -1) {
      return 'sxw'
    }
    if (game.indexOf('FrequentLottery') > -1 || game.indexOf('FrequentHappy') > -1 || game === 'ThreeD') {
      return 'ssc'
    }
    if (game.indexOf('SevenStar') > -1) {
      return 'qx'
    }
  }
  computeType () {
    console.log(this.game)
    console.log(this.type, '')
    // if (this.type.indexOf('attribute') > -1 && this.game === 'qx') {
    //   return this.multipleFreePick(this.data)
    // }
    if (
      this.type.indexOf('3directlySum') > -1 ||
      this.type === 'directlySum'
    ) {
      /** 时时彩 => 三星直选和值 */
      /** 福彩3D => 三星和值 */
      const sxzxhz = [ 1, 3, 6, 10, 15, 21, 28, 36, 45, 55, 63, 69, 73, 75, 75, 73, 69, 63, 55, 45, 36, 28, 21, 15, 10, 6, 3, 1 ]
      return this.data.length > 0 ? this.data.map(e => sxzxhz[e]).reduce((a, b) => a + b) : 0
    }

    if (/3combinationSum$/.test(this.type)) {
      /** 时时彩 => 三星组选和值 */
      const sxzxhz = [ 1, 2, 2, 4, 5, 6, 8, 10, 11, 13, 14, 14, 15, 15, 14, 14, 13, 11, 10, 8, 6, 5, 4, 2, 2, 1 ]
      return this.data.length > 0 ? this.data.map(e => sxzxhz[e]).reduce((a, b) => a + b) : 0
    }

    if (this.type.indexOf('combination3Sum') > -1) {
      /** 福彩3D => 三星组三和值 */
      const sxzshz = [ 1, 2, 1, 3, 3, 3, 4, 5, 4, 5, 5, 4, 5, 5, 4, 5, 5, 4, 5, 4, 3, 3, 3, 1, 2, 1 ]
      return this.data.length > 0 ? this.data.map(e => sxzshz[e]).reduce((a, b) => a + b) : 0
    }

    if (this.type === 'combination6Sum') {
      /** 福彩3D => 三星组六和值 */
      const sxzlhz = [ 1, 1, 2, 3, 4, 5, 7, 8, 9, 10, 10, 10, 10, 9, 8, 7, 5, 4, 3, 2, 1, 1 ]
      return this.data.length > 0 ? this.data.map(e => sxzlhz[e]).reduce((a, b) => a + b) : 0
    }

    if (this.type.indexOf('3span') > -1) {
      /** 时时彩 => 三星跨度 */
      const sxkd = [ 10, 54, 96, 126, 144, 150, 144, 126, 96, 54 ]
      return this.data.length > 0 ? this.data.map(e => sxkd[e]).reduce((a, b) => a + b) : 0
    }

    if (this.type.indexOf('combination3') > -1) {
      /** 时时彩 => 三星组三 */
      return this.combination(2, this.data, false)
    }

    if (
      this.type.indexOf('combination6') > -1 ||
      /3combination$/.test(this.type)
    ) {
      /** 时时彩 => 三星组六 */
      /** 11选5 => 三星组选 */
      return this.combination(3, this.data)
    }

    if (this.type.indexOf('2directlySum') > -1) {
      /** 时时彩 => 二星直选和值 */
      const exzxhz = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1 ]
      return this.data.length > 0 ? this.data.map(e => exzxhz[e]).reduce((a, b) => a + b) : 0
    }

    if (this.type.indexOf('2combinationSum') > -1) {
      /** 时时彩 => 二星组选和值 */
      const exzxhz = [ 1, 1, 2, 2, 3, 3, 4, 4, 5, 4, 4, 3, 3, 2, 2, 1, 1 ]
      return this.data.length > 0 ? this.data.map(e => exzxhz[e]).reduce((a, b) => a + b) : 0
    }

    if (this.type.indexOf('2span') > -1) {
      /** 时时彩 => 二星跨度 */
      const exkd = [ 10, 18, 16, 14, 12, 10, 8, 6, 4, 2 ]
      return this.data.length > 0 ? this.data.map(e => exkd[e]).reduce((a, b) => a + b) : 0
    }

    if (this.type.indexOf('2combinationCourage') > -1) {
      /** 时时彩 => 二星组选包胆 */
      return 9
    }

    // if (this.type.indexOf('2combination') > -1) {
    if (/[2]combination$/.test(this.type)) {
      /** 时时彩 => 二星组选 */
      return this.combination(2, this.data)
    }

    if (this.type === 'same2single') {
      /** 快三 => 二同号单选 */
      return this.data[0].length * this.data[1].length
    }

    if (/[0-9]duplex/.test(this.type)) {
      /** 快三 => 胆拖 */
      /** 11选5 => 胆拖 */
      if (this.data[0].length === 0 || this.data[1].length === 0) {
        return 0
      }

      /** 快三 => 三不同号 */
      /** 11选5 => 三码组选胆拖 */
      if (+this.type.match(/\d/g)[0] === 3) {
        return this.data[0].length === 2 ? this.data[1].length : this.combination(2, this.data[1])
      }
      /** 快三 => 二不同号 */
      /** 11选5 => 二码组选胆拖 */
      if (+this.type.match(/\d/g)[0] === 2) {
        return this.data[1].length
      }
    }

    if (this.type === 'sum' && this.game === 'pk10') {
      /** pk10 => 冠亚和值 */
      const gyhz = [ 0, 0, 0, 2, 2, 4, 4, 6, 6, 8, 8, 10, 8, 8, 6, 6, 4, 4, 2, 2 ]
      return this.data.length > 0 ? this.data.map(e => gyhz[e]).reduce((a, b) => a + b) : 0
    }

    if (
      this.type.indexOf('Directly') > -1 ||
      (this.type.indexOf('directly') > -1 && this.game === 'ssc') ||
      (this.type.indexOf('attribute') > -1 && this.game === 'ssc') ||
      (/\dattribute$/.test(this.type) && this.game === 'qx') ||
      this.type === 'directly'
    ) {
      /** 时时彩 => 直选、大小单双 */
      /** 通配直选 */
      return this.multipleFreePick(this.data, true)
    }

    if (this.type.indexOf('locationCourage') > -1) {
      let n = this.type.match(/locationCourage(\S*)/)
      if (n && n[1] !== '' && !isNaN(+n[1])) {
        console.log('多位定')
        return this.multipleArrPick(+n[1], this.data)
        // return this.combination(n[1] * 1, this.data)
      } else {
        /** 通配定位胆 */
        return this.multipleFreePick(this.data)
      }
    }

    if (
      this.type.indexOf('selected2') > -1 ||
      this.type === 'notSame2' ||
      this.type === 'selected2inBunch' ||
      this.type === 'notLocationSelected2'
    ) {
      return this.combination(2, this.data)
    }

    if (
      this.type === 'selected3' ||
      this.type === 'notLocationSelected3' ||
      this.type === 'notSame3'
    ) {
      return this.combination(3, this.data)
    }

    if (
      (this.type.indexOf('2directly') > -1 && this.game === 'pk10') ||
      (this.type.indexOf('2directly') > -1 && this.game === 'sxw')
    ) {
      return this.freePickTwo(this.data)
    }

    if (
      (this.type.indexOf('3directly') > -1 && this.game === 'pk10') ||
      (this.type.indexOf('3directly') > -1 && this.game === 'sxw')
    ) {
      return this.freePickThree(this.data)
    }

    if (this.type === 'extraNumberSelected3') {
      /** 幸运28 => 特码包三 */
      return this.data.length < 3 ? 0 : 1
    }

    if (
      this.type.indexOf('combineZodiac') > -1 ||
      this.type.indexOf('optionalImproper') > -1 ||
      this.type.indexOf('linkZodiac') > -1 ||
      this.type.indexOf('linkTrail') > -1 ||
      (/selected[0-9]in/.test(this.type) && this.game === 'lhc')
    ) {
      /** 六合彩 => 合肖、不中、连肖、连尾、中二、中特、全中 */
      let comboBit = +this.type.split('').reverse().join('').match(/\d/g)[0] || 0
      if (this.type.match(/11/g)) {
        comboBit = 11
      }
      if (this.type.match(/10/g)) {
        comboBit = 10
      }
      return this.combination(comboBit, this.data)
    }

    if (this.type.indexOf('optional') > -1) {
      /** 11选5 任选 */
      let comboBit = +this.type.match(/\d/g)[0] || 0
      return this.combination(comboBit, this.data)
    }
    console.log('未匹配到算法')
    return this.data.length
  }
  combination (bit, arr, double = true) {
    /**
     * @author Cyan
     * @param {Number} bit 需要计算的组合位数
     * @param {Array} arr 需要计算组合的数组合集
     * @param {Boolean} double 是否去重复
     * @param {Number} total 数组的阶乘
     * @param {Number} base 需要计算的位数阶乘
     * @param {Number} length 数组长度
     * @description 根据需要计算的位数，算出所选数组的阶乘和位数阶乘，根据是否去重复返回所得到的注数值
     *
     */
    let total = 1
    let base = 1
    let length = arr.length
    for (let index = 0; index < bit; index++) {
      total *= (length - index) > 0 ? (length - index) : 0
      base *= (bit - index)
    }
    return double ? total / base : total / base * 2
  }
  freePickTwo (arr) {
    /**
     * @author Cyan
     * @param {Array} arr 传递的多维数组
     * @param {Array} a1 多维数组的第一个
     * @param {Array} a2 多维数组的第二个
     * @param {Number} a1Length 两个数组分别对应的长度
     * @param {Number} a2Length 两个数组分别对应的长度
     * @param {Number} count 注数计算
     * @description 分别循环第一第二数组，两个数组只要不是相同的值 则注数+1
     * @return
     */
    const a1 = arr[0]
    const a2 = arr[1]
    const a1Length = a1.length
    const a2Length = a2.length
    let count = 0
    for (let i = 0; i < a1Length; i++) {
      for (let j = 0; j < a2Length; j++) {
        if (a1[i] !== a2[j]) {
          count++
        }
      }
    }
    return count
  }
  freePickThree (arr) {
    /**
     * @author Cyan
     * @param 同组二玩法参数基本一致
     * @description 分别循环三个数组，每个数组与两个数组中的值不相同 则注数+1
     * @return
     */
    const a1 = arr[0]
    const a2 = arr[1]
    const a3 = arr[2]
    const a1Length = a1.length
    const a2Length = a2.length
    const a3Length = a3.length
    let count = 0
    for (let i = 0; i < a1Length; i++) {
      for (let j = 0; j < a2Length; j++) {
        for (let k = 0; k < a3Length; k++) {
          if (a1[i] !== a2[j] && a1[i] !== a3[k] && a2[j] !== a3[k]) {
            count++
          }
        }
      }
    }
    return count
  }
  multipleFreePick (arr, multiple = false) {
    // 多维数组选法 累加 / 累乘
    console.log(arr, arr.map(a => a.length).reduce((a, b) => a + b))
    return !multiple ? arr.map(a => a.length).reduce((a, b) => a + b) : arr.map(a => a.length).reduce((a, b) => a * b)
  }
  // 排列组合（不重复）
  combine (left, arr, k, tmp) {
    let right = arr.length - 1
    if (k === 0) {
      this.pickArr.push(tmp.map(e => e))
      return
    }
    for (let i = left; i <= right - k + 1; i++) {
      tmp.push(arr[i])
      this.combine(i + 1, arr, k - 1, tmp)
      tmp.pop()
    }
  }
  multipleArrPick (num, arr) {
    let multArr = arr.map(e => e.length)
    if (num > arr.length) {
      return 0
    } else if (num === arr.length) {
      return this.multipleFreePick(arr, true)
    }
    // 算出排列组合
    this.combine(0, multArr, num, [])
    let total = this.pickArr.reduce((pre, next) => {
      if (Object.prototype.toString.call(pre) === '[object Array]') {
        pre = pre.reduce((n, m) => n * m)
      }
      return pre + next.reduce((n, m) => n * m)
    })
    // 注意清空
    this.pickArr = []
    return total
  }
}
