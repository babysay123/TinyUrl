<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-06 15:34:43
 * @LastEditTime: 2019-10-21 13:57:14
 * @LastEditors: Please set LastEditors
 -->
<template>
    <section v-if="bodyShow">
        <section
                class="room-main"
                ref="main"
                :style="{height: mainHeights.height, top: mainHeights.top}"
                @touchstart="scrollStart"
                @touchmove="scrollMove"
                @touchend="scrollEnd"
        >
          <section v-show="joinRoomNotify.show" class="tc ft0 fw joinRoomNotify" :class="{joinRoomNotifyTop: moreRoom}">
                <p class="room-times dInV wzfw">
                    {{joinRoomNotify.name}}
                    <!--<span class="room-hb-cl">{{joinRoomNotify.name}} </span>进入了房间-->
                </p>
            </section>
            <loadmore :top-method="loadTop" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
                <section class="room-info fw ft35 tc" v-if="allLoaded">
                    无更多消息
                </section>
                <section class="room-info room-info-no fw ft35 tc" v-if="joinData.message.length === 0">
                    无更多消息
                </section>
                <section class="room-info fw ft0"  v-for="(item, index) in joinData.message" :key="index" :style="{'font-size': chatRoomFont.fontSize + 'px'}">
                    <section
                        v-if="item.event === 'dialogue' ||
                        (item.event === 'transferMessage' && item.message.attachment.eventFalse === 'dialogue')"
                    >
                      <section class="room_headImg">
                        <img :src="!item.message.attachment.sender.headImg || item.message.attachment.sender.headImg.indexOf('/default') > -1 ? '/mobile/images/mine/geren_tou.png' : item.message.attachment.sender.headImg" class="w100" @click="userInfo(item)">
                      </section>
                      <section class="room_headImg_right">
                        <div class="fw" @click="aiteOnePerson(item)">
                          <img
                            v-if="item.message.attachment.sender.level !== 0"
                            :src='headImg[item.message.attachment.sender.level]'
                            class="room-grade dInV"
                            :style="{'height': chatRoomFont.roomGradeHeight}">
                          <p class="dInV">
                            <span v-if="item.message.attachment.sender.identity !== '' && item.message.attachment.sender.type !== 0" class="room-info-admin-title">
                                {{item.message.attachment.sender.identity}}
                            </span>
                            <span class="room-name dInV">
                                {{item.message.attachment.sender.nickname === '' ? '佚名' : item.message.attachment.sender.nickname}}
                            </span>
                          </p>
                        </div>
                        <p
                          v-if="item.message.content && item.message.messageType !== 2 && !item.message.attachment.image"
                          class="room_msg"
                          :class="{green: item.message.attachment.sender.type > 0, redColor: item.message.attachment.sender.openid === init.message.member.openid}">
                            {{item.message.content}}
                        </p>
                        <Voice v-if="item.message.messageType === 2" :data="item.message" style="margin:.1rem;">
                          <span class="video-second" slot="right">{{item.message.attachment.voice.length}}"</span>
                        </Voice>
                        <section class="fw flieImg-box" v-if="item.message.attachment.image">
                          <img :src="item.message.attachment.image.smallUrl"
                               class="flieImg"
                               :style="{width: item.message.attachment.image.bigWidth / 60 + 'rem'}"
                               @click="flieImgH(item)"
                          />
                          <!--:style="{width: item.message.attachment.image.bigWidth / 60 + 'rem'}"-->
                        </section>
                      </section>
                    </section>
                    <!--点击昵称弹出的底部 end-->
                    <!--分享订单模板-->
                    <template>
                        <section v-if="item.event === 'shareOrder' || item.event === 'precisePlan'">
                          <section class="room_headImg">
                            <img :src="!item.message.sender.headImg || item.message.sender.headImg.indexOf('/default') > -1 ? '/mobile/images/mine/geren_tou.png' : item.message.sender.headImg"  @click="userInfo(item)" class="w100">
                          </section>
                          <section class="room_headImg_right">
                            <section class="room-info" @click="aiteOnePerson(item)">
                             <!--<img 计划员特殊
                                :src='headImg[ item.event === "precisePlan" ? headImg.length -1 : item.message.sender.level]'
                                :style="{'height': chatRoomFont.roomGradeHeight}"
                                class="room-grade"
                                >
                              <p style="display:inline-block;vertical-align: top;">
                                <span class="room-info-admin-title" v-if="item.message.sender.type !== 0 && item.event !== 'precisePlan'">{{item.message.sender.identity}}</span>
                                <span class="room-name dInV">{{item.message.sender.nickname}} </span><span v-if="item.message.sender.type !== 2" class="origin">分享一注单<img src="../../../assets/images/chatroom/room-share-icon.png" class="room-share-icon dInV"></span>
                              </p>-->
                              <img
                                v-if="item.message.sender.level !== 0"
                                :src='headImg[item.message.sender.level]'
                                :style="{'height': chatRoomFont.roomGradeHeight}"
                                class="room-grade"
                              >
                              <p style="display:inline-block;vertical-align: top;">
                                <span class="room-info-admin-title" v-if="item.message.sender.type !== 0" style="display:inline-block;vertical-align: top;">{{item.message.sender.identity}}</span><span class="room-name dInV">{{item.message.sender.nickname}} </span>
                              </p>
                              <span style="display:inline-block;vertical-align: top;" class="origin">分享一注单<img src="../../../assets/images/chatroom/room-share-icon.png" class="room-share-icon dInV"></span>
                            </section>
                            <ShareOrder
                              :data="item.message"
                              @lookShareBetting="lookShareBetting(1, item)"
                              @attention="attention(item)"
                              @plannerChat="plannerChat(item)"
                            />
                          </section>
                        </section>
                        <section v-if="item.event === 'transferMessage'  && item.message && item.message.attachment && item.message.attachment.type !== 5">
                          <section class="room_headImg">
                            <img :src="!item.message.attachment.sender.headImg || item.message.attachment.sender.headImg.indexOf('/default') > -1 ? '/mobile/images/mine/geren_tou.png' : item.message.attachment.sender.headImg" @click="userInfo(item)" class="w100">
                          </section>
                          <section class="room_headImg_right">
                            <section class="room-info" @click="aiteOnePerson(item)">
                              <img
                                v-if="item.message.attachment.sender.level !== 0"
                                :src='headImg[ item.message.attachment.type === 10 ? headImg.length -1 : item.message.attachment.sender.level]'
                                :style="{'height': chatRoomFont.roomGradeHeight}"
                                class="room-grade"
                               >
                              <p style="display:inline-block;vertical-align: top;">
                                <span class="room-info-admin-title" v-if="item.message.attachment.sender.type !== 0 && item.message.attachment.type !== 10">{{item.message.attachment.sender.identity}}</span>
                                <span class="room-name dInV ">{{item.message.attachment.sender.nickname}} </span>
                              </p>
                              <span v-if="item.message.attachment.sender.type !== 2" class="origin" style="display:inline-block;vertical-align: top;">分享一注单<img src="../../../assets/images/chatroom/room-share-icon.png" class="room-share-icon dInV"></span>
                            </section>
                            <ShareOrder
                              :data="item.message.attachment"
                              @lookShareBetting="lookShareBetting(1, item)"
                              @attention="attention(item)"
                              @plannerChat="plannerChat(item)"
                            />
                          </section>
                        </section>
                    </template>
                    <!--分享订单模板 end-->
                    <!--今日战绩模板-->
                    <template>
                        <section class="fw" v-if="item.event === 'todayScore'">
                          <section class="room_headImg">
                             <img :src="!item.message.sender.headImg || item.message.sender.headImg.indexOf('/default') > -1 ? '/mobile/images/mine/geren_tou.png' : item.message.sender.headImg" @click="userInfo(item)" class="w100">
                          </section>
                          <section class="room_headImg_right">
                            <div class="room-info" @click="aiteOnePerson(item)">
                              <img
                                v-if="item.message.sender.level !== 0"
                                :src='headImg[item.message.sender.level]'
                                :style="{'height': chatRoomFont.roomGradeHeight}"
                                class="room-grade">
                              <p class="dInV room-info-hb">
                                <span class="room-info-admin-title" v-if="item.message.sender.type !== 0">{{item.message.sender.identity}}</span>
                                <span class="room-name dInV room-info-hb">{{item.message.sender.nickname}}</span>
                              </p>
                              <span class="origin dInV">分享了会员战绩</span>
                            </div>
                            <TodayRecord
                              :data="item.message"
                              @attention="attention(item)"
                            />
                          </section>
                        </section>
                        <section class="fw" v-if="item.event === 'transferMessage' && item.message.attachment.type === 5">
                          <section class="room_headImg">
                            <img :src="!item.message.sender.headImg || item.message.sender.headImg.indexOf('/default') > -1 ? '/mobile/images/mine/geren_tou.png' : item.message.sender.headImg" class="w100" @click="userInfo(item)">
                          </section>
                          <section class="room_headImg_right">
                            <section class="room-info"  @click="aiteOnePerson(item)">
                              <img
                                v-if="item.message.attachment.sender.level !== 0"
                                :src='headImg[item.message.attachment.sender.level]'
                                :style="{'height': chatRoomFont.roomGradeHeight}"
                                class="room-grade"
                              >
                              <p class="dInV">
                                <span class="room-info-admin-title" v-if="item.message.attachment.sender.type !== 0">{{item.message.attachment.sender.identity}}</span>
                                <span class="room-name dInV room-info-hb">{{item.message.attachment.sender.nickname}}:</span>
                              </p>
                              <span class="origin dInV">分享了{{item.message.attachment.record.type}}战绩</span>
                            </section>
                            <TodayRecord
                              :data="item.message.attachment"
                              @attention="attention(item)"
                            />
                          </section>
                        </section>
                    </template>
                    <!--今日战绩模板 end-->
                    <!--红包消息模板-->
                    <template v-if="item.event === 'commonRedPacket' || item.event === 'flauntRedPacket' || item.event === 'speciallyRedPacket'">
                    <section class="room_headImg">
                      <img :src="!item.message.sender.headImg || item.message.sender.headImg.indexOf('/default') > -1 ? '/mobile/images/mine/geren_tou.png' : item.message.sender.headImg" class="w100" @click="userInfo(item)">
                    </section>
                    <section class="room_headImg_right">
                      <RegBag
                        :item="item"
                        :removeRoomHandler="removeRoomHandler"
                        @regBagHanlder="regBagHanlder"
                        class="fw"
                      >
                        <div slot="info-name" @click="aiteOnePerson(item)" style="display:inline-block;">
                          <img
                            v-if="item.message.sender.level !== 0"
                            :src='headImg[item.message.sender.level]'
                            :style="{'height': chatRoomFont.roomGradeHeight}"
                            class="room-grade"
                          >
                          <p class="dInV">
                            <span class="room-info-admin-title" v-if="item.message.sender.type !== 0">{{item.message.sender.identity}}</span>
                            <span class="room-name dInV">{{item.message.sender.nickname}}</span>
                          </p>
                        </div>
                      </RegBag>
                    </section>
                  </template>
                    <!--红包消息模板 end-->
                    <!--消息提示-->
                    <section class="fw tc room-time-regReceive"
                             v-if="item.event === 'getRedPacketNotify' ||
                             item.event === 'joinRoomMsg' ||
                             item.event === 'roomReleaseShutup' ||
                             item.event === 'outRoom' ||
                             item.event === 'memberShutup' ||
                             item.event === 'memberReleaseShutup' ||
                             item.event === 'roomShutup'">
                        <p class="joinRoomMsg" v-if="item.event === 'roomReleaseShutup' || item.event === 'roomShutup'">
                            {{item.event === 'roomReleaseShutup' ? '房间已解除禁言, 可以说话' : '房间被禁言, 禁止任何人说话'}}
                        </p>
                        <p class="joinRoomMsg" v-if="item.event === 'memberShutup' || item.event === 'memberReleaseShutup'">
                            {{item.message.name}}
                        </p>
                        <p class="joinRoomMsg" v-if="item.event === 'joinRoomMsg' || item.event === 'outRoom'">
                            {{item.message.name}}
                        </p>
                        <template  v-if="item.event === 'getRedPacketNotify' && item.message.redPacketList" >
                          <section v-for="(im, ix) in item.message.redPacketList" :key="ix">
                              <p class="room-time dInV" >
                                  <span class="room-regReceiveName wzfw">{{im.receiverNickname}}</span>
                                  领取了
                                  <span class="room-regReceiveName wzfw">{{im.senderNickname}}</span>
                                  <span class="room-hb-cl" @click="regBagDetail(item)"> 红包</span>
                              </p>
                          </section>
                        </template>
                        <section v-if="item.event === 'getRedPacketNotify' && !item.message.redPacketList">
                             <p class="room-time dInV" >
                                <span class="room-regReceiveName wzfw">{{item.message.receiverNickname}}</span>
                                  领取了
                                <span class="room-regReceiveName wzfw">{{item.message.senderNickname}}</span>
                                 <span class="room-hb-cl" @click="regBagDetail(item)"> 红包</span>
                              </p>
                        </section>
                    </section>
                    <!--消息提示 end-->
                </section>
            </loadmore>
             <button v-if="downShow" class="down-btn" @click="downSild">
               <img src="/mobile/images/chatroom/icon_room_tobottom.png">
              </button>
        </section>
        <!--点击图片放大-->
        <section class="bigFlieImg-box tc" v-if="bigFlieImg.show" @click="bigFlieImgClose">
            <img :src="bigFlieImg.url" class="bigFlieImg dInV"  ref="bigFlieImg">
        </section>
        <!--点击图片放大 end-->
        <!--点击昵称弹出的底部-->
        <mt-actionsheet :actions="actions" v-model="userInfoShow" class="footer-menu-mint"/>
        <!--查看资料-->
        <LookInformation v-if="actionsLookData" :lookData="actionsData" @openLookClose="openLookClose" class="body"/>
        <!--查看资料 end-->
        <!--红包 -->
        <RegBagReceive
          v-if="regBags.hbBgShow"
          :data="regBags"
          :removeRoomHandler="removeRoomHandler"
          :rooms="rooms"
          @RegBagReceiveClose="RegBagReceiveClose"/>
        <!--发送红包模板 end-->
        <!--红包详情模板-->
        <Details v-if="regBags.details" :data="regBags.detailsData" class="body"  @redDetailsisShow="redDetailssShow"/>
        <!--红包详情模板 end-->
        <!--分享订单-->
        <Share-betting v-if="isFootPrompt" :data="JSON.parse(JSON.stringify(footPrompt))"  @closeH="shareBettion"/>
        <!--分享订单 end-->
        <section class="room-send wrap" ref="roomSend">
            <!--底部的分享提示模板 start-->
            <section class="ft0" v-if="isFootPromptShow">
                <section class="footPrompt tl">
                    <div class="footPrompt-infos wzfw">
                        <span class="footPrompt-name wzfw dInV">{{footPrompt.senderType === 2 ? '计划员: ' : ''}}{{footPrompt.nickname}}</span>分享<span class="footPrompt-money dInV">{{footPrompt.unitFee / 100}}</span>倍 {{footPrompt.lotteryName}} 的订单
                    </div>
                    <!--<div class="footPrompt-look" @click="footPromptBtn">查看</div> ¥ {{footPrompt.order.totalFee}} -->
                    <div class="footPrompt-look" @click="footPromptBtn">查看</div>
                </section>
            </section>
            <!-- ----------------------------------------------- -->
            <!--底部的分享提示模板 end-->
            <section class="room-send-btns">
                <img src="../../../assets/images/chatroom/room-yy.png" class="room-send-gn dInV dn" @click="sendYy">
                <input
                  type="text"
                  class="room-send-text dInV"
                  v-if="sendTextShow"
                  ref="sendText"
                  v-model="userText"
                  @click="inputStyle"
                  @keyup.enter="clickButton">
                <div class="room-send-yy dInV" v-if="sendYyShow" @touchstart="sendYyStart" @touchend="sendYyEnd">按住说话</div>
                <img src="../../../assets/images/chatroom/room-bq.png" class="room-send-gn dInV" @click="emoji">
                <img src="../../../assets/images/chatroom/room-clear.png" class="room-send-gn dInV" @click="joinData.message = []">
                <section v-if="semdMsd" class="dInV semdMsd" @click="clickButton">发送</section>
                <section v-if="!semdMsd" class="dInV">
                    <section  class="room-send-gn dInV"  v-if="footerSend.sendM" @click="footerSendSendM">
                        <img src="../../../assets/images/chatroom/chat_tab_unlock.png" class="room-send-gn-s">
                    </section>
                    <img src="../../../assets/images/chatroom/romm-s.png" class="room-send-gn dInV" v-if="footerSend.sendS" @click="footerSendSendS">
                    <img src="../../../assets/images/chatroom/room-more.png" class="room-send-gn dInV" @click="sendMoreBox">
                </section>
            </section>
            <!-- emoji -->
            <Emojs v-if="emojis.show" @addEmoji = "addEmoji"></Emojs>
            <!-- eite -->
            <Eite ref="AEite" v-show="hasEite" has-eite="hasEitte"></Eite>
            <!-- 剥离样本 -->
            <more-expand ref="newRoomSendMoreBox" class="room-send-more-boxs" v-show="moreBoxShow" :style="{height: SendMoreBoxHeight + 'rem'}" :removeRoomHandler="removeRoomHandler"
            :init="init"
            :rooms="rooms"
            :chatRoom="chatRoom"
            @componentLen="componentLen"
            ></more-expand>
        </section>
        <!-- ----------------------------------------------- -->
        <section class="fw body" v-if="bannedListShow">
          <Head>
            <div class="play-center">
              <span v-if="bannedListType === 'friendList'">好友列表</span>
            </div>
            <div v-if="bannedListShare" @click="confrimShare" class="play-right">
              确认分享
            </div>
          </Head>
          <!-- 根据不同的type。获取不同列表数据 -->
            <BannedList ref="confrim" :pRoomId = "rooms.data.chatRoomId" :type ="bannedListType"></BannedList>
        </section>
        <SharePop :sharePopData="sharePopData" v-if="sharePop" @close="sharePopClose"/>
         <!-- 剥离右侧悬浮窗 -->
            <rightExpand
            ref="expandCon"
            :removeRoomHandler="removeRoomHandler"
            :rooms="rooms"
            :dragonIconShow="dragonIconShow"
            :friendIcon="friendIcon"
            :rightFloatFlang="rightFloatFlang"
            >
            </rightExpand>
    </section>
</template>
<script>
import Head from 'Components/global/head'
import Details from 'Components/lottery/chatroom/redDefaile'
import BannedList from 'Components/lottery/chatroom/bannedList'
import PrivateChat from 'Components/lottery/chatroom/privateChat'
import SharePop from 'Components/lottery/chatroom/sharePop'
import ShareBetting from 'Components/lottery/chatroom/shareBetting'
import Voice from 'Components/lottery/chatroom/module/voice'
import Emojs from 'Components/lottery/chatroom/module/emoji'
import Eite from 'Components/lottery/chatroom/module/eite'
import ShareOrder from 'Components/lottery/chatroom/module/shareOrder'
import TodayRecord from 'Components/lottery/chatroom/module/todayRecord'
import RegBag from 'Components/lottery/chatroom/module/regBag'
import RegBagReceive from 'Components/lottery/chatroom/module/regBagReceive'
import LookInformation from 'Components/lottery/chatroom/lookInformation'
import moreExpand from 'Components/lottery/chatroom/moreExpand'
import rightExpand from 'Components/lottery/chatroom/module/rightExpand'
import { Loadmore } from 'mint-ui'
import { mapState, mapGetters } from 'vuex'
export default {
  inject: ['reload'],
  name: 'betting-round',
  props: ['moreRoom', 'friendIcon'],
  data () {
    return {
      downShow: false,
      sendStatus: false, // 防止重复提交
      rightFloatFlang: true,
      sessionClosedReceipt: false,
      amr: null,
      musics: null, // 语音开关
      musicSto: null,
      joinRoomNotify: {
        name: '',
        show: false,
        content: ''
      },
      userText: '',
      joinData: {
        message: []
      },
      hasEite: false, // 是否有@
      mainHeight: 0,
      mainHeights: {
        height: '',
        top: '',
        joinHeight: ''
      },
      SendMoreBoxHeight: '',
      headImg: this.$store.state.chatRoom.headImg,
      allLoaded: false,
      sendYyShow: false,
      sendTextShow: true,
      moreBoxShow: false,
      footerSend: {
        sendM: true,
        sendS: false
      },
      userInfoShow: false,
      actionsItem: null,
      actions: [
        // { name: '分享到聊天室', method: this.shareRoom, index: 1 },
        // { name: '分享到好友', method: this.sharePerson, index: 2 },
        // { name: '删除本条消息', method: this.actionDelect, index: 3 },
        // { name: '查看资料', method: this.actionLook, index: 4 }
      ],
      actionsLookData: false,
      actionsData: {
        fansNumber: null,
        followNumber: null,
        attention: null,
        level: null,
        identity: null,
        nickname: null,
        openid: null,
        openID: null,
        headImg: null,
        shutup: null,
        stop: null,
        type: null,
        authority: null,
        markName: null,
        roomid: null
      },
      roomsBanned: false,
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
      rooms: {
        'event': 'dialogue',
        'data': {
          'chatRoomId': '',
          'content': '',
          'appid': '',
          'enableChat': true,
          'messageType': 1.0,
          'attachment': {
            status: {
              load: false,
              err: false
            },
            'type': 0,
            'sender': {
              'messageId': 0,
              'userId': 100003,
              'openid': 0,
              'id': 0,
              'nickname': '',
              'level': 1,
              'identity': '',
              'timestamp': 0,
              'showType': 0,
              'appid': '',
              'authority': null,
              'headImg': ''
            }
          }
        }
      },
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
      bannedListShow: false,
      bannedListType: '',
      bannedListShare: false,
      params: {
        offset: 0,
        count: 30,
        num: 0
      },
      sharePop: false,
      sharePopData: {},
      emojis: {
        show: false
      },
      voice: {
        voiceStorage: []
      },
      bigFlieImg: {
        show: false,
        url: ''
      },
      isFootPrompt: false,
      isFootPromptShow: false,
      footPrompt: {
        show: false,
        name: '',
        money: '',
        lottery: '',
        footPromptShow: false
      },
      semdMsd: false,
      scrollH: {
        flag: true,
        top: 0,
        start: 0,
        end: 0
      }, // 滚动条开关
      addSayRommShow: false,
      lookBetData: {},
      roomBettingShow: true, // 子房间右侧投注按钮
      dragonIconShow: false,
      removeRoomHandler: true, // 被踢出后隐藏在线列表
      bodyShow: false,
      extendChildLenth: 0 // 扩展内容数量
    }
  },
  components: {
    Head,
    Details,
    Loadmore,
    BannedList,
    PrivateChat,
    SharePop,
    ShareBetting,
    Voice,
    Emojs,
    Eite,
    ShareOrder,
    TodayRecord,
    LookInformation,
    RegBag,
    RegBagReceive,
    moreExpand,
    rightExpand
  },
  computed: {
    ...mapGetters({
      chatRoomFont: 'chatRoomFont',
      system_config: 'system_config'
    }),
    ...mapState({
      chatRoom (state) {
        return state.chatRoom
      },
      Lottery (state) {
        return state.Lottery
      },
      init (state) {
        if (state.chatRoom) {
          return state.chatRoom.init
        } else {
          return {}
        }
      }
    })
  },
  watch: {
    mainHeight () {
      this.mainHeightHanlder()
    },
    userText (newVal, oldVal) {
      this.userText !== '' ? this.semdMsd = true : this.semdMsd = false
      let test = newVal.substr(oldVal.length, 1)
      if (this.init.message.member.type !== -1 && test === '@') {
        this.chatRoom.eiteMore.flag = true
        if (this.init.message.member.type === 0) {
          this.chatRoom.eiteMore.list = []
        }
        this.$refs.expandCon.onlinePersonShow = true
      }
      if (newVal.length === 0) {
        this.chatRoom.eiteMore.flag = false
      }
    },
    joinData: {
      handler () {
        if (this.joinData.message.length > 300) {
          this.joinData.message.shift()
        }
        if (this.scrollH.flag) {
          this.$nextTick(() => {
            this.$refs.main.scrollTop = this.$refs.main.scrollHeight
          })
        }
      },
      deep: true
    },
    'chatRoom.ws': {
      handler () {
        this.create()
      },
      deep: false
    },
    'chatRoom.init': {
      handler (data) {
        // console.log(this.$route)
        // if (this.$route.path.includes('moreRoom')) {
        //   this.moreBoxShow = false
        // }
        this.mainHeightHanlder()
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
        }
      },
      deep: true
    },
    'chatRoom.systemNotify': {
      handler (data) {
        let chatRooms = this.init.message.chatRooms
        for (let i = 0; i < chatRooms.length; i++) {
          if (chatRooms[i].roomId === this.chatRoom.roomNmae) {
            this.rooms.data.chatRoomId = this.actionsData.roomid = chatRooms[i].roomId
            this.rooms.data.appid = chatRooms[i].appid
            this.rooms.data.enableChat = chatRooms[i].enableChat
          }
        }
        this.userInfos = this.init.message
        if (data.message.msg === '您被踢出该房间了, 无法继续发言' && this.rooms.data.chatRoomId === data.message.chatRoomId) { // 限制了只在当前房间才弹出提示
          let outRoom = {
            event: 'outRoom',
            message: {
              name: data.message.msg
            }
          }
          this.joinData.message.push(outRoom)
        }
      },
      deep: true
    },
    'chatRoom.initRoom': {
      handler (data) {
        this.bodyShow = true
        this.chatRoom.initRoom = data
        this.chatRoom.roomAuthority = data.message.roomAuthority
        let record = data.message.record
        let recordLeng = record.length
        if (data.message.notice && data.message.notice.openStatus === 1) {
          this.chatRoom.notice = []
          this.chatRoom.notice.push(data.message.notice)
        } else {
          this.axios.get('/front/homepage/init.do')
            .then((res) => {
              if (res.code === 0) {
                this.chatRoom.notice = res.data.notices
              }
            })
            .catch(() => {})
        }
        let roomsData = this.rooms.data.attachment.sender
        roomsData.openid = this.init.message.member.openid
        roomsData.nickname = this.init.message.member.nickname
        roomsData.level = this.init.message.member.level
        roomsData.identity = this.init.message.member.identity
        roomsData.headImg = this.init.message.member.headImg
        roomsData.type = this.init.message.member.type
        let voiceUnread = this.Utils.Storage.get('voiceUnread')
        if (voiceUnread) {
          this.voice.voiceStorage = voiceUnread
          let voiceUnreadLeng = voiceUnread.length
          let dataArr = []
          for (let i = 0; i < voiceUnreadLeng; i++) {
            dataArr[voiceUnread[i].messageId] = true
            for (let j = 0; j < recordLeng; j++) {
              if (record[j].message.attachment && record[j].message.attachment.voice) {
                if (record[j].messageId === voiceUnread[i].messageId) {
                  record[j].message.messageId = record[j].messageId
                  record[j].message.attachment.voice.unread = voiceUnread[i].unread
                  record[j].message.attachment.voice.play = false
                }
              }
            }
          }
          for (let j = 0; j < recordLeng; j++) {
            if (record[j].message.attachment && record[j].message.attachment.voice) {
              if (!dataArr[record[j].messageId]) {
                record[j].message.attachment.voice.play = false
                record[j].message.attachment.voice.unread = true
                record[j].message.messageId = record[j].messageId
                let json = {}
                json.messageId = record[j].messageId
                json.unread = true
                this.voice.voiceStorage.push(json)
                this.Utils.Storage.save('voiceUnread', this.voice.voiceStorage)
              }
            }
          }
        } else {
          for (let i = 0; i < recordLeng; i++) {
            if (record[i].message.attachment && record[i].message.attachment.voice) {
              record[i].message.attachment.voice.play = false
              record[i].message.attachment.voice.unread = true
              record[i].message.messageId = record[i].messageId
              let json = {}
              json.messageId = record[i].messageId
              json.unread = true
              this.voice.voiceStorage.push(json)
              this.Utils.Storage.save('voiceUnread', this.voice.voiceStorage)
            }
          }
        }
        let lotteryArr = this.Utils.Storage.get('lotteryArr')
        if (lotteryArr) {
          let lotteryArrLeng = lotteryArr.length
          for (let i = 0; i < recordLeng; i++) {
            if (record[i].event === 'precisePlan' || record[i].event === 'shareOrder') {
              for (let j = 0; j < lotteryArrLeng; j++) {
                if (record[i].message.order.lotteryId === lotteryArr[j].lotteryId) {
                  record[i].message.order.url = lotteryArr[j].URL
                }
              }
            }
            if (record[i].event === 'transferMessage' && record[i].message.attachment.type !== 5) {
              for (let j = 0; j < lotteryArrLeng; j++) {
                if (record[i].message.attachment.order.lotteryId === lotteryArr[j].lotteryId) {
                  record[i].message.attachment.order.url = lotteryArr[j].URL
                }
              }
            }
          }
        } else {
          this.axios.get('/front/lottery/sixmark_attribute.do')
            .then((re) => {
              if (re.code === 0) {
                let reData = re.rows
                let reLeng = re.rows.length
                for (let i = 0; i < recordLeng; i++) {
                  if (record[i].event === 'precisePlan' || record[i].event === 'shareOrder') {
                    for (let j = 0; j < reLeng; j++) {
                      if (record[i].message.order.lotteryId === reData[j].lotteryId) {
                        record[i].message.order.url = reData[j].URL
                      }
                    }
                  }
                  if (record[i].event === 'transferMessage' && record[i].message.attachment.type !== 5) {
                    for (let j = 0; j < reLeng; j++) {
                      if (record[i].message.attachment.order.lotteryId === reData[j].lotteryId) {
                        record[i].message.attachment.order.url = reData[j].URL
                      }
                    }
                  }
                }
                this.Utils.Storage.save('lotteryArr', reData)
              }
            })
            .catch(() => {})
        }
        this.joinData.message = record
        try {
          this.$refs.main.scrollTop = this.$refs.main.scrollHeight
        } catch (error) {
        }
        let rooms = this.init.message.chatRooms
        let roomsLeng = rooms.length
        for (let i = 0; i < roomsLeng; i++) {
          if (data.message.chatRoomId === rooms[i].roomId) {
            let joinRoomMsg = {
              event: 'joinRoomMsg',
              message: {
                name: '已进入' + rooms[i].name
              }
            }
            this.joinData.message.push(joinRoomMsg)
          }
        }
      },
      deep: false
    },
    'chatRoom.dialogue': {
      handler (data) {
        console.log(data, '')
        let _message = data.message
        _message.dielogueId = data.messageId
        let _attachment = _message.attachment || {}
        let { type, receiver, sender, receiverList, voice } = _attachment
        // @某人，弹出提示
        if (
          type === 0 && receiver && receiver.openid === this.init.message.member.openid
        ) {
          this.joinRoomNotify.name = receiver.nickname + '@了你: ' + _message.content
          this.joinRoomNotify.show = true
          setTimeout(() => {
            this.joinRoomNotify.show = false
          }, 2000)
        }
        // @all
        if (
          type === 0 &&
          (_message.content.indexOf('@所有人') > -1 || _message.content.indexOf('@all') > -1) &&
          (this.init.message.member.openid !== sender.openid)
        ) {
          // let index = 0
          // if (_message.content.indexOf('@所有人') > -1) {
          //   index = _message.content.indexOf('@所有人') + '@all'.length
          // } else if (_message.content.indexOf('@all') > -1) {
          //   index = _message.content.indexOf('@all') + '@all'.length
          // }
          this.joinRoomNotify.name = sender.nickname + '@了所有人: ' + _message.content // .substr(index + 4).trim()
          // this.joinRoomNotify.name = sender.nickname + '@了你: ' + _message.content.replace(/@(所有人|all)/g, '')
          this.joinRoomNotify.show = true
          setTimeout(() => {
            this.joinRoomNotify.show = false
          }, 2000)
        }
        // @多人 start
        if (
          type === 12 && receiverList
        ) {
          let list = receiverList
          for (let i = 0; i < receiverList.length; i++) {
            if (this.init.message.member.openid === list[i].openid) {
              this.joinRoomNotify.name = list[i].nickname + '@了: ' + _message.content
              this.joinRoomNotify.show = true
              setTimeout(() => {
                this.joinRoomNotify.show = false
              }, 2000)
            }
          }
        }
        // @多人 end
        // @某某和@所有人的提示样式组件
        // 不管是@单人还是所有人，都要显示提示组件
        if (
          type === 0 && receiver && receiver.openid === this.init.message.member.openid
        ) {
          this.hasEite = true
          this.$store.dispatch('changeEiteStatus', 1)
          this.$refs.AEite.addEite(_message, 'one')
        } else if (
          type === 0 &&
          ((_message.content.indexOf('@所有人') > -1 || _message.content.indexOf('@all') > -1)) &&
          (this.init.message.member.openid !== sender.openid)
        ) {
          this.hasEite = true
          this.$store.dispatch('changeEiteStatus', 1)
          this.$refs.AEite.addEite(_message, 'all')
        } else if (
          type === 12 && receiverList
        ) {
          let list = receiverList
          let listLeng = list.length
          for (let i = 0; i < listLeng; i++) {
            if (this.init.message.member.openid === list[i].openid) {
              this.hasEite = true
              this.$store.dispatch('changeEiteStatus', 1)
              this.$refs.AEite.addEite(_message, 'all')
            }
          }
        }
        // 语音
        if (voice) {
          // 语音控制
          let json = {}
          voice.play = false
          data.message.messageId = data.messageId
          json.messageId = data.messageId
          json.unread = voice.unread = true
          this.voice.voiceStorage.push(json)
          this.Utils.Storage.save('voiceUnread', this.voice.voiceStorage)
        }
        this.joinData.message.push(data)
      },
      deep: true
    },
    'chatRoom.roomReleaseShutup': {
      handler (data) {
        this.chatRoom.initRoom.message.roomEnableChat = true
        this.$messagebox('提示', '当前房间已解除禁言')
        this.joinData.message.push(data)
      },
      deep: true
    },
    'chatRoom.roomShutup': {
      handler (data) {
        this.chatRoom.initRoom.message.roomEnableChat = false
        this.$messagebox('提示', '当前房间已被禁言')
        this.joinData.message.push(data)
      },
      deep: true
    },
    'chatRoom.memberShutup': {
      handler (data) {
        this.chatRoom.initRoom.message.isShutup = true
        let memberShutup = {
          event: 'memberShutup',
          message: {
            name: data.message.msg
          }
        }
        this.joinData.message.push(memberShutup)
      },
      deep: true
    },
    'chatRoom.memberReleaseShutup': {
      handler (data) {
        this.chatRoom.initRoom.message.isShutup = false
        let memberReleaseShutup = {
          event: 'memberReleaseShutup',
          message: {
            name: data.message.msg
          }
        }
        this.joinData.message.push(memberReleaseShutup)
      },
      deep: true
    },
    'chatRoom.exceptionNotify': {
      handler (data) {
        let msg = ''
        msg = data.message.msg
        if (msg.includes('无效访问令牌')) {
          this.Utils.Storage.remove('sessionid')
          this.Utils.Storage.remove('user')
          window.location.href = '/mobile/studio/#/login'
          setTimeout(() => {
            window.location.reload(true)
          }, 100)
        } else {
          this.$toast({
            className: 'wider-this.$toast',
            message: msg,
            position: 'bottom',
            duration: 3000
          })
        }
      },
      deep: true
    },
    'chatRoom.shareOrder': {
      handler (data) {
        // let sound = new this.$Howl({
        //   src: [require('../../../assets/images/chatroom/plan.mp3')]
        // })
        // if (this.musicSto) {
        //   // 要计划专员才播放
        //   if (this.musicSto.plan) {
        //     sound.play()
        //     // this.musics.plan.play()
        //   } else {
        //     sound.stop()
        //     // this.musics.plan.pause()
        //     // this.musics.plan.currentTime = 0
        //   }
        // } else {
        //   sound.play()
        //   // this.musics.plan.play()
        // }
        this.footPrompt = data.message.order
        this.footPrompt.theme = 1
        this.footPrompt.name = data.message.sender.nickname
        this.footPrompt.senderType = data.message.sender.type
        if (this.isFootPromptShow) {
          this.isFootPromptShow = false
          setTimeout(() => {
            this.isFootPromptShow = true
          }, 100)
        } else {
          this.isFootPromptShow = true
          setTimeout(() => {
            this.isFootPromptShow = false
          }, 4000)
        }
        let lotteryArr = this.Utils.Storage.get('lotteryArr')
        if (lotteryArr) {
          let lotteryArrLeng = lotteryArr.length
          for (let i = 0; i < lotteryArrLeng; i++) {
            if (lotteryArr[i].lotteryId === this.footPrompt.lotteryId) {
              data.message.order.url = lotteryArr[i].URL
            }
          }
        }
        this.joinData.message.push(data)
      },
      deep: true
    },
    'chatRoom.todayScore': {
      handler (data) {
        this.joinData.message.push(data)
      },
      deep: false
    },
    'chatRoom.commonRedPacket': {
      handler (data) {
        // let sound = new this.$Howl({
        //   src: [require('../../../assets/images/chatroom/packet2.mp3')]
        // })
        // if (this.musicSto) {
        //   if (this.musicSto.packet) {
        //     sound.play()
        //     // this.musics.packet.play()
        //   } else {
        //     sound.stop()
        //     // this.musics.packet.pause()
        //     // this.musics.packet.currentTime = 0
        //   }
        // } else {
        //   sound.play()
        //   // this.musics.packet.play()
        // }
        this.joinData.message.push(data)
      },
      deep: true
    },
    'chatRoom.requestPrivateChatNotify': {
      handler (data) {
        this.lookData.oneRoomRes = data.message.chatRoom
        this.lookData.OneRoom = true
      },
      deep: true
    },
    'chatRoom.joinRoomNotify': {
      handler (data) {
        this.joinRoomNotify.name = data.message.nickname + '进入了房间'
        this.joinRoomNotify.show = true
        setTimeout(() => {
          this.joinRoomNotify.show = false
        }, 1000)
      },
      deep: true
    },
    'chatRoom.joinRoomNotallowedNotify': {
      handler (data) {
        this.$toast({
          message: data.message.msg,
          position: 'middle',
          duration: 1000
        })
        let joinRoomMsg = {
          event: 'joinRoomMsg',
          message: {
            name: data.message.msg
          }
        }
        this.joinData.message.push(joinRoomMsg)
        this.removeRoomHandler = false
      },
      deep: true
    },
    'chatRoom.transferMessage': {
      handler (data) {
        this.joinData.message.push(data)
        this.chatRoom.oneRoomData = data.message
      },
      deep: false
    },
    'chatRoom.transferReceipt': {
      handler (data) {
        let msg = ''
        if (data.message.success) {
          msg = '分享成功'
        } else {
          msg = data.message.msg
        }
        this.$toast({
          message: msg,
          position: 'middle',
          duration: 1500
        })
        if (this.chatRoom.privateChatz.yes) {
          let forwardList = this.chatRoom.forwardList
          let forwardListLeng = forwardList.length
          for (let i = 0; i < forwardListLeng; i++) {
            if (data.message.msgId === forwardList[i].openid) {
              let request = {
                event: 'privateChat',
                data: {
                  attachment: this.chatRoom.privateChatz.data.attachment,
                  chatType: 1,
                  chatId: data.message.chatId,
                  content: '[分享注单]',
                  receiver: forwardList[i].openid,
                  sender: this.init.message.member.openid,
                  timestamp: new Date().getTime(),
                  type: 1
                }
              }
              this.chatRoom.ws.send(JSON.stringify(request))
              this.chatRoom.forwardListCancel.push(data.message)
            }
          }
        }
        this.sharePop = false
        this.$store.commit('sharePopH')
      },
      deep: true
    },
    'chatRoom.leaveRoomNotify': {
      handler (data) {
        if (this.userInfos.follows) {
          let followsL = this.userInfos.follows.length
          for (let i = 0; i < followsL; i++) {
            if (this.userInfos.follows[i] === data.message.openid) {
              setTimeout(() => {
                this.joinData.message.push(data)
              }, 100)
            }
          }
        }
      },
      deep: true
    },
    'chatRoom.deleteMessage': {
      handler (data) {
        let joinDataLength = this.joinData.message.length

        if (data.message.messageIds === 'ALL') {
          this.joinData.message = []
          this.$toast('消息已被全部清除')
        } else {
          for (let i = 0; i < joinDataLength; i++) {
            if (this.joinData.message[i].messageId === Number(data.message.messageIds)) {
              this.joinData.message.splice(i, 1)
              return
            }
          }
        }
      },
      deep: true
    },
    'chatRoom.chatroomNoticeNotify': {
      handler (data) {
        if (data.message.openStatus === 1) {
          this.chatRoom.notice = []
          this.chatRoom.notice.push(data.message)
        } else {
          this.axios.get('/front/homepage/init.do')
            .then((res) => {
              if (res.code === 0) {
                this.chatRoom.notice = res.data.notices
              }
            })
            .catch(() => {})
        }
      },
      deep: true
    },
    'chatRoom.removeFromRoomNotify': {
      handler (data) {
        //
        let rooms = this.init.message.chatRooms
        if (data.message.chatRoomId === rooms[0].roomId) {
          // 大厅
          this.removeRoomHandler = false
        } else {
          //
          if (this.rooms.data.chatRoomId === data.message.chatRoomId) {
            this.$messagebox.alert('您已被管理员踢出该房间，点击离开该房间!!').then(() => {
              this.chatRoom.roomNmae = rooms[0].roomId
              let share = this.Utils.Storage.get('shareBettingMoney')
              if (share) {
                if (share.currentRoom) {
                  delete share.currentRoom
                }
                if (share.afterLottery) {
                  delete share.afterLottery
                }
                this.Utils.Storage.save('shareBettingMoney', share)
              }
              this.$router.push('/chatroom')
            })
          }
        }
      },
      deep: true
    },
    'chatRoom.releaseFromRoomNotify': {
      handler (data) {
        let rooms = this.init.message.chatRooms
        if (rooms) {
          let roomsLeng = rooms.length
          for (let i = 0; i < roomsLeng; i++) {
            if (rooms[i].roomId === data.message.chatRoomId) {
              this.$messagebox('提示', '已解除你进入 ' + rooms[i].name + ' 房间的限制')
            }
          }
        }
        this.chatRoom.ws.send("{'event': 'joinRoom', 'data':'" + this.chatRoom.roomNmae + "'}")
        this.removeRoomHandler = true
      },
      deep: true
    },
    'chatRoom.roomDeleteNotify': {
      handler () {
        this.$messagebox.alert('该房间已被管理员解散,离开该房间!').then(() => {
          this.$router.push('/chatroom')
          this.chatRoom.roomNmae = this.init.message.chatRooms[0].roomId
        })
      },
      deep: false
    },
    'chatRoom.reLoginNotify': {
      handler (data) {
        this.$messagebox.confirm(data.message.msg).then(() => {
          window.location.href = '/mobile/studio/#/login'
        })
          .catch(() => {})
      },
      deep: false
    },
    '$refs.main.scrollHeight': {
      handler (data) {
        console.log(data, '')
      },
      deep: false
    }
  },
  created () {
    let requestData = {
      'event': 'leaveRoom',
      'data': '08bd1006-9c77-448a-a709-0108979999b'
    }
    this.chatRoom.ws.send(JSON.stringify(requestData))
    this.mainHeightHanlder()
    if (this.$store.state.chatRoom.ws) {
      this.create()
    }
    this.musics = this.chatRoom.music
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll, true)
  },
  beforeDestroy () {
    let requestData = {
      'event': 'leaveRoom',
      'data': '08bd1006-9c77-448a-a709-0108979999b'
    }
    this.chatRoom.ws.send(JSON.stringify(requestData))
  },
  destroyed () {
    localStorage.setItem('idType', this.rooms.data.attachment.sender.identity)
  },
  methods: {
    handleScroll () {
      // console.log('元素向上滚动的像素', this.$refs.main.scrollTop)
      // console.log('当前元素高度', this.$refs.main.clientHeight)
      // console.log('元素整体高度', this.$refs.main.scrollHeight)
      if (this.$refs.main) {
        if ((this.$refs.main.scrollHeight - this.$refs.main.scrollTop) - this.$refs.main.clientHeight === 0) {
          this.downShow = false
          window.addEventListener('scroll', this.handleScroll, false)
        } else if ((this.$refs.main.scrollHeight - this.$refs.main.scrollTop) - this.$refs.main.clientHeight > 400) {
          this.downShow = true
        }
      }
    },
    downSild () {
      this.$refs.main.scrollTop = this.$refs.main.scrollHeight - this.$refs.main.clientHeight
    },
    mainHeightHanlder () {
      // 计算聊天室高度
      if (this.moreRoom) {
        if (this.moreBoxShow || this.emojis.show) {
          if (this.SendMoreBoxHeight === 4.67) {
            this.mainHeights.height = 'calc(100% - 5.25rem - ' + this.mainHeight + ')'
            this.mainHeights.top = 'calc(1.8rem)'
          } else if (this.SendMoreBoxHeight === 2.57) {
            this.mainHeights.height = 'calc(100% - 1rem - ' + this.mainHeight + ')'
            this.mainHeights.top = 'calc(1.8rem)'
          }
        } else {
          this.mainHeights.height = 'calc(100% - 1.85rem - 1.125rem)'
          this.rightFloatFlang = false
          this.mainHeights.top = 'calc(1.8rem)'
        }
      } else {
        this.mainHeights.height = 'calc(100% - 1.125rem - 29px - 1.125rem - ' + this.mainHeight + ')'
      }
    },
    HeadBack () {
      this.bannedListShow = false
      this.bannedListShare = false
    },
    RegBagReceiveClose () {
      this.regBags.hbBgShow = false
    },
    regBagHanlder (data) {
      this.regBags = data
    },
    aiteOnePerson (item) {
      let nickname = ''
      //
      let _attachment = item.message.attachment || item.message
      // 不能@本人
      if (this.init.message.member && _attachment.sender.openid === this.init.message.member.openid) {
        this.userText = ''
        return
      }
      if (item.message.attachment) {
        nickname = _attachment.sender.nickname
        this.rooms.data.attachment.receiver = _attachment.sender
      } else {
        nickname = item.message.sender.nickname
        this.rooms.data.attachment.receiver = item.message.sender
      }
      this.userText = '@' + nickname + ' '
    },
    openLookClose () {
      this.actionsLookData = false
    },
    create () {
      let _this = this
      if (this.system_config.status && this.system_config.status.dragonStatus === 'open') {
        _this.dragonIconShow = true
      } else {
        this.axios.get('/front/get_global_config.do')
          .then((res) => {
            if (res.code === 0 && res.data.status.dragonStatus === 'open') {
              _this.dragonIconShow = true
            }
          })
          .catch(() => {})
      }
      _this.musicSto = _this.Utils.Storage.get('music')
      // 个人中心设置的文字大小
      if (_this.init) {
        this.bodyShow = true
        if (!_this.chatRoom.roomNmae) {
          _this.chatRoom.roomNmae = _this.init.message.chatRooms[0].roomId
        }
        let roomss = _this.init.message.chatRooms
        let roomsLengh = roomss.length
        for (let i = 0; i < roomsLengh; i++) {
          if (roomss[i].roomId === _this.chatRoom.roomNmae) {
            _this.chatRoom.ws.send("{'event': 'joinRoom', 'data':'" + roomss[i].roomId + "'}")
          }
        }
        let notReadSummaryList = _this.init.message.notReadSummaryList
        let num = 0
        if (notReadSummaryList) {
          let notReadLeng = notReadSummaryList.length
          for (let i = 0; i < notReadLeng; i++) {
            num += notReadSummaryList[i].count
          }
          if (_this.Utils.Storage.get('privateChatUnread')) {
            num += _this.Utils.Storage.get('privateChatUnread').length
          }
          _this.chatRoom.unreadMsgRed = num
        }
        let hyUnread = _this.Utils.Storage.get('hyUnread')
        if (hyUnread) {
          for (let key in hyUnread) {
            if (key === _this.init.message.member.openid) {
              for (let key2 in sessionStorage) {
                if (typeof sessionStorage[key2] === 'string' && typeof JSON.parse(sessionStorage[key2])) {
                  if (JSON.parse(sessionStorage[key2])[0] && JSON.parse(sessionStorage[key2])[0].temporary) {
                    if (key2 === _this.init.message.member.openid) {
                      _this.chatRoom.unreadMsgRed += hyUnread[key].length
                    }
                  }
                }
              }
            }
          }
        }
      }
      // websocket on
    },
    plannerChat (item) {
      let lookOpenid = null
      if (item.message.attachment) {
        lookOpenid = item.message.attachment.sender.openid
      } else {
        lookOpenid = item.message.sender.openid
      }
      if (this.init.message.member.type === 3) {
        this.$toast({
          message: '你不能和计划员对话',
          position: 'middle',
          duration: 1500
        })
        return false
      } else if (this.init.message.member.openid === lookOpenid) {
        this.$toast({
          message: '不能和自己对话',
          position: 'middle',
          duration: 1500
        })
        return false
      } else {
        if (this.init.message.friends) {
          let isfriends = this.init.message.friends.filter((item) => {
            return item.openid === lookOpenid
          })
          if (isfriends.length === 0) {
            this.axios.get('/cpi/relation/friend/' + this.chatRoom.flag + '?openid=' + lookOpenid)
          }
        }
        let requestData = {
          'event': 'requestPrivateChat',
          'data': {
            'sender': this.init.message.member.openid,
            'receiver': lookOpenid
          }
        }
        this.chatRoom.ws.send(JSON.stringify(requestData))
      }
      // this.$router.push({
      //   name: 'privateChat',
      //   params: {
      //     queryData: item.message.sender,
      //     roomType: ''
      //   }
      // })
    },
    scrollStart (e) {
      this.scrollH.start = e.touches[0].pageX
    },
    scrollMove (e) {
      this.scrollH.end = e.touches[0].pageX
      if (this.$refs.main.scrollTop + this.$refs.main.clientHeight !== this.$refs.main.scrollHeight) {
        this.downShow = true
      } else {
        this.downShow = false
      }
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
    purive (auth, identity) {
      let a = 1 << identity
      return (auth & (a)) === a
    },
    footPromptBtn () {
      this.isFootPrompt = true
    },
    shareBettion () {
      this.isFootPrompt = false
    },
    addEmoji (item) {
      this.userText += item
    },
    emoji () {
      let _this = this
      _this.emojis.show = !_this.emojis.show
      _this.moreBoxShow = false
      if (this.emojis.show) {
        this.SendMoreBoxHeight = 2.57
        this.chatRoom.roomNmae === this.init.message.chatRooms[0].roomId ? this.mainHeight = '6.75rem' : this.mainHeight = '6.65rem'
      } else {
        this.chatRoom.roomNmae === this.init.message.chatRooms[0].roomId ? this.mainHeight = '2.09rem' : this.mainHeight = '-2.2rem'
      }
      this.$nextTick(() => {
        this.$refs.main.scrollTop = this.$refs.main.scrollHeight
      })
    },
    shareRoom () {
      this.sharePop = true
      this.sharePopData.type = 'shareRoom'
    },
    confrimShare () {
      this.$refs.confrim.forwardOne()
      this.chatRoom.forwardListCancel = []
    },
    sharePerson () {
      // 分享到 好友列表
      // this.sharePop = true
      // this.sharePopData.type = 'sharePerson'
      this.bannedListType = 'share'
      this.bannedListShare = true
      this.bannedListShow = true
    },
    sharePopClose () {
      this.sharePop = false
    },
    redDetailssShow () {
      this.regBags.details = false
    },
    closeOneChat () {
      this.lookData.OneRoom = false
      this.reload()
    },
    deleteMessage () {
      let _this = this
      this.$messagebox.confirm('确定删除全部消息?').then(() => {
        _this.chatRoom.ws.send(JSON.stringify({
          'event': 'deleteMessage',
          'data': {
            'roomId': _this.rooms.data.chatRoomId,
            'messageIds': ''
          },
          'msgId': Math.random().toString(36).substr(2) + '-' + Math.random().toString(36).substr(2) // 32位随机数
        }))
      })
        .catch(() => {})
    },
    footerSendSendM () {
      this.footerSend.sendM = false
      this.footerSend.sendS = true
      this.$refs.main.scrollTop = this.$refs.main.scrollHeight
      this.$refs.main.style.overflow = 'hidden'
    },
    footerSendSendS () {
      this.footerSend.sendM = true
      this.footerSend.sendS = false
      this.$refs.main.style.overflow = 'scroll'
    },
    regBagDetail (item) {
      let _this = this
      let rid = ''
      if (!this.removeRoomHandler) {
        this.$messagebox('提示', '您已被管理员踢出该房间!')
        return
      }
      rid = item ? item.message.rid : rid = _this.regBags.rid
      _this.axios.get('/chat_room/get_red_packet_detail.do?rid=' + rid)
        .then((res) => {
          if (res.code === 0) {
            _this.regBags.details = true
            _this.regBags.detailsData = res.data
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
    },
    sendMoreBox () {
      // 点击扩展时触发
      // 扩展页面的高度 SendMoreBoxHeight
      // 聊天页面高度根据上值联动   this.mainHeights.height
      this.moreBoxShow = !this.moreBoxShow
      this.emojis.show = false
      let roomSendMoreBoxLeng = this.extendChildLenth
      if (this.moreBoxShow) {
        if (roomSendMoreBoxLeng > 5) {
          this.SendMoreBoxHeight = 4.67
          this.chatRoom.roomNmae === this.init.message.chatRooms[0].roomId ? this.mainHeight = '6.75rem' : this.mainHeight = '2.4rem'
        } else {
          this.SendMoreBoxHeight = 2.57
          this.mainHeight = '4.6rem'
        }
      } else {
        this.chatRoom.roomNmae === this.chatRoom.init.message.chatRooms[0].roomId ? this.mainHeight = '2.09rem' : this.mainHeight = '-2.2rem'
      }
      this.$nextTick(() => {
        this.$refs.main.scrollTop = this.$refs.main.scrollHeight
      })
    },
    lookShareBetting (id, item) {
      // console.log(item.message.timesTotal)
      if (this.init.message.member.type !== -1) {
        this.isFootPrompt = true
        if (item.message.attachment) {
          this.lookBetData = item.message.attachment.order
          this.lookBetData.name = item.message.attachment.order.nickname
          this.lookBetData.senderType = item.message.attachment.order.type
        } else {
          this.lookBetData = item.message.order
          this.lookBetData.name = item.message.sender.nickname
          this.lookBetData.senderType = item.message.sender.type
          this.lookBetData['timesTotal'] = item.message.timesTotal
        }
        this.lookBetData.theme = id
        this.footPrompt = this.lookBetData
      } else {
        this.$toast({
          message: '游客不能跟投',
          position: 'middle',
          duration: 1500
        })
      }
    },
    userInfo (item) {
      let _this = this
      if (item.message.attachment) {
        item.message.attachment.eventFalse = item.event
        _this.chatRoom.forward = item.message.attachment
        _this.lookData.authority = item.message.attachment.sender.authority
        _this.lookData.openID = item.message.attachment.sender.openid
        _this.lookData.type = item.message.attachment.sender.type
        _this.actionsData.level = item.message.attachment.sender.level
      } else {
        item.message.eventFalse = item.event
        _this.chatRoom.forward = item.message
        _this.lookData.authority = item.message.sender.authority
        _this.lookData.openID = item.message.sender.openid
        _this.lookData.type = item.message.sender.type
        _this.actionsData.level = item.message.sender.level
      }
      _this.actionsItem = item
      _this.actions = [
        { name: '查看资料', method: this.actionLook, index: 3 }
      ]
      if (_this.chatRoom.purive(_this.init.message.member.authority, 2) && (item.event === 'shareOrder' || item.event === 'precisePlan' || item.event === 'todayScore' || item.event === 'transferMessage')) {
        if (_this.chatRoom.purive(_this.init.message.member.authority, 4)) {
          _this.actions = [
            { name: '分享到聊天室', method: this.shareRoom, index: 1 },
            { name: '分享到好友', method: this.sharePerson, index: 2 },
            { name: '查看资料', method: this.actionLook, index: 3 }
          ]
        } else {
          _this.actions = [
            { name: '分享到聊天室', method: this.shareRoom, index: 1 },
            { name: '查看资料', method: this.actionLook, index: 3 }
          ]
        }
      }
      if (_this.chatRoom.purive(_this.chatRoom.roomAuthority, 4)) {
        _this.actions = [
          { name: '查看资料', method: this.actionLook, index: 3 },
          { name: '删除本条消息', method: this.actionDelect, index: 4 }
        ]
        if (item.event === 'shareOrder' || item.event === 'precisePlan' || item.event === 'todayScore' || item.event === 'transferMessage') {
          if (_this.chatRoom.purive(_this.init.message.member.authority, 4)) {
            _this.actions = [
              { name: '分享到聊天室', method: this.shareRoom, index: 1 },
              { name: '分享到好友', method: this.sharePerson, index: 2 },
              { name: '查看资料', method: this.actionLook, index: 3 },
              { name: '删除本条消息', method: this.actionDelect, index: 4 }
            ]
          } else {
            _this.actions = [
              { name: '分享到聊天室', method: this.shareRoom, index: 1 },
              { name: '查看资料', method: this.actionLook, index: 3 },
              { name: '删除本条消息', method: this.actionDelect, index: 4 }
            ]
          }
        }
      }
      if (_this.chatRoom.purive(_this.chatRoom.roomAuthority, 4) && _this.chatRoom.purive(_this.init.message.member.authority, 2)) {
        _this.actions = [
          { name: '查看资料', method: this.actionLook, index: 3 },
          { name: '删除本条消息', method: this.actionDelect, index: 4 }
        ]
        if (item.event === 'shareOrder' || item.event === 'precisePlan' || item.event === 'todayScore' || item.event === 'transferMessage') {
          if (_this.chatRoom.purive(_this.init.message.member.authority, 4)) {
            _this.actions = [
              { name: '分享到聊天室', method: this.shareRoom, index: 1 },
              { name: '分享到好友', method: this.sharePerson, index: 2 },
              { name: '查看资料', method: this.actionLook, index: 3 },
              { name: '删除本条消息', method: this.actionDelect, index: 4 }
            ]
          } else {
            _this.actions = [
              { name: '分享到聊天室', method: this.shareRoom, index: 1 },
              { name: '查看资料', method: this.actionLook, index: 3 },
              { name: '删除本条消息', method: this.actionDelect, index: 4 }
            ]
          }
        }
      }
      _this.userInfoShow = true
    },
    actionDelect () {
      let _this = this
      this.$messagebox.confirm('确定删除本条消息?').then(() => {
        _this.chatRoom.ws.send(JSON.stringify({
          'event': 'deleteMessage',
          'data': {
            'roomId': _this.rooms.data.chatRoomId,
            'messageIds': JSON.stringify(_this.actionsItem.messageId)
          },
          'msgId': Math.random().toString(36).substr(2) + '-' + Math.random().toString(36).substr(2) // 32位随机数
        }))
      })
        .catch(() => {})
    },
    actionBanned () {
      let _this = this
      if (_this.roomsBanned === false) {
        _this.axios.get('/cpi/room/release_shutup/' + _this.chatRoom.flag + '?roomId=' + _this.rooms.data.chatRoomId + '&openid=ALL')
          .then((res) => {
            if (res.code === 0) {
              this.$indicator.close()
              this.$toast({
                message: '房间已解除禁言',
                position: 'middle',
                duration: 500
              })
              _this.rooms.data.enableChat = true
              _this.roomsBanned = true
            } else {
              this.$toast({
                message: res.msg,
                position: 'middle',
                duration: 500
              })
            }
          })
          .catch(() => {
          })
      } else {
        _this.axios.get('/cpi/room/shutup/' + _this.chatRoom.flag + '?roomId=' + _this.rooms.data.chatRoomId + '&openid=ALL')
          .then(() => {
            this.$indicator.close()
            this.$toast({
              message: '房间已被禁言',
              position: 'middle',
              duration: 500
            })
            _this.rooms.data.enableChat = false
            _this.roomsBanned = false
          })
          .catch(() => {
          })
      }
    },
    attention (item) {
      if (this.init.message.member.type !== -1) {
        let _this = this
        let openId = null
        _this.actionsItem = item
        if (item.message.attachment) {
          openId = item.message.attachment.sender.openid
          _this.lookData.type = item.message.attachment.sender.type
        } else {
          openId = item.message.sender.openid
          _this.lookData.type = item.message.sender.type
        }
        _this.axios.get('/cpi/relation/detail/' + _this.chatRoom.flag + '?openid=' + openId + '&roomId=' + _this.rooms.data.chatRoomId)
          .then((res) => {
            if (res.code === 0) {
              _this.actionsData.fansNumber = res.data.fansNumber
              _this.actionsData.followNumber = res.data.followNumber
              _this.actionsData.attention = res.data.attention
              _this.actionsData.level = res.data.member.level
              _this.actionsData.identity = res.data.member.identity
              _this.actionsData.nickname = res.data.member.nickname
              _this.actionsData.openid = res.data.member.openid
              _this.lookData.openID = res.data.member.openid
              _this.actionsData.headImg = res.data.member.headImg
              _this.actionsData.shutup = res.data.shutup
              _this.actionsData.stop = res.data.stop
              _this.actionsData.type = res.data.member.type
              _this.actionsData.authority = res.data.member.authority
              _this.actionsData.markName = res.data.member.markName
              _this.lookData.type = res.data.member.type
              _this.actionsLookData = true
            } else {
              this.$toast({
                message: res.msg,
                position: 'middle',
                duration: 1500
              })
            }
          })
          .catch(() => {})
      } else if (this.init.message.member.openid === this.actionsData.openid) {
        this.$toast({
          message: '自己不能关注自己',
          position: 'middle',
          duration: 1500
        })
      } else {
        this.$toast({
          message: '游客不能关注',
          position: 'middle',
          duration: 1500
        })
      }
    },
    actionLook () {
      let _this = this
      let openId = _this.lookData.openID
      // 查看详情资料
      _this.axios.get('/cpi/relation/detail/' + _this.chatRoom.flag + '?openid=' + openId + '&roomId=' + _this.rooms.data.chatRoomId)
        .then((res) => {
          if (res.code === 0) {
            _this.actionsData.fansNumber = res.data.fansNumber
            _this.actionsData.followNumber = res.data.followNumber
            _this.actionsData.attention = res.data.attention
            _this.actionsData.identity = res.data.member.identity
            _this.actionsData.nickname = res.data.member.nickname
            _this.actionsData.openid = res.data.member.openid
            _this.actionsData.headImg = res.data.member.headImg
            _this.actionsData.shutup = res.data.shutup
            _this.actionsData.stop = res.data.stop
            _this.actionsData.type = res.data.member.type
            _this.actionsData.authority = res.data.member.authority
            _this.actionsData.markName = res.data.member.markName
            _this.lookData.authority = res.data.member.authority
            _this.actionsLookData = true
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
    addUserName () {
      let _this = this
      let pattern = /^[A-Za-z0-9\u4e00-\u9fa5]+$/gi
      if (pattern.test(this.user.name)) {
        this.axios.get('/api/chat_room/update_nickname.do',
          {
            params: {
              nickname: _this.user.name,
              openid: _this.init.message.member.openid
            }
          }
        )
      } else {
        _this.user.error = '只能输入数字中文字母2-16个字符'
      }
    },
    bigFlieImgClose () {
      setTimeout(() => {
        this.bigFlieImg.show = false
      }, 200)
    },
    flieImgH (item) {
      this.bigFlieImg.show = true
      this.$indicator.open({ spinnerType: 'fading-circle' })
      this.bigFlieImg.url = item.message.attachment.image.bigUrl
      this.$nextTick(() => {
        this.$refs.bigFlieImg.onload = () => {
          this.$indicator.close()
        }
      })
    },
    sendYy () {
      this.sendYyShow = !this.sendYyShow
      this.sendTextShow = !this.sendYyShow
    },
    sendYyStart () {

    },
    sendYyEnd () {

    },
    loadTop () {
      let _this = this
      if (!_this.allLoaded) {
        setTimeout(() => {
          _this.$refs.loadmore.onTopLoaded()
          _this.axios.get('/cpi/room/records/' + _this.chatRoom.flag + '?roomId=' + _this.rooms.data.chatRoomId + '&offset=' + _this.joinData.message[0].messageId + '&count=' + _this.params.count)
            .then((res) => {
              if (res.code === 0) {
                let resData = res.data
                let resDataLeng = resData.length
                let lotteryArr = this.Utils.Storage.get('lotteryArr')
                if (lotteryArr) {
                  let lotteryArrLeng = lotteryArr.length
                  for (let i = 0; i < resDataLeng; i++) {
                    if (resData[i].event === 'precisePlan' || resData[i].event === 'shareOrder') {
                      for (let j = 0; j < lotteryArrLeng; j++) {
                        if (resData[i].message.order.lotteryId === lotteryArr[j].lotteryId) {
                          resData[i].message.order.url = lotteryArr[j].URL
                        }
                      }
                    }
                    if (resData[i].event === 'transferMessage' && resData[i].message.attachment.type !== 5) {
                      for (let j = 0; j < lotteryArrLeng; j++) {
                        if (resData[i].message.attachment.order.lotteryId === lotteryArr[j].lotteryId) {
                          resData[i].message.attachment.order.url = lotteryArr[j].URL
                        }
                      }
                    }
                  }
                }
                for (let i = resDataLeng - 1; i >= 0; i--) {
                  _this.joinData.message.unshift(resData[i])
                }
                // if (_this.params.count > resDataLeng) {
                if (resDataLeng === 0) {
                  _this.allLoaded = true
                }
              }
            })
            .catch(() => {})
        }, 1500)
      } else {
        _this.$refs.loadmore.onTopLoaded()
      }
    },
    clickButton () {
      if (this.$refs.expandCon.onlinePersonShow) {
        return
      }
      let _this = this
      if (!this.removeRoomHandler) {
        this.$messagebox('提示', '您已被管理员踢出该房间!')
        return
      }
      if (!_this.init || !_this.init.message || !_this.init.message.chatRooms) {
        this.$messagebox('提示', '没有进入房间。请刷新页面')
        return
      }

      // 对@的内容进行处理。
      // 1、@所有人
      if (this.chatRoom.eiteMore.flag) {
        _this.rooms.data.attachment.receiverList = _this.chatRoom.eiteMore.list
        _this.rooms.data.attachment.type = 12
        _this.chatRoom.eiteMore.flag = false
      } else {
        if (_this.rooms.data.attachment && _this.rooms.data.attachment.receiverList) {
          delete _this.rooms.data.attachment.receiverList
        }
        if (_this.rooms.data.attachment && _this.rooms.data.attachment.receiver) {
          _this.rooms.data.attachment.type = 0
        } else {
          _this.rooms.data.attachment.type = 1
        }
      }
      if (_this.userText.indexOf('@所有人') > -1 || _this.userText.indexOf('@all') > -1) {
        if (_this.init.message.member.type < 1) {
          this.$messagebox('提示', '@所有人功能，只限管理员!')
          return
        }
        _this.rooms.data.attachment.type = 0
        _this.userText.replace('@所有人', '@所有人 ')
        _this.userText.replace(/@所有人[\s]+/, '@所有人 ')
      }
      this.rooms.data.content = _this.userText
      if (_this.userText.replace(/^\s+|\s+$/gm, '').length === 0) {
        if (_this.rooms.data.attachment.receiver) {
          delete _this.rooms.data.attachment.receiver
        }
        this.$toast({
          message: '内容不能为空',
          position: 'middle',
          duration: 1000
        })
        return
      } else if (_this.userText.replace(/^\s+|\s+$/gm, '').length >= 150 && _this.init.message.member.type < 2) {
        this.$toast({
          message: '内容不能超过150字',
          position: 'middle',
          duration: 1000
        })
        return
      }
      _this.rooms.data.attachment.sender = _this.init.message.member
      // this.rooms.data.attachment.status.load = true
      if (this.$refs.expandCon.sessionClosedReceipt) {
        localStorage.removeItem('ws')
        this.$toast({
          message: '账号已在别处登录',
          position: 'bottom',
          duration: 1500
        })
      }
      if (!this.sendStatus) {
        this.sendStatus = true
        setTimeout(() => {
          this.sendStatus = false
        }, 1800)
      } else {
        this.$toast({
          message: '信息已发送，请稍等',
          position: 'middle',
          duration: 1000
        })
        return
      }
      this.chatRoom.ws.send(JSON.stringify(_this.rooms))
      _this.userText = ''
      if (_this.rooms.data.attachment.receiver) {
        delete _this.rooms.data.attachment.receiver
      }
      if (_this.scrollH.flag) {
        this.$refs.main.scrollTop = this.$refs.main.scrollHeight
      }
    },
    componentLen (amount) {
      this.extendChildLenth = amount
    },
    inputStyle () {
      // 点击输入框 隐藏扩展高度
      this.moreBoxShow = false
      // 影藏表情库
      this.emojis.show = false
      this.chatRoom.roomNmae === this.chatRoom.init.message.chatRooms[0].roomId ? this.mainHeight = '2.09rem' : this.mainHeight = '-2.2rem'
    }
  }
}
</script>

<style lang='scss' scoped>
@import 'Assets/css/base.color.scss';
.down-btn img{
  position: fixed;
  width: 1rem;
  overflow: hidden;
  right: .2rem;
  bottom: 1.5rem;
    //   color: #fff;
    // font-size: 16px;
    // text-align: center;
    // line-height: 1rem;
    // img{
    //   width: 100%;
    // }
}
    .room-time{font-size:.35rem;margin:.1rem 0 .2rem;padding:0 .55rem;height:.6rem;line-height:.65rem;border-radius:.1rem;background:#DFDCDC;color:#979797;}
    .joinRoomNotify{position:fixed;top:calc(1.125rem + 84px + .6rem);left:0;z-index:199;width:100%;height:.7rem;line-height:.7rem;background:rgba(0, 0, 0, .7);}
    .joinRoomNotify .room-times{max-width:98%;margin-bottom:0;color:#fff;font-size:.3rem;}
    .room-main {
        padding: .1rem .2rem 0;
        position: fixed;
        max-width: 780px;
        width: 100%;
        box-sizing: border-box;
        top: 3.9rem;
        height: calc(100% - 1.125rem - 2.7rem - 1.28rem);
        overflow-y: scroll;
        color: #fff;
        background:#fff;
    }
    .room-info{color:#666;word-break:break-word;width:100%;margin-bottom:.1rem;text-overflow:Ellipsis;overflow:hidden;white-space:nowrap;}
    .room-grade{margin-right:.1rem;display:inline-block;vertical-align:middle;}
    .room-name{margin-right:.05rem;color:#999999;text-align:right;}
    .room-share-icon{vertical-align:top;margin-left:.1rem;width:.4rem;height:.5rem;}
    .room-hb-cl{color:#FF6500;}
    .room-info-admin-title{padding:1px 5px;margin-right: .1rem;background: #D81E06;color: #fff;display: inline-block;vertical-align: middle;}
    .room-send{position:fixed;bottom:0;width:100%;z-index:400;line-height:1.125rem;text-align:center;border-top:1px solid #bfbfbf;}
    .room-send-text,
    .room-send-yy{width:61%;height:.85rem;border:1px solid #AAAAAA;border-radius:.1rem;box-sizing:border-box;}
    .room-send-text{margin-right:.2rem;}
    .room-send-yy{background:#bfbfbf;text-align:center;line-height:.85rem;font-size:.45rem;}
    .room-send-gn{width:.8rem;height:.8rem;margin:0 .03rem;}
    .room-send-gn-s{width:.6rem;height:.8rem;margin:0 auto;}
    .tl{text-align:left;}
    .room-send-more-boxs{padding:.4rem .3rem 0;height:2.2rem;text-align:left;overflow:auto;background:#fff;}
    .bigFlieImg-box{position:fixed;top:0;z-index:400;max-width:780px;margin:0 auto;width:100%;height:100%;background:rgba(0, 0, 0, .6);}
    .bigFlieImg-box:before{content:'';display:inline-block;vertical-align:middle;width:0;height:100%;}
    .send-hbbg-box .beeting-look-title{background:#F4F4F4;}
    .flieImg-box{max-height:4rem;}
    .flieImg{max-width:50%;margin:.15rem 0;display:block;border-radius:.2rem;}
    .footer-menu-mint /deep/ .mint-actionsheet-listitem,
    .footer-menu-mint /deep/ .mint-actionsheet-button{font-size:.4rem;height:1rem;line-height:1.1rem;}
    .footer-menu-mint /deep/ .mint-actionsheet-listitem{    border-bottom: solid 1px #eee;}
    .onlineServer{position:relative;right:.12rem;width:.95rem;height:.95rem;margin-top:.1rem;}
    .disb{display:inline-block;vertical-align:bottom;margin-bottom:.1rem;}
    .body{height: 100%;position: fixed;top:0;width: 100%;max-width:780px;background: #F5F4F9;z-index: 400;overflow-y:auto;}
    .lottery-head{position:fixed;top:0;z-index:201;height:1.125rem;width:100%;background:#D54545;font-size:.2rem;color:#fff;}
    .mint-button-icon{position:relative;z-index:2;width:12%;text-align:center;}
    .mintui-back{font-size:20px;line-height:1.125rem;}
    .play-center{position:absolute;left:0;top:0;line-height:1.125rem;width:100%;text-align:center;font-size:.35rem;}
    .room-regReceiveName{max-width:2.3rem;display:inline-block;vertical-align:bottom;}
    .room-time-regReceive .room-time{margin-bottom:0;}
    .room-main /deep/ .mint-loadmore-text{color:#333;}
    .bigFlieImg-box{z-index:1000;width:96%;padding:0 2%;}
    .bigFlieImg{max-width:100%;max-height:100%;border-radius:15px;}
    .room-send-btns{background:#fff;height: 1.17rem;}
    .footPrompt{width:96%;padding:0 2%;line-height:1.12rem;background:rgba(253, 233, 223, .7);font-size:.35rem;}
    .footPrompt-name{padding:0 .1rem;max-width:3rem;color:#FF6806;}
    .footPrompt-money{padding:0 .1rem;color:#D54545;}
    .footPrompt-look{position:absolute;padding-left:2px;right:.2rem;top:.11rem;line-height:.9rem;width:1.5rem;text-align:center;color:#fff;letter-spacing:2px;height:.9rem;background:#FF5B00;border-radius:.15rem;}
    .footPrompt-infos{max-width:calc(100% - 1.8rem);}
    .semdMsd{width: 1.7rem;height: .75rem;border-radius: .15rem;background: #5EADE3;color: #fff;font-size: .35rem;line-height: .75rem;}
    .room-info-admin-title-headImg{padding: 0 .25rem;margin-right: .1rem;background: #D54545;color: #fff;height: .45rem;display: inline-block;vertical-align: middle;line-height: .45rem;}
    .room-info-admin-title-headImg{position:absolute;    top: .5rem;right: 2.3rem;}
    .room-info-no{padding-top:1rem;}
    .joinRoomMsg{color:#FF6500;}
    .ft35{font-size:.35rem;}
    .play-right{position:absolute;right:.5rem;top:0;font-size:.35rem;line-height:1.125rem;}
  .joinRoomNotifyTop{top:calc(1.725rem);}
  .room_headImg{width:1rem;margin-right:.1rem;float:left;}
  .room_headImg_right{float:left;padding-top:.1rem;width:calc(100% - 2.4rem - .15rem);}
  .room_msg{position:relative;max-width:calc(100% - .3rem - .15rem);display:inline-block;padding: .15rem .02rem .09rem;margin:.1rem 0 0 .3rem;background:#FFEEEF;border-radius:.12rem;color:#333;white-space: normal;}
  .room_msg:before{content:'';position:absolute;left:-.3rem;top:0;width:.35rem;height:.25rem;background:url(../../../assets/images/chatroom/msgqp.png) no-repeat;background-size:100%;}
    .c7C7C7C{color:#7C7C7C;}
    .green{color:#29a953;}
    .red{color:#D81E06;}
    .redColor{color:#de2f2f;}
  .origin{color:#FF5700;}
</style>
