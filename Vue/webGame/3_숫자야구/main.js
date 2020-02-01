import Vue from 'vue'
import numberBaseball from './numberBaseball.vue'  // webpack - extensions에 설정을 해놔서 .vue를 지워도 제대로 인식한다.

new Vue(numberBaseball).$mount('#root')  // numberBaseball이 컴포넌트가 메인 컴포넌트가 되기에 Vue() 안에 넣어서 연결해줘야한다.
                                         // 새로운 것을 추가한 뒤에는 npm run build 다시 해준다.