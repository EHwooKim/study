<template>
  <v-container v-if="!me">
    <v-card>
      <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
        <v-container>
          <v-text-field
            v-model="email"
            label="이메일"
            type="email"
            :rules="emailRules"
            required
          />
          <v-text-field
            v-model="password"
            label="비밀번호"
            type="password"
            :rules="passwordRules"
            required
          />
          <v-btn color="green" type="submit" :disabled="!valid">로그인</v-btn>
          <v-btn dark nuxt to="/signup">회원가입</v-btn>
        </v-container>
      </v-form>
    </v-card>
  </v-container>
  <v-container v-else>
    <v-card>
      <v-container>
        {{ me.nickname }}님 로그인되었습니다.
        <v-btn @click="onLogOut">로그아웃</v-btn>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        email: '',
        password: '',
        valid: false,
        emailRules: [
          v => !!v || '이메일은 필수입니다.',
          v => /.+@+./.test(v) || '이메일이 유효하지 않습니다.'
        ],
        passwordRules: [
          v => !!v || '비밀번호는 필수입니다.'
        ]
      }
    },
    methods: {
      onSubmitForm() {
        if (this.$refs.form.validate()) {
          this.$store.dispatch('users/logIn', { // actions은 비동기라고 했잖아
            email: this.email,
            nickname: 'EHwooKim'
          })
          .then(() => {           // 이거 처리해주거나 signup.vue에서 me를 watch해서 메인페이지로 이동하는 처리.
            this.$router.push({
              path: '/'
            })
          })
        } else {
          alert('로그인 실패!')
        }
      },
      onLogOut() {
        this.$store.dispatch('users/logOut')
      }
    },
    computed: {
      me() {
        return this.$store.state.users.me
      }
    }

  }
</script>

<style>

</style>