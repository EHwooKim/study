<template>
  <div>
    <v-container>
      <v-card style="margin-bottom: 20px">
        <v-container>
          <v-subheader>내 프로필</v-subheader>
        </v-container>
        <v-form 
          v-model="valid"
          @submit.prevent="onChangeNickname"
        >
          <v-container>
            <v-text-field
              v-model="nickname"
              label="닉네임 수정"
              required
              :rules="nicknameRules"
            />
            <v-btn 
              color="blue" 
              type="submit"
              :disabled="!valid"
            >
              수정
            </v-btn>
          </v-container>
        </v-form>
      </v-card>
      <v-card style="margin-bottom: 20px">
        <v-container>팔로잉</v-container>
        <follow-list />
      </v-card>
      <v-card style="margin-bottom: 20px">
        <v-container>팔로워</v-container>
        <follow-list />
      </v-card>
    </v-container>
  </div>
</template>
<script>
  import FollowList from '~/components/FollowList'
  export default {
    // layout: 'admin', // vue에는 없는 속성, 이렇게 하면 default가 아닌 다른 레이아웃 적용이 가능하다.
    components: {
      FollowList,
    },
    data() {
      return {
        valid: false,
        nickname: '',
        nicknameRules: [
          v => !!v || '닉네임을 입력해주세요'
        ]
      }
    },
    computed: {
      me() {
        return this.$store.state.users.me
      }
    },
    methods: {
      onChangeNickname() {
        this.$store.dispatch('users/changeNickname', {
          nickname: this.nickname
        })
        .then(() => {
          this.nickname = '';
        })
      }
    }
  }

</script>

<style>

</style>