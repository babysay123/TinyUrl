<!--
 * @Author: your name
 * @Date: 2019-09-16 14:07:14
 * @LastEditTime: 2019-10-27 19:59:40
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /d:\cp8h5\cp8h5\vue\src\components\mine\modifyInput.vue
 -->
<template>
  <div class="modify-content">

    <input
      :placeholder="placeholder"
      v-model="input"
      @input="ele => inputNumber(ele.target.value)"
      :maxlength="maxLength"
      :minLength="minLength"
    />

    <div class="input-tip">{{ inputLength }} / {{ maxLength }}</div>

    <div class="redBtn" @click="onValid" :disabled="!input">提交</div>

    <Confirm
      v-model="popup"
      :callback="onSubmit"
      :title="confirm"
      subheading="(注：确认后，不能再次修改)"
    />
  </div>
</template>

<script>
import Confirm from 'Components/global/confirm'
import { personalUpdateApi, nickNameUpdateApi } from 'Plugins/api'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  props: {
    placeholder: {
      type: '',
      required: true
    },
    minLength: {
      type: Number,
      required: true
    },
    maxLength: {
      type: Number,
      required: true
    },
    rule: {
      type: Function
    },
    keyName: {
      type: String,
      required: true
    },
    confirm: {
      type: String
    },
    description: {
      type: String
    },
    error: {
      type: String
    },
    inputType: {
      type: String,
      default: 'text'
    }
  },
  components: { Confirm },
  data () {
    return {
      input: '',
      popup: false
    }
  },
  computed: {
    ...mapState({
      chatRoom: state => state.chatRoom
    }),
    ...mapGetters([ 'getUserInfo' ]),
    inputLength () {
      return this.input.length
    }
  },
  methods: {
    ...mapMutations([ 'changeChatRoomNickName', 'updateUserInfo' ]),
    ...mapActions([ 'refreshUserInfo' ]),
    inputNumber (val) {
      if (this.inputType === 'number') {
        this.input = val.replace(/[^\d]/g, '')
      }
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
      if (this.rule && !this.rule(this.input)) {
        console.log(this.error)
        return this.$toast({
          message: this.error,
          duration: 1000
        })
      }

      /** 通过校验 打开确认弹窗 */
      if (this.confirm) {
        this.popup = true
      } else {
        this.onSubmit()
      }
    },
    async onSubmit () {
      /** 获取用户身份信息 */
      const { userId } = this.getUserInfo
      const { openid } = this.chatRoom.init && this.chatRoom.init.message.member
      if (!openid) {
        return this.$toast({
          message: '您的身份信息丢失，请尝试重新登录后再试~',
          duration: 1800
        })
      }

      /** 修改请求提交 聊天室昵称修改 单独地址 */
      let res
      if (this.keyName !== 'nickname') {
        res = await personalUpdateApi({
          userId,
          openid,
          [this.keyName.toLocaleLowerCase()]: this.input
        })
      } else {
        res = await nickNameUpdateApi(`nickname=${this.input}&openid=${openid}`)
      }

      const { code, msg } = res
      // if (!code || !msg) {
      //   this.$toast({
      //     message: '网络波动不稳定，请刷新重试。',
      //     duration: 1500
      //   })
      //   return
      // }
      if (code === 0) {
        /** 更新缓存中的用户个人信息 */
        if (this.keyName === 'nickname') {
          this.changeChatRoomNickName(this.input)
        } else {
          this.updateUserInfo({
            ...this.getUserInfo,
            [this.keyName]: this.input
          })
        }

        /** 关闭当前修改页 弹窗提示 */
        this.$emit('finished')
        this.$toast({
          message: '修改成功~',
          duration: 1500
        })
      } else {
        this.$toast({
          message: msg,
          duration: 1500
        })
      }
    }
  },
  created () {
    this.input = this.keyName === 'nickname' ? (this.chatRoom.init ? this.chatRoom.init.message.member.nickname : '') : ''
  }
}
</script>
