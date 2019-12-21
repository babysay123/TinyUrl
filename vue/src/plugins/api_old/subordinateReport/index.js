/*
 * @Author: your name
 * @Date: 2019-11-01 16:30:06
 * @LastEditTime: 2019-11-01 16:33:06
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \cp8h5\vue\src\plugins\api\subordinateReport\subordinateReport.js
 */
import _axios from 'Plugins/axios'
export const SubordinateReport = params => {
  return _axios.postOnce('/agent/subordinate/subordinate_report.do', params || {})
}
