<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-16 14:07:14
 * @LastEditTime: 2019-11-09 14:32:32
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div>
    <ul class="game">
      <li v-for="(tmp,index) of  getGameDetail" :key="index">
        <a @click="loginGame(tmp.platformCode,tmp.gameKindId,tmp.gameCode)">
          <img :src='tmp.url' alt="">
          <div>{{tmp.gameName}}</div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { indexGameListApi, loginGameApi } from 'Plugins/api'
import { Toast } from 'mint-ui'
export default {
  data () {
    return {
      // 游戏列表
      getGameDetail: [],
      open: { closed: true }
    }
  },
  /**
   * @author xiaoyu
   * @Onenav 当前一级导航栏游戏类型
   * @TwoNav 当前二级导航游戏种类
   */
  props: ['Onenav', 'TwoNav'],
  computed: {
    isLogin () {
      return this.Utils.Storage.get('user') && this.Utils.Storage.get('sessionid')
    },
    // 优化监听
    httprequest () {
      return {
        a: this.Onenav,
        b: this.TwoNav
      }
    }
  },
  watch: {
    // 监听数据 发送请求
    'httprequest': function () {
      this.getAsList()
    }
  },
  methods: {
    async getList () {
      const res = await indexGameListApi({ 'platformType': this.Onenav, 'platformCode': this.TwoNav })
      this.getGameDetail = res.data
    },
    getAsList () {
      // 生成Promise实例
      var res = indexGameListApi({ 'platformType': this.Onenav, 'platformCode': this.TwoNav })
      // then接受回调参数
      res.then((e) => {
        this.getGameDetail = e.data
      })
    },
    loadImg (url) {
      return {
        src: url,
        error: require('./../../assets/images/zhanwietu.png'),
        loading: require('./../../assets/images/zhanwietu.png'),
        attempt: 5
      }
    },
    loginGame (code, id, gameid) {
      console.log(id, '')
      // 判断是否有登录
      if (!this.isLogin) {
        Toast({
          message: '请登录',
          duration: 1000
        })
        setTimeout(() => {
          window.location.href = '/mobile/studio/#/login'
        }, 1200)
        return
      }
      this.$indicator.open('加载中..')
      localStorage.gameWindowName = `${code}_${id}`
      loginGameApi({ 'platformCode': code, 'gameKindId': id, 'gameCode': gameid }).then(res => {
        if (res.code === 0) {
          // 限制只打开同一个标签页
          this.open = window.open(res.data || 'javascript:void(0);', 'game')
          if (!this.open) {
            window.location.href = res.data
          }
        }
        this.$indicator.close()
      })
    }
  },
  updated () {
    localStorage.removeItem('gameWindowName')
  },
  created () {
    this.getList()
  },
  destroyed () {
    localStorage.removeItem('gameWindowName')
  }
}
</script>
<style>
  .game{
      display: flex;
      flex-wrap: wrap;
      background: #fff
  }
  .game > li{
      width: 25%;
      /* height: 120px; */
      text-align: center;
      padding: 15px

  }
  .game li a img{
    width: 100%;
    /* height: 90%; */
  }
  .game .mint-tab-container{
    padding-bottom: 20px
  }
  .game a{
    color: currentColor
  }
  /* .myToast{
    color:#e4393c;
    background-color:#fff;
    border:2px solid #aaa;
    width: 400px;
    height: 200px
  } */
</style>
