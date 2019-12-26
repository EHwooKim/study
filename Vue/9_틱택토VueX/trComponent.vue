<template>
  <tr>
    <td-component v-for="(cellData, index) in rowData" :cell-index="index" :row-index="rowIndex" :key="index"></td-component>
  </tr>
</template>

<script>
  import tdComponent from './tdComponent'
  
  export default {
    components: {
      tdComponent,
    },
    data() {
      return {
        parent: '내가 니 애비다'
      }
    },
    computed: {
      rowData() {
        return this.$store.state.tableData[this.rowIndex]
      }
    },
    props: {  
      // rowData: Array, // vuex를 사용하면 부모로부터 데이터를 받는 이 과정이 필요없다.
      rowIndex: Number,
    },
  }
</script>

<style>

</style>