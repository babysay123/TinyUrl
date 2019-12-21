<!--
 * @Author: your name
 * @Date: 2019-10-28 16:26:47
 * @LastEditTime: 2019-11-13 20:00:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /d:\cp8h5\cp8h5\vue\src\views\generalize\subordinate.vue
 -->
<template>
  <section>
  <Head :back="true" fixed>
    <div class="subordinate">
      <a
        class="title"
        :class="{active: headAcitve === 0}"
        @click="headAcitve = 0, openShow = false, codeShow = true, listPage.offset = 0"
      >
        邀请管理
      </a>
      <a
        class="title"
        :class="{active: headAcitve === 1}"
        @click="headAcitve = 1, openShow = true, codeShow = false"
      >
        下级开户
      </a>
    </div>
  </Head>

  <div class="wrap scr scr-after-head" id="page-wrapper"  style="margin-top: 1.125rem;">
      <!-- <com-header href='javascript:history.back(1)' :head="true">
          <div class="subordinate">
              <a class="title" :class="{active: headAcitve === 0}" @click="headAcitve = 0, openShow = true, codeShow = false">下级开户</a>
              <a class="title" :class="{active: headAcitve === 1}" @click="headAcitve = 1, openShow = false, codeShow = true">邀请管理</a>
          </div>
      </com-header> -->
      <!-- <header id="header" class="head bg-col fixed">
          <a  class="back head-back" href="javascript:history.back(1)" ><i class="fa fa-angle-left fa-2x"></i></a>
          <div class="subordinate">
              <a class="title" :class="{active: headAcitve === 0}" @click="headAcitve = 0, openShow = true, codeShow = false">下级开户</a>
              <a class="title" :class="{active: headAcitve === 1}" @click="headAcitve = 1, openShow = false, codeShow = true, listPage.offset = 0">邀请管理</a>
          </div>
      </header> -->
      <section class="main creatAccount" v-if="openShow">
        <!-- <div class="creatAccountTitle radio">
            <span>开户类型</span>
            <p class="creatAccountInput">
                <input type="radio" name="radio" value="1" checked class="radioi" id="radio1" v-model="userType">
                <label for="radio1" class="radio-label">代理类型</label>
            </p>
            <p class="creatAccountInput">
                <input type="radio" name="radio" value="0" class="radioi" id="radio2" v-model="userType">
                <label for="radio2" class="radio-label">玩家类型</label>
            </p>
        </div> -->
        <div class="creatAccountExplain">请先为下级设置返点，<span @click="lookCommission" class="creatAccountExplainLink">点击查看返点赔率表</span></div>
        <section class="lotterys-bg">
          <ul class="fw">
            <li class="lottery" v-for="(share, inx) in shareLotterys" :key="inx">
              {{share.title}}
              <input
                type="text"
                class="lottery-text"
                maxlength="5"
                :placeholder="share.holderLottery"
                v-model="share.value"
              >
            </li>
          </ul>
          <a href="javascript:void(0);" class="invite bg-col" @click="empty">清空</a>
          <a href="javascript:void(0);" class="invite bg-col" @click="submit">生成邀请码</a>
        </section>
      </section>
      <section class="main creatAccount" v-if="codeShow">
          <!-- <div class="creatAccountTitle radio">
              <span>开户类型</span>
              <p class="creatAccountInput" >
                  <input type="radio" name="radio" checked value="1" class="radioi" id="radio3" v-model="userTypes">
                  <label for="radio3" class="radio-label">代理类型</label>
              </p>
              <p class="creatAccountInput" >
                  <input type="radio" name="radio" value="0" class="radioi" id="radio4" v-model="userTypes">
                  <label for="radio4" class="radio-label">玩家类型</label>
              </p>
          </div> -->
          <section class="">
              <div class="code-titles code-titles1" v-pre>
                  <span class="code-title">邀请码</span>
                  <span class="code-title">生成时间</span>
                  <span class="code-title">状态</span>
                  <span class="code-title">操作</span>
              </div>

              <div class="fw w100 code-lists" v-if="codeList.length > 0">
                <div
                  class="drop-down"
                  v-infinite-scroll="loadMore"
                  :infinite-scroll-disabled="infinite"
                  :infinite-scroll-distance="10">
                  <div
                      class="code-titles code-titles-fff"
                      v-for="(item, index) in codeList"
                      :key="index"
                      @click="clickHandel(item.id, index, item.generalizeLink,item.remark)"
                  >
                      <span class="code-title">{{item.id}}</span>
                      <span class="code-title">{{item.createTime}}</span>
                      <span class="code-title">注册({{item.registerCount}})</span>
                      <span class="code-title">查看</span>
                  </div>
                </div>
                  <div class="code-title-foot" v-if="codeList.length >= listPage.total">
                      --- END ---
                  </div>
              </div>
              <div class="fw w100 code-lists" v-if="codeList.length <= 0">
                  <img src="/mobile/images/mine/face_no_game.png" alt="img" class="blank">
                  <div class="code-title-foot" >
                      请前往"下级开户"设置您的下级邀请码
                  </div>
              </div>
          </section>

          <section class="footer-layer-bg" v-if="footerLayer" @click="footerLayer = false, rebateShow = false, qrcodeShow = false"></section>
          <transition name="footer">
              <section class="footer-layer" v-if="footerLayer">
                  <ul class="footer-layer-lists">
                      <li class="footer-layer-list" @click="checkQRCode">查看二维码</li>
                      <li class="footer-layer-list" id="copy" @click="clickCopy">复制推广链接</li>
                      <li class="footer-layer-list" @click="returnListDate">查看返点</li>
                      <li class="footer-layer-list" @click="deleteList" id="delete">删除邀请码</li>
                      <li class="footer-layer-list" @click="searchRemark" id="remark">备注</li>
                      <li id="codeListUrl">{{codeListUrl}}</li>
                  </ul>
                  <a class="footer-layer-btn" @click="footerLayer = false">取消</a>
              </section>
          </transition>
      </section>
  </div>
  <Popup :show="qrcodeShow" >
    <div class="bigframe" v-if="codeshow">
      <div class="code-left">
            <div class="qrcodeDisplay" id="qrcode"></div>
            <p>推广二维码(长按保存)</p>
      </div>
      <div class="code-right">
        <section class="url">{{codeListUrl}}</section>
        <span @click="clickCopy">复制</span>
        <div>
          <p>分享到</p>
          <ul>
            <li v-for="(img, index) in imgurl" :key="index + img.url" @click="skipRouse(img)">
              <img :src="img.url" alt="">
            </li>
          </ul>
        </div>
      </div>
    </div>
      <div class="rebates" v-if="rebateShow">
        <ul>
          <li v-for="(item,index) in returnList" :key="index">
            <span>{{item.lottery}}：</span>
            <span>{{item.share}}</span>
          </li>
        </ul>
      </div>
      <!-- 备注 -->
      <div class="remark"  v-if="remarkAlert">
        <textarea placeholder="请输入备注" id="remarkCon" v-model="remarkval"></textarea>
        <div @click="updateRemark">确认</div>
      </div>
      <!-- 删除 -->
      <div class="delete" v-if="del">
        <div>
          确定删除该邀请码吗?
        </div>
        <p>
          <a @click="close">取消</a>
          <a @click="delebtn">确定</a>
        </p>
      </div>
  </Popup>
  <Popup :show="commissio" title="返点赔率表" >
    <div class="commissio" v-if="commissio">
        <nav class="fw tc ft0">
          <a
              class="return-list"
              v-for="(list, index) in lotterys"
              :key="index"
              @touchstart="showChild(list.hash)"
          >
              <img :src="list.icon" class="return-list-icon">
              {{list.title}}
          </a>
        </nav>
      </div>
  </popup>
  <textarea id="input" ></textarea>
  </section>
</template>

<script>
import Head from 'Components/global/head'
import { LotteryShare, ShareList, CodeList, LotteryShareUpdate, LotteryShareDelete } from 'Plugins/api'
import Popup from './popup.vue'
import { Toast } from 'mint-ui'
// import layer from 'vue-layer'
import QRCode from 'qrcodejs2'

export default {
  name: 'subordinate',
  components: { Popup, Head },
  data () {
    return {
      isAll: false,
      infinite: true,
      del: false,
      codeshow: false,
      remarkval: null,
      // sscVal: null, // 时时彩
      // k3Val: null, // 快三
      // x5Val: null, // 11选5
      // pl3Val: null, // 排列三
      // pk10Val: null, // pk10
      // lhcVal: null, // 六合彩
      // pcddVal: null,  // pc蛋蛋
      userType: '1', // 下级开户的  区分玩家和代理  1是代理 0 是玩家
      openShow: false,
      codeShow: true,
      headAcitve: 0,
      codeList: [], // 邀请码数据
      returnList: [], // 点击列表 查看返点的数据
      codeListUrl: null, // 推广连接
      footerLayer: false, // 底部弹窗
      deleteId: null, // 要删除的 邀请码列表 详情id
      deleteIndex: null,
      rebateShow: false,
      allLoaded: false,
      qrcodeShow: false,
      headShow: false, // 导航头部显示控制
      userTypes: '1', // 邀请码管理的  区分玩家和代理  1是代理 0 是玩家
      listPage: { // ajax传参
        count: 20,
        offset: 0,
        total: 0,
        page: 1,
        role: 1
      },
      shareCodes: [],
      shareLotterys: [
        { title: '时时彩', value: null, lotteryClassName: 'FrequentLottery', holderLottery: '自身返点0.0，可设置返点0.0-0.0', share: 0 },
        { title: '快3', value: null, lotteryClassName: 'QuickThree', holderLottery: '自身返点0.0，可设置返点0.0-0.0', share: 0 },
        { title: '11选5', value: null, lotteryClassName: 'ElevenPickFive', holderLottery: '自身返点0.0，可设置返点0.0-0.0', share: 0 },
        { title: '排列3', value: null, lotteryClassName: 'Three', holderLottery: '自身返点0.0，可设置返点0.0-0.0', share: 0 },
        { title: '快乐8', value: null, lotteryClassName: 'PCEggs', holderLottery: '自身返点0.0，可设置返点0.0-0.0', share: 0 },
        { title: 'PK10', value: null, lotteryClassName: 'PK10', holderLottery: '自身返点0.0，可设置返点0.0-0.0', share: 0 },
        { title: '六合彩', value: null, lotteryClassName: 'SixMark', holderLottery: '自身返点0.0，可设置返点0.0-0.0', share: 0 },
        { title: '七星彩', value: null, lotteryClassName: 'SevenStar', holderLottery: '自身返点0.0，可设置返点0.0-0.0', share: 0 }
      ],
      // holderLottery: "自身返点9.0，可设置返点0.0-9.0",
      distance: 3, // 上拉刷新 滑动距离,
      remark: '',
      imgurl: [
        { url: '/mobile/images/agent/icon_qq.png', value: 'mqq://', type: 'qq' },
        { url: '/mobile/images/agent/icon_round.png', value: 'weixin://', type: 'wx' },
        { url: '/mobile/images/agent/icon_weixin.png', value: 'weixin://', type: 'wxRound' }
      ],
      commissio: false,
      remarkAlert: false
    }
  },
  computed: {
    lotterys () {
      return [
        { hash: 'ssc', icon: '/mobile/images/agent/return1.png', title: '时时彩' },
        { hash: '11x5', icon: '/mobile/images/agent/return5.png', title: '11选5' },
        { hash: 'kl8', icon: '/mobile/images/agent/return7.png', title: '快乐8' },
        { hash: 'k3', icon: '/mobile/images/agent/return4.png', title: '快3' },
        { hash: 'lhc', icon: '/mobile/images/agent/return10.png', title: '六合彩' },
        { hash: 'pl3', icon: '/mobile/images/agent/return6.png', title: '排列3' },
        { hash: 'bjsc', icon: '/mobile/images/agent/return8.png', title: '北京赛车' },
        { hash: 'qxc', icon: '/mobile/images/agent/return11.png', title: '七星彩' }
      ]
    }
  },
  // filters: {
  //     clearNoNum (e) {
  //         // e = e.replace(/^(\-)*(\d+)\.(\d).*$/,'$1$2.$3')
  //         console.log(e);
  //     }
  // },
  watch: {
    'userTypes': {
      handler () {
        // console.log(this.userTypes);
        //  监听 代理类型  和 玩家类型   1是代理  0 是玩家else
        if (this.userTypes === '1') {
          this.listPage.role = 1
          this.codeListData()
        } else {
          this.listPage.role = 0
          this.codeListData()
        }
      },
      deep: true
    },
    'shareLotterys': {
      handler () {
        // console.log(this.shareLotterys);
        for (let i = 0, len = this.shareLotterys.length; i < len; i++) {
          let _each = this.shareLotterys[i]
          _each.value = this.clearNoNum(_each.value)
        }
      },
      deep: true
    }
  },
  methods: {
    async loadMore () {
      if (!this.isAll) {
        this.infinite = false
        this.codeListData()
        this.infinite = true
      }
    },
    skipRouse (item) {
      let { value } = item
      this.clickCopy()
      window.location.href = value // 尝试打开 scheme
      var downloader = setTimeout(() => {
        Toast('跳转失败,请手动打开APP或下载后重试')
      }, 3000)
      document.addEventListener(
        'visibilitychange webkitvisibilitychange',
        function () {
          // 如果页面隐藏，推测打开scheme成功，清除提示
          if (document.hidden || document.webkitHidden) {
            clearTimeout(downloader)
          }
        }
      )
      window.addEventListener('pagehide', function () {
        clearTimeout(downloader)
      })
    },
    showChild (hash) {
      window.location = '/mobile/agent/returnExplain.html#' + hash
      // window.location = 'mobile/agents/returnExplain.html#' + hash
    },
    lookCommission () {
      this.commissio = true
    },
    guideTab () {
      var tab = +this.$route.query.tab
      var tabBool = Boolean(tab)
      this.headAcitve = tab
      this.openShow = tabBool
      this.codeShow = !tabBool
      if (!tabBool) {
        this.listPage.offeset = 0
      }
    },
    empty () {
      this.shareLotterys.map(res => {
        res.value = null
      })
    },
    submit () {
      // 表单提交的验证
      var _this = this
      var num = /[^\-?\d.]/g
      var _flag = false // 是否满足提交条件
      // if (
      //     num.test(this.sscVal) ||
      //     num.test(this.k3Val) ||
      //     num.test(this.x5Val) ||
      //     num.test(this.pl3Val) ||
      //     num.test(this.pk10Val) ||
      //     num.test(this.pcddVal) ||
      //     num.test(this.lhcVal)
      // ) {
      //     layer.open({
      //         content: '选项请填写数字',
      //         skin: 'msg',
      //         time: 2
      //     })
      //     return false
      // }
      for (var _lottery of _this.shareLotterys) {
        if (!_lottery.value || _lottery.value.length === 0 || num.test(_lottery.value)) {
          this.$toast('选项请填写数字~')
          _flag = true
          break
        }
        if (_lottery.value * 1 < _this.minRebate(_lottery.share) || _lottery.value * 1 > _lottery.share * 1) {
          this.$toast('请填写正确的返点范围~')
          _flag = true
          break
        }
      }
      if (!_flag) {
        // submit
        let _inviteData = { 'role': _this.userType }
        for (var _lottery1 of _this.shareLotterys) {
          _inviteData[_lottery1.lotteryClassName] = _lottery1.value
        }
        console.log(_inviteData, _this.shareLotterys)
        LotteryShare(_inviteData).then(res => {
          if (res.code === 0) {
            this.$toast('邀请码添加成功')
            // 清楚输入
            for (var _item of _this.shareLotterys) {
              _item.value = null
            }
            this.listPage.page = 1
            setTimeout(function () {
              // 刷新列表
              _this.codeListData()
            }, 1200)
          }
        })
      } else {
        return false
      }
    },
    // clearNoNum (e) {
    //     // 限制小数点后输入
    //     // e.target.value = e.target.value.replace(/^(\-)*(\d+)\.(\d).*$/,'$1$2.$3')
    //     console.log(e);
    // },
    clearNoNum (e) {
      if (e) {
        // console.log(e);
        e = e.replace(/[^.\d]/g, '') // 清除“数字”和“.”以外的字符
        e = e.replace(/\.{2,}/g, '.') // 只保留第一个. 清除多余的
        e = e.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
        e = e.replace(/^(\/-)*(\d+)\.(\d).*$/, '$1$2.$3')
      }
      return e
    },
    codeListData (fn) {
      var _this = this
      this.listPage.offset = (this.listPage.page - 1) * this.listPage.count
      var data = _this.listPage
      // 邀请码列表
      CodeList(data).then(res => {
        if (res.code === 0) {
          if (data.offset === 0) {
            _this.codeList = res.data
          } else {
            _this.codeList = _this.codeList.concat(res.data)
          }
          _this.listPage.total = res.total
          _this.isAll = res.data.length < data.count
          this.listPage.page++
        }
        if (typeof fn === 'function') {
          fn(res.data)
        }
      })
    },
    clickHandel (id, index, url, remark) {
      // 点击邀请码列表  获取的一系列值
      this.footerLayer = true // 显示弹出层
      this.deleteId = id
      this.deleteIndex = index
      this.codeListUrl = url
      this.remark = remark || ''
    },
    returnListDate () {
      // 查看返点  列表数据处理
      var _this = this
      _this.footerLayer = false
      this.qrcodeShow = true
      this.rebateShow = true
      var _data = { id: _this.deleteId }
      ShareList(_data).then(res => {
        this.qrcodeShow = true
        res.data.forEach(function (item) {
          for (var _share of _this.shareLotterys) {
            if (_share.lotteryClassName === item.lotteryClassName) {
              item['lottery'] = _share.title
            }
          }
        })
        _this.returnList = res.data
      })
      // global.request(
      //     'POST',
      //     '/agent/lottery_share/share_list.do',
      //     JSON.stringify(data),
      //     function (res) {
      //         res.data.forEach(function (item) {
      //             if (item.lotteryClassName === "QuickThree") item.lotteryClassName = "快3"
      //             if (item.lotteryClassName === "FrequentLottery") item.lotteryClassName = "时时彩"
      //             if (item.lotteryClassName === "ElevenPickFive") item.lotteryClassName = "11选5"
      //             if (item.lotteryClassName === "PK10") item.lotteryClassName = "北京PK10"
      //             if (item.lotteryClassName === "SixMark") item.lotteryClassName = "六合彩"
      //             if (item.lotteryClassName === "Three") item.lotteryClassName = "排列三"
      //             if (item.lotteryClassName === "PCEggs") item.lotteryClassName = "PC蛋蛋"
      //         })
      //         _this.returnList = res.data
      //     }
      // )
    },
    updateRemark () {
      var text = this.remarkval.replace(/\n/g, '<br/>').trim()
      var data = { id: this.deleteId, remark: text }
      LotteryShareUpdate(data).then(res => {
        this.remarkval = null
        this.$toast('保存成功')
        this.qrcodeShow = false
        this.remarkAlert = false
        this.listPage.page = 1
        // 重新获取列表
        setTimeout(() => {
          this.codeListData()
        }, 1200)
      })
    },
    searchRemark () {
      // var _this = this
      this.footerLayer = false
      this.qrcodeShow = true
      this.remarkAlert = true
      var _remark = this.remark.replace(/<br\/>/g, '\n')
      this.$nextTick().then(() => {
        document.getElementById('remarkCon').value = _remark
      })
      // var _remark = _this.remark.replace(/<br\/>/g, '\n')
      // // 删除 列表
      // layer.open({
      //   title: ['备注信息', 'background-color:#8dce16;color:#fff;height: 40px;line-height: 40px;'],
      //   content: "<textarea maxlength='100' style='width:100%;height:130px;' placeholder='最多可输入内容为100字' id='remarkCon' wrap='hard'></textarea>",
      //   btn: ['保存', '取消'],
      //   yes: function (index) {
      //     var text = document.getElementById('remarkCon').value.replace(/\n/g, '<br/>')
      //     var _data = { id: _this.deleteId, remark: text }
      //     console.log(_data)
      //     LotteryShareUpdate(_data).then(res => {
      //       this.$toast('保存成功')
      //       // 重新获取列表
      //       layer.close(index)
      //       setTimeout(function () {
      //         _this.codeListData()
      //         _this.footerLayer = false
      //       }, 1200)
      //     })
      //   }
      // })
      // this.$nextTick().then(() => {
      //   document.getElementById('remarkCon').value = _remark
      // })
    },
    delebtn () {
      // 删除 列表
      var data = { id: this.deleteId }
      LotteryShareDelete(data).then(res => {
        this.$toast('删除成功')
        this.qrcodeShow = false
        this.del = false
        this.listPage.page = 1
        this.codeListData()
      })
    },
    deleteList () {
      // 删除邀请码  数据处理
      this.footerLayer = false
      this.qrcodeShow = true
      this.del = true
    },
    clickCopy () {
      // 复制邀请链接
      // console.log(document.getElementsByClassName('url')[0].innerHTML, '')
      var text = this.codeListUrl
      var input = document.getElementById('input')
      input.value = text// 修改文本框的内容
      input.select() // 选中文本
      document.execCommand('copy') // 执行浏览器复制命令
      document.execCommand('copy') ? Toast('复制成功') : Toast('该浏览器不支持自动复制')
    },
    getsession (key) {
      try {
        if (!localStorage) {
          return false
        }
        var cacheVal = localStorage.getItem(key)
        // if (key == "sessionid") {
        //     // console.log(cacheVal);
        //     return cacheVal; // TODO 待优化
        // }
        var result = JSON.parse(cacheVal)
        var now = new Date() - 1
        if (!result) {
          return null
        } // 缓存不存在
        if (now > result.exp) { // 缓存过期
          this.remove(key)
          return ''
        }
        // console.log("get cache:"+key);
        return result.val
      } catch (e) {
        this.remove(key)
        return null
      }
    },
    // loadBottom () {
    //   // 上拉刷新
    //   var _this = this
    //   if (_this.codeList.length >= _this.listPage.total) {
    //     _this.allLoaded = true
    //   } else {
    //     setTimeout(function () {
    //       _this.listPage.offset += _this.listPage.count
    //       _this.codeListData(function () {
    //         _this.$refs.loadmore.onBottomLoaded() // 固定方法，查询完要调用一次，用于重新定位
    //       })
    //       // 如果没有数据了  执行  this.allLoaded = true
    //     }, 600)
    //   }
    // },
    pageContent () {
      // if (this.headShow) {
      return 'main reportForm pb2'
      // } else {
      //     return 'main reportForm pb2 notop'
      // }
    },
    close () {
      this.qrcodeShow = false
      this.codeshow = false
      this.rebateShow = false
      this.remarkAlert = false
      this.del = false
      this.commissio = false
    },
    checkQRCode () {
      let _this = this
      _this.footerLayer = false
      // codeListUrl
      if (_this.qrcodeShow) return
      _this.qrcodeShow = true
      _this.codeshow = true
      // document.getElementById('qrcode').innerHTML = ''
      // +"&id="+_this.deleteId
      this.$nextTick(() => {
        var dom = document.getElementById('qrcode')
        var qrcode = new QRCode(dom, {
          text: _this.codeListUrl,
          width: 100,
          height: 100,
          colorDark: '#000000',
          colorLight: '#ffffff',
          correctLevel: QRCode.CorrectLevel.L
        })
        console.log(qrcode, '')
      })
    },
    numFixed (num, bit = 2) {
      // 数字保留小数位数
      if (isNaN(num)) {
        return Number(0).toFixed(bit)
      } else {
        if (bit > 0) {
          if (num.toString().indexOf('.') === -1) {
            let suffix = '.'
            for (let i = 0; i < bit; i++) {
              suffix += '0'
            }
            return num + suffix
          } else {
            const splitNum = num.toString().split('.')
            if (splitNum[1].length >= bit) {
              return splitNum[0] + '.' + splitNum[1].slice(0, bit)
            } else {
              let suffix = ''
              for (let i = 0; i < bit - splitNum[1].length; i++) {
                suffix += '0'
              }
              return splitNum[0] + '.' + splitNum[1] + suffix
            }
          }
        } else {
          return Math.floor(num)
        }
      }
    },
    minRebate (share) {
      const min = share - 2
      return min > 0 ? this.numFixed(min, 1) : this.numFixed(0, 1)
    },
    isLogin (fn, no) {
      var _ts = this
      if (!no) {
        if (!this.Utils.Storage.get('user')) {
          _ts.msgs('亲，请先登录~')
          setTimeout(function () {
            window.location.href = '/mobile/studio/#/login'
          }, 1500)
          return
        }
      }
      this.axios.getOnce('/passport/check_status.do').then(res => {
        if (res.code === 0) {
          this.Utils.Storage.save('user', res.data)
          this.getUserInfo = res.data
          this.$toast({
            message: '刷新成功~',
            duration: 1800
          })
        }
      })
    }
  },
  mounted () {
    let _this = this
    _this.guideTab()
    // 页面验证登录状态
    _this.shareCodes = this.Utils.Storage.get('user').shareCodes
    if (_this.shareCodes && _this.shareCodes.length > 0) {
      // 更新返点列表和返点数
      for (let _eachLottery of _this.shareLotterys) {
        for (let _shareCode of _this.shareCodes) {
          if (_eachLottery.lotteryClassName === _shareCode.lotteryClassName) {
            _eachLottery.holderLottery = `自身返点${_shareCode.share}，可设置返点${_this.minRebate(_shareCode.share)}-${_this.numFixed(_shareCode.share, 1)}`
            _eachLottery.share = _shareCode.share
          }
        }
      }
    } else {
      this.$toast('您还不是代理，请联系客服')
    }
    // 页面的初始邀请码列表
    this.codeListData()
    if (this.getsession('X-Requested-With') === 'XMLHttpRequest') {
      _this.headShow = true
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'Assets/css/report/index.scss';
.return-list .return-list-icon {
  width: 60%;
}
.commissio .return-list {
  margin-top:8px;
  margin-left:0;
  width:20%;
  font-size: 13px;
}
.delete{
  width: 8rem;
  div{
    width: 100%;
    height: 3rem;
    text-align: center;
    line-height: 3rem;
    font-size: 15px;
  }
  p{
    a{
    width: 2.3rem;
    display: block;
    background: $baseCol;
    float: left;
    line-height: .7rem;
    color: #fff;
    border-radius: 4px;
    text-align: center;
    margin-left: 1.1rem;
    margin-bottom: .3rem;
    }
    :first-child{
      background: #979797;
    }
  }
}

.remark{
  width: 8rem;
  textarea{
    width: 100%;
    height: 2rem;
  }
  div{
    width: 1.6rem;
    height: .68rem;
    background: $baseCol;
    color: #fff;
    margin: auto;
    border-radius: 4px;
    margin-bottom: 0rem;
    font-size: 15px;
    text-align: center;
    line-height: .68rem;
  }
}
.rebates{
  width: 8rem;
  font-size: 13px;
  ul{
    width: 100%;
    display: flex;
    flex-direction: row;
     flex-wrap:wrap;
     margin: .2rem .2rem;
    li{
      width: 37%;
    text-align: right;
    line-height: .7rem;
    :nth-child(2){
      color: #ff7821;
    }
    }
  }
}
.commissio{
  width: 9rem;
  font-size: 13px;
  padding: 10px 0;
}

 #input {position: absolute;top: 0;left: 0;opacity: 0;z-index: -10;}
.bigframe{
  width: 8rem;
  .code-left{
    float: left;
    width: 40%;
    text-align: center;
    #qrcode{
     width: 2.5rem;
    height: 2.5rem;
    margin: auto;
    margin-top: .5rem;
    }
    p{
      color: #ff741a;
      line-height: 1rem;
    }
  }
  .code-right{
    float: left;
    width: 60%;
    section{
      width: 80%;
      height: .5rem;
      border: 1px solid;
      border-radius: 4px;
      margin-top: .5rem;
      margin-right: .1rem;
      line-height: .5rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      float: left;
    }
    span{
        color: #52a9eb;
    margin-left: 21px;
    font-size: 14px;
    /* padding-top: 0px; */
    display: block;
    margin-top: 20px;
    }
    p{
      margin-top: .7rem;
      font-size: 13px;
    }
    ul{
      width: 100%;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      // background-color: lightsteelblue;
      justify-content:center;
      margin-top: .2rem;
      li{
            width: 30%;
            height: 1rem;
            margin:2px;
            // background-color:lightsalmon;
          img{
           width: 63%;
          margin: auto;
          }
      }
    }
  }
}
.code-title-foot {
  background: none;
  color: rgb(186,185,190);
}
.code-lists {
  background:rgb(245,244,249)
}
</style>
