<template>
  <div>
    <Header v-if="head" fixed>
      <h3>{{ title }}</h3>
    </Header>

    <div :class="{ 'hasHead': head }">
      <router-view />
    </div>
  </div>
</template>

<script>
import Header from 'Components/global/head'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: { Header },
  data () {
    return {
      head: true
    }
  },
  computed: {
    ...mapGetters([ 'getUserInfo' ]),
    title () {
      const { title } = this.$route.meta
      return title
    }
  },
  methods: {
    ...mapActions([ 'refreshUserInfo' ]),
    fetchUserInfo () {
      if (!Object.keys(this.getUserInfo).length) {
        this.refreshUserInfo()
      }
    }
  },
  created () {
    try {
      const userAgent = this.$route.query['User-Agent']
      const sessionid = this.$route.query['sessionid']
      const app = this.$route.query['app']
      const XRequestedWith = this.$route.query['X-Requested-With']

      if (app) {
        this.Utils.Storage.save('fromApp', app)
      }

      if (sessionid) {
        this.Utils.Storage.save('sessionid', sessionid)
      }

      if (XRequestedWith) {
        this.Utils.XRequestedWith = XRequestedWith
        this.head = false
      }

      if (userAgent) {
        this.Utils.userAgent = userAgent
        // this.Utils.Storage.save('user-agent-app', userAgent)
        this.head = false
      }

      this.fetchUserInfo()
    } catch (error) {
      this.head = true
    }
  }
}
</script>

<style scoped>
.hasHead {
  margin-top: 1.125rem;
}
</style>
