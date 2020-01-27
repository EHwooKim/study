export const state = () => ({
  me: null, // me 가 null 이면 로그인 안한상태, 그 외에는 로그인 상태  
  followerList: [{
      id: 1,
      nickname: '순명'
    }, {
      id: 2,
      nickname: '순평'
    }, {
      id: 3, 
      nickname: '순콩'
    }, {
      id: 4, 
      nickname: '도재'
    }],
  followingList: [{
      id: 1,
      nickname: '순명'
    }, {
      id: 2,
      nickname: '순평'
    }, {
      id: 3, 
      nickname: '순콩'
    }, {
      id: 4, 
      nickname: '도재'
    }],
})

export const mutations = { // 단순 동기 작업
  setMe(state, payload) {  // state는 위에서 정의한 state로 반드시 첫 번쨰 인자
    state.me = payload  // payload는 이와같이 state를 어떻게 바꿀지에 대한 것.
  },
  changeNickname(state, payload) {
    state.me.nickname = payload.nickname
  },
  addFollowing(state, payload) {
    state.followingList.push(payload)
  },
  addFollower(state, payload) {
    state.followerList.push(payload)
  },
  removeFollowing(state, payload) {
    const index = state.followingList.findIndex(v => v.id === payload.id)
    state.followingList.splice(index, 1)
  },
  removeFollower(state, payload) {
    const index = state.followerList.findIndex(v => v.id === payload.id)
    state.followerList.splice(index, 1)
  }
}

export const actions = {  // 동기, 비동기를 포함한 복잡한 작업. 비동기는 무조건 actions에서!!
  signUp({ commit, state }, payload) {  // mutations와 다르게 context(객체), payload를 넣어준다. 지금은 js 구조분해를 통해 필요한 요소만 빼와서 사용하는 방식으로 코드를 작성했다.
    // 최종적으로는 이곳에 서버에 회원가입 요청을 보내는 부분이 들어간다.
    commit('setMe', payload) // 회원가입 후 자동로그인 이곳에서 payload가 회원정보가 되겠지
  },
  logIn({ commit }, payload) {
    commit('setMe', payload)
  },
  logOut({ commit }, payload) {
    commit('setMe', null)
  },
  changeNickname({ commit }, payload) {
    commit('changeNickname', payload)
  },
  addFollowing({ commit }, payload) {
    commit('addFollowing', payload)
  },
  addFollower({ commit }, payload) {
    commit('addFollower', payload)
  },
  removeFollowing({ commit }, payload) {
    commit('removeFollowing', payload)
  },
  removeFollower({ commit }, payload) {
    commit('removeFollower', payload)
  }

}