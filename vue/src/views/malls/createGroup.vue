<template>
  <section>
    <Head>
      <h3>创建群</h3>
    </Head>

    <!-- form -->
    <el-form
      :model="ruleForm"
      :rules="rules"
      :label-position="'left'"
      ref="ruleForm"
      label-width="22%"
      class="common-rule-form"
    >
      <el-form-item
        label="群类型"
        prop="region"
        class="align-right"
      >
        <a class="setting-input" @click="toggleGroupType">
          <el-input
            v-model="ruleForm.region"
            placeholder="选择群类型"
            suffix-icon="el-icon-arrow-right"
            :disabled="true"
          ></el-input>
        </a>
      </el-form-item>
      <el-form-item
        class="align-right"
        label="群名称"
        prop="name"
      >
        <el-input
          v-model="ruleForm.name"
          :maxlength="20"
          :minlength="1"
          placeholder="限制1~20个字符"></el-input>
      </el-form-item>

      <el-form-item
        class="align-right"
        label="群公告"
        prop="notices"
      >
        <a class="setting-input" @click="toggleNotices">
          <el-input
            class="set-input-textarea"
            v-model="ruleForm.notices"
            placeholder="设置"
            suffix-icon="el-icon-arrow-right"
            :disabled="true"
          ></el-input>
        </a>
      </el-form-item>
      <div style="height: 10px;"></div>

      <el-form-item
        v-if="showRedpacket"
        class="align-right"
        label="红包设置"
        prop="redpacket"
      >
        <a class="setting-input" @click="toggleRedpacket">
          <el-input
            class="set-input-textarea"
            v-model="ruleForm.redpacket"
            placeholder="设置"
            suffix-icon="el-icon-arrow-right"
            :disabled="true"
          ></el-input>
        </a>
      </el-form-item>
      <el-form-item
        class="align-right"
        label="是否禁言"
        prop="nosend"
      >
        <span class="switch-msg">{{ ruleForm.nosend ? '已禁言' : '不禁言' }}</span>
        <el-switch v-model="ruleForm.nosend"></el-switch>
      </el-form-item>

      <el-form-item
        class="align-right"
        label="是否禁图"
        prop="noimg"
      >
        <span class="switch-msg">{{ ruleForm.noimg ? '已禁图' : '不禁图' }}</span>
        <el-switch v-model="ruleForm.noimg"></el-switch>
      </el-form-item>

      <div
        class="common-btn redBtn size15"
        @click="submitForm('ruleForm')"
      >创建群</div>
      <h4 class="form-tips h4">提示：每个用户只允许创建一个群</h4>
    </el-form>

    <!-- dialog -->
    <el-dialog
      title="选择群类型"
      class="dialog-restyle"
      :width="'84%'"
      :show-close="false"
      :center="true"
      :destroy-on-close="true"
      :visible.sync="dialogs.typeVisible"
    >
      <div class="dialog-type-box">
        <nav>
          <a
            v-for="(ty, inx) in typeList"
            :class="ty.name === ruleForm.region ? 'active' : ''"
            :key="inx + '-type-list'"
            @click="clickType(ty)"
          >{{ ty.name }}</a>
        </nav>
      </div>
      <div class="dialog-bottom">
        <a class="dialog-btn btn-red" @click="dialogs.typeVisible = false, ruleForm.redpacket = ''">确定</a>
      </div>
    </el-dialog>

    <!--  -->
    <el-dialog
      class="dialog-fullstyle"
      :show-close="false"
      :center="true"
      :destroy-on-close="true"
      :fullscreen="true"
      :visible.sync="dialogs.noticeVisible"
    >
      <div class="dialog-notice-box">
        <Head :backHandler="closeNotice">
          <h3>群公告</h3>
          <a class="head-btn" @click="closeNotice">完成</a>
        </Head>
        <el-input
          type="textarea"
          :autosize="{ minRows: 10 }"
          :autocomplete="'off'"
          :show-word-limit="true"
          :maxlength="900"
          style="border: none;"
          placeholder="请输入群公告"
          v-model="ruleForm.notices">
        </el-input>
      </div>
    </el-dialog>

    <!--  -->
    <el-dialog
      class="dialog-fullstyle"
      :show-close="false"
      :center="true"
      :destroy-on-close="true"
      :fullscreen="true"
      :visible.sync="dialogs.redpacketVisible"
    >
      <div class="dialog-redpacket-box">
        <Head :backHandler="closeRedpacket">
          <h3>红包设置</h3>
        </Head>

        <!-- MineClearance-扫雷 -->
        <div
          class="dialog-redpacket-list"
          v-if="redpacketConfig.type && (redpacketConfig.type.includes('MineClearance') || redpacketConfig.type.includes('WelfareChat'))"
        >
          <div class="redpacket-li">
            <span>发包包数</span>
            <nav class="inline">
              <a
                v-for="(e, i) in redpacketConfig.packets || []"
                :key="i + '-packets'"
                :class="redpacketSelect.count === i && 'active'"
                @click="choosePackage('count', e)"
              >{{ e.num }}</a>
            </nav>
          </div>

          <div class="redpacket-li">
            <span>发包金额范围</span>
            <nav class="block">
              <a
                v-for="(e, i) in redpacketConfig.templateMonies || []"
                :key="i + '-range'"
                :class="redpacketSelect.range === i && 'active'"
                @click="choosePackage('range', e)"
              >{{ `${e.min}~${e.max}元` }}</a>
            </nav>
          </div>
        </div>

        <!-- Bullfight-牛牛 -->
        <div
          class="dialog-redpacket-list"
          v-if="redpacketConfig.type === 'Bullfight'"
        >
          <div class="redpacket-li">
            <span>发包包数</span>
            <span class="inline">{{ `${redpacketConfig.minCount}-${redpacketConfig.maxCount}包` }}</span>
          </div>

          <div class="redpacket-li">
            <span>发包金额范围</span>
            <nav class="block">
              <a
                v-for="(e, i) in redpacketConfig.templateMonies || []"
                :key="i + '-range'"
                :class="redpacketSelect.range === i && 'active'"
                @click="choosePackage('range', e)"
              >{{ `${e.min}~${e.max}元` }}</a>
            </nav>
          </div>
        </div>

        <!-- SuperBullfight or TwoEight -->
        <div
          class="dialog-redpacket-list"
          v-if="redpacketConfig.type === 'SuperBullfight' || redpacketConfig.type === 'TwoEight'"
        >
          <div class="redpacket-li">
            <div class="block-span">抢庄加注金额
              <h5>本次投注在上一次抢庄金额基础上增多少金额</h5>
            </div>
            <nav class="block">
              <a
                v-for="(e, i) in redpacketConfig.continuousAmount || []"
                :key="i + '-conntinu-amount'"
                :class="redpacketSelect.amount === i && 'active'"
                @click="choosePrize('continuousAmount', i)">
                {{ e + '元' }}
              </a>
            </nav>
          </div>

          <div class="redpacket-li" style="border-top: 10px solid #f5f4f5;">
            <div class="block-span">连续上庄支付比例
              <h5>上一期上庄金额的百分之多少</h5>
            </div>
            <nav class="block">
              <a
                v-for="(e, i) in redpacketConfig.continuousRatio || []"
                :key="i + '-ratio'"
                :class="redpacketSelect.ratio === i && 'active'"
                @click="choosePrize('continuousRatio', i)"
              >{{ `${e}%` }}</a>
            </nav>
          </div>
        </div>

        <div
          class="common-btn redBtn size15"
          @click="clickRedpacketSetting()"
          style="font-size: 14px; line-height: 36px; height: 36px;"
        >保存并返回</div>
      </div>
    </el-dialog>

  </section>
</template>

<script>
import Head from 'Components/global/head'
import {
  chatRoomTypeApi,
  chatRoomProfileApi,
  chatRoomCreateApi
} from 'Plugins/api'

export default {
  name: 'create-group',
  components: {
    Head
  },
  data () {
    return {
      base: '',
      redpacketType: {},
      redpacketConfig: {},
      redpacketSelect: {
        range: 0,
        count: 0,
        ratio: 0,
        amount: 0
      },
      showRedpacket: false,
      ruleForm: {
        name: '',
        region: '',
        notices: '',
        redpacket: '',
        nosend: false,
        noimg: false
        // desc: ''
      },
      dialogs: {
        typeVisible: false,
        noticeVisible: false,
        redpacketVisible: false
      },
      rules: {
        name: { required: true, message: '群名称不能为空~' },
        region: { required: true, message: '群公告不能为空~' },
        redpacket: { required: true, message: '红包设置不能为空~' }
        // date1: [
        //   { type: 'date', required: true, message: '请选择日期' }
        // ],
        // type: [
        //   { type: 'array', required: true, message: '请至少选择一个活动性质' }
        // ],
        // desc: [
        //   { required: true, message: '请填写详细描述' }
        // ]
      },
      typeList: [],
      gridData: []
    }
  },
  watch: {
    'ruleForm.region': {
      handler (data) {
        const WelfareChat = 'WelfareChat' // 没有红包设置字段
        if (this.redpacketType && this.redpacketType.type !== WelfareChat) {
          this.showRedpacket = true
        } else {
          this.showRedpacket = false
        }
      },
      deep: true
    }
  },
  created () {
    this.init()
  },
  methods: {
    closeNotice () {
      this.dialogs.noticeVisible = false
    },
    closeRedpacket () {
      this.dialogs.redpacketVisible = false
    },
    clickType (item) {
      this.redpacketType = item
      this.ruleForm.region = item.name
    },
    clickRedpacketSetting () {
      this.dialogs.redpacketVisible = false
    },
    choosePackage (key, val) {
      console.log(key, val)
    },
    choosePrize (key, inx) {
      console.log(key, inx)
    },
    async init () {
      const { code, data } = await chatRoomTypeApi()
      if (code === 0) {
        this.typeList = data
      }
    },
    formValid (formName) {
      let flag = true
      // Object
      //   .keys(this.ruleForm)
      //   .forEach(e => {
      //     const item = this.ruleForm[e]
      //     const rule = this.rules[e]
      //     if (flag && typeof item === 'string') {
      //       // 不能为空
      //       if (item.length === 0 && rule.required) {
      //         flag = false
      //         this.warnMsgs(rule.message)
      //       }
      //     }
      //   })
      this.$refs[formName]
        .fields
        .forEach(each => {
          const { prop } = each
          // console.log(prop)
          // if (this.showRedpacket && prop) {  }
          const item = this.ruleForm[prop]
          const rule = this.rules[prop]
          if (
            (flag && typeof item === 'string') &&
            (item.length === 0 && rule && rule.required)
          ) {
            flag = false
            this.warnMsgs(rule.message)
          }
        })
      return flag
    },
    async submitForm (formName) {
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //     alert('submit!')
      //   } else {
      //     return false
      //   }
      // })
      // console.log(this.$refs[formName])
      if (!this.formValid(formName)) { return }
      const { name, region, notices, nosend, noimg, redpacket } = this.ruleForm
      console.log(redpacket)

      // 验证输入
      let params = {
        'type': 'RedPacketGames', // 固定值 RedPacketGames
        'category': this.typeList.find(e => e.name === region).type, // 'Bullfight', // 玩法类别
        'name': name,
        'describe': notices,
        'noSpeak': nosend, // 是否禁言 (抢庄玩法该值固定为false)
        'noPhoto': noimg, // 是否禁图 (抢庄玩法该值固定为false)
        'minPacketNum': 6, // 最小发包数量 (扫雷只能单选一个发包数量的和maxPacketNum值一样)
        'maxPacketNum': 6, // 最大发包数量 (扫雷只能单选一个发包数量的和minPacketNum值一样)
        'minAmount': 1000, // 最小金额 以分为单位 (抢庄玩法该值固定为0)
        'maxAmount': 2000, // 最大金额 以分为单位 (抢庄玩法该值固定为0)
        'fillAmount': 1000, // 最小抢庄加注金额 (抢庄玩法该值必填且大于0, 其他玩法固定为0)
        'bankerScale': 15 // 连续上庄加注比例 (抢庄玩法该值必填且大于0, 其他玩法固定为0)
      }

      // create api
      const { code } = await chatRoomCreateApi(params)
      if (code === 0) {
        this.successMsgs('群组创建成功~')
        this.routerLink({
          path: '/malls/gameMall'
        })
      }
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    // 选择组类型
    toggleGroupType (events) {
      // console.log(this, events)
      this.dialogs.typeVisible = true
    },
    toggleNotices () {
      this.dialogs.noticeVisible = true
    },
    async toggleRedpacket () {
      this.dialogs.redpacketVisible = true
      const load = this.$loading({
        lock: true
      })
      const { code, data } = await chatRoomProfileApi(this.redpacketType.type)
      if (code === 0) {
        this.redpacketConfig = data
      }
      setTimeout(() => {
        load.close()
      }, 600)
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'Assets/css/form/index.scss';
.switch-msg {
  font-size: 0.375rem;
  margin-right: 5px;
}

/deep/ .el-textarea {
  textarea {
    border: none;
  }
}

.head-btn {
  position: absolute;
  right: 0;
  // width: 12%;
}

/deep/ .set-input-textarea {
  /deep/ input {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.dialog-redpacket-list {

}

.block-span {
  display: block;
  line-height: 24px;
  margin: 4px 0;
  h5 {
    font-weight: 100;
    color: #aaa;
    // line-height: 22px;
  }
}

.redpacket-li {
  position: relative;
  border-bottom: 1px solid #eee;
  line-height: 38px;
  // height: 38px;
  box-sizing: border-box;
  padding: 0 15px;
  overflow: hidden;
  // &:last-child {
  //   border-bottom: none;
  // }
  span {
    font-size: 0.375rem;
  }
  .inline {
    float: right;
    display: block;
    a {
      display: block;
      border-radius: 50%;
      border: 1px solid #222;
      font-size: 0.375rem;

      margin-left: 10px;
      margin-top: 5px;
      width: 28px;
      height: 28px;
      line-height: 28px;
      float: left;
      text-align: center;
      box-sizing: border-box;
      &:active, &.active {
        border-color: $baseRed;
        background: $baseRed;
        color: #fff;
      }
    }
  }
  .block {
    display: block;
    // margin: 10px 0px 0 0px;
    line-height: 30px;
    a {
      display: inline-block;
      font-size: 0.375rem;
      box-sizing: border-box;
      width: calc((100% - 15px) / 2);
      border: 1px solid #222;
      text-align: center;
      border-radius: 6px;
      margin-right: 15px;
      margin-bottom: 15px;
      &:nth-child(2n) {
        margin-right: 0;
      }
      &:active, &.active {
        border-color: $baseRed;
        background: $baseRed;
        color: #fff;
      }
    }
  }
}

// other
/deep/ .size15 {
  font-size: 15px;
  margin: 15px;
}
</style>
