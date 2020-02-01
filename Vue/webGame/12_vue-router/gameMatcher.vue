<template>
  <div v-if="currentGame === 'number-baseball'">
    <number-baseball></number-baseball>
  </div>
  <div v-else-if="currentGame === 'response-check'">
    <response-check></response-check>
  </div>
  <div v-else-if="currentGame === 'lotto-generator'">
    <lotto-generator></lotto-generator>
  </div>
  <div v-else>일치하는 게임이 없습니다.</div>
</template>

<script>
  import numberBaseball from '../3_숫자야구/numberBaseball'
  import responseCheck from '../4_반응속도체크/responseCheck'
  import lottoGenerator from '../6_로또/lottoGenerator'

  export default {
    components: {
      numberBaseball,
      responseCheck,
      lottoGenerator
    },
    mounted() {
      console.log(this.$router) // vue router 전체에 대한 설정
      console.log(this.$route) // 현재 주소에 대한 설정
    },
    computed: {
      currentGame() {
        return this.$route.params.name
      }
    }
  }
</script>