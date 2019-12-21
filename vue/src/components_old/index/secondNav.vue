<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-17 14:12:25
 * @LastEditTime: 2019-10-03 17:01:04
 * @LastEditors: Please set LastEditors
 -->
<template>
  <section class="flow">
    <div
      class="box"
      v-for="(i,index) in platformlist"
      :key="index"
      @click="i.enable ? toSlide(i.platformCode, i.name) : maintenance()"
      :style="platformType === 'lottery' ? 'width: 25%;' : platformlist.length < 4 ? 'width: 100%;' : '' "
    >
      <!-- :style="platformType === 'live' ? 'margin-left:2%;width:48%' :platformType==='lottery'?'margin-left:2.5%;width:30%':''" -->
      <p v-if="!i.enable" class="grayTaxt">维护中</p>
      <img
        :class="gameStyle(i)"
        v-lazy="platformlist.length < 4 ? i.imageUrl.replace('.png', '_horizontal.png') : i.imageUrl"
        :key="i.imageUrl"
        alt
      />
    </div>
  </section>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
  props: ['platformlist', 'platformType'],
  data () {
    return {
    }
  },
  computed: {
    gameStyle (item) {
      return function (item) {
        var styleList = this.platformlist.length < 4 ? 'box-img' : 'box-img small-img'
        styleList += item.enable ? '' : ' gray'
        return styleList
      }
    }
  },
  methods: {
    toSlide (gameCode, gameName) {
      let path = this.platformType === 'lottery' ? '/buyMall' : '/gameList'
      this.$router.push({
        path,
        // path: '/gameList',
        query: { Type: this.platformType, CodeType: gameCode, Name: gameName }
      })
    },
    maintenance () {
      Toast({
        message: '此游戏正在维护中',
        duration: 1000
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.flow {
  overflow: hidden;
  margin: 0px 5px 0;
  padding: 4px 0;
  // background: rgb(245, 244, 249);
  background: #fff;
}
.box {
  position: relative;
  display: block;
  width: 50%;
  border-radius: 4px;
  overflow: hidden;
  float: left;
  margin-top: 4px;
  text-align: center;
  // &:nth-child(2n) {
  //   margin-left: 2%;
  // }
  &:last-child {
    margin-bottom: 4px;
  }
  .box-img {
    // width: 80%;
    width: 96%;
    &.small-img {
      width: 80%;
    }
  }
}
.gray {
  -webkit-filter: grayscale(100%);
  -moz-filter: grayscale(100%);
  -ms-filter: grayscale(100%);
  -o-filter: grayscale(100%);
  filter: grayscale(100%);
  filter: gray;
}
.grayTaxt {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 200;
  transform: translate(-50%,-50%);
  color: #fff;
  font-size: 15px;
  font-weight: bold;
}
</style>
