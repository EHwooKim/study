<template>
  <form @submit.prevent="onSubmit">
    <input type="text" placeholder="회사명(GOOG, AAPL...)" v-model="value">
    <button type="submit">검색</button>
  </form>
</template>

<script>
  export default {
    data() {
      return {
        value: ''
      }
    },
    methods: {
      onSubmit: function() {
        this.$emit('searchData', this.value)
      }
    }
  }
</script>

<style scoped>
  form {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  input {
    width: 50%;
    height: 50%;
    outline: none;
    padding: 0 12px;
    font-size: 16px;
    border: 2px solid transparent;
    border-bottom-color: rgb(0,198,142);
    border-radius: 4px;
  }
  button {
    width: 10%;
    height: 55%;
    margin: 0 0 0 24px;
    color: white;
    background-color: rgb(0,198,142);
    border: none;
    border-radius: 5px;
    outline: none;
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;
  }
</style>