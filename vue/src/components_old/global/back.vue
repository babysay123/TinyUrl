<template>
  <section>
  </section>
</template>

<script>
export default {
  name: 'back',
  beforeRouteEnter (to, from, next) {
    console.log(to)
    console.log(from)
    next({
      path: to.query.path,
      name: to.query.path,
      query: from.query,
      params: from.params
    })
  }
}
</script>

<style scoped>

</style>
