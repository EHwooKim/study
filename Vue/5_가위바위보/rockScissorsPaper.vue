<template>
  <div>
    <div id="computer" :style="computedStyleObject"></div>
    <div>
      <button @click="onClickButton('바위')">바위</button>
      <button @click="onClickButton('가위')">가위</button>
      <button @click="onClickButton('보')">보</button>
    </div>
    <div>{{result}}</div>
    <div>현재 {{score}}점</div>
  </div>    
</template>

<script>
  const rspCoords = {
    바위: '0',
    가위: '-142px',
    보: '-284px',
  }
  
  const scores = {
    가위: 1,
    바위: 0,
    보: -1,
  }
  
  const computerChoice = (imgCoord) => {
    return Object.entries(rspCoords).find(function (v) {
      return v[1] === imgCoord
    })[0]
  }
  let interval = null
  export default {
    data() {
      return {
        imgCoord: rspCoords.바위, 
        result: '',
        score: 0,
      }
    },
    computed: {
      computedStyleObject() {
        return {
          background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${this.imgCoord} 0`, // 단순히 데이터만 쓰는게 아니라, 데이터 옆에 뭔가 추가적인게 있을 때는 cimputed사용하자. 캐싱이 될 수 있도록.
        }
      }
    },
    methods: {
      changeHand() {
        interval = setInterval(() => {
          if (this.imgCoord === rspCoords.바위) {
            this.imgCoord = rspCoords.가위
          } else if (this.imgCoord === rspCoords.가위) {
            this.imgCoord = rspCoords.보
          } else if (this.imgCoord === rspCoords.보) {
            this.imgCoord = rspCoords.바위
          }
        }, 100) // 0.1초마다 화면이 바뀌게.
      },
      onClickButton(choice) {  
        clearInterval(interval) // 손가락 바꾸는거 멈추게.
        const myScore = scores[choice]
        const cpuScore = scores[computerChoice(this.imgCoord)]
        const diff = myScore - cpuScore
        if (diff === 0) {
          this.result = '비겼습니다'
        } else if ([-1, 2].includes(diff)) {
          this.result = '이겼습니다'
          this.score += 1
        } else {
          this.result = '졌습니다'
          this.score -= 1
        }
        setTimeout(() => {
          this.changeHand()
        }, 1000)
      }
    },
    mounted() {
      this.changeHand()
    },
    beforeDestroy() {
      clearInterval(interval) // 메모리 누수 방지를 위해 interval 종료 
    }
  }
</script>

<style scoped>
  #computer {
    width: 142px;
    height: 200px;
    background-position: 0 0;
  }
</style>