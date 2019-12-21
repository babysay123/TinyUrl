<template>
  <section>
    <img class="agent-banner" src="/mobile/images/agent/home_banner.jpg" width="100%">
    <ul class="agentCenter-nav">
      <li v-for="n in nav" :key="n.link" @click="routerLink({ path: n.link })">
        <img :src="n.icon">
        <p>{{ n.label }}</p>
      </li>
      <li></li>
    </ul>
  </section>
</template>

<script>
export default {
  data () {
    return {
      nav: [
        { label: '代理报表', icon: '/mobile/images/agent/home1.png', link: '/agency_reports' },
        { label: '下级报表', icon: '/mobile/images/agent/home2.png', link: '/subordinate_reports' },
        { label: '下级开户', icon: '/mobile/images/agent/home3.png', link: '/subordinate_open' },
        { label: '会员管理', icon: '/mobile/images/agent/home4.png', link: '/member' },
        { label: '彩票记录', icon: '/mobile/images/agent/home5.png', link: '/lottery_record' },
        { label: '足彩记录', icon: '/mobile/images/agent/home8.png', link: '/football_record' },
        { label: '交易明细', icon: '/mobile/images/agent/home6.png', link: '/transaction_details' },
        { label: '代理说明', icon: '/mobile/images/agent/home7.png', link: '/agency_explain' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.agentCenter-nav {
  display: flex;
  padding: 0 5%;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 20px;
  li {
    text-align: center;
    width: 26.66%;
    margin: 5% 0;
    img {
      width: 2.2rem;
    }
    p {
      margin-top: .4rem;
      font-size: 16px;
    }
  }
}
</style>
