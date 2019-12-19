<template>
    <section class="fw">
        <ul class="fw rankingInfo-boxs">
            <li class="rankingInfo-box" v-for="(item, index) in data" :key="index" v-if="index < 3">
                <img
                  :src="!item.headImg || item.headImg.indexOf('/default') > -1 ? '/mobile/images/mine/geren_tou.png' : item.headImg"
                  class="rankingInfo-headIm">
                <div class="rankingInfo-name wzfw">{{item.nickname}}</div>
                <div class="rankingInfo-money wzfw">¥{{item.winFee.toFixed(2)}}</div>
                <div class="rankingInfo-day">昨日中奖</div>
            </li>
            <li class="tc rankingInfo-no" v-if="data.length === 0">
              <img src="../../../assets/images/chatroom/noData.png" class="noDatas">
                暂无数据
            </li>
        </ul>
        <ul class="fw tl rankingInfo-lists">
            <li class="rankingInfo-list pr" v-for="(item, index) in data" :key="index" v-if="index >= 3">
                <span class="rankingInfo-number dInV">{{index + 1}}</span>
                <img
                  :src="!item.headImg || item.headImg.indexOf('/default') > -1 ? '/mobile/images/mine/geren_tou.png' : item.headImg"
                  class="rankingInfo-headIm dInV">
                <span class="rankingInfo-list-name wzfw dInV">{{item.nickname}}</span>
                <span class="rankingInfo-money wzfw">¥{{item.winFee.toFixed(2)}}</span>
            </li>
        </ul>
    </section>
</template>

<script>
export default {
  name: 'betting-ranking',
  data () {
    return {
      loading: false,
      data: [],
      params: {
        page: 0,
        pageSize: 100
      }
    }
  },
  created () {
    let params = this.params
    this.getData(params)
  },
  methods: {
    getData (params) {
      let _this = this
      _this.axios.postOnce('/chat_room/win_fee.do', params)
        .then((res) => {
          if (res.code === 0) {
            let resData = res.data
            // let resDataLeng = resData.length
            // for (let i = 0; i < resDataLeng; i++) {
            //   let nameArr = new Array(resData[i].nickname.length).join('*')
            //   console.log(nameArr)
            //   resData[i].nickname = resData[i].nickname.substring(0, 2) + nameArr
            // }
            _this.data = resData
          }
        })
        .catch(() => {
        })
    }
  }
}
</script>

<style scoped>
    .rankingInfo-boxs{position:relative;width:8.7rem;height:5.3rem;margin:calc(1.14rem + 100px) auto 0 ;}
    .rankingInfo-box{position:absolute;z-index:-1;text-align:center;font-size:.35rem;width:2.9rem;height:5.3rem;margin-top:.8rem;}
    .rankingInfo-box:nth-child(1){left:2.9rem;margin-top:.45rem;background:url(../../../assets/images/chatroom/chat_rank_bg1.png) no-repeat;background-size:100%;}
    .rankingInfo-box:nth-child(1):before {
        content: '';
        position: absolute;
        left: .7rem;
        top: 1rem;
        z-index: 1;
        width: 1.8rem;
        height: 1.8rem;
        background: url(../../../assets/images/chatroom/chat_rank_first.png) no-repeat;
        background-size: 100%;
    }
    .rankingInfo-box:nth-child(2){left:0;background:url(../../../assets/images/chatroom/chat_rank_bg2.png) no-repeat;background-size:100%;}
    .rankingInfo-box:nth-child(3){right:0;background:url(../../../assets/images/chatroom/chat_rank_bg3.png) no-repeat;background-size:100%;}
    .rankingInfo-headIm{position:relative;z-index:1;margin:1.1rem auto 0;width:1.3rem;height:1.3rem;background:#fff;border-radius:50%;}
    .rankingInfo-box:nth-child(2) .rankingInfo-name{color:#4893EE;}
    .rankingInfo-box:nth-child(1) .rankingInfo-name{color:#E57561;}
    .rankingInfo-box:nth-child(3) .rankingInfo-name{color:#DC3AA0;}
    .rankingInfo-name{margin:0 auto;padding:.25rem 0 .2rem;width:2.4rem;}
    .rankingInfo-box:nth-child(1) .rankingInfo-name{padding:.4rem 0 .25rem;}
    .rankingInfo-box:nth-child(1) .rankingInfo-headIm{margin-top:1.35rem;}
    .rankingInfo-money{padding:0 .1rem .15rem .1rem;color:#666666;}
    .rankingInfo-day{font-size:.3rem;}
    .rankingInfo-lists{margin-top:.4rem;}
    .rankingInfo-list{padding:0 .3rem;position:relative;z-index:-1;font-size:0;line-height:1.6rem;border-top:1px solid #DEDEDE;color:#999999;}
    .rankingInfo-list .rankingInfo-number{padding:0 .5rem 0 .2rem;font-size:.8rem;}
    .rankingInfo-list .rankingInfo-headIm{margin:0 .3rem 0 0;font-size:.35rem;}
    .rankingInfo-list .rankingInfo-list-name{font-size:.35rem;}
    .rankingInfo-list .rankingInfo-money{position:absolute;right:.3rem;font-size:.35rem;}
    .rankingInfo-list:nth-last-child(1){border-bottom:1px solid #DEDEDE;}
    .rankingInfo-no{color:#333;font-size:.35rem;}
</style>
