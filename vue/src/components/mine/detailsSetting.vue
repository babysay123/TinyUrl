<template>
  <Popup v-model="detailsSetting" direction="right">

    <Head :backHandler="closeHandler">
      <h3>{{ head }}</h3>
    </Head>

    <div class="detailsSetting">

      <Cell
        v-for="c in settingType"
        :key="c.head"
        :head="c.head"
      >
        <CellItems
          v-for="item in c.cell"
          :key="item.title"
          :title="item.title"
          :arrow="false"
        >

          <template v-if="!item.fontTemplate">
            <mt-switch
              slot="right"
              v-model="music[item.key]"
            />
          </template>

          <template v-else>
            <div slot="right" class="set-fontsize">

              <span
                v-for="f in fontArr"
                :key="f.text"
                :class="{ 'checked': fontSize === f.size }"
                @click="fontSize = f.size"
              >
                {{ f.text }}
              </span>

            </div>
          </template>

        </CellItems>
      </Cell>

    </div>
  </Popup>
</template>

<script>
import Head from 'Components/global/head'
import Popup from 'Components/global/popup'
import Cell from 'Components/global/cell'
import CellItems from 'Components/global/cellItems'
import { mapMutations, mapGetters } from 'vuex'
export default {
  components: { Head, Popup, Cell, CellItems },
  props: {
    type: {
      type: String,
      required: true
    }
  },
  data () {
    const music = this.Utils.Storage.get('music')
    const { click, message, plan, reg, openVoice } = music
    return {
      fontSize: 14,
      fontArr: [
        { text: '小', size: 14 },
        { text: '中', size: 16 },
        { text: '大', size: 18 }
      ],
      music: {
        shake: true,
        click,
        message,
        plan,
        reg,
        packet: reg,
        openVoice
      }
    }
  },
  watch: {
    fontSize (val) {
      /** 更改字体大小时 更改缓存 */
      const { userId } = this.getUserInfo
      const fontStorage = this.Utils.Storage.get('chatFontSize')
      this.Utils.Storage.save('chatFontSize', {
        ...fontStorage,
        [userId]: {
          fontSize: this.fontSize
        }
      })
      if (fontStorage && val !== fontStorage[userId].fontSize) {
        this.$toast({
          message: '修改成功。',
          duration: 1800
        })
      }
    }
  },
  mounted () {
    // 获取缓存字号
    const { userId } = this.getUserInfo
    const fontStorage = this.Utils.Storage.get('chatFontSize')
    if (fontStorage && fontStorage[userId]) {
      this.fontSize = fontStorage[userId].fontSize
    }
  },
  computed: {
    ...mapGetters([ 'getUserInfo', 'detailsSetting' ]),
    head () {
      return this.type === 'notice' ? '消息提醒' : '通用设置'
    },
    noticeSetting () {
      /** 消息提醒配置 */
      return {
        betting: {
          head: '投注区',
          cell: [
            { title: '摇一摇提醒', key: 'shake' },
            { title: '选号', key: 'click' }
          ]
        },
        chatroom: {
          head: '聊天室',
          cell: [
            { title: '聊天消息', key: 'message' }
            // { title: '抢红包提醒', key: 'reg' },
            // { title: '计划提醒', key: 'plan' }
          ]
        }
      }
    },
    commonSetting () {
      /** 通用设置配置 */
      return {
        voice: {
          head: '提示音',
          cell: [
            { title: '音效开关', key: 'openVoice' }
          ]
        },
        chatroom: {
          head: '聊天室',
          cell: [
            { title: '字体大小', fontTemplate: true }
          ]
        }
      }
    },
    settingType () {
      return this[`${this.type}Setting`]
    }
  },
  methods: {
    ...mapMutations([ 'popupControl' ]),
    closeHandler () {
      this.Utils.Storage.save('music', this.music)
      this.popupControl({ key: 'detailsSetting', val: false })
    }
  }
}
</script>

<style lang="scss" scoped>
.detailsSetting {
  height: calc(100% - 1.125rem);
  background: #f5f4f9;
}
.set-fontsize {
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 13px;
  color: #333;
  span {
    margin: 0 10px;
  }
  .checked {
    color: #89b1f3;
    font-size: 15px;
  }
}
</style>
