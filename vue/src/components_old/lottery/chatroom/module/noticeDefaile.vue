<template>
  <section class="box-warp">
    <Head>群公告</Head>
    <ul class="details_lists">
      <li class="details_list" v-for="(item, index) in chatRoom.notice" :key="index">
        <h4 class="details_title">{{item.title}}</h4>
        <p class="details_data">{{item.time}}</p>
        {{item.content}}
      </li>
    </ul>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import Head from 'Components/global/head'
export default {
  name: 'noticeDefaile',
  computed: {
    ...mapState({
      chatRoom (state) {
        return state.chatRoom
      }
    })
  },
  created () {
    if (this.chatRoom.notice.length <= 0) {
      this.HeadBack()
    }
  },
  methods: {
    HeadBack () {
      this.$router.go(-1)
    }
  },
  components: {
    Head
  }
}
</script>

<style scoped>
  .box-warp{background:#ececec;}
  .details_lists{position:absolute;top:1.2rem;}
  .details_list{padding:.2rem .3rem;color:#666;font-size:.35rem;word-break: break-word;line-height:.5rem;}
  .details_title{padding-bottom:.15rem;font-weight:normal;color:#333;}
  .details_data{padding-bottom:.2rem;font-size:.3rem;color:#999;}
</style>
