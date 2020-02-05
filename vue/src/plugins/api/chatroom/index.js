import _axios from '../../axios'

// chatroom socket
export const getRoomListApi = params => {
  return _axios.getFast('/chat_room/list/' + params)
}

export const enterRoomApi = params => {
  return _axios.postFast('/chat_room/entry', params || {})
}

export const leaveRoomApi = params => {
  return _axios.postFast('/chat_room/leave', params || {})
}

// 发送消息
export const sendMsgApi = params => {
  return _axios.postFast('/chat_room/send/message', params || {})
}

// 发送红包
export const sendPacketApi = params => {
  return _axios.postFast('/chat_room/send/red_packet', params || {})
}

// 上传图片
export const uploadImgApi = (params, config) => {
  return _axios.postFast('/upload/image', params || {}, config)
}

// 获取房间红包类型
export const chatRoomTypeApi = params => {
  return _axios.postFast('/chat_room/types', params || {})
}

// 创建房间
export const chatRoomCreateApi = params => {
  return _axios.postFast('/chat_room/create', params || {})
}

// 显示参数接口
// /chat_room/profile/{玩法类别 (category)}
export const chatRoomProfileApi = params => {
  return _axios.postFast('/chat_room/profile/' + params, {})
}

// 抢红包
export const robRedPacketApi = params => {
  return _axios.postFast('/chat_room/rob/red_packet/', params || {})
}
