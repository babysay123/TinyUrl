/*
 * @Author: your name
 * @Date: 2019-10-30 15:17:43
 * @LastEditTime: 2019-10-31 19:50:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cp8h5\vue\src\plugins\api\report\index.js
 */

import _axios from 'Plugins/axios'
export const GlobalReport = params => {
  return _axios.postOnce('/agent/subordinate/global_report.do', params || {})
}
