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
        console.log(this.$root.$data)
        console.log(this.$root.$data) // 최상위 컴포넌트의 데이터에 접근
        console.log(this.$parent.$data) // 부모 컴포넌트의 데이터에 접근

        if (this.cellData) return // 이미 누른칸을 또 눌렀을 때는 코드 중단 
        // this.$root.$data.tableData[this.rowIndex][this.cellIndex] = this.$root.$data.turn //이건 작동안한다
        const rootData = this.$root.$data
        this.$set(rootData.tableData[this.rowIndex], this.cellIndex, rootData.turn)
        // this.$set(바꾸고싶은 배열의 인덱스들, 키-마지막 인덱스, 바꾸고 싶은 값.)

        let win = false
        if (rootData.tableData[this.rowIndex][0] === rootData.turn && rootData.tableData[this.rowIndex][1] === rootData.turn && rootData.tableData[2]) {
          win = true
        }
        if (rootData.tableData[0][this.cellIndex] === rootData.turn && rootData.tableData[1][this.cellIndex] === rootData.turn && rootData.tableData[2][this.cellIndex] === rootData.turn) {
          win = true
        }
        if (rootData.tableData[0][0] === rootData.turn && rootData.tableData[1][1] === rootData.turn && rootData.tableData[2][2] === rootData.turn) {
          win = true
        }
        if (rootData.tableData[0][2] === rootData.turn && rootData.tableData[1][1] === rootData.turn && rootData.tableData[2][0] === rootData.turn) {
          win = true
        }

        if (win) { //승리
          rootData.winner = rootData.turn
          rootData.turn = 'O'
          rootData.tableData = [['', '', ''], ['', '', ''], ['', '', '']]
        } else { //무승부
          let all = true // all이 true이면 무승부라는 뜻
          rootData.tableData.forEach((row) => { // 무승부 검사
            row.forEach((cell) => {
              if (!cell) {
                all = false
              }
            })
          })
          if (all) {
            rootData.winner = ''
            rootData.turn = 'O'
            rootData.tableData = [['', '', ''], ['', '', ''], ['', '', '']]
          } else { // 다음턴으로
            rootData.turn = rootData.turn === 'O' ? 'X' : 'O'
          }
        }
      }
    }
  }
</script>

<style>
</style>