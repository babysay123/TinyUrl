<template>
  <section class="chat-send wrap" ref="roomSend">
    <div class="chat-send-btns">
      <input
        type="text"
        class="chat-send-text inline"
        v-model="inputVal"
      >
      <a class="btns inline emoji" @click="switchEmoji"></a>
      <a
        v-if="!inputVal || inputVal.length === 0"
        class="btns inline more"
        @click="switchMore"></a>
      <a
        v-if="inputVal.length > 0"
        class="btns inline send"
        @click="sendMsg">发送</a>
    </div>
    <div class="chat-send-more" v-show="showMore">
      <swiper :options="swiperOption">
        <swiper-slide
          v-for="(c, i) in moreBtns"
          :key="i + '-more-btns'"
        >
          <div class="more-slide">
            <div
              v-for="(btn, inx) in c"
              :key="inx + '-ebtn'"
              class="more-btns"
            >
              <img :src="btn.img || '/mobile/img/icon_loading_Normal1.png'" alt="">
              <span>{{ btn.name }}</span>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
    <div class="chat-send-emoji" v-if="showEmoji">
      <Emojs @addEmoji = "addEmoji"></Emojs>
    </div>
  </section>
</template>

<script>
import Emojs from 'Components/chatroom/module/emoji'
import {
  sendMsgApi
} from 'Plugins/api'
import {
  mapGetters
} from 'vuex'

export default {
  name: 'room-ctrl',
  data () {
    return {
      room: '',
      inputVal: '',
      moreBtns: [
        // icon_loading_Normal1.png
        [
          { name: '福利', img: '' },
          { name: '加盟', img: '' },
          { name: '红包', img: '' },
          { name: '充值', img: '' },
          { name: '玩法', img: '' },

          { name: '帮助', img: '' },
          { name: '客服', img: '' },
          { name: '照片', img: '' },
          { name: '拍照', img: '' },
          { name: '赚钱', img: '' }
        ]
      ],
      showMore: false,
      showEmoji: false,
      swiperOption: {
        loop: false,
        spaceBetween: -18
      }
    }
  },
  components: {
    Emojs
  },
  computed: {
    ...mapGetters(
      'ChatRoom', [ 'RoomInfo' ]
    )
  },
  methods: {
    switchEmoji () {
      this.showMore = false
      this.showEmoji = !this.showEmoji
    },
    switchMore () {
      this.showEmoji = false
      this.showMore = !this.showMore
    },
    closeSendBox () {
      this.showMore = false
      this.showEmoji = false
    },
    addEmoji (item) {
      console.log('add emoji')
      this.inputVal += item
    },
    async sendMsg () {
      console.log(this.inputVal)
      if (!this.inputVal || this.inputVal.length === 0) {
        return
      }
      const { active } = this.RoomInfo
      const { code, data } = await sendMsgApi({
        type: 'TEXT',
        'roomId': active.id, // 房间ID
        'roomType': active.category, // 房间类型 传入房间的category值
        'content': this.inputVal
      })

      if (code === 0) {
        // this.successMsgs(data)
        console.log(data)
        this.inputVal = ''
      }
      this.closeSendBox()
    }
  }
}
</script>

<style lang="scss" scoped>
.chat-send {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  z-index: 111;
  // line-height: 1.125rem;
  .chat-send-btns {
    height: 1.125rem;
    line-height: 1.125rem;
    background: #fff;
    border-top: 1px solid #bfbfbf;
    .inline {
      display: inline-block;
      vertical-align: middle;
    }
    input {
      line-height: 0.8125rem;
      // width: 62%;
      width: calc(100% - 14px - 16px - (0.875rem * 2));
      padding: 0 6px;
      border-radius: 4px;
      border: 1px solid #ccc;
      box-sizing: border-box;
      margin: 0 6px 0 6px;
    }
    .btns {
      width: 0.875rem;
      height: 0.875rem;
      font-size: 0;
      background: url('/mobile/img/chatroom/profile_headImage.png') no-repeat;
      background-size: contain;
      // margin-right: 8px;
      border-radius: 50%;

      &.emoji {
        background: url('/mobile/img/chatroom/room-bq.png') no-repeat center center;
        background-size: contain;
      }
      &.more {
        background: url('/mobile/img/chatroom/room-more.png') no-repeat center center;
        background-size: contain;
        margin-left: 8px;
      }
      &.send {
        // background: blue;
        background: #5eade3;
        font-size: 13px;
        line-height: 0.75rem;
        height: 0.75rem;
        color: #fff;
        text-align: center;
        border-radius: 6px;
        padding: 0px 4px;
        margin-left: 4px;
        margin-right: 0;
      }
    }
  }

  .chat-send-more {
    background: #fff;
    .swiper-slide {
      .more-slide {
        position: relative;
        overflow: hidden;
        // height: 4rem;
        padding: 6px 2px;
      }
      .more-btns {
        float: left;
        width: 20%;
        text-align: center;
        font-size: 0;
        box-sizing: border-box;
        padding: 6px 0 2px;
        img {
          // width: 30px;
          // height: 30px;
          width: 54%;
          height: auto;
        }
        span {
          display: block;
          font-size: 12px;
          line-height: 24px;
        }
      }
    }

  }
}
</style>
