<template>
  <section>
    <ul ref="extendBox" class="fw roomSendMoreBox">
      <li class="room-send-more-box dInV pr">
        <img src="../../../assets/images/chatroom/chat_photo.png" class="room-send-more-icon" />
        <input
          id="flie"
          ref="flie"
          type="file"
          accept="image/png, image/gif, image/jpeg"
          value
          @change="imgEvent"
        />
        照片
      </li>
      <li class="room-send-more-box dInV pr">
        <img src="../../../assets/images/chatroom/foote8.png" class="room-send-more-icon" />
        <input
          id="camera"
          ref="camera"
          runat="server"
          type="file"
          accept="image/*"
          capture="camera"
          value
          @change="imgEvent"
        />
        拍摄
      </li>
      <li
        v-if="init.message.member.type !== -1"
        class="room-send-more-box dInV"
        @click="sendHbo(6)"
      >
        <img src="../../../assets/images/chatroom/foote3.png" class="room-send-more-icon" />
        红包
      </li>
      <li
        class="room-send-more-box dInV"
        @click="sendHbo(8)"
        v-if="purive(init.message.member.authority, 9)"
      >
        <img src="../../../assets/images/chatroom/foote5.png" class="room-send-more-icon" />
        专员红包
      </li>
      <li
        class="room-send-more-box dInV"
        v-if="purive(init.message.member.authority, 8)"
        @click="switchIdentity"
      >
        <img src="../../../assets/images/chatroom/foote9.png" class="room-send-more-icon" />
        切换身份
      </li>
      <li
        class="room-send-more-box dInV"
        v-if="purive(chatRoom.roomAuthority, 0)"
        @click="bannedList('bannedList')"
      >
        <img src="../../../assets/images/chatroom/foote6.png" class="room-send-more-icon" />
        禁言列表
      </li>
      <li
        class="room-send-more-box dInV"
        v-if="purive(chatRoom.roomAuthority, 1)"
        @click="actionBanned()"
      >
        <img src="../../../assets/images/chatroom/foote2.png" class="room-send-more-icon" />
        {{rooms.data.enableChat ? '房间禁言' : '解除禁言'}}
      </li>
      <li
        class="room-send-more-box dInV"
        v-if="purive(chatRoom.roomAuthority, 2)"
        @click="bannedList('blackList')"
      >
        <img src="../../../assets/images/chatroom/foote1.png" class="room-send-more-icon" />
        黑名单
      </li>
      <li
        class="room-send-more-box dInV"
        v-if="purive(chatRoom.roomAuthority, 4)"
        @click="actionDelectAll"
      >
        <img src="../../../assets/images/chatroom/foote7.png" class="room-send-more-icon" />
        删除消息
      </li>
      <li
        class="room-send-more-box dInV"
        v-if="purive(chatRoom.roomAuthority, 3)"
        @click="deleteRoom"
      >
        <img src="../../../assets/images/chatroom/foote4.png" class="room-send-more-icon" />
        解散房间
      </li>
      <li
        class="room-send-more-box dInV"
        v-if="init.message.member.type !== -1"
        @click="bannedList('attentionList')"
      >
        <!--v-if="purive(authority, 5)"-->
        <img src="../../../assets/images/chatroom/chat_state.png" class="room-send-more-icon" />
        关注列表
      </li>
      <!-- v-if="purive(authority, 4)"-->
      <!-- <li class="room-send-more-box dInV" v-if="init.message.member.type !== -1" @click="bannedList('friendList')">
                        <img src="../../../assets/images/chatroom/chat_state2.png" class="room-send-more-icon">
                        好友列表
      </li>-->
    </ul>
    <!--红包 end-->
    <!--发送红包模板-->
    <RegBagSend v-if="sendHb.show" :sendHb="sendHb" :rooms="rooms" />
    <!-- 新tab页 黑名单 禁言列表 关注列表 好友列表  -->
    <section class="fw body" v-if="bannedListShow">
      <Head>
        <div class="play-center">
          <span v-if="bannedListType === 'blackList'">黑名单</span>
          <span v-if="bannedListType === 'bannedList'">禁言列表</span>
          <span v-if="bannedListType === 'attentionList'">关注列表</span>
          <!-- <span v-if="bannedListType === 'friendList'">好友列表</span> -->
        </div>
        <div v-if="bannedListShare" @click="confrimShare" class="play-right">确认分享</div>
      </Head>
      <!-- 根据不同的type。获取不同列表数据 -->
      <BannedList ref="confrim" :pRoomId="rooms.data.chatRoomId" :type="bannedListType"></BannedList>
    </section>
  </section>
</template>
<script>
import Head from 'Components/global/head'
import RegBagSend from 'Components/lottery/chatroom/module/regBagSend'
import BannedList from 'Components/lottery/chatroom/bannedList'
export default {
  components: {
    Head,
    RegBagSend,
    BannedList
  },
  props: {
    removeRoomHandler: Boolean, // 是否被踢出房间
    init: Object,
    rooms: Object,
    chatRoom: Object
  },
  data () {
    return {
      titleAmount: 0, // 扩展列表数量
      sendHb: { // 红包
        type: null,
        show: null
      },
      bannedListShow: false, // 新tab列表页
      bannedListType: '', // 新tab页标题
      bannedListShare: false, // 控制新tab页分享按钮
      roomsBanned: false // 房间是否禁言
    }
  },
  methods: {
    getComponentLen () {
      this.$emit('componentLen', this.titleAmount)
    },
    fileEvent () {
      let _thi = this
      _thi.imgEvent(_thi.$refs.flie)
    },
    cameraEvent () {
      let _thi = this
      _thi.imgEvent(_thi.$refs.camera)
    },
    imgEvent (obj) {
      console.log(obj, '')
      if (!this.removeRoomHandler) {
        this.$messagebox('提示', '您已被管理员踢出该房间!')
        return
      }
      if (this.init.message.member.type === -1) {
        this.$toast({
          message: '请先登录',
          position: 'bottom',
          duration: 2000
        })
        return
      }
      // else if (!_this.chatRoom.purive(_this.init.message.member.authority, 1)) {
      //   this.$toast({
      //     message: '你没有发言权限',
      //     position: 'bottom',
      //     duration: 2000
      //   })
      //   return
      // }
      // let eleFile = obj
      // 压缩图片需要的一些元素和对象
      // const reader = new FileReader()
      // const img = new Image()
      // 选择的文件对象
      const file = obj.target.files[0]
      const { type, size, name, lastModifiedDate } = file
      const formData = new FormData()
      formData.append('type', type)
      formData.append('size', size || 'image/jpeg')
      formData.append('name', name)
      formData.append('lastModifiedDate', lastModifiedDate)
      formData.append('file', file)

      this.$messagebox.confirm('确认发送图片?').then(() => {
        this.axios.post(this.Utils.chatURL('file'), formData).then(res => {
          this.$refs.flie.value = ''
          let imgData = {
            'event': 'dialogue',
            'data': {
              'chatRoomId': this.rooms.data.chatRoomId,
              'messageType': 3,
              'attachment': {
                'type': 3,
                'image': {
                  bigHeight: res.data.bigHeight,
                  bigUrl: res.data.bigUrl,
                  bigWidth: res.data.bigWidth,
                  smallHeight: res.data.smallHeight,
                  smallUrl: res.data.smallUrl,
                  smallWidth: res.data.smallWidth
                },
                'sender': {
                  'messageId': this.rooms.data.attachment.sender.messageId,
                  'userId': this.rooms.data.attachment.sender.userId,
                  'openid': this.rooms.data.attachment.sender.openid,
                  'headImg': this.rooms.data.attachment.sender.headImg,
                  'id': this.rooms.data.attachment.sender.id,
                  'nickname': this.rooms.data.attachment.sender.nickname,
                  'level': this.rooms.data.attachment.sender.level,
                  'identity': this.rooms.data.attachment.sender.identity,
                  'timestamp': this.rooms.data.attachment.sender.timestamp,
                  'showType': this.rooms.data.attachment.sender.showType
                }
              }
            }
          }
          this.chatRoom.ws.send(JSON.stringify(imgData))
        })
      })
      // 缩放图片需要的canvas
      // let canvas = document.createElement('canvas')
      // let context = canvas.getContext('2d')
      // base64地址图片加载完毕后
      // img.onload = function () {
      //   let config = {
      //     headers: {
      //       'Content-Type': 'multipart/form-data'
      //     }
      //   }
      //   let originWidth = this.width
      //   let originHeight = this.height
      // let maxWidth = originWidth
      // let maxHeight = originHeight
      // let targetWidth = originWidth
      // let targetHeight = originHeight
      // if (originWidth > maxWidth || originHeight > maxHeight) {
      //   if (originWidth / originHeight > maxWidth / maxHeight) {
      //     targetWidth = maxWidth
      //     targetHeight = Math.round(maxWidth * (originHeight / originWidth))
      //   } else {
      //     targetHeight = maxHeight
      //     targetWidth = Math.round(maxHeight * (originWidth / originHeight))
      //   }
      // }
      // canvas对图片进行缩放
      //   canvas.width = originWidth
      //   canvas.height = originHeight
      //   context.clearRect(0, 0, originWidth, originHeight)
      //   context.drawImage(img, 0, 0, originWidth, originHeight)
      //   canvas.toBlob(function (blob) {
      //     let param = new FormData()
      //     param.append('file', blob, file.name)
      //     param.append('chunk', '0')
      //     // 图片ajax上传
      //     _this.$messagebox.confirm('确认发送图片?').then(() => {
      //       _this.axios.post(_this.Utils.chatURL('file'), param, config)
      //         .then((res) => {
      //           if (res.code === 0) {
      //             let imgData = {
      //               'event': 'dialogue',
      //               'data': {
      //                 'chatRoomId': _this.rooms.data.chatRoomId,
      //                 'messageType': 3,
      //                 'attachment': {
      //                   'type': 3,
      //                   'image': {
      //                     bigHeight: res.data.bigHeight,
      //                     bigUrl: res.data.bigUrl,
      //                     bigWidth: res.data.bigWidth,
      //                     smallHeight: res.data.smallHeight,
      //                     smallUrl: res.data.smallUrl,
      //                     smallWidth: res.data.smallWidth
      //                   },
      //                   'sender': {
      //                     'messageId': _this.rooms.data.attachment.sender.messageId,
      //                     'userId': _this.rooms.data.attachment.sender.userId,
      //                     'openid': _this.rooms.data.attachment.sender.openid,
      //                     'headImg': _this.rooms.data.attachment.sender.headImg,
      //                     'id': _this.rooms.data.attachment.sender.id,
      //                     'nickname': _this.rooms.data.attachment.sender.nickname,
      //                     'level': _this.rooms.data.attachment.sender.level,
      //                     'identity': _this.rooms.data.attachment.sender.identity,
      //                     'timestamp': _this.rooms.data.attachment.sender.timestamp,
      //                     'showType': _this.rooms.data.attachment.sender.showType
      //                   }
      //                 }
      //               }
      //             }
      //             _this.chatRoom.ws.send(JSON.stringify(imgData))
      //           } else {
      //             this.$toast({
      //               message: '失败, 刷新重试',
      //               position: 'middle',
      //               duration: 1000
      //             })
      //           }
      //         })
      //         .catch(() => {
      //         })
      //     })
      //       .catch(() => {
      //       })
      //   }, file.type)
      // }
      // 文件base64化，以便获知图片原始尺寸
      // reader.onload = function () {
      //   img.src = this.result
      // }
      // file = eleFile.files[0]
      // 选择的文件是图片
      // if (file.type.indexOf('image') === 0) {
      //   reader.readAsDataURL(file)
      // }
    },
    sendHbo (type) {
      if (!this.removeRoomHandler) {
        this.$messagebox('提示', '您已被管理员踢出该房间!')
        return
      }
      if (this.init.message.member.type === -1) {
        this.$toast({
          message: '请登录后再发送红包',
          position: 'middle',
          duration: 1500
        })
      } else {
        this.sendHb.type = type
        this.sendHb.show = true
      }
    },
    purive (auth, identity) {
      let a = 1 << identity
      return (auth & (a)) === a
    },
    switchIdentity () {
      // console.log('roomId', this.rooms.data.chatRoomId)
      // console.log('roomName', this.chatRoom.roomNmae)
      // console.log('openId', this.init.message.member.openid)
      this.$router.push({
        name: 'switchIdentity',
        params: {
          roomId: this.rooms.data.chatRoomId,
          roomName: this.chatRoom.roomNmae,
          openId: this.init.message.member.openid
        }
      })
    },
    bannedList (type) {
      // console.log('list type', type)
      this.bannedListShow = true
      this.bannedListType = type
    },
    confrimShare () {
      this.$refs.confrim.forwardOne()
      this.chatRoom.forwardListCancel = []
    },
    HeadBack () {
      this.bannedListShow = false
      this.bannedListShare = false
    },
    actionBanned () {
      let _this = this
      if (_this.roomsBanned === false) {
        _this.axios.get('/cpi/room/release_shutup/' + _this.chatRoom.flag + '?roomId=' + _this.rooms.data.chatRoomId + '&openid=ALL')
          .then((res) => {
            if (res.code === 0) {
              this.$indicator.close()
              // 去掉重复的弹窗
              // this.$toast({
              //   message: '房间已解除禁言',
              //   position: 'middle',
              //   duration: 500
              // })
              _this.rooms.data.enableChat = true
              _this.roomsBanned = true
            } else {
              this.$toast({
                message: res.msg,
                position: 'middle',
                duration: 500
              })
            }
          })
          .catch(() => {
          })
      } else {
        _this.axios.get('/cpi/room/shutup/' + _this.chatRoom.flag + '?roomId=' + _this.rooms.data.chatRoomId + '&openid=ALL')
          .then(() => {
            this.$indicator.close()
            // this.$toast({
            //   message: '房间已被禁言',
            //   position: 'middle',
            //   duration: 500
            // })
            _this.rooms.data.enableChat = false
            _this.roomsBanned = false
          })
          .catch(() => {
          })
      }
    },
    actionDelectAll () {
      let _this = this
      this.$messagebox.confirm('确定删除全部消息?').then(() => {
        _this.chatRoom.ws.send(JSON.stringify({
          'event': 'deleteMessage',
          'data': {
            'roomId': _this.rooms.data.chatRoomId,
            'messageIds': 'ALL'
          },
          'msgId': Math.random().toString(36).substr(2) + '-' + Math.random().toString(36).substr(2) // 32位随机数
        }))
      })
        .catch(() => { })
    },
    deleteRoom () {
      let _this = this
      if (_this.chatRoom.purive(_this.chatRoom.roomAuthority, 3)) {
        this.$messagebox.confirm('确定要解散房间吗?').then(() => {
          _this.axios.get('/cpi/room/stop/' + _this.chatRoom.flag, {
            params: {
              roomId: _this.rooms.data.chatRoomId,
              openid: 'ALL'
            }
          })
            .then((res) => {
              if (res.code === 0) {
                this.$toast({
                  message: '房间已被解散',
                  position: 'middle',
                  duration: 1500
                })
                // _this.$router.push('/chatroom')
              } else {
                this.$toast({
                  message: res.msg,
                  position: 'middle',
                  duration: 1500
                })
              }
            })
            .catch(() => { })
        })
          .catch(() => { })
      } else {
        this.$toast({
          message: '你没有权限解散房间',
          position: 'middle',
          duration: 1500
        })
      }
    }
  },
  created () { },
  mounted () {
    let roomSendMoreBoxLeng = this.$refs.extendBox.children.length
    this.titleAmount = roomSendMoreBoxLeng
    // 目前只拆分出大于十个以上时的情况 小于此值时在room里做了判断
    if (roomSendMoreBoxLeng > 10) {
      if (roomSendMoreBoxLeng % 2 === 0) {
        this.$refs.extendBox.style.width = 20 * (roomSendMoreBoxLeng / 2) + '%'
        for (let i = 0; i < roomSendMoreBoxLeng; i++) {
          this.$refs.extendBox.children[i].style.width = 100 / (roomSendMoreBoxLeng / 2) + '%'
        }
      } else {
        this.$refs.extendBox.style.width = (20 * (roomSendMoreBoxLeng / 2)) + 10 + '%'
        for (let i = 0; i < roomSendMoreBoxLeng; i++) {
          this.$refs.extendBox.children[i].style.width = 100 / (roomSendMoreBoxLeng / 2 + 0.5) + '%'
        }
      }
    }
    this.getComponentLen()
    // console.log('init', this.init)
    // console.log('rooms', this.rooms)
    // console.log('chatRoom', this.chatRoom)
  }
}
</script>
<style lang="scss" scoped>
.roomSendMoreBox {
  margin: 0 auto;
  width: 9.6rem;
}
.room-send-more-box {
  width: 1.9rem;
  font-size: 0.35rem;
  text-align: center;
  color: #333;
}
.room-send-more-icon {
  display: block;
  margin: 0 auto;
  width: 1rem;
}
#flie {
  opacity: 0;
  position: absolute;
  width: 2rem;
  height: 2rem;
  left: 0;
  top: 0;
}
#camera,
#flie {
  opacity: 0;
  position: absolute;
  width: 2rem;
  height: 2rem;
  left: 0;
  top: 0;
}
.body {
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  max-width: 780px;
  background: #f5f4f9;
  z-index: 400;
  overflow-y: auto;
}
.play-center {
  position: absolute;
  left: 0;
  top: 0;
  line-height: 1.125rem;
  width: 100%;
  text-align: center;
  font-size: 0.35rem;
}
.play-right {
  position: absolute;
  right: 0.5rem;
  top: 0;
  font-size: 0.35rem;
  line-height: 1.125rem;
}
</style>
