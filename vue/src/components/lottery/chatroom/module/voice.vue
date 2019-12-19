<template>
  <!--语音消息模板-->
  <section class="dInV pr" @click="video">
    <slot name="left" style=""></slot>
    <div class="video-box">
      <div class="video-symbol">
        <div class="video-circle first"></div>
        <div class="video-circle second" :class="{fadeSecond: dataCopy.attachment.voice.play}" style="font-size:.3rem"></div>
        <div class="video-circle third" :class="{fadeThird: dataCopy.attachment.voice.play}"></div>
      </div>
      <span class="video-circleRed" v-if="dataCopy.attachment.voice.unread"></span>
    </div>
    <slot name="right"></slot>
  </section>
</template>

<script>
export default {
  name: 'voice',
  props: ['data', 'record'],
  data () {
    return {
      amr: null,
      dataCopy: null,
      voice: {
        voiceStorage: []
      }
    }
  },
  created () {
    // let _this = this
    // console.log(this.data)
    this.dataCopy = this.data
  },
  methods: {
    video () {
      let _this = this
      let amr = new this.$Amr()
      amr.initWithUrl(_this.dataCopy.attachment.voice.url).then(() => {
        amr.play()
        _this.dataCopy.attachment.voice.play = true
        _this.dataCopy.attachment.voice.unread = false
        let voiceUnread = this.Utils.Storage.get('voiceUnread')
        let voiceUnreadLeng = voiceUnread.length
        for (let i = 0; i < voiceUnreadLeng; i++) {
          if (_this.dataCopy.messageId === voiceUnread[i].messageId) {
            voiceUnread[i].unread = _this.dataCopy.attachment.voice.unread
          }
        }
        this.Utils.Storage.save('voiceUnread', voiceUnread)
      })
        .catch(() => {})
      amr.onEnded(() => {
        _this.dataCopy.attachment.voice.play = false
      })
    }
  }
}
</script>

<style scoped>
  .video-box{height: 18px;position: relative; margin-left: 3px;width: 70px;border: 1px solid #999;border-radius: 3px;}
  .video-symbol {position:absolute;top: -16px;left: 16px;width: 50px;height: 50px;box-sizing: border-box;overflow: hidden;transform: rotate(135deg);}
  .video-circle {border: 2px solid #999999;border-radius: 50%;position: absolute;}
  .video-second{position: absolute;right: -27px;top: 0;font-size: 14px;line-height: 21px}
  .video-circleRed{position:absolute;top:0;bottom:0;margin:auto 0;right:9px;width:6px;height:6px;background:red;border-radius:50%;}
  .first {width: 5px;height: 5px;background: #cccccc;top: 45px;left: 45px;}
  .second {width: 13px;height: 13px;top: 39px;left: 39px;}
  .third {width: 10px;height: 10px;top: 42px;left: 42px;}
  .fadeSecond{animation: fadeInOut 1s infinite 1s;}
  .fadeThird{animation: fadeInOut 1s infinite .4s;}
  @keyframes fadeInOut {
    0% {opacity: 0;}
    100% {opacity: 1;}
  }
</style>
