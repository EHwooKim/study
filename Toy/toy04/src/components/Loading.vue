<template>
  <div class="loading-container">
    <div class="loading"></div>
  </div>
</template>

<script>
  export default {

  }
</script>

<style scoped>
  .loading-container {
    width: 100%;
    HEIGHT: 100%;
    background-color: rgba(1, 1, 1, 0.205);
    position:absolute;
    top: 0;
    left: 0;
  }
  .loading {
    width: 100px;
    height: 100px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 15px solid rgb(0,198,142);
    border-bottom-color: transparent;
    border-radius: 50%;
    animation: rotate 1s infinite;
  }
  @keyframes rotate {
    to {
      transform: rotate(0deg);
    }
    from {
      transform: rotate(360deg);
    }
  }
</style>