<!--
 * @Author: your name
 * @Date: 2019-11-14 16:52:33
 * @LastEditTime: 2019-11-15 16:51:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cp8h5\vue\src\views\mine\datesele.vue
 -->
<style lang="scss" scoped>
.date-box {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  li{
    width: 18%;
    text-align: center;
    background: #fff;
    line-height: 30px;
    // line-height: .7rem;
    // color: #fff;
    // margin-left: 6px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-left: calc((100% - 18% * 5) / 6);
    margin-top: 7px;
  }
}
.active{
  background: $baseCol !important;
  border: 1px solid $baseCol !important;
  color: #fff !important;
}
</style>

<template>
  <div>
    <ul v-if="dateList !== null" class="date-box">
      <li
        v-for="(item,i) in dateList"
        :key="i + '-date-list'"
        :class="active === i ? 'active' : ''"
        @click="select(item, i)"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import TimestampParse from 'Plugins/moment'
export default {
  props: {
    dateList: {
      defult: null
    }
  },
  data () {
    return {
      active: 0
    }
  },
  methods: {
    select (item, i) {
      this.active = i
      let { begin, end } = TimestampParse(item.code)
      console.log(begin, end)

      // this.$parent.getDate({ begin, end })
      // console.log(begin, end)
      this.$emit('updateDate', begin, end)
    }
  }
}
</script>
