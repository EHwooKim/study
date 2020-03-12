export const state = () => ({
    mainPosts: [],  // 게시글을 담아둘 배열
    hasMorePost: true, // 더이상 불러올 글이 없으면 false로 바꿔서 스크롤에서 불러오는 코드를 멈춰야겠지
    imagePaths: [],
  })
  
  // 서버에 몇개의 데이터가 있는지 모른다는 가정하에 일단 코딩을 하기 위해 state가 아닌 이곳에 잠시 값을들 놓고 해보자.
  const totalPosts = 51 // 지금은 더미데이터니까 게시글이 서버에 101개가 있다고 가정.
  const limit = 10;    // 무한 스크롤링 글 불러오는 개수

  export const mutations = {
    addMainPost(state, payload) {
      state.mainPosts.unshift(payload)  // push는 맨 뒤에 추가, unshift는 맨 앞에 추가.
    },
    removeMainPost(state, payload) {
      const index = state.mainPosts.findIndex(v => v.id === payload.id) // 이 코드 뭘까..
      console.log(index)
      state.mainPosts.splice(index, 1)
    },
    addComment(state, payload) {
      const index = state.mainPosts.findIndex(v => v.id === payload.postId);
      state.mainPosts[index].Comments.unshift(payload);
    },
    loadPosts(state) {
      const diff = totalPosts - state.mainPosts.length; // 아직 안불러온 게시글 수 
      const fakePosts = Array(diff > limit ? limit : diff).fill().map(v => ({ // 아직 백엔드가 없어서 fakePosts로, Array().fill()이 빈배열 만드는 거고 map을 적용하여 더미데이터 생성
        id: Math.random().toString(),
        User: {
          id: 1,
          nickname: 'EHwooKim'
        },
        content: `Hello Infinite scrolling~ ${Math.random()}`,
        Comments: [],
        Images: [],
      }))
      state.mainPosts = state.mainPosts.concat(fakePosts) // 위에서 만든 배열 합치는거
      state.hasMorePost = fakePosts.length === limit   // 불러온 게시글이 개수가 limit과 같으면 계속 불러오는 거고 아니면 false로 멈추기
    },
    concatImagePaths(state, payload) {
      state.imagePaths = state.imagePaths.concat(payload) // 누군가 이미지를 하나만 올렸다가 두개를 더 업로드 하는 경우가 있어서 기존 업로드된것과 추가 업로드한 것을concoat으로 배열을 합쳐준다
    },
    removeImagePath(state, payload) { //payload에 삭제하고픈 사진의 index가 들어간다.
      state.imagePaths.splice(payload, 1) 
    }
  }

  export const actions = {
    add({ commit }, payload) {  // 비동기 작업이라 여기 한번 더..?가 아니라 서버에 등록하고, 보여지는 vue에도 등록해야 하니까
      // 서버에 게시글 등록 요청 보내는 코드!!
      commit('addMainPost', payload)
    },
    remove({ commit }, payload) {
      commit('removeMainPost', payload)
    },
    addComment({ commit }, payload) {
      commit('addComment', payload);
    },
    loadPosts({ commit, state }, payload) {
      if (state.hasMorePost) {  // 쓸데없는 요청으로 해커가 되지않게 위한 코드...
        commit('loadPosts')
      }
    },
    uploadImages({ commit }, payload) {
      this.$axios.post('http://localhost:3085/post/images', payload, {
        withCredentials: true, // 로그인한 사용자만.
      }) 
        .then((res) => {
          commit('concatImagePaths', res.data) //res.data에 웃는얼굴.png 메가폰.png 파일에 대한 정보(정확히는 주소)
        })
        .catch(() => {
          
        })
    }
  }