<!-- 웹을 만들다보면 같은 기능이더라도 레이아웃이 여러개일 수있다. 
만약 이 페이지를 관리자용 레이아웃이라 해봅시다. -->
<template>
  <div>
    <nav>
      <nuxt-link to="/">Home</nuxt-link> <!-- router-link  와 같은 역할-->
      <nuxt-link to="/profile">profile</nuxt-link>
      <nuxt-link to="/signup">signup</nuxt-link>
      <nuxt-link to="/admin">Admin</nuxt-link>
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
