<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-16 14:07:14
 * @LastEditTime: 2019-09-28 20:52:07
 * @LastEditors: Please set LastEditors
 -->
<template>
<div>
  <div class="gamePanel" v-if="gameTypes && gameTypes.length > 0">
    <!-- tab top -->
    <div class='tabTop'>
    <mt-navbar
      v-model="selected"
      v-if="gameTypes && gameTypes.length > 0"
       :class="navListStyle"
    >
      <mt-tab-item
        v-for="(tmp, index) in gameTypes"
        :key="index + '-tab-top'"
        :id="index"
        @click.native.stop="toSlide(tmp, index)"
        :class="navStyle"
      >
        <section class="flex">
          <img :src="tmp.imageUrl" />
          <span>{{ gameTypes.length>=9?tmp.title.slice(0,2):tmp.title  }}</span>
        </section>
      </mt-tab-item>
    </mt-navbar>
    <div v-else class="list-null" @click="getHall">
      <h6>游戏暂时没有开启，敬请期待...</h6>
    </div>
    </div>
    <!-- tab content -->
    <div class="tab">
      <firstNav
        v-show="!hasChild && gameList.length > 0"
        :gameList="gameList"
      />
      <secondNav
        v-show="hasChild"
        :platformlist="platformlist"
        :platformType="platformType"
      />
    </div>
  </div>
  <emptyData v-else type="list" :marginTop="marginTop" title="游戏暂时没有开启，敬请期待"/>
</div>
</template>

<script>
import {
  getPlatformApi,
  getGameDetailsApi,
  getHallInfosApi
  // indexTabsApi
} from 'Plugins/api'
import secondNav from 'Components/index/secondNav'
import firstNav from 'Components/index/firstNav'
import emptyData from 'Components/global/emptyData'

export default {
  components: { firstNav, secondNav, emptyData },
  data () {
    return {
      selected: 0,
      gameList: [],
      gameTypes: [],
      currentName: '',
      navtype: 'lottery',
      platformName: '彩票',
      hasChild: false, // 层级，三级目录则直接进入游戏，二级目录进入三级目录

      platformlist: [],
      platformType: '',
      show: false,

      mark: 0, // 记录选择点
      marginTop: false
    }
  },
  props: ['onlyGame'],
  computed: {
    navStyle () {
      let special = [5, 7, 9]
      let count = this.gameTypes.length
      if (count === 1) {
        return 'title-item-one'
      } else if (special.indexOf(count) !== -1 && count === 5) {
        return 'title-item-odd title-item-odd-five'
      } else if (special.indexOf(count) !== -1 && count === 7) {
        return 'title-item-odd title-item-odd-seven'
      } else if (special.indexOf(count) !== -1 && count === 9) {
        return 'title-item-odd title-item-odd-nine'
      } else if (count === 6) {
        return 'title-item-sex'
      } else if (count === 8) {
        return 'title-item-eight'
      } else if (count === 10) {
        return 'title-item-ten'
      }
    },
    navListStyle () {
      let special = [5, 7, 9]
      let count = this.gameTypes.length
      if (count === 1) {
        return 'title-one'
      } else if (special.indexOf(count) !== -1) {
        return 'title-odd'
      } else if (count) {
        return 'title-flex'
      }
    }
  },
  methods: {
    // 获取 彩票、游戏项目
    async getList (child, platformType) {
      this.hasChild = child
      this.$emit('setNavType', platformType) // nav type

      if (child) {
        const formRes = await getPlatformApi({
          'platformType': platformType,
          'type': 1
        })
        let { code, data } = formRes
        if (code === 0) {
          this.platformlist = data.data
          this.platformType = platformType
        }
      } else {
        const gameRes = await getGameDetailsApi({
          'platformType': platformType
        })
        let { code, data } = gameRes
        if (code === 0) {
          this.gameList = data
        }
      }
    },
    // hall
    async getHall () {
      this.gameTypes.length = 0
      const res = await getHallInfosApi({ type: 1 })
      let { code, data } = res
      if (code === 0) {
        data.map(e => {
          if (e.enable !== false) {
            this.gameTypes.push(e)
          }
        })
        let { child, platformType } = data[this.selected]

        this.getList(child, platformType)
      }
    },
    // to slide
    async toSlide (type, i) {
      if (i === this.mark) {
        return
      }
      if (!type.enable) {
        // 回到上一次的选择
        this.selected = this.mark
        return
      }
      this.mark = i // 记录上一次点击

      let { child, platformType } = type
      this.platformlist = []
      this.gamelist = []

      this.getList(child, platformType)
    }
  },
  mounted () {
  },
  created () {
    // this.getList()
    this.getHall()
  }
}
</script>

<style lang='scss'>
@import 'Assets/css/base.color.scss';
.list-null{
  margin: .17rem .17rem 1px .17rem;
  border-radius: .17rem;
  border: 1px solid #d81e06;
  height: 2.35rem;
  h6 {
    text-align: center;
    line-height: 2.35rem;
    color:rgb(184, 184, 184);
  }
}
.gameList {
  .mint-navbar {
    width: 100vw;
    overflow-x: auto;
    border-bottom: 1px solid #eee;
    scroll-behavior: smooth;
    &::-webkit-scrollbar-track {
      background-color: transparent;
    }
    /*定义滚动条高宽及背景*/
    &::-webkit-scrollbar {
      height: 0;
      background-color: transparent;
    }
    /*定义滚动条*/
    &::-webkit-scrollbar-thumb {
      background-color: transparent;
    }
  }
}

.gamePanel > .mint-navbar .mint-tab-item-label {
  color: $baseCol;
  font-size: 14px !important;
}

.tab {
  background-color: #fff;
  min-height: 33.6vh;
}

// 样式优化，单独抽出
.tabTop {
  background-color: #fff;
  overflow: hidden;

  .mint-navbar {
    display: block;
    margin: 6px 6px 1px 6px;
    overflow: hidden;
    border-radius: 6px;
    border: 1px solid $baseCol;
    box-sizing: border-box;
    .mint-tab-item.is-selected {
      background: $baseCol;
      margin-bottom: 0 !important;
      border-bottom: 1px solid $baseCol !important;
      .mint-tab-item-label {
        color:#fff
      }
    }
  }

  .mint-tab-item {
    display: block;
    line-height: 32px !important;
    width: 25%;
    padding: 0;
    box-sizing: border-box;
    color: $baseCol;
    border-right: 1px solid $baseCol;
    // &:nth-child(5), &:nth-child(6), &:nth-child(7), &:nth-child(8) {
    //   border-top: 1px solid $baseCol;
    // }
    // &:nth-child(4), &:nth-child(8) {
    //   border-right: none;
    // }
    .mint-tab-item-label img {
      margin-right: 3px;
      width: 24px;
      height: 24px;
    }

    .mint-tab-item-label .flex {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 5px 0;
      span {
        font-size: 13px !important;
      }
    }
  }
}

// 只有一个时
.title-one{
    border: 1px solid transparent !important;
  }
.title-item-one{
  float: left;
    background: #fff !important;
    span{
      color: $baseCol;
    }
}
.gamePanel .tabTop .title-flex{
  display: flex;
  flex-wrap: wrap;
}
.gamePanel .tabTop .title-odd {
  height: 2.31rem;
}
.gamePanel .tabTop .title-item-odd{
  float: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.gamePanel .tabTop .title-item-odd:nth-child(1) {
  height: 2.35rem;
  width: 25%;
}
.gamePanel .tabTop .title-item-odd-five:not(:nth-child(1)){
  min-width: calc((100% - 25%) / 2);
  &:nth-child(2), &:nth-child(3){
    border-bottom: 1px solid $baseCol;
  }
  &:nth-child(3){
    border-right: none;
  }
}
.gamePanel .tabTop .title-item-odd-seven:not(:nth-child(1)){
  min-width: calc((100% - 25%) / 3);
  &:nth-child(2), &:nth-child(3), &:nth-child(4){
    border-bottom: 1px solid $baseCol;
  }
  &:nth-child(4){
    border-right: none;
  }
}
.gamePanel .tabTop .title-item-odd-nine:not(:nth-child(1)){
  max-width: calc((100% - 25%) / 4);
  &:nth-child(2), &:nth-child(3), &:nth-child(4), &:nth-child(5){
    border-bottom: 1px solid $baseCol;
  }
  &:nth-child(5){
    border-right: none;
  }
}
.gamePanel .tabTop .title-item-odd:nth-child(1) .flex {
  height: 2.35rem;
  flex-direction: column;
}
.gamePanel .tabTop .title-item-sex{
  min-width: 30%;
  &:nth-child(1), &:nth-child(2), &:nth-child(3){
    border-bottom: 1px solid $baseCol;
  }
  &:nth-child(3){
    border-right: none;
  }
}

.gamePanel .tabTop .title-item-eight{
  min-width: 25%;
  &:nth-child(1), &:nth-child(2), &:nth-child(3), &:nth-child(4){
    border-bottom: 1px solid $baseCol;
  }
  &:nth-child(4){
    border-right: none;
  }
}
.gamePanel .tabTop .title-item-ten{
  min-width: 20%;
  &:nth-child(1), &:nth-child(2), &:nth-child(3), &:nth-child(4), &:nth-child(5){
    border-bottom: 1px solid $baseCol;
  }
  &:nth-child(5){
    border-right: none;
  }
}
.tab .mint-navbar .mint-tab-item.is-selected {
  background: $baseCol;
  // margin-bottom: 0 !important;
}
.tab .mint-navbar .mint-tab-item.is-selected .mint-tab-item-label {
  color:#fff
}
.tab .mint-tab-item {
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 16px !important
}

.tab .mint-navbar .mint-tab-item {
  padding: 0;
  border: 1px solid $baseCol
}

.tab .mint-navbar .mint-tab-item .mint-tab-item-label img {
  margin-right: 5px;
  width: 25px;
  height: 25px;
}
.tab .mint-navbar .mint-tab-item .mint-tab-item-label div {
  display: flex;
  align-items: center;
  padding: 5px 0
}
.tab .mint-navbar .mint-tab-item:first-child {
  border-radius: 25px 0 0 25px;
  margin-left: 10px
}
.tab .mint-navbar .mint-tab-item:last-child {
  border-radius: 0 25px 25px 0;
  margin-right: 10px
}
.tab .mint-tab-container {
  background: #fff;
}
.tab .mint-navbar {
  padding: 8px 0;
  &+.mint-tab-container .mint-navbar {
    border-bottom: 1px solid #ccc;
  }
}
//
.tab-index-flex {
  padding: 8px 10px;
  &.is-selected {
    background: $baseCol;
  }
  .tab-item {
    display: block;
  }
}
</style>
