/*
 * @Author: your name
 * @Date: 2019-11-09 16:12:50
 * @LastEditTime: 2019-11-12 14:38:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cp8h5\vue\src\components\buyMall\lottery.js
 */
import { getPlatformApi } from 'Plugins/api'
const lotteryRule = {
  showData: function () {
    getPlatformApi({ platformType: 'lottery', type: 1 }).then(res => {
      console.log(res)
      return res
      // if (res.code === 0) {
      //   return res
      // }
    })
  }
}
export { lotteryRule }
