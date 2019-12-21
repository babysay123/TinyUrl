<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-06 15:34:43
 * @LastEditTime: 2019-09-25 16:39:46
 * @LastEditors: Please set LastEditors
 -->
<template>
    <section class="body">
        <Head>
            <div class="play-center">
                与
                <template v-if="init.message.member.type === 3 && roomType !== 'temporary'">
                    {{queryData.infos.nickname}}
                </template>
                <template v-else-if="roomType === 'service'">
                    客服
                </template>
                <template v-else-if="roomType === 'temporary'">
                    <template v-if="init.message.member.type !== 3">
                        客服
                    </template>
                    <template v-if="init.message.member.type === 3">
                        游客
                    </template>
                </template>
                <template v-else>
                    {{infos.otherInfo.nickname}}
                </template>
                聊天中
            </div>
            <!-- 自己和对方不是客服, 自己和对方不是游客,  -->
            <section v-if="lookDataRightShow" @click="lookDataRight" class="lookData">
                查看资料
            </section>
        </Head>
        <section v-if="topMsg.show" class="top-msg">{{topMsg.content}}</section>
        <!--<Head>与 {{infos.otherInfo.nickname}} 聊天中</Head>-->
        <section
          class="fw main"
          ref="main"
          @touchstart="scrollStart"
          @touchmove="scrollMove"
          @touchend="scrollEnd"
          :style="{height:'calc(100% - 2.55rem - ' + mainHeight + ')' }">
            <mt-loadmore :top-method="loadTop" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
                <div class="oneRoom-list fw ft0 tc" v-if="allLoaded" style="color:#333;font-size:.35rem;">
                    已获取全部数据
                </div>
                <div class="oneRoom-list fw" v-for="(item, index) in oneRoomData" :key="index">
                    <template>
                        <div class="fw" v-if="init.message.member.openid === item.sender && !item.serviceType && item.type !== 'msg' && !item.promptMsg">
                            <section class="tc" v-if="item.times?item.times.show:false">
                                <span class="sendTime">{{item.times.time}}</span>
                            </section>
                            <img
                              :src="!infos.thisInfo.headImg || infos.thisInfo.headImg.indexOf('/default') > -1 ? '/mobile/images/mine/geren_tou.png' : infos.thisInfo.headImg"
                              class="oneRoom-list-headIm fr"
                              :class="{fr: item.type === undefined}"
                              v-if="
                               item.type !== 'msg' &&
                               roomType !== 'temporary' &&
                               init.message.member.type !== -1 &&
                               init.message.member.type !== 3">
                            <img
                              v-if="roomType !== 'temporary' && init.message.member.type === -1"
                              src="../../../assets/images/chatroom/yiming.png" class="oneRoom-list-headIm fr"
                            >
                            <img
                              v-if="init.message.member.type === 3"
                              src="../../../assets/images/chatroom/chat_service.png" class="oneRoom-list-headIm fr"
                            >
                            <img
                              v-if="roomType === 'temporary' && init.message.member.type !== 3"
                              src="../../../assets/images/chatroom/yiming.png" class="oneRoom-list-headIm fr"
                            >
                            <TodayRecord
                              v-if="item.attachment && item.attachment.type === 5"
                              class="fr"
                              :data="JSON.parse(JSON.stringify(item))"
                              @attention="attention(item)"
                            />
                            <!--分享订单模板-->
                            <ShareOrder
                              v-if="item.attachment && (item.attachment.type === 4 || item.attachment.type === 10)"
                              :data="JSON.parse(JSON.stringify(item.attachment))"
                              @lookShareBetting="lookShareBetting(1, item)"
                              @attention="attention(item)"
                              @plannerChat="plannerChat(item)"
                              class="fr"
                              style="margin-top:.15rem;"
                            >
                                <!--<p slot="privateChat" class="room-record-type room-record-type-left">转发</p>-->
                            </ShareOrder>
                            <div class="oneRoom-list-text fr tr"
                                 style="margin-right: .2rem;max-width: 82%;"
                                 v-if="item.status?true:false"
                            >
                                <img
                                  v-if="item.status.success"
                                  src="../../../assets/images/chatroom/load.gif" class="oneRoom-list-load dInV"
                                >
                                <img
                                  v-if="item.status.error"
                                  src="../../../assets/images/chatroom/error.png" class="oneRoom-list-load dInV"
                                >
                                <!-- <Voice class="voice-msg" v-if="item.type === 2" :data="JSON.parse(JSON.stringify(item))">
                                    <span class="video-second" slot="left"  style="right:78px;">{{item.attachment.voice.length}}"</span>
                                </Voice> -->
                                <section
                                  class="oneRoom-list-msg oneRoom-list-msg-this dInV tl"
                                  v-if="
                                  item.type !== 3 &&
                                  (item.attachment && item.attachment.type !== 11 && item.attachment.type !== 4 && item.attachment.type !== 5 && item.attachment.type !== 10) && item.type !== 2" >{{item.content}}</section>
                                <section class="flieImgH-box fw dInV">
                                    <img  v-if="item.type === 3" :src="item.attachment.image.smallUrl" :style="{width: item.imgWidth / 60 + 'rem'}" @click="flieImgH(item)" class="oneRoomlistimg dInV">
                                </section>
                            </div>
                            <!--红包消息模板-->
                            <template v-if="item.attachment">
                                <section class="fw fr" v-if="item.attachment.type === 11" style="max-width:80%;">
                                    <div class="room-info room-info-hb fr">
                                        发了一个 红包
                                        <img src="../../../assets/images/chatroom/room-hb.png" class="room-share-icon dInV">
                                    </div>
                                    <div class="room-pthb fr">
                                        <p class="room-pthb-title">{{item.attachment.redPacket.message}}</p>
                                        <p class="room-pthb-click" @click="regBagReceive(item)">立即领取</p>
                                    </div>
                                </section>
                            </template>
                            <!--红包消息模板 end-->
                        </div>
                        <div v-if="init.message.member.openid !== item.attachment.sender.openid && item.type !== 'msg' && item.attachment.type !== 9">

                            <section class="tc" v-if="item.times && item.times.show">
                                <span class="sendTime">{{item.times.time}}</span>
                            </section>
                            <img
                              :src="!infos.otherInfo.headImg || infos.otherInfo.headImg.indexOf('/default') > -1 ? '/mobile/images/mine/geren_tou.png' : infos.otherInfo.headImg"
                              class="oneRoom-list-headIm fl"
                              style="margin-right:.2rem;"
                              v-if="
                                roomType !== 'temporary' &&
                                !item.promptMsg &&
                                item.attachment.sender.type !== -1 &&
                                item.attachment.sender.type !== 3"
                            >
                            <img
                              v-if="roomType !== 'temporary' && item.attachment.sender.type === -1"
                              src="../../../assets/images/chatroom/yiming.png" class="oneRoom-list-headIm fl"
                            >
                            <img
                              v-if="item.attachment.sender.type === 3 && init.message.member.type !== 3"
                              src="../../../assets/images/chatroom/chat_service.png" class="oneRoom-list-headIm fl"
                            >
                            <img
                              v-if="roomType === 'temporary' && item.attachment.sender.type !== 3 && !item.promptMsg"
                              src="../../../assets/images/chatroom/yiming.png" class="oneRoom-list-headIm fl">
                            <TodayRecord
                              v-if="item.attachment && item.attachment.type === 5"
                              :data="JSON.parse(JSON.stringify(item))"
                              @attention="attention(item)"
                            />
                            <!--分享订单模板-->
                            <ShareOrder
                              v-if="item.attachment && (item.attachment.type === 4 || item.attachment.type === 10)"
                              :data="JSON.parse(JSON.stringify(item.attachment))"
                              @lookShareBetting="lookShareBetting(1, item)"
                              @attention="attention(item)"
                              @plannerChat="plannerChat(item)"
                              class="fl"
                              style="margin-top:.15rem;"
                            >
                                <!--<p slot="privateChat" class="room-record-type room-record-type-left">转发</p>-->
                            </ShareOrder>
                            <div
                              v-if="!item.promptMsg"
                              class="oneRoom-list-text fl"
                              style="float:left;"
                              :style="{
                                'width': item.attachment && item.attachment.type === 4 ? '100%': ''
                              }"
                            >
                                <!-- <Voice class="voice-msg" v-if="item.type === 2" :data="JSON.parse(JSON.stringify(item))">
                                    <span class="video-second" slot="right">{{item.attachment.voice.length}}"</span>
                                </Voice> -->
                                <section
                                  v-if="
                                  item.attachment &&
                                  item.attachment.type !== 11 &&
                                  item.type !== 3 &&
                                  item.attachment.type !== 4 &&
                                  item.attachment.type !== 5 &&
                                  item.type !== 2 &&
                                  item.attachment.type !== 10"
                                  class="oneRoom-list-msg oneRoom-list-msg-other dInV"
                                >{{item.content}}</section>
                                <section class="flieImgH-box fw">
                                    <img  v-if="item.type === 3" :src="item.attachment.image.smallUrl" :style="{width: item.imgWidth / 60 + 'rem'}" @click="flieImgH(item)" class="oneRoomlistimg">
                                </section>
                                <!--红包消息模板-->
                                <template v-if="item.attachment">
                                    <section class="fw fl" v-if="item.attachment.type === 11" style="max-width:99%;">
                                        <div class="room-info room-info-hb fl" style="padding-top:0;">
                                            发了一个 红包
                                            <img src="../../../assets/images/chatroom/room-hb.png" class="room-share-icon dInV">
                                        </div>
                                        <div class="room-pthb fl">
                                            <p class="room-pthb-title">{{item.attachment.redPacket.message}}</p>
                                            <p class="room-pthb-click" @click="regBagReceive(item)">立即领取</p>
                                        </div>
                                    </section>
                                </template>
                                <!--红包消息模板 end -->
                            </div>
                            <div v-if="(roomType === 'temporary' || roomType === 'service') && service.type !== 3 && item.promptMsg">
                                <img src="../../../assets/images/chatroom/chat_service.png" class="oneRoom-list-headIm fl" style="margin-right:.2rem;">
                                <section class="fw">
                                    <!--<img :src="infos.otherInfo.headImg" class="oneRoom-list-headIm fl" style="margin-right:.2rem;">-->
                                    <div class="oneRoom-list-text fl fw w100">
                                        <section class="oneRoom-list-msg oneRoom-list-msg-other dInV w80">
                                            <p class="service_greeting">{{item.service.title.greeting}}</p>
                                            <ul class="fw">
                                                <li class="service_list" v-for="(itemTitle, indexTitle) in service.title.scenes" :key="indexTitle" @click="problem(itemTitle)">
                                                    {{itemTitle.name}}
                                                </li>
                                            </ul>
                                            <p class="service_slogan">{{item.service.title.slogan}}</p>
                                        </section>
                                    </div>
                                </section>
                            </div>
                        </div>
                        <section class="tc ft0 fw clear" v-if="item.type === 'msg' && !item.serviceType">
                            <p class="room-time dInV mg0">{{item.content}}</p>
                        </section>
                    </template>
                </div>
            </mt-loadmore>
        </section>
        <!--点击图片放大-->
        <section class="bigFlieImg-box tc" v-if="bigFlieImg.show" @click="bigFlieImgClose">
            <img :src="bigFlieImg.url" class="bigFlieImg dInV"  ref="bigFlieImg">
        </section>
        <!--点击图片放大 end-->
        <!--发送红包模板-->
        <section class="send-hbbg send-hbbg2" v-if="sendHb.show">
            <section class="send-hbbg-box dInV">
                <div class="beeting-look-title">
                    <span>发送个人红包</span>
                    <span class="beeting-look-close" @click="sendHb.show = false">X</span>
                </div>
                <ul class="fw w100">
                    <li class="send-hbbg-list">
                        <span class="send-hbbg-list-left">总金额</span>
                        <input
                          type="text"
                          class="send-hbbg-text"
                          oninput = "value=value.replace(/[^\d.]/g,'')"
                          placeholder="请输入红包金额"
                          v-model="regBagSend.money">
                    </li>
                    <li class="send-hbbg-list">
                        <span class="send-hbbg-list-left">我的发言</span>
                        <input type="text" class="send-hbbg-text" placeholder="请输入要说的话(不超过15个汉字)" v-model="regBagSend.msg">
                    </li>
                </ul>
                <button class="send-hbbg-btn" @click="regBag">发送</button>
            </section>
        </section>
        <!--发送红包模板 end-->
        <!--领取红包-->
        <RegBagReceive
          v-if="regBags.hbBgShow"
          :data="regBags"
          :rooms="queryData"
          @RegBagReceiveClose="RegBagReceiveClose"/>
        <!--领取红包 end-->
        <!--红包详情模板-->
        <Details v-if="regBags.details" :data="regBags.detailsData" class="body" style="z-index:499"  @redDetailsisShow = "redDetailssShow"></Details>
        <!--红包详情模板 end-->
        <section class="room-send wrap" ref="roomSend">
            <section class="room-send-btns">
                <img src="../../../assets/images/chatroom/room-yy.png" class="room-send-gn dInV dn" @click="sendYy">
                <input type="text" class="room-send-text dInV" ref="sendText" value="" v-if="sendTextShow" v-model="userText" @keyup.enter="clickButton">
                <div class="room-send-yy dInV" v-if="sendYyShow" @touchstart="sendYyStart" @touchend="sendYyEnd">按住说话</div>
                <img src="../../../assets/images/chatroom/room-bq.png" class="room-send-gn dInV" @click="emoji">
                <section v-if="semdMsd" class="dInV semdMsd" @click="clickButton">发送</section>
                <img v-if="!semdMsd" src="../../../assets/images/chatroom/room-more.png" class="room-send-gn dInV" @click="sendMoreBox">
            </section>
            <section class="room-send-more-boxs fw" v-show="moreBoxShow" :style="{height: SendMoreBoxHeight + 'rem'}">
                <mt-swipe :auto="0">
                    <mt-swipe-item>
                        <ul class="fw"  ref="roomSendMoreBox">
                            <li class="room-send-more-box dInV">
                                <img src="../../../assets/images/chatroom/chat_photo.png" class="room-send-more-icon">
                                <input id="flie" ref="flie" type="file" accept="image/png,image/gif,image/jpeg" value="" @change="imgEvent('flie')"/>
                                照片
                            </li>
                            <li class="room-send-more-box dInV pr">
                                <img src="../../../assets/images/chatroom/foote8.png" class="room-send-more-icon">
                                <input id="camera" ref="camera" runat="server" type="file" accept="image/*" capture="camera" value="" @change="imgEvent('camera')"/>拍摄
                            </li>
                            <li v-if="roomType !== 'temporary' && init.message.member.type !== 3" class="room-send-more-box dInV" @click="sendHbo">  <!--@click="sendHbo('commonRedPacket')"-->
                                <img src="../../../assets/images/chatroom/foote3.png" class="room-send-more-icon">
                                红包
                            </li>
                        </ul>
                    </mt-swipe-item>
                </mt-swipe>
            </section>
            <Emojs v-if="emojis.show" @addEmoji = "addEmoji"></Emojs>
        </section>
        <!--emojis-->
        <!--emojis end-->
        <Share-betting v-if="lookBetting.show" :data="JSON.parse(JSON.stringify(lookBetData))"  @closeH="shareBettion"/>
        <!--分享订单 end-->
        <!--查看资料-->
        <LookInformation v-if="actionsLookData" :lookData="actionsData" @openLookClose="openLookClose" class="body"></LookInformation>
        <!--查看资料 end-->
    </section>
</template>

<script>
import Head from 'Components/global/head'
import LookInformation from 'Components/lottery/chatroom/lookInformation'
import { Loadmore } from 'mint-ui'
import Details from 'Components/lottery/chatroom/redDefaile'
// import Voice from 'Components/lottery/chatroom/module/voice'
import ShareBetting from 'Components/lottery/chatroom/shareBetting'
import Emojs from 'Components/lottery/chatroom/module/emoji'
import ShareOrder from 'Components/lottery/chatroom/module/shareOrder'
import TodayRecord from 'Components/lottery/chatroom/module/todayRecord'
import RegBagReceive from 'Components/lottery/chatroom/module/regBagReceive'
import { mapState } from 'vuex'
export default {
  name: 'privateChat',
  data () {
    return {
      ws: null,
      allLoaded: false,
      queryData: null,
      roomType: null,
      sendYyShow: false,
      sendTextShow: true,
      userText: '',
      oneRoomShow: false,
      oneRoomData: [],
      headImg: this.$store.state.chatRoom.headImg,
      mainHeight: null,
      moreBoxShow: false,
      SendMoreBoxHeight: '',
      emojis: {
        show: false
      },
      params: {
        offset: 0,
        count: 20
      },
      infos: {
        thisInfo: {},
        otherInfo: {}
      },
      openId: {
        other: ''
      },
      unreadMsgArr: [],
      purview: {
        getPurview: null,
        getPurviewo: function () {},
        roomShutup: [0x00000001, 0x00000002, 0x00000004, 0x00000008, 0x00000010, 0x00000020, 0x00000040],
        roomPurview: [],
        userShutup: [0x00000001, 0x00000002, 0x00000004, 0x00000008, 0x00000010, 0x00000020, 0x00000040, 0x00000080], // 发言权限
        userPurview: [],
        otherUserShutup: [],
        otherUserPurview: [],
        permission (auth, number) { return (auth & number) === number },
        otherAuthority: null
      },
      actionsData: {},
      receiveRegDetails: {},
      actionsLookData: false,
      lookData: {
        openID: '',
        OneRoom: false,
        OneRoomData: [],
        oneRoomMsg: [],
        oneRoomData: false,
        oneRoomRes: {},
        queryData: null
      },
      userInfos: {},
      lookBetting: {
        show: false,
        theme: false,
        lotteryName: '',
        issue: '',
        content: '',
        playId: '',
        playName: '',
        rebate: '',
        unitFee: '',
        totalFee: '',
        data: ''
      },
      sendHb: {
        type: null,
        show: false,
        bg: {
          commonRedPacket: 'url(' + require('../../../assets/images/chatroom/room-hbb.png') + ')',
          flauntRedPacket: 'url(' + require('../../../assets/images/chatroom/room-hbb.png') + ')',
          speciallyRedPacket: 'url(' + require('../../../assets/images/chatroom/chat_ZYred.png') + ')'
        }
      },
      regBagSend: {
        userId: '',
        money: '',
        msg: '恭喜发财, 大吉大利'
      },
      regBags: {
        chai: false,
        yes: false,
        already: false,
        expired: false,
        no: false,
        rid: '',
        info: {},
        details: false,
        detailsData: [],
        hbBgShow: false,
        getRegBag: {
          regBagData: [],
          info: {},
          money: ''
        }
      },
      chatroomStorage: {},
      service: {
        title: [],
        isService: false,
        isProblem: 'qita',
        serviceCount: [],
        problem: false,
        msg: [],
        chatId: '',
        receiver: '',
        sender: '',
        type: 0,
        serviceStorage: []
      },
      voice: {
        voiceStorage: []
      },
      bigFlieImg: {
        show: false,
        url: ''
      },
      semdMsd: false,
      history: {
        offset: 0,
        count: 30,
        num: 0
      },
      topMsg: {
        show: false,
        content: ''
      },
      lookBetData: {},
      scrollH: {
        flag: true,
        top: 0,
        start: 0,
        end: 0
      }, // 滚动条开关
      problemFlag: true,
      afterTime: 0,
      afterData: null, // 临时保存当前发送的这条消息
      lookDataRightShow: false,
      ShareOrderShow: false
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
  watch: {
    userText () {
      this.userText !== '' ? this.semdMsd = true : this.semdMsd = false
      if (this.semdMsd) {
        this.$refs.sendText.style.width = '67%'
      } else {
        this.$refs.sendText.style.width = '74%'
      }
    },
    'chatRoom.privateChat': {
      handler (newVal) {
        console.log(newVal)
        // if (newVal.message.attachment.voice) {
        //   // 语音控制
        //   newVal.message.attachment.voice.play = false
        //   let json = {}
        //   json.messageId = newVal.messageId
        //   json.unread = newVal.message.attachment.voice.unread = true
        //   this.voice.voiceStorage.push(json)
        //   this.Utils.Storage.save('voiceUnread', this.voice.voiceStorage)
        // }
      }
    },
    'chatRoom.privateRedPacket': {
      handler (newVal) {
        console.log(newVal)
        let obj = {
          event: '',
          message: {
            attachment: null
          }
        }
        obj.event = newVal.event
        obj.attachment = newVal.message
        obj.message.attachment = newVal.message
        obj.message.bussType = newVal.message.bussType
        obj.message.chatId = newVal.message.chatId
        obj.message.content = newVal.message.content
        obj.message.type = newVal.message.type
        obj.message.redPacket = newVal.message.redPacket
        obj.type = newVal.message.type
        obj.sender = newVal.message.sender.openid
        this.oneRoomData.push(obj)
        console.log('oneRoomData', this.oneRoomData)
        console.log('init', this.init)
        // if (obj.message.attachment.voice) {
        //   // 语音控制
        //   obj.message.attachment.voice.play = false
        //   let json = {}
        //   json.messageId = obj.messageId
        //   json.unread = obj.message.attachment.voice.unread = true
        //   this.voice.voiceStorage.push(json)
        //   this.Utils.Storage.save('voiceUnread', this.voice.voiceStorage)
        // }
      }
    },
    'chatRoom.serviceMsg': {
      handler (serviceMsg) {
        let _this = this
        _this.oneRoomData.push(serviceMsg)
        if (serviceMsg.type === 'msg') {
          _this.service.chatId = serviceMsg.chatId
          _this.service.receiver = serviceMsg.receiver
          _this.service.sender = serviceMsg.sender
        }
      },
      deep: true
    },
    'chatRoom.oneRoomData': {
      handler (newVal) {
        let _this = this
        let chatId = _this.queryData.chatId || _this.service.chatId
        _this.chatRoom.currentChatId = chatId
        // if (newVal.attachment && newVal.attachment.voice) {
        //   // newVal.attachment.voice.play = false
        //   let json = {}
        //   // json.messageId = newVal.messageId
        //   json.unread = true
        //   _this.voice.voiceStorage.push(json)
        //   this.Utils.Storage.save('voiceUnread', _this.voice.voiceStorage)
        // }
        if (_this.chatRoom.oneRoomData.chatId === _this.chatRoom.currentChatId) {
          console.log(newVal)
          if (newVal.bussType === 3 && newVal.attachment.sender.type !== 3 && _this.roomType !== 'temporary') {
            // newVal.chatType = 1
            newVal.manager = true
            let manager = {}
            if (JSON.parse(sessionStorage.getItem('manager'))) {
              manager = JSON.parse(sessionStorage.getItem('manager'))
              if (manager[newVal.chatId]) {
                manager[newVal.chatId].push(newVal)
              } else {
                manager[newVal.chatId] = []
                manager[newVal.chatId].push(newVal)
              }
            } else {
              manager[newVal.chatId] = []
              manager[newVal.chatId].push(newVal)
            }
            sessionStorage.setItem('manager', JSON.stringify(manager))
            _this.oneRoomData.push(newVal)
          } else if (_this.roomType === 'temporary') {
            _this.oneRoomData.push(newVal)
          } else {
            _this.oneRoomData.push(newVal)
          }
        }
      },
      deep: true
    },
    'oneRoomData': {
      handler () {
        let _this = this
        if (this.scrollH.flag) {
          _this.$nextTick(() => {
            _this.$refs.main.scrollTop = _this.$refs.main.scrollHeight
          })
        }
      },
      deep: true
    },
    'chatRoom.diglogClose': {
      handler () {
        let _this = this
        if (_this.init.message.member.type < 1 && _this.chatRoom.diglogClose) {
          _this.axios.get('/cpi/customer_service/select/' + _this.chatRoom.flag)
            .then((seleRes) => {
              if (seleRes.code === 0) {
                _this.service.title = seleRes.data
                _this.service.isService = true
                _this.menberService(_this)
              }
            })
            .catch(() => {})
        }
      },
      deep: true
    },
    'chatRoom.diglogOk': {
      handler () {
        let _this = this
        if (_this.chatRoom.diglogOk) {
          // 存游客
          if (_this.init.message.member.type === -1) {
            _this.ykAfterServier(_this.afterData)
          }
          // 存会员
          if (_this.init.message.member.type === 0) {
            _this.afterService(_this.afterData)
          }
          _this.chatRoom.diglogOk = false
        }
      },
      deep: true
    },
    'chatRoom.msgIsUnread': {
      handler (newVal) {
        let _this = this
        let data = _this.oneRoomData
        let dataLeng = data.length
        if (_this.init.message.member.type !== -1) {
          // 私聊
          if (newVal.success) {
            for (let i = 0; i < dataLeng; i++) {
              if (Number(newVal.msgId) === data[i].msgId) {
                data[i].status.success = false
                console.log('发送成功啦')
              }
            }
            if (_this.init.message.member.type === 3 && _this.afterData && (_this.afterData.attachment.receiver.type === -1 || _this.afterData.attachment.sender.type === -1)) {
              console.log('存游客和客服')
              let chatId = _this.queryData.chatId
              if (!JSON.parse(sessionStorage.getItem(chatId))) {
                let temporary = []
                temporary.push(_this.afterData)
                sessionStorage.setItem(chatId, JSON.stringify(temporary))
              } else {
                let temporary = JSON.parse(sessionStorage.getItem(chatId))
                _this.afterData.temporary = true
                temporary.push(_this.afterData)
                sessionStorage.setItem(chatId, JSON.stringify(temporary))
              }
            } else if (_this.init.message.member.type > 0 && _this.init.message.member.type !== 3 && _this.afterData && (_this.afterData.attachment.receiver.type === -1 || _this.afterData.attachment.sender.type === -1)) {
              console.log('存管理和游客')
              _this.afterData.bussType = 3
              _this.afterData.manager = true
              let manager = {}
              if (JSON.parse(sessionStorage.getItem('manager'))) {
                manager = JSON.parse(sessionStorage.getItem('manager'))
                if (manager[_this.queryData.chatId]) {
                  manager[_this.queryData.chatId].push(_this.afterData)
                } else {
                  manager[_this.queryData.chatId] = []
                  manager[_this.queryData.chatId].push(_this.afterData)
                }
              } else {
                manager[_this.queryData.chatId] = []
                manager[_this.queryData.chatId].push(_this.afterData)
              }
              sessionStorage.setItem('manager', JSON.stringify(manager))
            }
          } else {
            for (let i = 0; i < dataLeng; i++) {
              if (Number(newVal.msgId) === data[i].msgId) {
                data[i].status.success = false
                data[i].status.error = true
                console.log('发送失败啦')
                if (newVal.msg === 'com.wwc.common.exception.BaseException: 用户不存在') {
                  this.$toast({
                    message: '会话已关闭',
                    position: 'middle',
                    duration: 1500
                  })
                } else {
                  this.$toast({
                    message: newVal.msg,
                    position: 'middle',
                    duration: 1500
                  })
                }
              }
            }
          }
        } else {
          if (newVal.success) {
            if (newVal.msg === '对方没在线') {
              for (let i = 0; i < dataLeng; i++) {
                if (Number(newVal.msgId) === data[i].msgId) {
                  data[i].status.success = false
                  data[i].status.error = true
                  console.log('发送失败啦')
                }
              }
              this.$toast({
                message: '对方不在线, 游客不能留言',
                position: 'middle',
                duration: 1500
              })
            } else {
              for (let i = 0; i < dataLeng; i++) {
                if (Number(newVal.msgId) === data[i].msgId) {
                  data[i].status.success = false
                  console.log('发送成功啦')
                }
              }
              if (_this.infos && _this.infos.otherInfo && _this.infos.otherInfo.type !== 3) {
              // if (_this.afterData.manager) {
                // 游客的私聊
                console.log('存管理和游客的私聊')
                _this.afterData.bussType = 3
                _this.afterData.manager = true
                let manager = {}
                if (JSON.parse(sessionStorage.getItem('manager'))) {
                  manager = JSON.parse(sessionStorage.getItem('manager'))
                  if (manager[_this.queryData.chatId]) {
                    manager[_this.queryData.chatId].push(_this.afterData)
                  } else {
                    manager[_this.queryData.chatId] = []
                    manager[_this.queryData.chatId].push(_this.afterData)
                  }
                } else {
                  manager[_this.queryData.chatId] = []
                  manager[_this.queryData.chatId].push(_this.afterData)
                }
                sessionStorage.setItem('manager', JSON.stringify(manager))
              } else {
                // 游客的客服
                console.log('存游客客服')
                let chatId = _this.service.chatId
                if (!JSON.parse(sessionStorage.getItem(chatId))) {
                  let temporary = []
                  temporary.push(_this.afterData)
                  sessionStorage.setItem(chatId, JSON.stringify(temporary))
                } else {
                  let temporary = JSON.parse(sessionStorage.getItem(chatId))
                  data.temporary = true
                  temporary.push(_this.afterData)
                  sessionStorage.setItem(chatId, JSON.stringify(temporary))
                }
              }
            }
          } else {
            for (let i = 0; i < dataLeng; i++) {
              if (Number(newVal.msgId) === data[i].msgId) {
                data[i].status.success = false
                data[i].status.error = true
                console.log('发送失败啦')
              }
            }
            this.$toast({
              message: newVal.msg,
              position: 'middle',
              duration: 1500
            })
          }
        }
        _this.userText = ''
      },
      deep: true
    }
  },
  beforeCreate () {
    this.$indicator.open({ spinnerType: 'fading-circle' })
  },
  created () {
    this.create()
  },
  methods: {
    RegBagReceiveClose () {
      this.regBags.hbBgShow = false
    },
    lookDataRight () {
      let _this = this
      let openId = null
      if (_this.init.message.member.type > 0 && _this.queryData.attachment && (_this.queryData.attachment.receiver.type === -1 || _this.queryData.attachment.sender.type === -1)) {
        let receiver = _this.queryData.attachment.receiver
        let sender = _this.queryData.attachment.sender
        console.log('查看游客资料')
        if (receiver.type === -1) {
          _this.actionsData = receiver
        } else if (sender.type === -1) {
          _this.actionsData = sender
        }
        _this.actionsData.privateflag = true
        _this.actionsLookData = true
      } else {
        console.log('查看非游客资料')
        if (_this.init.message.member.openid === _this.queryData.sender) {
          openId = _this.queryData.receiver
        } else {
          openId = _this.queryData.sender
        }
        _this.axios.get('/cpi/relation/detail/' + _this.chatRoom.flag + '?openid=' + openId)
          .then((res) => {
            if (res.code === 0) {
              _this.actionsData.fansNumber = res.data.fansNumber
              _this.actionsData.followNumber = res.data.followNumber
              _this.actionsData.attention = res.data.attention
              _this.actionsData.identity = res.data.member.identity
              _this.actionsData.nickname = res.data.member.nickname
              _this.actionsData.openid = res.data.member.openid
              _this.actionsData.level = res.data.member.level
              _this.actionsData.headImg = res.data.member.headImg
              _this.actionsData.shutup = res.data.shutup
              _this.actionsData.stop = res.data.stop
              _this.actionsData.markName = res.data.member.markName
              _this.actionsData.privateflag = true
              _this.actionsLookData = true
            }
          })
          .catch(() => {})
      }
    },
    scrollStart (e) {
      this.scrollH.start = e.touches[0].pageX
    },
    scrollMove (e) {
      this.scrollH.end = e.touches[0].pageX
    },
    scrollEnd () {
      let top = this.scrollH.end - this.scrollH.start
      let bottom = this.scrollH.start - this.scrollH.end
      if (this.$refs.main.scrollTop + this.$refs.main.clientHeight === this.$refs.main.scrollHeight) {
        this.scrollH.flag = true
      } else if (top >= 5 || bottom >= 5) {
        this.scrollH.flag = false
      }
    },
    addEmoji (item) {
      this.userText += item
    },
    emoji () {
      let _this = this
      _this.emojis.show = !_this.emojis.show
      _this.moreBoxShow = false
      if (this.emojis.show) {
        this.chatRoom.roomNmae === this.init.message.chatRooms[0].roomId ? this.mainHeight = '4.7rem' : this.mainHeight = '2.2rem'
      } else {
        this.chatRoom.roomNmae === this.init.message.chatRooms[0].roomId ? this.mainHeight = '0rem' : this.mainHeight = '-2.4rem'
      }
      this.$nextTick(() => {
        this.$refs.main.scrollTop = this.$refs.main.scrollHeight
      })
    },
    openLookClose () {
      this.actionsLookData = false
    },
    shareBettion () {
      this.lookBetting.show = false
    },
    plannerChat (item) {
      this.axios.get('/cpi/relation/friend/' + this.chatRoom.flag + '?openid=' + item.attachment.sender.openid)
      if (this.init.message.member.type === 3) {
        this.$toast({
          message: '你不能和计划员对话',
          position: 'middle',
          duration: 1500
        })
      } else {
        let requestData = {
          'event': 'requestPrivateChat',
          'data': {
            'sender': this.init.message.member.openid,
            'receiver': item.attachment.sender.openid
          }
        }
        this.chatRoom.ws.send(JSON.stringify(requestData))
      }
    },
    getDayName (d) {
      let td = new Date()
      td = new Date(td.getFullYear(), td.getMonth(), td.getDate())
      let od = new Date(d)
      od = new Date(od.getFullYear(), od.getMonth(), od.getDate())
      let hourss = new Date(d).getHours()
      let minutess = new Date(d).getMinutes()
      if (hourss < 10) {
        hourss = '0' + hourss
      }
      if (minutess < 10) {
        minutess = '0' + minutess
      }
      let xc = (od - td) / 1000 / 60 / 60 / 24
      if (xc < -2) {
        return -xc + '天前' + ' ' + hourss + ':' + minutess
      } else if (xc < -1) {
        return '前天' + ' ' + hourss + ':' + minutess
      } else if (xc < 0) {
        return '昨天' + ' ' + hourss + ':' + minutess
      } else if (xc === 0) {
        return '今天' + ' ' + hourss + ':' + minutess
      }
    },
    ykkf (_this) {
      _this.axios.get('/cpi/customer_service/init/' + _this.chatRoom.flag + '?scene=' + _this.service.isProblem)
        .then((res) => {
          if (res.code === 0) {
            // 如果客服在线
            console.log('如果游客--客服在线')
            console.log(res)
            _this.service.serviceCount = res.data
            _this.service.chatId = res.data.chatId
            _this.service.receiver = res.data.receiver
            _this.service.sender = res.data.sender
            if (_this.init.message.member.openid === _this.service.receiver) {
              _this.openId.other = _this.service.sender
            } else {
              _this.openId.other = _this.service.receiver
            }
            let msgId = new Date().getTime()
            let data = {
              attachment: {
                receiver: _this.infos.otherInfo,
                sender: _this.init.message.member,
                type: 1
              },
              bussType: 3,
              chatType: 1,
              timestamp: msgId,
              msgId: msgId,
              status: {
                success: true,
                error: false
              },
              chatId: _this.service.chatId,
              content: _this.userText,
              receiver: _this.openId.other,
              sender: _this.init.message.member.openid,
              serviceMsg: true,
              temporary: true,
              type: 0
            }
            let request = {
              event: 'privateServiceChat',
              msgId: msgId,
              data
            }
            _this.msgTimes(data, _this.oneRoomData)
            _this.chatRoom.ws.send(JSON.stringify(request))
            _this.oneRoomData.push(data)
            _this.afterData = data
            // _this.userText = ''
          } else {
            console.log('如果游客--客服不在线')
            console.log(res)
            if (res.code === 999) {
              // _this.topMsg.content = res.msg
            } else {
              _this.topMsg.show = true
              _this.topMsg.content = '客服不在线, 游客不能留言'
            }
            _this.userText = ''
            // _this.chatRoom.serviceOnline = false
          }
        })
        .catch(() => {})
    },
    hykf (_this) {
      let bstp = 0
      if (_this.roomType === 'service') {
        bstp = 2
      }
      if (_this.roomType === 'temporary') {
        bstp = 3
      }
      _this.axios.get('/cpi/customer_service/init/' + _this.chatRoom.flag + '?scene=' + _this.service.isProblem)
        .then((res) => {
          if (res.code === 0) {
            // 如果客服在线
            console.log('如果客服在线')
            _this.service.serviceCount = res.data
            // _this.chatRoom.serviceOnline = true
            _this.service.chatId = res.data.chatId
            _this.service.receiver = res.data.receiver
            _this.service.sender = res.data.sender
            if (_this.init.message.member.openid === _this.service.receiver) {
              _this.openId.other = _this.service.sender
            } else {
              _this.openId.other = _this.service.receiver
            }
            let msgId = new Date().getTime()
            let data = {
              attachment: {
                receiver: _this.infos.otherInfo,
                sender: _this.init.message.member,
                type: 1
              },
              bussType: bstp,
              chatType: 1,
              timestamp: msgId,
              msgId: msgId,
              status: {
                success: true,
                error: false
              },
              chatId: _this.service.chatId,
              content: _this.userText,
              receiver: _this.openId.other,
              sender: _this.init.message.member.openid,
              serviceMsg: true,
              temporary: true,
              type: 0
            }
            let request = {
              event: 'privateServiceChat',
              msgId: msgId,
              data
            }
            _this.msgTimes(data, _this.oneRoomData)
            _this.chatRoom.ws.send(JSON.stringify(request))
            _this.oneRoomData.push(data)
            _this.afterData = data
            _this.userText = ''
          } else {
            console.log('如果客服不在线')
            _this.topMsg.show = true
            _this.topMsg.content = '客服繁忙,已转为留言'
            let msgId = new Date().getTime()
            if (_this.roomType !== 'temporary') {
              let data = {
                attachment: {
                  receiver: _this.infos.otherInfo,
                  sender: _this.init.message.member,
                  type: 1
                },
                chatType: 1,
                timestamp: msgId,
                msgId: msgId,
                status: {
                  success: true,
                  error: false
                },
                bussType: bstp,
                content: _this.userText,
                sender: _this.init.message.member.openid,
                type: 0
              }
              let request = {
                event: 'serviceOffLineChat',
                msgId: msgId,
                data
              }
              _this.msgTimes(data, _this.oneRoomData)
              _this.chatRoom.ws.send(JSON.stringify(request))
              _this.oneRoomData.push(data)
              _this.afterData = data
              _this.userText = ''
            }
            // _this.chatRoom.serviceOnline = false
          }
        })
        .catch(() => {})
    },
    lsMsgTimes (data, i) {
      data[i].times = {}
      data[i].times.show = false
      data[i].times.time = 0
      if (i > 0) {
        let now = data[i].timestamp
        let detailed = parseInt((now - data[i - 1].timestamp) / 60000)
        if (detailed > 5) {
          data[i].times.show = true
          data[i].times.time = this.getDayName(now)
        }
      }
    },
    msgTimes (data, obj) {
      data.times = {
        show: false,
        time: 0
      }
      let now = new Date().getTime()
      let detailed
      if (obj.length === 0) {
        detailed = 6
      } else {
        detailed = parseInt((now - obj[obj.length - 1].timestamp) / 60000)
      }
      if (detailed > 5) {
        let hours = new Date(now).getHours()
        let minutes = new Date(now).getMinutes()
        if (hours < 10) {
          hours = '0' + hours
        }
        if (minutes < 10) {
          minutes = '0' + minutes
        }
        data.times.show = true
        data.times.time = '今天 ' + hours + ':' + minutes
      }
    },
    menberService (_this) {
      let promptData = {
        attachment: {
          receiver: _this.infos.otherInfo,
          sender: _this.init.message.member,
          type: 1
        },
        chatId: _this.queryData.chatId,
        content: _this.userText,
        receiver: _this.init.message.member.openid,
        sender: _this.openId.other,
        service: _this.service,
        times: {
          show: false,
          time: ''
        },
        serviceType: true,
        promptMsg: true,
        type: 0
      }
      _this.oneRoomData.push(promptData)
    },
    loadTop () {
      let _this = this
      if (!_this.allLoaded) {
        setTimeout(() => {
          _this.$refs.loadmore.onTopLoaded()
          _this.history.num++
          _this.history.offset = _this.history.num * _this.history.count
          _this.axios.get('/cpi/record/history/private_dialogues/' + _this.chatRoom.flag + '?chatId=' + _this.queryData.chatId + '&offset=' + _this.history.offset + '&count=' + _this.history.count)
            .then((res) => {
              if (res.code === 0) {
                let data = res.data
                let dataLeng = data.length
                for (let i = 0; i < dataLeng; i++) {
                  data[i].attachment = JSON.parse(data[i].attachmentStr)
                  data[i].status = {
                    success: false,
                    error: false
                  }
                  _this.lsMsgTimes(data, i)
                }
                for (let i = dataLeng - 1; i >= 0; i--) {
                  _this.oneRoomData.unshift(data[i])
                }
                let lotteryArr = this.Utils.Storage.get('lotteryArr')
                if (lotteryArr) {
                  let lotteryArrLeng = lotteryArr.length
                  for (let i = 0; i < dataLeng; i++) {
                    if (data[i].attachment && (data[i].attachment.type === 4 || data[i].attachment.type === 10)) {
                      for (let j = 0; j < lotteryArrLeng; j++) {
                        if (data[i].attachment.order.lotteryId === lotteryArr[j].lotteryId) {
                          data[i].attachment.order.url = lotteryArr[j].URL
                        }
                      }
                    }
                  }
                }
                if (_this.history.count > dataLeng) {
                  _this.allLoaded = true
                  _this.$refs.main.scrollTop = 0
                }
                data[0].times.show = true
                data[0].times.time = _this.getDayName(data[0].timestamp)
              }
            })
            .catch(() => {})
        }, 1500)
      } else {
        _this.$refs.loadmore.onTopLoaded()
      }
    },
    problem (item) {
      let _this = this
      if (_this.problemFlag) {
        console.log('problemFlag = true')
        let data = {
          attachment: {
            receiver: _this.infos.otherInfo,
            sender: _this.init.message.member,
            type: 1
          },
          content: '你已选择' + item.name,
          sender: _this.init.message.member.openid,
          type: 'msg'
        }
        _this.service.isProblem = item.name
        _this.axios.get('/cpi/customer_service/init/' + _this.chatRoom.flag + '?scene=' + _this.service.isProblem)
          .then((res) => {
            if (res.code === 0) {
              _this.service.chatId = res.data.chatId
              _this.service.receiver = res.data.receiver
              _this.service.sender = res.data.sender
              if (_this.init.message.member.openid === _this.service.receiver) {
                _this.openId.other = _this.service.sender
              } else {
                _this.openId.other = _this.service.receiver
              }
              if (_this.init.message.member.type === -1) {
                _this.ykAfterServier(res.data)
              } else if (_this.init.message.member.type === 0) {
                _this.afterService(res.data)
              }
            } else {
              setTimeout(() => {
                let msg = ''
                if (_this.init.message.member.type === -1) {
                  if (res.code === 999) {
                    msg = res.msg
                  } else {
                    msg = '客服不在线, 游客不能留言'
                  }
                } else {
                  msg = '客服繁忙,已转为留言'
                }
                let data = {
                  attachment: {
                    receiver: _this.infos.otherInfo,
                    sender: _this.init.message.member,
                    type: 1
                  },
                  content: msg,
                  sender: _this.init.message.member.openid,
                  type: 'msg'
                }
                _this.oneRoomData.push(data)
              }, 50)
            }
          })
          .catch(() => {})
        _this.oneRoomData.push(data)
        _this.problemFlag = false
      } else {
        console.log('正在会话中')
        // this.$toast({
        //   message: '你正在会话中',
        //   position: 'middle',
        //   duration: 1500
        // })
      }
    },
    ykAfterServier (data) {
      let ykAfterServier = JSON.parse(sessionStorage.getItem('ykAfterServier'))
      let json = {}
      if (ykAfterServier) {
        json = ykAfterServier
      }
      json[this.init.message.member.openid] = {}
      json[this.init.message.member.openid].chatId = data.chatId
      json[this.init.message.member.openid].receiver = data.receiver
      json[this.init.message.member.openid].sender = data.sender
      json[this.init.message.member.openid].timestamp = new Date().getTime()
      sessionStorage.setItem('ykAfterServier', JSON.stringify(json))
    },
    afterService (data) {
      let afterService = this.Utils.Storage.get('afterServier')
      let json = {}
      if (afterService) {
        json = afterService
      }
      json[this.init.message.member.openid] = {}
      json[this.init.message.member.openid].chatId = data.chatId
      json[this.init.message.member.openid].receiver = data.receiver
      json[this.init.message.member.openid].sender = data.sender
      json[this.init.message.member.openid].timestamp = new Date().getTime()
      this.Utils.Storage.save('afterServier', json)
    },
    redDetailssShow () {
      this.regBags.details = false
    },
    regBagReceive (item) {
      let _this = this
      _this.receiveRegDetails = item
      if (item.attachment.sender.openid === _this.init.message.member.openid) {
        _this.regBags.details = true
        let rid = item.attachment.redPacket.rid
        // rid = item ? item.message.rid : rid = _this.regBags.rid
        _this.axios.get('/cpi/redPacket/detail?rid=' + rid)
          .then((res) => {
            if (res.code === 0) {
              _this.regBags.details = true
              _this.regBags.detailsData = res.data.detail
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
      _this.regBags.info = item.attachment.sender
      _this.regBags.rid = item.attachment.redPacket.rid
      _this.axios.get('/cpi/redPacket/check?rid=' + _this.regBags.rid)
        .then((res) => {
          if (res.code === 0) {
            _this.regBags.hbBgShow = true
            _this.regBags.getRegBag.info = item
            if (res.data.code === 0) {
              // this.axios.get('/cpi/redPacket/get?rid=' + this.regBags.rid).then(obj => {
              _this.regBags.chai = true
              _this.regBags.yes = false
              _this.regBags.already = false
              _this.regBags.expired = false
              _this.regBags.no = false
              // this.regBags.getRegBag.money = obj.data.detail.amount
              // this.regBags.already = true
              // this.regBags.chai = false
              // this.regBags.yes = false
              // this.regBags.expired = false
              // this.regBags.no = false
              // })
            } else
            if (res.data.code === 3002) {
              _this.regBags.getRegBag.money = res.data.detail.amount
              _this.regBags.already = true
              _this.regBags.chai = false
              _this.regBags.yes = false
              _this.regBags.expired = false
              _this.regBags.no = false
            } else
            if (res.data.code === 3001) {
              _this.regBags.expired = true
              _this.regBags.chai = false
              _this.regBags.yes = false
              _this.regBags.already = false
              _this.regBags.no = false
            } else
            if (res.data.code === 3003) {
              _this.regBags.no = true
              _this.regBags.chai = false
              _this.regBags.yes = false
              _this.regBags.already = false
              _this.regBags.expired = false
            } else
            if (res.data.code === 3000) {
              // _this.regBags.chai = true
              // _this.regBags.yes = false
              // _this.regBags.already = false
              // _this.regBags.expired = false
              // _this.regBags.no = false
            } else {
              this.$toast({
                message: res.data.msg,
                position: 'middle',
                duration: 1000
              })
            }
          } else {
            this.$toast({
              message: res.msg,
              position: 'middle',
              duration: 1000
            })
          }
        })
        .catch(() => {})
    },
    regBag () {
      let _this = this
      if (_this.regBagSend.money < 2 || _this.regBagSend.money > 1000) {
        this.$toast({
          message: '输入金额2 - 1000',
          duration: 1000
        })
        return
      }
      if (_this.regBagSend.msg.length < 1 || _this.regBagSend.msg.length > 15) {
        this.$toast({
          message: '红包内容1 - 15个汉字',
          duration: 1000
        })
        return
      }
      if (!_this.$store.state.chatRoom.friendopenid) {
        this.$toast({
          message: '网络有波动，请刷新重试',
          duration: 1000
        })
        return
      }
      _this.axios.post('/cpi/redPacket/send', {
        roomId: _this.queryData.chatId,
        toOpenId: _this.$store.state.chatRoom.friendopenid,
        amount: Number(_this.regBagSend.money),
        detailMsg: _this.regBagSend.msg,
        headMsg: null,
        number: 1,
        sendOpenId: _this.init.message.member.openid,
        type: 11
      })
        .then((res) => {
          if (res.code === 0) {
            if (res.data.code === 0) {
              this.$toast({
                message: '红包已发送',
                duration: 1000
              })
              _this.sendHb.show = false
            } else {
              this.$toast({
                message: res.data.msg,
                duration: 1000
              })
            }
          } else {
            this.$toast({
              message: '网络连接异常',
              duration: 1000
            })
          }
        })
        .catch(() => {
          this.$toast({
            message: '红包送失败, 请重试',
            duration: 1000
          })
        })
    },
    sendHbo () {
      this.sendHb.show = true
    },
    closeOneChat () {
      this.lookData.OneRoom = false
      this.reload()
    },
    lookShareBetting (id, item) {
      this.lookBetData = item.attachment.order
      this.lookBetting.show = true
      this.lookBetData.theme = id
      // this.lookBetting.lotteryName = item.attachment.order.lotteryName
      // this.lookBetting.issue = item.attachment.order.issue
      // this.lookBetting.playName = item.attachment.order.playName
      // this.lookBetting.content = item.attachment.order.content
      // this.lookBetting.totalFee = item.attachment.order.totalFee
      // this.lookBetting.nickname = item.attachment.sender.nickname
    },
    actionLook () {
      let _this = this
      let openId = _this.lookData.openID
      _this.axios.get('/cpi/relation/detail/' + _this.chatRoom.flag + '?openid=' + openId)
        .then((res) => {
          if (res.code === 0) {
            _this.actionsData.fansNumber = res.data.fansNumber
            _this.actionsData.followNumber = res.data.followNumber
            _this.actionsData.attention = res.data.attention
            _this.actionsData.identity = res.data.member.identity
            _this.actionsData.nickname = res.data.member.nickname
            _this.actionsData.openid = res.data.member.openid
            _this.actionsData.level = res.data.member.level
            _this.actionsData.headImg = res.data.member.headImg
            _this.actionsData.shutup = res.data.shutup
            _this.actionsData.stop = res.data.stop
            _this.actionsData.markName = res.data.member.markName
            _this.actionsData.privateflag = true
            _this.actionsLookData = true
          }
        })
        .catch(() => {})
    },
    attention (item) {
      let _this = this
      let openId = null
      openId = item.attachment.sender.openid
      _this.lookData.openID = item.attachment.sender.openid
      _this.lookData.authority = item.attachment.sender.authority
      _this.axios.get('/cpi/relation/detail/' + _this.chatRoom.flag + '?openid=' + openId)
        .then((res) => {
          if (res.code === 0) {
            _this.actionsData.fansNumber = res.data.fansNumber
            _this.actionsData.followNumber = res.data.followNumber
            _this.actionsData.attention = res.data.attention
            _this.actionsData.identity = res.data.member.identity
            _this.actionsData.nickname = res.data.member.nickname
            _this.actionsData.openid = res.data.member.openid
            _this.actionsData.level = res.data.member.level
            _this.actionsData.headImg = res.data.member.headImg
            _this.actionsData.stop = res.data.stop
            _this.actionsData.markName = res.data.member.markName
            _this.actionsData.privateflag = true
            _this.actionsLookData = true
          }
        })
        .catch(() => {})
    },
    HeadBack () {
      let _this = this
      // _this.create()
      _this.chatRoom.currentChatId = ''
      _this.chatRoom.flagWs = true
      this.chatRoom.ws.send("{'event': 'leaveRoom', 'data':'" + this.chatRoom.roomNmae + "'}")
      _this.$router.go(-1)
      // window.location.href = window.location.href
      // _this.$emit('closeOneRoom', _this.unreadMsgArr.length)
      // if (_this.oneRoomData.length > 0) {
      //   let infos = {
      //     chatId: _this.queryData.chatId,
      //     content: _this.oneRoomData[_this.oneRoomData.length - 1].content
      //   }
      //   _this.$emit('closeOneRoom', _this.unreadMsgArr.length, infos)
      // } else {
      //   _this.$emit('closeOneRoom', _this.unreadMsgArr.length)
      // }
    },
    sendMoreBox () {
      this.moreBoxShow = !this.moreBoxShow
      this.emojis.show = false
      if (this.moreBoxShow) {
        if (this.$refs.roomSendMoreBox.children.length > 5) {
          this.SendMoreBoxHeight = 4.3
          this.mainHeight = '4.7rem'
        } else {
          this.SendMoreBoxHeight = 2.2
          this.mainHeight = '2.7rem'
        }
      } else {
        this.mainHeight = '0rem'
      }
      this.$nextTick(() => {
        this.$refs.main.scrollTop = this.$refs.main.scrollHeight
      })
    },
    sendYyEnd () {
    },
    sendYyStart () {
    },
    clickButton () {
      let _this = this
      let data = {}
      let request = {}
      let bstp = 0
      if (_this.userText.replace(/^\s+|\s+$/gm, '').length === 0) {
        this.$toast({
          message: '内容不能为空',
          position: 'middle',
          duration: 1000
        })
        return
      } else if (_this.userText.replace(/^\s+|\s+$/gm, '').length >= 150 && _this.init.message.member.type !== 2 && _this.init.message.member.type !== 3 && _this.init.message.member.type !== 4 && _this.init.message.member.type !== 5) {
        this.$toast({
          message: '内容不能超过150字',
          position: 'middle',
          duration: 1000
        })
        return
      }
      if (_this.roomType === 'service') {
        bstp = 2
      }
      if (_this.roomType === 'temporary') {
        bstp = 3
      }
      if (_this.service.isService || _this.init.message.member.type === 3 || (_this.init.message.member.type === 0 && _this.roomType === 'service')) {
        // 如果是客服聊天窗口
        if (_this.service.type === 3) {
          _this.service.problem = true
          // 如果是客服
          if (_this.init.message.member.openid === _this.queryData.receiver) {
            _this.openId.other = _this.queryData.sender
          } else {
            _this.openId.other = _this.queryData.receiver
          }
          let attachment = {}
          if (_this.roomType === 'temporary') {
            attachment = {
              // receiver: {
              //   type: -1
              // }
              receiver: _this.queryData.infos,
              sender: _this.init.message.member,
              type: 1
            }
          } else {
            attachment = {
              receiver: _this.infos.otherInfo,
              sender: _this.init.message.member,
              type: 1
            }
          }
          let msgId = new Date().getTime()
          data = {
            attachment: attachment,
            bussType: bstp,
            chatType: 1,
            timestamp: new Date().getTime(),
            msgId: msgId,
            status: {
              success: true,
              error: false
            },
            chatId: _this.queryData.chatId,
            content: _this.userText,
            receiver: _this.openId.other,
            sender: _this.init.message.member.openid,
            serviceMsg: true,
            type: 0
          }
          request = {
            event: 'privateServiceChat',
            msgId: msgId,
            data
          }
        }
      } else {
        // 如果是私聊 聊天窗口
        let msgId = new Date().getTime()
        data = {
          attachment: {
            receiver: _this.infos.otherInfo,
            sender: _this.init.message.member,
            type: 1
          },
          chatType: 1,
          chatId: _this.queryData.chatId,
          content: _this.userText,
          receiver: _this.openId.other,
          sender: _this.init.message.member.openid,
          status: {
            error: false,
            success: true
          },
          timestamp: new Date().getTime(),
          msgId: msgId,
          type: 1
        }
        request = {
          event: 'privateChat',
          msgId: msgId,
          data
        }
      }
      _this.$nextTick(() => {
        // data.msgType = 'msg'
        _this.msgTimes(data, _this.oneRoomData)
        setTimeout(() => {
          if (_this.roomType === 'temporary') {
            if (_this.init.message.member.type === 3) {
              _this.chatRoom.ws.send(JSON.stringify(request))
              _this.oneRoomData.push(data)
              console.log(data)
              _this.afterData = data
              _this.userText = ''
            } else if (_this.init.message.member.type === -1) {
              let ykAfterServier = JSON.parse(sessionStorage.getItem('ykAfterServier'))
              if (ykAfterServier && ykAfterServier[_this.init.message.member.openid]) {
                let nowTime = new Date().getTime()
                let detailed = parseInt((nowTime - ykAfterServier[_this.init.message.member.openid].timestamp) / 60000)
                if (detailed >= 5) {
                  _this.ykkf(_this)
                } else {
                  if (_this.chatRoom.diglogClose) {
                    _this.ykkf(_this)
                    _this.chatRoom.diglogClose = false
                  } else {
                    _this.service.chatId = ykAfterServier[_this.init.message.member.openid].chatId
                    _this.service.receiver = ykAfterServier[_this.init.message.member.openid].receiver
                    _this.service.sender = ykAfterServier[_this.init.message.member.openid].sender
                    if (_this.init.message.member.openid === _this.service.receiver) {
                      _this.openId.other = _this.service.sender
                    } else {
                      _this.openId.other = _this.service.receiver
                    }
                    let msgId = new Date().getTime()
                    data = {
                      attachment: {
                        receiver: _this.infos.otherInfo,
                        sender: _this.init.message.member,
                        type: 1
                      },
                      bussType: bstp,
                      chatType: 1,
                      timestamp: new Date().getTime(),
                      msgId: msgId,
                      status: {
                        success: true,
                        error: false
                      },
                      chatId: _this.service.chatId,
                      content: _this.userText,
                      receiver: _this.openId.other,
                      sender: _this.init.message.member.openid,
                      serviceMsg: true,
                      temporary: true,
                      type: 0
                    }
                    request = {
                      event: 'privateServiceChat',
                      msgId: msgId,
                      data
                    }
                    _this.msgTimes(data, _this.oneRoomData)
                    _this.chatRoom.ws.send(JSON.stringify(request))
                    _this.oneRoomData.push(data)
                    _this.afterData = data
                  }
                }
              } else {
                if (JSON.stringify(_this.infos.otherInfo) === '{}') {
                  _this.infos.otherInfo.type = 3
                }
                _this.ykkf(_this)
              }
            }
          } else if (_this.roomType === 'service') {
            // && data.attachment.receiver.type === 3
            if (_this.init.message.member.type === 0 || _this.init.message.member.type === 3) {
              // data.times.show = true
              if (_this.init.message.member.type === 3) {
                _this.chatRoom.ws.send(JSON.stringify(request))
                _this.oneRoomData.push(data)
                _this.afterData = data
                _this.userText = ''
              }
              if (_this.init.message.member.type !== 3) {
                let nowTime = new Date().getTime()
                let afterServier = this.Utils.Storage.get('afterServier')
                if (afterServier && afterServier[_this.init.message.member.openid]) {
                  let detailed = parseInt((nowTime - afterServier[_this.init.message.member.openid].timestamp) / 60000)
                  if (detailed >= 5) {
                    _this.hykf(_this)
                  } else {
                    // _this.service.serviceCount = res.data
                    if (_this.chatRoom.diglogClose) {
                      _this.hykf(_this)
                      _this.chatRoom.diglogClose = false
                    } else {
                      _this.chatRoom.serviceOnline = true
                      _this.service.chatId = afterServier[_this.init.message.member.openid].chatId
                      _this.service.receiver = afterServier[_this.init.message.member.openid].receiver
                      _this.service.sender = afterServier[_this.init.message.member.openid].sender
                      if (_this.init.message.member.openid === _this.service.receiver) {
                        _this.openId.other = _this.service.sender
                      } else {
                        _this.openId.other = _this.service.receiver
                      }
                      let msgId = new Date().getTime()
                      data = {
                        attachment: {
                          receiver: _this.infos.otherInfo,
                          sender: _this.init.message.member,
                          type: 1
                        },
                        bussType: bstp,
                        chatType: 1,
                        timestamp: new Date().getTime(),
                        msgId: msgId,
                        status: {
                          success: true,
                          error: false
                        },
                        chatId: _this.service.chatId,
                        content: _this.userText,
                        receiver: _this.openId.other,
                        sender: _this.init.message.member.openid,
                        serviceMsg: true,
                        temporary: true,
                        type: 0
                      }
                      request = {
                        event: 'privateServiceChat',
                        msgId: msgId,
                        data
                      }
                      _this.msgTimes(data, _this.oneRoomData)
                      _this.chatRoom.ws.send(JSON.stringify(request))
                      _this.oneRoomData.push(data)
                      _this.afterData = data
                      _this.userText = ''
                    }
                  }
                } else {
                  _this.hykf(_this)
                }
              }
            } else {
              this.$toast({
                message: '你不能和对方聊天',
                position: 'middle',
                duration: 1500
              })
            }
            return false
          } else {
            // if (_this.init.message.member.type === -1 && (data.attachment.sender.type > 0 || data.attachment.receiver.type > 0 || JSON.stringify(data.attachment.receiver) === '{}')) {
            if (data.attachment.sender.type === -1 || data.attachment.receiver.type === -1 || JSON.stringify(data.attachment.receiver) === '{}') {
              // 如果是游客聊天
              data.bussType = 3
              data.manager = true
              _this.chatRoom.ws.send(JSON.stringify(request))
              _this.oneRoomData.push(data)
              _this.afterData = data
              _this.userText = ''
            } else {
              // 普通私聊
              _this.chatRoom.ws.send(JSON.stringify(request))
              _this.oneRoomData.push(data)
              _this.afterData = data
              _this.userText = ''
            }
          }
        }, 50)
      })
    },
    sendYy () {
      this.sendYyShow = !this.sendYyShow
      this.sendTextShow = !this.sendYyShow
    },
    bigFlieImgClose () {
      setTimeout(() => {
        this.bigFlieImg.show = false
      }, 200)
    },
    flieImgH (item) {
      this.bigFlieImg.show = true
      this.$indicator.open({ spinnerType: 'fading-circle' })
      // this.bigFlieImg.url = item.message.attachment.image.bigUrl
      this.bigFlieImg.url = item.attachment.image.bigUrl
      this.$nextTick(() => {
        this.$refs.bigFlieImg.onload = function () {
          this.$indicator.close()
        }
      })
    },
    imgEvent (obj) {
      let _this = this
      if (obj === 'flie') {
        obj = _this.$refs.flie
      } else if (obj === 'camera') {
        obj = _this.$refs.camera
      }
      let eleFile = obj
      // 压缩图片需要的一些元素和对象
      let reader = new FileReader()
      let img = new Image()
      // 选择的文件对象
      let file = null
      // 缩放图片需要的canvas
      let canvas = document.createElement('canvas')
      let context = canvas.getContext('2d')
      // base64地址图片加载完毕后
      img.onload = function () {
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        let originWidth = this.width
        let originHeight = this.height
        // let maxWidth = 400
        // let maxHeight = 400
        // let targetWidth = originWidth
        // let targetHeight = originHeight
        // if (originWidth > maxWidth || originHeight > maxHeight) {
        //   if (originWidth / originHeight > maxWidth / maxHeight) {
        //     targetWidth = maxWidth
        //     targetHeight = Math.round(maxWidth * (originHeight / originWidth))
        //   } else {
        //     targetHeight = maxHeight
        //     targetWidth = Math.round(maxHeight * (originWidth / originHeight))
        //   }
        // }
        // canvas对图片进行缩放
        canvas.width = originWidth
        canvas.height = originHeight
        context.clearRect(0, 0, originWidth, originHeight)
        context.drawImage(img, 0, 0, originWidth, originHeight)
        // context.clearRect(0, 0, targetWidth, targetHeight)
        // context.drawImage(img, 0, 0, targetWidth, targetHeight)
        canvas.toBlob(function (blob) {
          let param = new FormData()
          param.append('file', blob, file.name)
          param.append('chunk', '0')
          // 图片ajax上传
          _this.$messagebox.confirm('确认发送图片?').then(() => {
            _this.axios.post(_this.Utils.chatURL('file'), param, config)
              .then((res) => {
                if (res.code === 0) {
                  let request = {}
                  let data = {}
                  let msgId = new Date().getTime()
                  if (_this.roomType === 'temporary' || _this.roomType === 'service') {
                    let chatId = _this.queryData.chatId || _this.service.chatId
                    data = {
                      attachment: {
                        image: res.data,
                        receiver: _this.infos.otherInfo,
                        sender: _this.init.message.member,
                        type: 3
                      },
                      chatType: 1,
                      bussType: 3,
                      chatId: chatId,
                      content: '[图片消息]',
                      imgWidth: res.data.bigWidth,
                      receiver: _this.openId.other,
                      sender: _this.init.message.member.openid,
                      timestamp: msgId,
                      msgId: msgId,
                      status: {
                        success: true,
                        error: false
                      },
                      type: 3
                    }
                    request = {
                      event: 'privateServiceChat',
                      msgId: msgId,
                      data
                    }
                  } else {
                    data = {
                      attachment: {
                        image: res.data,
                        receiver: _this.infos.otherInfo,
                        sender: _this.init.message.member,
                        type: 3
                      },
                      chatType: 1,
                      chatId: _this.queryData.chatId,
                      content: '[图片消息]',
                      imgWidth: res.data.bigWidth,
                      receiver: _this.openId.other,
                      sender: _this.init.message.member.openid,
                      timestamp: msgId,
                      msgId: msgId,
                      status: {
                        success: true,
                        error: false
                      },
                      type: 3
                    }
                    request = {
                      event: 'privateChat',
                      msgId: msgId,
                      data
                    }
                  }
                  if (_this.oneRoomData.length > 0) {
                    _this.msgTimes(data, _this.oneRoomData)
                  } else {
                    data.times = {
                      show: false,
                      time: 0
                    }
                    let now = new Date().getTime()
                    let hours = new Date(now).getHours()
                    let minutes = new Date(now).getMinutes()
                    if (hours < 10) {
                      hours = '0' + hours
                    }
                    if (minutes < 10) {
                      minutes = '0' + minutes
                    }
                    data.times.time = '今天 ' + hours + ':' + minutes
                    data.times.show = true
                  }
                  _this.chatRoom.ws.send(JSON.stringify(request))
                  _this.oneRoomData.push(data)
                  _this.afterData = data
                } else {
                  this.$toast({
                    message: '获取失败, 刷新重试',
                    position: 'middle',
                    duration: 1000
                  })
                }
              })
              .catch(() => {
              })
          })
            .catch(() => {
            })
        }, file.type)
      }
      // 文件base64化，以便获知图片原始尺寸
      reader.onload = function () {
        img.src = this.result
      }
      file = eleFile.files[0]
      // 选择的文件是图片
      if (file.type.indexOf('image') === 0) {
        reader.readAsDataURL(file)
      }
    },
    create () {
      let _this = this
      // if (!_this.queryData) {
      //   _this.$router.push('/chatroom')
      // }
      // let voiceUnread = this.Utils.Storage.get('voiceUnread')
      // // 控制语音是否未读
      // let voiceUnrea = (data) => {
      //   let dataLeng = data.length
      //   if (voiceUnread) {
      //     _this.voice.voiceStorage = voiceUnread
      //     let voiceUnreadLeng = voiceUnread.length
      //     let dataArr = {}
      //     for (let i = 0; i < voiceUnreadLeng; i++) {
      //       dataArr[voiceUnread[i].messageId] = true
      //       for (let j = 0; j < dataLeng; j++) {
      //         if (data[j].attachment && data[j].attachment.voice) {
      //           if (data[j].messageId === voiceUnread[i].messageId) {
      //             data[j].attachment.voice.unread = voiceUnread[i].unread
      //             data[j].attachment.voice.play = false
      //           }
      //         }
      //       }
      //     }
      //   } else {
      //     for (let i = 0; i < dataLeng; i++) {
      //       if (data[i].attachment && data[i].attachment.voice) {
      //         data[i].attachment.voice.play = false
      //         data[i].attachment.voice.unread = true
      //         let json = {}
      //         json.messageId = data[i].messageId
      //         json.unread = true
      //         _this.voice.voiceStorage.push(json)
      //         this.Utils.Storage.save('voiceUnread', _this.voice.voiceStorage)
      //       }
      //     }
      //   }
      // }
      // 预处理，如果用户是私聊进入，没有建立websocket，则回到大厅？
      if (!_this.chatRoom || !_this.init) {
        window.location.href = '/mobile/studio/#/chatroom'
        return
      }
      // 预处理 end
      // 判断是否可选择客服问题
      let afterServier = this.Utils.Storage.get('afterServier')
      let ykAfterServier = JSON.parse(sessionStorage.getItem('ykAfterServier'))
      if ((afterServier && afterServier[_this.init.message.member.openid]) || (ykAfterServier && ykAfterServier[_this.init.message.member.openid])) {
        let nowTime = new Date().getTime()
        let detailed = 0
        if (afterServier) {
          detailed = parseInt((nowTime - afterServier[_this.init.message.member.openid].timestamp) / 60000)
        } else {
          detailed = parseInt((nowTime - ykAfterServier[_this.init.message.member.openid].timestamp) / 60000)
        }
        _this.problemFlag = detailed >= 5
      }
      // 判断是否可选择客服问题 end
      _this.queryData = _this.$route.params.queryData
      _this.roomType = _this.$route.params.roomType
      // 从聊天室进入的客服修改当前chatid
      _this.chatRoom.currentChatId = _this.$route.params.queryData.chatId
      // 修改当前chatid end
      if (_this.init.message.member.type !== -1 && !_this.queryData.roomType) {
        _this.lookDataRightShow = true
      }
      let privateChatUnread = this.Utils.Storage.get('privateChatUnread')
      if (privateChatUnread) {
        let leng = privateChatUnread.length
        for (let i = 0; i < leng; i++) {
          if (privateChatUnread[i] === _this.queryData.chatId) {
            privateChatUnread.splice(i, 1)
            i -= 1
          }
        }
        this.Utils.Storage.save('privateChatUnread', privateChatUnread)
      }
      let managerUnread = JSON.parse(sessionStorage.getItem('managerUnread'))
      if (managerUnread) {
        delete managerUnread[_this.queryData.chatId]
        sessionStorage.setItem('managerUnread', JSON.stringify(managerUnread))
      }
      if (!_this.roomType && _this.init.message.member.type === 3) {
        _this.roomType = 'service'
      }
      _this.chatRoom.serviceOnline = false
      _this.service.type = _this.init.message.member.type
      _this.infos.thisInfo = _this.init.message.member
      if (_this.init.message.member.openid === _this.queryData.receiver) {
        _this.openId.other = _this.queryData.sender
      } else {
        _this.openId.other = _this.queryData.receiver
      }
      if (_this.openId.other) {
        _this.axios.get('/cpi/relation/detail/' + _this.chatRoom.flag + '?openid=' + _this.openId.other)
          .then((res) => {
            if (res.code === 0) {
              _this.infos.otherInfo = res.data.member
            }
          })
          .catch(() => {})
      }
      if (_this.roomType === 'temporary') {
        let sess = JSON.parse(sessionStorage.getItem(_this.queryData.chatId))
        if (sess) {
          let sessLeng = sess.length
          for (let i = 0; i < sessLeng; i++) {
            _this.lsMsgTimes(sess, i)
          }
          sess[0].times.show = true
          sess[0].times.time = _this.getDayName(sess[0].timestamp)
          // voiceUnrea(sess)
          _this.oneRoomData = sess
          // 客服处理游客的未读消息
          let ykUnread = JSON.parse(sessionStorage.getItem('ykUnread'))
          if (ykUnread) {
            let ykUnreadLeng = ykUnread.length
            if (ykUnreadLeng > 0) {
              for (let i = 0; i < ykUnreadLeng; i++) {
                if (ykUnread[i].chatId === _this.queryData.chatId) {
                  ykUnread.splice(i, 1)
                  i -= 1
                  sessionStorage.setItem('ykUnread', JSON.stringify(ykUnread))
                }
              }
            }
          }
        }
        if (_this.init.message.member.type === -1) {
          _this.axios.get('/cpi/customer_service/select/' + _this.chatRoom.flag)
            .then((res) => {
              if (res.code === 0) {
                _this.service.title = res.data
                _this.service.isService = true
                let nowTime = new Date().getTime()
                let ykAfterServier = JSON.parse(sessionStorage.getItem('ykAfterServier'))
                if (ykAfterServier && ykAfterServier[_this.init.message.member.openid]) {
                  let detailed = parseInt((nowTime - ykAfterServier[_this.init.message.member.openid].timestamp) / 60000)
                  if (detailed >= 5 && _this.init.message.member.type !== 3) {
                    _this.menberService(_this)
                  }
                } else {
                  _this.menberService(_this)
                }
              }
            })
            .catch(() => {})
        }
      } else {
        if (_this.init.message.member.openid === _this.queryData.receiver) {
          _this.openId.other = _this.queryData.sender
        } else {
          _this.openId.other = _this.queryData.receiver
        }
        if ((_this.queryData.bussType && _this.queryData.bussType === 3) || _this.init.message.member.type === -1) {
          // 取游客的私聊聊天记录
          if (_this.init.message.member.type === -1) {
            let manager = JSON.parse(sessionStorage.getItem('manager'))
            if (manager) {
              let data = manager[_this.queryData.chatId]
              let dataLeng = data.length
              for (let i = 0; i < dataLeng; i++) {
                _this.lsMsgTimes(data, i)
              }
              data[0].times.show = true
              data[0].times.time = _this.getDayName(data[0].timestamp)
              // voiceUnrea(manager[_this.queryData.chatId])
              _this.oneRoomData = manager[_this.queryData.chatId]
            }
          } else {
            _this.infos.otherInfo = {
              authority: 2,
              headImg: '/default',
              identity: '游客',
              level: 0,
              nickname: '游客',
              openid: '',
              type: -1
            }
            let manager = JSON.parse(sessionStorage.getItem('manager'))
            if (manager) {
              let data = manager[_this.queryData.chatId]
              let dataLeng = data.length
              for (let i = 0; i < dataLeng; i++) {
                _this.lsMsgTimes(data, i)
                // _this.oneRoomData.push(data[i])
              }
              data[0].times.show = true
              data[0].times.time = _this.getDayName(data[0].timestamp)
              // voiceUnrea(manager[_this.queryData.chatId])
              _this.oneRoomData = manager[_this.queryData.chatId]
            }
          }
        } else {
          // 获取非游客
          if (_this.roomType === 'service') {
            if (_this.service.type === 3) {
              _this.service.problem = true
            }
            _this.axios.get('/cpi/record/history/private_dialogues/' + _this.chatRoom.flag + '?chatId=' + _this.queryData.chatId + '&offset=' + _this.history.offset + '&count=' + _this.history.count)
              .then((res) => {
                if (res.code === 0) {
                  let data = res.data
                  let dataLeng = data.length
                  if (dataLeng > 0) {
                    data.sort((a, b) => {
                      return a.timestamp - b.timestamp
                    })
                    for (let i = 0; i < dataLeng; i++) {
                      data[i].attachment = JSON.parse(data[i].attachmentStr)
                      data[i].status = {
                        error: false,
                        success: false
                      }
                      _this.lsMsgTimes(data, i)
                    }
                    let lotteryArr = this.Utils.Storage.get('lotteryArr')
                    if (lotteryArr) {
                      let lotteryArrLeng = lotteryArr.length
                      for (let i = 0; i < dataLeng; i++) {
                        if (data[i].attachment && (data[i].attachment.type === 4 || data[i].attachment.type === 10)) {
                          for (let j = 0; j < lotteryArrLeng; j++) {
                            if (data[i].attachment.order.lotteryId === lotteryArr[j].lotteryId) {
                              data[i].attachment.order.url = lotteryArr[j].URL
                            }
                          }
                        }
                      }
                    }
                    data[0].times.show = true
                    data[0].times.time = _this.getDayName(data[0].timestamp)
                    // voiceUnrea(data)
                    _this.oneRoomData = data
                  }
                  _this.axios.get('/cpi/customer_service/select/' + _this.chatRoom.flag)
                    .then((seleRes) => {
                      if (seleRes.code === 0) {
                        _this.service.title = seleRes.data
                        _this.service.isService = true
                        let nowTime = new Date().getTime()
                        let afterServier = this.Utils.Storage.get('afterServier')
                        if (afterServier && afterServier[_this.init.message.member.openid]) {
                          let detailed = parseInt((nowTime - afterServier[_this.init.message.member.openid].timestamp) / 60000)
                          if (detailed >= 5 && _this.init.message.member.type !== 3) {
                            _this.menberService(_this)
                          }
                        } else {
                          _this.menberService(_this)
                        }
                      }
                    })
                    .catch(() => {})
                }
              })
              .catch(() => {})
          } else {
            _this.axios.get('/cpi/relation/detail/' + _this.chatRoom.flag + '?openid=' + _this.openId.other)
              .then((res) => {
                if (res.code === 0) {
                  _this.infos.otherInfo = res.data.member
                }
              })
              .catch(() => {})
            _this.axios.get('/cpi/record/history/private_dialogues/' + _this.chatRoom.flag + '?chatId=' + _this.queryData.chatId + '&offset=' + _this.history.offset + '&count=' + _this.history.count)
              .then((res) => {
                if (res.code === 0) {
                  let data = res.data
                  let dataLeng = data.length
                  data.sort((a, b) => {
                    return a.timestamp - b.timestamp
                  })
                  for (let i = 0; i < dataLeng; i++) {
                    data[i].attachment = JSON.parse(data[i].attachmentStr)
                    data[i].status = {
                      error: false,
                      success: false
                    }
                    _this.lsMsgTimes(data, i)
                  }
                  let lotteryArr = this.Utils.Storage.get('lotteryArr')
                  if (lotteryArr) {
                    let lotteryArrLeng = lotteryArr.length
                    for (let i = 0; i < dataLeng; i++) {
                      if (data[i].attachment && (data[i].attachment.type === 4 || data[i].attachment.type === 10)) {
                        for (let j = 0; j < lotteryArrLeng; j++) {
                          if (data[i].attachment.order.lotteryId === lotteryArr[j].lotteryId) {
                            data[i].attachment.order.url = lotteryArr[j].URL
                          }
                        }
                      }
                    }
                  }
                  data[0].times.show = true
                  data[0].times.time = _this.getDayName(data[0].timestamp)
                  // voiceUnrea(data)
                  _this.oneRoomData = data
                }
              })
              .catch(() => {})
          }
        }
      }
    }
  },
  components: {
    Head,
    Details,
    Loadmore,
    // Voice,
    ShareBetting,
    LookInformation,
    Emojs,
    ShareOrder,
    TodayRecord,
    RegBagReceive
  }
}
</script>

<style scoped>
    #camera,
    #flie{ opacity: 0;position: absolute;width: 2rem;height: 2rem;left: 0;top: 0;}
    .flieImg{max-width:7rem;max-height:3rem;margin:.15rem 0;display:block;}
    .body{height: 100%;position: fixed;top:0;width: 100%;max-width:780px;background: #F5F4F9;z-index: 299;overflow-y:auto;}
    .main{height:calc(100% - 2.4rem);margin-top:1.13rem;position:relative;overflow:scroll;}
    .room-send{position:fixed;bottom:0;width:100%;z-index:300;line-height:1.125rem;background:#fff;text-align:center;}
    .room-send-btns{}
    .room-send-text,
    .room-send-yy{width:74%;height:.85rem;border:1px solid #BFBFBF;border-radius:.1rem;box-sizing:border-box;}
    .room-send-text{margin-right:.2rem;}
    .room-send-yy{background:#bfbfbf;text-align:center;line-height:.85rem;font-size:.45rem;}
    .room-send-gn{width:.9rem;height:.9rem;margin:0 .03rem;}
    .tl{text-align:left;}
    .room-send-more-boxs{padding:.4rem .3rem 0;height:2.2rem;text-align:left;}
    .room-send-more-box{width:20%;font-size:.35rem;text-align:center;color:#333;}
    .room-send-more-icon{display:block;margin:0 auto;width:1rem;}
    .play-center{position:absolute;left:0;top:0;line-height:1.125rem;width:100%;text-align:center;font-size:.35rem;}
    .oneRoom-list{padding:.2rem .2rem 0 .2rem;}
    .oneRoom-list-headIm{margin:.2rem .1rem .2rem;width:1.2rem;height:1.2rem;background:#fff;border-radius:50%;}
    .oneRoom-list-text{margin-top:.3rem;line-height:.5rem;max-width:80%;}
    .oneRoom-list-msg{position:relative;margin-left: .2rem;background:#fff;padding: .2rem;border-radius:.15rem;color:#333;word-break:break-word;}
    .oneRoom-list-msg-this:before {
        position: absolute;
        content: '';
        right: -0.2rem;
        top: .2rem;
        border-top: .2rem solid transparent;
        border-bottom: .2rem solid transparent;
        border-left: .3rem solid #fff;
        z-index: -1;
    }
    .oneRoom-list-msg-other:before {
        position: absolute;
        content: '';
        left: -0.2rem;
        top: .2rem;
        border-top: .2rem solid transparent;
        border-bottom: .2rem solid transparent;
        border-right: .3rem solid #fff;
        z-index: -1;
    }
    .tr{text-align:right;}
    .room-info{padding-top:.3rem;font-size:.35rem;color:#666;line-height:.65rem;word-break:break-word;width:99%;}
    .room-share-icon{vertical-align:sub;margin-left:.2rem;width:.4rem;height:.5rem;}
    .room-info-hb{color:#FF6500;float:right;}
    .room-info{float:left;width:auto;}
    .footer-menu-mint /deep/ .mint-actionsheet-listitem,
    .footer-menu-mint /deep/ .mint-actionsheet-button{font-size:.4rem;height:1rem;line-height:1.1rem;}
    /*查看资料*/
    .hb-bg,
    .send-hbbg,
    .bigFlieImg-box{position:fixed;top:0;z-index:100;max-width:780px;margin:0 auto;width:100%;height:100%;background:rgba(0, 0, 0, .6);}
    .room-info-alookData-title .room-info-admin-title{margin-top: .29rem;}
    .c7C7C7C{color:#7C7C7C;}
    /*查看分享订单*/
    .beeting-look-title{text-align:center;height:.9rem;line-height:.95rem;font-size:.4rem;color:#fff;background:#F3A703;}
    .beeting-look-close{float:right;margin-right:.3rem;font-size:.5rem;}
    .fr{float:right;}
    .send-hbbg2{text-align:center;}
    .send-hbbg2:before,
    .bigFlieImg-box:before{content:'';display:inline-block;vertical-align:middle;width:0;height:100%;}
    .send-hbbg-box{background:#fff;margin:0;padding-bottom:.3rem;overflow:hidden;width:9rem;border-radius:.2rem;}
    .send-hbbg-box .beeting-look-title{background:#F6F6F6;color:#333;}
    .send-hbbg-list{overflow:hidden;padding:0 3%;height:1rem;line-height:1rem;border-bottom:1px solid #F6F6F6;font-size:.35rem;}
    .send-hbbg-list-left{float:left;width:20%;text-align:center;color:#333;}
    .send-hbbg-text{float:left;width:70%;margin-left:4%;line-height:1rem;font-size:.35rem;color:#333;border:0;}
    .send-hbbg-btn{display:block;width:90%;margin:.3rem auto 0;height:1rem;line-height:1.1rem;background:#DE1313;color:#fff;font-size:.35rem;text-align:center;}
    .room-pthb{overflow:hidden;position:relative;margin-top:.2rem;width:7.6rem;height:2rem;font-size:.35rem;background:url(../../../assets/images/chatroom/room-hbb.png) no-repeat;background-size:100%;clear:both;}
    .room-pthb-title{position:absolute;top:.3rem;left:1.9rem;color:#fff;}
    .room-pthb-click{position:absolute;top:1.1rem;left:1.9rem;color:#FFEA00;text-decoration:underline;}
    .hb-bg-yes,
    .hb-bg-no,
    .hb-bg-chai,
    .hb-bg-already{width:7rem;height:9.2rem;margin:4.5rem auto 0;text-align:center;font-size:.35rem;background:url(../../../assets/images/chatroom/regBg.png) no-repeat;background-size:100%;color:#fff;}
    .hb-bg-chai{background:url(../../../assets/images/chatroom/chat_red_cai.png) no-repeat;background-size:100%;}
    .hb-bg-yes{width:10rem;height:12rem;margin-top:2rem;background:url(../../../assets/images/chatroom/chat_rob_yes.png) no-repeat;background-size:100%;}
    .hb-bg-no{padding-top:6.5rem;height:.8rem;background:url(../../../assets/images/chatroom/chat_rob_no.png) no-repeat;background-size:cover;}
    .hb-bg-close{position:absolute;z-index:2;top:.3rem;right:.3rem;width:.7rem;}
    .hb-bg-yes-money{padding: 7.8rem 0 .2rem;display:block;color:#FFF75C;font-weight:bold;font-size:1rem;line-height:1.6rem;}
    .hb-bg-already{font-size:.35rem;}
    .hb-bg-already-headImg{margin:.7rem auto .3rem;width:1.3rem;height:1.3rem;background:#fff;border-radius:50%;}
    .hb-bg-already-name{color:#FFF75C;}
    .hb-bg-already-money{padding:.4rem 0 .2rem;font-size:1rem;color:#FFF75C;}
    .hb-bg-already-alreadyAdd{padding-bottom:3.1rem;}
    .hb-bg-already-expired{padding:.8rem 0 3.1rem;line-height:.7rem;color:#fff;font-size:.45rem;}
    .rebagChai{height:100%;}
    .service_greeting,
    .service_slogan{font-size:.35rem;line-height:.7rem;}
    .service_list{color:#2181D6;font-size:.35rem;line-height:.7rem;}
    .room-time{font-size:.35rem;margin:.3rem 0 .2rem;padding:0 .55rem;height:.6rem;line-height:.65rem;border-radius:.1rem;background:#DFDCDC;color:#979797;}
    .mg0{margin:0;}
    .bigFlieImg-box{z-index:1000;width:96%;padding:0 2%;}
    .bigFlieImg{max-width:100%;max-height:100%;border-radius:15px;}
    .w80{width:80%;}
    .w100{width:100%;max-width:100%;}
    .room-send-btns{background:#fff;height: 1.17rem;}
    .semdMsd{width: 1.65rem;height: .85rem;border-radius: .15rem;background: #5EADE3;color: #fff;font-size: .35rem;line-height: .85rem;}
    .top-msg{position:fixed;top:1.125rem;width:100%;height:.6rem;line-height:.6rem;background:rgba(0, 0, 0, .6);z-index:199;font-size:.3rem;color:#f3f3f3;text-align:center;}
    .sendTime{
        height: .55rem;
        line-height: .55rem;
        background: #DDDBDB;
        border-radius: .1rem;
        font-size: .3rem;
        color: #666;
        display: inline-block;
        padding: 0 .3rem;
    }
    .room-info-admin-title{padding: 0 .25rem;margin-right: .2rem;background: #E41D1D;color: #fff;height: .45rem;display: inline-block;vertical-align: middle;line-height: .45rem;}
    .oneRoomlistimg{max-width:100%;border-radius:.2rem;}
    .voice-msg{margin-top:.3rem;}
    .voice-msg /deep/ .video-box{height:24px;}
    .voice-msg /deep/ .video-symbol{top:-11px;}
    .voice-msg /deep/ .video-second{line-height:27px;}
    .flieImgH-box{max-height:4rem;max-width:50%;margin-left:.2rem;}
    .oneRoom-list-load{width:.45rem;}
    .lookData{position:absolute;right:.2rem;top:0;line-height:1.125rem;font-size:.3rem;}
    .room-record-type{position:absolute;top:.01rem;z-index:2;width:1.1rem;height:.5rem;background:#C6110C;color:#fff;border-radius:.2rem;text-align: center;line-height: .45rem;}
    .room-record-type-left{left:.3rem;}
    .room-record-type-right{right:.3rem;}
</style>
