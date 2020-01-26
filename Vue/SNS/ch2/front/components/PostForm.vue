<template>
  <v-card style="margin-bottom: 20px">
    <v-container>
      <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
        <v-textarea 
          v-model="content"
          outlined
          auto-grow
          clearable
          label="어떤 신기한 일이 있었나요?"
          :hide-details="hideDetails"
          :success-messages="successMessages"
          :success="success"
          :rules="[v => !!v.trim || '내용을 입력하세요']"
          @input="onChangeTextarea"
        />
      </v-form>
      <v-btn type="submit" color="green" absolute right>짹짹</v-btn>
      <v-btn>이미지 업로드</v-btn>
    </v-container>
  </v-card>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    data() {
      return {
        valid: false,
        hideDetails: true,   // 에러 메시지를 띄우는 공간 에러 없을 떄 지우기 
        successMessages: '',
        success: false,
        content: '',
      }
    },
    computed: {
      ...mapState(['users/me'])   // return 방식 말고 이 방법도 있다고 그랬지?  ...mapState('users', ['me'])도 가능하다.
    },
    methods : {
      onChangeTextarea() {        // 한글자라도 치면 밑에 작은 부분을 없애주기 위한 코드. 왜? 다음 게시글 작성 후 다음 게시글 작성시 이전 상태 초기화를 위해.
        this.hideDetails = true
        this.success = false
        this.successMessages = ''
      },
      onSubmitForm() {
        if (this.$refs.form.validate()) {
          this.$store.dispatch('posts/add',{
            content: this.content,  // 게시글 내용 외에도 아래와 같은 정보가 필요하겠지.
            User: {
              nickname: this.me.nickname
            },
            Comments: [],
            Images: [],
            id: Date.now(),
            createdAt: Date.now(),
          })
          .then(() => {
            this.hideDetails = false
            this.success = true
            this.successMessages = '게시글 등록 성공' // hideDetails 부분이 생기면서 게시글 등록 성공이 보일거다
          })
          .catch(() => {

          })
        }
      },
    }
  }
</script>

<style>

</style>