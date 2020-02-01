<template>
  <table>
    <tr-component v-for="(rowData, index) in tableData" :row-index="index" :key="index"></tr-component>
  </table>
</template>

<script>
  import trComponent from './trComponent'

export default {
  // props: {  // 부모로 부터 데이터를 받을 필요가 없다
  //   tableData: Array
  // },
  components: {
    trComponent,
  },
  computed: {
    tableData() {
      return this.$store.state.tableData
    },
    turnMessage() {
      return this.$store.getters.turnMessage
    },
  }
}
</script>

<style scoped>

</style>