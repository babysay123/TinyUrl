<!--
 * @Author: your name
 * @Date: 2019-11-11 11:46:01
 * @LastEditTime: 2019-11-13 20:44:07
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \cp8h5\vue\src\components\global\headerSearch.vue
 -->
<template>
  <div>
    <fieldset>
            <div>
              <input
                type="text"
                id="searchInput"
                :placeholder="inputPla"
                v-model="account"
                class="search"
              />
              <div class="subBtn" @click="getData">查询</div>
            </div>
    </fieldset>
  </div>
</template>
<script>
import { Toast } from 'mint-ui'
export default {
  props: {
    // labelTitle: {
    //   type: String
    // },
    inputPla: {
      type: String
    }
  },
  data () {
    return {
      account: ''
    }
  },
  methods: {
    getData () {
      if (!this.account.trim()) return Toast('查询内容不能为空')
      this.$emit('getInputVal', this.account)
      this.account = ''
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'Assets/css/base.color.scss';
  fieldset {
    padding: 0rem 2.5% 0.2rem !important;
  width: 100%;
  float: left;
  font-family: 'Microsoft YaHei', 'Arial', '\5B8B\4F53', 'sans-serif';
}
// label {
//   display: inline-block;
//   width: 17%;
//   margin-right: 0.2rem;
//   font-weight: bold;
// }
.search {
  width: 72%;
  text-indent: 10px;
  letter-spacing: 1px;
  color: #59585a;
  height: 26px;
  line-height: 26px;
  font-size: 13px;
  border-radius: 4px;
  border: 1px solid $baseCol;
  background-color: white;
}
.subBtn {
  height: 26px;
  font-size: 13px;
  color: #fff;
  background: $baseCol;
  border-radius: 4px;
  border: 1px solid $baseCol;
  width: 25%;
  float: right;
  text-align: center;
}
.subBtn:before {
  content: '';
  display: inline-block;
  vertical-align: middle;
  margin-right: 4px;
  width: 18px;
  height: 24px;
  background: url(/mobile/images/agent/search.png) no-repeat;
  background-size: 100%;
}
</style>
