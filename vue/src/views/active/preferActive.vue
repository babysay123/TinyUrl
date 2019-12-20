<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-06 15:34:43
 * @LastEditTime: 2019-11-06 20:22:11
 * @LastEditors: Please set LastEditors
 -->
<style lang="scss" scoped>
.hold{
  width: 100%;
  height: 1rem;
}
.mint-navbar{
  padding-bottom: 5px;
}
.zhanwei{
  height: 1rem;
  width: 100%;
}
.log{
  text-align: center;
  margin-top: 5rem;
  img{
    width: 57%;
    margin: auto;
  }
  p{
    font-size: 17px;
  }
}
</style>

<template>
  <div>
    <Head :fixed="true" @backHandler="backHandler">
      <h3>优惠活动</h3>
    </Head>
    <!-- <div class="prefer-active">
      <ul>
        <template v-for="(l, index) in data">
          <template v-if="l.title">
            <li class="prefer-list-card" :key="index" @click="routerLink({ path: '/activeDetails', params: { content: l.content } })">
              <p class="prefer-list-card-title one-line">{{ l.title }}</p>
              <img :src="l.cover_url">
              <p class="prefer-list-card-description one-line">{{ l.description }}</p>
            </li>
          </template>
          <template v-else>
            <li class="prefer-list-card" :key="index">
              <p class="prefer-list-card-p-placeholder"></p>
              <div class="prefer-list-card-img-placeholder"></div>
              <p class="prefer-list-card-p-placeholder"></p>
            </li>
          </template>
        </template>
      </ul>
    </div> -->
    <div class="hold"></div>
    <div v-if="hdres">
    <mt-navbar v-model="selected">
      <mt-tab-item v-for="(item, index) in this.nav" :key="index" :id="item.tag"  @click.native="a(selected)">{{item.name}}</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="selected" v-if="hdres.data.list.length > 0">
      <mt-tab-container-item :id="selected" v-for="(item, index) in this.nav" :key="index">
        <Huodong :data="hdres.data.list" :Nowtag="selected"/>
      </mt-tab-container-item>
    </mt-tab-container>
     <div v-else class="log">
     <img src="../../assets/images/chatroom/noData.png">
     <p @click="onload">暂时没有数据</p>
    </div>
    <NavBottom/>
    </div>
    <div v-else class="log">
     <img src="../../assets/images/chatroom/abnormal.png">
     <p @click="onload">网络飞走了，点击刷新试试</p>
    </div>
  </div>
</template>

<script>
import Head from 'Components/global/head.vue'
import NavBottom from 'Components/global/nav-bottom'
import Huodong from './huodong'
// import { carouselApi } from 'Plugins/api'
export default {
  components: { Head, NavBottom, Huodong },
  data () {
    return {
      data: [],
      hdres: null,
      selected: '829',
      nav: [{
        name: '全部',
        tag: '829'
      }],
      userId: this.Utils.Storage.get('user') ? this.Utils.Storage.get('user').userId : 0
    }
  },
  methods: {
    // async getData () {
    //   const res = await carouselApi()
    //   this.data = JSON.parse(res.data)
    // },
    a (i) {
      console.log(i, '')
    },
    onload () {
      location.reload()
    },
    getHDdata () {
      this.axios.post('/app/appView/pageList.do', { 'userid': this.userId }).then(res => {
        if (res.code === 0) {
          this.hdres = res
          this.hdres.data.category.forEach(e => {
            this.nav.push(e)
          })
        } else {
          this.hdres = false
        }
      })
    },
    backHandler () {
      location.href = '/mobile/studio/#/index'
    }
  },
  created () {
    this.getHDdata()
  }
}
</script>
