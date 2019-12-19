<template>
  <div style="background: #fff" :style="{ marginTop: !hideHead ? '1.125rem' : '' }">
		<Header fixed v-if="!hideHead">
			<h3>每日嘉奖</h3>
		</Header>

		<img :src="active.data.promotion || actImage" width="100%">

		<div class="bouns-details">
			<div>
				<span>当前等级：</span>
        <span class="text-red">VIP{{ active.vip || '未登录' }}</span>
			</div>
			<div>
				<span>昨日投注：</span>
        <span class="text-red">{{ active.betAmount || 0 }}</span>
			</div>
			<div>
				<span>嘉奖比例：</span>
        <span class="text-red">{{ awardPercent }}</span>
			</div>
			<div>
				<span>可得嘉奖：</span>
        <span class="text-red">{{ awardArr.awardAmount }}</span>
			</div>
		</div>

		<div
			class="bouns-btn"
			:class="btnStyle.class"
			@click="awardArr.awardAmount && getAward()"
		>
			{{ btnStyle.text }}
		</div>

		<div class="bouns-table">
			<Title title="嘉奖比例" />
			<Table :columns="active.everyDayColumns" :dataSource="active.tableData" />
		</div>

		<div class="bouns-explain">
			<Title title="活动说明" />
      <div>
        <p>1、每日嘉奖在每日凌晨00:20后开放领取；</p>
        <p>2、嘉奖比例是根据会员等级以及昨日累计投注金额进行一定比例的嘉奖；</p>
        <p>3、需Vip1以上且昨日投注额大于或等于{{ active.minAmount }}才能获得嘉奖；</p>
        <p>4、撤单和其他无效投注将不计算在内；</p>
        <p>5、活动奖金逾期未领取，视为自动放弃活动资格。</p>
      </div>
		</div>
	</div>
</template>

<script>
import Header from 'Components/global/head_new'
import Title from 'Components/active/title'
import Table from 'Components/active/table'
import GetClientUrlParams from 'Plugins/getClientUrlParams.js'
import { mapActions, mapGetters } from 'vuex'
import { getAwardApi } from 'Plugins/api'

export default {
  components: { Header, Title, Table },
  data () {
    return {
      actImage: '/mobile/images/activity1.jpg'
    }
  },
  computed: {
    ...mapGetters([ 'active' ]),
    hideHead () {
      return Object.keys(this.$route.query).length
    },
    awardArr () {
      /** 返回每日嘉奖数据 */
      if (this.active.awardRecord.length) {
        const awardObj = this.active.awardRecord.filter(e => e.awardType === 2)
        if (awardObj.length) {
          return awardObj.reverse()[0]
        }
      }

      return { awardAmount: 0 }
    },
    btnStyle () {
      /** 根据晋级奖励 渲染按钮 样式 */
      return !this.awardArr.awardAmount ? { class: '', text: '不可领取' } : { class: 'bouns-btn-active', text: '未领取' }
    },
    awardPercent () {
      /**
       * @constant {Number} betAmount 昨日投注金额
       * @constant {Arrary} amounts 金额数组
       * @constant {Arrary} userVipLevel 表格数组
       * @constant {String} vip 当前用户 vip 等级
       * @var {Boolean} enough 是否可领取状态
       * @var {Number} index vip 对应嘉奖比例索引
       * @var {Object} currentVipConfig 用户 vip 等级的对象配置
       * @var {Arrary} pencentArr vip 等级比例数组
       */
      const { betAmount, amounts, userVipLevel, vip } = this.active

      let enough = false
      let index = 0

      amounts.forEach((e, i) => {
        if (betAmount > e) {
          enough = true
          index = i
          return false
        }
      })

      /** 根据当前用户 vip 等级查找表格数据中的对应 vip 配置 */
      const currentVipConfig = userVipLevel.find(e => e.level === +vip)

      /** 解析 vip 赔率百分比 */
      const pencentArr = currentVipConfig && 'awardPencent' in currentVipConfig ? currentVipConfig.awardPencent.split(',') : [ 0 ]

      return enough ? `${pencentArr[index]}%` : `0%`
    }
  },
  methods: {
    ...mapActions([ 'getActiveData' ]),
    async getAward () {
      const { awardId } = this.awardArr

      const res = await getAwardApi({ awardIds: [ awardId ] })

      const { msg } = res

      this.$toast({
        message: msg,
        duration: 1800
      })

      this.getActiveData()
    }
  },
  created () {
    GetClientUrlParams(this.$route, this.getActiveData)
    this.$store.commit('voice', 'withdraw')
  }
}
</script>
