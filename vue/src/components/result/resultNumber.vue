<template>
  <div
    v-if="type === 'dice'"
    :class="[ `dice-${size}` ]"
  >
    <img :src="`/mobile/images/bet/SSC_dice${num}.png`">
  </div>
  <div
    v-else-if="type === 'zodiac'"
    :class="[ `zodiac-${size}`, `text-${color}` ]"
  >
    {{ num }}
  </div>
  <div v-else-if="type === 'common'" :class="[ `ball-${size}`, `bg-${color}` ]">
    {{ num }}
  </div>
  <div v-else-if="type === 'block'" :class="[ `block-${size}` ]">
    {{ num }}
  </div>
  <div v-else :class="[ `number-text-${size}`, `text-${color}` ]">
    {{ num }}
  </div>
</template>

<script>
export default {
  props: {
    num: {
      type: [ Number, String ],
      required: true
    },
    type: {
      type: String,
      default: 'common'
    },
    color: {
      type: String,
      default: 'red'
    },
    size: {
      type: String,
      default: 'md'
    }
  }
}
</script>
