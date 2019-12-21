<template>
  <section class="box-warp tc ft0">
    <section class="dragon dInV fw">
      <h3 class="dragon-tit pr">长龙助手<img src="../../../../assets/images/chatroom/dragonX.png" class="dragonX" @click="closeDragon"></h3>
      <!-- <section>
        <ul :style="{width: dragonListsWidth}" class="fw dragon_lists">
          <li
            :style="{width: dragonListWidth}"
            class="dragon_list"
            :class="{active: dragonListActive === index}"
            v-for="(item, index) in dataList"
            :key="index"
            @click="titleListHandler(item, index)"
          >{{item.title}}</li>
        </ul>
      </section>-->
      <mt-navbar v-model="active"  class="fw dragon_lists cp2">
        <mt-tab-item
          :id="'tab-container' + index"
          :style="{width: dragonListWidth}"
          class="dragon_list"
          v-for="(item, index) in dataList"
          :key="index"
          @click.native="showCurrentTab(index)"
        >
          {{item.title}}
        </mt-tab-item>
      </mt-navbar>
      <mt-tab-container v-model="active" class="dragon-con tl bg-whole" swipeable>
        <mt-tab-container-item :id="'tab-container' + ix" v-for="(i, ix) in dataList" :key="ix">
          <section class="content-list" v-for="(item, index) in listCon" :key="index">
            <section class="dInV tc" style="width:2.2rem;">
              <img :src="item.url" class="lottery-icon">
              {{item.lotteryName}}
            </section>
            <section class="dInV">
              <section class="content-list-times">
                {{item.currentIssue}}期
                <!--<p class="content-list-time">{{item.timeContent ? item.timeContent : newTimes(item.time)}}</p>-->
                <p class="content-list-time">{{item.timeContent ? item.timeContent : newTimes(item.time)}}</p>
              </section>
              <div class="content-list-plays">
                <span class="content-list-play">{{item.playWay}}</span>
                <span
                  class="content-list-play"
                  :class="{yellow: item.playMethod.indexOf('双') > -1, origin: item.playMethod.indexOf('大') > -1, blue: item.playMethod.indexOf('单') > -1, green: item.playMethod.indexOf('小') > -1}"
                >{{item.playMethod}}</span>
                <span class="content-list-play">{{item.playIssueCount}}期</span>
              </div>
            </section>
            <ol class="content-sizes">
              <li class="content-size" :class="{contentSizeNo: item.timeContent}">
                <div @click="checked($event, item)" class="content-size-hanlder"></div>
                <span class="content-pay dl" :style="{'line-height': !chatRoom.isLogin ? '1.45rem' : '1rem'}">{{item.content[0]}}</span><span v-if="chatRoom.isLogin && user.shareCodes.length > 0" class="dl">奖{{odds(item)}}</span>
              </li>
              <li class="content-size" :class="{contentSizeNo: item.timeContent}">
                <div @click="checked($event, item)" class="content-size-hanlder"></div>
                <span class="content-pay dl" :style="{'line-height': !chatRoom.isLogin ? '1.45rem' : '1rem'}">{{item.content[1]}}</span><span v-if="chatRoom.isLogin && user.shareCodes.length > 0" class="dl">奖{{odds(item)}}</span>
              </li>
            </ol>
          </section>
          <section class="content-list-no" v-if="listCon.length <= 0">
            暂无此系列长龙玩法
          </section>
        </mt-tab-container-item>
      </mt-tab-container>
     <!-- <section class="dragon-con tl bg-whole">
        <mt-swipe  ref="swipe" :show-indicators="false" :auto="0" :speed= "1" :continuous = 'true'  @before="beforeChange" @change="handleChange">
          <mt-swipe-item v-for="(i, ix) in dataList" :key="ix">
            <section v-if="!dragLoad"  class="content-list" v-for="(item, index) in listCon" :key="index">
              <section class="dInV tc">
                <img :src="item.url" class="lottery-icon">
                {{item.lotteryName}}
              </section>
              <section class="dInV">
                <section class="content-list-times">
                  {{item.currentIssue}}期
                  <p class="content-list-time">{{item.timeContent ? item.timeContent : newTimes(item.time)}}</p>
                </section>
                <div class="content-list-plays">
                  <span class="content-list-play">{{item.playWay}}</span>
                  <span
                    class="content-list-play"
                    :class="{yellow: item.playMethod.indexOf('双') > -1, origin: item.playMethod.indexOf('大') > -1, blue: item.playMethod.indexOf('单') > -1, green: item.playMethod.indexOf('小') > -1}"
                  >{{item.playMethod}}</span>
                  <span class="content-list-play">{{item.playIssueCount}}</span>
                </div>
              </section>
              <ol class="content-sizes">
                <li class="content-size" :class="{contentSizeNo: item.timeContent}">
                  <div @click.self="checked($event, item)" class="content-size-hanlder"></div>
                  <span class="content-pay">{{item.content[0]}}</span><br>奖{{item.maxPrize}}
                </li>
                <li class="content-size" :class="{contentSizeNo: item.timeContent}">
                  <div @click.self="checked($event, item)" class="content-size-hanlder"></div>
                  <span class="content-pay">{{item.content[1]}}</span><br>奖{{item.minPrize}}
                </li>
              </ol>
            </section>
            <section class="content-list-no" v-if="listCon.length <= 0 && !dragLoad">
              暂无此系列长龙玩法
            </section>
          </mt-swipe-item>
        </mt-swipe>
      </section>-->
      <section class="bettings tl pr fw">
        每注<input type="text" v-model="totalFee" onkeyup="this.value=this.value.replace(/\D/g,'')" placeholder="单注金额" maxlength="8" class="dragon-text">元<div class="dragon-betting pr tc"  @click="bet">投注</div>
      </section>
    </section>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import Filters from 'Plugins/filters'
import Logger from '@/plugins/utils/logger'
const { numFixed } = Filters
export default {
  name: 'dragon',
  data () {
    return {
      user: this.Utils.Storage.get('user'),
      active: 'tab-container0',
      dragonListsWidth: 0,
      dragonListWidth: 0,
      dragonListActive: 0,
      dragonListFlag: false,
      dataList: [
        {
          title: '',
          type: '',
          list: []
        }
      ],
      listCon: [],
      totalFee: '',
      betInfo: null,
      types: '',
      timer: null,
      odd: null
    }
  },
  watch: {
    active (newVal) {
      this.clearInterva()
      this.types = this.dataList[newVal.substring(newVal.length - 1)].type
      this.handleChange()
    }
  },
  created () {
    this.chatRoom.isLogin = !!this.user
    this.create()
  },
  computed: {
    ...mapState({
      chatRoom (state) {
        return state.chatRoom
      }
    }),
    userShares () {
      if (this.user && this.user.shareCodes.length > 0) {
        return this.user.shareCodes.filter((i) => {
          return i.lotteryClassName === this.types
        })[0]
      }
    }
  },
  mounted () {
    this.timer = setInterval(() => {
      this.clearInterva()
      this.getLottery()
    }, 10000)
  },
  methods: {
    showCurrentTab (index) {
      try {
        console.log('.......', '')
        const currentTab = document.querySelector('.cp2').querySelectorAll('a')[index] // 都叫cp 影响了外面的cp
        document.querySelector('.cp2').scrollLeft =
          index === 0
            ? 0
            : currentTab.offsetLeft -
              (window.innerWidth * 0.9) / 2 +
              currentTab.clientWidth / 2
      } catch (error) {
        Logger.error('应该是点击tab时获取dom出错了')
      }
    },
    odds (item) {
      if (this.user && this.user.shareCodes.length > 0) {
        if (!this.userShares.share) {
          return 0
        }
        let odd = String((item.maxPrize - item.minPrize) / 9 * this.userShares.share + item.minPrize)
        // if (odd.substring(odd.lastIndexOf('.') + 1).length < 3) {
        //   odd = odd + '0'
        // } else if (odd.substring(odd.lastIndexOf('.') + 1).length > 3) {
        //   odd = odd.substring(0, odd.lastIndexOf('.') + 1) + odd.substr(odd.lastIndexOf('.') + 1, 3)
        // }
        return numFixed(odd, 3)
      }
    },
    clearInterva () {
      let leng = this.timeData.length
      for (let i = 0; i < leng; i++) {
        clearInterval(this.timeData[i].timer)
      }
    },
    bet () {
      if (!this.betInfo) {
        this.$toast({
          message: '请选择玩法',
          position: 'middle',
          duration: 1500
        })
        return
      }
      if (Number(this.totalFee) > 10000000) {
        this.$toast({
          message: '金额超过最大限额(1千万)',
          position: 'middle',
          duration: 1500
        })
        return
      }
      if (this.totalFee[0] === '0') {
        this.$toast({
          message: '金额不能以0开头',
          position: 'middle',
          duration: 1500
        })
        return
      }
      if (this.totalFee.replace(/^\s+|\s+$/gm, '').length !== 0) {
        let params = []
        let json = {}
        json.playId = this.betInfo.playId
        json.issue = this.betInfo.currentIssue
        json.rebate = 0 // 不返利
        json.unitFee = this.totalFee * 100
        json.numbers = this.betInfo.betNumber.replace(/x/g, this.betInfo.numbers)
        params.push(json)
        this.axios.post('/front/bet/betting.do', params)
          .then((res) => {
            if (res.code === 0) {
              this.$toast({
                message: '投注成功',
                position: 'middle',
                duration: 1500
              })
              let contentSize = document.getElementsByClassName('content-size')
              let contentSizeLeng = contentSize.length
              for (let i = 0; i < contentSizeLeng; i++) {
                if (contentSize[i].className.indexOf('bg-col') > -1) {
                  contentSize[i].className = contentSize[i].className.substring(0, (contentSize[i].className.indexOf('bg-col') - 1))
                }
              }
              this.betInfo = null
            } else {
              if (res.code !== 403) {
                this.$toast({
                  message: res.msg,
                  position: 'middle',
                  duration: 2000
                })
              } else {
                this.$toast({
                  message: '当前已过期',
                  position: 'middle',
                  duration: 1500
                })
              }
            }
          })
          .catch(() => {})
      } else {
        this.$toast({
          message: '请输入数字金额',
          position: 'middle',
          duration: 1500
        })
      }
      this.totalFee = ''
    },
    create () {
      let flag = ''
      this.axios.post('/front/dragon/type.do', {
        flag: flag
      })
        .then((res) => {
          if (res.code === 0) {
            let series = res.data.series
            let seriesLeng = series.length
            for (let i = 0; i < seriesLeng; i++) {
              // if (series[i].title.length < 5) {
              //   series[i].title = series[i].title + '系列'
              // }
            }
            this.dataList = series
            if (this.dragonListFlag === false) { // 第一次进来的时候显示哪一个彩种系列
              this.dragonListActive = res.data.index
              this.dragonListFlag = true
            }
            this.types = this.dataList[this.dragonListActive].type
            // 控制长龙标题宽度
            this.dragonListWidth = this.dataList.length < 5 ? (document.body.offsetWidth * 0.93) / this.dataList.length + 'px' : (document.body.offsetWidth * 0.93) / 5 + 'px'
            this.dragonListsWidth = this.dataList.length * parseFloat(this.dragonListWidth) + 'px'
            this.getLottery()
          }
        })
        .catch(() => {})
    },
    checked (e, item) {
      // e.target.getAttribute('type')
      // e.target.children[0].innerHTML
      if (!item.timeContent) {
        let active = e.target.offsetParent.className.indexOf('bg-col')
        let contentSize = document.getElementsByClassName('content-size')
        let contentSizeLeng = contentSize.length
        if (active > -1) {
          e.target.offsetParent.className = e.target.offsetParent.className.substring(0, (active - 1))
          this.betInfo = null // 取消没有选中时, this.betInfo的数据
        } else {
          for (let i = 0; i < contentSizeLeng; i++) {
            if (contentSize[i].className.indexOf('bg-col') > -1) {
              contentSize[i].className = contentSize[i].className.substring(0, (contentSize[i].className.indexOf('bg-col') - 1))
            }
          }
          e.target.offsetParent.className += ' bg-col'
          this.betInfo = item
          this.betInfo.numbers = e.target.offsetParent.children[1].innerHTML
        }
      }
    },
    getLottery () { // 得到彩种type后  来这里获取对应彩种信息
      this.axios.post('/front/dragon/list.do', {
        type: this.types
      })
        .then((re) => {
          if (re.code === 0) {
            let reData = re.data
            let reDataLeng = reData.length
            let lotteryArr = this.Utils.Storage.get('lotteryArr')
            if (lotteryArr) {
              let lotteryArrLength = lotteryArr.length
              for (let j = 0; j < reDataLeng; j++) {
                for (let k = 0; k < lotteryArrLength; k++) {
                  if (reData[j].lotteryId === lotteryArr[k].lotteryId) {
                    reData[j].url = lotteryArr[k].URL
                  }
                }
              }
              this.getTimes(reData)
            } else {
              this.axios.get('/front/lottery/sixmark_attribute.do')
                .then((lotteryData) => {
                  if (lotteryData.code === 0) {
                    let lottery = lotteryData.rows
                    let lotteryLeng = lottery.length
                    for (let j = 0; j < reDataLeng; j++) {
                      for (let k = 0; k < lotteryLeng; k++) {
                        if (reData[j].lotteryId === lottery[k].lotteryId) {
                          reData[j].url = lottery[k].URL
                        }
                      }
                    }
                    this.Utils.Storage.save('lotteryArr', reData)
                    this.getTimes(reData)
                  }
                })
                .catch(() => {})
            }
          }
        })
        .catch(() => {})
    },
    resetTime (listData) { // 倒计时结束 重新获取系列里,单个小彩种的信息
      // this.axios.post('/front/lottery/draw_info.do', {
      //   lotteryId: listData.lotteryId
      // })
      //   .then((res) => {
      //     if (res.code === 0) {
      //       let data = res.data
      //       clearInterval(listData.timer)
      //       listData.content = listData.playNumbers.split(',')
      //       listData.timeContent = false
      //       listData.currentIssue = data.currentIssue
      //       listData.time = (Number(data.deadline) - Number(res.system_time)) / 1000
      //       if (data.lastLuckyNumbers.indexOf('正在开奖') > -1) {
      //         console.log('正在开奖')
      //         listData.timeContent = '正在开奖...'
      //         this.betInfo = null
      //         setTimeout(() => {
      //           this.resetTime(listData)
      //         }, 6000)
      //       } else {
      //         listData.timer = setInterval(() => {
      //           listData.time = listData.time - 1
      //           if (listData.time < 1) {
      //             clearInterval(listData.timer)
      //             this.getLottery()
      //             // this.resetTime(listData)
      //           }
      //         }, 1000)
      //         // this.getLottery()
      //       }
      //     }
      //   })
    },
    getTimes (listData) { // 获取到彩种id后.  传入id获得彩种信息lotteryIds: '1,2,3,4'
      let lotteryIds = ''
      this.timeData = listData
      let listLength = this.timeData.length
      for (let j = 0; j < listLength; j++) { // 获取彩种id
        lotteryIds += listData[j].lotteryId + ','
      }
      if (this.timeData && this.timeData.length <= 0) {
        return
      }
      this.axios.post('/front/lottery/draw_infos.do', {
        lotteryIds: lotteryIds
      })
        .then((res) => {
          if (res.code === 0) {
            let data = res.data
            let dataLeng = data.length
            if (dataLeng <= 0) {
              return
            }
            for (let i = 0; i < dataLeng; i++) {
              for (let j = 0; j < listLength; j++) {
                if (data[i].lotteryId === this.timeData[j].lotteryId) { // 拿到draw_infos的期数和倒计时
                  clearInterval(this.timeData[j].timer)
                  this.timeData[j].content = this.timeData[j].playNumbers.split(',')
                  this.timeData[j].timeContent = false
                  this.timeData[j].time = parseInt((Number(data[i].deadline) - Number(res.system_time)) / 1000)
                  if (data[i].lastLuckyNumbers.indexOf('正在开奖') > -1) {
                    // console.log('正在开奖')
                    this.timeData[j].timeContent = '正在开奖...'
                    this.timeData[j].currentIssue = data[i].lastIssue
                    if (this.betInfo && this.betInfo.lotteryId && this.betInfo.lotteryId === data[i].lotteryId) {
                      this.betInfo = null
                    }
                  } else {
                    this.timeData[j].currentIssue = data[i].currentIssue
                    this.timeData[j].timer = setInterval(() => {
                      if (this.timeData[j].time > -1) {
                        this.timeData[j].time = parseInt(this.timeData[j].time) - 1
                      }
                      if (this.timeData[j].time < 1) {
                        if (this.betInfo && this.betInfo.lotteryId && this.betInfo.lotteryId === data[i].lotteryId) {
                          this.betInfo = null
                        }
                        this.timeData[j].timeContent = '正在开奖...'
                        clearInterval(this.timeData[j].timer)
                        // this.resetTime(listData[j])
                      }
                    }, 1000)
                  }
                }
              }
            }
            this.listCon = this.timeData
          } else {
            this.listCon = []
          }
        })
        .catch(() => {})
    },
    newTimes (start) { // 获取得到后 显示的的时分秒
      let hours = parseInt(start / 60 / 60 % 24, 10)
      let minute = parseInt(start / 60 % 60, 10)
      let second = parseInt(start % 60, 10)
      hours = hours < 10 ? '0' + hours : hours
      minute = minute < 10 ? '0' + minute : minute
      second = second < 10 ? '0' + second : second
      return hours + ':' + minute + ':' + second
    },
    handleChange () {
      this.listCon = []
      this.clearInterva()
      clearInterval(this.timer)
      this.getLottery()
      this.timer = setInterval(() => {
        this.clearInterva()
        this.getLottery()
      }, 10000)
      // this.$refs.swipe.index = index // 让滑动组件的index 跟随数据
      // this.dragonListActive = index
      let contentSize = document.getElementsByClassName('content-size')
      let contentSizeLeng = contentSize.length
      for (let i = 0; i < contentSizeLeng; i++) {
        if (contentSize[i].className.indexOf('bg-col') > -1) {
          contentSize[i].className = contentSize[i].className.substring(0, (contentSize[i].className.indexOf('bg-col') - 1))
        }
      }
      this.betInfo = null // 清除点击后的数据
      // this.listCon = []
      // this.clearInterva()
      // this.types = this.dataList[index].type
      // this.getLottery()
      // this.dragonListActive = index
      // Indicator.close()
    },
    closeDragon () {
      this.clearInterva()
      clearInterval(this.timer)
      this.timer = null
      this.$emit('closeDragon')
    }
  }
}
</script>

<style scoped lang='scss'>
  .dragon{margin:0 auto;width:93%;background:#fff;border-radius:.15rem;}
  .dragon-tit{height:1.2rem;line-height:1.2rem;background:#F4F4F4;font-size:.45rem;font-weight:normal;}
  .dragonX{position:absolute;top:0;bottom:0;margin:auto 0;right:.25rem;width:.5rem;}
  .dragon_list{float:left;height:1rem;line-height:1rem;color:#333;font-size:.45rem;border-bottom: 2px solid #fff;}
  .dragon-con{height:7.7rem;font-size:.3rem;overflow:scroll;}
  .content-list{position:relative;padding:.2rem .15rem .15rem;border-top:1px solid #eee;font-size:.3rem;background:#fff;}
  .lottery-icon{display:block;margin:0 auto .15rem;width:1.2rem;}
  .content-list-times{padding-left:.15rem;max-width:3.8rem;line-height:.4rem;}
  .content-list-time{color:#D81E06;padding-top:.02rem;}
  .content-list-plays{padding:.1rem .2rem 0;color:#fff;}
  .content-list-play{padding:.1rem .15rem;border-radius:.1rem;text-align:center;display:inline-block;vertical-align:middle;}
  .content-list-play:nth-child(1){background:#BFBFBF;}
  .content-list-play:nth-child(2){margin:0 .2rem;}
  .content-list-play:nth-child(3){background:#D81E06;}
  .content-sizes{position:absolute;top:0;bottom:0;margin:auto 0;right:.15rem;height: 1.65rem;}
  .content-pay{position:relative;z-index:1;color:#D81E06;line-height:1rem;font-size:.45rem;}
  .content-size{float:left;margin-top:.12rem;height: 1.55rem;width: 1.45rem;position:relative;z-index:2;border: 1px solid #ccc;box-sizing:border-box;border-radius: .15rem;text-align: center;font-size: .25rem;color:#666;}
  .content-size:nth-child(2){margin-left:.1rem;}
  .content-size.bg-col{color:#fff;}
  .content-size.bg-col .content-pay{color:#fff;}
  .contentSizeNo,
  .contentSizeNo .content-pay{color:#ccc;}
  .dragon-con /deep/ .mint-swipe-items-wrap{overflow-y:scroll;}
  .bettings{padding:.2rem .15rem;font-size:.35rem;border-top:1px solid #eee;}
  .dragon-text{margin:0 .2rem;padding-left:.1rem;width:2.2rem;height:.8rem;line-height:.8rem;font-size:.3rem;border:1px solid #ccc;    box-sizing: border-box;}
  .dragon-betting{
    float: right;
    z-index: 1;
    font-size: .35rem;
    width: 1.6rem;
    line-height: .85rem;
    color: #fff;
    margin-right: .1rem;
    background: url(/mobile/images/dragonBtn.png) no-repeat;
    background-size: 100%;
    height: .8rem;
    border-radius: .1rem;
    overflow: hidden;}
  .swipeLoad{width:2rem;}
  .content-list-no{text-align:center;padding-top:2rem;font-size:.4rem;color:#333;}
  .yellow{background:#F8D65D;}
  .origin{background:#F09D4E;}
  .blue{background:#64BFF9;}
  .green{background:#6CD8C5;}
  .content-size-hanlder{position:absolute;left:0;top:0;z-index:100;width:100%;height:100%;}
  .mint-navbar .mint-tab-item{padding:0;}
  .mint-navbar .mint-tab-item.is-selected{border-bottom: 2px solid #D54545 !important;}
  .mint-navbar .mint-tab-item .mint-tab-item-label{ font-size: 13px !important; }
</style>
