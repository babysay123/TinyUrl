<template>
  <table class="active-table" cellspacing="0" cellpadding="0">
    <thead>
      <tr>
        <td v-for="head in columns" :key="head.key">
          {{ head.title }}
        </td>
        <td v-if="operation">
          <span>操作</span>
        </td>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(body, index) in dataSource" :key="index">
        <td v-for="key in columns" :key="key.key">
          {{ body[key.key] }}
        </td>
        <td v-if="operation">
          <span style="color:rgb(75, 165, 234)" @click="selectItem(body)">详情</span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    columns: {
      type: Array,
      required: true
    },
    dataSource: {
      type: Array,
      required: true
    },
    operation: {
      type: Boolean,
      define: false
    }
  },
  methods: {
    selectItem (item) {
      console.log(item)
      this.$emit('detail', item)
    }
  },
  created () {
    console.log('dataSource', this.dataSource)
  }
}
</script>

<style scoped>
.active-table {
  width: 100%;
  line-height: 38px;
  text-align: center;
  border-collapse: collapse;
  font-size: 14px;
  color: #333;
}

.active-table thead tr:first-child {
  background: #eee;
  color: #333;
}

.active-table tr:nth-child(event) {
  /* border: 1px solid #e9e9e9; */
  background: #f5f5f5;
}
.active-table tr:nth-child(odd) {
  /* border: 1px solid #e9e9e9; */
  background: #fff;
}
</style>
