import Vue from 'vue'
import VueRouter from 'vue-router'
import numberBaseball from '../3_숫자야구/numberBaseball'
import responseCheck from '../4_반응속도체크/responseCheck'
import rockScissorsPaper from '../5_가위바위보/rockScissorsPaper'
import lottoGenerator from '../6_로또/lottoGenerator'
import gameMatcher from './gameMatcher'

Vue.use(VueRouter)

export default new VueRouter ({
  mode: 'history',
  routes: [
    { path: '/number-baseball', component: numberBaseball }, // 현재는 모두 동적 주소로 바뀜
    { path: '/response-check', component: responseCheck },
    { path: '/rock-scissors-paper', component: rockScissorsPaper },
    { path: '/lotto-generator', component: lottoGenerator },
    { path: '/game/:name', component: gameMatcher } // game/number-baseball 같은 형태 
  ]
})