<template>
  <div>
    <Head fixed>
      <h3>{{title}}</h3>
      <span class="agent-title" @click="toLink">佣金比例表</span>
    </Head>
    <main>
      <img src="/mobile/images/agent/platform_explain@2x.png" class="agent-img" alt="img" />
    </main>
  </div>
</template>
<script>
import Head from 'Components/global/head_new'
export default {
  name: 'agentTitle',
  components: { Head },
  data () {
    return {
      title: '平台代理'
    }
  },
  methods: {
    toLink () {
      this.$router.push('agencyExplain')
    }
  }
}
</script>
<style lang="scss" scoped>
main {
  margin-top:1.15rem;
  padding:10px;
}
.agent-title {
  position: absolute;
  right: .2rem;
  top: 0;
  color:#fff;
}
.agent-img {
  width:100%;
}
.order-list .order-type-list .personal-cell-item {
  width: calc(100% / 4);
  padding: 18px;
  border: none;
}
</style>
