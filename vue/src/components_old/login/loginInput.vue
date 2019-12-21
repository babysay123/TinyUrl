<template>
  <div class="login-group" :class="{ 'login-group-focus': focus }">
    <i class="login-group-icon icon iconfont" :class="[ iconClass, focus ? 'icon-focus' : '' ]" />
    <input
      v-model="val"
      :type="inputType === 'password' ? 'password' : 'text'"
      :placeholder="placeholder"
      :minLength="minLength"
      :maxLength="maxLength"
      :disabled="disabled"
      :style="{ color: disabled ? '#333' : 'inherit' }"
      @input="ele => inputNumber(ele.target.value)"
      @focus="focus = true"
      @blur="focus = false"
    >
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: [ String, Number ],
      required: true
    },
    placeholder: {
      type: String
    },
    inputType: {
      type: String,
      default: 'text'
    },
    required: {
      type: Boolean,
      default: false
    },
    rule: {
      type: Function
    },
    icon: {
      type: String
    },
    minLength: {
      type: [ Number, String ]
    },
    maxLength: {
      type: [ Number, String ]
    },
    disabled: {
      type: Boolean
    }
  },
  data () {
    return {
      val: this.value,
      focus: false
    }
  },
  computed: {
    iconClass () {
      const iconMap = new Map([
        [ 'user', 'id' ],
        [ 'password', 'suo' ],
        [ 'qq', 'qqicon' ],
        [ 'wechat', 'weixin' ],
        [ 'real_name', 'name' ],
        [ 'email', 'mail' ],
        [ 'phone', 'phone' ],
        [ 'referrer', 'code' ]
      ])
      return `icon-${iconMap.get(this.icon)}`
    }
  },
  methods: {
    inputNumber (val) {
      if (this.inputType === 'number') {
        this.val = val.replace(/[^\d]/g, '')
      }
      this.$emit('input', this.val)
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'Assets/css/base.color.scss';
.login-group {
  width: 100%;
  display: flex;
  align-items: flex-end;
  height: 50px;
  line-height: 50px;
  background-image: linear-gradient($baseCol, $baseCol), linear-gradient(#ccc, #ccc);
  background-position: center bottom, center bottom;
  background-size: 0 2px, 100% 1px;
  background-repeat: no-repeat;
  transition: .35s ease;
  .login-group-icon {
    width: 30px;
    height: 50px;
    font-size: 30px;
    color: #979797;
  }
  .icon-focus {
    color: $baseCol;
  }
  input {
    background: none;
    flex: 1;
    outline: none;
    height: 48px;
    line-height: 48px;
    padding-left: 10px;
    font-size: 14px;
    border: none;
  }
}
.login-group-focus {
  background-size: 100% 2px, 100% 1px;
}

</style>
