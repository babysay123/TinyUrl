<template>
  <div class="login-group" :class="{ 'login-group-focus': focus }">
    <!-- <i class="login-group-icon icon iconfont" :class="[ iconClass, focus ? 'icon-focus' : '' ]" /> -->
    <i
      :style="{
        'font-size': (iconSize === 'big' ? '32px' : iconSize === 'small' ? '22px' : ''),
        'height': (iconSize === 'big' ? '37px' : iconSize === 'small' ? '32px' : '')
      }"
      :class="'login-group-icon fa fa-fw fa-' + icon"
    ></i>
    <input
      v-model="val"
      :type="inputType === 'password' ? 'password' : 'text'"
      :placeholder="placeholder"
      :minLength="minLength"
      :maxLength="maxLength"
      :disabled="disabled"
      :style="{ color: disabled ? '#333' : 'inherit' }"
      @input="ele => inputNumber(ele.target.value)"
    >
    <a v-if="key === 'mail'" class="login-send-valid">发送验证码</a>
    <!-- @focus="focus = true"
      @blur="focus = false" -->
  </div>
</template>

<script>
export default {
  props: {
    key: {
      type: String
    },
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
    iconSize: {
      type: String
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
  // height: 50px;
  // line-height: 50px;
  height: 42px;
  line-height: 42px;
  background-image: linear-gradient($baseCol, $baseCol), linear-gradient(#e2e2e2, #e2e2e2);
  background-position: center bottom, center bottom;
  background-size: 0 2px, 100% 1px;
  background-repeat: no-repeat;
  transition: .35s ease;
  position: relative;

  .login-group-icon {
    width: 30px;
    // height: 42px;
    height: 35px;
    font-size: 26px;
    color: #979797;
  }
  .icon-focus {
    color: $baseCol;
  }
  input {
    background: none;
    flex: 1;
    outline: none;
    height: 40px;
    line-height: 40px;
    padding-left: 6px;
    font-size: 14px;
    border: none;
  }
}
.login-group-focus {
  background-size: 100% 2px, 100% 1px;
}

.login-send-valid {
  // display: none;
  position: absolute;
  line-height: 24px;
  color: #fff;
  background: #d81e06;
  height: 24px;
  right: 6px;
  top: 8px;
  padding: 0 6px;
  border-radius: 4px;
}

</style>
