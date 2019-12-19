<template>
  <td @click="onClickTd">{{cellData}}</td>
</template>

<script>
  export default {
    props: {
      cellData: String,
      rowIndex: Number,
      cellIndex: Number
    },
    methods: {
      onClickTd() {
        if (this.cellData) return // 이미 누른칸을 또 눌렀을 때는 코드 중단 
        // this.$root.$data.tableData[this.rowIndex][this.cellIndex] = this.$root.$data.turn 이건 작동안한다

      }
    }
  }
</script>

<style>
</style>