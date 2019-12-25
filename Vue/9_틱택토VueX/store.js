import Vue from 'vue'
import Vuex from 'vuex'

// 
Vue.use(Vuex)  // 이 줄을 쓰면 this.$store가 생겼다고 보면된다.
// Vue.use(axios) 를 쓰면 this.$axios를 쓸수 있고~

export const SET_WINNER = 'SET_WINNER'
export const CLICK_CELL = 'CLICK_CELL'
export const CHANGE_TURN = 'CHANGE_TURN'
export const RESET_GAME = 'RESET_GAME'
export const NO_WINNER = 'NO_WINNER'  // export const 는 import {SET_WINNER, CLICK_CELL} from './store' 처럼 중괄호로 묶어서 가져오며 이름을 동일하게 가져온다.

export default new Vuex.Store({ // export default 는 import로 가져올 수 있으며 이름도 원하는대로 정할 수 있다. 예) import store from './store'...!!  보통 가장 중요한 하나를 export default로 그 외것들은 export const와 같이 사용한다.
  state: {
    tableData : [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ],
    turn: 'O',
    winner: '',
  },  // vue의 data 속성과 비슷
  getters: {
    turnMessage(state) {
      return state.turn + '님이 승리하셨습니다.'
    }
  },  // vue의 computed와 비슷
  mutations: {
    [SET_WINNER](state, winner) {
      state.winner = winner
    },
    [CLICK_CELL](state, { row, cell }) {
      // state.tableData[row][cell] = state.turn // 이 형태 뭔가 익숙하지? vue에서 배열의 인덱스로 접근하여 값바꾸면 js상에서는 바뀌지만 화면은 안바뀐다 그거야. 그러니 set을 쓰자!
      // vuex 는 this.$set이 없어서 Vue.set으로 해줘야한다.
      Vue.set(state.tableData[row], cell, state.turn)
    },
    [CHANGE_TURN](state) {
      state.turn = state.turn === 'O' ? 'X' : 'O'
    },
    [RESET_GAME](state) {
      state.turn = 'O',
      state.tableData = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
      ]
    },
    [NO_WINNER](state) {
      state.winner = ''
    }
  
  },  // state를 수정할 떄 사용, 동기적으로
  actions: {

  },  // 비동기를 사용할 때, 또는 여러 mutations을 연달아 실핼할 때
})
