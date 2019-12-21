<template>
  <div>
    <Head fixed>
      <h3>备注</h3>
    </Head>
    <!-- <div class="Box">
      <input v-model="remark" rows="1" placeholder="请输入备注" :class="{ active: q }" maxlength='50' />
      <p>0/50</p>
      <button class="btn" @click="submit()">提交</button>
    </div> -->
    <div class="modify-content" :style="{ 'margin-top': '1.125rem' }">
      <input
        :placeholder="'请输入备注'"
        v-model="input"
        @input="ele => inputNumber(ele.target.value)"
        :maxlength="maxLength"
        :minLength="1"
      />

      <div class="input-tip">{{ inputLength }} / {{ maxLength }}</div>

      <div class="redBtn" @click="onValid" :disabled="!input">提交</div>
    </div>
  </div>
</template>
<script>
import Head from 'Components/global/head'
import { mapState } from 'vuex'
export default {
  components: {
    Head
  },
  data () {
    return {
      input: '',
      maxLength: 50,
      q: false
    }
  },
  props: {
    tmp: {
      type: Object
    }
  },
  watch: {
    tmp: function (val) {
      if (val.markName && val.markName.length > 0) {
        this.input = val.markName
      } else {
        this.input = ''
      }
    }
  },
  computed: {
    ...mapState({
      chatRoom (state) {
        return state.chatRoom
      },
      init (state) {
        return state.chatRoom.init
      },
      inputLength () {
        return this.input.length
      }
    })
  },
  methods: {
    // 修改备注
    async onSubmit () {
      await this.axios.get('/cpi/relation/remarkFriend/' + this.chatRoom.flag + '?friendOpenid=' + this.tmp.openid + '&markName=' + this.input).then((res) => {
        if (res.code === 0) {
          this.$toast({
            message: '修改成功',
            position: 'top',
            duration: 1800
          })
          this.$emit('popvi', true)
        }
      })
    },
    onValid () {
      /** 为空校验 */
      if (!this.input) {
        return this.$toast({
          message: `${this.description}不能为空`,
          duration: 1800
        })
      }

      /** 最小长度校验 */
      if (this.input.length < this.minLength) {
        return this.$toast({
          message: `${this.description}最小长度为${this.minLength}`,
          duration: 1800
        })
      }

      /** 正则规则校验 */
      // if (this.rule && !this.rule(this.input)) {
      //   // console.log(this.error)
      //   return this.$toast({
      //     message: this.error,
      //     duration: 1000
      //   })
      // }
      // console.log(this.input)
      this.onSubmit()
    },
    HeadBack () {
      this.$emit('popvi')
    },
    inputNumber (val) {
      // if (this.inputType === 'number') {
      //   this.input = val.replace(/[^\d]/g, '')
      // }
    }
  },
  created () {
    // this.text = this.tmp.markName
    // console.log(this.tmp)
    // if (this.text.length > 0) {
    //   this.q = true
    // }
  }
}
</script>

<style lang="less" scoped>
/deep/.Box{
    margin-top:1.125rem;
    position: relative;
    textarea{
        width: 100%;
        padding: 12px;
        margin: 20px 0 5px 0;
    }
    p{
        position: absolute;
        right: 2%;
    }
    .btn{
        width: 90%;
        background: rgb(235, 156, 186);
        color:#fff;
        margin: 20px auto;
        position: absolute;
        left: 5%;
        top: 116%;
        height: 1rem;
        border-radius: 4px
    }
}
.active{
    background: #DE2F2F;
}
</style>
<style lang="scss">
.modify-content {
  padding-top: 15px;
  height: calc(100% - 1.125rem);
  box-sizing: border-box;
  background: #f5f4f9;
  input {
    width: 100%;
    line-height: 1.25rem;
    height: 1.25rem;
    background: #fff;
    padding: 0 .375rem;
    font-size: 14px;
    box-sizing: border-box;
    border: none;
  }
  .input-tip {
    text-align: right;
    padding: 5px 10px;
  }
  .btn {
    width: calc(100% - 30px);
    display: block;
    box-sizing: border-box;
    margin: 10px auto;
    font-size: 14px;
    height: 1.125rem;
    line-height: 1.125rem;
    border-radius: 5px;
  }
}
</style>
