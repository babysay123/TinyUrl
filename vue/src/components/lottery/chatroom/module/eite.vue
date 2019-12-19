<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-16 14:07:14
 * @LastEditTime: 2019-10-20 15:57:24
 * @LastEditors: Please set LastEditors
 -->
<template>
  <section class="eite">
    <!-- chat_@symbol@3x.png -->
    <span class="icon" style="" v-if="eiteArr.length > 0">{{eiteArr.length}}</span>
    <a class="btn-eite" v-if="hasEite" @click.stop="togglePop"><img src="/mobile/images/chatroom/chat_@symbol@3x.png" alt=""></a>
    <mt-popup
      v-model="eitePopup"
      popup-transition="popup-fade"
    >
      <div class="card card-notice" id="eiteNotice">
        <div class="card-head">
          <h3>@你的信息</h3>
          <a class="close" @click.stop="togglePop"><i class="fa fa-close fa-fw"></i></a>
        </div>
        <div class="card-content">
          <ul class="eite-list" v-if="eiteArr.length>0">
            <li v-for="(item, inx) in eiteArr" :key="inx">
              <span class="fl" v-if="item.attachment">{{item.attachment?item.attachment.sender.nickname:''}}@你</span>
              <span v-if="item.attachment">{{item.content}}</span>
            </li>
          </ul>
        </div>
      </div>
    </mt-popup>
  </section>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Eite',
  props: ['hasEite', 'msgEite'],
  data () {
    return {
      eiteArr: [],
      eitePopup: false
    }
  },
  computed: {
    ...mapState({
      chatRoom (state) {
        return state.chatRoom
      } })
  },
  watch: {
    'eitePopup': function (val) {
      // console.log(val)
      // console.log(this.eiteArr)
      if (val === false && this.eiteArr.length > 0) {
        this.clearEite()
      }
    },
    'chatRoom.deleteMessage': {
      handler (data) {
        if (data.message.messageIds === 'ALL') {
          this.eiteArr = []
          this.$parent.hasEite = false
          this.clearEite()
          return
        }
        if (this.eiteArr.length > 0) {
          for (var i = 0; i < this.eiteArr.length; i++) {
            console.log(this.eiteArr[i].dielogueId, Number(data.message.messageIds))
            if (this.eiteArr[i].dielogueId === Number(data.message.messageIds)) {
              // console.log(this.eiteArr[i].dielogueId, data.message.messageIds)
              this.eiteArr.splice(i, 1)
            }
          }
        }
        if (this.eiteArr.length === 0) this.$parent.hasEite = false
        console.log(this.eiteArr, '')
        // this.eiteArr = this.eiteArr.map(({ dielogueId }) => {
        //   console.log(dielogueId, data.message.messageIds)
        //   return dielogueId !== data.message.messageIds
        // })
        // this.$store.dispatch('updateEites', { arr: this.eiteArr, type: 'delemsg' })
        // if (this.eiteArr[0] === true && this.eiteArr.length === 1) {
        //   this.eiteArr.length = 0
        //   this.$parent.hasEite = false
        // }
      }
    }
  },
  methods: {
    togglePop () {
      if (this.eitePopup) {
        this.eitePopup = false
      } else {
        this.eitePopup = true
      }
    },
    addEite (message, type) {
      console.log(message)
      // 获取现有的艾特，然后添加一条
      this.eiteArr = this.$store.getters.getEiteArr
      // console.log(this.eiteArr)
      // 好像没差
      // if (type === 'all') {
      //   // @all 没有接收人只有发送人
      // } else {
      //   // @某人，会有接收人和发送人
      // }
      if (message.chatRoomId && message.attachment && message.attachment.sender) {
        this.eiteArr.push(message)
        this.$store.dispatch('updateEites', { arr: this.eiteArr, type: 'add' })
      }
    },
    contentEite (msg) {
      return msg.replace(/@[\S]+ /, '')
    },
    clearEite () {
      this.eitePopup = false
      this.$parent.hasEite = false
      this.$store.dispatch('changeEiteStatus', 0)
      this.$store.dispatch('updateEites', { arr: this.eiteArr, type: 'clear' })
    }
  },
  beforeCreate () {
    this.eitePopup = false
    this.$parent.hasEite = false
    this.$store.dispatch('changeEiteStatus', 0)
    this.$store.dispatch('updateEites', { arr: this.eiteArr, type: 'clear' })
  },
  mounted () {
    // console.log('eite')
    // console.log(this.$store.state.chatRoom.eiteStatus)
    this.$parent.hasEite = this.$store.state.chatRoom.eiteStatus
  }
}
</script>

<style lang="scss" scoped>
@import 'Assets/css/base.color.scss';
.wrap {
  position: relative;
}
.card {
  overflow: auto;
}
.card-notice {
  // margin: -50px -30px;
  max-height: 50vh;
  width: 82vw;
  .card-content {
    padding: .1rem;
    line-height: 1.2;
    word-break: break-word;
    min-height: 200px;
    text-align: justify;
  }
}
.card-head {
  position: relative;
  h3 {
    line-height: 32px;
    height: 32px;
    // background: @baseCol;
    background: $baseCol;
    color: #fff;
    font-size: 14px;
    >span {
      font-size: 12px;
    }
  }
  .close {
    position: absolute;
    width: 12%;
    height: 100%;
    top: 0;
    right: 0;
    display: block;
    // font-size: 16px;
    line-height: 32px;
    color: #fff;
  }
}
.card-content {
  overflow: auto;
}
.eite-list {
  overflow: hidden;
  text-align: left;
  .fl {
    float: left;
    text-align: left;
  }
  .fr {
    float: right;
    text-align: right;
  }
  li {
    padding: 0 6px;
    line-height: 1.8;
    font-size: 12px;
    overflow: hidden;
    border-bottom: 1px solid #eee;
    &:last-child {
      border-bottom: none;
    }
    span {
      display: block;
      width: 50%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      &:first-child {
        width: 36%;
      }
      &:last-child {
        width: 64%;
      }
    }
  }
}
.eite {
  position: absolute;
  line-height: 1;
  right: 10px;
  bottom: 2.5rem;
  .icon {
    position:absolute;
    display: block;
    top: -5px;
    right: -5px;
    background: red;
    color: #fff;
    width: 20px;
    line-height: 20px;
    height: 20px;
    -moz-border-radius: 50px;
    -webkit-border-radius: 50px;
    border-radius: 50px;
    -moz-appearance: none;
    -webkit-appearance : none;
  }
  .btn-eite {
    display: block;
    width: 45px;
    font-size: 0;
    img {
      width: 100%;
    }
  }
}
.mint-popup{width:100%;height:100%;background:none;}
#eiteNotice{position: absolute;left:0;top:0;right:0;bottom:0;margin:auto;height:auto;max-height:calc(1.2rem + 200px);}
.card-notice .card-content{background:#fff;}
.eite-list li span{white-space: normal;}
.eite-list li{line-height: .6rem;}
</style>
