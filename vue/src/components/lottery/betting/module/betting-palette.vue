<style lang="scss">
@import 'Assets/css/base.color.scss';
@import 'Assets/css/mix.scss';
@-webkit-keyframes badbounce {
  0%,100% {
    -webkit-transform: translateY(0px);
  }
  10% {
    -webkit-transform: translateY(6px);
  }
  30% {
    -webkit-transform: translateY(-4px);
  }
  70% {
    -webkit-transform: translateY(3px);
  }
  90% {
    -webkit-transform: translateY(-2px);
  }
}
@-moz-keyframes badbounce {
  0%,100% {
    -moz-transform: translateY(0px);
  }
  10% {
    -moz-transform: translateY(6px);
  }
  30% {
    -moz-transform: translateY(-4px);
  }
  70% {
    -moz-transform: translateY(3px);
  }
  90% {
    -moz-transform: translateY(-2px);
  }
}
@keyframes badbounce {
  0%,100% {
    -webkit-transform: translateY(0px);
    -moz-transform: translateY(0px);
    -ms-transform: translateY(0px);
    -o-transform: translateY(0px);
    transform: translateY(0px);
  }
  10% {
    -webkit-transform: translateY(6px);
    -moz-transform: translateY(6px);
    -ms-transform: translateY(6px);
    -o-transform: translateY(6px);
    transform: translateY(6px);
  }
  30% {
    -webkit-transform: translateY(-4px);
    -moz-transform: translateY(-4px);
    -ms-transform: translateY(-4px);
    -o-transform: translateY(-4px);
    transform: translateY(-4px);
  }
  70% {
    -webkit-transform: translateY(3px);
    -moz-transform: translateY(3px);
    -ms-transform: translateY(3px);
    -o-transform: translateY(3px);
    transform: translateY(3px);
  }
  90% {
    -webkit-transform: translateY(-2px);
    -moz-transform: translateY(-2px);
    -ms-transform: translateY(-2px);
    -o-transform: translateY(-2px);
    transform: translateY(-2px);
  }
}
.ss_animate {
  -webkit-animation: badbounce 0.4s linear;
  -moz-animation: badbounce 0.4s linear;
  animation: badbounce 0.4s linear;
}
#ss_menu {
  bottom: 3.625rem;
  right: .15rem;
  width: 44px;
  height: 44px;
  color: #fff;
  position: fixed;
  z-index: 9;
  -webkit-transition: all 0.4s ease;
  -moz-transition: all 0.4s ease;
  transition: all 0.4s ease;
  /*-webkit-transform: rotate(360deg);*/
  /*-moz-transform: rotate(360deg);*/
  /*-ms-transform: rotate(360deg);*/
  /*-o-transform: rotate(360deg);*/
  /*transform: rotate(360deg);*/
}
#ss_menu > .menu {
  display: block;
  position: absolute;
  border-radius: 50%;
  width: 1rem;
  height: 1rem;
  line-height: .9rem;
  text-align: center;
  // box-shadow: 0 3px 10px rgba(0, 0, 0, 0.23), 0 3px 10px rgba(0, 0, 0, 0.16);
  color: #fff;
  -webkit-transition: all 0.4s ease;
  -moz-transition: all 0.4s ease;
  transition: all 0.4s ease;
}
#ss_menu > .menu .share {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0px;
  top: 0px;
  /*-webkit-transform: rotate(180deg);*/
  /*-moz-transform: rotate(180deg);*/
  /*-ms-transform: rotate(180deg);*/
  /*-o-transform: rotate(180deg);*/
  /*transform: rotate(180deg);*/
  -webkit-transition: all 0.4s ease;
  -moz-transition: all 0.4s ease;
  transition: all 0.4s ease;
  font-size: 32px;
}
#ss_menu > .menu .share .circle {
  -webkit-transition: all 0.4s ease;
  -moz-transition: all 0.4s ease;
  transition: all 0.4s ease;
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #fff;
  top: 50%;
  margin-top: -6px;
  left: 12px;
  opacity: 1;
}
#ss_menu > .menu .share .circle:after, #ss_menu > .menu .share .circle:before {
  -webkit-transition: all 0.4s ease;
  -moz-transition: all 0.4s ease;
  transition: all 0.4s ease;
  content: '';
  opacity: 1;
  display: block;
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #fff;
}
#ss_menu > .menu .share .circle:after {
  left: 20.78461px;
  top: 12.0px;
}
#ss_menu > .menu .share .circle:before {
  left: 20.78461px;
  top: -12.0px;
}
#ss_menu > .menu .share .bar {
  -webkit-transition: all 0.4s ease;
  -moz-transition: all 0.4s ease;
  transition: all 0.4s ease;
  width: 24px;
  height: 3px;
  background: #fff;
  position: absolute;
  top: 50%;
  margin-top: -1.5px;
  left: 18px;
  -webkit-transform-origin: 0% 50%;
  -moz-transform-origin: 0% 50%;
  -ms-transform-origin: 0% 50%;
  -o-transform-origin: 0% 50%;
  transform-origin: 0% 50%;
  /*-webkit-transform: rotate(30deg);*/
  /*-moz-transform: rotate(30deg);*/
  /*-ms-transform: rotate(30deg);*/
  /*-o-transform: rotate(30deg);*/
  /*transform: rotate(30deg);*/
}
#ss_menu > .menu .share .bar:before {
  -webkit-transition: all 0.4s ease;
  -moz-transition: all 0.4s ease;
  transition: all 0.4s ease;
  content: '';
  width: 24px;
  height: 3px;
  background: #fff;
  position: absolute;
  left: 0px;
  -webkit-transform-origin: 0% 50%;
  -moz-transform-origin: 0% 50%;
  -ms-transform-origin: 0% 50%;
  -o-transform-origin: 0% 50%;
  transform-origin: 0% 50%;
/*  -webkit-transform: rotate(-60deg);
  -moz-transform: rotate(-60deg);
  -ms-transform: rotate(-60deg);
  -o-transform: rotate(-60deg);
  transform: rotate(-60deg);*/
}
#ss_menu > .menu .share.close .circle {
  opacity: 0;
}
#ss_menu > .menu .share.close .bar {
  top: 50%;
  margin-top: -1.5px;
  left: 50%;
  margin-left: -12px;
  -webkit-transform-origin: 50% 50%;
  -moz-transform-origin: 50% 50%;
  -ms-transform-origin: 50% 50%;
  -o-transform-origin: 50% 50%;
  transform-origin: 50% 50%;
/*  -webkit-transform: rotate(405deg);
  -moz-transform: rotate(405deg);
  -ms-transform: rotate(405deg);
  -o-transform: rotate(405deg);
  transform: rotate(405deg);*/
}
#ss_menu > .menu .share.close .bar:before {
  -webkit-transform-origin: 50% 50%;
  -moz-transform-origin: 50% 50%;
  -ms-transform-origin: 50% 50%;
  -o-transform-origin: 50% 50%;
  transform-origin: 50% 50%;
/*  -webkit-transform: rotate(-450deg);
  -moz-transform: rotate(-450deg);
  -ms-transform: rotate(-450deg);
  -o-transform: rotate(-450deg);
  transform: rotate(-450deg);*/
}
#ss_menu > .menu {
  // background-color: $baseCol;
}
#ss_menu > .menu.ss_active {
  // background: #00796B;
  // background-color: $baseLightCol;
  // -webkit-transform: scale(0.76);
  // -moz-transform: scale(0.76);
  // -ms-transform: scale(0.76);
  // -o-transform: scale(0.76);
  // transform: scale(0.76);
}
#ss_menu > div.solid {
  opacity: 1;
  -webkit-transition: all 0.4s ease;
  -moz-transition: all 0.4s ease;
  transition: all 0.4s ease;
  // display: block;
  p {
    font-size: 12px;
    line-height: 20px;
    padding-top: 4px;
    i {
      display: block;
      font-size: 18px;
    }
    span {
      margin-top: -4px;
      display: block;
    }
  }
}
#ss_menu > div.diaphan {
  opacity: 0;
  // display: none;
}
#ss_menu > div.hidden {
  display: none;
}
#ss_menu > div {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  position: absolute;
  width: 40px;
  height: 40px;
  font-size: 24px;
  text-align: center;
  // background: #00796B;
  border-radius: 50%;
  display: table;
}
#ss_menu > div i {
  display: table-cell;
  vertical-align: middle;
}
#ss_menu > div:hover {
  // background: #009688;
  cursor: pointer;
}
#ss_menu .solid:nth-child(1) {
  top: 70px;
  left: 0px;
  // background-color: $baseBlue;
}
#ss_menu .solid:nth-child(2) {
  top: 46px;
  left: -44px;
  // background-color: $baseGreen;
}
#ss_menu .solid:nth-child(3) {
  top: 0px;
  left: -58px;
  // background-color: $baseLightGreen;
}
#ss_menu .solid:nth-child(4) {
  top: -50px;
  left: -44px;
  // background-color: $baseOrange;
}
#ss_menu .solid:nth-child(5) {
  top: -70px;
  left: 0px;
  // background-color: $basePurple;
}
// 在左边
#ss_menu .solid.left:nth-child(2) {
  top: 46px;
  left: 44px;
  // background-color: $baseGreen;
}
#ss_menu .solid.left:nth-child(3) {
  top: 0px;
  left: 58px;
  // background-color: $baseLightGreen;
}
#ss_menu .solid.left:nth-child(4) {
  top: -50px;
  left: 44px;
  // background-color: $baseOrange;
}
/** */
.modal-bg {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  background: #000;
  z-index: 8;
  -webkit-transition: all 0.4s ease;
  -moz-transition: all 0.4s ease;
  transition: all 0.4s ease;
}
.recharge-play {
  padding: 18px 10px 0px 10px;
  &:first-child {
    padding-top: 25px;
  }
  span {
    font-size: 12px;
    line-height: 16px;
    padding: 1px 8px;
    color: #fff;
    @include rounded-corners(3px);
  }
  p {
    margin-top: 1px;
    font-size: 12px;
    line-height: 24px;
  }
}
.recharge-body .btn {
  padding: 8px 12px;
  text-align: center;
  a {
    display: block;
    background-color: #ff8700;
    color: #fff;
    font-size: 12px;
    line-height: 32px;
    height: 32px;
  }
}
.recharge {
  text-align: left;
  position: relative;
  // margin: -50px -30px;
  width: 90vw;
  max-width: 640px;
  background: #fff;
  @include rounded-corners(5px);
}
.htmleaf-container2{position:relative;}
.rightFloatMore{
  position:relative;
  z-index: 299;
  margin:.13rem 0 0 -.15rem;
  width: 1.1rem;
  height: 1.1rem;}
.rightFloatList{
  position:absolute;
  top:0;
  right: .15rem;
  display:none;
  z-index: 288;
  width: .9rem;
  height: .9rem;
  margin-top:.1rem;
  font-size: .3rem;
  border-radius: 50%;
  color:#fff;}
.rightFloatMoreChatRoom{background: url(../../../../assets/images/chatroom/rightMore.png) no-repeat;background-size:100%;}
/*.rightFloatList:before{content:'';display:inline-block;vertical-align:middle;width:0;height:100%;}*/
.rightFloatList-con{display:inline-block;vertical-align:middle;}
.rightFloatList:nth-child(1){background: url(../../../../assets/images/chatroom/menu_button_kj@3x.png) no-repeat;background-size:100%;}
.rightFloatList:nth-child(2){background: url(../../../../assets/images/chatroom/menu_button_hd@3x.png) no-repeat;background-size:100%;}
.rightFloatList:nth-child(3){background: url(../../../../assets/images/chatroom/menu_button_jl@3x.png) no-repeat;background-size:100%;}
.rightFloatList:nth-child(4){background: url(../../../../assets/images/chatroom/menu_button_wf@3x.png) no-repeat;background-size:100%;}
.rightFloatList .fa{display:block;font-size:.4rem;}
.top1{display:block;animation: top1 .1s forwards;}
.top2{display:block;animation: top2 .2s forwards;}
.top3{display:block;animation: top3 .4s forwards;}
.top4{display:block;animation: top4 .1s forwards;}
.top5{display:block;animation: top5 .2s forwards;}
.top6{display:block;animation: top6 .4s forwards;}
.top7{display:block;animation: top7 .5s forwards;}
.top8{display:block;animation: top8 .5s forwards;}
@keyframes top1 {
   0% {top:0;}
   100% {top:1rem;}
 }
@keyframes top2 {
  0% {top:0;}
  100% {top:2.3rem;}
}
@keyframes top3 {
  0% {top:0;}
  100% {top:3.6rem;}
}
@keyframes top4 {
  0% {top:1rem;opacity:1;}
  100% {top:0;opacity:0;}
}
@keyframes top5 {
  0% {top:2.3rem;opacity:1;}
  100% {top:0;opacity:0;}
}
@keyframes top6 {
  0% {top:3.6rem;opacity:1;}
  100% {top:0;opacity:0;}
}
@keyframes top7 {
  0% {top:0;}
  100% {top:4.8rem;}
}
@keyframes top8 {
  0% {top:4.8rem;opacity:1;}
  100% {top:0;opacity:0;}
}
.menu-icon {
  position: fixed;
}
.dragon-icon{
  position: absolute;
  z-index: 10000;
  bottom: 52px;
  right: 2px;
  width: 46px;
}
</style>

<template>
  <section style="position:relative;z-index: 20;">
    <div class="htmleaf-container" v-if="!data">
      <div id='ss_menu' :style="ssStyle" v-dragDir>
        <div :class="childClass" @click.stop="childBtn('play')">
          <img :src="require('Assets/images/chatroom/menu_button_wf@3x.png')" width="100%">
          <!-- <p><i class="fa fa-gamepad"></i><span>玩法</span></p> -->
        </div>
        <div :class="childClass" @click.stop="childBtn('record')">
          <img :src="require('Assets/images/chatroom/menu_button_jl@3x.png')" width="100%">
          <!-- <p><i class="fa fa-pencil"></i><span>记录</span></p> -->
        </div>
        <div :class="childClass" @click.stop="childBtn('active')">
          <img :src="require('Assets/images/chatroom/menu_button_hd@3x.png')" width="100%">
          <!-- <p><i class="fa fa-gift"></i><span>活动</span></p> -->
        </div>
        <div :class="childClass" @click.stop="childBtn('prize')">
          <img :src="require('Assets/images/chatroom/menu_button_kj@3x.png')" width="100%">
          <!-- <p><i class="fa fa-money"></i><span>开奖</span></p> -->
        </div>
        <div :class="childClass" @click.stop="childBtn('service')">
          <img :src="require('Assets/images/chatroom/chat_service.png')" width="100%">
          <!-- <p><i class="fa fa-user-md"></i><span>客服</span></p> -->
        </div>
        <img src="../../../../assets/images/chatroom/dragon.png" v-if="dragonShow" class="dragon-icon" :style="{bottom: dragon.bottom}" @click="dragonHandler">
        <div :class="menuClass">
          <img
            width="100%"
            :style="shareStyle"
            :src="menuIcon"
            data-rot='180'
            @click.stop="toggleShare($event)"
            id='ss_toggle'
          >
          <!-- <div :class='shareClass' :style="shareStyle" id='ss_toggle' data-rot='180' @click.stop="toggleShare($event)">+ -->
            <!-- <div class='circle'></div>
            <div class='bar'></div> -->
          <!-- </div> -->
        </div>
      </div>
      <div class="modal-bg" @click.stop="hideSS" v-show="SSBg"></div>
    </div>
    <!-- 玩法面板 -->
    <mt-popup
      :class="'mt-nobg'"
      v-model="playPop"
      popup-transition="popup-fade"
    >
      <section class="recharge">
        <div class="recharge-body">
          <div class="recharge-play" v-if="lotteryLayout.simpleInfo">
            <span class="bg-red">玩法提示</span>
            <p>{{lotteryLayout.simpleInfo}}</p>
          </div>
          <div class="recharge-play" v-if="lotteryLayout.info">
            <span class="bg-red">中奖说明</span>
            <p>{{lotteryLayout.info}}</p>
          </div>
          <div class="recharge-play" v-if="lotteryLayout.example">
            <span class="bg-red">范例</span>
            <p>{{lotteryLayout.example}}</p>
          </div>
          <div class="btn">
            <a @click.stop="playPop = false">确定</a>
          </div>
        </div>
      </section>
    </mt-popup>
    <div class="htmleaf-container2" v-if="data">
      <div class="rightFloatMore rightFloatMoreChatRoom" @click.stop="toggleShareChatroom"></div>
      <ul class="fw">
        <li class="rightFloatList" :class="{top1: isTop.go, top4: isTop.back}"  @click.stop="childBtn('prize', 'room')">
          <!--<div class="rightFloatList-con">-->
            <!--<i class="fa fa-money"></i>-->
            <!--开奖-->
          <!--</div>-->
        </li>
        <li class="rightFloatList" :class="{top2: isTop.go, top5: isTop.back}" @click.stop="childBtn('active')">
          <!--<div class="rightFloatList-con">-->
            <!--<i class="fa fa-gift"></i>-->
            <!--充值-->
          <!--</div>-->
        </li>
        <li class="rightFloatList" :class="{top3: isTop.go, top6: isTop.back}" @click.stop="childBtn('record', 'room')">
          <!--<div class="rightFloatList-con">-->
            <!--<i class="fa fa-pencil"></i>-->
            <!--记录-->
          <!--</div>-->
        </li>
        <li v-if="$store.state.chatRoom.BettingPalettePlay && lotteryLayout.lotteryId" class="rightFloatList" :class="{top7: isTop.go, top8: isTop.back}" @click.stop="childBtn('play')">
          <!--<div class="rightFloatList-con">-->
            <!--<i class="fa fa-pencil"></i>-->
            <!--玩法-->
          <!--</div>-->
        </li>
      </ul>
    </div>
    <Dragon v-if="dragon.show" @closeDragon="closeDragon"/>
  </section>
</template>

<script>
// function hasClass (ele, cls) {
//   console.log(ele)
//   console.log(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
//   return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
// }
// // 为指定的dom元素添加样式
// function addClass (ele, cls) {
//   if (!hasClass(ele, cls)) ele.className += ' ' + cls
// }
// // 删除指定dom元素的样式
// function removeClass (ele, cls) {
//   if (hasClass(ele, cls)) {
//     var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)') // 正则表达式，需要补血
//     ele.className = ele.className.replace(reg, ' ')
//   }
// }
import { ToastMsg } from './tools'
import Dragon from 'Components/lottery/chatroom/module/dragon'
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'betting-palette',
  props: ['data'],
  data () {
    return {
      lotteryLayout: {},
      SSBg: false,
      rot: 0,
      playPop: false,
      childClass: {
        solid: 1,
        diaphan: 1,
        hidden: 1,
        left: 0
      },
      menuClass: {
        menu: 1,
        ss_active: 0
      },
      shareClass: {
        share: 1,
        close: 0
      },
      ssStyle: {
        transform: '',
        webkitTransform: ''
      },
      shareStyle: {
        transform: '',
        webkitTransform: ''
      },
      isTop: {
        go: false,
        back: false
      },
      fold: true,
      dragon: {
        iconShow: false,
        flag: false,
        bottom: '',
        show: false
      },
      lotteryArr: this.Utils.Storage.get('lotteryArr')
    }
  },
  directives: {
    dragDir: {
      inserted: (el, a, vm) => {
        let x = 0
        let y = 0
        let px = 0
        let py = 0
        let nx = 0
        let ny = 0
        let onDrag = false
        el.ontouchstart = function (e) {
          x = e.touches[0].clientX
          y = e.touches[0].clientY
          px = el.offsetLeft
          py = el.offsetTop
          let cH = document.documentElement.clientHeight - 88
          let cW = document.body.clientWidth - 44
          onDrag = true
          el.style.transition = 'none'
          el.ontouchmove = function (e) {
            if (onDrag) {
              nx = e.touches[0].clientX + px - x
              ny = e.touches[0].clientY + py - y
              el.style.left = (nx < 0 ? '.15rem' : nx > cW ? `calc(${cW}px - .15rem)` : `${nx}px`)
              el.style.top = (ny < 100 ? '100px' : ny > cH ? `${cH}px` : `${ny}px`)
            }
          }
          el.ontouchend = function (e) {
            el.style.transition = 'all 0.4s ease'
            let half = document.body.clientWidth / 2
            if (el.style.left || el.style.right) {
              if (nx < (half - 22)) {
                el.style.left = '.15rem'
                vm.context.childClass.left = 1
              } else {
                el.style.left = `calc(${cW}px - .15rem)`
                vm.context.childClass.left = 0
              }
            }
            if (onDrag) {
              onDrag = false
            }
          }
        }
      }
    }
  },
  computed: {
    ...mapGetters([ 'system_config' ]),
    ...mapState({
      init (state) {
        return state.chatRoom.init
      }
    }),
    menuIcon () {
      const fold = require('Assets/images/chatroom/menu_button_open@3x.png')
      const unfold = require('Assets/images/chatroom/menu_button_close@3x.png')
      return this.fold ? fold : unfold
    },
    dragonShow () {
      return this.system_config && this.system_config.status && this.system_config.status.dragonStatus === 'open'
    }
  },
  methods: {
    closeDragon () {
      this.dragon.show = false
    },
    dragonHandler () {
      this.dragon.show = true
    },
    toggleShare ($ev) {
      this.fold = !this.fold
      this.dragon.flag = !this.dragon.flag
      if (this.dragon.flag) {
        this.dragon.bottom = '122px'
      } else {
        this.dragon.bottom = '52px'
      }
      // console.log($ev.target)
      // console.log($ev.target.getAttribute('data-rot'))
      let _rot = $ev.target.getAttribute('data-rot') * 1 - 180
      this.rot = _rot
      // this.ssStyle.transform = `rotate(${_rot}deg)`
      // this.ssStyle.webkitTransform = `rotate(${_rot}deg)`
      if (_rot / 180 % 2 === 0) {
        this.menuClass.ss_active = 1
        this.shareClass.close = 1
        this.childClass.diaphan = 0
        this.childClass.hidden = 0
        // this.shareStyle.transform = `rotate(${_rot}deg)`
        // this.shareStyle.webkitTransform = `rotate(${_rot}deg)`
        this.SSBg = true
      } else {
        this.menuClass.ss_active = 0
        this.shareClass.close = 0
        // this.shareStyle.transform = `rotate(${_rot}deg)`
        // this.shareStyle.webkitTransform = `rotate(${_rot}deg)`
        this.childClass.diaphan = 1
        this.SSBg = false
        setTimeout(() => {
          this.childClass.hidden = 1
        }, 300)
      }
      // $(this).data('rot', rot);
      $ev.target.setAttribute('data-rot', _rot)
    },
    toggleShareChatroom () {
      if (this.isTop.go === false) {
        this.isTop.go = true
        this.isTop.back = false
      } else if (this.isTop.go === true) {
        this.isTop.go = false
        this.isTop.back = true
      }
    },
    openPlay () {
    },
    hideSS () {
      if (this.SSBg) {
        this.SSBg = false
        document.getElementById('ss_toggle').click()
      }
    },
    childBtn (type, room) {
      // 活动
      if (type === 'active') {
        if (this.init.message.member.type === -1) {
          this.$toast({
            message: '请先登录后再操作',
            position: 'bottom'
          })
          setTimeout(() => {
            window.location.href = '/mobile/studio/#/login'
            this.hideSS()
          }, 1500)
          return false
        }
        // window.location.href = '/mobile/mall/preferActive.html'
        window.location.href = '/mobile/studio/#/rechargeList' // '/mobile/mine/recharge.html'
        this.hideSS()
      }
      // 客服
      if (type === 'service') {
        this.axios.postOnce('/front/get_global_config.do', {})
          .then((res) => {
            let serverUrl = ''
            if (res.code === 0) {
              if (res.data.status.customerServiceType === 'THIRDPARTY') {
                let _user = this.$store.getters.getUserInfo
                let _account = encodeURI('游客')
                if (_user && _user.account) {
                  _account = encodeURI(_user.account)
                }
                if (res.data.status.customerServiceUrl.search('{name}') > -1) {
                  serverUrl = res.data.status.customerServiceUrl.split('{name}')[0] + _account
                } else {
                  serverUrl = res.data.status.customerServiceUrl
                }
              } else if (res.data.customerServiceType === 'SYSTEM') {
                serverUrl = '/mobile/service/serviceOnline.html'
              }
            }
            if (serverUrl && serverUrl.length > 0) {
              window.location.href = serverUrl
            } else {
              ToastMsg('系统繁忙，请稍后刷新重试..')
            }
            this.hideSS()
          })
          .catch(() => {
          })
      }
      // 开奖
      if (type === 'prize') {
        let _layoutInfo = this.$store.getters.getLayoutMsg
        let currentRoom = this.Utils.Storage.get('shareBettingMoney')
        if (room && currentRoom && currentRoom.currentRoom && !currentRoom.currentRoom.flag && this.lotteryArr) {
          let game = this.lotteryArr.filter(e => e.lotteryId < 10000)[0]
          this.routerLink({ path: '/resultDetails', params: { name: game.name, lotteryId: game.lotteryId } })
        } else {
          this.routerLink({ path: '/resultDetails', params: { name: _layoutInfo.name, lotteryId: _layoutInfo.lotteryId } })
        }
        // window.location.href = `/mobile/mall/resultDetailList.html?lotteryName=${_layoutInfo.name}&lotteryId=${_layoutInfo.lotteryId}`
        this.hideSS()
      }
      // 记录
      if (type === 'record') {
        let _user = this.$store.getters.getUserInfo
        if (_user && _user.account) {
          this.$router.push(`/orderList`)
        } else {
          ToastMsg('请先登录..')
          setTimeout(() => {
            window.location.href = '/mobile/studio/#/login'
          }, 1200)
        }
        this.hideSS()
      }
      // 玩法
      if (type === 'play') {
        let _layout = this.$store.getters.getLayout
        console.log(_layout)
        this.playPop = true
        this.lotteryLayout = _layout
        this.hideSS()
      }
    }
  },
  mounted () {
    this.lotteryLayout = this.$store.getters.getLayout
    // let _ssmenu = document.getElementById('ss_menu')
    // console.log(_ssmenu)
    // let transFn = (e) => {
    //   console.log(e)
    //   console.log(this.ssStyle)
    //   if (this.rot / 180 % 2 === 0) {
    //     addClass(_ssmenu, 'ss_animate')
    //   } else {
    //     removeClass(_ssmenu, 'ss_animate')
    //   }
    // }
    // _ssmenu.addEventListener('transitionend', transFn)
    // _ssmenu.addEventListener('webkitTransitionEnd', transFn)
    // _ssmenu.addEventListener('oTransitionEnd', transFn)
  },
  components: {
    Dragon
  }
}
</script>
