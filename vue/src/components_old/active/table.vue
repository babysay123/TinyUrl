<template>
  <table class="active-table" cellspacing="0" cellpadding="0">
    <thead>
      <tr>
        <td v-for="head in columns" :key="head.key">
          {{ head.title }}
        </td>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(body, index) in dataSource" :key="index">
        <td v-for="key in columns" :key="key.key">
          {{ body[key.key] }}
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
    }
  }
}
</script>

<style scoped>
.active-table {
  width: 100%;
  line-height: 38px;
  text-align: center;
  border-collapse: collapse;
  font-weight: 700;
  font-size: 14px;
  color: #666;
}

.active-table thead tr {
  background: #e74a4a;
  color: #fff;
}

.active-table td {
  border: 1px solid #e9e9e9;
}
</style>
