<template>
  <div id="app">
    <Header />
    <StockPage v-on:toggleLoading="toggleLoading"/>
    <Loading  v-if="showLoading"/>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import StockPage from './views/StockPage.vue'
import Loading from './components/Loading.vue'

export default {
  name: 'App',
  components: {
    StockPage,
    Header,
    Loading
  },
  data() {
    return {
      showLoading: false,
    }
  },
  methods: {
    toggleLoading: function() {
      this.showLoading = !this.showLoading
    }
  }
}
</script>

<style>
  * {margin: 0; padding: 0;}
</style>
