/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-16 14:07:14
 * @LastEditTime: 2019-10-05 11:43:22
 * @LastEditors: Please set LastEditors
 */
import _axios from 'Plugins/axios'

// 登录接口
export const loginApi = params => {
  return _axios.postOnce('/passport/login.do', params || {})
}

// 注册配置
export const registerConfigApi = params => {
  return _axios.getOnce('/agent/generalize/register_options.do', params || {})
}

// 注册提交
export const registerApi = params => {
  return _axios.postOnce('/passport/register.do', params || {})
}
// 验证码
export const verificationApi = params => {
  return _axios.postOnce('/passport/validate_image.do', params || {})
}
