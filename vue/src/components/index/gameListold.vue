<style lang="scss" scoped>
.index-game-list {
  margin-bottom: 10px;
  ul {
    width: 100%;
    overflow: hidden;
    background-color: white;
    li {
      width: calc(50%);
      border-bottom: 1px solid #eee;
      background: #fff;
      padding: 12px;
      box-sizing: border-box;
      float: left;
      overflow: hidden;
      &:nth-child(odd) {
        border-right: 1px solid #eee
      }
      img {
        width: 48px;
        height: 48px;
        margin-right: 10px;
        float: left;
      }
      .index-game-list-info {
        float: right;
        width: calc(100% - 58px);
        height: 48px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: center;
        h3 {
          font-size: 14px;
          color: #333;
          font-weight: 400;
        }
        .countdown {
          font-size: 10px;
          margin-top: 5px;
          color: #666;
        }
      }
    }
  }
  .mint-tab-item{
    min-width: 65px;
    border:none;
    .mint-tab-item-label{
      font-size:13px !important;
    }
  }
}
.one-line-more{
  color: #666;
  margin-top: 4px;
  font-size: 12px;
}
.mint-tab-container{
  .mint-navbar{
    overflow-y: auto;
  }
}
</style>
<style lang="scss">
   .tab .gameList .mint-navbar{
     border-top:1px solid #eee;
    .mint-tab-item{
      border:none;
      max-width: 65px;
      &.is-selected{
        background:transparent;
        border-radius: 0;
        border:none !important;
        .mint-tab-item-label{
          color: #de2f2f;
          font-size:23px;
          max-width: 65px;
        }
      }
    }
   }
</style>

<template>
  <section class="index-game-list gameList">
    <mt-navbar v-model="tabs">
        <mt-tab-item
          v-for="(l, index) in tabsArr"
          :key="index"
          :id="index"
          @click.native='swiperTab(index)'
        >
          {{ l.label }}
        </mt-tab-item>
      </mt-navbar>
      <mt-tab-container v-model="tabs">
        <mt-tab-container-item
          v-for="(a, index) in tabsArr"
          :key="index"
          :id="index"
        >
        <ul>
          <li
            v-for="g in games(a)"
            :key="g.lotteryId"
            @click="g.lotteryId < 10000
            ? routerLink({ path: '/lottery', params: { lotteryId: g.lotteryId } })
            : routerLink({ path: '/mobile/lottery/lotteryFootBall.html', redirect: true })
          ">
            <img :src="`/mobile/images/index/${g.icon}.png`">
            <div class="index-game-list-info">
              <h3 class="one-line">{{ g.name }}</h3>
              <p v-if="g.indexDesc || g.lotteryId === 100001" class="countdown">{{ g.indexDesc }}</p>
              <CountDown v-else :gameId="g.lotteryId" :name="g.name" class="countdown" />
            </div>
          </li>
        </ul>
        </mt-tab-container-item>
      </mt-tab-container>

  </section>
</template>

<script>
import CountDown from 'Components/global/countdown_new.vue'
import GameCard from 'Components/buyMall/gameCard.js'
import { gameListApi } from 'Plugins/api'
import { mapGetters, mapMutations } from 'vuex'
export default {
  data () {
    return {
      tabs: 0
    }
  },
  components: { CountDown, GameCard },
  computed: {
    ...mapGetters([ 'allGames' ]),
    tabsArr () {
      // 新增属性typeName 传值字符串 多个种类通过|分割，分类彩种信息
      return [
        { label: '全部', type: 'all' },
        { label: '快三', type: '', typeName: 'QuickThree' },
        { label: 'PC蛋蛋', type: '', typeName: 'PCEgg|Luck' },
        { label: '时时彩', type: '', typeName: 'FrequentLottery' },
        { label: 'PK10', type: '', typeName: 'PK10' },
        { label: '六合彩', type: '', typeName: 'SixMark' },
        { label: '11选5', type: '', typeName: 'PickFive' },
        { label: '七星彩', type: '', typeName: 'SevenStar' },
        { label: '3D系列', type: '', typeName: 'ArrangeThree|ThreeD|FrequentHappy' },
        { label: '竞技彩', type: 'j' }
      ]
    }
  },
  methods: {
    ...mapMutations([ 'setAllGames' ]),
    async getData () {
      const res = await gameListApi()
      this.setAllGames(res)
    },
    swiperTab (index) {
      const currentTab = document.querySelector('.gameList').querySelectorAll('a')[index]
      document.querySelector('.gameList').querySelector('.mint-navbar').scrollLeft = index === 0 ? 0 : currentTab.offsetLeft - window.innerWidth / 2 + currentTab.clientWidth / 2
    },
    games (a) {
      const source = Object.values(Object.values(this.allGames)[0])
      if (a.type === 'all') {
        return source
      } else {
        // 追加通过lotteryClassName来分类彩种，
        return source.filter(e => {
          if (a.type !== '') {
            return e.type === a.type
          } else {
            const arr = a.typeName.split('|')
            return arr.some(val => {
              return e.lotteryClassName.includes(val)
            })
          }
        })
      }
    }
  },
  created () {
    this.getData()
  }
}
</script>
