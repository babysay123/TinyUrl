<style lang="scss" scoped>
.personal-info-cell {
  height: calc(100% - 1.125rem);
  background: #f5f4f9;
}
.setting-cell-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 .4375rem;
  border-bottom: 1px solid #eee;
  height: 2rem;
  line-height: 2rem;
  font-size: 14px;
}
.setting-cell-avatar {
  background: url('/mobile/images/mine/NOEERigthArrow_hui.png') no-repeat;
  background-color: #fff;
  background-position: 96% 50%;
  background-size: 18px;
  &:active {
    background: rgba(0, 0, 0, .1);
  }
}
.avatar-icon {
  width: 1.3125rem;
  height: 1.3125rem;
  margin-right: .7rem;
}

.cell-items-right {
  color: #a1a1a1;
}
.menu-right i {
  position: absolute;
  top: 0;
  right: 10px;
}
</style>

<template>
  <Popup
    v-model="personalInfo"
    direction="right"
  >
    <Head :backHandler="() => popupControl({ key: 'personalInfo', val: false })">
      <h3>个人中心</h3>
      <a class="menu-right" @click="confirm = true">
        <i class="fa fa-question-circle-o fa-fw fa-lg" />
      </a>
    </Head>

    <div class="personal-info-cell">

      <div class="setting-cell-item setting-cell-avatar" @click="popupControl({ key: 'avatar', val: true })">
        <span>头像</span>
        <img class="avatar-icon" :src="getUserInfo.avatar || '/mobile/images/mine/geren_tou.png'">
      </div>

      <Cell v-for="(c, index) in userCell" :key="index">
        <CellItems
          v-for="(item, i) in c"
          :key="i"
          :title="item.title"
          :callback="!item.right || item.change ? isBind : null"
          :arrow="item.arrow || !item.right"
        >
          <span slot="right">

            <template v-if="item.right">
              <span>{{ hide(item.right, item.hideRule) }}</span>
            </template>

            <template v-else>
              <span class="text-gray">{{ item.placeholder }}</span>
            </template>

          </span>
        </CellItems>
      </Cell>

    </div>

    <Avatar v-if="avatar" />

    <Modify v-if="type" v-model="modify" :type="type" />

    <Confirm
      v-model="confirm"
      :cancel="false"
      title="温馨提示"
    >
      <div slot="subheading" style="margin-top: 20px;">
        <p>亲，头像、聊天室昵称可修改。</p>
        <p>(其他信息只能修改一次，想再次修改请联系客服)</p>
      </div>
    </Confirm>
  </Popup>
</template>

<script>
import Head from 'Components/global/head_new'
import Cell from 'Components/global/cell'
import CellItems from 'Components/global/cellItems'
import Popup from 'Components/global/popup'
import Modify from './modify'
import Avatar from './avatar'
import Confirm from 'Components/global/confirm'
import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
  components: { Head, Cell, CellItems, Popup, Modify, Avatar, Confirm },
  data () {
    return {
      modify: false,
      type: '',
      confirm: false
    }
  },
  computed: {
    ...mapState({
      chatRoom: state => state.chatRoom
    }),
    ...mapGetters([ 'getUserInfo', 'personalInfo', 'avatar' ]),
    userCell () {
      // 获取用户数据
      const userInfo = this.getUserInfo
      const { nickname } = this.chatRoom.init ? this.chatRoom.init.message.member : ''
      return {
        basic: [
          { title: '账号', right: userInfo.account },
          { title: '等级', right: `V${userInfo.levelId}` },
          { title: '身份', right: `${userInfo.role === 1 ? '代理' : '会员'}` }
        ],
        chatroom: [
          { title: '聊天室昵称', right: nickname, arrow: true, change: true }
        ],
        auth: [
          {
            title: '真实姓名',
            right: userInfo.username,
            hideRule: 's',
            placeholder: '请点击填写真实姓名'
          },
          {
            title: '手机号',
            right: userInfo.phone,
            hideRule: 's&e',
            placeholder: '请点击填写手机号'
          },
          {
            title: 'QQ号',
            right: userInfo.QQ,
            hideRule: 's&e',
            placeholder: '请点击填写QQ号'
          },
          {
            title: '邮箱',
            right: userInfo.email,
            hideRule: 's2',
            placeholder: '请点击填写邮箱'
          },
          {
            title: '微信',
            right: userInfo.wechat,
            hideRule: 's&e',
            placeholder: '请点击填写微信'
          }
        ]
      }
    }
  },
  methods: {
    ...mapMutations([ 'popupControl' ]),
    hide (val, hideRule) {
      const atk = []
      const length = val.length
      switch (hideRule) {
        case 's':
          for (let index = 0; index < length; index++) {
            atk.push('*')
          }
          return `${val.slice(0, 1)}${atk.slice(1).join('')}`
        case 's2':
          const atkLength = val.split('@')[0].length - 2
          const reg = new RegExp(`[\\s\\S]{${atkLength}}@`)
          for (let index = 0; index < atkLength; index++) {
            atk.push('*')
          }
          const replaceText = `${atk.join('')}@`
          return val.replace(reg, replaceText)
          // return `${val.slice(0, 2)}${atk.join('')}@${val.split('@')[1]}`
        case 's&e':
          for (let index = 0; index < length - 4; index++) {
            atk.push('*')
          }
          return `${val.slice(0, 2)}${atk.join('')}${val.slice(-2)}`
        default:
          return val
      }
    },
    isBind (type) {
      this.type = type
      this.modify = true
    }
  }
}
</script>
