<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-11 11:28:19
 * @LastEditTime: 2019-11-06 20:59:43
 * @LastEditors: Please set LastEditors
 -->
<template>
  <section class="service-list">
    <Head fixed>
      <h3>{{ title }}</h3>
    </Head>
    <!-- <div class="service-type-list">
      <div v-for="(item, i) in types" :key="i + '_type'" class="service-type" @click="linkTo(item)">
        <h3><i v-if="item.icon" :class="item.icon" style="margin-right: 6px"></i>{{ item.name }}<i class="fa fa-angle-right fa-2x"></i></h3>
      </div>
    </div>-->
    <!-- @click.native="tabPage" -->
    <mt-navbar v-model="currentTab" fixed>
      <mt-tab-item id="service" v-if="other">在线客服</mt-tab-item>
      <mt-tab-item v-for="item in navList" v-show="item.enable" :key="item.name" :id="item.name">{{ item.title }}</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="currentTab">
      <mt-tab-container-item id="service" v-if="other">
        <div class="order-type-list">
          <div @click="otherJump" class="order-type">
            <h3>
              点击进入
              <i class="fa fa-angle-right fa-2x"></i>
            </h3>
          </div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="qq">
        <div class="service-content">
          <ul>
            <li class="item-bg" v-for="(each, inx) in list.qq" :key="inx + '_service'">
              <img class="img-icon" v-lazy="each.icon" alt />
              <h3 class="item-style">{{ each.name }}</h3>
              <h3>{{ each.tint }}</h3>
              <div class="copy-img">
                <span class="copy-span" :data-clipboard-text="each.contact" @click="linkTo">复制账号</span>
              </div>
            </li>
          </ul>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="weChat">
        <div class="service-content">
          <ul>
            <li class="item-bg" v-for="(each, inx) in list.weChat" :key="inx + '_service'">
              <img class="img-icon" v-lazy="each.icon" alt />
              <h3 class="item-style">{{ each.name }}</h3>
              <h3>{{ each.tint }}</h3>
              <div class="copy-img">
                <span class="copy-span" :data-clipboard-text="each.contact" @click="linkTo">复制账号</span>
              </div>
            </li>
          </ul>
        </div>
      </mt-tab-container-item >
      <mt-tab-container-item id ="hotLine">
        <div class="phone-box-img" v-for="(i,index) in list.hotLine" :key="index">
          <img src="../../assets/images/phone.png">
          <!-- <img :src="i.icon"> -->
          <p>{{i.name}}</p>
          <p>{{i.tint}}</p>
           <div class="copy-img">
                <span class="copy-span"><a :href='"tel://"+i.contact'>拨打电话</a></span>
            </div>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
  </section>
</template>

<script>
import Head from 'Components/global/head'
import { getServiceListApi } from 'Plugins/api'
import Clipboard from 'clipboard'
import { Toast } from 'mint-ui'
export default {
  name: 'onlineService',
  components: { Head },
  data () {
    return {
      title: '客服',
      currentTab: 'qq',
      beforeVal: '',
      list: {
        qq: [],
        weChat: [],
        hotLine: []
      },
      otherUlr: '',
      other: false,
      navList: [
        { title: 'QQ客服', name: 'qq', enable: false },
        { title: '微信客服', name: 'weChat', enable: false },
        { title: '电话客服', name: 'hotLine', enable: false }
      ]
    }
  },
  computed: {},
  created () {
    this.getThirdPartyData()
  },
  methods: {
    async getThirdPartyData () {
      const { data } = await getServiceListApi()
      for (var tem of data.data) {
        if (tem.type === 'qq') {
          this.list.qq = tem.links
        } else if (tem.type === 'hotLine') {
          this.list.hotLine = tem.links
        } else {
          this.list.weChat = tem.links
        }
        this.navList.map(e => {
          if (e.name === tem.type) {
            e.enable = true
          }
        })
      }
      console.log(this.navList)
      if (data.other) {
        this.otherUlr = data.other
        this.other = true
        this.currentTab = 'service'
      }
    },
    linkTo () {
      var clipboard = new Clipboard('.copy-span')
      clipboard.on('success', e => {
        Toast('复制成功')
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        Toast('该浏览器不支持自动复制')
        // 释放内存
        clipboard.destroy()
      })
    },
    otherJump () {
      window.location.href = this.otherUlr
    }
  }
}
</script>

<style lang="scss" scoped>
.phone-box-img{
       width: 40%;
    height: 5rem;
    text-align: center;
    margin-top: .5rem;
    float: left;
    background: #fff;
    border-radius: 29px;
    margin-left: 29px;
  img{
    width:59%;
    margin-bottom: 10px;
  }
  p{
    font-weight: normal;
    font-size: 14px;
    line-height: .53rem;
    // font-family: Georgia;
  }
}
.order-type-list {
  overflow: hidden;
  padding: 0 0.3125rem;
  .order-type {
    -moz-border-radius: 5px;
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-appearance: none;
    -webkit-appearance: none;
    position: relative;
    padding: 8px 12px;
    margin-top: 0.3125rem;
    background: #fff;
    cursor: pointer;
    &:active {
      background: #f9f4f9;
    }
    h3 {
      position: relative;
      font-size: 14px;
      color: #000;
      height: 0.875rem;
      line-height: 0.875rem;
    }
    .fa-2x {
      font-size: 0.625rem;
      font-weight: 400;
      position: absolute;
      right: 0;
      top: 4px;
    }
  }
}
.mint-navbar.is-fixed {
  top: 1.125rem;
}
.mint-tab-container {
  margin-top: 1.125rem;
}
.mint-tab-item-label {
  font-size: 20px !important;
}
.service-list {
  overflow: hidden;
  margin-top: 1.125rem;
  .service-content {
    margin: 0.34rem 0;
    ul {
      position: relative;
      overflow: hidden;
      // display: flex;
      // justify-content: space-evenly;
      // flex-wrap: wrap;
      li {
        float: left;
        margin-left: 9.166%;
        width: 36.25%;
        height: 4.5985rem;
        box-sizing: border-box;
        text-align: center;
        margin-bottom: 5px;
        padding: 0 5px;
        h3 {
          font-size: 14px;
          color: #333;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        a {
          display: block;
          width: 80px;
          margin-left: calc(50% - 40px);
          border-radius: 10px;
          color: #fff;
          background: blue;
          line-height: 24px;
        }
      }
    }
  }
  .img-icon {
    width: 1.324rem;
    margin: 0.195rem 0;
    overflow: hidden;
  }
  .item-bg {
    background: url('/mobile/images/new/app/bg@2x.png') no-repeat;
    background-size: 100% 100%;
  }
  .item-style {
    margin-bottom: 0.195rem;
  }
  .copy-img {
    background: url('/mobile/images/new/app/bg_fz@2x.png') no-repeat;
    background-size: 100% 100%;
    height: 0.658rem;
    width: 2.146rem;
    margin: 0.317rem auto;
    span {
      font-size: 14px;
      line-height: 0.658rem;
      color: #fff;
    }
  }
}
</style>
