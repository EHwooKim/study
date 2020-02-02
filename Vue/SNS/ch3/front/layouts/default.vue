<template>
  <v-app>
    <nav>
      <v-app-bar dark color="green" app>
        <v-toolbar-title>
          <nuxt-link to="/"> NodeBird</nuxt-link>
        </v-toolbar-title>
        <v-spacer />
        <v-toolbar-items>
          <v-form @submit.prevent="onSearchHashtag">
            <div :style="{ display: 'flex', height: '100%', alignItems: 'center' }">
              <v-text-field 
                v-model="hashtag"
                label="검색"
                hide-details 
                prepend-icon="mdi-magnify" 
                :style="{display: 'flex', alignItems: 'center'}"
              />
            </div>
          </v-form>
          <v-btn text nuxt to="/profile" :style="{display: 'flex', alignItems: 'center'}">
            <div>프로필</div>
          </v-btn>
          <v-btn text nuxt to="/signup" :style="{display: 'flex', alignItems: 'center'}">
            <div>회원가입</div>
          </v-btn>
        </v-toolbar-items>
      </v-app-bar>
    </nav>
    <v-content>
      <v-row dense>
        <v-col cols="12" md="4">
          <login-form />
        </v-col>
        <v-col cols="12" md="8">
          <nuxt />  <!--이걸 써줘야 router-view와 같은 기능 한다그랬지?-->
        </v-col>
      </v-row>
    </v-content>
  </v-app>
</template>


<script>
  import LoginForm from '~/components/LoginForm' // ~는 루트폴더를 의미한다. (정확히는 소스들의 루트폴더)
  export default {
    components: {
      LoginForm,
    },
    data() {
      return {
        hashtag: '',
      }
    },
    methods: {
      onSearchHashtag() {
        this.$router.push({
          path: `/hashtag/${this.hashtag}`
        })
        this.hashtag = ''
      }
    }
  }
</script>

<style scoped>
  a {
    display: inline-block;
    text-decoration: none;
    color: inherit;
  }
</style>
