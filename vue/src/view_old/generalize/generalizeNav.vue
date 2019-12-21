<!--
 * @Author: your name
 * @Date: 2019-10-29 15:19:23
 * @LastEditTime: 2019-11-06 20:41:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cp8h5\vue\src\views\generalize\generalizeNav.vue
 -->
<template>
  <section class="order-list">
    <Head fixed>
      <h3>{{title}}</h3>
    </Head>
    <div class="order-type-list">
      <div v-for="(item, i) in types" :key="i + '_type'" class="order-type">
        <h3>
          <i v-if="item.icon" :class="item.icon" style="margin-right: 6px"></i>
          {{ item.name }}
          <!-- <i class="fa fa-angle-right fa-2x"></i> -->
        </h3>
         <nav class="fw personal-cell">
            <div
                class="personal-cell-item"
                v-for=" (list, index) in content"
                :key="index"
                @click="linkTo(list)"
                v-show="list.sign === item.sign"
            >
                <img :src="list.icon" class="list-icon">
                <span>{{list.title}}</span>
            </div>
        </nav>
      </div>
    </div>
  </section>
</template>
<script>
import Head from 'Components/global/head'
export default {
  name: 'generalizeNav',
  components: { Head },
  data () {
    return {
      title: '推广赚钱'
    }
  },
  computed: {
    types () {
      return [
        { name: '下级开户', type: '/subordinate', icon: '', sign: 'xj' },
        { name: '彩票平台', type: '/agentCenter', icon: '', sign: 'cp' },
        { name: '平台代理', type: 'platformAgency', icon: '', sign: 'pt' }
      ]
    },
    content () {
      return [
        { link: 'subordinate?tab=0', icon: '/mobile/images/agent/home9.png', title: '邀请管理', sign: 'xj' },
        { link: 'subordinate?tab=1', icon: '/mobile/images/agent/home3.png', title: '下级开户', sign: 'xj' },
        { link: 'reportForm', icon: '/mobile/images/agent/home1.png', title: '代理报表', sign: 'cp' },
        { link: 'subordinateReport', icon: '/mobile/images/agent/home2.png', title: '下级报表', sign: 'cp' },
        { link: 'member', icon: '/mobile/images/agent/home4.png', title: '会员管理', sign: 'cp' },
        { link: 'lottery_record', icon: '/mobile/images/agent/home5.png', title: '彩票记录', sign: 'cp' },
        { link: 'football_record', icon: '/mobile/images/agent/home8.png', title: '足彩记录', sign: 'cp' },
        { link: 'transaction_details', icon: '/mobile/images/agent/home6.png', title: '交易明细', sign: 'cp' },
        { link: '/mobile/agent/explain.html', icon: '/mobile/images/agent/home7.png', title: '代理说明', sign: 'cp' },
        { link: 'myGeneralize', icon: '/mobile/images/agent/home10.png', title: '我的推广', sign: 'pt' },
        { link: 'directlyUnderSearch', icon: '/mobile/images/agent/home11.png', title: '直属查询', sign: 'pt' },
        { link: 'performanceSearch', icon: '/mobile/images/agent/home12.png', title: '业绩查询', sign: 'pt' },
        { link: 'agentTitle', icon: '/mobile/images/agent/home13.png', title: '代理说明', sign: 'pt' }
      ]
    }
  },
  methods: {
    linkTo (item) {
      if (item.link.indexOf('.html') !== -1) {
        window.location = item.link
      } else {
        this.$router.push(`${item.link}`)
      }
    }
  },
  created () {}
}
</script>

<style lang="scss" scoped>
@import 'Assets/css/report/index.scss';
.order-list .order-type-list .personal-cell-item {
  width: calc(100% / 4);
  padding: 18px;
  border: none;
}
.order-list .order-type-list .personal-cell-item span {
  font-size: 12px;
  color:#666;
}
.order-list .order-type-list {
  padding:0;
}
.order-list .order-type-list .order-type {
  margin-top:0;
  margin-bottom:.3125rem;
}
.personal-cell{
  border:none;
  margin:0;
}
.order-list {
  margin-top: 1.125rem;
}
.order-type-list {
  overflow: hidden;
  padding: 0 0.3125rem;
  .order-type {
    -moz-border-radius: 5px;
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-appearance: none;
    -webkit-appearance: none;
    position: relative;
    padding: 8px 12px;
    margin-top: 0.3125rem;
    background: #fff;
    &:active {
      background: #f9f4f9;
    }
    h3 {
      position: relative;
      height: 0.875rem;
      font-size: 14px;
      font-weight: bold;
      line-height: 0.875rem;
      color: #333;
    }
    .fa-2x {
      font-size: 0.625rem;
      font-weight: 400;
      position: absolute;
      right: 0;
      top: 4px;
    }
  }
}
</style>
