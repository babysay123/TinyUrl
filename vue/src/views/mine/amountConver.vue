<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-06 15:34:43
 * @LastEditTime: 2019-09-21 14:56:50
 * @LastEditors: Please set LastEditors
 -->
<style lang="less">
.justify-spaceBetween {
  justify-content: space-between;
}
.amountConver {
  .orederCel{
    padding: 0 10px;
    background-color:#fff;
    text-align: right;
    color:#333;
    .order{
      border-bottom: 1px solid #eee;
      padding: 10px 0;
      font-size: 14.5px;
      text-align: left;
    }
  }
  .amountBtn:disabled{
    border-color:currentColor;
    color:#ccc;
  }
  .mint-cell-wrapper{
    background:none;
  }
  .noDatas{
    width:unset;
    font-size:.45rem;
    color:#aaa;
    img {
      width: 66%;
    }
  }
  .mint-loadmore{
    min-height: 100%;
  }
  .cell-items {
    height: 1.25rem;
    background: #fff;
    padding: 0 .4375rem;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    font-size: 14px;
  }
  input {
    &:out-of-range {
      color: rgb(238, 151, 151);
    }
  }
  .ml20 {
    margin-left: 20px;
  }
  padding-top: 1.125rem;
  // margin-bottom: 49px;
  background: #fff;
  .picker-toolbar {
    min-height: 2rem;
  }
  .flex {
    display: flex;
    .justify-spaceBetween;
  }
  .mint-navbar.is-fixed {
    top: 1.125rem;
  }
  .mint-navbar .mint-tab-item {
    padding: 0;
    height: 35px;
    line-height: 35px;
  }
  .mint-tab-container {
    background: #f5f4f9;
    padding-top: 36px;
  }
  .cell {
    margin: 0.375rem 0;
  }
  .inputAmount {
    background: white;
    padding: 25px 0.4375rem;
    color: rgb(102, 102, 102);
    .big {
      font-size: initial;
    }
    .mr5 {
      margin-right: 5px;
    }
    small {
      font-size: smaller;
    }
    .inputNumber {
      .mint-cell-wrapper {
        border-bottom: 1px solid #eee;
      }
      .mint-cell-title {
        width: 1em;
        font-size: x-large;
      }
      .initColor {
        color: rgb(199, 199, 205);
      }
      .submitBtn {
        margin: 30px 20px;
        .redBtn{
          width: 100%;
          margin: 0;
        }
      }
    }
  }
  .refreshBtn {
    margin-left: 20px;
    padding: 4px 8px;
    border-radius: 5px;
    border: 1px solid currentColor;
    font-size: smaller;
    min-width: 4em;
    vertical-align: middle;
  }
  .amountBtn {
    color: rgb(222, 47, 47);
  }
  .mint-popup {
    width: 100%;
  }
  .tabMenu {
    padding: 10px 40px;
    font-size: 0.5126875rem;
    span {
      cursor: pointer;
    }
  }
  .amountItems {
    .icon {
      margin: 0 10px;
    }
    .title {
      line-height: 2em;
    }
    .result {
      min-width: 3em;
    }
    .cell_left {
      flex: 1;
    }
    .text_center {
      text-align: center;
    }
    .text_left{
      text-align: left;
    }
    .text_right{
      text-align: right;
    }
  }
  .flex-col {
    flex-direction: column;
  }
  small,
  time,
  .small {
    font-size: smaller;
    margin: 5px 0 0;
  }
  .text_black {
    color: #333;
  }
  .text_gray {
    color: #9c9a9a;
  }
  .text_red {
    color: #de2f2f;
    letter-spacing: 1px;
  }
  .converLog {
    margin-top: 0.375rem;
    // height:100vh;
    height: calc(100% - 1.125rem - 35px);
    // height:calc(var(--vh, 1vh) * 100);
    position: fixed;
    overflow-y: auto;
    padding-bottom: 1.125rem;
    left: 0;
    right: 0;
  }
  .bettingInput{
    margin: 0 5px;
  }
}
.reminder{
  position: fixed;
  top: 40%;
  left: 10%;
  width: 80%;
  background: #d9d9d9;
  border-radius: 4px;
  overflow: hidden;
  p{
    width: 80%;
    margin: auto;
    text-align: center;
    height: 1rem;
    line-height: 1rem;
    font-size: 15px;
  }
}
.reminder-title{
  width: 100%;
  height: .6rem;
  line-height: .6rem;
  background: #aaa;
  font-size: 15px;
  span{
    margin-left: 75%;
    font-size: 17px;
  }
}
.reminder-amount{
  width: 100%;
  text-align: center;
  input{
    border: #000 1px solid;
    background: #fff;
    border-radius: 4px;
    height: .5rem;
  }
}
.reminder-btn{
  width: 100%;
  height: 1.7rem;
  line-height: 1.7rem;
  text-align: center;
  button{
    width: 20%;
    height: .6rem;
  }
  .reminder-btn-qr{
    background: rgba(22, 155, 213, 1);
    border-radius: 5px;
    margin-right: 5px;
  }
  .reminder-btn-qx{
    background: #fff;
    border: #333 1px solid;
    border-radius: 5px;
    margin-left: 5px;
  }
}
</style>
<template>
  <section class="amountConver">
    <Head :backHandler="backHandler" fixed>
      <h3>额度转换</h3>
    </Head>
    <div>
      <mt-navbar v-model="tabs" fixed>
        <mt-tab-item v-for="(l, index) in navTabs" :key="index" :id="index">{{ l.title }}</mt-tab-item>
      </mt-navbar>
      <mt-tab-container v-model="tabs">
        <mt-tab-container-item :id="0">
          <!-- 转入转出 -->
          <Cell>
            <div class="cell-items" @click="showPicker(0)">
              <span class="cell-items-title">平台转出</span>
              <div>
                {{amountOutputVal.title}}
                <i class="fa fa-angle-right fa-lg text-gray"></i>
              </div>
            </div>

            <div class="cell-items" @click="showPicker(1)">
              <span class="cell-items-title">平台转入</span>

              <div>
                {{amountInputVal.title}}
                <i class="fa fa-angle-right fa-lg text-gray"></i>
              </div>
            </div>
          </Cell>
          <!-- input 输入选择 -->
          <section class="inputAmount">
            <div class="flex">
              <span class="big">转换额度</span>
              <small>
                <i class="fa fa-info-circle mr5" aria-hidden="true"></i>
                <span>请输入金额</span>
              </small>
            </div>
            <div class="inputNumber">
              <mt-field
                class="verifyAmountVal"
                label="¥"
                placeholder="0"
                type="number"
                :attr="{ max: maxConverVal, min:0 }"
                v-model="amountVal"
                @input.native="clearNoNum($event)"
              ></mt-field>
              <div class='submitBtn'>
                <button ref="submitBtn" class="redBtn" :disabled='disabledSubmit' @click="onChangeAmount">确定转换</button>
              </div>
            </div>
          </section>
          <!-- 平台列表 -->
          <Cell>
            <CellItems v-for="(item, i) in amountCell" :key="i" :title="item.platformName">
              <span slot="right" class="amountBtn">{{item.canUsingMoney }}</span>
              <span slot="arrow">
                <button @click="onRefreshSingle(item.platformCode,i,$event)" class="refreshBtn amountBtn">刷新</button>
              </span>
            </CellItems>
          </Cell>
          <mt-popup
            v-model="showPickerPop"
            position="bottom"
            modal="true"
            :closeOnClickModal="false"
          >
            <mt-picker :showToolbar="true" :slots="platforms" valueKey="title" @change="changeVal">
              <div class="tabMenu flex amountBtn">
                <span @click="closePop">取消</span>
                <span @click="onplatformchange">确定</span>
              </div>
            </mt-picker>
          </mt-popup>
        </mt-tab-container-item>
        <mt-tab-container-item :id="1">
          <div
            class="converLog"
            v-infinite-scroll="loadConverLogBottom"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="10"
          >
            <mt-loadmore :top-method="loadConverLogTop" :auto-fill="false" ref="loadmore">
              <div class='noDatas tc' v-if='noAmountConverLogsData'>
              <img src="./../../assets/images/chatroom/noData.png"/>
                <br><br>
                暂无数据
              </div>
              <AmountCell
                class="amountItems"
                v-for="(item, index) in amountConverLogs"
                :key="index"
              >
                <template slot="left">
                  <div class="cell_left flex flex-col">
                    <p class="text_black">
                      <span>{{item.fromPlatformName}}</span>
                      <i class="fa fa-arrow-right icon text_gray" aria-hidden="true"></i>
                      <span>{{item.toPlatformName}}</span>
                    </p>
                    <time class="text_gray">{{item.changeTime}}</time>
                  </div>
                </template>
                <template slot="right">
                <div class="flex flex-col result text_right">
                  <span class="text_red">{{item.changeMoney}}元</span>
                  <small class="text_black">{{(item.status==1||item.status==10)?'处理中':item.status===3?'失败':item.status===100?'成功':''}}</small>
                </div>
                </template>
              </AmountCell>
              <div class="oneRoom-list fw ft0 tc" v-if="amountConverLogLoaded && !noAmountConverLogsData" style="color:#333;font-size:.35rem;margin:20px 0;" >已加载全部记录</div>
            </mt-loadmore>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item :id="2">
          <div
            class="converLog"
          v-infinite-scroll="loadBettingBottom"
            infinite-scroll-disabled="loadingBetting"
            infinite-scroll-distance="10"
          >
          <mt-loadmore :top-method="loadBettingTop" :auto-fill="false" ref="loadBettingmore">
            <div class='noDatas tc' v-if="noBettingLogsData">
              <img src="./../../assets/images/chatroom/noData.png"/>
                <br><br>
                暂无数据
              </div>
              <div v-for="(item, index) in bettingLogs" :key="index">
                <div class="orederCel">
                  <p class="order">单号：{{item.gameId}}</p>
                </div>
                <AmountCell class="amountItems">
                  <template slot="left">
                    <div class="cell_left flex">
                      <div class="flex-col flex betting">
                        <p class="text_black">
                          <span>{{item.gamePlatformName.split('-')[0]}}</span>
                        </p>
                        <p class="text_black">
                          <span>{{item.gamePlatformName.split('-')[1]}}</span>
                        </p>
                        <time class="text_gray">{{item.gameStartTime}}</time>
                      </div>
                    </div>
                  </template>
                  <template slot="middle">
                      <div class="flex flex-col bettingInput text_right">
                        <span class="text_black">投注</span>
                        <p class="text_black">&nbsp;</p>
                        <small class="text_red">{{item.allBet}}元</small>
                      </div>
                  </template>
                  <template slot="right">
                    <div class="flex flex-col result text_right">
                      <span class="text_black">奖金</span>
                      <p class="text_black">&nbsp;</p>
                      <small class="text_red">{{item.profit}}元</small>
                    </div>
                  </template>
                </AmountCell>
              </div>
            <div class="oneRoom-list fw ft0 tc" v-if="bettingLogLoaded && !noBettingLogsData" style="color:#333;font-size:.35rem;margin:20px 0;" >已加载全部记录</div>
          </mt-loadmore>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <!-- <div class="reminder" v-if="remindershow">
      <div class="reminder-title">友情提示<span @click="reminderclose">X</span></div>
      <p>可用余额不足，是否启用余额宝余额？</p>
      <div class="reminder-amount">启用金额：<input placeholder="请输入转入额度" v-model="balanceamount"></div>
      <div class="reminder-btn"><button class="reminder-btn-qr" @click="reminderqr">确定</button><button class="reminder-btn-qx" @click="reminderclose">取消</button></div>
    </div> -->
  </section>
</template>
<script>
import AmountCell from 'Components/mine/amountCell'
import Head from 'Components/global/head_new'
import Cell from 'Components/global/cell'
import CellItems from 'Components/global/cellItems'
import Popup from 'Components/global/popup'
import { mapState, mapGetters, mapActions } from 'vuex'
import { changeMoneyAmount } from 'Plugins/api'
import { Toast } from 'mint-ui'
export default {
  components: {
    Head,
    Cell,
    CellItems,
    Popup,
    AmountCell
  },
  data () {
    return {
      navTabs: [
        {
          title: '转换额度'
        },
        {
          title: '转换记录'
        },
        {
          title: '投注记录'
        }
      ],
      converCell: [
        {
          title: '平台转出'
        },
        {
          title: '平台转入'
        }
      ],
      tabs: 0,
      showPickerPop: false,
      showPickerState: -1,
      amountInputVal: {},
      amountOutputVal: {},
      amountVal: null,
      maxConverVal: 0,
      picker: null,
      currentPicker: '',
      amountConverPageIndex: 0,
      bettingLogPageIndex: 1,
      loading: false,
      loadingBetting: false,
      disabledSubmit: true,
      noBettingLogsData: false,
      noAmountConverLogsData: false,
      remindershow: false,
      balanceamount: null
    }
  },
  watch: {
    tabs (val) {
      if (val === 1) {
        this.amountConverPageIndex = 0
        this.noAmountConverLogsData = false
        this.loadAmountConverLog()
      } else if (val === 2) {
        this.bettingLogPageIndex = 1
        this.noBettingLogsData = false
        this.loadBettingLog()
      }
    },
    signErrorData: function (val) {
      if (val) {
        this.routerLink({ path: '/login' })
      }
    },
    // 判断当前是否可点击提交数据
    amountVal (val) {
      if (this.amountInputVal.platformName === '泛亚电竞' || this.amountOutputVal.platformName === '泛亚电竞') {
        var amountVal = this.amountVal + ''
        if (this.amountVal === null && amountVal.indexOf('.') > -1) {
          this.disabledSubmit = true
        } else {
          if ((!val || (val * 1) <= 0) || (this.amountInputVal.platformName === this.amountOutputVal.platformName || this.amountOutputVal.canUsingMoney <= 0)) {
            this.$refs.submitBtn.setAttribute('disabled', 'disabled')
            return
          }
          this.$refs.submitBtn.removeAttribute('disabled')
        }
      } else {
        if ((!val || (val * 1) <= 0) || (this.amountInputVal.platformName === this.amountOutputVal.platformName || this.amountOutputVal.canUsingMoney <= 0)) {
          this.$refs.submitBtn.setAttribute('disabled', 'disabled')
          return
        }
        this.$refs.submitBtn.removeAttribute('disabled')
      }
    }
  },
  computed: {
    ...mapState({
      amountCell: state => state.amount.amountCell,
      amountConverLogs: state => state.amount.amountConverLogs,
      amountConverLogLoaded: state => state.amount.amountConverLogLoaded,
      bettingLogs: state => state.amount.bettingLogs,
      bettingLogLoaded: state => state.amount.bettingLogLoaded,
      signErrorData: state => state.amount.signErrorData
    }),
    ...mapGetters(['platforms'])
  },
  mounted () {
    let u = this.Utils.Storage.get('user')
    let sid = this.Utils.Storage.get('sessionid')
    if (!u || !sid || u === undefined || u === null || !u.account) {
      this.routerLink({ path: '/login' })
    }
    this.getAmountCellData()
    this.$store.commit('updateDataStatus', false)
  },
  methods: {
    ...mapActions([
      'onplatformchange',
      'getAmountAvailableData',
      'getAmountCellData'
    ]),
    reminderqr () {
      if (/((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/.test(this.balanceamount)) {
        this.axios.post('/interest/rate/withdrawal.do', { 'amount': this.balanceamount }).then(res => {
          if (res.code === 0) {
            this.remindershow = false
            Toast(res.code)
            window.reload()
          }
        })
      }
    },
    backHandler () {
      window.history.back()
    },
    reminderclose () {
      this.remindershow = false
    },
    // 格式化输入额度值
    clearNoNum (event) {
      console.log(event.target.value, '')
      const obj = event.target
      obj.value = obj.value.replace(/[^\d.]/g, '') // 清除“数字”和“.”以外的字符
      obj.value = obj.value.replace(/\.{2,}/g, '.') // 只保留第一个. 清除多余的
      obj.value = obj.value.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
      // eslint-disable-next-line no-useless-escape
      obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3')// 只能输入两个小数
      if (obj.value.indexOf('.') < 0 && obj.value !== '') { // 以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
        obj.value = parseFloat(obj.value)
      }
      this.amountVal = obj.value
      if (this.amountInputVal.platformName === '泛亚电竞' || this.amountOutputVal.platformName === '泛亚电竞') {
        if (obj.value.indexOf('.') > -1) {
          this.disabledSubmit = true
        } else {
          this.disabledSubmit = false
        }
      }
      console.log(this.amountInputVal.platformName, Number.isInteger(Number(this.amountVal)), typeof (this.amountVal))
    },
    // 滚动加载投注记录
    async loadBettingBottom () {
      if (this.bettingLogLoaded || this.tabs !== 2) return
      this.loadingBetting = true
      await this.loadBettingLog()
      this.loadingBetting = false
    },
    // 加载投注记录
    async loadBettingLog () {
      await this.$store.dispatch('getBettingLogs', { offset: (this.bettingLogPageIndex - 1) * 10, count: 30 })
      if (this.bettingLogs.length === 0) {
        this.noBettingLogsData = true
      }
      this.$refs.loadBettingmore && this.$refs.loadBettingmore.onTopLoaded()
      this.bettingLogPageIndex++
    },
    // 加载投注记录下拉刷新
    loadBettingTop () {
      this.bettingLogPageIndex = 1
      this.loadBettingLog()
    },
    // 加载更多转换数据
    async loadConverLogBottom () {
      if (this.amountConverLogLoaded || this.tabs !== 1) return
      this.loading = true
      await this.loadAmountConverLog()
      this.loading = false
    },
    // 下拉刷新
    loadConverLogTop () {
      this.amountConverPageIndex = 0
      this.loadAmountConverLog()
    },
    // 加载转换记录
    async loadAmountConverLog () {
      await this.$store.dispatch('getAmountConverLogs', {
        pageIndex: this.amountConverPageIndex,
        pageSize: 30
      })
      if (this.amountConverLogs.length === 0) {
        this.noAmountConverLogsData = true
      }
      this.$refs.loadmore && this.$refs.loadmore.onTopLoaded()
      this.amountConverPageIndex++
    },
    // 不符合时禁止点击转换按钮
    isDisabled () {
      if (this.amountInputVal.platformName === '泛亚电竞' || this.amountOutputVal.platformName === '泛亚电竞') {
        if (this.amountVal === null) {
          this.disabledSubmit = true
        } else {
          var amountVal = this.amountVal + ''
          if (amountVal.indexOf('.') > -1) {
            this.disabledSubmit = true
          } else {
            if ((this.showPickerState === 1 && this.currentPicker.platformName === this.amountOutputVal.platformName) || (this.showPickerState === 0 && this.currentPicker.platformName === this.amountInputVal.platformName) || this.amountOutputVal.canUsingMoney <= 0) {
            // Toast('请选择不同平台')
              this.$refs.submitBtn.setAttribute('disabled', 'disabled')
            } else if (this.amountInputVal.platformName !== this.amountOutputVal.platformName && this.amountVal) {
              this.$refs.submitBtn.removeAttribute('disabled')
            }
          }
        }
      } else {
        if ((this.showPickerState === 1 && this.currentPicker.platformName === this.amountOutputVal.platformName) || (this.showPickerState === 0 && this.currentPicker.platformName === this.amountInputVal.platformName) || this.amountOutputVal.canUsingMoney <= 0) {
          // Toast('请选择不同平台')
          this.$refs.submitBtn.setAttribute('disabled', 'disabled')
        } else if (this.amountInputVal.platformName !== this.amountOutputVal.platformName && this.amountVal) {
          this.$refs.submitBtn.removeAttribute('disabled')
        }
      }
    },
    // 关闭弹窗
    closePop () {
      this.setAmountConverModelVal()
      this.isDisabled()
    },
    // 设置转换的值
    setAmountConverModelVal () {
      if (!this.currentPicker) return
      this.showPickerState === 1
        ? (this.amountInputVal = this.currentPicker)
        : (this.amountOutputVal = this.currentPicker)
      this.showPickerPop = false
      this.setMaxVal()
    },
    setMaxVal () {
      this.maxConverVal = Math.min(this.amountOutputVal.canUsingMoney, 9999999.99)
    },
    /**
     * 在弹出picker后点击确定按钮时触发
     */
    onplatformchange () {
      let currentTitle = this.platforms[0].values[0]
      this.currentPicker = this.currentPicker || currentTitle
      this.isDisabled()
      this.setAmountConverModelVal()
    },
    // picker改变时展示数据
    changeVal (picker, val) {
      if (this.amountInputVal.platformName === '泛亚电竞' || this.amountOutputVal.platformName === '泛亚电竞') {
        if (this.amountVal === null) {
          if (!this.showPickerPop) return
          this.picker = picker
          val = val[0]
          this.currentPicker = val
          this.showPickerState === 1
            ? (this.amountInputVal = val)
            : (this.amountOutputVal = val || {})
          if (this.amountInputVal.platformName === this.amountOutputVal.platformName) {
            this.disabledSubmit = true
          }
          return
        }
        if (this.amountVal.indexOf('.') > -1) {
          this.disabledSubmit = true
          if (!this.showPickerPop) return
          this.picker = picker
          val = val[0]
          this.currentPicker = val
          this.showPickerState === 1
            ? (this.amountInputVal = val)
            : (this.amountOutputVal = val || {})
        } else {
          if (!this.showPickerPop) return
          this.picker = picker
          val = val[0]
          this.currentPicker = val
          this.showPickerState === 1
            ? (this.amountInputVal = val)
            : (this.amountOutputVal = val || {})
          if (this.amountInputVal.platformName === this.amountOutputVal.platformName) {
            this.disabledSubmit = true
          }
        }
      } else {
        this.amountVal = null
        if (!this.showPickerPop) return
        this.picker = picker
        val = val[0]
        this.currentPicker = val
        this.showPickerState === 1
          ? (this.amountInputVal = val)
          : (this.amountOutputVal = val || {})
        if (this.amountInputVal.platformName === this.amountOutputVal.platformName) {
          this.disabledSubmit = true
        }
      }
    },
    // 显示picker选择
    showPicker (state) {
      if (this.platforms.length <= 0) {
        Toast('平台信息加载中')
        return false
      }
      this.currentPicker = this.currentPicker || this.platforms[0].values[0]
      this.showPickerState = state
      this.showPickerPop = true
    },
    // 刷新当前平台数据
    async onRefreshSingle (code, i, event) {
      const params = { code: code, index: i }
      await this.$store.dispatch('getAmountCellSingle', params)
      if (this.signErrorData) {
        this.routerLink({ path: '/login' })
        return
      }
      this.setMaxVal()
      let currentBtn = event.target
      currentBtn.setAttribute('disabled', true)
      let num = 30
      currentBtn.innerHTML = --num + 's'
      let currentInter = setInterval(() => {
        num--
        currentBtn.innerHTML = num + 's'
        if (num <= 0) {
          currentBtn.removeAttribute('disabled')
          currentBtn.innerHTML = '刷新'
          clearInterval(currentInter)
        }
      }, 1000)
    },
    // 提交转换数据
    async onChangeAmount () {
      if (this.amountInputVal.title === undefined) {
        Toast('请选择转入平台')
        return
      }
      if (this.amountOutputVal.title === undefined) {
        Toast('请选择转出平台')
        return
      }
      if (this.amountInputVal.platformName === this.amountOutputVal.platformName) {
        Toast('请选择不同平台进行转换')
        return false
      }
      if (this.amountVal > this.maxConverVal) {
        this.amountVal = parseFloat(this.maxConverVal.toFixed(3).slice(0, -1))
        if (this.amountVal >= 9999999.99) {
          Toast('单次最大转出额度不超过1千万')
          return
        }
        // else {
        //   this.remindershow = true
        //   // Toast(`超过平台最大转出额度`)
        //   return
        // }
      }
      let params = {
        changeMoney: this.amountVal * 1,
        fromPlatformName: this.amountOutputVal.platformName,
        fromPlatformCode: this.amountOutputVal.platformCode,
        toPlatformName: this.amountInputVal.platformName,
        toPlatformCode: this.amountInputVal.platformCode
      }
      const res = await changeMoneyAmount(params)
      if (res.code === 0) {
        Toast({
          message: '转换成功'
        })
        this.amountVal = null
        const resData = res.data
        console.log('resData', resData)
        Object.assign(this.amountInputVal, {
          title: resData.toPlatformName + ' ' + resData.toCanUsingMoney,
          canUsingMoney: resData.toCanUsingMoney }
        )
        Object.assign(this.amountOutputVal, {
          title: resData.fromPlatformName + ' ' + resData.fromCanUsingMoney,
          canUsingMoney: resData.fromCanUsingMoney }
        )
        this.$store.commit('updateAmountCell', [this.amountInputVal, this.amountOutputVal])
        this.setMaxVal()
      } else if (res.code === 1) {
        Toast({
          message: '正在处理中'
        })
        return
      } else if (res.code === 3) {
        Toast({
          message: '上分失败'
        })
        return
      } else if (res.code === -1) {
        this.remindershow = true
        return
      }
      if (res.code === 300) {
        this.routerLink({ path: '/login' })
      }
      setTimeout(() => {
        location.reload()
      }, 2000)
    }
  }
}
</script>
