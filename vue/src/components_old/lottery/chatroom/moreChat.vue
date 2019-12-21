<template>
    <section class="fw" v-if="thisShow">
      <section class="moreChat-hots">
        <section class="moreChat-hot pr">
          <div class="moreChat-hot-top">精准计划员热门推荐</div>
          <section class="moreChat-hot-lists fw">
            <swiper :options="swiperOption">
              <swiper-slide  v-for="(item, index) in morePlanner" :key="index"  class="moreChat-hot-list">
                <section @click="goPrivateChat(item)">
                  <img
                    :src="!item.headImg || item.headImg.indexOf('/default') > -1 ? '/mobile/images/mine/geren_tou.png' : item.headImg"
                    class="moreChat-hot-headImg">
                  <p class="moreChat-hot-name wzfw">{{item.nickname}}</p>
                </section>
              </swiper-slide>
              <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
          </section>
          <div v-if="morePlanner.length === 0" class="noData">暂无计划员</div>
          <div v-if="morePlanner.length === 0" class="noData refresh" @click="getManager">点击刷新</div>
        </section>
      </section>
        <section
          class="moreChat pr ft0"
          v-for="(item, index) in moreChat"
          :key="index"
          :style="{height: moreChatImHei + 'px'}"
          @click="joinRoom(item)"
        >
          <img :src="item.bg" class="moreChatIm w100" ref="moreChatIm">
          <!--<img :src="item.item" class="moreChatIm w100" ref="moreChatIm">-->
            <!--<img v-if="!item.cover" src="/mobile/images/chatroom/chat_moreroom_Abg.png" class="moreChatIm w100" ref="moreChatIm">-->
            <!--<img v-else :src="item.cover" class="moreChatIm w100" ref="moreChatIm">-->
            <!--<p class="moreChatIm-join dInV pr" :class="{pd85: item.type === 4}">-->
                <!--<img v-if="item.type === 4" src="../../../assets/images/chatroom/secretroom@3x.png" class="moreChatIm-join-icon">-->
                <!--{{item.name}}-->
            <!--</p>-->
          <section class="moreChatHead fw dInV tc">
            <img ref="moreChatHead" :src="!item.cover || item.cover.indexOf('/default') > -1 ? moreChatDefault : item.cover" style="width:2rem;height:2rem;border-radius:50%;">
          </section>
          <section class="moreChatInfo dInV">
            <h2 class="moreChatTitle wzfw">{{item.name}}</h2>
            <div class="fw">
              <img src="../../../assets/images/chatroom/chat_moreroom_icon1.png" class="fl moreChatNumber moreChatfl">
              <span class="fl moreChatfl">{{item.chatType}}</span>
              <img src="../../../assets/images/chatroom/chat_moreroom_icon2.png" class="fl moreChatNumber">
              <span class="fl moreChatfl">{{item.onlineNumber}}</span>
            </div>
            <p class="fw">
              {{ item.enableChat ? '未禁言' : '禁言中'}}
            </p>
          </section>
          <section class="dInV moreChatRight tc">
            <p class="moreChatRightNumber">{{index + 1 }}</p>
            群聊
          </section>
        </section>
    </section>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { roomListApi, relationManagerApi } from 'Plugins/api'
export default {
  inject: ['reload'],
  name: 'betting-moreChat',
  data () {
    return {
      moreChatImHei: '',
      moreChat: [], // 计划群列表
      morePlanner: [],
      swiperOption: {
        slidesPerView: 3
      },
      joinChatRoom: false,
      roomId: '',
      thisShow: true,
      moreChatDefault: require('../../../assets/images/chatroom/moreChatDefault.jpg'),
      bg: [
        require('../../../assets/images/chatroom/chat_moreroom_Cbg1.png'),
        require('../../../assets/images/chatroom/chat_moreroom_Cbg2.png'),
        require('../../../assets/images/chatroom/chat_moreroom_Cbg3.png'),
        require('../../../assets/images/chatroom/chat_moreroom_Cbg4.png')
      ]
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
    }),
    ...mapGetters([ 'access_token' ])
  },
  created () {
    this.create()
  },
  methods: {
    async create () {
      let _this = this
      _this.getManager()
      // _this.axios.get('/cpi/room/list/' + _this.access_token)
      //   .then((res) => {
      const res = await roomListApi(this.access_token)
      if (res.code === 0) {
        // 过滤 大厅 聊天室等
        let _more = []
        let data = res.data
        for (let m of data) {
          if (m.type === 3 || m.type === 4) {
            switch (m.type) {
              case 3:
                m.chatType = '普通'
                break
              case 4:
                m.chatType = '私密'
                break
            }
            _more.push(m)
          }
        }
        for (let i = 0; i < _more.length; i++) {
          _more[i].bg = this.bg[i % this.bg.length]
        }
        _this.moreChat = _more
        // console.log('sjl', _this.moreChat)
        _this.$nextTick(() => {
          let head = _this.$refs.moreChatHead
          let headLeng = _this.$refs.moreChatHead.length
          for (let i = 0; i < headLeng; i++) {
            head[i].onerror = () => {
              head[i].src = _this.moreChatDefault
            }
          }
          _this.$refs.moreChatIm[0].onload = () => {
            _this.moreChatImHei = _this.$refs.moreChatIm[0].height
          }
          window.onresize = () => {
            _this.moreChatImHei = _this.$refs.moreChatIm[0].height
          }
        })
      }
      // })
      // .catch(() => {})
    },
    // 刷新
    async getManager () {
      this.$indicator.open({
        spinnerType: 'fading-circle'
      })
      const res = await relationManagerApi(this.access_token)
      // if (this.chatRoom.flag) {
      // this.axios.get('/cpi/relation/manager/' + this.access_token)
      //   .then((res) => {
      this.$indicator.close()
      if (res.code === 0) {
        let resData = res.data
        let resDataLeng = resData.length
        for (let i = 0; i < resDataLeng; i++) {
          if (resData[i].type !== 3) {
            this.morePlanner.push(resData[i])
          }
        }
      } else {
        this.$toast({
          message: res.msg,
          position: 'middle',
          duration: 2000
        })
      }
      // })
      // .catch(() => {
      // })
      // }
    },
    // 点击计划员进行私聊
    goPrivateChat (item) {
      let _this = this
      if (_this.init.message.member.openid !== item.openid) {
        let requestData = {
          'event': 'requestPrivateChat',
          'data': {
            'sender': _this.init.message.member.openid,
            'receiver': item.openid
          }
        }
        // friend openid save
        this.$store.commit('friendopenid', item.openid)
        // TODO:点击后有延迟。加一个load效果
        _this.chatRoom.ws.send(JSON.stringify(requestData))
      } else {
        this.$toast({
          message: '不能和自己对话',
          position: 'middle',
          duration: 2000
        })
      }
    },
    leaveChatRoom () {
      let _this = this
      let shareBettingMoney = this.Utils.Storage.get('shareBettingMoney')
      if (shareBettingMoney) {
        delete shareBettingMoney.currentRoom
      }
      this.Utils.Storage.save('shareBettingMoney', shareBettingMoney)
      _this.joinChatRoom = false
      _this.chatRoom.roomNmae = _this.init.message.chatRooms[0].roomId
      // _this.chatRoom.ws.send("{'event': 'leaveRoom', 'data':'" + _this.roomId + "'}")
    },
    // 进入当前计划群
    joinRoom (item) {
      let _this = this
      let { member } = _this.init.message
      let levelId = member.level
      let accessLevel = item.accessLevel
      // console.log('sjl', member)
      // console.log('sj2', accessLevel)
      if (member.type <= 0 && levelId < accessLevel) {
        this.$toast({
          message: '需要晋级到VIP' + accessLevel + '才可以进入房间',
          position: 'middle',
          duration: 2500
        })
        return
      }
      this.chatRoom.roomNmae = item.roomId
      if (item.name === '大厅') {
        location.reload()
      } else {
        let shareBettingMoney = this.Utils.Storage.get('shareBettingMoney')
        let lotteryArr = this.Utils.Storage.get('lotteryArr')
        let json = {}
        if (shareBettingMoney) {
          json = shareBettingMoney
        }
        json.currentRoom = {}
        if (lotteryArr) {
          let lotteryArrLeng = lotteryArr.length
          for (let i = 0; i < lotteryArrLeng; i++) {
            if (item.flag === lotteryArr[i].flag) {
              json.currentRoom = lotteryArr[i]
            }
          }
        }
        json.currentRoom.roomName = item.name
        json.currentRoom.flag = item.flag
        json.currentRoom.roomId = item.roomId
        json.currentRoom.afterLotteryId = this.$route.query.lotteryId
        this.Utils.Storage.save('shareBettingMoney', json)
        _this.$router.push({
          name: 'moreRoom',
          params: {
            roomName: item.name,
            flag: item.flag,
            name: json.currentRoom.name,
            lotteryId: json.currentRoom.lotteryId,
            roomId: item.roomId
          }
        })
      }
    }
  },
  watch: {
    'chatRoom.init': {
      handler (data) {
        let roomss = data.message.chatRooms
        let roomsLengh = roomss.length
        if (this.chatRoom.roomNmae) {
          for (let i = 0; i < roomsLengh; i++) {
            if (roomss[i].roomId === this.chatRoom.roomNmae) {
              this.chatRoom.ws.send("{'event': 'joinRoom', 'data':'" + roomss[i].roomId + "'}")
            }
          }
        } else {
          this.chatRoom.ws.send("{'event': 'joinRoom', 'data':'" + roomss[0].roomId + "'}")
          this.chatRoom.roomNmae = roomss[0].roomId
        }
        this.init.message.member.openid = data.message.member.openid
        for (let item of data.message.notReadSummaryList) {
          this.chatRoom.unreadMsgRed += item.count * 1
        }
        // console.log(this.chatRoom.unreadMsgRed)
        // if (notReadSummaryList) {
        //   let notReadLeng = notReadSummaryList.length
        //   for (let i = 0; i < notReadLeng; i++) {
        //     this.chatRoom.unreadMsgRed += notReadSummaryList[i].count
        //   }
        // }
        let hyUnread = this.Utils.Storage.get('hyUnread')
        if (hyUnread) {
          for (let key in hyUnread) {
            if (key === this.init.message.member.openid) {
              for (let key2 in sessionStorage) {
                if (typeof sessionStorage[key2] === 'string' && typeof JSON.parse(sessionStorage[key2])) {
                  if (JSON.parse(sessionStorage[key2])[0] && JSON.parse(sessionStorage[key2])[0].temporary) {
                    if (key2 === this.init.message.member.openid) {
                      this.chatRoom.unreadMsgRed += hyUnread[key].length
                    }
                  }
                }
              }
            }
          }
          // console.log(this.chatRoom.unreadMsgRed)
        }
      },
      deep: true
    }
  }
}
</script>

<style scoped>
  .moreChat-hots{
    position:fixed;
    left:0;
    top: calc(.8rem + 119px);
    width:100%;
    z-index: 2;
    padding-top:.7rem;
    background:#F5F4F9;
  }
    .moreChat-hot{
      height: 3.45rem;
      background: url(../../../assets/images/chatroom/chat_moreroom_bg.png) no-repeat;
      background-size: 100%;
      margin-top:.15rem;
    }
    .moreChat-hot-top {
        position: absolute;
        right: 0;
        top: -.47rem;
        padding-left: .5rem;
        width: 4.5rem;
        height: .47rem;
        color: #fff;
        line-height: .5rem;
        background: url(../../../assets/images/chatroom/chat_moreroom_bg2.png) no-repeat;
        background-size: 100%;
    }
    .moreChatHead{width:23%;margin-left:5%;}
    .moreChatInfo{font-size:.35rem;width:46%;padding-left: 3%;line-height:.5rem;}
    .moreChatTitle{font-size:.45rem;font-weight:normal;}
    .moreChatNumber{width:.7rem;margin-left:.2rem;}
    .moreChatfl{margin-top:.09rem;padding-left:.05rem;}
    .moreChatNumber:nth-of-type(1){width:.5rem;margin:.08rem 0 0 0;}
    .moreChatRight{font-size:.5rem;margin-left: 5%;}
    .moreChatRightNumber{font-size:.65rem;}
    .moreChat-hot-lists{height:100%;}
    .moreChat-hot-list{float:left;width:25% !important;height:80%;margin:.3rem .55rem 0 .3rem !important;border:1px solid #fff;text-align:center;color:#fff;}
    .moreChat-hot-headImg{margin:.4rem auto;width:1.3rem;height:1.3rem;background:#fff;border-radius:50%;display:block;}
    .moreChat:nth-child(2){margin-top:calc(5.5rem + 111px);}
    .moreChat{height:3rem;color:#fff;}
    .moreChat:before{content:'';width:0;height:100%;display:inline-block;vertical-align:middle;}
    .moreChatIm{position:absolute;left:0;z-index:-1;}
    .moreChatIm-join{min-width:3rem;max-width:93%;border:1px solid;padding:0 .3rem;height:.8rem;line-height:.85rem;color:#fff;font-size:.4rem;text-align:center;}
    .pd85{padding-left:.85rem;}
    .moreChatIm-join-icon{position:absolute;left:0;top:0;width:.6rem;}
    .moreChat-hot-name{max-width:2.5rem;margin:0 auto;}
    .swiper-container{height:100%;}
    .noData{position:absolute;left:0;top:0;width:100%;text-align:center;line-height:2.5rem;color:#fff;}
  .refresh{z-index:2;top:1.6rem;right:0;margin: 0 auto;width:90px;height:25px;line-height:25px;border:1px solid #fff;border-radius:2px;}
</style>
