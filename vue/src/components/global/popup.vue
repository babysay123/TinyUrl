<template>
  <div class="popup" v-if="value">
    <div v-if="mask" class="popup-mask" @click="mask && $emit('input', false)" />
    <div :class="[ slideDirNam ]">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    direction: {
      type: String,
      default: 'center'
    },
    mask: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    slideDirNam () {
      return `popup-transition-${this.direction}`
    }
  }
}
</script>

<style lang="scss" scoped>
.popup {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .3);
}
.popup-mask {
  @extend .popup;
  position: absolute;
  z-index: 1;
}
.popup-content {
  @extend .popup;
  position: absolute;
  z-index: 2;
}
.popup-transition-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  animation: .35s slideDown ease;
}
.popup-transition-right {
  @extend .popup;
  background: none;
  position: absolute;
  z-index: 2;
  animation: .35s slideRight ease;
}
.popup-transition-center {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 100%;
  z-index: 2;
  transform: translate(-50%, -50%);
  animation: .35s scale ease;
  &>* {
    margin: 0 auto;
  }
}
@keyframes slideDown {
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0);
  }
}
@keyframes slideRight {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
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
</style>
