<template>
  <div>
    <Login></Login>
  </div>
</template>

<script>
export default {
  name: "NoAuthLayout",

  components: {
    Login: () => import('@/components/Login')
  }
}
</script>

<style scoped>

</style>
