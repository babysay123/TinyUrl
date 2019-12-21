<style lang="scss">
@import 'Assets/css/base.color.scss';
.prompt-dialog {
  width: 68%;
  margin-left: 16%;
  top: 50%;
  margin-top: -33vh;
  background-color: rgba(255, 255, 255, 0.9);
  -moz-border-radius: 8px;
  -webkit-border-radius: 8px;
  border-radius: 8px;
  -moz-appearance: none;
  -webkit-appearance: none;
  position: relative;

  .prompt-content {
    position: relative;
    padding: 16px 20px;
    font-size: 0;
    text-align: center;
    // height: 60vh;
    height: auto;
    max-height: 60vh;
    overflow: auto;
    .content-image {
      height: 2.75rem;
      width: 2.75rem;
    }
    .content-msg {
      text-align: left;
      font-size: 14px;
      line-height: 1.5;
      word-wrap: break-word;
      height: auto;
      // max-height: 90%;
      color: #111;
      // overflow: auto;
    }
    .content-title {
      font-size: 16px;
      line-height: 1.5;
      color: #000;
    }
  }
  .prompt-footer {
    display: block;
    text-align: center;
    line-height: 32px;
    height: 32px;
    color: #40a0e9;
    font-size: 15px;
    border-top: 1px solid #ccc;
  }
}
.prompt-notice {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  opacity: 0;
  -webkit-transition: all .8s ease-in-out;
  -moz-transition: all .8s ease-in-out;
  transition: all .8s ease-in-out;
  // display: none;
  // z-index: zinx
  &.active {
    // display: block;
    opacity: 1;
  }
}
.card {
  overflow: auto;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  // opacity: 0;
  -webkit-transition: all .8s ease-in-out;
  -moz-transition: all .8s ease-in-out;
  transition: all .8s ease-in-out;
  // display: none;
  // z-index: zinx
  // &.active {
  //   // display: block;
  //   // opacity: 1;
  // }
  .card-notice {
      // margin: -50px -30px;
      width: 72%;
      margin-left: 14%;
      max-height: 50vh;
      top: 50%;

      .close {
        position: absolute;
        // width: 12%;
        // height: 100%;
        top: 0;
        right: 0;
        display: block;
        font-weight: 100;
        font-size: 20px;
        width: 28px;
        height: 28px;
        line-height: 26px;
        // font-size: 16px;
        // line-height: 1rem;
        color: #fff;
      }
      .card-content {
          padding: 10px;
          line-height: 1.2;
          word-break: break-word;
          text-align: justify;
          img {
            width: 100%;
          }
          iframe {
              height: 52vh;
              border: none;
              width: 100%;
              margin-bottom: -3px;
          }
      }
  }
  .card-head {
      position: relative;
      h3 {
          line-height: 1rem;
          height: 1rem;
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
          line-height: 1rem;
          color: #fff;
      }
  }
  .card-content {
      overflow: auto;
  }
}
</style>

<template>
  <!-- 开奖列表 -->
  <section>
    <section ref="prompt" :class="{'prompt-notice': true, 'active': isShow}" data-id="" data-type=""
      :isLock="noticesData.isLoca"
      :style="{'z-index': zinx}"
      @click.stop="noticesData.isLoca===0||noticesData.isLoca==='0'?isShow=false:''"
      v-if="isShow"
    >
      <div ref="dialog" class="prompt-dialog">
        <div class="prompt-content" v-if="types.maintain === noticesType">
          <img class="content-image" src="/mobile/images/maintain.png" alt="">
          <div class="content-msg" v-html="contentTrans(noticesData.content)"></div>
        </div>

        <div class="prompt-content" v-if="types.normal === noticesType">
          <h3 class="content-title">通知</h3>
          <div class="content-msg" v-html="contentTrans(noticesData.content)"></div>
        </div>

        <div class="prompt-content" v-if="types.warn === noticesType">
          <h3 class="content-title">个人通知</h3>
          <div class="content-msg" v-html="contentTrans(noticesData.content)"></div>
        </div>
        <!--  -->
        <a v-if="(types.warn === noticesType || types.normal === noticesType) || (types.maintain === noticesType && noticesData.isLoca !== 1)" class="prompt-footer" href="javascript:void(0)" @click.stop="isShow = false">确定</a>
      </div>
    </section>
    <section class="card card-notice" ref="card" v-if="cardShow">
      <!-- <div class="card-head">
        <h3>{{cardData.title ? cardData.title : ''}}</h3>
        <a class="close" @click.stop="cardShow = false"><i class="fa fa-close fa-fw"></i></a>
      </div> -->
      <div class="card-content">
        <a class="close" @click.stop="cardShow = false">&times;</a>
        {{cardData.content}}
      </div>
    </section>
  </section>
</template>

<script>
export default {
  name: 'bulletin', // 心跳包
  // props: [],
  data () {
    return {
      arrSign: 'noticeArr',
      zinx: -1,
      isShow: false,
      cardShow: false, // 领奖公告
      types: {
        maintain: 0,
        normal: 1,
        warn: 2
      },
      noticesData: {},
      noticesType: 0,
      noticesArr: [],
      cardData: {},
      heart: null
    }
  },
  warch: {
  },
  updated () {
    this.$nextTick(() => {
      let _dialog = this.$refs.dialog // .offsetHeight
      if (_dialog) {
        // console.log(_dialog.offsetHeight / 2 * -1)
        _dialog.style.marginTop = (_dialog.offsetHeight / 2 * -1) + 'px'
      }
      // card
      let _card = this.$refs.card
      if (_card) {
        _card.style.marginTop = (_card.offsetHeight / 2 * -1) + 'px'
      }
    })
  },
  methods: {
    // 心跳
    heartRun () {
      this.axios.postFast('/im/customer_service/customer_heartbeat.do', {}).then((res) => {
        if (res.code === 0) {
          if (res.other && res.other !== 0) {
            // 旧版客服，暂时弃用
          }
          // 公告
          let _affiche = res.affiche
          if (_affiche) {
            // 一般公告
            if (_affiche.common && _affiche.common.code === 105) {
              this.noticesType = 1 // 类型
              this.zinx = 1901 // 显示层级
              this.notices(_affiche.common)
            }
            // 其他公告？
            if (_affiche.warn && _affiche.warn.code === 107) {
              this.noticesType = 2
              this.zinx = 1909
              this.notices(_affiche.warn)
            }
            // 领奖开奖 且 未读
            if (_affiche.notify && _affiche.notify.isRead === 0) {
              this.afficheNotify(_affiche.notify, 'notify')
            }
            // 维护公告
            // (_affiche.maintenance.code === 103 || _affiche.maintenance.code === 102)
            if (_affiche.maintenance && _affiche.maintenance.code === 103) {
              this.noticesType = 0
              this.zinx = 2009
              this.notices(_affiche.maintenance)
            }
            // 如果code等于102，验证是否已经打开公告，如果打开则关闭
            if (_affiche.maintenance && _affiche.maintenance.code === 102 && this.noticesArr.length > 0) {
              let _arr = this.noticesArr
              for (let i = 0; i < _arr.length; i++) {
                let t = _arr[i]
                if (t.code === 103) {
                  // 已存在维护公告
                  _arr.splice(i, 1)
                  this.isShow = false
                  this.Utils.Storage.save(this.arrSign, _arr)
                  break
                } else {
                  continue
                }
              }
            }
          }
        }
      })
    },
    notices (data) {
      // console.log(data)
      // 获取已显示内容
      // 直接显示
      let _noticeArr = this.noticesArr
      if (_noticeArr && _noticeArr.length > 0) {
        let _has // 标记
        for (let item of _noticeArr) {
          if (item.code === data.code && item.content === data.content) {
            // 是否已存在
            this.noticesData = item
            _has = true
            if (item.code === 103 && (item.isLoca === 1 || item.isLoca === '1')) {
              this.isShow = true
            }
            break
          }
        }
        if (!_has) {
          this.noticesData = data
          this.isShow = true
          _noticeArr.push(data)
          // console.log(_noticeArr)
          this.Utils.Storage.save(this.arrSign, _noticeArr)
        }
      } else {
        this.noticesData = data
        this.isShow = true
        if (!_noticeArr) {
          _noticeArr = []
        }
        _noticeArr.push(data)
        // console.log(_noticeArr)
        this.Utils.Storage.save(this.arrSign, _noticeArr)
      }
      // if (this.noticesType === this.types.maintain && data.code === 102) {
      //   return
      // }
      // if (this.noticesType === this.types.normal && data.code === 105) {
      //   return
      // }
      // if (this.noticesType === this.types.warn && data.code === 107) {
      //   return
      // }
      // let _build = {
      //   type: this.noticesType,
      //   msg: data.content,
      //   affiched: data.afficheId,
      //   isLock: data.isLoca + ''
      // }
      // console.log(_build)
    },
    showNotify (data) {
      // 链接检查且替换
      let _linkRule = /href=['|"]([^'" \f\n\r\t\v]+)['|"]/
      let _replace = data.content.match(_linkRule) || ''
      let _real = ''
      if (_replace && _replace[1]) {
        _real = _replace[1]
        if (_real.indexOf('url=') > -1) {
          _real = _real.split('url=')[1].replace(/.*(http|https):\/\/\S+?\//g, '/')
        }

        data.content = data.content.replace(_replace[1], _real)
      }
      this.cardShow = true
      this.cardData = data
    },
    contentTrans (content) {
      return this.Utils.switchLink(content)
    },
    afficheNotify (data, type) {
      // 领奖
      let hasLive = false
      if (this.noticesArr && this.noticesArr.length > 0) {
        for (let _n of this.noticesArr) {
          if (_n.notify && _n.notify.notifyId === data.notifyId) {
            hasLive = true
            break
          }
        }
        if (!hasLive) {
          this.noticesArr.push({ 'notify': data })
          this.Utils.Storage.save(this.arrSign, this.noticesArr)
          this.showNotify(data)
        }
      } else {
        this.noticesArr = []
        this.noticesArr.push({ 'notify': data })
        this.Utils.Storage.save(this.arrSign, this.noticesArr)
        this.showNotify(data)
      }
    },
    getUserAgentType () {
      var ua = navigator.userAgent
      let isAndroid = false
      let isIos = false
      if (ua.indexOf('Android') > -1 || ua.indexOf('Linux') > -1) { // 安卓手机
        isAndroid = true
      } else if (ua.indexOf('iPhone') > -1) { // 苹果手机
        isIos = true
      }

      if (isAndroid) {
        return 'android'
      } else if (isIos) {
        return 'ios'
      } else {
        var Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod']
        var flag = true
        for (var v = 0; v < Agents.length; v++) {
          if (ua.indexOf(Agents[v]) > 0) {
            flag = false
            break
          }
        }
        if (!flag) {
          return false
        } else {
          return 'pc'
        }
      }
    },
    getQueryString (name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
      var r = window.location.search.substr(1).match(reg)
      if (r != null) return unescape(r[2]); return null
    }
  },
  created () {
    this.noticesArr = this.Utils.Storage.get(this.arrSign) || []
    if (this.getUserAgentType() === 'pc' || this.getUserAgentType() === false || this.getQueryString('app') || this.getQueryString('X-Requested-With')) {
    } else {
      // 检查是否有客服信息。暂时弃用
      //
      // 定时，心跳包
      this.heart = setInterval(() => {
        this.heartRun()
      }, 12 * 1000)
      // 第一次执行
      this.$nextTick(() => {
        this.heartRun()
      })
      // setTimeout(() => {
      //   this.isShow = true
      //   setTimeout(() => {
      //     this.isShow = false
      //   }, 5000)
      // }, 5000)
    }
  }
}
</script>
