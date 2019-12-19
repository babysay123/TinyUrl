<template>
  <section class="clean-code-page">
    <Head>
      <h3>洗码</h3>
    </Head>
    <mt-navbar v-model="selected">
      <mt-tab-item
        v-for="(item, inx) in gamesCompany"
        :key="inx + '-clean-code'"
        :id="inx"
        @click.native.stop="toSlide(item, inx)"
      >{{ item.name }}</mt-tab-item>
    </mt-navbar>
    <div class="content">
      <div class="content-tips">
        <span>*由于注单延迟，自助洗码彩金会延迟统计</span>
        <a @click.stop="openHistory">历史洗码记录</a>
      </div>
      <div class="content-box">
        <a class="range-btn" @click.stop="openRange">洗码比例</a>
        <ul>
          <li>总计游戏投注：<span>{{ codeData.allBet | numFixed(2) }}</span></li>
          <li>可领取洗码金额：<span>{{ codeData.amount | numFixed(2) }}</span></li>
          <li class="small">上次结算时间：{{ codeData.createTime || '-' }}</li>
        </ul>
      </div>
      <div class="content-btn">
        <a class="bg-col" @click="clickClean">领取洗码</a>
      </div>
    </div>
    <!-- 通用弹窗 -->
    <myToast
      :title="popTitle"
      :showToasts="popShows"
      @toggleToast="toggleToast"
    >
      <div class="pop-slot">
        <table border="0" cellspacing="0" cellpadding="0" v-if="popType === 'history'" v-popDrag>
          <thead>
            <tr class="pop-title">
              <th>时间</th><th>打码量范围</th><th>等级</th><th>比例</th><th>领取金额</th><th>状态</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-show="popContent.length > 0"
              v-for="(item, inx) in popContent"
              :key="inx + '-pop-tr'"
            >
              <td>{{ item.createTime }}</td>
              <td>
                {{ item.activeBetSection ? item.activeBetSection.replace(',', '~') : '' }}
              </td>
              <td>{{ 'VIP' + item.level }}</td>
              <td>{{ item.scale }}</td>
              <td>{{ item.amount }}</td>
              <td v-if="item.status" class="text-red">已领取</td>
              <td v-else>未领取</td>
            </tr>
            <tr v-if="popContent.length === 0" style="line-height: 54px;">
              <td colspan="6">暂无记录</td>
            </tr>
          </tbody>
        </table>

        <table border="0" cellspacing="0" cellpadding="0" v-if="popType === 'scale'">
          <thead>
            <tr class="pop-title">
              <th>打码量范围</th><th>VIP等级</th><th>洗码比例</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, inx) in popContent"
              :key="inx + '-pop-tr'"
              :class="item.type && item.type === 'title' ? 'pop-colspan' : ''"
            >
              <td v-if="item.type && item.type === 'title'" colspan="3">
                {{ item.title }}
              </td>
              <td v-if="!item.type">{{ item.minBet + '~' + item.maxBet }}</td>
              <td v-if="!item.type">{{ 'VIP' + item.level }}</td>
              <td v-if="!item.type">{{ item.scale }}</td>
            </tr>
            <tr v-if="popContent.length === 0" style="line-height: 54px;">
              <td colspan="6">暂无记录</td>
            </tr>
          </tbody>
        </table>
      </div>
    </myToast>
  </section>
</template>

<script>
import Head from 'Components/global/head_new'
import {
  getShareListApi,
  getCodePageApi,
  getCodeAwardApi,
  getCodeScaleApi,
  getCodeDetailApi
} from 'Plugins/api'
import { Toast } from 'mint-ui'
import myToast from 'Components/allpop/mytoast'

export default {
  components: { Head, myToast },
  data () {
    return {
      gamesCompany: [],
      codeData: {},
      platformCode: null,
      selected: 0,
      loginPwd: true,
      // pop
      offset: 0,
      popType: null,
      popTitle: '',
      popShows: false,
      popContent: []
    }
  },
  directives: {
    popDrag: {
      inserted: (el, a, vm) => {
        let px = 0
        let py = 0
        let x = 0
        let y = 0
        el.ontouchstart = function (e) {
          px = el.offsetLeft
          py = el.offsetTop
          x = e.touches[0].clientX
          y = e.touches[0].clientY
          console.log(px, x)
          console.log(py, y)
        }
      }
    }
  },
  computed: {
    // title () {
    //   return this.loginPwd ? '登录密码' : '交易密码'
    // }
  },
  created () {
    this.getShareCompany()
  },
  methods: {
    clearPop () {
      this.popContent = []
    },
    // 厂商
    async getShareCompany () {
      const res = await getShareListApi()
      const { code, data } = res
      if (code === 0) {
        this.gamesCompany = data
        this.platformCode = data[0].key
        this.getCodePage()
      }
    },
    // code page
    async getCodePage () {
      const { code, data } = await getCodePageApi({ code: this.platformCode })
      if (code === 0) {
        this.codeData = data
      }
    },
    // 切换
    toSlide (item, inx) {
      if (item.key === this.platformCode) {
        return
      }
      this.platformCode = item.key
      this.clearPop()
      this.getCodePage()
    },
    // 历史洗码
    async openHistory () {
      // console.log('history', this.platformCode)
      this.popTitle = '历史洗码记录'
      this.popType = 'history'
      this.offset = 0
      this.toggleToast()
      const { code, data } = await getCodeDetailApi({
        code: this.platformCode,
        offset: this.offset,
        count: 30
      })
      if (code === 0) {
        this.popContent = data
      }
    },
    async moreHistory () {
      this.offset++
      const { code, data } = await getCodeDetailApi({
        code: this.platformCode,
        offset: this.offset,
        count: 30
      })
      if (code === 0) {
        this.popContent = [
          ...this.popContent,
          ...data
        ]
      }
    },
    // 比例
    async openRange () {
      // console.log('scale', this.platformCode)
      this.popTitle = '洗码比例'
      this.popType = 'scale'
      this.toggleToast()
      const { code, data } = await getCodeScaleApi({ code: this.platformCode })
      if (code === 0) {
        // 补充标题
        if (data.length > 1) {
          data.splice(1, 0, { type: 'title', title: '下一等级' })
        }
        data.splice(0, 0, { type: 'title', title: '当前等级' })
        this.popContent = data
      }
    },
    toggleToast () {
      this.popShows = !this.popShows
      this.clearPop()
    },
    // 手动洗码
    async clickClean () {
      if (
        !this.codeData || !this.codeData.amount || parseFloat(this.codeData.amount) < 1
      ) {
        Toast({
          message: '领取金额必须大于1元',
          duration: 1500
        })
        return
      }
      const { code, msg } = await getCodeAwardApi({ code: this.platformCode })
      if (code === 0) {
        Toast({
          message: msg,
          duration: 1500
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
/* .mint-navbar .mint-tab-item.is-selected {
  border-bottom: 1px solid #d81e06!important;
  margin-bottom: -1px;
} */
table, table tr th, table tr td {
  // border: 1px solid #0094ff;
}
table {
  min-height: 28px;
  line-height: 28px;
  text-align: center;
  border-collapse: collapse;
}
// pop slot
.pop-slot {
  max-height: 54vh;
  overflow-y: auto;
  table {
    width: 100%;
    box-sizing: border-box;
    // min-height: 115px;
    tr {
      &:nth-child(odd) {
        td {
          background:#fff;
        }
      }
      &:nth-child(even) {
        td {
          background:#efefef;
        }
      }

      &.pop-colspan {
        color: #d81e06;
      }
      &.pop-title {
        th {
          background: #e1e1e1;
        }
      }

      td {
      }
    }
  }
}
.mint-navbar .mint-tab-item.is-selected {
  margin-bottom: 0px !important;
}
.mint-navbar .mint-tab-item {
  padding: 13px 0 10px 0;
}
.clean-code-page {
  position: relative;
  .content {
    padding: 10px 12px;
    .content-tips {
      line-height: 24px;
      padding-top: 4px;
      padding-bottom: 12px;
      font-size: 12px;
      span {
        color: #ff8700;
      }
      a {
        text-decoration: none;
        color: #d81e06;
        font-size: 13px;
        line-height: 15px;
        padding-left: 20px;
        float: right;
        background: url('/mobile/images/mine/code_log.png') no-repeat left center;
        background-size: contain;
        margin-top: 4px;
      }
    }
    .content-box {
      background: #fff;
      padding: 5px 10px;
      font-size: 14px;
      position: relative;
      .range-btn {
        position: absolute;
        line-height: 18px;
        font-size: 12px;
        border: 1px solid #d81e06;
        color: #d81e06;
        padding: 0 4px;
        border-radius: 5px;
        right: 10px;
        margin-top: 6px;
      }
      li {
        line-height: 32px;
        span {
          color: #d81e06;
        }
        &.small {
          font-size: 12px;
        }
      }
    }
    .content-btn {
      margin-top: 22px;
      text-align: center;
      a {
        line-height: 32px;
        padding: 8px 18px;
        border-radius: 5px;
        color: #fff;
        font-size: 14px;
      }
    }
  }
}
</style>
