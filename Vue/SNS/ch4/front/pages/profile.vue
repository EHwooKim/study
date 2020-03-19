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
              dark
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
        <v-container>
          <v-subheader>팔로잉</v-subheader>
          <follow-list :users="followingList" :remove="removeFollowing" />
          <v-btn @click="loadMoreFollwings" v-if="hasMoreFollowing" dark color="blue" style="width:100%">더보기</v-btn>
        </v-container>
      </v-card>
    <v-card style="margin-bottom: 20px">
        <v-container>
          <v-subheader>팔로워</v-subheader>
          <follow-list :users="followerList" :remove="removeFollower" />
          <v-btn @click="loadMoreFollwers" v-if="hasMoreFollower" dark color="blue" style="width:100%">더보기</v-btn>
        </v-container>
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
      },
      followingList() {
        return this.$store.state.users.followingList
      },
      followerList() {
        return this.$store.state.users.followerList
      },
      hasMoreFollowing() {
        return this.$store.state.users.hasMoreFollowing
      },
      hasMoreFollower() {
        return this.$store.state.users.hasMoreFollower
      }

    },
    fetch({ store }) {
      store.dispatch('users/loadFollowers')
      return store.dispatch('users/loadFollowings')
    },
    methods: {
      onChangeNickname() {
        this.$store.dispatch('users/changeNickname', {
          nickname: this.nickname
        })
        .then(() => {
          this.nickname = '';
        })
      },
      removeFollowing(id) {           // 같은 FollowList 컴포넌트에서 다르게 작동해야하니 method도 props로 넘겨주고, 삭제할 유저의 id를 모르니 매개변수로 넘겨준다
        this.$store.dispatch('users/removeFollowing', { id }) // id: id 같이 키와 값이 같을떄 축약 가능하지
      },
      removeFollower(id) {
        this.$store.dispatch('users/removeFollower', { id })
      },
      loadMoreFollwings() {
        this.$store.dispatch('users/loadFollowings')
      },
      loadMoreFollwers() {
        this.$store.dispatch('users/loadFollowers')
      },
    },
    middleware: 'authenticated'
  }

</script>

<style>

</style>