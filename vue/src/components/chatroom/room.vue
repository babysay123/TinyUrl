<template>
  <section class="chatroom-main">
    <!-- 文案 -->
    <section
      v-for="(log, inx) in messages"
      :key="inx + '-chat-logs'"
      :class="'chatroom-box ' +
        (User.id === log.sender.id && 'owner-box')"
    >
      <!-- {{ log }} -->
      <div class="chat-head">
        <img
          :src="log.sender.portrait !== 'default' ? log.sender.protrait : '/mobile/img/chatroom/profile_headImage.png'">
      </div>
      <div class="chat-content">
        <h4 class="user">{{ log.sender.nickname }}</h4>
        <!-- 文字内容 -->
        <div class="messages" v-if="log.type === 'TEXT'">
          <div
            :class="'words ' +
              (User.id === log.sender.id && 'owner')"
          >
            <p>{{ JSON.parse(log.data).content }}</p>
          </div>
        </div>

        <!-- 图片内容 -->
        <div class="messages" v-if="log.type === 'IMG'">
          <div
            :class="'words ' +
              (User.id === log.sender.id && 'owner')"
          >
            <img :src="JSON.parse(log.data).content">
          </div>
        </div>

        <!-- 红包 -->
        <RedBagMsg
          v-if="log.type === 'INFO' && log.event === 'SEND_RED_PACKET'"
          :typeShow="redPacketType(log)"
          :packetData="JSON.parse(log.data)"
          :isSelf="(User.id === log.sender.id ? true : false)"
          :isReceived="false"
        ></RedBagMsg>
      </div>
    </section>

    <!-- <section class="chatroom-box owner-box">
      <div class="chat-head">
        <img src="/mobile/img/chatroom/profile_headImage.png" alt="">
      </div>
      <div class="chat-content">
        <h4 class="user">零三零</h4>
        <div class="messages">
          <div class="words owner">
            <p>群主发言，安静一点</p>
          </div>
        </div>
      </div>
    </section> -->
    <!--

    <section class="chatroom-box">
      <div class="head">
        <img src="/mobile/img/chatroom/profile_headImage.png" alt="">
      </div>
      <div class="content">
        <h4 class="user">零三零</h4>
        <RedBagMsg
          :typeShow="'normal'"
          @normalCallBack="normalCallBack"
        ></RedBagMsg>
      </div>
    </section>

    <section class="chatroom-box">
      <div class="head">
        <img src="/mobile/img/chatroom/profile_headImage.png" alt="">
      </div>
      <div class="content">
        <h4 class="user">零三零</h4>
        <RedBagMsg
          :typeShow="'gift'"
        ></RedBagMsg>
      </div>
    </section>

    <section class="chatroom-box">
      <div class="head">
        <img src="/mobile/img/chatroom/profile_headImage.png" alt="">
      </div>
      <div class="content">
        <h4 class="user">零三零</h4>
        <RedBagMsg
          :typeShow="'game'"
        ></RedBagMsg>
        <RedBagMsg
          :typeShow="'gameDetail'"
        ></RedBagMsg>
      </div>
    </section>

    <section class="chatroom-box owner-box">
      <div class="head">
        <img src="/mobile/img/chatroom/profile_headImage.png" alt="">
      </div>
      <div class="content">
        <h4 class="user">零三零</h4>
        <RedBagMsg
          :typeShow="'normal'"
          :isSelf="true"
          :isReceived="true"
        ></RedBagMsg>
      </div>
    </section>

    <section class="chatroom-box owner-box">
      <div class="head">
        <img src="/mobile/img/chatroom/profile_headImage.png" alt="">
      </div>
      <div class="content">
        <h4 class="user">零三零</h4>
        <RedBagMsg
          :typeShow="'gift'"
          :isSelf="true"
        ></RedBagMsg>
      </div>
    </section>

    <section class="chatroom-box owner-box">
      <div class="head">
        <img src="/mobile/img/chatroom/profile_headImage.png" alt="">
      </div>
      <div class="content">
        <h4 class="user">零三零</h4>
        <RedBagMsg
          :typeShow="'game'"
          :isSelf="true"
        ></RedBagMsg>
        <RedBagMsg
          :typeShow="'gameDetail'"
          :isSelf="true"
        ></RedBagMsg>
      </div>
    </section> -->

    <!-- 发送条 -->
    <RoomCtrl ref="roomCtrl"></RoomCtrl>

    <!-- 插槽 -->
    <slot></slot>
  </section>
</template>

<script>
import RedBagMsg from 'Components/chatroom/module/redBag'
import RoomCtrl from 'Components/chatroom/roomCtrl'
import {
  mapState,
  mapGetters
} from 'vuex'

export default {
  name: 'room',
  data () {
    return {
      title: '',
      messages: []
    }
  },
  components: {
    RedBagMsg,
    RoomCtrl
  },
  computed: {
    ...mapState({
      chatlog: state => state.WsConfig.logs
    }),
    ...mapGetters([ 'User' ]),
    ...mapGetters(
      'ChatRoom', [ 'RoomInfo' ]
    )
  },
  watch: {
    messages: {
      handler (data) {
        // 最大条数300
        if (data.length > 300) {
          data.shift()
        }
      }
    },
    'chatlog': {
      handler (data) {
        // console.log(data)
        if (data.length === 0) {
          // clear
          this.messages.splice(0, this.messages.length - 1)
        } else {
          // push最新一条
          this.messages.push(data[data.length - 1])
        }
      },
      deep: true
    }
  },
  created () {
    console.log(this.User)
  },
  methods: {
    init () {

    },
    redPacketType () {
      return 'normal'
    },
    normalCallBack () {
      console.log('normalCallBack')
    }
  }
}
</script>

<style lang="scss" scoped>
.chatroom-main {
  margin-bottom: 1.125rem;
  position: relative;
  padding: 5px 0;
}
.chatroom-box {
  padding: 5px 8px;
  overflow: hidden;
  .chat-head {
    width: 1rem;
    margin-right: 4px;
    float: left;
    img {
      width: 100%;
    }
  }
  .chat-content {
    float: left;
    width: calc(100% - 1rem - 4px);
    font-size: 14px;
    .user {
      max-width: 78%;
      font-weight: 100;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      line-height: 22px;
      font-size: 14px;
      // margin-bottom: 3px;
    }
    .messages {
      margin: 2px 0 5px;
      & > div {
        max-width: 76%;

        &.owner {
          margin-left: 24%;
        }
      }
      .words {
        position: relative;
        background: #fff;
        border-radius: 4px;
        color: #333;
        white-space: normal;
        padding: 6px 5px 6px 8px;
        margin: 0px 0 0 6px;
        line-height: 1.4;
        &:before {
          content: "";
          position: absolute;
          left: -8px;
          top: 0;
          width: 12px;
          height: 10px;
          background: url('/mobile/img/chatroom/bubble_left_Normal@2x.png') no-repeat;
          // background-size: 100%;
        }

        &.owner {
          padding: 6px 8px 6px 5px;
          // margin: 0 6px 0 0;
          margin-right: 10px;
          background: #F5D0A9;
          color: #fff;
          text-align: right;
          &:before {
            left: auto;
            right: -10px;
            width: 12px;
            height: 30px;
            background: url('/mobile/img/chatroom/bubble_right_Normal@2x.png') no-repeat right;
          }
        }
      }
    }
  }

  &.owner-box {
    .chat-head {
      float: right;
      margin-right: 0;
      margin-left: 4px;
    }
    .chat-content {
      float: right;
      .user {
        margin-left: 22%;
        text-align: right;
      }
    }
  }
}
</style>
