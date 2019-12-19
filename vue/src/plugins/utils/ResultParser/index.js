import Utils from 'Plugins/utils'

// 时时彩颜色
export const LuckColor = num => {
  /**
    * @author Cyan
    * @description 查询数字所属何种颜色 返回颜色代码
  */
  const green = [ 1, 4, 7, 10, 16, 19, 22, 25 ]
  const blue = [ 2, 5, 8, 11, 17, 20, 23, 26 ]
  const red = [ 3, 6, 9, 12, 15, 18, 21, 24 ]
  if (green.includes(num)) {
    return 'green'
  }
  if (blue.includes(num)) {
    return 'blue'
  }
  if (red.includes(num)) {
    return 'red'
  }
  return 'gray'
}

// 六合彩生肖颜色
export const ZodiacParser = num => {
  /**
    * @author Cyan
    * @param {Object} zodiacDic 六合彩解析对象
    * @param {Array} zodiacKey 对象 key 值
    * @param {Array} zodiacVal 对象 value 值
    * @param {Object} result 解析结果
    * @description 遍历解析对象，查到所匹配的数字对应 key 赋值到 result 然后返回 result
  */
  if (!Utils.Storage.get('ballSetColorDic')) {
    return { color: 'gray', zodiac: '' }
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
          default:
            result.zodiac = zodiacKey[i]
            break
        }
      }
    })
  })
  return result
}
