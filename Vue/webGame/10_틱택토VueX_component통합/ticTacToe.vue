<template>
  <div>
    <div>{{turn}} 님의 턴입니다.</div>
    <table-componenet>
      <tr v-for="(rowData, rowIndex) in tableData" :key="rowIndex">
        <td @click="onClickTd(rowIndex, cellIndex)" v-for="(cellData, cellIndex) in rowData" :key="cellIndex">{{cellData}}</td>
      </tr>
    </table-componenet>
    <div v-if="winner">{{winner}}님의 승리!</div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import store, { CLICK_CELL, SET_WINNER, RESET_GAME, CHANGE_TURN, NO_WINNER } from './store'

  export default {
    store,
    computed: {
      ...mapState(['winner', 'turn', 'tableData']),
    },
    methods: {
      onClickTd(rowIndex, cellIndex) {
        if (this.cellData) return // 이미 누른칸을 또 눌렀을 때는 코드 중단 

        this.$store.commit(CLICK_CELL, {row: rowIndex, cell: cellIndex}) // mutation을 부를 떄는 commit 으로 부른다. 
        
        let win = false
        if (this.tableData[rowIndex][0] === this.turn && this.tableData[rowIndex][1] === this.turn && this.tableData[2]) {
          win = true
        }
        if (this.tableData[0][cellIndex] === this.turn && this.tableData[1][cellIndex] === this.turn && this.tableData[2][cellIndex] === this.turn) {
          win = true
        }
        if (this.tableData[0][0] === this.turn && this.tableData[1][1] === this.turn && this.tableData[2][2] === this.turn) {
          win = true
        }
        if (this.tableData[0][2] === this.turn && this.tableData[1][1] === this.turn && this.tableData[2][0] === this.turn) {
          win = true
        }

        if (win) { //승리
          this.$store.commit(SET_WINNER, this.turn)
          this.$store.commit(RESET_GAME)
        } else { //무승부
          let all = true // all이 true이면 무승부라는 뜻
          this.tableData.forEach((row) => { // 무승부 검사
            row.forEach((cell) => {
              if (!cell) {
                all = false
              }
            })
          })
          if (all) {
            this.$store.commit(NO_WINNER)
            this.$store.commit(RESET_GAME)
          } else { // 다음턴으로
            this.$store.commit(CHANGE_TURN)
          }
        }        
      }
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