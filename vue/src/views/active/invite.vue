<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-17 15:22:30
 * @LastEditTime: 2019-08-18 20:11:20
 * @LastEditors: Please set LastEditors
 -->
<style lang="scss" scoped>
html,body{
  background: #f5f4f9;
  font-family:  PingFangSC-Regular, sans-serif;
}
.hold{
  width: 100%;
  height: 1rem;
}
.box-big{
  margin-top: 9px;
  font-size: 15px;
  li{
    line-height: 1rem;
    width: 100%;
    height: 1rem;
    background: #fff;
    margin-top: 5px;
    .content{
      display: block;
      margin-left:10px;
        .user{
          color: #DE2F2F;
          }
        .numpeople{
          margin-left: 63px;
        }
        .arrow_right{
            display:inline-block;
            border-style:solid;
            width:9px;
            height:9px;
            border-width:1px 1px 0 0;
            border-color:#ccc;
            transform: matrix(0.71,0.71,-0.71,0.71,0,0);
      }
    }
  }
}
.mint-cell{
  margin-top: 6px;
}
.box-text{
  background: #fff;
  width: 100%;
  height: 150px;
  margin-top: 6px;
}
.textar{
  width: 99%;
  height: 99px;
}
.ramk{
  font-size: 15px;
  width: 20%;
  height: 37px;
  line-height: 37px;
  margin-left: 10px;
}
.textar1{
  width: 94%;
  margin: auto;
  height: 102px;
  border-radius: 4px;
  border: #999 1px solid;
  text-align: center;
}
.mint-button{
  position: absolute; bottom:0;
}
.select{
  height: 100%;
  width: 100%;
  font-size: 15px;
  opacity:1;
  background: #fff;
  animation:showPanel 5s ease;
 -moz-animation:showPanel 5s ease-in;
 -webkit-animation:showPanel 1s ease;
 border-top:1px #9999992e solid;
  .left-close{
    float: left;
    width: 20%;
    text-align: center;
    position: absolute;
    color: #DE2F2F;
    margin-top: 12px;
  }
  .right-ok{
    color: #DE2F2F;
    width: 20%;
    float: right;
    position: absolute;
    text-align: center;
    margin-top: 12px;
    right: 0
  }
  .picker{
    margin-top: 20px;
  }
}
.picker-slot.picker-slot-center, .slot1 {
      font-size:15px !important;
    }
@keyframes showPanel
 {
 0%   {transform:scale(0.5);opacity:0.0;height:0%;}
 50%  {transform:scale(1.05);opacity:1.0;height:100%;}
 100% {transform:scale(1);opacity:1.0;height: 100%;}
 }
</style>
<template>
<div style="height:100%;" @mousewheel.prevent @touchmove.prevent>
    <Head :fixed="true">
      <h3>邀请奖</h3>
    </Head>
    <div class="hold"></div>
    <ul class="box-big">
      <li>
        <p class="content">
          <span>
            申请账号:
          </span>
          <span class="user">{{list.account}}</span>
        </p>
      </li>
    </ul>
    <mt-cell title="申请项目" is-link v-on:click.native="xiangmu">
       <span :style = "{ 'color': '#000', 'font-size':'13px' }">{{val}}
          </span>
    </mt-cell>
    <mt-cell title="领取金额" is-link v-on:click.native="lqje">
       <span :style = "{ 'color': '#000', 'font-size':'13px' }">{{RMB}}
          </span>
    </mt-cell>
    <div class="box-text">
      <div class="ramk">备注</div>
      <div class="textar1">
        <textarea class="textar" cols="47" rows="2" maxlength="50" placeholder="请输入申请描述"></textarea>
      </div>
    </div>
    <mt-button type="danger" v-if="!show" style="width:100%;" @click="submit">提交</mt-button>
    <template>
    <div class="select" v-show="show">
    <div class="left-close" @click="show=false">取消</div>
    <div class="right-ok" @click="sure">确定</div>
      <mt-picker :slots="slots" @change="onValuesChange"  :visible-item-count="5" :show-toolbar="show"  ref="picker" :value-key="btnFlang?'bonus':'item'">
      </mt-picker>
    </div>
    <Pop :asShow ='asShow' :content='content' :cancel='cancel'/>
</template>
</div>
</template>
<script>
import Head from 'Components/global/head_new.vue'
import Pop from 'Components/allpop'
export default {
  components: { Head, Pop },
  data () {
    return {
      val: '暂时不能领取此奖励',
      RMB: '暂时不能领取',
      lqnum: 1000,
      btnFlang: false,
      list: null,
      itemsid: null,
      asShow: false,
      content: null,
      cancel: null,
      obj: {
      },
      invId: this.Utils.Storage.get('inviteId'),
      slots: [
        {
          flex: 1,
          values: [],
          className: 'slot1',
          textAlign: 'center'
        }
      ],
      show: false,
      user: this.Utils.Storage.get('user')
    }
  },
  methods: {
    lqje () {
      this.btnFlang = true
      this.show = true
      console.log(this.slots, '')
    },
    sure () {
      this.show = false
    },
    openPicker () {
      this.$refs.picker.open()
    },
    xiangmu () {
      if (this.show) {
        this.btnFlang = false
        return
      }
      this.btnFlang = false
      this.show = true
    },
    onValuesChange (picker, values) {
      if (this.btnFlang) return
      if (values[0].id > this.list.flag) return
      console.log(values, '')
      this.val = values[0].item
      this.RMB = values[0].bonus
      this.itemsid = values[0].id
    },
    submit () {
      if (this.itemsid <= this.list.flag) {
        this.axios.post('/app/appView/addApplyPro.do', {
          'proid': Number(this.$route.query.avtid),
          'itemid': Number(this.itemsid),
          'remark': document.getElementsByClassName('textar')[0].value
        }).then(res => {
          if (res.code === 0) {
            this.asShow = true
            this.content = res.data
            this.cancel = 9
            setTimeout(() => {
              location.href = '/mobile/studio/#/preferActive'
            }, 1500)
          }
        })
      } else {
        this.$toast({
          message: '申请条件不符，请重新选择',
          position: 'middle',
          duration: 1000
        })
      }
    }
  },
  created () {
    this.axios.post('/app/appView/getProConfig.do', { 'userid': this.user.userId, 'proid': Number(this.$route.query.avtid) }).then(res => {
      if (res.code === 0) {
        this.list = res.data
        res.data.items.forEach((e, i) => {
          console.log(e.bonus, e.item, i, this.slots[0].values[i])
          this.slots[0].values.push(e)
        })
      }
    })
  }
}
</script>
