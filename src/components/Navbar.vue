<template>
  <div class="main-navbar">
    <nav class="navbar navbar-light bg-light">
      <router-link class="navbar-brand" to="/">
        <img src="../assets/pokeball.svg" width="30" height="30" class="d-inline-block align-top" alt="">
        Pokemon Card Library
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Navbar'
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
