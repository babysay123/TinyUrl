<template>
  <!-- 开奖结果设置 -->
  <div class="resultSetting resultPop">
    <mt-popup class="popup" v-model="isShow" position="middle">
      <div class="title room-title active">
        <span v-html="title"></span>
        <!-- <div class="closeBtn" @click='isShow = false'></div> -->
      </div>
      <div  class="flex">
        <div class="label cell">{{periods.label}}:</div>
        <mt-radio class='cell small-cell' v-model='sl' :options="list"></mt-radio>
       </div>
      <template v-for="(item, index) in settingList">
        <div :key="index" class="flex">
          <div class="label cell">{{item.label}}:</div>
          <mt-radio class='cell' v-model="settingConfig[item.key]" :options="options"></mt-radio>
        </div>
      </template>
      <div class="flex btnCell">
        <span class="cancel whitBtn btn" @click="cancel">取消</span>
        <span class="redBtn btn" size="small" @click="determine">确定</span>
      </div>
    </mt-popup>
  </div>
</template>
<script>
import Logger from '@/plugins/utils/logger'
export default {
  name: 'result-setting',
  data () {
    return {
      settingConfig: {
        brokenLine: 'true', omission: 'true', statistics: 'true', layered: 'true'
      },
      title: '走势图设置',
      isShow: null,
      sl: '20', // 期数值
      options: [{ label: '显示', value: 'true' }, { label: '隐藏', value: 'false' }],
      list: [{ label: '20', value: '20' }, { label: '30', value: '30' }, { label: '50', value: '50' }, { label: '100', value: '100' }]
    }
  },
  // 传递参数
  props: [
    // 传递数组形式 分别以label，key，value，
    // label：显示的label key:将以settingConfig中的key值传递过去，value，当前的值，true or false
    // [{label:'',key:'',value:''}]
    'settingList',
    'popupVisible',
    'periods',
    'select'

  ],
  watch: {
    'popupVisible': {
      immediate: true,
      handler: function (e) {
        // console.log(1234566)
        this.isShow = true
      }
    },
    'select': {
      handler: function (e) {
        console.log(e)
        this.sl = e
      }
    }

  },
  methods: {
    getSetConfig () {
      if (!Array.isArray(this.settingList)) {
        Logger.warn('传递数组啊，大胸弟~')
        return
      }
      this.settingList.forEach(element => {
        this.settingConfig[element.key] = element.value.toString()
      })
      if (this.popupVisible) {
        Logger.log('走势图设置')
      }
    },
    __hidePopup () {
      this.isShow = false
    },
    /**
     * 取消事件
     */
    cancel () {
      for (let key in this.settingConfig) {
        this.settingConfig[key] = 'true'
      }
      this.sl = '20'
      this.__hidePopup()
      this.$emit('cancel')
    },
    /**
     * 确定事件，参数为设定的值
     */
    determine () {
      this.__hidePopup()
      this.$emit('determine', this.settingConfig, this.sl)
    }
  },
  mounted () {
    this.isShow = this.popupVisible
  },
  created () {
    console.log('st12', this.settingList)
    this.getSetConfig()
  }
}
</script>
<style lang="scss">
@import "./../../assets/css/normalize";
.resultSetting {
  .mint-radiolist-label,
  .mint-radiolist {
    display: flex;
    align-items: center;
    padding: 0;
  }
  .mint-cell {
    background: transparent;
  }
  .mint-radio-input:checked + .mint-radio-core {
    background-color: $baseCol;
    border-color: $baseCol;
  }
  .mint-radiolist-title:empty{
    margin: 0;
  }
  .mint-cell-wrapper{
    padding: 0 4px;
  }
}
</style>

<style lang="less" scoped>
.resultSetting {
  .mint-radiolist-label {
    display: flex;
    align-items: center;
  }
  .h3 {
    font-size: 0.6rem;
    padding: 0.7rem;
    border-bottom: 1px solid #e5e5e5;
  }
  .cell{
    display: flex;
    // flex:1;
    // &:first-child{
    //   // justify-content: flex-end;
    // }
    &:last-child{
      flex:3;
    }
  }

  .btnCell {
    border-top: 2px solid #eee;
    margin-bottom: 0;
    span {
      display: flex;
      width: 90%;
      justify-content: center;
      margin: 10px 20px;
    }
  }
  .cancel {
    margin-right: 10px;
  }
}
</style>
