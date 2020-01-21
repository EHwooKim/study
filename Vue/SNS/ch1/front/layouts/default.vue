<template>
  <div>
    <nav>
      <nuxt-link to="/">Home</nuxt-link> <!-- router-link  와 같은 역할-->
      <nuxt-link to="/profile">profile</nuxt-link>
      <nuxt-link to="/signup">signup</nuxt-link>
    </nav>
    <nuxt /> <!--router-view와 같은 역할-->
  </div>
</template>


<script>
  export default {

  }
</script>

<style>

</style>
