<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-06 15:34:43
 * @LastEditTime: 2019-09-25 16:34:17
 * @LastEditors: Please set LastEditors
 -->
<template>
  <section class="hb-bg tc">
    <section class="hb-bg-chai pr" v-if="data.chai">
      <div  @click="rebagChai" class="rebagChai"></div>
      <img src="../../../../assets/images/chatroom/chat_name_cancel.png" class="hb-bg-close" @click="close">
    </section>
    <section class="hb-bg-yes pmAuto" v-if="data.yes">
      <span class="hb-bg-yes-money">{{data.getRegBag.regBagData.amount.toFixed(2)}}</span>
      <p class="hb-bg-already-details" @click="regBagDetail()">查看红包领取详情 >></p>
      <img src="../../../../assets/images/chatroom/chat_name_cancel.png" class="hb-bg-close" @click="close">
    </section>
    <section class="hb-bg-no pr" v-if="data.no">
      <span @click="regBagDetail()">查看红包领取详情 >></span>
      <img src="../../../../assets/images/chatroom/chat_name_cancel.png" class="hb-bg-close" @click="close">
    </section>
    <section class="hb-bg-already fw pr" v-if="data.already">
      <img
        :src="!rooms.data.attachment.sender.headImg || rooms.data.attachment.sender.headImg.indexOf('/default') > -1 ? '/mobile/images/mine/geren_tou.png' : rooms.data.attachment.sender.headImg"
        class="hb-bg-already-headImg">
      <div class="hb-bg-already-name">{{rooms.data.attachment.sender.nickname}}</div>
      <div class="hb-bg-already-money">{{data.getRegBag.money}}</div>
      <div class="hb-bg-already-alreadyAdd">已添加到你的账户</div>
      <p class="hb-bg-already-details" @click="regBagDetail()">查看红包领取详情 >></p>
      <img src="../../../../assets/images/chatroom/chat_name_cancel.png" class="hb-bg-close" @click="close">
    </section>
    <section class="hb-bg-already fw pr" v-if="data.expired">
      <img
        :src="!rooms.data.attachment.sender.headImg || rooms.data.attachment.sender.headImg.indexOf('/default') > -1 ? '/mobile/images/mine/geren_tou.png' : rooms.data.attachment.sender.headImg"
        class="hb-bg-already-headImg">
      <div class="hb-bg-already-name">{{rooms.data.attachment.sender.nickname}}</div>
      <div class="hb-bg-already-expired">该红包已过期<br>如已领取, 则自动添加到账户</div>
      <p class="hb-bg-already-details" @click="regBagDetail()">查看红包领取详情 >></p>
      <img src="../../../../assets/images/chatroom/chat_name_cancel.png" class="hb-bg-close" @click="close">
    </section>
  </section>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'regBagReceive',
  props: ['data', 'rooms', 'removeRoomHandler'],
  data () {
    return {
      musicSto: this.Utils.Storage.get('music'),
      getRegBag: {
        regBagData: [],
        info: {},
        money: ''
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
    if (this.rooms.chatId) { // 走此处,是私聊红包
      this.rooms.data = {}
      this.rooms.data.attachment = {}
      this.rooms.data.attachment.sender = {}
      this.rooms.data.attachment.sender.headImg = this.data.info.headImg
      this.rooms.data.attachment.sender.nickname = this.data.info.nickname
    }
    console.log(this.data, '')
  },
  methods: {
    close () {
      this.$emit('RegBagReceiveClose')
    },
    rebagChai () {
      this.$indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      })
      // let roomId = ''
      // if (this.rooms.chatId) {
      //   roomId = this.rooms.chatId
      // } else {
      //   roomId = this.rooms.data.chatRoomId
      // }
      this.axios.get('/cpi/redPacket/get?rid=' + this.data.rid)
        .then((res) => {
          this.$indicator.close()
          if (res.data.code === 0) {
            this.data.getRegBag.regBagData = res.data.detail
            this.data.chai = false
            this.data.yes = true
            // let sound = new this.$Howl({
            //   src: [require('../../../../assets/images/chatroom/cash_received.mp3')]
            // })
            // if (this.musicSto) {
            //   if (this.musicSto.reg) {
            //     sound.play()
            //   } else {
            //     sound.stop()
            //   }
            // } else {
            //   sound.play()
            // }
          } else {
            this.$toast({
              message: res.data.msg,
              position: 'middle',
              duration: 1000
            })
          }
        })
        .catch(() => {})
    },
    regBagDetail () {
      let rid = ''
      if (!this.rooms.chatId && !this.removeRoomHandler) {
        this.$messagebox('提示', '您已被管理员踢出该房间!')
        return
      }
      // rid = item ? item.message.rid : rid = this.data.rid
      rid = this.data.rid
      this.axios.get('/cpi/redPacket/detail?rid=' + rid)
        .then((res) => {
          if (res.code === 0) {
            this.data.details = true
            this.data.hbBgShow = false
            this.data.detailsData = res.data.detail
          } else {
            this.$toast({
              message: '获取失败, 刷新重试',
              position: 'middle',
              duration: 1000
            })
          }
        })
        .catch(() => {
          this.$toast({
            message: '获取失败, 刷新重试',
            position: 'middle',
            duration: 1000
          })
        })
    }
  }
}
</script>

<style scoped>
  .hb-bg{position:fixed;top:0;z-index:400;max-width:780px;margin:0 auto;width:100%;height:100%;background:rgba(0, 0, 0, .6);}
  .hb-bg-chai{width:7rem;height:9.2rem;position:absolute;top:0;bottom:0;left:0;right:0;margin:auto;text-align:center;font-size:.35rem;background:url(../../../../assets/images/chatroom/regBg.png) no-repeat;background-size:100%;color:#fff;}
  .hb-bg-chai{background:url(../../../../assets/images/chatroom/chat_red_cai.png) no-repeat;background-size:100%;position:absolute;top:0;bottom:0;left:0;right:0;margin:auto;}
  .hb-bg-yes{width:10rem;height:12rem;background:url(../../../../assets/images/chatroom/chat_rob_yes.png) no-repeat;background-size:100%;}
  .hb-bg-no{padding-top:6.5rem;height:62vh;background:url('/mobile/images/chatroom/chat_rob_no.png') no-repeat;background-size:contain;}
  .hb-bg-close{position:absolute;z-index:2;top:.3rem;right:.3rem;width:.7rem;}
  .hb-bg-yes-money{padding: 7.8rem 0 .2rem;display:block;color:#FFF75C;font-weight:bold;font-size:1rem;line-height:1.6rem;}
  .hb-bg-already{width:7rem;height:9.2rem;position:absolute;top:0;bottom:0;left:0;right:0;margin:auto;text-align:center;font-size:.35rem;background:url(../../../../assets/images/chatroom/regBg.png) no-repeat;background-size:100%;color:#fff;}
  .hb-bg-already-headImg{margin:.7rem auto .3rem;width:1.3rem;height:1.3rem;background:#fff;border-radius:50%;}
  .hb-bg-already-name{color:#FFF75C;}
  .hb-bg-already-money{padding:.4rem 0 .2rem;font-size:1rem;color:#FFF75C;}
  .hb-bg-already-alreadyAdd{padding-bottom:3.1rem;}
  .hb-bg-already-expired{padding:.8rem 0 3.1rem;line-height:.7rem;color:#fff;font-size:.45rem;}
  .rebagChai{position:relative;z-index:1;height:100%;width: 55%;margin:0 auto;}
  .hb-bg-already-details{color:#fff;font-size:.3rem;}
</style>
