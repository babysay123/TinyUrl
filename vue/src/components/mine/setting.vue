<style lang="scss" scoped>
.setting-cell {
  height: calc(100% - 1.125rem);
  background: #f5f4f9;
}
.setting-cell-avatar {
  background: url('/mobile/images/mine/NOEERigthArrow_hui.png') no-repeat;
  background-color: #fff;
  background-position: 96% 50%;
  background-size: 18px;
  margin-bottom: .375rem;
  &:active {
    background: rgba(0, 0, 0, .1);
  }
}
.avatar-icon {
  width: 1.3125rem;
  height: 1.3125rem;
  margin-right: .5rem;
}
.setting-cell-item {
  display: flex;
  align-items: center;
  padding: 0 .4375rem;
  height: 1.625rem;
}
.setting-cell-logout {
  height: 1.25rem;
  line-height: 1.25rem;
  background: #fff;
  text-align: center;
  &:active {
    background: rgba(0, 0, 0, .1);
  }
}
</style>

<template>
  <Popup
    v-model="setting"
    direction="right"
  >

    <Head :backHandler="() => popupControl({ key: 'setting', val: false })">
      <h3>设置</h3>
    </Head>

    <div class="setting-cell">

      <div class="setting-cell-item setting-cell-avatar" @click="popupControl({ key: 'personalInfo', val: true })">
        <img class="avatar-icon" :src="getUserInfo.avatar || '/mobile/images/mine/geren_tou.png'">
        <span>{{ getUserInfo.account }}</span>
      </div>

      <Cell v-for="(c, index) in cell" :key="index">
        <CellItems
          v-for="(item, i) in c"
          :key="i"
          :title="item.title"
          @click.native="item.link ? routerLink({ path: item.link, redirect: item.redirect }) : item.callback && item.callback()"
        >
          <span v-if="item.arrow" slot="arrow" :class="item.class">{{ item.arrow }}</span>
        </CellItems>
      </Cell>

      <div class="setting-cell-logout" @click="outConfirm = true">
        <span class="text-red">退出当前账号</span>
      </div>

    </div>

    <Confirm
      v-model="outConfirm"
      :callback="logout"
      title="是否确认退出登录"
    />

    <DetailsSetting v-if="detailsSetting" :type="settingType" />
  </Popup>
</template>

<script>
import Head from 'Components/global/head_new'
import Popup from 'Components/global/popup'
import Cell from 'Components/global/cell'
import CellItems from 'Components/global/cellItems'
import Confirm from 'Components/global/confirm'
import DetailsSetting from './detailsSetting'
import { logoutApi } from 'Plugins/api'
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  components: { Head, Popup, Cell, CellItems, Confirm, DetailsSetting },
  data () {
    return {
      info: false,
      skip: false,
      outConfirm: false,
      throttle: false,
      settingType: 'notice',
      cell: {
        security: [
          { title: '安全中心', link: '/mobile/mine/editPwd.html', redirect: true }
        ],
        operation: [
          { title: '清空缓存',
            callback: () => {
              this.Utils.Storage.remove('noticeRead')
              setTimeout(() => {
                this.$toast({
                  message: '清除成功~',
                  duration: 1800
                })
              }, 500)
            }
          },
          { title: '消息提醒',
            callback: () => {
              this.settingType = 'notice'
              this.popupControl({ key: 'detailsSetting', val: true })
            }
          },
          { title: '通用设置',
            callback: () => {
              this.settingType = 'common'
              this.popupControl({ key: 'detailsSetting', val: true })
            }
          }
        ],
        about: [
          { title: '关于我们', link: '/mobile/mine/appAbout.html', redirect: true },
          { title: '当前版本', arrow: `V${this.Utils.version}`, class: 'text-gray' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([ 'getUserInfo', 'setting', 'detailsSetting' ])
  },
  methods: {
    ...mapMutations([ 'popupControl' ]),
    ...mapActions([ 'getNewAccessToken', 'websocket' ]),
    async logout () {
      /**
       * @author Cyan
       * @var {Boolean} throttle 节流控制 防止用户快速点击 重复发送请求
       * @description 退出请求 成功后清除用户信息 跳转首页
       */
      if (!this.throttle) {
        this.throttle = true

        const res = await logoutApi()
        const { code } = res
        if (code === 0) {
          /** 清除数据 跳转首页 */
          this.Utils.Storage.remove('sessionid')
          this.Utils.Storage.remove('user')
          this.Utils.Storage.remove('noticeRead')
          this.Utils.Storage.remove('ws')
          sessionStorage.clear()
          this.$router.replace('/index')
          await this.getNewAccessToken()
          this.websocket()
          this.$toast({
            message: '退出成功~',
            duration: 1800
          })
        }

        this.throttle = false
      }
    }
  },
  destroyed () {
    this.popupControl({ key: 'setting', val: false })
  }
}
</script>
