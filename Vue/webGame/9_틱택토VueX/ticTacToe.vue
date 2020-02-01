<template>
  <div>
    <div>{{turn}} 님의 턴입니다.</div>
    <table-component/>
    <div v-if="winner">{{winner}}님의 승리!</div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import store from './store'
  // import Vue from 'vue'
  import tableComponent from './tableComponent'
 
  export default {
    store,
    components: {
      tableComponent,
    },
    computed: { // template를 보니 여기서는 winner 랑 turn이 필요하니까!  
      ...mapState(['winner', 'turn']),  //아래와같이 쓸 수도 있따.

      // ...mapState({
      //   winner: state => state.winner,
      //   winnder(state) {
      //     return state.winner + this.data // 위의 코드처럼 화살표 함수를 쓸 수도 있지만 화살표 함수를 안쓰고 이렇게 추가적인 조작도 가능하다.
      //   },
      //   turnState: 'turn'  // turn을 turnState로 이름을 바꿀 수도 있다.
      // })

      // winner() {
      //   return this.$store.state.winner
      // },
      // turn() {
      //   return this.$store.state.turn
      // },
    }
  }
</script>

<style>  
  table {
    border-collapse: collapse;
  }
  td {
    border: 1px solid black;
    width: 40px;
    height: 40px;
    text-align: center;
  }
</style>