<template>
  <v-container v-if="post">
    <post-card :post="post" />
  </v-container>
  <div v-else>
    해당 게시글이 존재하지 않습니다.
  </div>
</template>

<script>
// /post/_id.vue와 같이 폴더를 만들었고 주소 또한 이렇게 되길 바라는데
// /post/1 /post/100 처럼 숫자가 붙을 떄 말고도 /post 에도 작동이된다.. 그런데 보통 이렇게 작동되기를 원하지 않겠지
// 그럴 때 쓰는 방법이 /post/_id/index.vue 이다. 사용법은 동일하다.
import PostCard from '~/components/PostCard'

export default {
  components: {
    PostCard,
  },
  computed: {
    post() {  // 아래의 코드는 실제 서비스에서 아직 로딩되지 않은 상태에서 동작하지 않을 수 있다.. 그럴 때 필요한게 fetch 또는 asyncData
      return this.$store.state.posts.mainPosts.find(v => v.id === parseInt(this.$route.params.id, 10))
    }
  }
}
</script>

<style>

</style>