<template>
  <div>
    <div>{{turn}} 님의 턴입니다.</div>
    <table-component :table-data="tableData"/>
    <div v-if="winner">{{winner}}님의 승리!</div>
  </div>
</template>

<script>
  // import Vue from 'vue'
  import tableComponent from './tableComponent'
  import eventBus from './eventBus'

  export default {
    components: {
      tableComponent,
    },
    data() {
      return {
        tableData : [
          ['', '', ''],
          ['', '', ''],
          ['', '', '']
        ],
        turn: 'O',
        winner: '',
      }
    },
    methods: {
      onClickTd(rowIndex, cellIndex) {
        this.$set(this.tableData[rowIndex], cellIndex, this.turn)
        // this.$set(바꾸고싶은 배열의 인덱스들, 키-마지막 인덱스, 바꾸고 싶은 값.)

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
          this.winner = this.turn
          this.turn = 'O'
          this.tableData = [['', '', ''], ['', '', ''], ['', '', '']]
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
            this.winner = ''
            this.turn = 'O'
            this.tableData = [['', '', ''], ['', '', ''], ['', '', '']]
          } else { // 다음턴으로
            this.turn = this.turn === 'O' ? 'X' : 'O'
          }
        }        
      }
    },
    created() {
      eventBus.$on('clickTd', this.onClickTd)  // 이벤트 등록
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