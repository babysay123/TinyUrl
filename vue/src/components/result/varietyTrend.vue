<template>
<!-- 彩种走势图 -->
  <div class="varietyTrend">

  </div>
</template>
<script>
import Logger from '@/plugins/utils/logger'
import { mapGetters } from 'Vuex'
export default {
  data () {
    return {}
  },
  props: {},
  computed: {
    ...mapGetters('trendConfig')
  },
  mounted () {
    Logger.log('彩种走势图')
  }
}
</script>
