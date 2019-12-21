<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-16 14:07:14
 * @LastEditTime: 2019-09-16 14:07:14
 * @LastEditors: your name
 -->
<template>
  <div class="dialog" v-if="show">
    <!-- mask -->
    <div class="dialog-mask" @click="renderSwitch !== 'maintenance' && renderSwitch !== 'notify' && renderSwitch !== 'generalize' && close()" />
    <!-- level -->
    <div class="dialog-page" v-show="dialogPop">
      <section id="header" class="head bg-col">
        <a class="back head-back" @click="dialogPop = false">
          <i class="fa fa-angle-left fa-2x"></i>
        </a>
        <h3>通知</h3>
      </section>
      <!--  -->
      <section class="dialog-page-content">
        <h4 v-html="pageData.title || ''"></h4>
        <div class="content" v-html="pageData.content || ''"></div>
      </section>
    </div>
    <!-- content -->
    <template v-if="renderSwitch === 'generalize' || renderSwitch === 'notify'">
      <div :class="renderSwitch === 'notify' || renderSwitch === 'generalize' ? 'dialog-content no-border' : 'dialog-content'">
        <template v-if="renderSwitch === 'generalize'">
          <div class="dialog-generalize-close" @click="close">
            <img src="/mobile/images/closeWhite.png">
          </div>

          <a
            class="dialog-generalize"
            :href="notice.generalize && notice.generalize.linkUrl.indexOf('customLinkUrl') > -1 ?
              notice.generalize.linkUrl.split('url=')[1] :
              linkMap.get(notice.generalize.linkUrl)
          ">
            <img :src="notice.generalize.imageUrl">
          </a>
        </template>
        <!-- 领奖链接，动态获取 -->
        <template v-if="renderSwitch === 'notify'">
          <a class="dialog-notify" :href="notice.notify && notice.notify.linkUrl && notice.notify.linkUrl.split('url=')[1].replace(/.*(http|https):\/\/\S+?\//g, '/') || '#'">
            <img :src="notice.notify.imageUrl">
            <!--<p class="one-line">{{ notice.notify.award }}￥</p>-->
          </a>
        </template>
      </div>
    </template>

    <template v-if="renderSwitch === 'common' || renderSwitch === 'warn'">
      <div class="dialog-content dialog-common">
        <div class="common-title">
          <span>通知</span>
        </div>
        <div class="hd"></div>
        <div class="dialong-right">
          <img @click="close" src="../../assets/images/clear.png">
        </div>
        <!-- <div class="common-content" v-html="notice[renderSwitch].content" /> -->
        <div class="common-content">
          <ul v-if="notice[renderSwitch].common">
            <li v-for="(each, inx) in notice[renderSwitch].common" :key="inx + '_common'" @click="contentDetail(each)">
              {{  each.title || '无标题' }}
              <i class="fa fa-angle-right fa-lg"></i>
            </li>
          </ul>
          <div v-if="notice[renderSwitch].content" v-html="notice[renderSwitch].content"></div>
        </div>
        <!-- <div class="btn-qr">
          <div @click="close">
            <span>确认</span>
          </div>
        </div> -->
      </div>
    </template>

    <template v-if="renderSwitch === 'maintenance'">
      <div class=" dialog-maintenance">
        <p v-html="notice.maintenance.content" />
      </div>
    </template>
  </div>
</template>

<script>
import { dialogApi } from 'Plugins/api'
import { mapGetters, mapMutations } from 'vuex'
export default {
  data () {
    return {
      linkMap: new Map([
        ['wwc://platformapi/wwc/orders', '/mobile/mine/orderList.html'],
        ['wwc://platformapi/wwc/accountDetail', '/mobile/mine/accountList.html'],
        ['wwc://platformapi/wwc/rechargeRecord', '/mobile/studio/#/rechargeRecord'],
        ['wwc://platformapi/wwc/withdrawRecord', '/mobile/mine/rechargeList.html?type=1'],
        ['wwc://platformapi/wwc/messages', '/mobile/mine/noticeCenter.html'],
        ['wwwc://platformapi/wwc/messages', '/mobile/mine/noticeCenter.html'],
        ['wwc://platformapi/wwc/securityCenter', '/mobile/mine/editPwd.html'],
        ['wwc://platformapi/wwc/onlineService', '/mobile/mine/serviceOnline.html'],
        ['wwc://platformapi/wwc/playRules', '/mobile/mall/innerHtml.html?url=/mobile/other/playing.html'],
        ['wwc://platformapi/wwc/aboutUs', '/mobile/mine/appAbout.html'],
        ['wwc://platformapi/wwc/profitLoss', '/mobile/mine/profitLoss.html'],
        ['wwc://platformapi/wwc/friendList', '/mobile/mine/friendList.html?friend'],
        ['wwc://platformapi/wwc/followList', '/mobile/mine/friendList.html?attention'],
        ['wwc://platformapi/wwc/football', '/mobile/lottery/lotteryFootBall.html?lotteryId=100001'],
        ['wwc://platformapi/wwc/betChatRoom', '/mobile/studio/#/chatroom?lotteryId=1'],
        ['wwc://platformapi/wwc/betChatRoom?position=1', '/mobile/studio/#/chatroom?lotteryId=1'],
        ['wwc://platformapi/wwc/betting', '/mobile/studio/#/lottery?lotteryId=1'],
        ['wwc://platformapi/wwc/chatRoom', '/mobile/studio/#/chatroom?lotteryId=1'],
        ['wwc://platformapi/wwc/redPacket?rid=', '/mobile/mine/mine.html'],
        ['wwc://platformapi/wwc/activity', '/mobile/studio/#/preferActive'],
        ['wwc://platformapi/wwc/webH5', '/mobile/studio/#/preferActive'],
        ['wwc://platformapi/wwc/privateChat?receiver=', '/mobile/studio/#/chatroom?lotteryId=1'],
        ['default', '/mobile/mine/mine.html']
      ]),
      dialogPop: false,
      pageData: {}
    }
  },
  watch: {
    '$route': function (e) {
      /** 推广公告在未读和 首页才会被调用 */
      const { name } = e
      const readState = this.Utils.Storage.get('noticeRead')
      if ((!readState || !readState.generalize) && name === 'index') {
        this.getNotice()
      }

      if (name !== 'index') {
        this.setNoticeTask({ key: 'generalize', val: null })
      }
    }
  },
  computed: {
    ...mapGetters([ 'notice' ]),
    hasNotice () {
      return Object.values(this.notice)
    },
    show () {
      /** 根据弹窗任务的 每个 val 是否有值 判断是否弹窗 */
      const noRoute = [ 'userVipAward', 'userVipLevel' ]
      const { path, query } = this.$route
      let showNotice = true
      if (path === '/activeDetails' && query.ios) {
        return false
      }
      noRoute.forEach(e => {
        if (path.includes(e)) {
          showNotice = false
        }
        return false
      })
      return showNotice && !!this.hasNotice.filter(e => e).length
    },
    renderSwitch () {
      /** 根据弹窗任务排序弹出 */
      const taskObj = Object.keys(this.notice)
      const index = this.hasNotice.findIndex(e => e)
      return taskObj[index]
    }
  },
  methods: {
    ...mapMutations([ 'setNoticeTask' ]),
    close () {
      /** 删除弹窗任务中对应的当前对象 并且添加已读状态 */
      const readState = this.Utils.Storage.get('noticeRead')
      this.Utils.Storage.save('noticeRead', { ...readState, [this.renderSwitch]: 'read' })
      this.setNoticeTask({ key: this.renderSwitch, val: null })
    },
    async getNotice () {
      const res = await dialogApi()
      if (res.data) {
        const readState = this.Utils.Storage.get('noticeRead') || {}

        /** 获取推广公告已读状态 赋值到弹窗任务对象 */
        if (readState && readState.generalize !== 'read') {
          this.setNoticeTask({ key: 'generalize', val: res.data })
        }
      }
    },
    contentDetail (item) {
      this.pageData = item
      this.dialogPop = true
    }
  },
  updated () {
    this.$nextTick(() => {
      /** 替换普通公告的 a 标签链接地址 并且地址被点击过后将公告视为已读 */
      const a = document.querySelectorAll('.dialog-content a')
      const linkMap = this.linkMap
      const closeHandler = this.close
      const renderSwitch = this.renderSwitch
      a.forEach(e => {
        /** 判断是否是自定义地址 是则将其替换 不是则查询地址库 */
        e.setAttribute('href', e.href.indexOf('customLinkUrl') > -1 ? e.href.split('url=')[1] : (linkMap.get(e.href) || e.href))

        /** QQ客服地址替换 */
        if (e.href.indexOf('qq') > -1 || e.href.indexOf('wqa') > -1) {
          e.setAttribute('href', `/mobile/other/openQQ.html?${e.href.match(/uin=[0-9]*/)[0]}`)
        }

        /** 非维护公告添加 a 标签链接跳转关闭 */
        if (renderSwitch !== 'maintenance') {
          e.addEventListener('click', closeHandler)
        }
      })
    })
  }
}
</script>

<style lang="scss" scoped>
@import 'Assets/css/base.color.scss';
.btn-qr{
  width: 100%;
  height: .7rem;
  color: #fff;
  margin-bottom: 10px;
  div{
    width: 60px;
    height: .7rem;
    background: $baseCol;
    border-radius: 4px;
    text-align: center;
    line-height: .7rem;
    margin: auto;
    cursor:pointer;
  }
}
.dialong-right{
  float: right;
  margin-top: -35px;
  margin-right: -11px;
  border-radius: 50%;
  overflow: hidden;
}
.dialong-right img{
  width: 26px;
}
.hd{
  background:url('../../assets/images/hudu.png') repeat;
  background-color: $baseCol;
  width: 83%;
  float: left;
  height: .7rem;
  margin-left: -1rem;
  margin-top: -1px;
}
.dialog {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 9999;
  .dialog-mask {
    @extend .dialog;
    position: absolute;
    z-index: 1;
    background-color: rgba(0, 0, 0, .3);
  }
  .dialog-content {
    position: absolute;
    z-index: 2;
    width: 90%;
    left: 50%;
    top: 50%;
    border-radius: 5px;
    transform: translate(-50%, -50%);
    animation: scale .35s ease;
    border: 4px solid $baseCol;
    &.no-border {
      border: none;
    }
    .dialog-generalize-close {
      position: absolute;
      right: 0;
      top: 0;
      transform: translateY(-120%);
      img {
        width: 20px;
        padding: 2px;
        border: 2px solid #fff;
        border-radius: 50%;
      }
    }
    .dialog-generalize img {
      width: 100%;
    }
    .dialog-notify-close {
      position: absolute;
      bottom: 0;
      left: 50%;
      z-index: 2;
      transform: translate(-50%, 100%);
      img {
        width: 24px;
        border: 2px solid #fff;
        border-radius: 50%;
        padding: 2px;
      }
    }
    .dialog-notify {
      position: relative;
      width: 100%;
      overflow: hidden;
      display: block;
      img {
        width: 100%;
      }
      p {
        position: absolute;
        bottom: 19%;
        max-width: 60%;
        text-align: center;
        left: 50%;
        transform: translateX(-50%);
        font-size: .6rem;
        color: yellow;
        font-weight: 400;
      }
    }
  }
  .dialog-content1 {
    position: absolute;
    z-index: 2;
    width: 90%;
    left: 50%;
    top: 50%;
    border-radius: 5px;
    transform: translate(-50%, -50%);
    animation: scale .35s ease;
    .dialog-generalize-close {
      position: absolute;
      right: 0;
      top: 0;
      transform: translateY(-120%);
      img {
        width: 20px;
        padding: 2px;
        border: 2px solid #fff;
        border-radius: 50%;
      }
    }
    .dialog-generalize img {
      width: 100%;
    }
    .dialog-notify-close {
      position: absolute;
      bottom: 0;
      left: 50%;
      z-index: 2;
      transform: translate(-50%, 100%);
      img {
        width: 24px;
        border: 2px solid #fff;
        border-radius: 50%;
        padding: 2px;
      }
    }
    .dialog-notify {
      position: relative;
      width: 100%;
      overflow: hidden;
      display: block;
      img {
        width: 100%;
      }
      p {
        position: absolute;
        bottom: 19%;
        max-width: 60%;
        text-align: center;
        left: 50%;
        transform: translateX(-50%);
        font-size: .6rem;
        color: yellow;
        font-weight: 400;
      }
    }
  }
}
@keyframes scale {
  0% {
    transform: translate(-50%, -50%) scale(0);
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
  }
}

.dialog-common {
  background: #fff;
  min-height: 100px;
  .common-title {
    color: #fff;
    height: 0.7rem;
    left: -1px;
    top: -1px;
    width: 28%;
    background: $baseCol;
    line-height: .7rem;
    text-align: center;
    position: relative;
    font-weight: 500;
    float: left;
    img {
      width: 14px;
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .common-content {
    padding-top: 37px;
    padding-bottom: 20px;
    margin: auto;
    text-align: center;
    font-weight: 400;
    ul {
      position: relative;
      margin-bottom: -6px;
      overflow-y: auto;
      height: 135px;
      // max-height: 200px;
      li {
        text-align: left;
        padding: 0px 6px;
        margin: 0 10px;
        line-height: 30px;
        border-bottom: 1px solid #eee;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        position: relative;
        // &:last-child {
        //   border-bottom: none;
        // }
        &:active {
          background: #f5f5f5;
        }
        i {
          position: absolute;
          right: 0;
          top: 9px;
        }
      }
    }
  }
}

.dialog-maintenance {
  width: calc(100vw - 124px)!important;
  margin: 0 auto;
  background: url('/mobile/images/maintain.png') no-repeat;
  background-size: 100%;
  padding-top: 132px;
  position: absolute;
  transform: translate(-50%, -50%);
  z-index: 2;
  left: 50%;
  top: 50%;
  p {
    background: #fff;
    padding: 0 20px 20px;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
  }
}

.dialog-page {
  position: fixed;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  background: #fff;
  animation: scaleSlide .35s ease-in-out;
  z-index: 20;
  .dialog-page-content {
    position: relative;
    padding: 10px;
    .content {
      margin-top: 10px;
    }
  }
}

@keyframes scaleSlide {
  0% {
    left: 100%;
  }
  100% {
    left: 0;
  }
}
</style>
