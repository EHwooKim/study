<template>
  <v-container>
    <div>
      <post-card v-for="post in mainPosts" :key="post.id" :post="post"/>
    </div>
  </v-container>

</template>
<script>
  import PostCard from '~/components/PostCard'

  export default {
    components: {
      PostCard,
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
    fetch({ store }) { // 처음 시작시 데이터를 넣어주는 역할, 컴포넌트가 마운트 되기 전에 스토어에 비동기적으로 데이터를 넣을 떄 사용한다.
      store.dispatch('posts/loadPosts') // 화면이 뜨기 전에 미리 게시글을 가져온다.
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