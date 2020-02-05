/* */
import _axios from 'Plugins/axios'

// 登录接口
export const loginApi = params => {
  return _axios.postOnce('/passport/member/login', params || {})
}

// 注册配置
// export const registerConfigApi = params => {
//   return _axios.getOnce('/agent/generalize/register_options.do', params || {})
// }

// 注册提交
export const registerApi = params => {
  return _axios.postOnce('/passport/member/registry', params || {})
}

// 验证码
// export const verificationApi = params => {
//   return _axios.postOnce('/passport/validate_image', params || {})
// }

export const mailvalidApi = params => {
  return _axios.post('/passport/send_msm', params || {})
}
