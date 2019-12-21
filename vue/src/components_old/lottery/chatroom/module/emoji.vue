<template>
  <section class="emojis ft0">
    <swiper>
      <swiper-slide>
                        <span
                          v-for="(item, index) in data"
                          :key="index"
                          v-if="index <= 39"
                          class="emoji-list dInV"
                          @click="selectEmoji(item)"
                        >{{item}}</span>
      </swiper-slide>
      <swiper-slide>
                        <span
                          v-for="(item, index) in data"
                          :key="index"
                          v-if="index >= 40 && index <= 79"
                          class="emoji-list dInV"
                          @click="selectEmoji(item)"
                        >{{item}}</span>
      </swiper-slide>
      <swiper-slide>
                        <span
                          v-for="(item, index) in data"
                          :key="index"
                          v-if="index >= 80 && index <= 119"
                          class="emoji-list dInV"
                          @click="selectEmoji(item)"
                        >{{item}}</span>
      </swiper-slide>
    </swiper>
  </section>
</template>

<script>
import Emojis from 'Assets/js/betting/chatRoom/emoji'
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
  .emojis{background:#fff;}
  .emoji-list{font-size: .7rem;width: 1rem;text-align: center;}
  .emojis /deep/ .swiper-wrapper{padding-bottom:.19rem;text-align:left;}
</style>
