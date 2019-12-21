<template>
  <section>
  </section>
</template>

<script>
export default {
  name: 'back',
  beforeRouteEnter (to, form, next) {
    // console.log(to)
    // console.log(form)
    next({
      path: form.path,
      query: to.query,
      params: to.params
    })
  }
}
</script>

<style scoped>

</style>
