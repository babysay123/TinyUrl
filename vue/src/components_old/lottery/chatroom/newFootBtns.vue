<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-06 15:34:43
 * @LastEditTime: 2019-06-06 15:34:43
 * @LastEditors: your name
 -->
<template>
    <section>
        <section class="room-send wrap" ref="roomSend">
            <section class="room-send-btns">
                <img src="../../../assets/images/chatroom/room-yy.png" class="room-send-gn dInV" @click="sendYy">
                <input type="text" class="room-send-text dInV" ref="sendText" value="" v-if="sendTextShow" v-model="userText" @keyup.enter="clickButton">
                <div class="room-send-yy dInV" v-if="sendYyShow" @touchstart="sendYyStart" @touchend="sendYyEnd">按住说话</div>
                <img src="../../../assets/images/chatroom/room-bq.png" class="room-send-gn dInV">
                <img src="../../../assets/images/chatroom/room-clear.png" class="room-send-gn dInV" @click="joinData.message = []">
                <section  class="room-send-gn dInV"  v-if="footerSend.sendM" @click="footerSendSendM">
                    <img src="../../../assets/images/chatroom/chat_tab_unlock.png" class="room-send-gn-s">
                </section>
                <img src="../../../assets/images/chatroom/romm-s.png" class="room-send-gn dInV" v-if="footerSend.sendS" @click="footerSendSendS">
                <img src="../../../assets/images/chatroom/room-more.png" class="room-send-gn dInV" @click="sendMoreBox">
            </section>
            <section class="room-send-more-boxs fw" v-show="moreBoxShow" :style="{height: SendMoreBoxHeight + 'rem'}">
                <mt-swipe :auto="0">
                    <mt-swipe-item>
                        <ul class="fw"  ref="roomSendMoreBox">
                            <li class="room-send-more-box dInV">
                                <img src="../../../assets/images/chatroom/chat_photo.png" class="room-send-more-icon">
                                <input id="flie" ref="flie" type="file" accept="image/png,image/gif,image/jpeg" value="" @change="imgEvent('flie')"/>
                                照片
                            </li>
                            <li class="room-send-more-box dInV pr">
                                <img src="../../../assets/images/chatroom/foote8.png" class="room-send-more-icon">
                                <input id="camera" ref="camera" runat="server" type="file" accept="image/*" capture="camera" value="" @change="imgEvent('camera')"/>
                                拍摄
                            </li>
                            <li class="room-send-more-box dInV" @click="sendHbo(6)">
                                <img src="../../../assets/images/chatroom/foote3.png" class="room-send-more-icon">
                                红包
                            </li>
                        </ul>
                    </mt-swipe-item>
                </mt-swipe>
            </section>
        </section>
    </section>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'footBtns',
  data () {
    return {
      sendYyShow: false,
      sendTextShow: true,
      userText: '',
      oneRoomData: []
    }
  },
  computed: {
    ...mapState({
      chatRoom (state) {
        return state.chatRoom
      }
    })
  },
  methods: {
    clickButton () {
      let _this = this
      let request = {
        event: 'privateChat',
        data: {
          'chatId': _this.lookData.oneRoomRes.chatId,
          'sender': _this.lookData.oneRoomRes.sender,
          'receiver': _this.lookData.oneRoomRes.receiver,
          'type': 0,
          'content': _this.userText,
          'attachment': {}
        }
      }
      let data = {
        headImg: this.Utils.Storage.get('thisInfos').headImg,
        nickname: this.Utils.Storage.get('thisInfos').nickname,
        content: _this.userText
      }
      this.Utils.Storage.save('content', _this.userText)
      _this.ws.send(JSON.stringify(request))
      _this.oneRoomData.push(data)
      _this.userText = ''
    },
    sendYy () {
      this.sendYyShow = !this.sendYyShow
      this.sendTextShow = !this.sendYyShow
    },
    imgEvent (obj) {
      let _this = this
      if (obj === 'flie') {
        obj = _this.$refs.flie
      } else if (obj === 'camera') {
        obj = _this.$refs.camera
      }
      let eleFile = obj
      // 压缩图片需要的一些元素和对象
      let reader = new FileReader()
      let img = new Image()
      // 选择的文件对象
      let file = null
      // 缩放图片需要的canvas
      let canvas = document.createElement('canvas')
      let context = canvas.getContext('2d')
      // base64地址图片加载完毕后
      img.onload = function () {
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        let originWidth = this.width
        let originHeight = this.height
        let maxWidth = 400
        let maxHeight = 400
        let targetWidth = originWidth
        let targetHeight = originHeight
        if (originWidth > maxWidth || originHeight > maxHeight) {
          if (originWidth / originHeight > maxWidth / maxHeight) {
            targetWidth = maxWidth
            targetHeight = Math.round(maxWidth * (originHeight / originWidth))
          } else {
            targetHeight = maxHeight
            targetWidth = Math.round(maxHeight * (originWidth / originHeight))
          }
        }
        // canvas对图片进行缩放
        canvas.width = targetWidth
        canvas.height = targetHeight
        context.clearRect(0, 0, targetWidth, targetHeight)
        context.drawImage(img, 0, 0, targetWidth, targetHeight)
        canvas.toBlob(function (blob) {
          let param = new FormData()
          param.append('file', blob, file.name)
          param.append('chunk', '0')
          // 图片ajax上传
          this.$messagebox.confirm('确认发送图片?').then(() => {
            _this.axios.post('/cpi/common/upload/image', param, config)
              .then((res) => {
                if (res.code === 0) {
                  let imgData = {
                    'event': 'dialogue',
                    'data': {
                      'chatRoomId': _this.rooms.data.chatRoomId,
                      'messageType': 3,
                      'attachment': {
                        'type': 1,
                        'image': {
                          bigHeight: res.data[0].bigHeight,
                          bigUrl: res.data[0].bigUrl,
                          bigWidth: res.data[0].bigWidth,
                          smallHeight: res.data[0].smallHeight,
                          smallUrl: res.data[0].smallUrl,
                          smallWidth: res.data[0].smallWidth
                        },
                        'sender': {
                          'messageId': _this.rooms.data.attachment.sender.messageId,
                          'userId': _this.rooms.data.attachment.sender.userId,
                          'openid': _this.rooms.data.attachment.sender.openid,
                          'id': _this.rooms.data.attachment.sender.id,
                          'nickname': _this.rooms.data.attachment.sender.nickname,
                          'level': _this.rooms.data.attachment.sender.level,
                          'identity': _this.rooms.data.attachment.sender.identity,
                          'timestamp': _this.rooms.data.attachment.sender.timestamp,
                          'showType': _this.rooms.data.attachment.sender.showType
                        }
                      }
                    }
                  }
                  _this.ws.send(JSON.stringify(imgData))
                } else {
                  this.$toast({
                    message: '获取失败, 刷新重试',
                    position: 'middle',
                    duration: 1000
                  })
                }
              })
              .catch(() => {
              })
          })
            .catch(() => {
            })
        }, file.type)
      }
      // 文件base64化，以便获知图片原始尺寸
      reader.onload = function () {
        img.src = this.result
      }
      file = eleFile.files[0]
      // 选择的文件是图片
      if (file.type.indexOf('image') === 0) {
        reader.readAsDataURL(file)
      }
    }
  }
}
</script>

<style scoped>
    .room-send{position:fixed;bottom:0;width:100%;z-index:300;line-height:1.125rem;background:#fff;text-align:center;}
    .room-send-btns{}
    .room-send-text,
    .room-send-yy{width:55%;height:.85rem;border:1px solid #BFBFBF;border-radius:.1rem;box-sizing:border-box;}
    .room-send-yy{background:#bfbfbf;text-align:center;line-height:.85rem;font-size:.45rem;}
    .room-send-submit{margin-left:.15rem;text-align:center;line-height:.8rem;color:#fff;width:2rem;height:.8rem;background:#5339C6;border-radius:.1rem;}
    .room-send-gn{width:.75rem;height:.75rem;margin:0 .03rem;}
    .room-send-gn-s{width:.6rem;height:.8rem;margin:0 auto;}
    .tl{text-align:left;}
    .mint-loadmore-text{color:#000;}
    .room-send-more-boxs{padding:.4rem .3rem 0;height:2.2rem;text-align:left;}
    .room-send-more-box{width:20%;font-size:.35rem;text-align:center;color:#333;}
    .room-send-more-icon{display:block;margin:0 auto;width:1rem;}
</style>
