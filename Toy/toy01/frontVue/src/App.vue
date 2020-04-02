<template>
  <div id="app">
    <div class="container">
      <div class="inner-container">
        <router-view/>
      </div>
      <Footer v-if="$route.name !== 'intro'"></Footer>
    </div>
  </div>
</template>

<script>
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Footer
  }
}
</script>

<style>
  * {
    box-sizing: border-box;
  }
  body {
    margin : 0;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #555;
    background: #ecf0f3;
  }
  .container {
  width: 420px;
  height: 750px;
  position: relative;
  padding: 60px 35px 0 35px;
  border-radius: 40px;
  background: #ecf0f3;
  box-shadow: 13px 13px 20px #cbced1,
              -13px -13px 20px #ffffff;
  }
  .inner-container {
    width: 100%;
    height: 570px;
  }
</style>
