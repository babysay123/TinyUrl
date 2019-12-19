<!--
 * @Author: your name
 * @Date: 2019-09-16 14:07:14
 * @LastEditTime: 2019-11-07 15:56:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cp8h5\vue\src\views\agency\member.vue
 -->
<template>
  <section>
    <div class="member-search">
      <input type="text" v-model="account" placeholder="会员账号">
      <button @click="getData">查询</button>
    </div>
     <div class="subordinatr-head fw" >
      <span class="subordinatr-head-sp">账号</span>
      <span class="subordinatr-head-sp">等级</span>
      <span class="subordinatr-head-sp">账户类型</span>
      <span class="subordinatr-head-sp">在线状态</span>
      <span class="subordinatr-head-sp">操作</span>
    </div>
    <div class="member-container">
      <MemberCard
        v-for="l in list"
        :key="l.userId"
        :data="l"
        @getShareData="getShareData"
      />
    </div>
    <img src="/mobile/images/agent/zwjl.png" class="blank" v-if="list.length === 0">
    <div v-if="isAll && list.length !== 0" class="member-all">已显示全部会员</div>

    <RebatePopup v-model="rebate" :shareData="shareData" @close='close'/>

  </section>
</template>

<script>
import MemberCard from 'Components/agency/memberCard'
import RebatePopup from 'Components/agency/rebatePopup'
import { memberApi, shareListApi } from 'Plugins/api'
export default {
  components: { MemberCard, RebatePopup },
  data () {
    return {
      account: '',
      list: [],
      isAll: false,
      rebate: false,
      shareData: []
    }
  },
  methods: {
    close () {
      this.rebate = false
    },
    async getData () {
      /**
       * @author Cyan
       * @param {FormData} formData FormData 创建FormData对象
       * @description 通过FormData 提交数据
       */
      const formData = new FormData()
      formData.append('sortOrder', 'asc')
      formData.append('pageSize', 15)
      formData.append('count', 15)
      formData.append('pageNumber', 1)
      formData.append('account', this.account)
      formData.append('agentId', 0)
      const res = await memberApi(formData)
      const { code, rows } = res
      if (code === 0) {
        this.list = rows
        this.isAll = rows.length < 15
      }
    },
    async getShareData (type, data) {
      console.log(type, data)
      if (type === 'rebats') {
        const res = await shareListApi({ 'id': data.code })
        if (res.code === 0) {
          this.shareData = res.data
          this.shareData.etype = 'rebats'
          this.rebate = true
        } else {
          this.$toast(res.msg)
        }
      } else if (type === 'detal') {
        console.log(data, '')
        this.shareData = data
        this.shareData.etype = 'detal'
        console.log(this.shareData, '')
        this.rebate = true
      }
    }
  },
  created () {
    this.getData()
  }
}
</script>

<style lang="scss" scoped>
@import 'Assets/css/base.color.scss';
.blank {
  width: 3rem;
  display: block;
  margin: 2rem auto 0;
}
.subordinatr-head:nth-child(odd){
  background: #fff;
}
.subordinatr-head{
  // background: #D81E06;
  line-height: 1rem;
  height: 1rem;
  font-size: 13px;
}
.subordinatr-head-sp {
    width: 20%;
    white-space: nowrap;
    overflow: hidden;
    display: block;
    text-overflow: ellipsis;
    float: left;
    text-align: center;
}
.member {
  margin-top: 1.125rem;
}
.member-search {
  background: #fff;
  padding: 10px;
  margin-bottom: .2rem;
  input {
    height: .8rem;
    line-height: .8rem;
    border: 1px solid $baseCol;
    border-radius: .15rem;
    text-indent: 1em;
    width: 81%;
    font-size: .3rem;
    padding: 0;
  }
  button {
    width: 16%;
    height: .8rem;
    line-height: .8rem;
    background: $baseCol;
    margin-left: .2rem;
    color: #fff;
    border-radius: .15rem;
    font-size: .3rem;
  }
}
.member-all {
  padding: .4rem 0;
  background: #fff;
  text-align: center;
}
</style>
