<template>
  <section style="margin-top: 1.125rem; overflow: hidden;">

    <Head fixed :back="head">
      <!-- 顶部 tab 切换 -->
      <div class="open-title">
        <span :class="{ 'actived': model === 1 }" @click="model = 1">下级开户</span>
        <span :class="{ 'actived': model === 2 }" @click="model = 2, getManageData()">邀请管理</span>
      </div>
    </Head>

    <!-- 开户类型切换 -->
    <div class="open-type">
      <span>开户类型</span>
      <div class="open-type-point" :class="{ 'actived': role === 1 }"  @click="role = 1, getManageData()">
        <span></span>
        <label>代理类型</label>
      </div>
      <div class="open-type-point" :class="{ 'actived': role === 0 }"  @click="role = 0, getManageData()">
        <span></span>
        <label>玩家类型</label>
      </div>
    </div>

    <!-- 设置下级返点表单 -->
    <keep-alive>
      <OpenForm v-if="model === 1" :role="role" />
    </keep-alive>

    <!-- 邀请码列表 -->
    <OpenManage v-if="model === 2" :list="magane" :openRebate="openOperation" />

    <!-- 底部操作栏 -->
    <OperationPopup v-model="operation" :list="operationList" />

    <!-- 返点详情 -->
    <RebatePopup v-model="rebate" :shareData="shareData" />

    <!-- 二维码 -->
    <QrcodePopup v-model="qrcode" :qrcode="currentId" />

    <!-- 删除确认 -->
    <Confirm v-model="confirm" title="确认删除吗？" :callback="deleteCode" />

    <!-- 复制地址目标 -->
    <div class="copyCode" />

  </section>
</template>

<script>
import Head from 'Components/global/head'
import OpenForm from 'Components/agency/openForm'
import OpenManage from 'Components/agency/openManage'
import OperationPopup from 'Components/agency/operationPopup'
import RebatePopup from 'Components/agency/rebatePopup'
import QrcodePopup from 'Components/agency/qrcodePopup'
import Confirm from 'Components/global/confirm'
import { openManageApi, shareListApi, deleteCodeApi } from 'Plugins/api'
export default {
  components: {
    Head,
    OpenForm,
    OpenManage,
    RebatePopup,
    OperationPopup,
    QrcodePopup,
    Confirm
  },
  data () {
    return {
      model: 1, // 顶部 tab 索引
      role: 1, // 开户类型
      rebate: false, // 返点弹窗开关
      qrcode: false, // 二维码弹窗
      confirm: false, // 删除确认
      operation: false, // 底部操作栏
      magane: [], // 邀请码数据
      shareData: [], // 返点详情
      currentId: 0, // 当前被操作的数据 id 值
      operationList: [
        // 底部操作栏配置项
        { text: '查看二维码', callback: () => { this.qrcode = true } },
        { text: '复制推广链接', callback: this.copyUrl },
        { text: '查看返点', callback: this.getShareData },
        { text: '删除邀请码', callback: () => { this.confirm = true } },
        { text: '取消', callback: () => { this.operation = false } }
      ]
    }
  },
  computed: {
    head () {
      return !this.Utils.Storage.get('fromApp')
    }
  },
  methods: {
    openOperation ({ id }) {
      this.operation = true
      this.currentId = id
    },
    copyUrl () {
      /** 获取复制目标元素 添加需要复制的邀请码值 */
      const content = document.querySelector('.copyCode')
      content.innerHTML = location.origin + '?c=' + this.currentId

      /** 创建 range 并选中复制目标 */
      const range = document.createRange()
      range.selectNode(content)
      window.getSelection().removeAllRanges()
      window.getSelection().addRange(range)

      /** 复制成功与否 */
      if (document.execCommand('copy')) {
        document.execCommand('copy')
        this.$toast({
          message: '复制成功~',
          duration: 1800
        })
      } else {
        this.$toast({
          message: '您的浏览器可能不支持该复制功能，请尝试手动复制~',
          duration: 1800
        })
      }
    },
    async getManageData () {
      /** 下级开户页不发送请求 */
      if (this.model === 1) return

      /** 获取邀请码列表 */
      const res = await openManageApi({
        count: 15,
        offset: 0,
        role: this.role,
        total: 0
      })
      const { code, data } = res
      if (code === 0) {
        this.magane = data
      }
    },
    async getShareData () {
      /** 获取返点设置 */
      const res = await shareListApi({ id: this.currentId })
      this.shareData = res.data

      this.rebate = true
    },
    async deleteCode () {
      /** 关闭弹窗 */
      this.confirm = false

      /** 删除请求 */
      const res = await deleteCodeApi({ id: this.currentId })
      if (res.code === 0) {
        this.$toast({
          message: '删除成功',
          duration: 1800
        })

        /** 关闭操作弹窗 */
        this.operation = false

        /** 删除数组中对应数据 */
        const deleteIndex = this.magane.indexOf(this.magane.find(e => e.id === this.currentId))
        this.magane.splice(deleteIndex, 1)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.open-title {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: .7rem;
  display: flex;
  align-items: center;
  font-size: 14px;
  border: 1px solid #fff;
  color: #fff;
  border-radius: .15rem;
  overflow: hidden;
  span {
    display: inline-block;
    padding: 0 5px;
  }
  .actived {
    background: #fff;
    color: #d81e06;
  }
}
.open-type {
  background: #fff;
  margin-top: 3%;
  padding: 4% 2.5%;
  display: flex;
  font-size: .36rem;
  align-items: center;
  .open-type-point {
    margin-left: 20px;
    display: flex;
    align-items: center;
    span {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 1px solid #d81e06;
      text-indent: .15em;
      padding: 2px;
      margin-right: 10px;
    }
    &.actived span {
      background-color: #d81e06;
      background-clip: content-box;
    }
  }
}

.copyCode {
  position: fixed;
  left: -100%;
  top: -100%;
}
</style>
