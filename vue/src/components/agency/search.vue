<template>
  <div class="agents-search">
    <input type="text" :placeholder="placeholder" v-model="account">

    <div class="searchBtn" @click="queryData">
      <!-- <img src="/mobile/images/agent/search.png"> -->
      查询
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    initialValue: {
      type: String
    }
  },
  data () {
    return {
      account: this.initialValue || '',
      accountBackup: ''
    }
  },
  computed: {
    ...mapGetters([ 'agencyParams', 'agencyFunc' ])
  },
  methods: {
    ...mapMutations([ 'setAgencyState' ]),
    ...mapActions([ 'agencyParamsCallback' ]),
    async queryData () {
      if (
        (this.accountBackup === this.account) &&
        (this.account && this.accountBackup)
      ) {
        this.$toast({
          message: '请勿重复查询',
          duration: 1800
        })
        return
      }

      if (!this.account && !this.accountBackup) {
        this.$toast({
          message: '请输入要查询的账号',
          duration: 1800
        })
        return
      }
      console.log(this.agencyParams)
      this.accountBackup = this.account
      // let params =Object.assign(this.agencyParams, this.account)

      await this.agencyParamsCallback({ account: this.account })
      this.agencyFunc('search')
    }
  }
}
</script>

<style lang="scss" scoped>
.agents-search {
  padding: 0 10px 10px;
  display: flex;
  justify-content: space-between;

  input,
  .searchBtn {
    height: 30px;
    line-height: 30px;
    font-size: 13px;
    border-radius: 4px;
    box-sizing: border-box;
    border: 1px solid #e45441;
  }
  input {
    width: 70%;
    padding: 0 10px;
    color: #59585a;
    background: #fff;
  }
  .searchBtn {
    width: 25%;
    background: #d81e06;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 18px;
      margin-right: 5px;
    }
  }
}
</style>
