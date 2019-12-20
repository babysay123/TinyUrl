<!--  -->
<style lang="scss" scoped>
@import 'Assets/css/base.color.scss';

.footer-menu {
  position: fixed;
  bottom: 0;
  border-top: 1px solid #ccc;
  background: #f5f4f9;
  max-width: 780px;
  height: 48px;
  text-align: center;
  li {
    height: 48px;
    float: left;
    width: 20%;
    img {
      width: 24px;
    }
    span {
      font-size: 12px;
    }
  }
}

.nav-icon {
  margin: 4px auto;
  overflow: hidden;
  position: relative;
  .iconfont {
    font-size: 20px;
  }
}

.pic1 {
  position: absolute;
  left: -32px;
  -webkit-filter: drop-shadow(32px 0 $baseCol);
  -moz-filter: drop-shadow(32px 0 $baseCol);
  -ms-filter: drop-shadow(32px 0 $baseCol);
  filter: drop-shadow(32px 0 $baseCol);
}
.rankingInfo-ren {
    text-align: center;
    position: absolute;
    right: 6px;
    z-index: 2;
    width: 18px;
    height: 18px;
    background: #FF0000;
    border: 1px solid #fff;
    border-radius: 50%;
    font-size: 10px;
    line-height: 18px;
    color: #fff;
  }
</style>

<template>
  <ul class="footer-menu">
    <li v-for="(n, index) in isOpenChatRoom" :key="index" @click="routerLink(n.link)">
      <div class="nav-icon">
        <i
          class="icon iconfont"
          :class="[n.icon, n.link.includes(currentLink) ? 'text-col' : n.link === '/mobile/studio/#/chatroom' ? 'text-blue' : 'text-gray']"
        ></i>
        <!-- <span class="rankingInfo-ren" v-if="index == 2 && chatRoom.unreadMsgRed > 0">
          {{ chatRoom.unreadMsgRed > 99 ? '99+' : chatRoom.unreadMsgRed }}
        </span> -->
        <!-- <img :class="{'pic1': n.link.includes(currentLink)}" :src="n.default"> -->
      </div>

      <!-- <span :class="[ n.link.includes(currentLink) ? 'text-col' : n.link === '/chatroom' ? 'text-blue' : 'text-gray' ]">
        {{ n.text }}
      </span> -->
    </li>
  </ul>
</template>

<script>
// import {
//   mapState
//   // mapGetters
// } from 'vuex'
import 'Plugins/api'
export default {
  data () {
    return {
      currentLink: this.$route.path,
      nav: [
        {
          default: '/mobile/images/menu/tabBar_home_unsel.png',
          actived: '/mobile/images/menu/tabBar_home_sel.png',
          icon: 'iconshouye_',
          text: '首页',
          link: '/mobile/studio/#/index'
        },
        {
          default: '/mobile/images/menu/tabBar_bet_unsel.png',
          actived: '/mobile/images/menu/tabBar_bet_sel.png',
          icon: 'iconcaizhong_',
          text: '游戏大厅',
          link: '/mobile/studio/#/buyMall'
        },
        {
          default: '/mobile/images/menu/tabBar_room_unsel@3x.png',
          actived: '/mobile/images/menu/tabBar_room_unsel@3x.png',
          icon: 'iconliaotianshi_',
          text: '聊天室',
          link: '/mobile/studio/#/chatroom'
        },
        {
          default: '/mobile/images/menu/tabBar_con_unsel.png',
          actived: '/mobile/images/menu/tabBar_con_sel.png',
          icon: 'iconhuodong_',
          text: '活动',
          link: '/mobile/mall/preferActive.html'
        },
        {
          default: '/mobile/images/menu/tabBar_log_unsel.png',
          actived: '/mobile/images/menu/tabBar_log_sel.png',
          icon: 'iconhuodong_',
          text: '优惠活动',
          link: '/mobile/studio/#/preferActive'
        },
        {
          default: '/mobile/images/menu/tabBar_me_unsel.png',
          actived: '/mobile/images/menu/tabBar_me_sel.png',
          icon: 'iconwode',
          text: '我的',
          link: '/mobile/studio/#/mine'
        }
      ]
    }
  },
  mounted () {
  },
  computed: {
    // ...mapGetters([ 'system_config' ]),
    // 显示聊天条数
    // ...mapState({
    //   chatRoom (state) {
    //     return state.chatRoom
    //   },
    //   init (state) {
    //     return state.chatRoom.init
    //   }
    // }),
    isOpenChatRoom () {
      // 根据系统配置信息判断是否开启聊天室功能
      // if (this.system_config.status && this.system_config.status.chatRoomOpenStatus === 'close') {
      //   return [ ...this.nav.slice(0, 2), ...this.nav.slice(3) ]
      // } else {
      //   return [ ...this.nav.slice(0, 3), ...this.nav.slice(4) ]
      // }
      return this.nav
    }
  },
  methods: {
    create () {
      if (this.init) {
        // if (!this.chatRoom.roomNmae) {
        //   this.chatRoom.roomNmae = this.init.message.chatRooms[0].roomId
        // }
        // let roomss = this.init.message.chatRooms
        // let roomsLengh = roomss.length
        // for (let i = 0; i < roomsLengh; i++) {
        //   if (roomss[i].roomId === this.chatRoom.roomNmae) {
        //     // this.chatRoom.ws.send("{'event': 'joinRoom', 'data':'" + roomss[i].roomId + "'}")
        //   }
        // }
        // let notReadSummaryList = this.init.message.notReadSummaryList
        // let nowMsg = this.Utils.Storage.get('privateChatUnread')
        // if (notReadSummaryList.length > 0) {
        //   let notReadLeng = notReadSummaryList.length
        //   let num = 0
        //   for (let i = 0; i < notReadLeng; i++) {
        //     num += notReadSummaryList[i].count
        //   }
        //   this.chatRoom.unreadMsgRed = num * 1 + nowMsg.length * 1
        // }
        // let hyUnread = this.Utils.Storage.get('hyUnread')
        // if (hyUnread) {
        //   for (let key in hyUnread) {
        //     if (key === this.init.message.member.openid) {
        //       for (let key2 in sessionStorage) {
        //         if (typeof sessionStorage[key2] === 'string' && typeof JSON.parse(sessionStorage[key2])) {
        //           if (JSON.parse(sessionStorage[key2])[0] && JSON.parse(sessionStorage[key2])[0].temporary) {
        //             if (key2 === this.init.message.member.openid) {
        //               this.chatRoom.unreadMsgRed += hyUnread[key].length
        //             }
        //           }
        //         }
        //       }
        //     }
        //   }
        // }
      }
    },
    routerLink (link) {
      // try {
      //   if (link.includes('chatroom')) {
      //     this.$store.commit('voice', 'room')
      //   }
      //   if (link.includes('preferActive')) {
      //     this.$store.commit('voice', 'discounts')
      //   }
      // } catch (error) { console.log(error) }
      if (
        link.indexOf('mine') > -1 &&
        (!this.Utils.Storage.get('sessionid') || !this.Utils.Storage.get('user'))
      ) {
        window.location.href = '/mobile/studio/#/login'
        return
      }
      window.location.href = link
    }
  },
  created () {
    // if (this.$store.state.chatRoom.ws) {
    //   console.log(this.$store.state.chatRoom.ws)
    // }
    // this.create()
  },
  watch: {
    // 'chatRoom.ws': {
    //   handler () {
    //     this.create()
    //   },
    //   deep: false
    // },
    // 'chatRoom.init': {
    //   handler (data) {
    //     let roomss = data.message.chatRooms
    //     let roomsLengh = roomss.length
    //     if (this.chatRoom.roomNmae) {
    //       for (let i = 0; i < roomsLengh; i++) {
    //         if (roomss[i].roomId === this.chatRoom.roomNmae) {
    //           this.chatRoom.ws.send("{'event': 'joinRoom', 'data':'" + roomss[i].roomId + "'}")
    //         }
    //       }
    //     } else {
    //       this.chatRoom.ws.send("{'event': 'joinRoom', 'data':'" + roomss[0].roomId + "'}")
    //       this.chatRoom.roomNmae = roomss[0].roomId
    //     }
    //     this.init.message.member.openid = data.message.member.openid
    //     let num = 0
    //     for (let item of data.message.notReadSummaryList) {
    //       num += item.count * 1
    //     }
    //     this.chatRoom.unreadMsgRed = num
    //     // if (notReadSummaryList) {
    //     //   let notReadLeng = notReadSummaryList.length
    //     //   for (let i = 0; i < notReadLeng; i++) {
    //     //     this.chatRoom.unreadMsgRed += notReadSummaryList[i].count
    //     //   }
    //     // }
    //     let hyUnread = this.Utils.Storage.get('hyUnread')
    //     if (hyUnread) {
    //       for (let key in hyUnread) {
    //         if (key === this.init.message.member.openid) {
    //           for (let key2 in sessionStorage) {
    //             if (typeof sessionStorage[key2] === 'string' && typeof JSON.parse(sessionStorage[key2])) {
    //               if (JSON.parse(sessionStorage[key2])[0] && JSON.parse(sessionStorage[key2])[0].temporary) {
    //                 if (key2 === this.init.message.member.openid) {
    //                   this.chatRoom.unreadMsgRed += hyUnread[key].length * 1
    //                 }
    //               }
    //             }
    //           }
    //         }
    //       }
    //     }
    //   },
    //   deep: true
    // }
  }
}
</script>
