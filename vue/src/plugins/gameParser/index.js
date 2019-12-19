import Utils from 'Plugins/utils'

// 时时彩颜色
export const LuckParser = num => {
  /**
    * @author Cyan
    * @description 查询数字所属何种颜色 返回颜色代码
  */
  const green = [ 1, 4, 7, 10, 16, 19, 22, 25 ]
  const blue = [ 2, 5, 8, 11, 17, 20, 23, 26 ]
  const red = [ 3, 6, 9, 12, 15, 18, 21, 24 ]
  const color = green.includes(num)
    ? { color: 'green', text: '绿' }
    : blue.includes(num)
      ? { color: 'blue', text: '蓝' }
      : red.includes(num)
        ? { color: 'red', text: '红' }
        : { color: 'gray', text: '无' }
  const size = num < 14 ? '小' : '大'
  const oe = num % 2 === 0 ? '双' : '单'
  return { ...color, size, oe }
}

// 六合彩生肖颜色
export const ZodiacParser = num => {
  /**
    * @author Cyan
    * @constant {Object} zodiacDic 六合彩解析对象
    * @constant {Array} zodiacKey 对象 key 值
    * @constant {Array} zodiacVal 对象 value 值
    * @constant {Object} result 解析结果
    * @description 遍历解析对象，查到所匹配的数字对应 key 赋值到 result 然后返回 result
  */
  if (!Utils.Storage.get('ballSetColorDic')) {
    return { color: 'gray', zodiac: '', element: '' }
  }
  const zodiacDic = Utils.Storage.get('ballSetColorDic')
  const zodiacKey = Object.keys(zodiacDic)
  const zodiacVal = Object.values(zodiacDic)
  let result = { color: '', zodiac: '' }
  zodiacVal.map((z, i) => {
    z.map(e => {
      if (+num === +e) {
        switch (zodiacKey[i]) {
          case '红':
            result.color = 'red'
            break
          case '绿':
            result.color = 'green'
            break
          case '蓝':
            result.color = 'blue'
            break
          case '金':
          case '木':
          case '水':
          case '火':
          case '土':
            result.element = zodiacKey[i]
            break
          default:
            result.zodiac = zodiacKey[i]
            break
        }
      }
    })
  })
  return result
}

export const ZodiacEndParser = lastNum => {
  const { num, zodiac } = lastNum
  const beast = [ '鼠', '虎', '龙', '蛇', '猴', '兔' ]
  const fowl = [ '牛', '马', '羊', '鸡', '狗', '猪' ]
  const size = num >= 25 ? '大' : '小'
  const oe = num % 2 === 0 ? '双' : '单'
  const animal = fowl.includes(zodiac) ? '<span class="text-green">家禽</span>' : beast.includes(zodiac) ? '野兽' : ''
  return { animal, size, oe }
}

export const K3Parser = num => {
  const size = num >= 11 ? '大' : '小'
  const oe = num % 2 === 0 ? '双' : '单'
  return { size, oe }
}
