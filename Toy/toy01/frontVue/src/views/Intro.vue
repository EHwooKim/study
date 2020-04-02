<template>
  <div>
    <div class="logo"></div>
    <div class="title">EHwooKim</div>
    <div>
      <login-form v-if="showLogin" @changeForm-event="changeForm" />
      <signup-form v-else @changeForm-event="changeForm" />
    </div>

  </div>
</template>

<script>
import LoginForm from '../components/LoginForm.vue'
import SignupForm from '../components/SignupForm.vue'

export default {
  name: 'Login',
  components: {
    LoginForm,
    SignupForm,
  },
  data() {
    return {
      showLogin: true
    }
  },
  methods: {
    changeForm() {
      this.showLogin = !this.showLogin
    }
  }


}
</script>

<style scoped>
  .logo {
    background: #24cfaa;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    margin:0 auto;
    box-shadow: 
    /* logo shadow */
    0px 0px 2px #5f5f5f,
    /* offset */
    0px 0px 0px 5px #ecf0f3,
    /*bottom right */
    8px 8px 15px #a7aaaf,
    /* top left */
    -8px -8px 15px #ffffff
    ;
  }
  .title {
    text-align: center;
    font-size: 28px;
    padding-top: 24px;
    letter-spacing: 0.5px;
  }
</style>