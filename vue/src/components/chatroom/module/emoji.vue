<template>
  <section class="emojis ft0">
    <swiper>
      <swiper-slide>
        <!-- v-if="index <= 39" -->
        <span
          v-for="(item, index) in data.filter((e, i) => i <= 39)"
          :key="index"
          class="emoji-list dInV"
          @click="selectEmoji(item)"
        >{{item}}</span>
      </swiper-slide>
      <swiper-slide>
        <!-- v-if="index >= 40 && index <= 79" -->
        <span
          v-for="(item, index) in data.filter((e, i) => i > 39 && i <= 79)"
          :key="index"
          class="emoji-list dInV"
          @click="selectEmoji(item)"
        >{{item}}</span>
      </swiper-slide>
      <swiper-slide>
        <!-- v-if="index >= 80 && index <= 119" -->
        <span
          v-for="(item, index) in data.filter((e, i) => i > 79 &&  i <= 119)"
          :key="index"
          class="emoji-list dInV"
          @click="selectEmoji(item)"
        >{{item}}</span>
      </swiper-slide>
    </swiper>
  </section>
</template>

<script>
import Emojis from 'Assets/js/chatroom/emoji'
export default {
  name: 'emoji',
  data () {
    return {
      data: Emojis
    }
  },
  methods: {
    selectEmoji (item) {
      this.$emit('addEmoji', item)
    }
  }
}
</script>

<style scoped>
  .emojis { background:#fff; }
  .emoji-list {
    font-size: .7rem;
    width: 1rem;
    text-align: center;
    line-height: 1.3;
  }
  .emojis /deep/ .swiper-wrapper {
    padding-bottom: 0.1875rem;
    text-align: left;
  }
</style>
