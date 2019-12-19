<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-16 14:07:14
 * @LastEditTime: 2019-10-03 13:54:29
 * @LastEditors: Please set LastEditors
 -->
<template>
    <!--切换身份模块-->
    <section class="body">
        <Head>选择身份<span style="position: absolute;right: .4rem;" @click="confirm()">确定</span></Head>
        <section class="identity fw">
            <section class="hbDetails-banner fw"
                     v-for="(item, index) in identityData"
                     :key="index"
                     @click="use(index, item)"
                     :style="item.bg ? 'background-image:url(' + item.bg + ')' : ''"
            >
                <img :src="!item.headImg || item.headImg.indexOf('/default') > -1 ? '/mobile/images/mine/geren_tou.png' : item.headImg" class="hbDetails-avatar">
                <p class="hbDetails-name">{{item.nickname}}</p>
                <p class="hbDetails-money">等级: V{{item.level}}</p>
                <div class="identity-uses">
                    <em class="identity-use dInV">使用</em>
                    <img :src="useSelected[0]" class="identity-selected-no dInV" v-if="item.isSealed === false">
                    <img :src="useSelected[1]" class="identity-selected-no identity-selected2 dInV" v-else>
                </div>
                <p class="hbDetails-end">{{item.identity}}</p>
            </section>
        </section>
    </section>
</template>

<script>
import Head from 'Components/global/head'
import { mapState } from 'vuex'
export default {
  inject: ['reload'],
  name: 'betting-identity',
  data () {
    return {
      lottery: {
        id: ''
      },
      identityData: [
        { avatar: '', name: '风水大师', level: 2, fan: 20, post: '客服' }
      ],
      useSelected: [
        require('../../../assets/images/chatroom/check_unselected.png'),
        require('../../../assets/images/chatroom/check_selected.png')
      ],
      bg: [
        require('../../../assets/images/chatroom/blue_bg.png'),
        require('../../../assets/images/chatroom/green_bg.png'),
        require('../../../assets/images/chatroom/orange_bg.png'),
        require('../../../assets/images/chatroom/red_blue.png'),
        require('../../../assets/images/chatroom/yellow_bg.png')
      ],
      isSealed: false,
      roomName: '',
      roomId: 0,
      confirmData: []
    }
  },
  beforeRouteEnter (to, froms, next) {
    if (froms.query.lotteryId) {
      localStorage.setItem('lotteryIds', froms.query.lotteryId)
    }
    next()
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
  created () {
    let _this = this
    _this.roomId = this.$route.params.roomId
    _this.roomName = this.$route.params.roomName
    let openId = this.$route.params.openId
    if (_this.chatRoom.ws) {
      _this.chatRoom.ws.send("{'event': 'leaveRoom', 'data':'" + this.chatRoom.roomNmae + "'}")
    }
    _this.axios.get('/cpi/room/identity/' + _this.chatRoom.flag + '?roomId=' + _this.roomId)
      .then((res) => {
        if (res.code === 0) {
          for (let i = 0; i < res.data.length; i++) {
            // res.data[i].isSealed = res.data[i].openid === openId
            switch (res.data[i].type) {
              case 0:
                res.data[i].bg = _this.bg[2]
                break
              case 1:
                res.data[i].bg = _this.bg[0]
                break
              case 2:
                res.data[i].bg = _this.bg[1]
                break
              case 3:
                res.data[i].bg = _this.bg[4]
                break
              case 4:
                res.data[i].bg = _this.bg[3]
                break
              case 5:
                res.data[i].bg = _this.bg[3]
                break
            }
          }
          _this.identityData = res.data
          let dataLength = this.identityData.length
          for (let i = 0; i < dataLength; i++) {
            _this.$set(this.identityData[i], 'id', i)
            _this.$set(this.identityData[i], 'isSealed', false)
            if (this.identityData[i].openid === openId) {
              _this.confirmData = this.identityData[i]
              _this.$set(this.identityData[i], 'isSealed', true)
            }
          }
        } else {
          // this.$router.go(-1)
        }
      })
      .catch(() => {
        // this.$router.go(-1)
      })
  },
  methods: {
    HeadBack () {
      this.$router.go(-1)
      this.chatRoom.ws.send("{'event': 'leaveRoom', 'data':'" + this.roomId + "'}")
    },
    confirm () {
      let _this = this
      let item = _this.confirmData
      if (item.openid === this.$route.params.openId) {
        this.$messagebox('温馨提示', '已经是当前身份, 请选择另外一个身份进行切换')
        return
      }
      this.$indicator.open({
        spinnerType: 'fading-circle'
      })
      _this.axios.get('/chat_room/getnewaccess.do', { params: {
        accessToken: _this.chatRoom.flag,
        openid: item.openid
      } })
        .then((res) => {
          if (res.code === 0) {
            localStorage.setItem('ws', res.data)
            this.$router.push('chatroom')
            window.location.reload()
          }
        })
        .catch(() => {})
    },
    use (index, item) {
      let useLeng = this.identityData.length
      for (let i = 0; i < useLeng; i++) {
        this.identityData[i].isSealed = false
      }
      this.confirmData = item
      item.isSealed = !item.isSealed
    }
  },
  components: {
    Head
  }
}
</script>

<style scoped>
    /*1*/
    .identity{margin-top:1.125rem;}
    .hbDetails-banner{position:relative;margin-top:.5rem;height:3.2rem;background:#EF6B43;color:#EFEEEE;background-size:cover;}
    .hbDetails-avatar{position:absolute;left:.4rem;top:0;bottom:0;margin:auto 0;width:2rem;height:2rem;background:#fff;border-radius:50%;}
    .hbDetails-name{margin:.6rem 0 0 2.8rem;font-size:.45rem;}
    .hbDetails-money{margin:.3rem 0 0 2.8rem;font-size:.35rem;}
    .hbDetails-end{position:absolute;right:.4rem;top:1.3rem;height:1.6rem;font-size:.5rem;}
    .identity-use{font-style:initial;width:2rem;height:.65rem;margin:.4rem .2rem 0 2.8rem;font-size:.4rem;line-height:.65rem;border:1px solid #efeeee;text-align:center;box-sizing:border-box;}
    .identity-selected-no{width:.85rem;height:.64rem;margin-top:.4rem;}
    .identity-selected2{width:.85rem;height:.64rem;margin-top:.37rem;}
    .body{position: absolute;top:0;width: 100%;max-width:780px;background: #F5F4F9;z-index: 299;}
    .lottery-head{position:fixed;top:0;z-index:201;height:1.125rem;width:100%;background:#D81E06;font-size:.2rem;color:#fff;}
    .mint-button-icon{position:relative;z-index:2;width:12%;text-align:center;}
    .mintui-back{font-size:20px;line-height:1.125rem;}
    .play-center{position:absolute;left:0;top:0;line-height:1.125rem;width:100%;text-align:center;font-size:.35rem;}
    .notice{position:fixed;top:1.125rem;width:100%;}
</style>
