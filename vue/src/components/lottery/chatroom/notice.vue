<template>
    <section class="mequeMain fw" v-cloak>
        <section @click="detailsHandler" class="meque_box">
            <div class="title tc">系统公告:</div>
            <div id="meque" ref="meque" class="fw pr">
                <div id="meque_text" ref="mequeText">
                    <span v-for="(item, index) in chatRoom.notice" :key='index' ref="mequeCon">
                        {{item.content}}
                    </span>
                    <span v-if="chatRoom.notice.length === 0 || chatRoom.notice[0].content.replace(/^\s+|\s+$/gm, '') === ''">
                    暂无新公告
                    </span>
                </div>
            </div>
        </section>
    </section>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'notice',
  data () {
    return {
      timer: false,
      notice: null,
      text: ''
    }
  },
  computed: {
    ...mapState({
      chatRoom (state) {
        return state.chatRoom
      }
    })
  },
  watch: {
    '$store.state.chatRoom.notice': {
      handler () {
        this.notices()
      },
      deep: true
    }
  },
  created () {
    if (this.chatRoom.notice.length > 0) {
      this.notices()
    }
  },
  methods: {
    notices () {
      setTimeout(() => {
        let mequeText = this.$refs.mequeText
        let meque = this.$refs.meque
        let mequeCon = this.$refs.mequeCon
        if (mequeCon && mequeCon.length > 0) {
          let mequeConLeng = mequeCon.length
          for (let i = 0; i < mequeConLeng; i++) {
            mequeCon[i].style.paddingRight = document.body.offsetWidth * 1.3 + 'px'
          }
        } else {
          mequeText.style.width = document.body.offsetWidth * 1.3 + 'px'
        }
        mequeText.style.left = meque.offsetWidth + 'px'
        clearInterval(this.timer)
        this.notice = function () {
          if (mequeText.offsetLeft < (-mequeText.offsetWidth + document.body.offsetWidth)) {
            mequeText.style.left = meque.offsetWidth + 'px'
          }
          mequeText.style.left = mequeText.offsetLeft + -1 + 'px'
        }
        this.timer = setInterval(this.notice, 20)
        // if (mequeText.offsetWidth >= meque.offsetWidth) {
        // }
      }, 5)
    },
    detailsHandler () {
      let notice = this.chatRoom.notice
      if (notice.length > 0 && notice[0].content.replace(/^\s+|\s+$/gm, '') !== '') {
        this.$router.push('/noticeDefaile')
      }
    }
  },
  beforeDestroy () {
    this.timer = null
  }
}
</script>

<style scoped>
    .meque_box{height:100%;}
    .mequeMain{background:#FFF7F2;height:.6rem;line-height:.65rem;font-size:.3rem;z-index: 399;}
    .title{float:left;width:20%;color:#333;}
    #meque{float:left;z-index:1;width:80%;height:100%;color:#a1a1a1;}
    #meque_text{white-space:nowrap;position:absolute;left:0;top:0;z-index:2;}
</style>
