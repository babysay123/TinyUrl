// const { result } = new LotteryCompute('OneMinuteSixMark', '四全中', [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ])
// 快三的的胆拖 需要传入一级玩法和二级玩法 例如 （三不同号胆拖，二不同号胆拖）
// 十一选五的任选胆拖 需要传入一级玩法和耳机玩法 例如（任选胆拖四中四）
// 时时彩 五星玩法传入 五星直选
// 传入的的data 数组 根据玩法 传入 一维数组,或者二维数组

export default class LotteryCompute {
  constructor (game, type, data) {
    this.game = this.gameClassify(game)
    this.type = type
    this.data = data
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
      return 'pl3'
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
    if (game.indexOf('FrequentLottery') > -1 || game.indexOf('FrequentHappy') > -1) {
      return 'ssc'
    }
  }
  computeType () {
    // 根据游戏大类调用所对应的游戏大类计算方法
    switch (this.game) {
      case 'luck28':
        return this.luck28Compute()
      case 'lhc':
        return this.lhcCompute()
      case 'pk10':
        return this.pk10Compute()
      case 'pl3':
        return this.pl3Compute()
      case 'sxw':
        return this.sxwCompute()
      case 'ssc':
        return this.sscCompute()
    }
  }
  luck28Compute () {
    // 幸运28 包三长度限制，其他玩法返回选多少号码多少注
    switch (this.type) {
      case '特码包三':
        return this.data.length < 3 ? 0 : this.data.length
      default:
        return this.data.length
    }
  }
  lhcCompute () {
    /**
         * @author Cyan
         * @param {Array} typeNum 玩法数字库
         * @param {Number} comboBit 计算组合的位数
         * @description 判断需要调用组合算法的游戏类型，返回组合算法的结果
         */
    if (
      this.type.indexOf('合肖') > -1 ||
      this.type.indexOf('不中') > -1 ||
      this.type.indexOf('连肖') > -1 ||
      this.type.indexOf('连尾') > -1 ||
      this.type.indexOf('中二') > -1 ||
      this.type.indexOf('中特') > -1 ||
      this.type.indexOf('全中') > -1
    ) {
      const typeNum = [ '零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一' ]
      let comboBit = 0
      typeNum.forEach((e, i) => {
        if (this.type.indexOf(e) > -1) {
          comboBit = i
        }
      })
      return this.combination(comboBit, this.data)
    }
    if (this.type.indexOf('特串') > -1) {
      return this.combination(2, this.data)
    }
    return this.data.length
  }
  pk10Compute () {
    // pk10 玩法计算
    // switch (this.type) {
    //   case '冠亚和值':
    //     const gyhz = [ 2, 2, 4, 4, 6, 6, 8, 8, 10, 8, 8, 6, 6, 4, 4, 2, 2 ]
    //     return this.data.length > 0 ? this.data.map(e => gyhz[e]).reduce((a, b) => a + b) : 0
    //   case '前二':
    //     return this.freePickTwo(this.data)
    //   case '前三':
    //     return this.freePickThree(this.data)
    //   case '定位胆':
    //     return this.multipleFreePick(this.data)
    //   default:
    //     return this.data.length
    // }
    if (this.type.indexOf('冠亚和值') > -1) {
      const gyhz = [ 2, 2, 4, 4, 6, 6, 8, 8, 10, 8, 8, 6, 6, 4, 4, 2, 2 ]
      return this.data.length > 0 ? this.data.map(e => gyhz[e]).reduce((a, b) => a + b) : 0
    }
    if (this.type.indexOf('前二') > -1) {
      return this.freePickTwo(this.data)
    }
    if (this.type.indexOf('前三') > -1) {
      return this.freePickThree(this.data)
    }
    if (this.type.indexOf('定位胆') > -1) {
      return this.multipleFreePick(this.data)
    }
    return this.data.length
  }
  pl3Compute () {
    // 因为快三有重名玩法 所以需要一级玩法加耳机玩法类型
    if (this.type === '三不同号胆拖') {
      if (this.data[0].length === 0 || this.data[1].length === 0) {
        return 0
      }
      return this.data[0].length === 2 ? this.data[1].length : this.combination(2, this.data[1])
    }
    if (this.type === '三不同号标准') {
      return this.combination(3, this.data)
    }
    if (this.type === '二同号单选' || this.type === '二不同号胆拖') {
      return this.data[0].length * this.data[1].length
    }
    if (this.type === '二不同号标准') {
      return this.combination(2, this.data)
    }
    return this.data.length
  }
  sxwCompute () {
    if (this.type.indexOf('直选') > -1) {
      return this.type.indexOf('三') > -1 ? this.freePickThree(this.data) : this.freePickTwo(this.data)
    }
    if (this.type.indexOf('组选') > -1 && this.type.indexOf('胆拖') === -1) {
      return this.type.indexOf('三') > -1 ? this.combination(3, this.data) : this.combination(2, this.data)
    }
    if (this.type.indexOf('三组选胆拖') > -1) {
      if (this.data[0].length === 0 || this.data[1].length === 0) {
        return 0
      }
      return this.data[0].length === 2 ? this.data[1].length : this.combination(2, this.data[1])
    }
    if (this.type.indexOf('二组选胆拖') > -1) {
      if (this.data[0].length === 0 || this.data[1].length === 0) {
        return 0
      }
      return this.data[1].length
    }
    if (this.type.indexOf('任选') > -1 && this.type.indexOf('胆拖') === -1) {
      const typeNum = new Map([
        [ '任选任选二中二', 2 ],
        [ '任选任选三中三', 3 ],
        [ '任选任选四中四', 4 ],
        [ '任选任选五中五', 5 ],
        [ '任选任选六中五', 6 ],
        [ '任选任选七中五', 7 ],
        [ '任选任选八中五', 8 ]
      ])
      const comboBit = typeNum.get(this.type)
      return this.combination(comboBit, this.data)
    }
    if (this.type.indexOf('任选') > -1 && this.type.indexOf('胆拖') > -1) {
      const typeNum = new Map([
        [ '任选胆拖任选二中二', 2 ],
        [ '任选胆拖任选三中三', 3 ],
        [ '任选胆拖任选四中四', 4 ],
        [ '任选胆拖任选五中五', 5 ],
        [ '任选胆拖任选六中五', 6 ],
        [ '任选胆拖任选七中五', 7 ],
        [ '任选胆拖任选八中五', 8 ]
      ])
      const core = typeNum.get(this.type)
      if (this.data[0].length === 0 || this.data[0].length + this.data[1].length < core) {
        return 0
      }
      return this.data[0].length === core - 1 ? this.data[1].length : this.combination(core - this.data[0].length, this.data[1])
    }
    if (this.type.indexOf('定位胆') > -1) {
      return this.multipleFreePick(this.data)
    }
    return this.data.length
  }
  sscCompute () {
    // 五星玩法需要传五星直选
    if (this.type.indexOf('二码') > -1) {
      return this.combination(2, this.data)
    }
    if (this.type.indexOf('三码') > -1) {
      return this.combination(3, this.data)
    }
    if (this.type.indexOf('直选') > -1 && (this.type.indexOf('三') === -1 || this.type.indexOf('二') === -1) && this.type.indexOf('和值') === -1) {
      return this.multipleFreePick(this.data, true)
    }
    if (this.type.indexOf('直选和值') > -1 && this.type.indexOf('三') > -1) {
      const sxzxhz = [ 1, 3, 6, 10, 15, 21, 28, 36, 45, 55, 63, 69, 73, 75, 75, 73, 69, 63, 55, 45, 36, 28, 21, 15, 10, 6, 3, 1 ]
      return this.data.length > 0 ? this.data.map(e => sxzxhz[e]).reduce((a, b) => a + b) : 0
    }
    if (this.type.indexOf('三跨度') > -1) {
      const sxkd = [ 10, 54, 96, 126, 144, 150, 144, 126, 96, 54 ]
      return this.data.length > 0 ? this.data.map(e => sxkd[e]).reduce((a, b) => a + b) : 0
    }
    if (this.type.indexOf('组三') > -1 && this.type.indexOf('和值') === -1) {
      return this.combination(2, this.data, false)
    }
    if (this.type.indexOf('组六') > -1 && this.type.indexOf('和值') === -1) {
      return this.combination(3, this.data)
    }
    if (this.type.indexOf('组选和值') > -1 && this.type.indexOf('三') > -1) {
      const sxzxhz = [ 1, 2, 2, 4, 5, 6, 8, 10, 11, 13, 14, 14, 15, 15, 14, 14, 13, 11, 10, 8, 6, 5, 4, 2, 2, 1 ]
      return this.data.length > 0 ? this.data.map(e => sxzxhz[e]).reduce((a, b) => a + b) : 0
    }
    if (this.type.indexOf('组三和值') > -1) {
      const sxzshz = [ 1, 2, 1, 3, 3, 3, 4, 5, 4, 5, 5, 4, 5, 5, 4, 5, 5, 4, 5, 4, 3, 3, 3, 1, 2, 1 ]
      return this.data.length > 0 ? this.data.map(e => sxzshz[e]).reduce((a, b) => a + b) : 0
    }
    if (this.type.indexOf('组六和值') > -1) {
      const sxzlhz = [ 1, 1, 2, 3, 4, 5, 7, 8, 9, 10, 10, 10, 10, 9, 8, 7, 5, 4, 3, 2, 1, 1 ]
      return this.data.length > 0 ? this.data.map(e => sxzlhz[e]).reduce((a, b) => a + b) : 0
    }
    if (this.type.indexOf('直选和值') > -1 && this.type.indexOf('二') > -1) {
      const exzxhz = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1 ]
      return this.data.length > 0 ? this.data.map(e => exzxhz[e]).reduce((a, b) => a + b) : 0
    }
    if (this.type.indexOf('二跨度') > -1) {
      const exkd = [ 10, 18, 16, 14, 12, 10, 8, 6, 4, 2 ]
      return this.data.length > 0 ? this.data.map(e => exkd[e]).reduce((a, b) => a + b) : 0
    }
    if (this.type.indexOf('二组选') > -1 && this.type.indexOf('和值') === -1 && this.type.indexOf('包胆') === -1) {
      return this.combination(2, this.data)
    }
    if (this.type.indexOf('组选和值') > -1 && this.type.indexOf('二') > -1) {
      const exzxhz = [ 1, 1, 2, 2, 3, 3, 4, 4, 5, 4, 4, 3, 3, 2, 2, 1, 1 ]
      return this.data.length > 0 ? this.data.map(e => exzxhz[e]).reduce((a, b) => a + b) : 0
    }
    if (this.type.indexOf('二组选包胆') > -1) {
      return 9
    }
    if (this.type.indexOf('龙虎') > -1 || this.type.indexOf('定位胆') > -1) {
      return this.multipleFreePick(this.data)
    }
    if (this.type.indexOf('大小单双') > -1) {
      return this.multipleFreePick(this.data, true)
    }
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
         * @param 同组三玩法参数基本一致
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
    return !multiple ? arr.map(a => a.length).reduce((a, b) => a + b) : arr.map(a => a.length).reduce((a, b) => a * b)
  }
}
