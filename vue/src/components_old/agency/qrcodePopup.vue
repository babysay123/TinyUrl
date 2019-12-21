<template>
  <Popup v-model="show" direction="bottom">
    <div class="qrcode-popup">

      <div class="qrcode-title">
        <span>二维码</span>
        <img @click="$emit('input', false)" src="/mobile/images/agent/close.jpg">
      </div>

      <div class="qrcode-content">
        <vue-qr :text="qrcodeUrl" :size="240" />
      </div>

    </div>
  </Popup>
</template>

<script>
import Popup from '../global/popup'
import VueQr from 'vue-qr'
export default {
  components: { Popup, VueQr },
  props: {
    value: {
      type: Boolean,
      required: true
    },
    qrcode: {
      type: Number,
      required: true
    }
  },
  computed: {
    show: {
      get () {
        return this.value
      },
      set () {
        this.$emit('input', false)
      }
    },
    qrcodeUrl () {
      return location.origin + '?c=' + this.qrcode
    }
  }
}
</script>

<style scoped>
.qrcode-popup {
  background: #fff;
}

.qrcode-title {
  display: flex;
  line-height: 40px;
  padding: 0 15px;
  font-size: 14px;
  align-items: center;
  justify-content: space-between;
}

.qrcode-content {
  padding: 20px;
  text-align: center;
}
</style>
