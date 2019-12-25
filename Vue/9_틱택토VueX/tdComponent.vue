<template>
  <td @click="onClickTd">{{cellData}}</td>
</template>

<script>
  import { mapState } from 'vuex'
  import { CLICK_CELL, SET_WINNER, RESET_GAME, CHANGE_TURN } from './store'

  export default {
    props: {
      cellData: String,
      rowIndex: Number,
      cellIndex: Number
    },
    computed: {
      ...mapState({
        tableData: state => state.tableData,
        turn: state => state.turn,
        cellData(state) {
          return state.tableData[this.rowIndex][this.cellIndex]
        }
      }), // 아래 세 데이터가 mapState를 사용하면 위의 코드로 간단하게!
      // cellData() {
      //   return this.$store.state.tableData[this.rowIndex][this.cellIndex] // 부모 컴포넌트들로부터 데이터를 하나씩 이어받던 떄와는 다르게 이제 바로 접근이 가능하다. 
      // },
      // tableData() {
      //   return this.$store.state.tableData // 밑에서 this.tableData를 이제 쓸 수 있겠지
      // },
      // turn() {
      //   return this.$store.state.turn
      // }
    },
    methods: {
      onClickTd() {
        if (this.cellData) return // 이미 누른칸을 또 눌렀을 때는 코드 중단 

        // this.$set(this.tableData[rowIndex], cellIndex, this.turn) 이 코드를 vuex를 사용하면 아래 코드가 되는거지
        this.$store.commit(CLICK_CELL, {row: this.rowIndex, cell: this.cellIndex}) // mutation을 부를 떄는 commit 으로 부른다. 
        
        let win = false
        if (this.tableData[this.rowIndex][0] === this.turn && this.tableData[this.rowIndex][1] === this.turn && this.tableData[2]) {
          win = true
        }
        if (this.tableData[0][this.cellIndex] === this.turn && this.tableData[1][this.cellIndex] === this.turn && this.tableData[2][this.cellIndex] === this.turn) {
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
</style>