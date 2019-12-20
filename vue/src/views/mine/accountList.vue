<style scoped>
.account-list-container {
  height: calc(100vh - 1.125rem);
}
</style>

<template>
  <section>
    <Head>
      <h3 @click="panel = !panel">
        <span style="margin-right: 5px;">{{ actived.name }}</span>
        <i :class="[ rotateName ]" />
      </h3>
    </Head>
    <HeadPanel
      v-model="panel"
      :blockArr="blockArr"
      :actived="actived.name"
      @changePanel="change"
    />
    <div class="account-list-container">
      <AccountListContainer :list="list" :pullload="getData" />
    </div>
  </section>
</template>

<script>
import Head from 'Components/global/head'
import HeadPanel from 'Components/global/headPanel'
import AccountListContainer from 'Components/orderList/accountListContainer'
import { accountListApi } from 'Plugins/api'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: { Head, HeadPanel, AccountListContainer },
  data () {
    return {
      panel: false,
      actived: {
        name: '账户明细',
        type: -1
      },
      blockArr: [
        { name: '账户明细', type: -1 },
        { name: '充值记录', type: 1 },
        { name: '提现记录', type: 2 },
        { name: '购彩记录', type: 3 },
        { name: '中奖记录', type: 4 },
        { name: '反水记录', type: 5 },
        { name: '返点记录', type: 6 },
        { name: '活动礼金', type: 22 },
        { name: '其他款项', type: 30 }
      ],
      list: []
    }
  },
  computed: {
    ...mapGetters([ 'type_config' ]),
    // head 三角标志
    rotateName () {
      return this.panel ? 'fa fa-caret-up' : 'fa fa-caret-down'
    }
  },
  methods: {
    ...mapActions([ 'getTypeConfig' ]),
    change (data) {
      const { type } = data
      this.actived = data
      this.getData(type)
    },
    async getData () {
      const { type } = this.actived
      const res = await accountListApi({ page: 1, type })
      this.list = res.data.map(l => {
        l.explain = this.type_config.find(e => e[l.type])
        return l
      })
    }
  },
  created () {
    if (this.type_config.length === 0) {
      this.getTypeConfig()
    }
    this.getData()
  }
}
</script>
