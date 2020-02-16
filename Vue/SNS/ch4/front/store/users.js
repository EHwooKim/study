export const state = () => ({
  me: null, // me 가 null 이면 로그인 안한상태, 그 외에는 로그인 상태  
  followerList: [],
  followingList: [],
  hasMoreFollower: true,
  hasMoreFollowing: true,
})

const totalFollowers = 6; // DB에 얼마나 있는지 모르는게일반적이고 지금은 더미데이터로 테스트 위한 변수
const totalFollowings = 8;
const limit = 3

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
  },
  loadFollowings(state) {
    const diff = totalFollowings - state.followingList.length
    const fakeUsers = Array(diff > limit ? limit : diff).fill().map(v => ({
      id: Math.random().toString(),
      nickname: Math.floor(Math.random() * 1000)
    }))
    state.followingList = state.followingList.concat(fakeUsers)
    state.hasMoreFollowing = fakeUsers.length === limit
  },
  loadFollowers(state) {
    const diff = totalFollowers - state.followerList.length
    const fakeUsers = Array(diff > limit ? limit : diff).fill().map(v => ({
      id: Math.random().toString(),
      nickname: Math.floor(Math.random() * 1000)
    }))
    state.followerList = state.followerList.concat(fakeUsers)
    state.hasMoreFollower = fakeUsers.length === limit
  }
}

export const actions = {
  signUp({ commit, state }, payload) {
    this.$axios.post('/user', {
      email: payload.email,
      nickname: payload.nickname,
      password: payload.password,
    }) // this.$axios 같은 접근은 nuxt.config.js에서 연결했기 떄문에 가능하다.

    commit('setMe', payload)
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
  },
  loadFollowers({ commit, state }, payload) {
    if (state.hasMoreFollower) {
      commit('loadFollowers')
    }
  },
  loadFollowings({ commit, state }, payload) {
    if (state.hasMoreFollowing) {
      commit('loadFollowings') 
    }
  },

}