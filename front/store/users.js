export const state = () => ({
  me: null,
  followingList: [],
  followerList: [],
  hasMoreFollowing: true,
  hasMoreFollower: true,
  test: 'hi'
});

const totalFollowings = 8;
const totalFollowers = 6;
// 실무에서는 following, follower 가 변할 수 있어  limit 보다는 last id를 사용함.
const limit = 3;

// Mutations 에서는 비동기 처리를 못 한다.
// Mutations: 동기 작업
export const mutations = {
  setMe(state, payload) {
    state.me = payload;
  },
  changeNickname(state, payload) {
    state.me.nickname = payload.nickname;
  },
  addFollowing(state, payload) {
    state.followingList.push(payload);
  },
  addFollower(state, payload) {
    state.followerList.push(payload);
  },
  removeFollowing(state, payload) {
    const index = state.followingList.findIndex(v => v.id === payload.id);
    state.followingList.splice(index, 1);
  },
  removeFollower(state, payload) {
    const index = state.followerList.findIndex(v => v.id === payload.id);
    state.followerList.splice(index, 1);
  },
  loadFollowings(state) {
    const diff = totalFollowings - state.followingList.length;
    console.log();
    const fakeUsers = Array(diff > limit ? limit : diff).fill().map(v => ({
      id: Math.random().toString(),
      nickname: Math.floor(Math.random() * 1000),
    }));
    state.followingList = state.followingList.concat(fakeUsers);
    state.hasMoreFollowing = fakeUsers.length === limit;
  },
  loadFollowers(state) {
    const diff = totalFollowers  - state.followerList.length;
    const fakeUsers = Array(diff > limit ? limit : diff).fill().map(v => ({
      id: Math.random().toString(),
      nickname: Math.floor(Math.random() * 1000),
    }));
    state.followerList = state.followerList.concat(fakeUsers);
    state.hasMoreFollower = fakeUsers.length === limit;
  }
}

// vuex 에는 비동기 작업을 위한 action이 따로 있다. ex) ajax
// actions: 비동기 작업
// context ({commit, dispatch, state, rootState, getters, rootGetters})
/* ====================================================================*/
/* actions는 context에 많은 것을 갖고 있는데 actions는 복합적인 것이 가능하다
   commit 은 mutations 을 실행할 수 있고 dispatch는 actions 를 실행할 수 있다.
   또다른 actions를 사용할 수 도 있다.
   mutations 보다는 좀 더 복잡한 것이 가능하다. 하지만 보통 비동기에서 사용한다. */
export const actions = {
   // actions 와 mutations 를 분리하기 위해 state 접근은 mutationd을 호출하여 접근.
  signUp({ commit }, payload) {
    this.$axios.post('http://localhost:3085/user', {
      nickname: payload.email,
      email: payload.email,
      password: payload.password,
    });
    commit('setMe', payload);
  },
  logIn({ commit }, payload) {
    commit('setMe', payload);
  },
  logOut({ commit }, payload) {
    commit('setMe', null)
  },
  changeNickname({ commit }, payload) {
    commit('changeNickname', payload)
  },
  addFollowing({ commit }, payload) {
    commit('addFollowing', payload);
  },
  addFollower({ commit }, payload) {
    commit('addFollower', payload);
  },
  removeFollowing({ commit }, payload) {
    commit('removeFollowing', payload);
  },
  removeFollower({ commit }, payload) {
    commit('removeFollower', payload);
  },
  loadFollowings({ commit, state }, payload) {
    if(state.hasMoreFollowing) {
      commit('loadFollowings');
    }
  },
  loadFollowers({ commit, state }, payload) {
    if(state.hasMoreFollower) {
      commit('loadFollowers')
    }
  },
}

// 더미 데이터를 만들어서 테스트 해보는 경우  
/* 회사에서 보통 프론트엔드 개발자와 백엔드 개발자가 따로 있을 때 서로가 일을 못 끝내 일정이 늦어지는 경우가 있으므로
   더미, 샘플 데이터를 add, remove 등 테스트를 해본다. 좋은 프론트엔드 개발자가 되기 위해 백엔드 개발자와의 소통....*/