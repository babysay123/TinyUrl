<template>
  <div>
    <table class="manage-table" cellspacing="0" cellpadding="0">
      <thead>
        <tr>
          <td>邀请码</td>
          <td>生成时间</td>
          <td>状态</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="l in list" :key="l.id" @click="openRebate && openRebate(l)">
          <td style="color: #38f;">{{ l.id }}</td>
          <td>{{ l.createTime }}</td>
          <td>注册({{ l.registerCount }})</td>
        </tr>
      </tbody>
    </table>
    <p class="manage-table-foot">{{ dataLength }}</p>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      required: true
    },
    openRebate: {
      type: Function
    }
  },
  computed: {
    dataLength () {
      return !this.list.length ? '暂无邀请码' : '已显示全部内容'
    }
  }
}
</script>

<style lang="scss" scoped>
.manage-table {
  width: 100%;
  background: #fff;
  thead {
    background: #f3f3f3;
    color: #666;
  }
  td {
    height: 1rem;
    line-height: 1rem;
    text-align: center;
    font-size: 14px;
    border-bottom: 1px solid #eaeaea;
    &:first-child,
    &:last-child {
      width: 25%;
    }
    &:nth-child(2) {
      width: 50%;
    }
  }
}
.manage-table-foot {
  text-align: center;
  background: #fff;
  font-size: .4rem;
  line-height: 1.2rem;
  height: 1.2rem;
  white-space: nowrap;
}
</style>
