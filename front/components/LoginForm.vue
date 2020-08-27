<template>
  <v-container v-if="!me">
    <v-card>
      <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
        <v-container>
          <!-- rules="" 형식으로 등록. -->
          <v-text-field v-model="email" :rules="emailRules" label="Email" type="email" required />
          <v-text-field v-model="password" :rules="passwordRules" label="password" type="password" required />
          <v-btn color="green" type="submit" :disabled="!valid">Login</v-btn>
          <v-btn nuxt to="/signup">회원가입</v-btn>
        </v-container>
      </v-form>
    </v-card>
  </v-container>
  <v-container v-else>
    <v-card>
      <!-- computed 에서 me 받아 옴. -->
      {{ me.nickname }}로그인되었습니다
      <v-btn color="blue" outlined @click="onLogOut">Logout</v-btn>
    </v-card>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        valid: false,
        email: '',
        password: '',
        // rules 정규식 표현 방법 v => 조건 || 출력.
        emailRules: [
          v => !!v || '이메일은 필수입니다.',
          v => /.@.+/.test(v) || '이메일이 유효하지 않습니다.'
        ],
        passwordRules: [
          v => !!v || '비밀번호는 필수입니다.'
        ],
      }
    },
    computed: {
      // state 접근 방식 => '.'
      me() {
        // vuex 접근 => this.$store.state.파일명.변수명
        return this.$store.state.users.me;
      }
    },
    methods: {
      onSubmitForm() {
        if(this.$refs.form.validate()) {
          // actions 사용.
          this.$store.dispatch('users/logIn', {
            email: this.email,
            nickname: 'angli',
            password: this.password,
          })
            // 동기식 방식 then ~ catch 구조
            .then(() => {
              this.$router.push({
                path: '/',
              });
            })
            .catch(() => {
              alert('회원가입 실패');
            });
        }
      },
      onLogOut() {
        // action 혹은 mutation 접근 방식 => '/'
        this.$store.dispatch('users/logOut')
      },
    }
  }
</script>

<style scoped>

</style>