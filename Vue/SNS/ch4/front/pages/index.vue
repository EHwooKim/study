<template>
  <v-container>
      <post-form v-if="me" />
    <div>
      <post-card v-for="post in mainPosts" :key="post.id" :post="post"/>
    </div>
  </v-container>

</template>
<script>
  import PostCard from '~/components/PostCard'
  import PostForm from '~/components/PostForm'

  export default {
    components: {
      PostCard,
      PostForm,
    },
    data() {
      return {
        name: 'Nuxt.js'
      }
    },
    computed: {
      me() {
        return this.$store.state.users.me
      },
      mainPosts() {
        return this.$store.state.posts.mainPosts
      },
      hasMorePost() {
        return this.$store.state.posts.hasMorePost
      }
    },
    // fetch는 store의 데이터를 비동기 처리할 떄 사용하고, store가 아닌 컴포넌트의 data를 비동기 처리할 떄는 asyncData를 사용한다.
    fetch({ store }) { // 처음 시작시 데이터를 넣어주는 역할, 컴포넌트가 마운트 되기 전에 스토어에 비동기적으로 데이터를 넣을 떄 사용한다.
      return store.dispatch('posts/loadPosts') // 화면이 뜨기 전에 미리 게시글을 가져온다. return 없으면 안된다. 프로미스이기 떄문에 <= 서버사이드 렌더링에서 중요!
    },
    asyncData() { // 이것도 화면 그려지기 비동기 작업을 하는데, 이때 리턴하는 것은 위의 data랑 합쳐진다. 원래 vue의data로는 비동기 작업을 못하기에 비동기 작업을 위한 것이 asyncData이다
      return {}
    },
    mounted() { // mounted가 화면에 붙었을 때인데 화면에 붙기 전에 window나 document에 접근하면 안되니 window는 created가 아닌 mounted에서 쓸 수 있다.
      window.addEventListener('scroll', this.onScroll) // window는 created에서 못쓴다.
    },
    created() {  // created에서 이렇게 만들어 준것은 beforeDestory에서 제거해줘야 메모리 누수가 없다.
    },
    beforeDestroy() {
      window.removeEventListener('scroll', this.onScroll)
    },
    methods: {
      onScroll() {
        if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
          if (this.hasMorePost) {
            this.$store.dispatch('posts/loadPosts')
          }
        }
      }
    },
  }

</script>

<style>

</style>