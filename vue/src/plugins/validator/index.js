export const amountLimit = (amount, min, max) => {
  return !isNaN(amount) && +min <= amount && amount <= +max
}

export const chinese = text => {
  return /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,15}$/.test(text)
}

export const usernameValid = username => {
  return /^[a-zA-Z0-9]{4,16}$/.test(username)
}

export const passwordValid = password => {
  return /^[a-zA-Z0-9_]{6,12}$/.test(password)
}

export const repeatPwdValid = (password, repeatPwd) => {
  return passwordValid(password) && passwordValid(repeatPwd) && password === repeatPwd
}

export const qqValid = qq => {
  return /^[1-9][0-9]{4,12}$/.test(qq)
}

export const mobileValid = mobile => {
  return /^\d{11}$/.test(mobile)
}

export const wechatValid = wechat => {
  let reg = new RegExp('^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$')
  return /^[a-zA-Z\d_]{6,20}$/.test(wechat) || reg.test(wechat) || emailValid(wechat)
}

export const emailValid = email => {
  return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(email)
}

export const referrerValid = referrer => {
  return /^[1-9][0-9]{7}$/.test(referrer)
}
