/*
 * @Author: your name
 * @Date: 2019-09-16 14:07:14
 * @LastEditTime: 2019-11-14 20:16:25
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \cp8h5\vue\src\plugins\moment\index.js
 */
import moment from 'moment'

export default type => {
  let begin = 0
  let end = 0
  switch (type) {
    case 'all':
      begin = 0
      end = moment().endOf('day').valueOf()
      break
    case 'today':
      begin = moment().startOf('day').valueOf()
      end = moment().endOf('day').valueOf()
      break
    case 'yesterday':
      begin = moment().startOf('day').subtract(1, 'days').valueOf()
      end = moment().endOf('day').subtract(1, 'days').valueOf()
      break
    case 'week':
      begin = moment().startOf('day').subtract(6, 'days').valueOf()
      end = moment().endOf('day').valueOf()
      break
    case 'thisWeek':
      begin = moment().startOf('week').subtract(-1, 'days').valueOf()
      end = moment().endOf('week').subtract(-1, 'days').valueOf()
      break
    case 'month':
      begin = moment().startOf('month').valueOf()
      end = moment().endOf('month').valueOf()
      break
    case 'lastMonth':
      begin = moment().startOf('month').subtract(1, 'month').valueOf()
      end = moment().subtract(1, 'month').endOf('month').valueOf()
      break
    case 'thirtyDays':
      begin = moment().startOf('day').subtract(29, 'days').valueOf()
      end = moment().endOf('day').valueOf()
      break
  }
  return { begin, end }
}
