<template>
  <section>
    <TimePicker />

    <Search placeholder="下级账号查询" />

    <div class="subordinate-list">
      <yd-infinitescroll :callback="getData" ref="infinitescrollDemo">
        <table class="subordinateTable" cellspacing="0" cellpadding="0" slot="list">
          <thead>
            <tr>
              <td>账号</td>
              <td>类型</td>
              <td>报表人数</td>
              <td>盈利</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(l, index) in reports" :key="index" @click="openOeration(l)">
              <td>{{ l.userAccount }}</td>
              <td>{{ currentLevel }}级{{ l.role | role }}</td>
              <td :class="{ 'text-red': l.number > 0 }">
                {{ l.number }}
                <i v-if="l.number > 0" class="fa fa-arrow-down"></i>
              </td>
              <td>{{ l.teamProfit | numFixed(3) }}</td>
            </tr>
          </tbody>
        </table>
      </yd-infinitescroll>
    </div>

    <OperationPopup v-model="operation" :list="operationList" />

  </section>
</template>

<script>
import TimePicker from 'Components/agency/timePicker'
import Search from 'Components/agency/search'
import OperationPopup from 'Components/agency/operationPopup'
import { subordinateReportApi } from 'Plugins/api'
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  components: { TimePicker, OperationPopup, Search },
  data () {
    return {
      reports: [],
      isAll: false, // 是否已加载完数据
      agencyArr: [], // 代理数据链
      operation: false, // 操作弹窗
      // 当前被操作的会员对象
      currentItem: {}
    }
  },
  filters: {
    role (role) {
      return role === 1 ? '代理' : '会员'
    }
  },
  computed: {
    ...mapGetters([ 'getUserInfo', 'agencyParams' ]),
    operationList () {
      const basicConfig = [
        {
          text: '详情报表',
          callback: () => {
            const { userAccount } = this.currentItem
            this.routerLink({
              path: '/agency_reports',
              params: {
                userAccount
              }
            })
          }
        },
        {
          text: '查看下级',
          callback: this.checkSubordinate,
          hide: this.currentItem && this.currentItem.number === 0
        },
        {
          text: '返回上级',
          callback: this.backHandler,
          hide: this.agencyArr.length < 2
        },
        {
          text: '取消',
          callback: () => {
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.operation = false
          }
        }
      ]
      return basicConfig.filter(e => !e.hide)
    },
    currentLevel () {
      const { userId } = this.getUserInfo
      const myIndex = this.agencyArr.indexOf(this.agencyArr.find(e => e.userId === userId))
      return myIndex === 0 ? 1 : myIndex + 1
    }
  },
  methods: {
    ...mapMutations([ 'setAgencyState' ]),
    ...mapActions([ 'agencyParamsCallback' ]),
    async backHandler () {
      /** 当前如果在二级几以上用户则获取其上一级用户 id 值 重新获取上一级用户数据以返回 */
      if (this.currentLevel > 1) {
        const { userId } = this.agencyArr[1]
        await this.agencyParamsCallback({ userId })
        this.getData('return')
      } else {
        this.$router.go(-1)
      }
      this.operation = false
    },
    openOeration (item) {
      this.currentItem = item
      this.operation = true
    },
    async checkSubordinate () {
      /** 获取需要查看下级会员的账号 id 修改提交参数 重新请求 */
      const { userId } = this.currentItem
      await this.agencyParamsCallback({ userId })
      this.getData('subordinate')
      this.operation = false
    },
    async getData (type) {
      if (this.isAll && !type) return

      if (type) {
        // 容器置顶 滚动刷新组件初始化
        this.reports = []
        const container = document.querySelector('.subordinate-list')
        container.scrollTo(0, 0)
        // this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.reInit')
      }

      /** 获取 count offset account 参数 根据不同情况会进行修改传递 */
      const { count, offset } = this.agencyParams

      const res = await subordinateReportApi({
        ...this.agencyParams,
        offset: type ? 0 : offset
      })

      const { code, data } = res

      if (code === 0) {
        if (data) {
          /** 代理数据链 */
          this.agencyArr = data.agentLine

          /** 其他操作的新数据请求 会重置当前数据组 否则累加实现滚动加载 */
          this.reports = type ? data.dataList : [ ...this.reports, ...data.dataList ]

          const newOffset = type ? count : offset + count

          // 更新offset
          this.setAgencyState({
            agencyParams: {
              ...this.agencyParams,
              offset: newOffset
            }
          })

          this.isAll = false

          if (newOffset >= res.rows - count) {
            // 加载完毕
            this.isAll = true
            // this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone')
          }
        } else {
          this.$toast({
            message: '无此账号数据~',
            duration: 1800
          })
        }
      }

      // 每次加载完成
      // this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad')
    }
  },
  created () {
    const { userId } = this.getUserInfo
    this.setAgencyState({
      agencyFunc: this.getData,
      agencyParams: {
        userId,
        count: 15,
        offset: 0,
        account: ''
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.subordinate-list {
  height: calc(100vh - 1.125rem - 86px);
  overflow-y: auto;
}

.subordinateTable {
  width: 100%;
  thead {
    background: #d81e06;
    color: #fff;
  }
  td {
    width: 25%;
    font-size: .42rem;
    line-height: 1rem;
    text-align: center;
  }
}
.allData {
  color: #333;
  font-size: 12px;
  line-height: 40px;
  text-align: center;
}
</style>
