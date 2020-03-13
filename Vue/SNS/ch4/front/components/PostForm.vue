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
        <v-btn type="submit" color="green" absolute right>짹짹</v-btn>
        <input type="file" ref="imageInput" multiple hidden @change="onChangeImages"> <!--이미지 업로드에 필요한 type="file", 여러장 올릴 수 있게 multiple, 숨겨져있다가 업로드 버튼 누르면 실행되게 만들기 위해 hidden-->
        <v-btn type="button" @click="onClickImageUpload" >이미지 업로드</v-btn> <!--form 안의 버튼 중 submit을위한 버튼 외에는 type="button"을 해줘야한다. 그렇지 않으면 기본으로 form을 submit하기에 원하는대로 동작을 안한다.-->
        <div>
          <div v-for="(p, i) in imagePaths" :key="p" style="display:inline-block">
            <img :src="`http://localhost:3085/${p}`" :alt="p" style="width: 200px">
            <div>
              <button @click="onRemoveImage(i)" type="button">제거</button>
            </div>
          </div>
        </div>
      </v-form>
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
      ...mapState('users', ['me']),   // return 방식 말고 이 방법도 있다고 그랬지?
      ...mapState('posts', ['imagePaths'])
    },
    methods : {
      onChangeTextarea(value) {        // 한글자라도 치면 밑에 작은 부분을 없애주기 위한 코드. 왜? 다음 게시글 작성 후 다음 게시글 작성시 이전 상태 초기화를 위해.
        if (value.length){ 
          this.hideDetails = true
          this.success = false
          this.successMessages = ''
        }
      },
      onSubmitForm() {
        if (this.$refs.form.validate()) {
          this.$store.dispatch('posts/add',{
            content: this.content,  // 게시글 내용 외에도 아래와 같은 정보가 필요하겠지.
          })
          .then(() => {
            this.content = ''
            this.hideDetails = false
            this.success = true
            this.successMessages = '게시글 등록 성공' // hideDetails 부분이 생기면서 게시글 등록 성공이 보일거다
          })
          .catch(() => {

          })
        }
      },
      onClickImageUpload() {
        this.$refs.imageInput.click() // input태그에 ref 설정하고, this.$refs로 접근하여 업로드 버튼을 클릭하면 input을 클릭한 것과 같은 효과를 주는 것.
      },
      onChangeImages(e) { // 파일 선택창이 떠서 파일을 선택하면 change이벤트가 실행되어 이 change이벤트에서 이미지 업로드 요청을 보낸다.
        console.log(e.target.files) // e.target.files안에 사진정보 존재.
        const imageFormData = new FormData();
        [].forEach.call(e.target.files, (f) => { // e.target.files가 유사배열이라 forEach를 사용못해서 이와같은 코드 사용 
          imageFormData.append('image', f) // FormData에 추가 => imageFormData는 {image: [file1, file2]} 대충 이런 모양
        })
        this.$store.dispatch('posts/uploadImages', imageFormData)
      },
      onRemoveImage(index) {
        this.$store.commit('posts/removeImagePath', index)
      }
    }
  }
</script>

<style>

</style>