export const state = () => ({ })

export const mutations = {

}

export const actions = {
  nuxtServerInit ({ commit, dispatch, state}) { // 로그인 유지를 위한 코드, 예약된 이름이라 꼭 nuxtServerInit이라고 해야한다
    return dispatch('users/loadUser') // 서버사이드 랜더링을 할 때 핵심적인 역할을 하는데, 모든 페이지에서 화면이 그려지기 전에 실행한다.
  } // 주의!! return없이 그냥 dispatch하면 안된다. 지금 dispatch는 비동기 Promise인데 그런건 웬만하면 return해주는게 좋다.
}// nuxtServerInit 말고도 fetch들도 페이지 로딩 전에 실행되다보니 그 때 실행되는 프로미스들은 return을 해줘야 프로미스가 끝나길 기다렸다가 다음 것들이 실행된다.