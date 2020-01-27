// Nuxt 설정을 담당하는 파일

module.exports = {
    head: {
        title: 'Nodebird'
    },
    modules: [              //이와같이 적어주면 외부 라이브러리 연결이 되고
        '@nuxtjs/axios'
    ],
    devModules: [
        '@nuxtjs/vuetify',  // 공식문서에 따라 vuetify는 이곳에 추가.
    ],
    plugins: [],
    vuetify : {             // 연결 후 연결한 라이브러리에 대한 설정을 또 해줄 수 있다.

    }
}