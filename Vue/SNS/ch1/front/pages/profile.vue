<template>
  <div>
    profile page
  </div>
</template>
<script>
  export default {
    layout: 'admin', // vue에는 없는 속성, 이렇게 하면 default가 아닌 다른 레이아웃 적용이 가능하다.
    data() {
      return {
        name: 'Nuxt.js'
      }
    },
  }

</script>

<style>

</style>