module.exports = {
  head: {
    title: 'Nodebird',
    meta: [
      { charset: 'utf-8' },
    ]
  },
  // 모든 vue 파일에서 Vue.use() 사용 하면 중복이 생기므로 여기서 한 번에 연결해줌.
  // 공통된 것들을 modules와 plugins 에서 해결.
  modules: [
    '@nuxtjs/axios'
  ],
  buildModules: [
    '@nuxtjs/vuetify',
  ],
  plugins: [],
  vuetify: {
  // 상시 버전 확인하기
  // npm updated, npm outdated

  // vulnerabilites 가 발견됬다면
  // npm audit fix 로 대부분 고쳐짐.
  }
}