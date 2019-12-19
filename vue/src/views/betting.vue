<template>
    <section>
        <Head></Head>
        <section class="main">
            <ul class="fw lottery-tabs">
                <li class="lottery-tab" :class="{active: lotteryTabActive === 0}" @click="lotteryTabC">投注区</li>
                <li class="lottery-tab lottery-tab-room" :class="{active: lotteryTabActive === 1}" @click="lotteryTabRoomC">聊天室</li>
            </ul>
            <ul class="fw">
                <li class="lottery-tab-room-con" v-if="lotteryTab">
                    <Round></Round>
                    <!--冠军-->
                    <!--<section class="champion">
                        <section class="champion-numbers fw">
                            <div class="champion-number-list"><em class="champion-number">1</em></div>
                            <div class="champion-number-list"><em class="champion-number">2</em></div>
                            <div class="champion-number-list"><em class="champion-number">3</em></div>
                            <div class="champion-number-list"><em class="champion-number">4</em></div>
                            <div class="champion-number-list"><em class="champion-number">5</em></div>
                            <div class="champion-number-list"><em class="champion-number">6</em></div>
                            <div class="champion-number-list"><em class="champion-number">7</em></div>
                            <div class="champion-number-list"><em class="champion-number">8</em></div>
                            <div class="champion-number-list"><em class="champion-number">9</em></div>
                            <div class="champion-number-list"><em class="champion-number">10</em></div>
                            <em class="champion-title">冠军</em>
                        </section>
                        <ul class="fw">
                            <li class="champion-big">全</li>
                            <li class="champion-big">大</li>
                            <li class="champion-big">小</li>
                            <li class="champion-big">单</li>
                            <li class="champion-big">双</li>
                            <li class="champion-big">清</li>
                        </ul>
                    </section>-->
                    <!--左中右-->
                    <section class="champion">
                        <section class="champion-lmrs fw">
                            <em class="champion-lmr">龙虎</em>
                            <div class="fw">
                                <div class="champion-lmr-ranking dInV">第一名</div>
                                <div class="champion-lmr-vs dInV">VS</div>
                                <div class="champion-lmr-ranking dInV">第一名</div>
                            </div>
                        </section>
                    </section>
                    <Footer></Footer>
                </li>
                <li class="lottery-tab-room-con lottery-tab-room-main" v-if="lotteryTabRoom">
                    <ul class="room-titles">
                        <router-link tag="li" to="/room" class="room-titleW">
                            <div class="room-title" @click="roomTitleActive = 0" :class="{active: roomTitleActive === 0}">大家说</div>
                        </router-link>
                        <router-link tag="li" to="/ranking" class="room-titleW">
                            <div class="room-title" @click="roomTitleActive = 1" :class="{active: roomTitleActive === 1}">昨日高手榜</div>
                        </router-link>
                        <router-link tag="li" to="/morechat" class="room-titleW">
                            <div class="room-title" @click="roomTitleActive = 2" :class="{active: roomTitleActive === 2}">更多聊天室</div>
                        </router-link>
                    </ul>
                    <router-view/>
                </li>
            </ul>
        </section>
    </section>
</template>

<script>
import Head from '@/components/betting/room-head'
import Round from '@/components/betting/room-round'
import Footer from '@/components/betting/room-footer'
import Room from '@/components/betting/room'
export default {
  name: 'lottery',
  data () {
    return {
      roomTitleActive: 0,
      lotteryTab: false,
      lotteryTabRoom: true,
      lotteryTabActive: 1
    }
  },
  methods: {
    lotteryTabC () {
      this.lotteryTab = true
      this.lotteryTabRoom = false
      this.lotteryTabActive = 0
    },
    lotteryTabRoomC () {
      this.lotteryTab = false
      this.lotteryTabRoom = true
      this.lotteryTabActive = 1
    }
  },
  components: {
    Head,
    Round,
    Footer,
    Room
  }
}
</script>

<style scoped>
    .main{padding:1.125rem 0 0;}
    .lottery-tab-room-main{padding-top:2.4rem;}
    .room-titles{position:fixed;left:0;top:2.37rem;z-index:99;width:100%;margin-bottom:.2rem;height:1.05rem;line-height:1.05rem;background:#fff;font-size:.4rem;text-align:center;color:#666;}
    .room-titleW{width:33.33%;float:left;}
    .room-title{height:1.1rem;border-bottom:2px solid #fff;box-sizing:border-box;}
    .room-title.active{border-color:#D96464;}
    .room-title:nth-child(2){margin:0 .8rem;}
    .lottery-tabs{position:fixed;left:0;top:1.125rem;z-index:99;width:100%;margin-bottom:.2rem;}
    .lottery-tab{float:left;text-align:center;width:50%;height:1.2rem;line-height:1.5rem;background:#fff;font-size:.4rem;color:#FF9259;border-bottom:2px solid #fff;}
    .lottery-tab:before{content:'';display:inline-block;vertical-align:sub;margin-right:.15rem;width:.7rem;height:.7rem;background:url(../assets/images/betting-area.png) no-repeat;background-size:cover;}
    .lottery-tab.active{border-color:#D96464;}
    .lottery-tab-room{color:#5EADE3;}
    .lottery-tab-room:before{width:.7rem;height:.6rem;background:url(../assets/images/betting-room.png) no-repeat;background-size:cover;}
    /*冠军*/
    .champion{background:#fff;overflow:hidden;}
    .champion-numbers{position:relative;font-size:0;padding-left:20%;}
    .champion-number-list{float:left;width:20%;}
    .champion-number{margin:.4rem auto 0;display:block;width:1rem;height:1rem;line-height:1rem;text-align:center;background:#fff;color:#FDBD2C;border-radius:50%;font-size:.35rem;border:1px solid #C3C3C3;}
    .champion-title{position:absolute;left:.1rem;top:.5rem;font-size:.35rem;line-height:.7rem;text-align:center;width:2rem;height:.65rem;background:url(../assets/images/Lotter_select_headerImage.png) no-repeat 0 -.1rem;background-size:cover;}
    .champion-number.active{background:#FDBD2C;border-color:#FDBD2C;}
    .champion-big{float:left;margin:.3rem 0 .3rem 1.4%;text-align:center;font-size:.35rem;width:15%;height:.6rem;line-height:.6rem;border:1px solid #BFBFBF;box-sizing: border-box;}
    /*左中右*/
    .champion{background:#fff;overflow:hidden;}
    .champion-lmrs{position:relative;font-size:0;padding-left:20%;text-align:center;color:#fdbd2c;}
    .champion-lmr{position:absolute;left:.1rem;top:.5rem;line-height:.7rem;width:2rem;height:.65rem;background:url(../assets/images/Lotter_select_headerImage.png) no-repeat 0 -.1rem;background-size:cover;font-size:.35rem;color:#000;}
    .champion-lmr-ranking{width:33%;height:1rem;line-height:1rem;border:1px solid #BFBFBF;border-radius:.15rem;font-size:.4rem;}
    .champion-lmr-vs{width:.7rem;height:.7rem;margin:0 .5rem;line-height:.75rem;font-size:.4rem;border:1px solid #BFBFBF;border-radius:50%;}
</style>
