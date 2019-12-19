<template>
  <Popup v-model="avatar" direction="right" :mask="false">
    <div class="avatar-mask" @click="popupControl({ key: 'avatar', val: false })" />

    <div class="avatar-popup">

      <div class="avatar-container">

        <div
          class="avatar-block"
          v-for="(a, index) in avatarList"
          :key="index"
          :class="{ 'avatar-checked': checked === index }"
        >
          <img :src="a" @click="checked = index">
        </div>

      </div>

      <div class="avatar-btn">
        <div class="redBtn" :disabled="!isChecked" @click="onSubmit">确定</div>
      </div>
    </div>
  </Popup>
</template>

<script>
import Popup from 'Components/global/popup'
import { getAvatarApi, updateAvatarApi } from 'Plugins/api'
import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
  components: { Popup },
  data () {
    return {
      checked: null,
      avatarList: []
    }
  },
  computed: {
    ...mapState({
      chatRoom: state => state.chatRoom
    }),
    ...mapGetters([ 'avatar', 'getUserInfo' ]),
    isChecked () {
      /** 是否选中头像 */
      return this.checked !== null
    }
  },
  methods: {
    ...mapMutations([ 'popupControl', 'updateUserInfo' ]),
    async getAvatar () {
      /** 获取系统头像 */
      const res = await getAvatarApi()
      this.avatarList = res.data
    },
    async onSubmit () {
      if (this.isChecked) {
        /**
         * @author Cyan
         * @var {String} openid 用户身份信息 修改头像必备参数
         * @description 先获取用户身份信息 提交修改请求 刷新用户个人信息
         */

        /** 获取用户身份信息 */
        const { openid } = this.chatRoom.init && this.chatRoom.init.message.member
        if (!openid) {
          return this.$toast({
            message: '您的身份信息丢失，请尝试重新登录后再试~',
            duration: 1800
          })
        }

        /** 提交修改请求 */
        const res = await updateAvatarApi({
          avatar: this.checked + 1,
          openid: openid,
          userId: this.getUserInfo.userId
        })
        const { code, msg } = res

        if (code === 0) {
          /** 更新缓存中的用户个人信息 避免请求压力 */
          const currentAvatar = this.avatarList[this.checked]
          this.updateUserInfo({
            ...this.getUserInfo,
            avatar: currentAvatar,
            headImg: currentAvatar
          })

          /** 关闭头像选择框 清空所选 */
          this.popupControl({ key: 'avatar', val: false })
          this.checked = null

          /** 弹窗提示 */
          this.$toast({
            message: '头像更新成功~',
            duration: 1800
          })
        } else {
          this.$toast({
            message: msg,
            duration: 1800
          })
        }
      }
    }
  },
  created () {
    this.getAvatar()
  }
}
</script>
<style lang="scss" scoped>
.avatar-mask {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
}
.avatar-popup {
  position: absolute;
  bottom: 0;
  background: #fff;
  width: 100%;
  z-index: 2;
  .avatar-container {
    display: flex;
    flex-wrap: wrap;
    margin-top: 24px;
    height: 186px;
    overflow-y: auto;
    .avatar-block {
      width: 25%;
      margin-bottom: 16px;
      text-align: center;
      img {
        height: 44px;
        height: 44px;
      }
    }
    .avatar-checked {
      position: relative;
      &::after {
        position: absolute;
        left: 60px;
        bottom: 0;
        content: '';
        width: 16px;
        height: 16px;
        background: url('/mobile/images/mine/withdrawal_success_done.png') no-repeat;
        background-size: contain;
      }
    }
  }
}
.redBtn {
  margin-top: 5px;
  margin-bottom: 10px;
}
</style>
