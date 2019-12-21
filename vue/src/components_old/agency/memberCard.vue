<!--
 * @Author: your name
 * @Date: 2019-09-16 14:07:14
 * @LastEditTime: 2019-11-03 19:31:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cp8h5\vue\src\components\agency\memberCard.vue
 -->
<template>
    <div class="subordinatr-head fw" >
      <span class="subordinatr-head-sp">{{ data.account }}</span>
      <span class="subordinatr-head-sp">V{{ data.vipLevel }}</span>
      <span class="subordinatr-head-sp">{{ data.balance | numFixed(3) }}</span>
      <span class="subordinatr-head-sp">
         <span :class="[ isOnline.class ]">{{ isOnline.text }}</span>
      </span>
      <span class="subordinatr-head-sp">
        <p style="color:#4ba5ea" @click="look('detal')">详情</p>
        <p style="color:#4ba5ea" @click="look('rebats')">返点</p>
      </span>
    </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    role (type) {
      return this.data.role === 1 ? '代理' : '会员'
    },
    isOnline () {
      return this.data.isOnline ? { class: 'online', text: '在线' } : { class: 'offline', text: '离线' }
    }
  },
  methods: {
    look (type) {
      this.$emit('getShareData', type, this.data)
    }
  }
}
</script>

<style lang="scss" scoped>
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
    p{
      width: 50%;
      float: left;
    }
}

.member-card {
  background: #fff;
  margin-bottom: .2rem;
  padding: .3rem;
}
.member-card-info {
  display: flex;
  align-items: center;
  padding-bottom: .2rem;
  border-bottom: 1px dashed #979797;
  .member-class {
    width: 20px;
    background: #d81e06;
    text-align: center;
    color: #fff;
    line-height: 20px;
    border-radius: .1rem;
    padding: .1rem 0;
  }
  .member-card-info-content {
    width: auto;
    &:last-child {
      margin-left: auto;
    }
    .plceholder-span {
      width: 2.5rem;
      text-align: right;
    }
    p {
      height: 20px;
      display: flex;
      align-items: center;
    }
  }
}
.online {
  background: green;
}
.offline {
  background: #c6c6c6;
}
.online,
.offline {
  width: 30px;
  height: 16px;
  text-align: center;
  line-height: 16px;
  margin-right: 4px;
  border-radius: 3px;
  font-size: 12px;
  color: #fff;
  display: inline-block;
}
.member-card-time {
  margin-top: .3rem;
  display: flex;
  justify-content: space-between;
  p {
    line-height: .5rem;
  }
}
</style>
