<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-16 14:07:14
 * @LastEditTime: 2019-11-02 22:07:50
 * @LastEditors: Please set LastEditors
 -->
<template>
  <Popup
    :show="show"
    :title="shareData.etype==='rebats'?'返点比例':'详情'"
    direction="bottom"
  >
    <div class="rebate-popup" v-if="shareData.etype==='rebats'">
      <!-- <div class="rebate-popup-title">
        <p>返点详情</p>
        <img @click="$emit('input', false)" src="/mobile/images/agent/close.jpg">
      </div> -->

      <div
        class="rebate-popup-items"
        v-for="s in shareData"
        :key="s.id"
      >
      <div>
         <span>{{ s.lotteryClassName | gameName }}：</span>
         <span>{{ s.share | numFilter }}</span>
      </div>
      </div>

    </div>
    <div v-else-if="shareData.etype==='detal'">
      <ul class="detal">
        <li>
          玩家账号：<span>{{shareData.account}}</span>
        </li>
        <li>
          身份：<span>{{role}}</span>
        </li>
        <li>
          账户余额：<span>{{shareData.balance}}</span>
        </li>
        <li>
          姓名：<span>{{shareData.username}}</span>
        </li>
        <li>
          邀请码：<span>{{shareData.code}}</span>
        </li>
        <li>
          等级：<span>VIP{{shareData.vipLevel}}</span>
        </li>
        <li>
          在线状态：<span>{{isOnline.text}}</span>
        </li>
        <li>
          登录IP：<span>{{shareData.lastLoginIp}}</span>
        </li>
      </ul>
       <p class="date">注册时间：<span>{{shareData.createdTime}}</span></p>
       <p class="date">最后登录时间：<span>{{shareData.lastLoginTime}}</span></p>
    </div>
  </Popup>
</template>

<script>
// import Popup from 'Components/global/popup'
import Popup from '../../views/generalize/popup'

const lotteryDic = new Map([
  [ 'FrequentLottery', '时时彩' ],
  [ 'ElevenPickFive', '11选5' ],
  [ 'PCEggs', '快乐8' ],
  [ 'QuickThree', '快3' ],
  [ 'SixMark', '六合彩' ],
  [ 'Three', '排列3' ],
  [ 'PK10', 'PK10' ],
  ['SevenStar', '七星彩']
])

export default {
  components: { Popup },
  props: {
    value: {
      type: Boolean,
      required: true
    },
    shareData: {
      required: true
    }
  },
  computed: {
    show: {
      get () {
        return this.value
      },
      set () {
        this.$emit('input', false)
      }
    },
    role (type) {
      return this.shareData.role === 1 ? '代理' : '会员'
    },
    isOnline () {
      return this.shareData.isOnline ? { class: 'online', text: '在线' } : { class: 'offline', text: '离线' }
    }
  },
  filters: {
    gameName (key) {
      return lotteryDic.get(key)
    },
    numFilter (value) {
      let realVal = ''
      if (value % 1 === 0) {
        realVal = value + '.0'
        return realVal
      }
      if (value) {
      // 截取当前数据到小数点后一位
        let tempVal = parseFloat(value).toFixed(1)
        realVal = tempVal.substring(0, tempVal.length - 1)
      } else {
        realVal = '--'
      }
      return realVal
    }
  },
  methods: {
    close () {
      // this.show = false
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>

.detal{
  display: flex;
  flex-flow:wrap;
  width: 8rem;
  li{
    width: 47%;
    line-height: .8rem;
    margin-left: 3%;
    span{
      color: #ff6c0c;
    }
  }
}
.date{
      line-height: .8rem;
      margin-left: 3%;
      span{
        color: #ff6c0c;
      }
    }

.rebate-popup {
  background: #fff;
  font-size: 14px;
  width: 8rem;
  display: flex;
  flex-flow: wrap;
}

// .rebate-popup-title {
//   height: 40px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   padding: 0 15px;
// }

.rebate-popup-items {
  height: 40px;
  border-top: 1px solid #EAEAEA;
  width: 50%;
  line-height: 40px;
  div{
    width: 100%;
    overflow: hidden;
     span:first-child {
    width: 60%;
    text-align: right;
    display: block;
    float: left;
  }
  span:last-child {
    width: 40%;
    text-align: center;
    text-align: center;
    display: block;
    float: left;
    text-align: center;
    color: #ff6c0c;
  }
  }
}
</style>
