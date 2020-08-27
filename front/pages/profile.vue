<template>
  <div>
    <v-container>
      <v-card style="margin-bottom: 20px;">
        <v-container>
          <v-subheader>내 프로필</v-subheader>
        </v-container>
        <v-container>
          <v-form v-model="valid" @submit.prevent="onChangeNickname">
            <v-text-field v-model="nickname" label="Nickname" required :rules="nicknameRules" />
            <v-btn color="blue" type="submit">수정</v-btn>
          </v-form>
        </v-container>
      </v-card>
      <v-card style="margin-bottom: 20px;">
        <v-container>
          <v-subheader>팔로잉</v-subheader>
          <follow-list :users="followingList" :remove="removeFollowing" />
          <v-btn @click="loadMoreFollowings" dark color="blue" v-if="hasMoreFollowing" style="width: 100%">더보기</v-btn>
        </v-container>
      </v-card>
      <v-card style="margin-bottom: 20px;">
        <v-container>
          <v-subheader>팔로워</v-subheader>
          <follow-list :users="followerList" :remove="removeFollower" />
          <v-btn @click="loadMoreFollowers" dark color="blue" v-if="hasMoreFollower" style="width: 100%">더보기</v-btn>
        </v-container>
      </v-card>      
    </v-container>
  </div>  
</template>

<script>
  import FollowList from '~/components/FollowList'

  export default {
    components: {
      FollowList,
    },
    data() {
      return {
        nickname: '',
        valid: false,
        nicknameRules: [
          v => !!v || '닉네임을 입력하세요.'
        ],
      }
    },
    fetch({ store }) {
      store.dispatch('users/loadFollowings');
      store.dispatch('users/loadFollowers');
    },    
    computed: {
      me() {
        return this.$store.state.users.me;
      },
      followingList() {
        return this.$store.state.users.followingList;
      },
      followerList() {
        return this.$store.state.users.followerList;
      },
      hasMoreFollowing() {
        return this.$store.state.users.hasMoreFollowing;
      },
      hasMoreFollower() {
        return this.$store.state.users.hasMoreFollower;
      },
    },
    methods: {
      onChangeNickname() {
        this.$store.dispatch('users/changeNickname', {
          nickname: this.nickname,
        });
      },
      removeFollowing(id) {
        this.$store.dispatch('users/removeFollowing', {
          id: id
        })
      },
      removeFollower(id) {
        this.$store.dispatch('users/removeFollower', {
          id: id
        })
      },
      loadMoreFollowings() {
        this.$store.dispatch('users/loadFollowings');
      },      
      loadMoreFollowers() {
        this.$store.dispatch('users/loadFollowers');
      },
    },
    head: {
      title: 'Profile',
    },
    middleware: 'authenticated',
  }
</script>