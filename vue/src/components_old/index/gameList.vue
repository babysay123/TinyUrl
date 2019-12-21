<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-17 19:38:04
 * @LastEditTime: 2019-10-17 19:48:26
 * @LastEditors: Please set LastEditors
 -->
<template>
  <section>
    <Head href="javascript:history.back(-1);">
      <h3>{{ title || '游戏' }}</h3>
    </Head>
    <div class="zw"></div>
    <div class="serach">
      <input type="text" placeholder="请输入游戏昵称" v-model="serachText">
      <img src="/mobile/images/index/search-3.png" alt="img" @click="serachGame(serachText)">
    </div>
    <!-- <div class="navtab">
     <span v-for="i in nav" :key="i.code" :class="i.code==active?'activ':''" @click="tab(i.code)">{{i.name}}</span>
    </div>-->
    <div class="conten-box" v-if="active === 'all'">
      <div
        v-for=" (i,index) in gameList"
        class="positioning"
        :key="index"
        @click="i.enable ? play(i) : maintenance()"
      >
        <div class="posit-box">
          <div v-if="!i.enable" class="grayTaxt">维护中</div>
          <img v-lazy="i.url" :class="i.enable?'':'gray '"/>
          <p>{{ i.gameName }}</p>
        </div>
      </div>
    </div>
    <!-- <Gamelist :gameList="gameList" v-else-if="active==='all'&&$route.query.Type==='lottery'">
    </Gamelist> -->
    <div v-else-if="active === 'hot'">
      <div class="no-data"></div>
    </div>
    <div v-else-if="active === 'collect'">
      <div class="no-data"></div>
    </div>
  </section>
</template>

<script>
import Head from 'Components/global/head.vue'
import Gamelist from './lotteryList.vue'
import { getGameDetailsApi, loginGameApi, transferMoney, userInfoApi } from 'Plugins/api'
import { Toast, Indicator } from 'mint-ui'
// import Storage from 'Plugins/utils/StorageUtil'

export default {
  components: { Head, Gamelist },
  // props: {
  //   title: {
  //     type: String
  //   }
  // },
  data () {
    return {
      nav: [
        { name: '全部游戏', code: 'all' },
        { name: '热门推荐', code: 'hot' },
        { name: '我的收藏', code: 'collect' }
      ],
      active: 'all',
      title: '',
      gameList: null,
      serachText: ''
    }
  },
  methods: {
    async serachGame (content) {
      let list = []
      this.gameList = []
      if (content === '') {
        await this.getGameDetailsApi()
        return
      }
      await this.getGameDetailsApi()
      list = this.gameList.filter(e => e.gameName.indexOf(content) !== -1)
      if (list.length === 0) {
        Toast('未找到相应游戏')
        return
      }
      this.gameList = list
    },
    tab (index) {
      this.active = index
    },
    async getGameDetailsApi () {
      Indicator.open()
      const { code, data } = await getGameDetailsApi({
        'platformCode': this.$route.query.CodeType,
        'platformType': this.$route.query.Type,
        'type': 0
      })
      if (code === 0) {
        this.gameList = data
      }
      Indicator.close()
    },
    play (item) {
      let loginInfo = this.Utils.Storage.get('user')
      if (loginInfo) {
        Indicator.open('加载中...')
        if (this.$route.query.Type === 'lottery') {
          item.gameKindId < 10000 ? this.$router.push({ path: '/lottery', query: { lotteryId: item.gameKindId } }) : window.location.href = '/mobile/lottery/lotteryFootBall.html'
        } else {
          this.getTransferMoney(item)
          // 限制只打开同一个标签页
        }
      } else {
        Toast({
          message: '请登录',
          duration: 1000
        })
        window.location.href = '/mobile/studio/#/login'
      }
    },
    maintenance () {
      Toast({
        message: '此游戏正在维护中',
        duration: 1000
      })
    },
    async getTransferMoney (item) {
      Indicator.open('加载中...')
      transferMoney({ 'transferStatus': 2 }, { type: 'notips' }).then(val => {
        if (val.code !== 0) {
          // Toast({
          //   message: '正在' + (val.data.platformName ? val.data.platformName : val.data.fromPlatformName) + '中进行游戏',
          //   duration: 1500
          // })
          return
        }
        Indicator.open('加载中...')
        transferMoney(item ? { 'gameCode': item.platformCode, 'transferStatus': 1 } : { 'transferStatus': 2 }, { type: 'notips' }).then(data => {
          if (item && data.code !== 0) {
            Toast({
              message: '当前正在' + (data.data.platformName ? data.data.platformName : data.data.fromPlatformName) + '中进行游戏，账户不能同时进行其他游戏。',
              duration: 1500
            })
            return
          }
          setTimeout(() => {
            Indicator.open('加载中...')
          }, 100)
          loginGameApi({ 'platformCode': item.platformCode, 'gameKindId': item.gameKindId, 'gameCode': item.gameCode }).then(res => {
            // this.open = window.open(res.data || 'javascript:void(0);', 'game')
            window.location.href = res.data
            if (!this.open) {
              window.location.href = res.data
            }
            // Indicator.close()
          })
          userInfoApi().then(v => {
            this.$store.commit('updateUserInfo', v.data)
          })
        })
      })
    }
  },
  mounted () {
    // console.log(this.$route.query.Type, this.$route.query.CodeType)
    let { Name } = this.$route.query
    if (Name) {
      this.title = Name
    }
  },
  created () {
    this.getGameDetailsApi()
  }
}
</script>

<style lang="scss" scope>
.serach {
  display: flex;
  justify-content: space-between;
  padding: .1rem;
  background: #fff;
  input{
    width: 93%;
    height: .8rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 12px;
    padding-left: 6px;
  }
  img {
   width: 8%;
  }
}
.zw {
  width: 100%;
  height: 1.125rem;
}
.navtab {
  background: url('/guide/newUI/game-nav-bg.fbaa1fce.png');
  height: 0.906667rem;
  margin: 0.266667rem;
  background-size: 100% 100%;
  display: -ms-flexbox;
  display: flex;
  line-height: 0.906667rem;
  text-align: center;
  color: #fff;
  border-radius: 6px;
  // border-radius: 0.453333rem;

  span {
    width: 33.3%;
    height: 100%;
    border-radius: 6px;
    // border-radius: 0.453333rem;
  }
  .activ {
    background: #8c582f;
  }
}
.conten-box {
  display: block;
  // padding: 6px 0.266667rem;
  padding: 0px;
  .positioning {
    height: 2.88rem;
    float: left;
    background: #fff;
    text-align: center;
    width: 25%;
    // width: 23.5%;
    // margin-bottom: 0.266667rem;
    // margin-right: 2%;
    .posit-box {
      position: relative;
      height: 100%;
      padding-top: 8px;
    }
    img {
      display: block;
      width: 1.75rem;
      height: 1.75rem;
      margin: 0 auto;
    }
    p {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      width: 100%;
      // height: 0.586667rem;
      // width: 88%;
      font-size: 13px;
      margin: 0 auto;
      text-align: center;
      line-height: 30px;
      // line-height: 0.586667rem;
      // margin-top: 0.053333rem;
      // color: #fff;
      // border-radius: 0.293333rem;
      // background: #a3826f;

      // &::after{
      //   content: "";
      //   width: .32rem;
      //   height: .32rem;
      //   background: url(/guide/newUI/core.png);
      //   background-size: 100% 100%;
      //   position: absolute;
      //   right: 3px;
      //   top: 3px;
      // }
    }
  }
  .positioning:nth-child(4n) {
    margin-right: 0;
  }
  &:after {
    content: '';
    display: block;
    clear: both;
  }
}
.no-data {
  width: 100%;
  height: 6.4rem;
  display: inline-block;
  background: url('/guide/newUI/icon-no-data.png') no-repeat 50%;
  text-align: center;
  background-size: contain;
}
.positioning {
  position: relative;
}
.gray {
  -webkit-filter: grayscale(100%);
  -moz-filter: grayscale(100%);
  -ms-filter: grayscale(100%);
  -o-filter: grayscale(100%);
  filter: grayscale(100%);
  filter: gray;
}
.grayTaxt {
  position: absolute;
  top: calc(50% - 15px);
  left: 50%;
  z-index: 200;
  transform: translate(-50%,-50%);
  color: #fff;
  font-size: 15px;
  font-weight: bold;
}
</style>
