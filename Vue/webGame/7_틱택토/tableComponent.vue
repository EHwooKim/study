<template>
  <table>
    <tr-component v-for="(rowData, index) in tableData" :row-data="rowData" :row-index="index" :key="index"></tr-component>
  </table>
</template>

<script>
  import trComponent from './trComponent'

export default {
  props: {
    tableData: Array
  },
  components: {
    trComponent,
  },
  data() {
    return {

    }
  }
}
</script>

<style scoped>

</style>