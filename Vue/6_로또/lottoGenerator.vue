<template>
  <div>
    <div>당첨 숫자</div>
    <div id="결과창">
      <lotto-ball v-for="ball in winBalls" :key="ball" v-bind:number="ball"></lotto-ball>
    </div>
    <div>보너스</div>
    <lotto-ball v-if="bonus" :number="bonus"></lotto-ball>
    <button v-if="redo" @click="onCLickRedo">한 번 더!</button>
  </div>    
</template>

<script>
  import lottoBall from './lottoBall'

  function getWinNumbers() {
    const candidate = Array(45).fill().map((v, i) => i + 1)
    const shuffle = []
    while (candidate.length > 0) {
      shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0])
    }
    const bonusNumber = shuffle[shuffle.length - 1]
    const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c)
    return [...winNumbers, bonusNumber]
  }
  
  const timeouts = []
  export default {
    components: {
      lottoBall,
    },
    data() {
      return {
        winNumbers: getWinNumbers(), // 숫자를 뽑아놓고
        winBalls: [],  // 하나씩 옮기면서 화면에 표시하기 위해 따로 배열 생성
        bonus: null,
        redo: false,
      }
    },
    methods: {
      onCLickRedo() {
        this.winNumbers = getWinNumbers()
        this.winBalls = []
        this.bonus = null
        this.redo = false
      },
      showBalls() {
        for (let i = 0; i< this.winNumbers.length - 1; i++) { // 여기서 var를 쓰면 클로저 문제가 생기는데 let을 쓰면 안생겨서 반복문 안에 비동기(setTimeout)사용 가능
          timeouts[i] = setTimeout(() => {
            this.winBalls.push(this.winNumbers[i])
          }, (i + 1) * 1000)
        }
        timeouts[6] = setTimeout(() => {
          this.bonus = this.winNumbers[6]
          this.redo = true
        }, 7000)
      }
    },
    mounted() {
      this.showBalls()
    },
    beforeDestroy() {
      timeouts.forEach((t) => {
        clearTimeout(t)
      })
    },
    watch: { 
      bonus(value, oldValue) {
        if(value === null) {
          this.showBalls()
        }
      }
    }
  }
</script>

<style scoped>  
</style>