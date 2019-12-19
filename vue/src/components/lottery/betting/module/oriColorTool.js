// const ballColorDic = 'ballSetColorDic'
const ballRedColor = 'ballRedColor'
const ballGreenColor = 'ballGreenColor'
const ballBlueColor = 'ballBlueColor'
const ballGrayColor = 'ballGrayColor'
// let colorEntity = ''

export default {
  ColorArr: [],
  // 六合彩数字对应颜色
  sixNumToColor: function (num) {
    // console.log(this)
    // oriColor.ballDisColorDic()
    num += ''
    if (num === '' || num === null) {
      return ballRedColor
    }
    if (num.match('大') || num.match('小') || num.match('单') || num.match('双')) {
      return ''
    }
    if (num.match('尾') || num.match('头')) {
      return ''
    }
    if (num.match('波') || num.match('和局')) {
      if (num.match('红')) {
        return ballRedColor
      }
      if (num.match('绿')) {
        return ballGreenColor
      }
      if (num.match('蓝')) {
        return ballBlueColor
      }
      if (num.match('和局')) {
        return ballGrayColor
      }
    }
    if (num.match('肖')) {
      return ''
    }
    if (!this.ColorArr || this.ColorArr.length === 0) {
      return ballRedColor
    }
    var colorStr = '红|绿|蓝'
    var colorArr = colorStr.split('|')
    var dic = this.ColorArr
    var colorNumArr = []
    for (var o = 0; o < colorArr.length; o++) {
      colorNumArr.push(dic[colorArr[o]])
    }
    for (var i = 0; i < 3; i++) {
      var numArr = colorNumArr[i]
      if (numArr.indexOf(parseInt(num)) > -1) {
        if (i === 0) {
          return ballRedColor
        }
        if (i === 1) {
          return ballGreenColor
        }
        if (i === 2) {
          return ballBlueColor
        }
      }
    }
    return ''
  },
  // 六合彩数字对应生肖
  sixNumToZodiac: function (num) {
    // oriColor.ballDisColorDic()
    num += ''
    if (num === '' || num === null) {
      return ''
    }
    // numStr = [NSString stringWithFormat:@'%02zd',[numStr integerValue]];
    if (!this.ColorArr || this.ColorArr.length === 0) {
      return ''
    }
    var animastr = '鼠|牛|虎|兔|龙|蛇|马|羊|猴|鸡|狗|猪'
    var animaArr = animastr.split('|')
    var dic = this.ColorArr
    var animaNumArr = []
    for (var o = 0; o < animaArr.length; o++) {
      animaNumArr.push(dic[animaArr[o]])
    }
    for (var i = 0; i < animaNumArr.length; i++) {
      var numArr = animaNumArr[i]
      if (numArr.indexOf(num) > -1) {
        return animaArr[i]
      }
    }
    return ''
  },
  // pc28和值对应颜色
  pcSumToColor: function (num) {
    // console.log('传入的数字'+num);
    num += ''
    if (num === '' || num == null) {
      return ballRedColor
    }
    if (num.match('豹子')) {
      return ''
    }
    if (num.match('大') || num.match('小') || num.match('单') || num.match('双')) {
      return ''
    }
    if (num.match('波')) {
      if (num.match('红')) {
        return ballRedColor
      }
      if (num.match('绿')) {
        return ballGreenColor
      }
      if (num.match('蓝')) {
        return ballBlueColor
      }
      if (num.match('和局')) {
        return ballGrayColor
      }
    }
    //  红绿蓝灰
    var colorStr = '红|绿|蓝|灰'
    var colorNumArr = [
      '3|6|9|12|15|18|21|24',
      '1|4|7|10|16|19|22|25',
      '2|5|8|11|17|20|23|26',
      '0|13|14|27'
    ]

    for (var i = 0; i < colorNumArr.length; i++) {
      var numArr = colorNumArr[i].split('|')
      if (numArr.indexOf(num) > -1) {
        var color = colorStr.split('|')[i]
        if (color.match('红')) {
          return ballRedColor
        }
        if (color.match('绿')) {
          return ballGreenColor
        }
        if (color.match('蓝')) {
          return ballBlueColor
        }
        if (color.match('灰')) {
          return ballGrayColor
        }
      }
    }
    return ballRedColor
  }
}
