<style lang="scss" scoped>
.game{
  height: 100vh;
  width: 100vw;
  iframe{
    width: 100%;
    height: 100%;
    border: none;
  }
}
</style>

<template>
<div class="game">
  <iframe :src="src"></iframe>
</div>
</template>
<script>
export default {
  data () {
    return {
      src: '#'
    }
  },
  created () {
    this.src = this.$route.query.src
  }
}
</script>
