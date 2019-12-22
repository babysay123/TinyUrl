<template>
  <section class="dialog" v-if="showToasts">
    <div class="dialog-bg" @click="toggleToast"></div>
    <section class="dialog-content dialog-common dialog-join">
      <!-- :class="showContent ? 'dialog-content dialog-common dialog-join' : 'dialog-content dialog-common dialog-leave'" -->
      <div class="common-title">
        <span>{{ title || '温馨提示' }}</span>
      </div>
      <div class="hd"></div>
      <div class="dialong-right">
        <img @click="toggleToast" src="../../assets/images/clear.png">
      </div>
      <!-- <div class="success">
        <img src="../../assets/images/hint.png">
      </div> -->
      <div class="common-content">
        <slot></slot>
      </div>
      <div class="btn-qr" v-if="btnShow">
        <div @click="closed">
          <span>确认</span>
        </div>
        <div @click="closeove">
          <span>取消</span>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
export default {
  name: 'pop',
  props: {
    showToasts: {
      type: Boolean,
      required: true
    },
    title: {
      type: String
    },
    content: {
      type: String
      // required: true
    }
  },
  data () {
    return {
      value: true,
      text: '',
      btnShow: false
    }
  },
  computed: {
    // show: {
    //   // 弹窗开关
    //   get () {
    //     return this.value
    //   },
    //   set () {
    //     this.$emit('input', false)
    //   }
    // }
  },
  created () {
    console.log(this.showToasts)
  },
  methods: {
    toggleToast () {
      this.$emit('toggleToast')
    },
    closed () {
      console.log('close')
    },
    closeove () {
      console.log('close')
      this.toggleToast()
    }
  }
}
</script>

<style scoped lang="scss">
@import 'Assets/css/base.color.scss';
.dialog-join {
  animation: animate_in 0.25s;
}
.dialog-leave {
  animation: animate_out 0.25s;
  opacity: 0;
}
@keyframes animate_int {
  0% {
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
}
@keyframes animate_out {
  0% {
    opacity: 1;
  }
  100%{
    opacity: 0;
  }
}
.dialog {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 9999;
  .dialog-bg {
    @extend .dialog;
    position: absolute;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.3);
  }
}
.dialog-content {
  background: #fff;
  position: absolute;
  z-index: 2;
  width: 9.25rem;
  left: 50%;
  top: 50%;
  border-radius: 5px;
  transform: translate(-50%, -50%);
  animation: scale .35s ease;
  border: 4px solid $baseCol;
  .dialog-generalize-close {
    position: absolute;
    right: 0;
    top: 0;
    transform: translateY(-120%);
    img {
      width: 20px;
      padding: 2px;
      border: 2px solid #fff;
      border-radius: 50%;
    }
  }
  .dialog-generalize img {
    width: 100%;
  }
  .dialog-notify-close {
    position: absolute;
    bottom: 0;
    left: 50%;
    z-index: 2;
    transform: translate(-50%, 100%);
    img {
      width: 24px;
      border: 2px solid #fff;
      border-radius: 50%;
      padding: 2px;
    }
  }
  .dialog-notify {
    position: relative;
    width: 100%;
    overflow: hidden;
    display: block;
    img {
      width: 100%;
    }
    p {
      position: absolute;
      bottom: 19%;
      max-width: 60%;
      text-align: center;
      left: 50%;
      transform: translateX(-50%);
      font-size: .6rem;
      color: yellow;
      font-weight: 400;
    }
  }
}
.dialog-common {
  position: fixed;
  left: 50%;
  top:50%;
  transform: translate(-50%,-50%);
  z-index: 9999;
  background: #fff;
  min-height: 100px;
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
    padding-top: 28px;
    padding-bottom: 16px;
    margin: auto;
    text-align: center;
    font-weight: 400;
  }
}
.btn-qr {
  display: flex;
  justify-content:center;
  width: 100%;
  height: .7rem;
  color: #fff;
  margin-bottom: 10px;
  div {
    width: 60px;
    height: .7rem;
    background: $baseCol;
    border-radius: 4px;
    text-align: center;
    line-height: .7rem;
    margin: auto;
    cursor:pointer;
  }
}
.btn-qr1 {
  margin: auto;
  float: right;
  width: 50%;
  height: .7rem;
  color: #fff;
  margin-bottom: 10px;
  div{
    width: 60px;
    height: .7rem;
    background: $baseCol;
    border-radius: 4px;
    text-align: center;
    line-height: .7rem;
    margin: auto;
    cursor:pointer;
  }
}
.dialong-right {
  float: right;
  margin-top: -35px;
  margin-right: -11px;
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 24px;
  }
}

.hd {
  background:url('../../assets/images/hudu.png') repeat;
  background-size: 100% 100%;
  background-color: $baseCol;
  width: 71%;
  float: left;
  height: .7rem;
  margin-left: -.1rem;
  margin-top: -1px;
}
.success {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
   img {
    width: 22px;
  }
}
</style>
