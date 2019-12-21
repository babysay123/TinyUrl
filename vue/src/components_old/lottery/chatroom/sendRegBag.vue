<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-06 15:34:43
 * @LastEditTime: 2019-08-13 14:25:24
 * @LastEditors: Please set LastEditors
 -->
<template>
  <section class="send-hbbg send-hbbg2">
    <!--发送红包模块-->
    <section class="send-hbbg-box dInV">
      <div class="beeting-look-title">
        <span v-if="sendHb.type === 6 ">发送普通红包</span>
        <span v-else-if="sendHb.type === 7">发送炫耀红包</span>
        <span v-else-if="sendHb.type === 8">发送专员红包</span>
        <span class="beeting-look-close" @click="close">X</span>
      </div>
      <ul class="fw w100">
        <li class="send-hbbg-list">
          <span class="send-hbbg-list-left">总金额</span>
          <input type="text" class="send-hbbg-text" placeholder="请输入红包金额" v-model="sendHb.money" maxlength="9">
        </li>
        <li class="send-hbbg-list">
          <span class="send-hbbg-list-left">红包个数</span>
          <input type="text" class="send-hbbg-text" placeholder="请输入红包个数" v-model="sendHb.number">
        </li>
        <li class="send-hbbg-list">
          <span class="send-hbbg-list-left">我的发言</span>
          <input type="text" class="send-hbbg-text" placeholder="请输入要说的话(不超过15个汉字)" v-model="sendHb.msg" maxlength="16">
        </li>
      </ul>
      <button class="send-hbbg-btn" @click="regBag(sendHb.type)">发送</button>
    </section>
  </section>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'sendRegBag',
  props: ['data'],
  data () {
    return {
      sendHb: {
        type: null,
        show: null,
        userId: '',
        money: '',
        number: '',
        msg: '',
        bg: {
          commonRedPacket: 'url(' + require('../../../assets/images/chatroom/room-hbb.png') + ')',
          flauntRedPacket: 'url(' + require('../../../assets/images/chatroom/room-hbb.png') + ')',
          speciallyRedPacket: 'url(' + require('../../../assets/images/chatroom/chat_ZYred.png') + ')'
        }
      }
    }
  },
  computed: {
    ...mapState({
      chatRoom (state) {
        return state.chatRoom
      },
      init (state) {
        return state.chatRoom.init
      }
    })
  },
  methods: {
    close () {
      this.$emit('closeH')
    },
    regBag (regType) {
      let _this = this
      // if (_this.sendHb.money * 1 < 5 || _this.sendHb.money * 1 > 30000) {
      //   this.$toast({
      //     message: '输入金额5 - 30000',
      //     duration: 1000
      //   })
      //   return
      // }
      // if (_this.sendHb.number * 1 < 1 || _this.sendHb.number * 1 > 300) {
      //   this.$toast({
      //     message: '输入红包个数1 - 300',
      //     duration: 1000
      //   })
      //   return
      // }
      if (_this.sendHb.msg.length < 1 || _this.sendHb.msg.length > 15) {
        this.$toast({
          message: '红包内容1 - 15个汉字',
          duration: 1000
        })
        return
      }
      _this.axios.get('/chat_room/red_packet.do', {
        params: {
          roomId: _this.rooms.data.chatRoomId,
          total: _this.regBagSend.money,
          number: _this.regBagSend.number,
          message: _this.regBagSend.msg,
          theme: '1',
          openId: _this.init.message.member.openid,
          type: regType
        }
      })
        .then((res) => {
          if (res.code === 0) {
            _this.sendHb.show = false
            this.$toast({
              message: '红包已发送',
              duration: 1000
            })
            _this.sendHb.money = _this.sendHb.number = _this.sendHb.msg = ''
          }
        })
        .catch(() => {
          this.$toast({
            message: '红包送失败, 请重试',
            duration: 1000
          })
        })
    }
  }
}
</script>

<style scoped>
  .send-hbbg{position:fixed;top:0;z-index:100;max-width:780px;margin:0 auto;width:100%;height:100%;background:rgba(0, 0, 0, .6);}
  .send-hbbg2{text-align:center;}
  .send-hbbg2:before{content:'';display:inline-block;vertical-align:middle;width:0;height:100%;}
  .send-hbbg-box{background:#fff;margin:0;padding-bottom:.3rem;overflow:hidden;width:9rem;border-radius:.2rem;}
  .send-hbbg-box .beeting-look-title{background:#F6F6F6;color:#333;}
  .send-hbbg-list{overflow:hidden;padding:0 3%;height:1rem;line-height:1rem;border-bottom:1px solid #F6F6F6;font-size:.35rem;}
  .send-hbbg-list-left{float:left;width:20%;text-align:center;color:#333;}
  .send-hbbg-text{float:left;width:70%;margin-left:4%;line-height:1rem;font-size:.35rem;color:#333;border:0;}
  .send-hbbg-btn{display:block;width:90%;margin:.3rem auto 0;height:1rem;line-height:1.1rem;background:#DE1313;color:#fff;font-size:.35rem;text-align:center;}
</style>
