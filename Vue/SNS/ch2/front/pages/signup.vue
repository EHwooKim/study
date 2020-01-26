<template>
  <div>
    <v-container>
      <v-card>
        <v-subheader>회원가입</v-subheader>
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
            <v-text-field
              v-model="passwordCheck"
              label="비밀번호확인"
              type="password"
              :rules="passwordCheckRules"
              required
            />
            <v-text-field
              v-model="nickname"
              label="닉네임"
              type="nickname"
              :rules="nicknameRules"
              required
            />
            <v-checkbox
              v-model="terms"
              label="개인정보 제공 동의합니다"
              :rules="[v => !!v || '약관에 동의해야합니다.']" 
              required
            />
            <!-- dark 모드랑 disabled랑 충돌떄문에 class="white--text"를 사용 -->
            <v-btn class="white--text" color="green" type="submit" :disabled="!valid">가입하기</v-btn>
          </v-container>
        </v-form>
      </v-card>
    </v-container>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        valid: false, // 회원가입 버튼이 눌릴 수 있는지 체크
        email: '',
        password: '',
        passwordCheck: '',
        nickname: '',
        terms: false,    // 약관동의
        emailRules: [    // vuetify에서 제공하는 검증과정을 위한 데이터, [조건함수 || 에러메시지] 형태
          v => !!v || '이메일은 필수입니다.',   // 검증 위한 데이터가 v로 들어오고 빈칸일경우 에러메시지
          v => /.+@.+/.test(v) || '이메일이 유효하지 않습니다.' // 이메일 체크 정규표현식
        ],
        nicknameRules: [
          v => !!v || '닉네임은 필수입니다.'
        ],
        passwordRules: [
          v => !!v || '비밀번호는 필수입니다.'
        ],
        passwordCheckRules: [
          v => !!v || '비밀번호 확인은 필수입니다.',
          v => v === this.password || '비밀번호가 일치하지 않습니다.'
        ],
        
      }
    },
    methods: {
      onSubmitForm() {
        // this.$refs.form.validate() // form에 ref="form" 써놓고 this.$refs로 접근 가능하고 vlid와 validate()는 vuetify에서 이렇게 하라고 한 것.
        // console.log(this.valid)    // form 조건들이 만족하면 valid를 true로 바꿔준다. this.valid 말고 위의 코드도 true,false를 반환하기에 이를 활용하여 다음 코드 작성도 가능, 아래처럼
        if (this.$refs.form.validate()) {
          alert('회원가입 시도!')
        } else {
          alert('폼이 유효하지 않습니다.')
        }
        
      }
    },
    head() {
      return {
        title: '회원가입'
      }
    }
  }

</script>

<style>

</style>