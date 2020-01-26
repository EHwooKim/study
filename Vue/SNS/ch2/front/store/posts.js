export const state = () => ({
    mainPosts: [],  // 게시글을 담아둘 배열
  })
  

  export const mutations = {
    addMainPost(state, payload) {
      state.mainPosts.unshift(payload)  // push는 맨 뒤에 추가, unshift는 맨 앞에 추가.
    }
  }

  export const actions = {
    add({ commit }, payload) {  // 비동기 작업이라 여기 한번 더..?가 아니라 서버에 등록하고, 보여지는 vue에도 등록해야 하니까
      // 서버에 게시글 등록 요청 보내는 코드!!
      commit('addMainPost', payload)
    }
  }