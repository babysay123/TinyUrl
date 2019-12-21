/* eslint-disable */
/*
 总的类型：
 类型1： 选了几个数字就是几注
 类型2： 从一个数组里取几个数字进行组合
 类型3： 针对直选 --  递归组合，需要筛选掉一样的，不允许一样的号码

 类型4： 递归组合，不需要筛选掉一样的，允许一样的  -- 这个是每组都需要选一个或多个的
 类型5： 结果：3个数字里两个数字一样，一个数字不一样  -- 前三组三的
 类型6:  任几复式    - 这个是至少选几个

 类型7： 和值  --- 先算单个和值的注数，然后把多个和值的注数加起来  （快三）--1-6
 */

/*
 时时彩添加新的算法
 前二直选：
 组选和值： 类型8  --前二直选和值 --- 两个数相加， 不允许对子，无序
 直选跨度： 类型9  10 18 16 14 12 10 8 6 4 2
 组选包胆： 类型10  --- 全9

 前三直选：
 前三组合： 类型11 两个一样的
 直选跨度： 类型12 10 54 96 126 144 150 144 126 96 54

 前三组选：
 组选和值： 类型13 （组三或组六的形态之和)  -- 特殊:暂时写死吧
                     @[@1, @2, @2, @4,@5, @6, @8, @10, @11, @13, @14, @14, @15,
                     @15, @14, @14, @13,@11, @10, @8, @6, @5, @4, @2, @2, @1]
 后三组选：
 组选包胆： 类型14   --- 全54

 上海时时乐：
 三星组选：
 组六和值： 类型15
                 @[@1, @1, @2, @3,@4, @5, @7, @8, @9, @10, @10,
                 @10, @10, @9, @8,@7, @5, @4, @3, @2, @1, @1]
 组三和值： 类型16  （有两个数一样，有一个数不一样）
                 @[@1, @2, @1, @3,@3, @3, @4, @5, @4, @5, @5,
                 @4, @10, @9, @8,@7, @5, @4, @3, @2, @1, @1]

 11选5：
 三码组选胆拖及任选胆拖： 类型17 ： 从拖码数组里取 （任选数-已选胆码数） 进行组合

 // 时时彩 --  0-9
 直选和值：类型18  --- 先算单个和值的注数，然后把多个和值的注数加起来  （与快三算法差不多） 0-9
 */

/*
 组三： 两个一样的
 组六： 三个都不一样   - （从一个数里取出三个数字进行组合）
 */
var isRepeat = function (arr) {
  var hash = {}
  for (var i in arr) {
    if (hash[arr[i]]) return true
    hash[arr[i]] = true
  }
  return false
}
const combination = (arr, num, fun) => {
  // 算数组可能的排列组合
	/*这里假设num最大值为10 一般A(n,m)中的m应该不会太大 */
	if (arr.length < num || num > 30)
	{
			return [];
	}
	var variable = ["a", "b", "c", "d", "e", "f", "g", "h", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u"];
	var replaceStr = "#$#";
	var str = " var arr=arguments[0]; var fun=arguments[1];  var ret=[]; for (var a = 0; a < arr.length; a++) { "+replaceStr+" } return ret;"
	for (var i = 1; i < num; i++) {
			str = str.replace(replaceStr, " for (var " + variable[i] + " =" + variable[i - 1] + "+ 1; " + variable[i] + " < arr.length; " + variable[i] + "++) { " + replaceStr + "  }")
	}
	var temp = " var temp= []; ";
	for (var i = 0; i < num; i++) {
			temp += "temp.push(arr[" + variable[i] + "]); ";
	}
	if (fun) {
			temp += " ret.push(fun(temp)); ";
	}
	else {
			temp += " ret.push(temp); ";
	}
	str = str.replace(replaceStr, temp);
	//console.log(str);
	return (new Function(str)).apply(null, [arr, fun]);
}
const permutate = (doubleArrays) => {
  // 不懂。。多维求和？
	var len = doubleArrays.length;
	if (len >= 2) {
		var len1 = doubleArrays[0].length;
		var len2 = doubleArrays[1].length;
		var newlen = len1 * len2;
		var temp = new Array(newlen);
		var index = 0;
		for (var i = 0; i < len1; i++) {
			for (var j = 0; j < len2; j++) {
				temp[index] = doubleArrays[0][i] + doubleArrays[1][j];
				index++;
			}
		}
		var newArray = new Array(len - 1);
		for (var i = 2; i < len; i++) {
			newArray[i - 1] = doubleArrays[i];
		}
		newArray[0] = temp;
		return permutate(newArray);
	} else {
		// console.log(doubleArrays);
		return doubleArrays[0];
	}
}
const simplify = function (arr) { //重构数组，多维变一维
  var results = []
  var result = []
  var doExchange = function (arr, depth) {
    for (var i = 0; i < arr[depth].length; i++) {
      result[depth] = arr[depth][i]
      if (depth != arr.length - 1) {
        doExchange(arr, depth + 1)
      } else {
        // results.push(result.join('|'))
        // console.log(result)
        results.push(result.join(','))
      }
    }
  }
  doExchange(arr, 0)
  // console.log(results.length, results.join(','))
  return results
}
var duplicate = function (arr) { //去除数组重复值
  var tmp
  if (!arr || arr.length === 0) {
    return []
  }
  var isObject = function (o) {
    return Object.prototype.toString.call(o) === '[object Object]'
  }
  var isArray = function (o) {
    return Object.prototype.toString.call(o) === '[object Array]'
  }
  for (var i = 0, len = arr.length; i < len; i++) {
    tmp = arr[i]
    if (isArray(tmp)) {
      for (var j = i + 1; j < len; j++) {
        if (isArray(arr[j]) && tmp.length === arr[j].length) {
          var flag = false
          for (var k = 0; k < tmp.length; k++) {
            if (tmp[k] !== arr[j][k]) {
              flag = true
              break
            }
          }
          if (!flag) {
            arr.splice(j, 1)
            len--
            j--
          }
        }
      }
    } else if (isObject(tmp)) {
      for (var j = i + 1; j < len; j++) {
        if (isObject(arr[j])) {
          var tmpKey = [],
            objKey = [],
            flag = false
          for (var k in tmp) {
            tmpKey.push(k)
          }
          for (var l in arr[j]) {
            objKey.push(l)
          }
          if (tmpKey.length === objKey.length) {
            for (var key in tmp) {
              if (tmp[key] !== arr[j][key]) {
                flag = true
                break
              }
            }
          }
          if (!flag) {
            arr.splice(j, 1)
            len--
            j--
          }
        }
      }
    } else {
      for (var j = i + 1; j < len; j++) {
        if (tmp === arr[j]) {
          arr.splice(j, 1)
          len--
          j--
        }
      }
    }
  }
  return arr
}
let algorithms = {
  layout: {},
  switch: function (className, layout) {
    var _ts = algorithms
    _ts.layout = layout
    if (className.indexOf("FrequentLottery") > -1) { // 时时彩
      // return new FrequentLotteryCalculator()
      return new _ts.FrequentLotteryCalculator()
    } else if (className.indexOf("ElevenPickFive") > -1) { // 11选5
      // return new ElevenPickFiveCalculator()
      return new _ts.ElevenPickFiveCalculator()
    } else if (className.indexOf("PK10") > -1) { // PK10
      // return new PK10Calculator()
      return new _ts.PK10Calculator()
    } else if (className.indexOf('ThreeD') > -1 || className.indexOf('ArrangeThree') > -1
    || className.indexOf('FrequentHappy') > -1) { // 3d 排列三 上海时时乐
      // return new ThreeNumbersCalculator(methodName, arr);
      return new _ts.ThreeNumbersCalculator();
    } else if (className.indexOf('Eggs') > -1 || className.indexOf('Luck') > -1) { // PC蛋蛋系列
      // return new PCEggsCalculator(methodName, arr);
      return new _ts.PCEggsCalculator();
    } else if (className.indexOf('SixMark') > -1) { // 6合系列
      // return new SixMarkCalculator(methodName, arr)
      return new _ts.SixMarkCalculator()
    } else if (className.indexOf('QuickThree') > -1) { // 快3系列
      // return new QuickThreeCalculator(methodName, arr)
      return new _ts.QuickThreeCalculator()
    } else if (className.indexOf('SevenStar') > -1) {
      // return new _ts.SevenStarCalculator()
    } else {
      // throw new Error("ClassName Error")
      // TODO 备选算法
      // return new _ts.OtherCalculator()
    }
  },
  OtherCalculator: function () {
    var _ts = algorithms
    // TODO 备选算法待续，有兴趣的时候再写吧。想不出来了。TMD。
    // TODO
    var isArray = function (o) {
      return Object.prototype.toString.call(o) === '[object Array]'
    }
    var isObject = function (o) {
      return Object.prototype.toString.call(o) === '[object Object]'
    }
    // 接口方法
    this.calculate = function (method, arr) {
      return eval("this." + method + '(arr)')
    }
    this.calcSwitch = function (type) {
      //根据type，返回方法名
      switch (type) {
        case -1:
          return 0
          break
        case 1: // 选了几个数字就是几注
          return "location"
          break
        case 2: // 从一个数组里取几个数字进行组合
          return "combMinSel"
          break

        case 3: // 递归组合，需要筛选掉一样的，不允许一样的号码
          return "directlyNotSame"
          break
        case 4: //递归组合，不需要筛选掉一样的，允许一样的
          return "directlyAllowSame"
          break
        case 5: //组三的

          break
        case 6: //任几复式    - 这个是至少选几个 TODO 这个保留暂时不用

          break
        case 7: // 和值 --- 先算单个和值的注数，然后把多个和值的注数加起来

          break
        case 8: // 前二组选和值 --- 先算单个和值的注数，然后把多个和值的注数加起来

          break
        case 9:

          break
        case 10: // 包胆

          break
        case 11: // 组三

          break
        case 12:

          break
        case 13:

          break
        case 14:

          break
        case 15:

          break
        case 16: // 组三和值

          break
        case 17: //胆拖  -- 任选胆拖算法： 从拖码数组里取 （任选数-已选胆码数） 进行组合  （任选数为胆码最大数+1）

          break
        case 18:

          break
        default:
          return 0
          break
      }
    }

    this.location = function (sa) {
      var count = 0 // 选了几个数字就是几注，适应多维数组
      for (var e of sa) {
        if (isArray) {
          for (var em of e) {
            count++
          }
        } else {
          count++
        }
      }
      return count
    }
    this.combMinSel = function (sa) {
      //一维数组, 由minSel 控制排列组合数
      var _sel = _ts.layout.layout[0] && _ts.layout.layout[0].minSel > 0 ? _ts.layout.layout[0].minSel : 0
      // console.log(combination(sa, _sel))
      return combination(sa, _sel).length
    }
    this.directlyNotSame = function (sa) {
      //不重复号码
      var _sel = _ts.layout.layout.length
      if (sa.length < _sel) {
        return 0
      }
      var arr = simplify(sa) //得到一维数组，去掉重复值
      for (var i = arr.length - 1; i >= 0; i--) {
        var each = arr[i]
        var n = each.split(",")
        if (isRepeat(n)) {
          arr.splice(i, 1)
        }
      }
      return arr.length
    }
    this.directlyAllowSame = function (sa) {
      return permutate(sa).length
    }
    this.combinationThree = function (sa) {
      return combination(sa, 2).length * 2
    }
    //TODO 任选自填，预留
    this.optionalNumbers = function (sa) {
      var _sel = _ts.layout.layout[0] && _ts.layout.layout[0].minSel > 0 ? _ts.layout.layout[0].minSel : 0
      if (_sel == 0) {
        return 0
      }
      return combination(sa, _sel).length
    }
    this.sum = function (sa) {
      // TODO 分为四种，两个值相加，不允许一样和允许一样；三个值相加，不允许重复和允许重复
      var numbers = []
      if (_ts.layout.lotteryClassName.indexOf("QuickThree") > -1) {
        var min = 1,
          max = 6 //快三
        this.sum3Same(sa)
      } else if (_ts.layout.lotteryClassName.indexOf("FrequentLottery") > -1) {
        var min = 0,
          max = 9 //时时彩

      } else if (_ts.layout.lotteryClassName.indexOf("PK10") > -1) {
        var min = 1,
          max = 10 //PK10

      }

    }
    /*
     * 四种和值
     */
    this.sum2Same = function (sa) {

    }
    this.sum2NotSame = function (sa) {

    }
    this.sum3Same = function (sa) {
      return sa.length
    }
    this.sum3NotSame = function (sa) {

    }

  },
  FrequentLotteryCalculator: function () {
    // 接口方法
    this.calculate = function (methodName, selectedArray) {
      try {
        return eval("this." + methodName + '(selectedArray)')
      } catch (e) {
        console.log(e)
        // var other = new _ts.OtherCalculator()
        // console.log(other)
      }
    }
    // 龙虎
    this.dragonTiger = function (sa) {
      return sa.length
    }
    // 定位胆
    this.locationCourage = this.locationCourageAttribute = function (sa) {
      var count = 0
      for (var i = 0; i < sa.length; i++) {
        for (var y = 0; y < sa[i].length; y++) {
          count++
        }
      }
      return count
    }
    // 2星直选
    this.before2directly = this.after2directly = this.in2directly = function (sa) {
      return permutate(sa).length
    }
    /*二星组选*/
    this.before2combination = this.after2combination = this.in2combination = function (sa) {
      return combination(sa, 2).length
    }
    // 2星直选和值
    this.before2directlySum = this.after2directlySum = this.in2directlySum = function (sa) {
      var counts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
      var count = 0
      for (var i = 0; i < sa.length; i++) {
        count += counts[sa[i]]
      }
      return count
    }
    // 2星组选和值
    this.before2combinationSum = this.after2combinationSum = this.in2combinationSum = function (sa) {
      var counts = [1, 1, 2, 2, 3, 3, 4, 4, 5, 4, 4, 3, 3, 2, 2, 1, 1]
      var count = 0
      for (var i = 0; i < sa.length; i++) {
        count += counts[sa[i]]
      }
      return count
    }
    // 2星跨度
    this.before2span = this.after2span = this.in2span = function (sa) {
      var counts = [10, 18, 16, 14, 12, 10, 8, 6, 4, 2]
      var count = 0
      for (var i = 0; i < sa.length; i++) {
        count += counts[sa[i]]
      }
      return count
    }
    // 2星组选包胆
    this.before2combinationCourage = this.after2combinationCourage = this.in2combinationCourage = function (
      sa) {
      return sa.length * 9
    }
    // 2星属性
    this.before2attribute = this.after2attribute = this.in2attribute = function (sa) {
      return permutate(sa).length
    }
    // 不定位 3中1
    this.before3selected1 = this.after3selected1 = this.in3selected1 = function (sa) {
      return sa.length
    }
    // 3 in 2
    this.before3selected2 = this.after3selected2 = this.in3selected2 = function (sa) {
      return combination(sa, 2).length
    }
    // 3星直选
    this.before3directly = this.after3directly = this.in3directly = function (sa) {
      return permutate(sa).length
    }
    // 3星直选和值
    this.before3directlySum = this.after3directlySum = this.in3directlySum = function (sa) {
      var counts = [1, 3, 6, 10, 15, 21, 28, 36, 45, 55, 63, 69, 73, 75, 75, 73, 69, 63, 55, 45, 36, 28, 21, 15, 10, 6, 3, 1]
      var count = 0
      for (var i = 0; i < sa.length; i++) {
        count += counts[sa[i]]
      }
      return count
    }
    // 3星组选和值
    this.before3combinationSum = this.after3combinationSum = this.in3combinationSum = function (sa) {
      var counts = [1, 2, 2, 4, 5, 6, 8, 10, 11, 13, 14, 14, 15, 15, 14, 14, 13, 11, 10, 8, 6, 5, 4, 2, 2, 1]
      var count = 0
      for (var i = 0; i < sa.length; i++) {
        count += counts[sa[i]]
      }
      return count
    }
    // 3星和值尾数
    this.before3sumMantissa = this.after3sumMantissa = this.in3sumMantissa = function (sa) {
      return sa.length
    }
    // 3星跨度
    this.before3span = this.after3span = this.in3span = function (sa) {
      var counts = [10, 54, 96, 126, 144, 150, 144, 126, 96, 54]
      var count = 0
      for (var i = 0; i < sa.length; i++) {
        count += counts[sa[i]]
      }
      return count
    }
    // 3星组3
    this.before3combination3 = this.after3combination3 = this.in3combination3 = function (sa) {
      return combination(sa, 2).length * 2
    }
    // 3星组6
    this.before3combination6 = this.after3combination6 = this.in3combination6 = function (sa) {
      return combination(sa, 3).length
    }
    // 3星特殊
    this.before3special = this.after3special = this.in3special = function (sa) {
      return sa.length
    }
    // 3星属性
    this.before3attribute = this.after3attribute = this.in3attribute = function (sa) {
      return permutate(sa).length
    }
    // 4星不定位 1码
    this.before4selected1 = this.after4selected1 = this.in4selected1 = function (sa) {
      return sa.length
    }
    // 4星不定位 2码
    this.before4selected2 = this.after4selected2 = this.in4selected2 = function (sa) {
      return combination(sa, 2).length
    }
    // 5星不定位 1码
    this.notLocationSelected1 = function (sa) {
      return sa.length
    }
    // 5星不定位 2码
    this.notLocationSelected2 = function (sa) {
      return combination(sa, 2).length
    }
    // 5星不定位 3码
    this.notLocationSelected3 = function (sa) {
      return combination(sa, 3).length
    }
    // 5星直选
    this.fiveStarDirectly = function (sa) {
      return permutate(sa).length
    }
    // 4星直选
    this.fourStarDirectly = this.before4StarDirectly = function (sa) {
      return permutate(sa).length
    }

  },
  ElevenPickFiveCalculator: function () {
    // 接口方法
    this.calculate = function (methodName, selectedArray) {
      try {
        return eval("this." + methodName + '(selectedArray)')
      } catch (e) {
        console.log(e)
      }
    }

    /**
     * 任选胆拖 - 任选二中二
     * @param selectedNumbers
     * @return
     */
    this.duplex_in_ = function (sa, count) {
      if (sa[0].length == 0) {
        return 0
      }
      if (sa[0].length + sa[1].length < count) {
        return 0
      }
      var courageNumber = sa[0]
      var pullNumbers = sa[1]
      if (courageNumber.length == (count - 1)) return pullNumbers.length
      // console.log(pullNumbers)
      // console.log(combination(pullNumbers, count-courageNumber.length))
      return combination(pullNumbers, count - courageNumber.length).length
    }
    this.duplex2in2 = function (sa) {
      if (sa[0].length == 0) {
        return 0
      }
      return sa[1].length
    }
    this.duplex3in3 = function (sa) {
      if (sa[0].length == 0) {
        return 0
      }
      if (sa[0].length + sa[1].length < 3) {
        return 0
      }
      var courageNumber = sa[0]
      var pullNumbers = sa[1]
      if (courageNumber.length == 2) return pullNumbers.length
      return combination(pullNumbers, 2).length
    }
    this.duplex4in4 = function (sa) {
      return this.duplex_in_(sa, 4)
    }
    this.duplex5in5 = function (sa) {
      return this.duplex_in_(sa, 5)
    }
    this.duplex6in5 = function (sa) {
      return this.duplex_in_(sa, 6)
    }
    this.duplex7in5 = function (sa) {
      return this.duplex_in_(sa, 7)
    }
    this.duplex8in5 = function (sa) {
      return this.duplex_in_(sa, 8)
    }
    /**
     * 任选二中二
     * @param selectedNumbers
     * @return
     */
    this.optional2in2 = function (sa) {
      return combination(sa, 2).length
    }
    this.optional3in3 = function (sa) {
      return combination(sa, 3).length
    }
    this.optional4in4 = function (sa) {
      return combination(sa, 4).length
    }
    this.optional5in5 = function (sa) {
      return combination(sa, 5).length
    }
    this.optional6in5 = function (sa) {
      return combination(sa, 6).length
    }
    this.optional7in5 = function (sa) {
      return combination(sa, 7).length
    }
    this.optional8in5 = function (sa) {
      return combination(sa, 8).length
    }
    this.locationCourage = function (sa) {
      var count = 0
      for (var i = 0; i < sa.length; i++) {
        for (var y = 0; y < sa[i].length; y++) {
          count++
        }
      }
      return count
    }
    /*二星直选*/
    this.before2directly = this.after2directly = function (sa) {
      //不重复号码
      if (sa.length < 2) {
        return 0
      }
      var arr = simplify(sa) //得到一维数组，去掉重复值
      for (var i = arr.length - 1; i >= 0; i--) {
        var each = arr[i]
        var n = each.split(",")
        for (var j = 0; j < n.length; j++) {
          if (n[j] == n[j + 1]) {
            arr.splice(i, 1)
          }
        }
      }
      // console.log(arr)
      return arr.length
      // return permutate(sa).length
    }
    /*二星组选*/
    this.before2combination = this.after2combination = function (sa) {

      return combination(sa, 2).length
    }
    /*二星胆拖*/
    this.before2duplex = this.after2duplex = function (sa) {
      if (sa[0].length == 0) {
        return 0
      }
      return sa[1].length
    }
    /*三星直选*/
    this.before3directly = this.middle3directly = this.after3directly = function (sa) {
      //不重复号码
      if (sa.length < 3) {
        return 0
      }
      var arr = simplify(sa)
      for (var i = arr.length - 1; i >= 0; i--) {
        var each = arr[i]
        var n = each.split(",")
        if (isRepeat(n)) {
          arr.splice(i, 1)
        }
      }
      // console.log(arr)
      return arr.length
      // return permutate(sa).length
    }
    /*三星组选*/
    this.before3combination = this.middle3combination = this.after3combination = function (sa) {
      return combination(sa, 3).length
    }
    /* 不定位 */
    this.before3NotLocation = this.middle3NotLocation = this.after3NotLocation = function (sa) {
      return sa.length
    }
    /* 三码胆拖 */
    this.before3duplex = this.middle3duplex = this.after3duplex = function (sa) {
      if (sa[0].length == 0) {
        return 0
      }
      if (sa[0].length + sa[1].length < 3) {
        return 0
      }
      var courageNumber = sa[0]
      var pullNumbers = sa[1]
      var count = pullNumbers.length
      if (courageNumber.length === 2) return pullNumbers.length
      return combination(pullNumbers, 2).length
    }
  },
  QuickThreeCalculator: function () {
    // 接口方法
    this.calculate = function (methodName, selectedArray) {
      // console.log(methodName+"//"+selectedArray)
      try {
        return eval("this." + methodName + '(selectedArray)')
      } catch (e) {
        console.log(e)
      }
    }
    /**
     * 和值
     */
    this.sum = function (sa) {
      // console.log(sa)
      return sa.length
    }
    /**
     * 大小单双
     */
    this.attribute = function (sa) {
      return sa.length
    }
    /**
     * 三不同号 - 胆拖
     */
    this.notSame3duplex = function (sa) {
      if (sa[0].length == 0) {
        return 0
      }
      if (sa[0].length + sa[1].length < 3) {
        return 0
      }
      var courageNumber = sa[0]
      var pullNumbers = sa[1]
      var count = pullNumbers.length
      if (courageNumber.length === 2) return pullNumbers.length
      return combination(pullNumbers, 2).length
    }
    /**
     * 三不同号 - 标准
     */
    this.notSame3 = function (sa) {
      return combination(sa, 3).length
    }
    /**
     * 二不同号 - 胆拖
     */
    this.notSame2duplex = function (sa) {
      if (sa[0].length == 0) {
        return 0
      }
      if (sa[0].length + sa[1].length < 2) {
        return 0
      }
      return sa[1].length
    }
    /**
     * 二不同号 - 标准 same3single
     */
    this.notSame2 = function (sa) {
      // return sa.length
      return combination(sa, 2).length
    }
    /**
     * 三同号 - 单选
     */
    this.same3single = function (sa) {
      return sa.length
    }
    /**
     * 三同号 - 通选
     */
    this.same3All = function (sa) {
      return 1
    }
    /**
     * 二同号 - 单选
     */
    this.same2single = function (sa) {
      if (sa[0].length + sa[1].length < 2) {
        return 0
      }
      return permutate(sa).length
    }
    /**
     * 二同号 - 多选
     */
    this.same2double = function (sa) {
      return sa.length
    }
    /**
     * 三连号通选
     */
    this.straight = function (sa) {
      return 1
    }
  },
  SevenStarCalculator: function () {
    // 接口方法
    this.calculate = function (methodName, selectedArray) {
      console.log(methodName+"//"+selectedArray)
      try {
        return eval("this." + methodName + '(selectedArray)')
      } catch (e) {
        console.log(e)
      }
    }
    /**
     * 和值
     */
    // this.sum = function (sa) {
    //   // console.log(sa)
    //   return sa.length
    // }
    /**
     * 大小单双
     */
    this.attribute = function (sa) {
      return sa.length
    }
    /**
     * 定位胆
     */
    this.locationCourage = function (sa) {
      console.log(sa, '定位');
      
      var count = 0
      for (var i = 0; i < sa.length; i++) {
        for (var y = 0; y < sa[i].length; y++) {
          count++
        }
      }
      return count
    }
    this.locationCourage2 = function (sa) {
      console.log(sa);
      //TODO 组成不重复数组
      if (sa.length < 2) {
        return 0
      }
      var arr = simplify(sa) //得到一维数组，去掉重复值

      for (var i = arr.length - 1; i >= 0; i--) {
        var each = arr[i]
        var n = each.split(",")
        for (var j = 0; j < n.length; j++) {
          if (n[j] == n[j + 1]) {
            arr.splice(i, 1)
          }
        }
      }
      return arr.length
    }


    /**
     * 三不同号 - 胆拖
     */
    this.notSame3duplex = function (sa) {
      if (sa[0].length == 0) {
        return 0
      }
      if (sa[0].length + sa[1].length < 3) {
        return 0
      }
      var courageNumber = sa[0]
      var pullNumbers = sa[1]
      var count = pullNumbers.length
      if (courageNumber.length === 2) return pullNumbers.length
      return combination(pullNumbers, 2).length
    }
    /**
     * 三不同号 - 标准
     */
    this.notSame3 = function (sa) {
      return combination(sa, 3).length
    }
    /**
     * 二不同号 - 胆拖
     */
    this.notSame2duplex = function (sa) {
      if (sa[0].length == 0) {
        return 0
      }
      if (sa[0].length + sa[1].length < 2) {
        return 0
      }
      return sa[1].length
    }
    /**
     * 二不同号 - 标准 same3single
     */
    this.notSame2 = function (sa) {
      // return sa.length
      return combination(sa, 2).length
    }
    /**
     * 三同号 - 单选
     */
    this.same3single = function (sa) {
      return sa.length
    }
    /**
     * 三同号 - 通选
     */
    this.same3All = function (sa) {
      return 1
    }
    /**
     * 二同号 - 单选
     */
    this.same2single = function (sa) {
      if (sa[0].length + sa[1].length < 2) {
        return 0
      }
      return permutate(sa).length
    }
    /**
     * 二同号 - 多选
     */
    this.same2double = function (sa) {
      return sa.length
    }
    /**
     * 三连号通选
     */
    this.straight = function (sa) {
      return 1
    }
  },
  PK10Calculator: function () {
    // 接口方法
    this.calculate = function (methodName, selectedArray) {
      try {
        return eval("this." + methodName + '(selectedArray)')
      } catch (e) {
        console.log(e)
      }
    }
    // 龙虎
    this.dragonTiger = function (sa) {
      return sa.length
    }
    // 冠亚和值
    this.sum = function (sa) {
      var counts = [2, 2, 4, 4, 6, 6, 8, 8, 10, 8, 8, 6, 6, 4, 4, 2, 2]
      var count = 0
      for (var i = 0; i < sa.length; i++) {
        count += counts[sa[i]]
      }
      return count
    }
    // 大小单双
    this.attribute = this.locationCourageAttribute = function (sa) {
      console.log(sa, '')
      return sa.length
    }
    /**
     * 前一直选
     */
    this.before1directly = function (sa) {
      return sa.length
    }
    /**
     * 前二直选
     */
    this.before2directly = function (sa) {
      //TODO 组成不重复数组
      if (sa.length < 2) {
        return 0
      }
      var arr = simplify(sa) //得到一维数组，去掉重复值

      for (var i = arr.length - 1; i >= 0; i--) {
        var each = arr[i]
        var n = each.split(",")
        for (var j = 0; j < n.length; j++) {
          if (n[j] == n[j + 1]) {
            arr.splice(i, 1)
          }
        }
      }
      return arr.length
      // return permutate(sa).length
    }
    /**
     * 前三直选
     */
    this.before3directly = function (sa) {
      // return permutate(sa).length
      if (sa.length < 3) {
        return 0
      }
      var arr = simplify(sa)
      for (var i = arr.length - 1; i >= 0; i--) {
        var each = arr[i]
        var n = each.split(",")
        if (isRepeat(n)) {
          arr.splice(i, 1)
        }
      }
      // console.log(arr)
      return arr.length
    }
    /**
     * 定位胆
     */
    this.locationCourage = function (sa) {
      var count = 0
      for (var i = 0; i < sa.length; i++) {
        for (var y = 0; y < sa[i].length; y++) {
          count++
        }
      }
      return count
    }
  },
  PCEggsCalculator: function () {
    // 接口方法
    this.calculate = function (methodName, selectedArray) {
      try {
        return eval("this." + methodName + '(selectedArray)')
      } catch (e) {
        console.log(e)
      }
    }
    //特码
    this.extraNumber = function (sa) {
      return sa.length
    }
    //特码包3
    this.extraNumberSelected3 = function (sa) {
      if (sa.length < 3) return 0
      return 1
    }
    // 豹子
    this.leopard = function (sa) {
      return 1
    }
    // 波色
    this.color = function (sa) {
      return sa.length
    }
    //混合
    this.mixture = function (sa) {
      return sa.length
    }
  },
  SixMarkCalculator: function () {
    // 接口方法
    this.calculate = function (methodName, selectedArray) {
      try {
        return eval("this." + methodName + '(selectedArray)')
      } catch (e) {
        console.log(e)
      }
    }
    // 大小单双
    this.attribute = function (sa) {
      return sa.length
    }
    //七色波
    this.sevenColors = function (sa) {
      return sa.length
    }
    // 二连肖 二连尾
    this.linkZodiac2 = this.linkTrail2 = function (sa) {
      return combination(sa, 2).length
    }
    // 三连肖 三连尾
    this.linkZodiac3 = this.linkTrail3 = function (sa) {
      return combination(sa, 3).length
    }
    // 四连肖 四连尾
    this.linkZodiac4 = this.linkTrail4 = function (sa) {
      return combination(sa, 4).length
    }
    // 五连肖 五连尾
    this.linkZodiac5 = this.linkTrail5 = function (sa) {
      return combination(sa, 5).length
    }
    // 二合肖
    this.combineZodiac2 = function (sa) {
      return combination(sa, 2).length
    }
    // 三合肖
    this.combineZodiac3 = function (sa) {
      return combination(sa, 3).length
    }
    // 四合肖
    this.combineZodiac4 = function (sa) {
      return combination(sa, 4).length
    }
    // 五合肖
    this.combineZodiac5 = function (sa) {
      return combination(sa, 5).length
    }
    // 六合肖
    this.combineZodiac6 = function (sa) {
      return combination(sa, 6).length
    }
    // 七合肖
    this.combineZodiac7 = function (sa) {
      return combination(sa, 7).length
    }
    // 八合肖
    this.combineZodiac8 = function (sa) {
      return combination(sa, 8).length
    }
    // 九合肖
    this.combineZodiac9 = function (sa) {
      return combination(sa, 9).length
    }
    // 十合肖
    this.combineZodiac10 = function (sa) {
      return combination(sa, 10).length
    }
    // 十一合肖
    this.combineZodiac11 = function (sa) {
      // console.log(sa)
      // console.log(combination(sa, 11))
      return combination(sa, 11).length
    }
    // 正肖
    this.positiveZodiac = function (sa) {
      return sa.length
    }
    // 自选不中 六不中
    this.optionalImproper6 = function (sa) {

      return combination(sa, 6).length
    }
    // 自选不中 七不中
    this.optionalImproper7 = function (sa) {
      return combination(sa, 7).length
    }
    // 自选不中 八不中
    this.optionalImproper8 = function (sa) {
      return combination(sa, 8).length
    }
    // 自选不中 九不中
    this.optionalImproper9 = function (sa) {
      return combination(sa, 9).length
    }
    // 自选不中 十不中
    this.optionalImproper10 = function (sa) {
      return combination(sa, 10).length
    }
    // 自选不中 十一不中
    this.optionalImproper11 = function (sa) {
      // console.log(sa)
      return combination(sa, 11).length
    }
    // 正码1-6
    this.positiveCode1 = this.positiveCode2 = this.positiveCode3 = this.positiveCode4 = this.positiveCode5 = this.positiveCode6 = function (sa) {
      return sa.length
    }
    // 五行
    this.fiveElements = function (sa) {
      return sa.length
    }
    // 三中二 三中三
    this.selected3in2 = this.selected3in3 = function (sa) {
      return combination(sa, 3).length
    }
    // 二全中 二中特 二码特串
    this.selected2in2 = this.selected2inExtra = this.selected2inBunch = function (sa) {
      return combination(sa, 2).length
    }
    // 四全中
    this.selected4in4 = function (sa) {
      return combination(sa, 4).length
    }
    // 平特一肖 平特一尾 特肖 正码 色波 特码 头尾数
    this.selected1zodiac = this.selected1trail = this.extraZodiac = this.positiveCode =
      this.color = this.extraCode = this.extraCodeA = this.extraCodeB = this.headAndTrail = this.positiveCode1Extra =
      this.positiveCode2Extra = this.positiveCode3Extra = this.positiveCode4Extra =
      this.positiveCode5Extra = this.positiveCode6Extra = this.totalZodiac = function (sa) {
        return sa.length
      }
  },
  ThreeNumbersCalculator: function () {
    // 接口方法
    this.calculate = function (methodName, selectedArray) {
      return eval("this." + methodName + '(selectedArray)')
    }
    // 定位胆
    this.locationCourage = function (sa) {
      var count = 0
      for (var i = 0; i < sa.length; i++) {
        for (var y = 0; y < sa[i].length; y++) {
          count++
        }
      }
      return count
    }
    // 二码 - 大小单双
    this.before2attribute = this.after2attribute = function (sa) {
      // if (sa.length == 1)
      // 	return sa.length
      // else
      var isArray = function (o) {
        return Object.prototype.toString.call(o) === '[object Array]'
      }
      if (isArray(sa[0]) && sa[1] && isArray(sa[1])) {
        return permutate(sa).length
      } else {
        return sa.length
      }

    }
    // 二码 - 直选
    this.before2directly = this.after2directly = function (sa) {
      return permutate(sa).length
    }
    // 二码 - 组选
    this.before2combination = this.after2combination = function (sa) {
      return combination(sa, 2).length
    }
    // 直选
    this.directly = function (sa) {
      return permutate(sa).length
    }

    // 直选和值
    this.directlySum = function (sa) {
      var counts = [1, 3, 6, 10, 15, 21, 28, 36, 45, 55, 63, 69, 73, 75, 75, 73, 69, 63, 55, 45, 36, 28, 21, 15, 10, 6, 3, 1]
      var count = 0
      for (var i = 0; i < sa.length; i++) {
        count += counts[sa[i]]
      }
      return count
    }
    // 组3
    this.combination3 = function (sa) {
      return combination(sa, 2).length * 2
    }
    // 组3和值
    this.combination3Sum = function (sa) {
      // var counts = [1, 2, 1, 3, 3, 3, 4, 5, 4, 5, 5, 4, 5, 5, 4, 5, 5, 4, 5, 4, 3, 3, 3, 1, 2, 1]
      // var counts = [1, 2, 1, 3, 3, 3, 4, 5, 4, 5, 5, 4, 10, 9, 8, 7, 5, 4, 3, 2, 1, 1]
      /* start try again */
      // var counts = [1, 2, 2, 4, 5, 6, 8, 10, 11, 13, 14, 14, 15, 15, 14, 14, 13, 11, 10, 8, 6, 5, 4, 2, 2, 1]
      // var count = 0
      // for (var i = 0 i < sa.length i++) {
      // 	// console.log(sa[i])
      // 	// console.log(counts[sa[i]])
      // 	count += counts[sa[i]]
      // }
      // return count
      /* end */
      var counts = []
      var min = 0,
        max = 9
      for (var i = min; i <= max; i++) {
        for (var j = min; j <= max; j++) {
          for (var k = min; k <= max; k++) {
            if (i == j && k != j) {
              counts.push(i + j + k)
            }
          }
        }
      }
      // console.log(counts)
      var count = 0
      var arr = []
      // arr = duplicate(counts)
      for (var i = 1; i <= 26; i++) {
        var sum = 0
        for (var j = 0; j < counts.length; j++) {
          var e = counts[j]
          if (e == i) {
            ++sum
          }
        }
        arr.push(sum)
      }
      // console.log(arr)
      for (var i = 0; i < sa.length; i++) {
        var e = sa[i]
        count += arr[e]
      }
      // console.log(count)
      return count
    }
    // 组6
    this.combination6 = function (sa) {
      return combination(sa, 3).length
    }
    // 组6和值
    this.combination6Sum = function (sa) {
      var counts = [1, 1, 2, 3, 4, 5, 7, 8, 9, 10, 10, 10, 10, 9, 8, 7, 5, 4, 3, 2, 1, 1]
      var count = 0
      // for(var i=0 i<sa.length i++) {
      // 	count += this.com6sum(sa[i])
      // }
      for (var i = 0; i < sa.length; i++) {
        var e = sa[i]
        count += counts[e]
      }
      return count
    }

    this.com6sum = function (number) {
      if (number == 3 || number == 4 || number == 23 || number == 24) return 1
      else if (number == 5 || number == 22) return 2
      else if (number == 6 || number == 21) return 3
      else if (number == 7 || number == 20) return 4
      else if (number == 8 || number == 19) return 5
      else if (number == 9 || number == 18) return 7
      else if (number == 10 || number == 17) return 8
      else if (number == 11 || number == 16) return 9
      else if (number == 12 || number == 13 || number == 14 || number == 15) return 10
      return 1
    }
    this.notLocationSelected1 = function (sa) {
      return sa.length
    }
    this.notLocationSelected2 = function (sa) {
      if (sa.length < 2) {
        return 0
      }
      return combination(sa, 2).length
    }
  }
}
export default algorithms
