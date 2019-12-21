<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-06 15:34:43
 * @LastEditTime: 2019-08-22 16:27:51
 * @LastEditors: Please set LastEditors
 -->
<template>
  <section class="send-hbbg send-hbbg2">
    <section class="send-hbbg-box dInV">
      <div class="beeting-look-title">
        <span v-if="sendHb.type === 6">发送普通红包</span>
        <span v-if="sendHb.type === 8">发送专员红包</span>
        <span v-if="rooms.chatId">发送个人红包</span>
        <span class="beeting-look-close" @click="sendHb.show = false">X</span>
      </div>
      <ul class="fw w100">
        <li class="send-hbbg-list">
          <span class="send-hbbg-list-left">总金额</span>
          <input
            type="text"
            oninput = "value=value.replace(/[^\d.]/g,'')"
            class="send-hbbg-text"
            placeholder="请输入红包金额"
            v-model="regBagSend.money" maxlength="9">
        </li>
        <li v-if="!rooms.chatId" class="send-hbbg-list">
          <span class="send-hbbg-list-left">红包个数</span>
          <input
            type="tel"
            class="send-hbbg-text"
            oninput = "value=value.replace(/[^\d]/g,'')"
            placeholder="请输入红包个数"
            v-model="regBagSend.number">
        </li>
        <li
          class="send-hbbg-list"
        >
          <span class="send-hbbg-list-left">我的发言</span>
          <input
            type="text"
            class="send-hbbg-text"
            placeholder="请输入要说的话(不超过15个汉字)"
            v-model="regBagSend.msg">
        </li>
        <li v-if="sendHb.type === 8" class="send-hbbg-list">
          <span class="send-hbbg-list-left">红包主题</span>
          <input type="text" class="send-hbbg-text" placeholder="请输入要说的话(不超过15个汉字)" v-model="regBagSend.msg">
        </li>
        <li v-if="!rooms.chatId" class="send-hbbg-list">
          直播间彩友领取的金额随机
        </li>
      </ul>
      <button class="send-hbbg-btn" @click="regBag(sendHb.type)">确定</button>
    </section>
  </section>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'regBagSend',
  props: ['sendHb', 'rooms'],
  data () {
    return {
      regBagSend: {
        userId: '',
        money: '',
        number: '',
        msg: ''
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
  created () {
    if (this.sendHb.type === 6) {
      this.regBagSend.msg = '恭喜发财, 大吉大利'
    } else if (this.sendHb.type === 8) {
      this.regBagSend.msg = `关注${this.Utils.projectName || '彩票8'}聊天室, 每天惊喜不断!`
    }
  },
  methods: {
    regBag (regType) {
      this.$indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      })
      // if (this.regBagSend.money * 1 < 2 || this.regBagSend.money * 1 > 1000) {
      //   this.$toast({
      //     message: '输入金额2 - 1000',
      //     duration: 1000
      //   })
      //   return
      // }
      // if (!this.rooms.chatId && (this.regBagSend.number * 1 < 1 || this.regBagSend.number * 1 > 200)) {
      //   this.$toast({
      //     message: '输入红包个数1 - 200',
      //     duration: 1000
      //   })
      //   return
      // }
      if (this.sendHb.type === 6) {
        if (this.regBagSend.msg.length < 1 || this.regBagSend.msg.length > 15) {
          this.$toast({
            message: '红包内容1 - 15个汉字',
            duration: 1000
          })
          return
        }
      }
      let theme = ''
      let _special = false
      if (this.sendHb.type === 8) {
        theme = `关注${this.Utils.projectName || '彩票8'}聊天室, 每天惊喜不断!`
        _special = true
      }
      if (this.rooms.chatId) {
        theme = '1'
        regType = 6
        this.regBagSend.number = 1
      }
      let roomid = ''
      if (this.rooms.data) {
        roomid = this.rooms.data.chatRoomId
      } else {
        roomid = this.rooms.chatId
      }
      // this.Utils.chatURL.chatHttp +
      this.axios.post('/cpi/redPacket/send', {
        roomId: roomid,
        toOpenId: null,
        amount: Number(this.regBagSend.money),
        number: Number(this.regBagSend.number),
        detailMsg: this.regBagSend.msg,
        headMsg: (_special ? this.regBagSend.msg : theme),
        sendOpenId: this.init.message.member.openid,
        type: Number(regType)
      })
        .then((res) => {
          if (res.code === 0) {
            if (res.data.code === 0) {
              this.$indicator.close()
              this.sendHb.show = false
              this.$toast({
                message: '红包已发送',
                duration: 1500
              })
              this.regBagSend.money = this.regBagSend.number = this.regBagSend.msg = ''
            } else {
              this.$toast({
                message: res.data.msg,
                duration: 2000
              })
              this.sendHb.show = false
            }
          }
        })
        .catch(() => {
          this.$toast({
            message: '红包送失败, 请重试',
            duration: 2000
          })
        })
    }
  }
}
</script>

<style scoped>
  .send-hbbg{position:fixed;left:0;top:0;z-index:400;max-width:780px;margin:0 auto;width:100%;height:100%;background:rgba(0, 0, 0, .6);}
  .send-hbbg2{text-align:center;}
  .send-hbbg2:before{content:'';display:inline-block;vertical-align:middle;width:0;height:100%;}
  .send-hbbg-box{background:#fff;margin:0;padding-bottom:.3rem;overflow:hidden;width:9rem;border-radius:.2rem;}
  .send-hbbg-box .beeting-look-title{background:#F4F4F4;}
  .send-hbbg-list{overflow:hidden;padding:0 3%;height:1rem;line-height:1rem;border-bottom:1px solid #EEE;font-size:.35rem;}
  .beeting-look-title{text-align:center;height:.9rem;line-height:.95rem;font-size:.4rem;background:#F3A703;}
  .beeting-look-close{float:right;margin-right:.3rem;font-size:.5rem;}
  .send-hbbg-list-left{float:left;width:20%;text-align:center;color:#333;}
  .send-hbbg-list:nth-last-child(1){border-bottom:none;color:#666;}
  .send-hbbg-text{float:left;width:70%;margin-left:4%;line-height:1rem;font-size:.35rem;color:#333;border:0;text-align:left;}
  .send-hbbg-btn{display:block;width:90%;margin:0 auto;height:1rem;line-height:.95rem;background:#D54545;color:#fff;font-size:.35rem;text-align:center;}
</style>
