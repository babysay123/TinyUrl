<!--
 * @Author: your name
 * @Date: 2019-10-30 00:29:07
 * @LastEditTime: 2019-11-08 16:08:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cp8h5\vue\src\views\generalize\agentCenter.vue
 -->
<template>
  <div class="wrap" id="page-wrapper" v-cloak>
      <header id="header" class="head bg-col fixed">
        <a  class="back head-back" href="javascript:history.back(1)" ><i class="fa fa-angle-left fa-2x"></i></a>
        <h3 class="title">代理中心</h3>
      </header>
      <div class="zanwei"></div>
    <!-- <com-header href='javascript:history.back(1)' :head="headShow">
        <h3 class="title">代理中心</h3>
    </com-header> -->
    <section :class="pageContent()">
        <img src="/mobile/images/agent/home_banner.jpg" class="w100">
        <nav class="fw personal-cell">
            <a
                :href="list.link"
                class="personal-cell-item"
                v-for=" (list, index) in homeList"
                :key="index"
            >
                <img :src="list.icon" class="list-icon">
                <span>{{list.title}}</span>
            </a>
        </nav>
    </section>
</div>
</template>
<script>
// import { userInfoApi } from 'Plugins/api'
// import { utils } from 'Plugins/utils/sessionUtil'
export default {
  name: 'agentCenter',
  data: function () {
    return {
      headShow: false,
      loadInx: null,
      requestData: {},
      homeList: [
        // {link: './subordinateOpen.html', icon: '/mobile/images/agent/home3.png', title: '下级开户'},
        // {link: './inviteManagement.html', icon: '/mobile/images/agent/home9.png', title: '邀请管理'},
        { link: '/mobile/studio/#/reportForm', icon: '/mobile/images/agent/home1.png', title: '代理报表' },
        { link: '/mobile/studio/#/subordinateReport', icon: '/mobile/images/agent/home2.png', title: '下级报表' },
        { link: '/mobile/studio/#/member', icon: '/mobile/images/agent/home4.png', title: '会员管理' },
        { link: '/mobile/agent/explain.html', icon: '/mobile/images/agent/home7.png', title: '代理说明' },
        { link: '/mobile/studio/#/lottery_record', icon: '/mobile/images/agent/home5.png', title: '彩票记录' },
        { link: '/mobile/studio/#/football_record', icon: '/mobile/images/agent/home8.png', title: '足彩记录' },
        { link: '/mobile/studio/#/transaction_details', icon: '/mobile/images/agent/home6.png', title: '交易明细' }
      ]
    }
  },
  methods: {
    request () {
      // userInfoApi().then(res => {
      //   utils.save('user', res.data)
      //   utils.save('agentReport', res.system_time)
      // })
    },
    pageContent () {
      if (this.headShow) {
        return 'main'
      } else {
        return 'main notop'
      }
    }
  },
  created () {
  },
  mounted () {
    let _this = this
    _this.request()
  }
}
</script>
<style lang="scss" scoped>
@import 'Assets/css/report/index.scss';
.zanwei{
  width: 100%;
  height: 1rem;
}
</style>
