<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-06 15:34:43
 * @LastEditTime: 2019-09-25 16:30:43
 * @LastEditors: Please set LastEditors
 -->
<template>
  <section style="overflow:inherit;">
    <div class="room-info room-info-hb wzfw">
      <slot name="info-name"></slot>
      <div style="padding-left:.1rem;display:inline-block;vertical-align:middle;">
        发了一个<span v-if="item.event === 'commonRedPacket'">普通</span><span v-else-if="item.event === 'flauntRedPacket'">炫耀</span><span v-else-if="item.event === 'speciallyRedPacket'">专员</span>红包
      </div>
      <img src="../../../../assets/images/chatroom/room-hb.png" class="room-share-icon">
    </div>
    <div
      class="room-pthb"
      v-if="item.event === 'commonRedPacket'"
      @click="regBagReceive(item)"
      :style="{background: sendHb.bg.commonRedPacket, 'background-size': 100 + '%', 'background-repeat': 'no-repeat'}">
      <p class="room-pthb-title">{{item.message.redPacket.message}}</p>
      <p class="room-pthb-click">立即领取</p>
    </div>
    <div
      class="room-pthb room-xyhb ft0"
      v-if="item.event === 'flauntRedPacket'"
      @click="regBagReceive(item)"
      :style="{'background-image': sendHb.bg.flauntRedPacket, 'background-size': 100 + '%', 'background-repeat': 'no-repeat'}">
      <div class="room-xyhb-box dInV">
        <p class="room-pthb-title">{{item.message.redPacket.message}}</p>
        <p class="room-pthb-details">{{item.message.redPacket.theme}}</p>
        <p class="room-pthb-click">立即领取</p>
      </div>
    </div>
    <div
      class="room-pthb"
      v-if="item.event === 'speciallyRedPacket'"
      @click="regBagReceive(item)"
      :style="{background: sendHb.bg.speciallyRedPacket, 'background-size': 100 + '%', 'background-repeat': 'no-repeat'}"
    >
      <p class="room-pthb-title">{{item.message.redPacket.theme}}</p>
      <p class="room-pthb-click">立即领取</p>
    </div>
  </section>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'regBag',
  props: ['item', 'removeRoomHandler'],
  data () {
    return {
      headImg: this.$store.state.chatRoom.headImg,
      regBags: {
        chai: false,
        yes: false,
        already: false,
        expired: false,
        no: false,
        rid: '',
        info: {},
        details: false,
        detailsData: false,
        hbBgShow: false
      },
      sendHb: {
        bg: {
          commonRedPacket: 'url(' + require('../../../../assets/images/chatroom/room-hbb.png') + ')',
          flauntRedPacket: 'url(' + require('../../../../assets/images/chatroom/room-winning.png') + ')',
          speciallyRedPacket: 'url(' + require('../../../../assets/images/chatroom/chat_ZYred.png') + ')'
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      chatRoomFont: 'chatRoomFont'
    }),
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
    // console.log(this.item)
  },
  methods: {
    regBagReceive (item) {
      if (!this.removeRoomHandler) {
        this.$messagebox('提示', '您已被管理员踢出该房间!')
        return
      }
      if (item.message.sender.openid === this.init.message.member.openid) {
        this.regBags.details = true
        let rid = item.message.redPacket.rid
        // rid = item ? item.message.rid : rid = _this.regBags.rid
        this.axios.get('/cpi/redPacket/detail?rid=' + rid)
          .then((res) => {
            if (res.code === 0) {
              this.regBags.details = true
              this.regBags.detailsData = res.data.detail
              this.$emit('regBagHanlder', this.regBags)
            } else {
              this.$toast({
                message: '获取失败, 刷新重试',
                position: 'middle',
                duration: 1000
              })
            }
          })
          .catch(() => {})
        return
      }
      this.regBags.info = item.message.sender
      this.regBags.rid = item.message.redPacket.rid
      this.axios.get('/cpi/redPacket/check?rid=' + this.regBags.rid)
        .then((res) => {
          if (res.code === 0) {
            this.regBags.hbBgShow = true
            this.regBags.getRegBag = {}
            this.regBags.getRegBag.info = item
            if (res.data.code === 0) {
              // this.axios.get('/cpi/redPacket/get?rid=' + this.regBags.rid).then(obj => {
              this.regBags.chai = true
              this.regBags.yes = false
              this.regBags.already = false
              this.regBags.expired = false
              this.regBags.no = false
              // this.regBags.getRegBag.money = obj.data.detail.amount
              // this.regBags.already = true
              // this.regBags.chai = false
              // this.regBags.yes = false
              // this.regBags.expired = false
              // this.regBags.no = false
              // })
            } else
            if (res.data.code === 3002) {
              this.regBags.getRegBag.money = res.data.detail.amount
              this.regBags.already = true
              this.regBags.chai = false
              this.regBags.yes = false
              this.regBags.expired = false
              this.regBags.no = false
            } else
            if (res.data.code === 3001) {
              this.regBags.expired = true
              this.regBags.chai = false
              this.regBags.yes = false
              this.regBags.already = false
              this.regBags.no = false
            } else
            if (res.data.code === 3003) {
              this.regBags.no = true
              this.regBags.chai = false
              this.regBags.yes = false
              this.regBags.already = false
              this.regBags.expired = false
            } else {
              this.$toast(res.data.msg)
              return
            }
            this.$emit('regBagHanlder', this.regBags)
          } else {
            this.$toast({
              message: '获取失败, 刷新重试',
              position: 'middle',
              duration: 1000
            })
          }
        })
        .catch(() => {})
    }
  }
}
</script>

<style scoped>
  .room-info{padding-top:.1rem;color:#666;word-break:break-word;width:99%;margin-bottom:.06rem;}
  /*.room-info > span {margin-left: 3px;padding-right: 3px;}*/
  .room-info-hb{color:#FF6500;}
  .room-pthb{overflow:hidden;position:relative;margin-top:.2rem;width:7.4rem;height:2rem;background:url(../../../../assets/images/chatroom/room-hbb.png) no-repeat;background-size:100%;border-radius: .2rem;}
  .room-pthb-title{position:absolute;font-size:11px;top:.3rem;left:1.9rem;color:#fff;}
  .room-pthb-click{position:absolute;top:1.4rem;left:1.9rem;color:#FFEA00;text-decoration:underline;}
  .room-xyhb{width:7.6rem;height:2.4rem;margin-left:-.17rem;}
  .room-xyhb:before{content:'';width:0;height:100%;display:inline-block;vertical-align:middle;}
  .room-xyhb-box{padding-left:2.2rem;width:68%;line-height:.35rem;}
  .room-xyhb .room-pthb-title{padding-top:.07rem;left:2.2rem;font-size:.3rem;}
  .room-xyhb .room-pthb-details{max-width:98%;color: #fff;font-size: .25rem;white-space: normal;}
  .room-xyhb .room-pthb-click{
    margin-right: .4rem;
    padding-top: .1rem;
    font-size: .3rem;
    text-align: right;
    left: auto;
    right: .2rem;
    bottom: .3rem;
    top: auto;}
  .room-share-icon{vertical-align:top;margin-left:.1rem;width:.4rem;height:.5rem;}
</style>
