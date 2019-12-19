<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-29 15:49:25
 * @LastEditTime: 2019-08-13 19:16:30
 * @LastEditors: Please set LastEditors
 -->
<template>
    <section>
        <ul class="par">
          <li class="ge"
            v-if="login"
            v-for="(tmp,index) in friendList"
            :key='index'
          >
            <div  @click="getIfor(tmp)" class="ge1">
              <img
                :src="tmp.headImg.indexOf('default') > -1 || !tmp.headImg ? '/mobile/images/mine/geren_tou.png' : tmp.headImg"
                alt=""
                class="portrait"
              >
              <img
                v-if="tmp.type !== -1"
                :src='chatRoom.headImg[tmp.level]'
                class="title"
              >
              <span class="nickname">{{tmp.nickname}}</span>
              <span class="mark">{{tmp.markName ? `(${tmp.markName})` : ''}}</span>
            </div>
            <button class="markName" @click="openMark(tmp)" v-if=" init.message.member.type > 0">{{tmp.markName?'修改备注':'备注'}}</button>
          </li>
          <!-- 暂无 好友 -->
          <li v-if="login && friendList.length === 0" class="rankingInfo-list rankingInfo-list-no">
            <img src="../../../assets/images/chatroom/noData.png" class="noDatas">
            还没有好友哦
          </li>
          <li v-if="!login" class="rankingInfo-list rankingInfo-list-no">
            <a href="javascript:void(0);" @click="toLogin">
              <img src="../../../assets/images/chatroom/noData.png" class="noDatas">
                还没有登录哦，点击登录
            </a>
          </li>
        </ul>
        <LookInformation
          v-if="lookInformation"
          :lookData="lookData"
          :limitShow="true"
          @openLookClose="openLookClose"
          @delectFriend='delectFriend'
        ></LookInformation>
        <!-- <markName v-if="markName"></markName> -->
        <mt-popup
          v-model="popupVisible"
          pop-transition = 'popup-fade'
          position="right">
            <markName :tmp='tmp' @popvi='popvi'></markName>
        </mt-popup>
    </section>
</template>
<script>
import LookInformation from 'Components/lottery/chatroom/lookInformation'
import markName from 'Components/lottery/chatroom/markName'
import { mapState, mapGetters } from 'vuex'
export default {
  components: {
    LookInformation,
    markName
  },
  data () {
    return {
      friendList: [],
      lookData: {
        // account: null,
        // authority: 510,
        // clientType: null,
        // headImg: 'http://5550987.com/assets/img/avatar/36.png',
        // id: null,
        // identity: '计划专员',
        // level: 7,
        // markName: null,
        // nickname: '123',
        // openid: 'caa148fa8a5443c7ac6a222f8bb196e8',
        // pushSwitch: null,
        // roomid: '08bd1006-9c77-448a-a709-0108979999a',
        // type: 2,
        // userTarget: null
      },
      lookInformation: false,
      popupVisible: false,
      login: false,
      tmp: {}
    }
  },
  computed: {
    ...mapGetters([ 'getUserInfo' ]),
    ...mapState({
      chatRoom (state) {
        return state.chatRoom
      },
      init (state) {
        return state.chatRoom.init
      }
    })
  },
  methods: {
    openLookClose () {
      this.lookInformation = false
    },
    openMark (val) {
      this.popupVisible = true
      this.tmp = val
      // console.log(val)
    },
    getIfor (val) {
      console.log(val, '')
      this.lookInformation = true
      this.lookData = val
      this.lookData.typeClass = 'friendList'
    //   修改lookdata的值 传给小弹窗
    },
    popvi (isSubmit) {
      this.popupVisible = false
      if (isSubmit) {
        this.getList()
      }
    },
    getList () {
      // 获取好友列表数据
      this.axios.get('/cpi/relation/friend_list/' + this.chatRoom.flag + '?offset=0&count=20').then((res) => {
        // console.log(res)
        if (res.code === 0) this.friendList = res.data
      })
    },
    toLogin () {
      window.location.href = '/mobile/studio/#/login'
    },
    delectFriend () {
      // console.log(1234)
      this.getList()
    }
  },
  created () {
    // 判断用户时候登入
    this.login = !!(this.getUserInfo && this.getUserInfo.account)
    if (this.login) {
      this.getList()
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .par{
  margin-top:calc(1.125rem + 85px + .6rem);
  .ge{
    line-height: 1.6;
    border-bottom: 1px solid #ccc;
    position: relative;
    display: flex;
    align-items: center;
    .portrait{
      position: relative;
      margin: 0.2rem;
      margin-right: 0.1rem;
      width: 1.3rem;
      height: 1.3rem;
    }
    .title{
        margin: 0 .1rem;
        width: 2.1rem;
        display: inline-block;
        vertical-align: middle;
    }
    .markName{
      position: absolute;
      right: 2%;
      background: #DE2F2F;
      color: #fff;
      padding: 5px;
      border-radius: 4px;
    }
    .ge1{
      display: flex;
      align-items: center;
      .mark{
        color: blue
      }
    }
  }
}
.mint-popup{
  width: 100%;
  height: 100%;
  background: #F5F4F9
}
/* 未登录 */
.rankingInfo-list{font-size:0;line-height:1.6rem;border-bottom:1px solid #CCCCCC;color:#999999;}
.rankingInfo-list-names{line-height:.6rem;font-size:.35rem;max-width:63%;}
.rankingInfo-list-name{font-size:.35rem;color:#FF6500;}
.rankingInfo-list-content{max-width:5.8rem;color:#666;}
.rankingInfo-time{position:absolute;right:.3rem;top:0;font-size:.35rem;color:#666;}
.rankingInfo-list-no{font-size: .35rem;text-align: center;border-bottom: none;color:#333;}
.rankingInfo-list .rankingInfo-ren {
  text-align:center;
  position: absolute;
  left: 1.4rem;
  top: 0.2rem;
  z-index: 2;
  width: .5rem;
  height: .5rem;
  background: #FF0000;
  border-radius: 50%;
  font-size: .25rem;
  line-height:.5rem;
  color:#fff;
}
</style>
