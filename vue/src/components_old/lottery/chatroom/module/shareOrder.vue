<template>
  <section>
    <section class="tc room-betting pr" v-if="data.senders.type !== 2">
      <slot name="privateChat"></slot>
      <div class="room-betting-title pr" :style="{'font-size': privateChat.flag ? privateChat.fontSize2 : font.fontSizeAdd2 + 'px'}">
        <img :src="data.order.url" class="room-betting-icon dInV">
        <span class="dInV">{{data.order.lotteryName}}</span>
        <img src="../../../../assets/images/chatroom/head_button_gz.png" class="room-betting-attention"  @click="attention">
      </div>
      <div class="room-betting-issues wzfw">
        <div class="room-betting-issue wzfw">
          期号: {{data.order.issue}}
        </div>
        玩法: {{data.order.playName}}
      </div>
      <div class="room-betting-cons fw">
        <div class="room-betting-con">
          <div class="red wzfw" :style="{'font-size': privateChat.flag ? privateChat.fontSize2 : font.fontSizeAdd2 + 'px'}">
            {{data.order.content}}
          </div>
          投注内容
        </div>
        <div class="room-betting-con">
          <div class="red wzfw" :style="{'font-size': privateChat.flag ? privateChat.fontSize2 : font.fontSizeAdd2 + 'px'}">
            <!--¥-->{{data.order.totalFee.toFixed(2)}}
          </div>
          投注金额
        </div>
      </div>
      <button class="room-betting-submit" :style="{'font-size': privateChat.flag ? privateChat.fontSize3 : font.fontSizeAdd3 + 'px'}" @click="lookShareBetting">跟投</button>
    </section>
    <!-- 6.18xiaoyu:计划专员跟投更换背景色 -->
    <section class="fw tc room-betting pr" v-else-if="data.senders.type === 2">
      <slot name="privateChat"></slot>
      <div class="room-betting-title room-betting-title-plan" :style="{'font-size': privateChat.flag ? privateChat.fontSize2 : font.fontSizeAdd2 + 'px'}">
        精准计划推荐
      </div>
      <div class="room-betting-issues room-betting-issues-plan wzfw" :style="{'font-size': privateChat.flag ? privateChat.fontSize2 : font.fontSizeAdd2 + 'px'}">
        <div class="room-betting-issue room-betting-issue-plan wzfw">
          <p class="room-betting-icon room-betting-icon-plan dInV">
            <img :src="data.order.url"  class="w100">
          </p>
          <span class="dInV" style="vertical-align: unset;">{{data.order.lotteryName}}</span>
        </div>
        <span class="room-betting-issue-right">第{{data.order.issue}}期</span>
      </div>
      <div class="room-betting-cons fw">
        <div class="room-betting-con">
          <div class="red wzfw" :style="{'font-size': privateChat.flag ? privateChat.fontSize2 : font.fontSizeAdd2 + 'px'}">
            {{data.order.playName}}
          </div>
          玩法分析
        </div>
        <div class="room-betting-con">
          <div class="red wzfw" :style="{'font-size': privateChat.flag ? privateChat.fontSize2 : font.fontSizeAdd2 + 'px'}">
            {{data.order.content}}
          </div>
          精准推算: <span class="red" :style="{'font-size': privateChat.flag ? privateChat.fontSize2 : font.fontSizeAdd2 + 'px'}">{{data.order.unitFee / 100}}倍</span>
        </div>
      </div>
      <button v-if="privateChat.flag" class="room-betting-submit" :style="{'font-size': privateChat.flag ? privateChat.fontSize3 : font.fontSizeAdd3 + 'px'}" @click="lookShareBetting">我要跟投</button>
      <section v-else class="fw">
        <button class="room-betting-private" :style="{'font-size': privateChat.flag ? privateChat.fontSize2 : font.fontSizeAdd2 + 'px'}" @click="plannerChat">私聊</button>
        <button class="room-betting-submit room-betting-submit-plan" :style="{'font-size': privateChat.flag ? privateChat.fontSize2 : font.fontSizeAdd2 + 'px'}" @click="lookShareBetting">我要跟投</button>
      </section>
    </section>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'shareOrder',
  props: ['data'],
  data () {
    return {
      privateChat: {
        flag: false,
        fontSize2: '16px',
        fontSize3: '17px'
      }
    }
  },
  computed: {
    ...mapGetters({
      font: 'chatRoomFont'
    })
  },
  created () {
    if (this.data.transfer) {
      this.data.senders = this.data.transfer
      this.privateChat.flag = true
    } else {
      this.data.senders = this.data.sender
    }
  },
  methods: {
    plannerChat () {
      this.$emit('plannerChat')
    },
    lookShareBetting () {
      this.$emit('lookShareBetting')
    },
    attention () {
      this.$emit('attention')
    }
  }
}
</script>

<style scoped>
/*新分享订单模板*/
.room-betting{width:6.8rem;border-radius:.2rem;background:#fff;border:1px solid #76A5EE;margin-bottom:.2rem;box-shadow:0 3px 6px 0 #D3D3D3;}
.room-betting-title{padding:.1rem 0;height:.8rem;color:#fff;background:#90BBFE;}
.room-betting-title:before,
.room-betting-issue-plan:before{content:'';width:0;height:100%;display:inline-block;vertical-align: middle;}
.room-betting-icon{width:.8rem;margin-right:.1rem;}
.room-betting-attention{position:absolute;width:.5rem;right:.3rem;top:.15rem;}
.room-betting-issues{padding:0 .01rem;height:.7rem;line-height:.7rem;color:#4A4A4A;}
.room-betting-issue{float:left;width:50%;}
.room-betting-cons{padding:.2rem 0;border-top:1px solid #f7f7f7;}
.room-betting-con{float:left;width:50%;line-height:.6rem;}
.room-betting-con .red{margin:0 auto;max-width:90%;}
.room-betting-con:nth-child(1){box-sizing:border-box;border-right:1px solid #EEEEEE;}
.room-betting-submit{margin:.1rem 0;width:3rem;border-radius:.09rem;height:.8rem;line-height:.7rem;background:#D81E06;color:#fff;}
.red{color:#D81E06;}
.room-betting-issue-right{line-height:.8rem;}
/*计划员分享*/
 /* 6.18xiaoyu:计划专员跟投更换背景色 */
.room-betting-title-plan{height:.8rem;background:url(/mobile/images/chatroom/shareTitle.png) no-repeat;background-size:124%;line-height:.8rem;background: linear-gradient(to left,#eb4207,#ff0808  );}
.room-betting-title-plan:before{content:none;}
.room-betting-issues-plan{height:.9rem}
.room-betting-icon-plan{width:.8rem;}
.room-betting-private,
.room-betting-submit-plan{width:2.4rem;border-radius:.09rem;height:.8rem;line-height:.7rem;}
.room-betting-private{margin-right:1.5rem;color:#9497FF;border:1px solid;background:#fff;}
</style>
