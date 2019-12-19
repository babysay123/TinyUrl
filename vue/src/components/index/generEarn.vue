<template>
<div>
  <div class="gener-earn" v-dragDir >
    <!-- 推广赚钱 -->
      <img src="/mobile/images/tuiguangzhuanqian@3x.png" alt="" >
    </div>
</div>
</template>

<script>
export default {
  name: 'generEarn',
  data () {
    return {
      title: '推广赚钱'
    }
  },
  computed: {
    isLogin () {
      return (
        this.Utils.Storage.get('user') && this.Utils.Storage.get('sessionid')
      )
    }
  },
  directives: {
    dragDir: {
      inserted: (el, a, vm) => {
        let x = 0
        let y = 0
        let px = 0
        let py = 0
        let nx = 0
        let ny = 0
        let time = 0
        let onDrag = false
        el.ontouchstart = function (e) {
          time = +new Date()
          x = e.touches[0].clientX
          y = e.touches[0].clientY
          px = el.offsetLeft
          py = el.offsetTop
          let cH = document.documentElement.clientHeight - 60 - 70
          let cW = document.body.clientWidth - 120
          onDrag = true
          el.style.transition = 'none'
          el.ontouchmove = function (e) {
            if (onDrag) {
              nx = e.touches[0].clientX + px - x
              ny = e.touches[0].clientY + py - y
              el.style.left = (nx < 0 ? '0.15rem' : nx > cW ? `calc(${cW}px - 0.15rem)` : `${nx}px`)
              el.style.top = (ny < 220 ? '220px' : ny > cH ? `${cH}px` : `${ny}px`)
            }
            // e.stopPropagation()
            e.preventDefault()
          }
          el.ontouchend = function (e) {
            let newTime = +new Date()
            if (newTime - time < 150) {
              vm.context.linkTo()
            }
            el.style.transition = 'all 0.4s ease'
            let half = document.body.clientWidth / 2
            if (el.style.left || el.style.right) {
              if (nx < (half - 22)) {
                el.style.left = '0.15rem'
                // vm.context.childClass.left = 1
              } else {
                el.style.left = `calc(${cW}px - 0.15rem)`
                // vm.context.childClass.left = 0
              }
            }
            if (onDrag) {
              onDrag = false
            }
            e.preventDefault()
          }
        }
      }
    }
  },
  methods: {
    linkTo () {
      if (this.isLogin) {
        this.$store.commit('voice', 'generalize')
        this.routerLink({ path: '/generalizeNav' })
      } else {
        this.routerLink({ path: '/login' })
      }
    }
  },
  created () {

  }
}
</script>

<style lang="scss" scoped>
.gener-earn {
  position: fixed;
  z-index: 300;
  top: calc(100% - 60px - 70px);
  left: calc(100% - 120px);

  img {
    width: 120px;
  }
}
</style>
