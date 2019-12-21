import _axios from 'Plugins/axios'

export const roomListApi = accessToken => {
  return _axios.getFast(`/cpi/room/list/${accessToken}`)
}

export const relationManagerApi = accessToken => {
  return _axios.getFast(`/cpi/relation/manager/${accessToken}`)
}

export const shareResults = data => {
  return _axios.postOnce(`/chat_room/today_score.do?${data}`)
}
