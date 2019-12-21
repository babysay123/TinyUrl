<template>
  <section
    class="room-record"
    :style="{
    background: data2.imgRight ? 'url(/mobile/images/chatroom/room-share-right.png) no-repeat' : 'url(/mobile/images/chatroom/room-share.png) no-repeat',
    backgroundSize:'100%'
    }"
  >
    <p class="room-record-list room-record-list1" :class="{'private-record-list1': data2.imgRight, 'private-record-list': data2.imgRight}">
      <span class="room-record-list-sp wzfw">投注:{{data2.record.betFee}}元</span>
      <span class="room-record-list-sp wzfw">中奖:<span>{{data2.record.winFee}}</span>元</span>
    </p>
    <p class="room-record-list room-record-list2" :class="{'private-record-list2': data2.imgRight, 'private-record-list': data2.imgRight}">
      <span class="room-record-list-sp wzfw">盈亏:<span>{{data2.record.profitFee}}</span>元</span><span class="room-record-list-attention" @click="attention">加入关注</span>
    </p>
  </section>
</template>

<script>
export default {
  name: 'todayRecord',
  props: ['data', 'imgRight'],
  data () {
    return {
      data2: false
    }
  },
  created () {
    if (this.data.attachment) {
      this.data2 = this.data.attachment
      if (this.data.sender === this.$store.state.chatRoom.init.message.member.openid) {
        this.data2.imgRight = true
      }
    } else {
      this.data2 = this.data
    }
  },
  methods: {
    attention () {
      this.$emit('attention')
    }
  }
}
</script>

<style scoped>
  .room-record{overflow:hidden;margin:.2rem 0 0 -.15rem;width:7.7rem;height:1.9rem;background:url(../../../../assets/images/chatroom/room-share.png) no-repeat;background-size:100%;}
  .room-record-list{width:6.2rem;overflow:hidden;color:#FFEA00;line-height:.4rem;font-size:.3rem;}
  .room-record-list-sp{float:left;width:50%;}
  .room-record-list1{margin:.4rem 0 0 1.3rem;padding-bottom:.1rem;}
  .room-record-list2{padding:.1rem 0 0 1.3rem;}
  .room-record-list-attention{color:#fff;}
  .room-record-list-attention:before{content:'';display:inline-block;vertical-align:bottom;margin-right:.1rem;width:.48rem;height:.35rem;background:url(../../../../assets/images/chatroom/room-share2.png) no-repeat;background-size:100%;}
  .private-record-list{width:7rem;}
  .private-record-list1{margin:.4rem 0 0 .55rem;}
  .private-record-list2{padding-left:.55rem;}
</style>
