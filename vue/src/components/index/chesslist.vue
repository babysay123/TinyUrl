<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-16 14:07:14
 * @LastEditTime: 2019-09-28 20:58:52
 * @LastEditors: Please set LastEditors
 -->
<template>
   <div>
     <div>
       <ul>
         <li></li>
       </ul>
     </div>
     <ul class="list-ul">
       <li v-for="(item, index) in pokerList" :key="index">
         <a @click="loginGame(item.platformCode,item.gameKindId,item.gameCode)">
           <img v-lazy="item.url">
         </a>
         <div>
           {{item.gameName}}
         </div>
       </li>
     </ul>
   </div>
</template>
<script>
import { loginGameApi } from 'Plugins/api'
import { Toast } from 'mint-ui'
export default {
  data () {
    return {
      pokerList: [],
      open: { closed: true }
    }
  },
  computed: {
    isuserLogin () {
      return this.Utils.Storage.get('user') && this.Utils.Storage.get('sessionid')
    }
  },
  props: ['platformCode', 'navtype', 'mark'], // platformCode:游戏类型2级编号 navtype：游戏类型 mark：当前一级导航下标
  watch: {
    // 监听2级导航切换
    'platformCode': function (newval, old) {
      this.rendeGame(newval, this.navtype)
    },
    // 监听游戏类型切换 解决捕鱼没有自动渲染
    'navtype': function (newval, old) {
      this.rendeGame(this.platformCode, newval)
    },
    'mark': function () {
      if (this.mark === 3) {
        this.rendeGame('fg', 'chess')
      }
    }
  },
  // 初始渲染当前选中游戏
  created () {
    this.rendeGame(this.platformCode, this.navtype)
  },
  methods: {
    rendeGame (Code, Type) {
      this.axios.post('/game/getGameDetail.do',
        { platformCode: Code,
          platformType: Type
        })
        .then(res => {
          if (res.code === 0) this.pokerList = res.data
        }).catch(() => {})
      console.log(Code, '')
    },
    loginGame (code, id, gameid) {
      // 判断是否有登录
      if (!this.isuserLogin) {
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
  }
}
</script>
<style lang="scss" scoped>
.list-ul{
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  li{
    width: 25%;
    text-align: center;
    img{
      width: 80%;
      margin: auto;
    }
    div{
      width: 100%;
      text-align: center;
    }
  }
}
</style>
