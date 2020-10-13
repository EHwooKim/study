<template>
  <div class="modal-background">
    <div class="modal-container">
      <p>{{ message }}</p>
      <button @click="closeModal">닫기</button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
      }
    },
    props: {
      message: {
        type: String,
        required: true
      }
    },
    methods: {
      closeModal: function() {
        this.$emit('closeModal')
      }
    }
  }
</script>

<style scoped>
  .modal-background{
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(1, 1, 1, 0.3);
    top: 0;
    left: 0;
  }
  .modal-container {
    width: 360px;
    height: 240px;
    padding: 36px 12px;
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    border-radius: 10px;
  }
  .modal-container p {
    width: 100%;
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    color: coral;
  }
  .modal-container button {
    position: absolute;
    right: 24px;
    bottom: 20px;
    background-color: gray;
    border: none;
    outline: none;
    color: white;
    padding: 8px 12px;
    border-radius: 4px;
    font-size: 15px;
    font-weight: bold;
    cursor: pointer;
  }
</style>