<template>
  <tr>
    <td-component v-for="(cellData, index) in rowData" :cell-data="cellData" :cell-index="index" :row-index="rowIndex" :key="index"></td-component>
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
    props: {
      rowData: Array,
      rowIndex: Number,
    }
  }
</script>

<style>

</style>