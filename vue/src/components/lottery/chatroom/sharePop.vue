<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-16 14:07:14
 * @LastEditTime: 2019-10-09 19:12:37
 * @LastEditors: Please set LastEditors
 -->
<template>
    <!--分享到某某地方   分享模块-->
    <section class="bg ft0">
        <section class="pop-box dInV fw" v-if="sharePerson || shareRoom">
            <div class="pop-title pr">
                请选择{{title}} ( {{list.length}}个)
                <img src="../../../assets/images/chatroom/zhubo_detail_close.png" @click="close" class="pop-close">
            </div>
            <div class="pop-lists-box">
                <ul class="fw pop-lists" v-if="shareRoom">
                    <li class="pop-list"  v-for="(item, index) in list" :key="index" @click="forwardRoom(item, 1)">
                        {{item.name}}<span v-if="item.sm" class="sm">(私密)</span>
                    </li>
                </ul>
            </div>
        </section>
    </section>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'sharePop',
  props: ['sharePopData'],
  data () {
    return {
      params: {
        offset: 0,
        count: 20
      },
      allLoaded: false,
      list: [],
      title: '',
      sharePerson: false,
      shareRoom: false
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
  methods: {
    forwardRoom (item, type) {
      let _this = this
      console.log(_this.init.message.member)
      if (item.enableChat && _this.chatRoom.purive(_this.init.message.member.authority, 1)) {
        _this.chatRoom.privateChatz.yes = false
        let data = {
          event: 'transferMessage',
          data: {
            transferType: type,
            targetId: item.roomId,
            content: '[分享注单]',
            attachment: _this.chatRoom.forward
          }
        }
        _this.chatRoom.ws.send(JSON.stringify(data))
        this.$emit('close')
      } else {
        let msg = ''
        if (!item.enableChat) {
          msg = '房间被禁言, 暂不能分享'
        } else if (!_this.chatRoom.purive(_this.init.message.member.authority, 1)) {
          msg = '你没有发言权限或被禁言, 暂不能分享'
        }
        this.$toast({
          message: msg,
          position: 'middle',
          duration: 1000
        })
      }
    },
    friendList () {
      let _this = this
      _this.title = '好友'
      _this.sharePerson = true
      _this.axios.get('/cpi/relation/friend_list/' + _this.chatRoom.flag + '?offset=' + _this.params.offset + '&count=' + _this.params.count)
        .then((res) => {
          if (res.code === 0) {
            _this.list = res.data
          }
        })
        .catch(() => {})
    },
    close () {
      this.$emit('close')
    }
  },
  created () {
    let _this = this
    if (_this.sharePopData.type === 'sharePerson') {
      _this.friendList()
    } else if (_this.sharePopData.type === 'shareRoom') {
      _this.title = '聊天室'
      _this.shareRoom = true
      _this.axios.get('/cpi/room/list/' + _this.chatRoom.flag)
        .then((res) => {
          if (res.code === 0) {
            let data = res.data
            let dataLeng = data.length
            for (let i = 0; i < dataLeng; i++) {
              if (data[i].type !== 2) {
                if (data[i].type === 4) {
                  data[i].sm = true
                }
                _this.list.push(data[i])
              }
            }
          }
        })
        .catch(() => {})
    }
  }
}
</script>

<style scoped>
    .bg{position:fixed;top:0;text-align:center;z-index:400;width:100%;height:100%;background:rgba(0, 0, 0, .5);}
    .bg:before{content:'';height:100%;width:0;display:inline-block;vertical-align:middle;}
    .pop-box{margin:0 auto;width:80%;color:#fff;font-size:.4rem;background:#fff;border-radius: 0.2rem;}
    .pop-box /deep/ .mint-loadmore-text{color:#333;}
    .pop-title{height:1rem;background:#40A0E9;line-height:1rem;}
    .pop-lists-box{overflow: auto;max-height:8rem;}
    .pop-list{height:1rem;line-height:1rem;color:#333;border-bottom:1px solid #eee;box-sizing: border-box;}
    .pop-close{position:absolute;right:.3rem;top:.3rem;width:.4rem;height:.4rem;}
    .sm{color:#FF6500;}
</style>
