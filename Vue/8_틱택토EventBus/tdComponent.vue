<template>
  <td @click="onClickTd">{{cellData}}</td>
</template>

<script>
  import eventBus from './eventBus'
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
        eventBus.$emit('clickTd', this.rowIndex, this.cellIndex)  // $emit 이랑 $on 이랑 대응된다.
      }
    }
  }
</script>

<style>
</style>