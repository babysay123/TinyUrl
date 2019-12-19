<template>
  <Popup v-model="show" direction="bottom">
    <ul class="manage-operation">
      <li
        v-for="(l, index) in list"
        :key="index"
        @click="l.callback && l.callback()"
      >
        {{ l.text }}
      </li>
    </ul>
  </Popup>
</template>

<script>
import Popup from 'Components/global/popup'
export default {
  props: {
    value: {
      type: Boolean,
      required: true
    },
    list: {
      type: Array,
      required: true
    }
  },
  components: { Popup },
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

<style lang="scss" scoped>
.manage-operation li {
  line-height: 1.3rem;
  font-size: .4rem;
  text-align: center;
  background: #fff;
  &:last-child {
    margin-top: .3rem;
  }
}
</style>
