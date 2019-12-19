<!--
 * @Author: your name
 * @Date: 2019-10-28 20:48:58
 * @LastEditTime: 2019-11-06 16:08:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /d:\cp8h5\cp8h5\vue\src\views\generalize\popup.vue
 -->
  <template>
    <div class="curtain" v-if="show">
      <div class="dialog-content dialog-common" >
        <div class="common-title">
          <span>{{title}}</span>
        </div>
        <div class="hd">
        </div>
        <div class="dialong-right">
          <img src="../../assets/images/clear.png" @click="close">
        </div>
        <div class="zanwei"></div>
        <slot></slot>
      </div>
    </div>
  </template>
<script>
export default {
  props: {
    show: {
      default: false
    },
    title: {
      default: '温馨提示'
    }

  },
  data () {
    return {
    }
  },
  methods: {
    close () {
      this.$parent.close()
    }
  }
}
</script>
<style lang="scss" scope>
@import 'Assets/css/base.color.scss';
.curtain{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 199;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
}
.dialog-content {
  // background: #fff;
  position: fixed;
  z-index: 2;
  // width: 8rem;
  left: 50%;
  top: 50% !important;
  border-radius: 5px;
  transform: translate(-50%, -50%);
  animation: scale .35s ease;
  border: 4px solid $baseCol;
}
.dialog-common {
  position: fixed;
  z-index: 9999;
  background: #fff;
  min-height: 3.7rem;
  .common-title {
    color: #fff;
    height: 0.7rem;
    left: -1px;
    top: -1px;
    width: 28%;
    background: $baseCol;
    line-height: .7rem;
    text-align: center;
    position: relative;
    font-weight: 500;
    float: left;
    img {
      width: 14px;
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .common-content {
    padding-top: 8px;
    padding-bottom: 29px;
    margin: auto;
    text-align: center;
    font-weight: 400;
  }
}
.dialong-right{
  float: right;
  margin-top: -35px;
  margin-right: -11px;
  border-radius: 50%;
  overflow: hidden;
}
.dialong-right img{
  width: 26px;
}
.hd{
  background:url('../../assets/images/hudu.png') repeat;
  background-size: 100% 100%;
  background-color: $baseCol;
  width: 71%;
  float: left;
  height: .7rem;
  margin-left: -.1rem;
  margin-top: -1px;
}
.zanwei{
  width: 100%;
  height: .7rem;
}
</style>
