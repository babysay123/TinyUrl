<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-11 14:49:24
 * @LastEditTime: 2019-08-28 20:53:02
 * @LastEditors: Please set LastEditors
 -->
<template>
<div>
      <ul v-if="data">
        <template v-for="(l, index) in data">
          <template v-if="(l.categoryTag === Nowtag) || Nowtag==='829'">
            <li class="prefer-list-card" :key="index">
              <img :src="l.image" @click="l.proType === 5 || l.proType === 6 ?link(l.proType):routerLink({ path: '/activeDetails',params: { content: l.id }})">
              <div class="hint" style="width: 79%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
                <span>{{l.progress}}</span>
              </div>
              <div v-if="l.type ===1" class="lq" :style="{background: l.status === 0?'#999999':'rgb(228,57,60)',color:'#fff'}">
                <span>{{l.operation}}</span>
              </div>
              <div v-if="l.type ===2" class="lqnow" :style="{background: l.status === 0?'#999999':''}" @click="l.status === 0?'':getNow(l.id, index)">
                <span>{{l.operation}}</span>
              </div>
              <div v-if="l.type ===3" class="lq" :style="{background: '#999999',color:'#fff'}">
                <span>{{l.operation}}</span>
              </div>
              <div v-if="l.type ===4" class="lq" @click="l.status === 0?'':routerLink({ path: '/invite',params: { avtid: l.id }})" :style="{background: l.status === 0?'#999999':'rgb(228,57,60)',color:'#fff'}">
                <span>{{l.operation}}</span>
              </div>
              <div v-if="l.type ===5" class="lq" :style="{background: l.status === 0?'#999999':'rgb(228,57,60)',color:'rgb(255,153,0)'}">
                <span>{{l.operation}}</span>
              </div>
              <div v-if="l.type ===6" class="lq" @click="l.status===0?'':service()" :style="{background: l.status === 0?'#999999':'rgb(22,155,213)',color:'#fff'}">
                <span>{{l.operation}}</span>
              </div>
              <div v-if="l.type ===7" class="lq"  @click="l.proType === 5 || l.proType === 6 || l.proType=== 12?link(l.proType):routerLink({ path: '/activeDetails',params: { content: l.id }})"  :style="{background: l.status === 0?'#999999':'rgb(22,155,213)',color:'#fff'}">
                <span>{{l.operation}}</span>
              </div>
              <!-- <p class="prefer-list-card-description one-line">{{ l.desc }}</p> -->
            </li>
          </template>
        </template>
         <li class="zhanwei">
            </li>
      </ul>
      <h3 v-else>暂无活动内容...</h3>
      <Pop :asShow ='asShow' :content='content' :cancel='8' />
</div>
</template>
<script>
import Pop from 'Components/allpop'
export default {
  props: [ 'data', 'Nowtag' ],
  components: { Pop },
  data () {
    return {
      showType: ['自动领取'],
      getNowlq: 1,
      asShow: false,
      content: null,
      host: location.origin
    }
  },
  methods: {
    link (num) {
      switch (num) {
        case 5:
          location.href = this.host + '/mobile/mall/userVipAward.html'
          break
        case 6:
          location.href = this.host + '/mobile/mall/userVipLevel.html'
          break
        case 12:
      }
    },
    service () {
      let config = this.Utils.Storage.get('serviceConfig')
      if (!config || !config.status) {
        this.$toast({
          message: '没获取客服链接，请刷新页面重试。',
          duration: 1800
        })
        return
      }
      let { status } = config
      let { customerServiceUrl } = status
      window.open(customerServiceUrl, '_blank')
      // window.open('https://e-139883.chatnow.meiqia.com/dist/standalone.html', '_blank')
    },
    getNow (promotionid, index) {
      // let u = this.Utils.Storage.get('user')
      this.axios.post('/receive/userPro/receiveAward.do', { 'promotionid': promotionid }).then(res => {
        if (res.code === 0) {
          this.data[index] = res.data.PromotionRO
          // console.log(this.data[index], res.data.PromotionRO)
          this.asShow = !this.asShow
          this.content = `您已领取${res.data.bonus}奖励`
        } else {
          this.data[index] = res.data.PromotionRO
          // console.log(this.data[index], res.data.PromotionRO)
          this.asShow = !this.asShow
          this.content = '领取失败，请重试'
        }
      })
    },
    applyFor (activeId) {
      this.Utils.Storage.save('inviteId', activeId)
      window.location.href = '/mobile/studio/#/invite'
    }
  }
}
</script>

<style lang="less" scoped>
.prefer-list-card {
  margin: auto;
  width: 95%;
  box-sizing: border-box;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 0 3px 3px #9999993b;
  margin-bottom: 15px;
  position: relative;
  img {
    width: 79%;
    height: 2.5rem;
    // min-width: 133px;
  }
  .prefer-list-card-title {
    font-size: 16px;
    line-height: 20px;
  }
  .prefer-list-card-description {
    font-size: 1px;
    line-height: 20px;
    color: #7a7a7a;
  }
  .prefer-list-card-p-placeholder {
    width: 100%;
    height: 20px;
    margin: 5px 0;
    background: #f3f3f3;
  }
  .prefer-list-card-img-placeholder {
    width: 100%;
    height: 133px;
    background: #f3f3f3;
  }
  .lq{
    width: 20%;
    border-radius: 4px;
    float: right;
    height: 2.5rem;
    line-height: 2.6rem;
    text-align: center;
    z-index: 100;
  }
  .lqnow{
    width: 20%;
    border-radius: 4px;
    float: right;
    height: 2.6rem;
    line-height: 2.6rem;
    text-align: center;
    z-index: 100;
    background: rgb(255,153,0);
    color:#fff;
  }
  .ylq{
     width: 20%;
    border-radius: 4px;
    float: right;
    height: 97px;
    line-height: 97px;
    text-align: center;
    z-index: 100;
    background: #7a7a7a;
    color:#fff;
  }
  .hint{
    position: absolute;
    width: 79%;
    bottom: 0;
    text-align: center;
    background:rgba(255,255,255,0.5);
    line-height: 24px;
    color: red;
    font-family:  PingFangSC-Regular, sans-serif;
  }
}
// .prefer-list-card:last-child{
//   padding-bottom: 31px;
//   .hint{
//     position: absolute;
//     width: 79%;
//     height: 24px;
//     bottom: 34px;
//     text-align: center;
//     background:rgba(255,255,255,0.5);
//     line-height: 24px;
//     color: red;
//     font-family:  PingFangSC-Regular, sans-serif;
//   }
// }
.zhanwei{
  height: 1rem;
  width: 100%;
}
.backgr{
background: rgb(255, 153, 0)
}
</style>
