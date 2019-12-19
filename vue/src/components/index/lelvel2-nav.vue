<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-29 15:49:25
 * @LastEditTime: 2019-09-28 20:58:15
 * @LastEditors: Please set LastEditors
 -->
<template>
  <section class="navlist gameList" v-if='navs[0]'>
    <!-- <mt-navbar v-model="tabs" >
      <mt-tab-item
        v-for="(tmp, index) in navs[0].data"
        :key="index"
        :id="index"
        @click.native='swiperTab(index,tmp)'
      >
        {{ tmp.name }}
      </mt-tab-item>
    </mt-navbar> -->
    <!-- 二级导航 -->
    <div class="twonav">
      <ul>
        <li v-for="(tmp, index) in navs[0].data" :key="index" @click="swiperTab(index,tmp)" :class='avtivId === index ? "navli" : ""'>
          {{ tmp.name }}
        </li>
      </ul>
    </div>
    <!-- 二级导航end -->
    <!-- 开源棋牌component -->
    <mt-tab-container v-model="tabs">
      <mt-tab-container-item
        v-for="(tmp, index) in navs[0].data"
        :key="index"
        :id="index"
      >
        <!-- <Chess v-if='tmp.name==="开元棋牌"' /> -->
      </mt-tab-container-item>
    </mt-tab-container>
    <!-- 开源棋牌component end-->
    <ChessList :mark='mark' :navtype='navtype' :platformCode='platformCode' :platformName='platformName' />
  </section>
</template>
<script>
import { getNavigatorApi } from 'Plugins/api/buyMall'
import Chess from 'Components/index/chess'
import ChessList from 'Components/index/chesslist'

export default {
  components: { Chess, ChessList },
  data () {
    return {
      tabs: 0,
      allNavs: [],
      navs: [],
      eletype: 'fg老虎机', // 游戏类型
      platformCode: 'null', // 游戏类型编号
      avtivId: 0 // 点击高亮
    }
  },
  props: ['platformName', 'navtype', 'mark'],
  methods: {
    async getLev2Nav () {
      const res = await getNavigatorApi()
      if (res.code === 0) this.allNavs = res.data
      this.getNavs(this.platformName)
    },
    swiperTab (index, t) {
      // 根据当前激活id进行开元棋牌渲染
      console.log(t.platformCode, '')
      this.tabs = index
      // 赋予当前点击元素高亮
      this.avtivId = index
      // 当前点击导航
      this.eletype = t.name
      // 因开元棋牌不对开元棋牌赋值
      this.platformCode = t.platformCode
      console.log(this.platformCode, '')
    },
    getNavs (e) {
      if (e !== '彩票') {
        this.navs = this.allNavs.filter(e => {
          return e.platformName === this.platformName
        })
      }
    }
  },
  watch: {
    platformName: {
      handler (e) {
        console.log(this.allNavs, '')
        this.getNavs(e)
        for (let i = 0; i < this.allNavs.length; i++) {
          if (this.allNavs[i].platformName === e) {
            this.platformCode = this.allNavs[i].data[0].platformCode
            console.log(this.platformCode, '')
          }
          // console.log(this.allNavs[i], '')
        }

        // this.allNavs.forEach(function (v) {
        //   if (v.platformName === e) {
        //     this.platformCode = v[0].v[0].platformName
        //   }
        // })
      }
    }
  },

  created () {
    this.getLev2Nav()
  }
}
</script>
<style lang="scss" scoped>
@import 'Assets/css/base.color.scss';
// 2级导航
.twonav{
  width: 100%;
  ul{
     display: flex;
     flex-direction: row;
     flex-wrap: wrap;
     font-size: 14px;
     li{
       width: 20%;
       height: 20px;
       border-radius: 4px;
      //  border: 1px solid $baseCol;
       margin-left: 10px;
       text-align: center;
     }
     .navli{
      //  color: aliceblue;
      //  background: $baseCol;
      color:  $baseCol;
     }
  }
}
.navlist .mint-navbar{
  padding: 8px;
.mint-tab-item {
  max-width: 65px;
  font-size:14px;
  padding:  0
 }
}
</style>
