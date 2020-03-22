<template>
  <div style="margin-bottom: 20px">
    <v-card>
      <post-images :images="post.Images || []" />
      <v-card-title>
        <h3>
          <!-- <nuxt-link :to="'/user/' + post.id">{{post.User.nickname}}</nuxt-link> -->
        </h3>
      </v-card-title>
      <v-card-text>
        <div>
          <div>{{post.content}}</div>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn text color="orange">
          <v-icon>mdi-twitter-retweet</v-icon>
        </v-btn>
        <v-btn text color="orange" @click="onClickHeart">
          <v-icon>{{heartIcon}}</v-icon>
        </v-btn>
        <v-btn text color="orange" @click="onToggleComment">
          <v-icon>mdi-comment-outline</v-icon>
        </v-btn>
        <v-menu offset-y open-on-hover>
          <template v-slot:activator="{ on }">
            <v-btn 
              text color="orange"
              v-on="on"
              >
              <v-icon>mdi-dots-horizontal</v-icon>
            </v-btn>
          </template>
          <div style="background: white">
            <v-btn dark color="red" @click="onRemovePost">삭제</v-btn>
            <v-btn text color="orange" @click="onEditPost">수정</v-btn>
          </div>
        </v-menu>
      </v-card-actions>
    </v-card>
    <template v-if="commentOpened">
      <comment-form :post-id="post.id"/>
      <v-list>
        <v-list-item v-for="comment in post.Comments" :key="comment.id">
          <v-list-item-avatar color="teal lighten-4">
            <span>{{comment.User.nickname[0]}}</span>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{comment.User.nickname}}</v-list-item-title>
            <v-list-item-subtitle>{{comment.content}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </template>
  </div>
</template>

<script>
import CommentForm from '~/components/CommentForm'
import PostImages from '~/components/PostImages'

export default {
  components: {
    CommentForm,
    PostImages,
  },
  props: {
    post: {
      type: Object,
      required: true, // 부모로부터 필수로 받느냐 아니냐
    }
  },
  data() {
    return {
      commentOpened: false
    }
  },
  computed: {
    me() {
      return this.$store.state.users.me
    },
    liked() {
      const me = this.$store.state.users.me
      return !!(this.post.Likgers || []).find(v => v.id === (me && me.id)) // 좋아요한 사람 목록에서 나 찾기
    },
    heartIcon() {
      return this.liked ? 'mdi-heart' : 'mdi-heart-outline'
    }
  },
  methods: {
    onRemovePost() {
      this.$store.dispatch('posts/remove', {
        postId: this.post.id,
      })
    },
    onEditPost() {
      //숙제
    },
    onToggleComment() {
      if (!this.commentOpened) { // 닫혀있을 때 해야겠지
        this.$store.dispatch(`posts/loadComments`, {
          postId: this.post.id
        })
      }
      this.commentOpened = !this.commentOpened;
    },
    onRetweet() {
      if (!this.me) {
        return alert('로그인이 필요합니다.')
      }
      this.$store.dispatch('posts/retweet', {
        postId: this.post.id
      })
    },
    onClickHeart() {
      if (!this.me) {
        return alert('로그인이 필요합니다.')
      }
      if (this.liked) {
        return this.$store.dispatch('posts/unlikePost', {
          postId: this.post.id
        })
      }
      return this.$store.dispatch('posts/likePost', {
        postId: this.post.id
      })
    }
  }
}
</script>

<style scoped>
  a {
    color:inherit;
    text-decoration: none;
  }
</style>