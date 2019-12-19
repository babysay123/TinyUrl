<template>
  <div class="dialog" v-if="openAlert">
    <div class="dialog-mask" @click="close" />
    <template>
      <div class="dialog-content dialog-common">
        <div class="common-title">
          <span>{{title}}</span>
        </div>
        <div class="hd"></div>
        <div class="dialong-right">
          <img @click="close" src="../../assets/images/clear.png" />
        </div>
        <div class="common-content" v-html="content" />
        <div class="btn-qr">
          <div @click="close">
            <span>确认</span>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 该组件是通过ref直接获取当前组件实列进行赋值
      openAlert: false,
      title: '通知',
      content: ''
    }
  },
  computed: {
  },
  methods: {
    close () {
      this.openAlert = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'Assets/css/base.color.scss';
.btn-qr {
  width: 100%;
  height: 0.7rem;
  color: #fff;
  margin-bottom: 10px;
  div {
    width: 60px;
    height: 0.7rem;
    background: $baseCol;
    border-radius: 4px;
    text-align: center;
    line-height: 0.7rem;
    margin: auto;
    cursor: pointer;
  }
}
.dialong-right {
  float: right;
  margin-top: -35px;
  margin-right: -11px;
  border-radius: 50%;
  overflow: hidden;
}
.dialong-right img {
  width: 26px;
}
.hd {
  background: url('../../assets/images/hudu.png') repeat;
  background-color: $baseCol;
  width: 83%;
  float: left;
  height: 0.7rem;
  margin-left: -1rem;
  margin-top: -1px;
}
.dialog {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 9999;
  .dialog-mask {
    @extend .dialog;
    position: absolute;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.3);
  }
  .dialog-content {
    position: absolute;
    z-index: 2;
    width: 90%;
    left: 50%;
    top: 50%;
    border-radius: 5px;
    transform: translate(-50%, -50%);
    animation: scale 0.35s ease;
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
        font-size: 0.6rem;
        color: yellow;
        font-weight: 400;
      }
    }
  }
  .dialog-content1 {
    position: absolute;
    z-index: 2;
    width: 90%;
    left: 50%;
    top: 50%;
    border-radius: 5px;
    transform: translate(-50%, -50%);
    animation: scale 0.35s ease;
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
        font-size: 0.6rem;
        color: yellow;
        font-weight: 400;
      }
    }
  }
}
@keyframes scale {
  0% {
    transform: translate(-50%, -50%) scale(0);
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
  }
}

.dialog-common {
  background: #fff;
  min-height: 100px;
  .common-title {
    color: #fff;
    height: 0.7rem;
    left: -1px;
    top: -1px;
    width: 28%;
    background: $baseCol;
    line-height: 0.7rem;
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
    padding-top: 37px;
    padding-bottom: 20px;
    line-height: 18px;
    margin: auto;
    text-align: left;
    font-weight: 400;
  }
}

.dialog-maintenance {
  width: calc(100vw - 124px) !important;
  margin: 0 auto;
  background: url('/mobile/images/maintain.png') no-repeat;
  background-size: 100%;
  padding-top: 132px;
  position: absolute;
  transform: translate(-50%, -50%);
  z-index: 2;
  left: 50%;
  top: 50%;
  p {
    background: #fff;
    padding: 0 20px 20px;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
  }
}
</style>
