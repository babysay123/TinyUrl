<style lang="scss" scoped>
.confirm-container {
  width: 90%;
  max-height: 640px;
  background: #fff;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 0 8px rgba(0,0,0,.1);
}
.confirm-content {
  padding: 50px 30px;
  line-height: 22px;
  text-align: center;
}
.confirm-btn {
  height: 50px;
  line-height: 50px;
  border-top: 1px solid #d0d0d0;
  background: #f2f2f2;
  display: flex;
  text-align: center;
  div {
    flex: 1;
    &:last-child {
      border-left: 1px solid #d0d0d0;
      color: #40affe;
    }
  }
}
</style>

<template>
  <Popup
    v-model="show"
    direction="center"
  >
    <div class="confirm-container">

      <div class="confirm-content">
        <p style="font-size: 16px;">{{ title }}</p>
        <slot name="subheading">
          <p style="font-size: 12px;" v-html="subheading" />
        </slot>
      </div>

      <div class="confirm-btn">
        <div v-if="cancel" @click="$emit('input', false)">取消</div>
        <div @click="callback ? callback() : $emit('input', false)">确定</div>
      </div>

    </div>
  </Popup>
</template>

<script>
import Popup from './popup'
export default {
  components: { Popup },
  props: {
    value: {
      type: Boolean,
      required: true
    },
    callback: {
      type: Function
    },
    title: {
      type: String
    },
    subheading: {
      type: String
    },
    cancel: {
      type: Boolean,
      default: true
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
    }
  }
}
</script>
