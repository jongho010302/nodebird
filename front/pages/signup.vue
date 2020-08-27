<template>
  <div>
    <v-container>
      <v-card>
        <v-subheader>회원가입</v-subheader>
        <v-container>
          <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
            <v-text-field v-model="email" label="Email" type="email" :rules="emailRules" required />
            <v-text-field v-model="password" label="Password" type="password" :rules="passwordRules" required />
            <v-text-field v-model="passwordCheck" label="Confirm Password" type="password" :rules="passwordCheckRules" required />
            <v-text-field v-model="nickname" label="Nickname" type="nickname" :rules="nicknameRules" required />
            <v-checkbox v-model="terms" label="내 말을 잘 들을 것을 약속합니다." :rules="[v => !!v || '약관에 동의해야 합니다.']" required />
            <v-btn color="green" type="submit">Register</v-btn>
          </v-form>
        </v-container>
      </v-card>
    </v-container>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        valid: false,
        email: '',
        password: '',
        passwordCheck: '',
        nickname: '',
        terms: false,
        emailRules: [
          v => !!v || '이메일은 필수입니다.',
          v => /.+@+/.test(v) || '이메일이 유효하지 않습니다.'
        ],
        nicknameRules: [
          v => !!v || '닉네임 필수입니다.',
        ],
        passwordRules: [
          v => !!v || '비밀번호 확인은 필수입니다.',
        ],
        passwordCheckRules: [
          v => !!v || '비밀번호 확인은 필수입니다.',
          v => v === this.password || '비밀번호가 일치하지 않습니다.',
        ],
      }
    },
    methods: {
      onSubmitForm() {
        if(this.$refs.form.validate()) {
          this.$store.dispatch('users/signUp', {
            nickname: this.nickname,
            email: this.email,
            password: this.password,
          })
            .then(() => {
              // 홈 화면으로 이동.
              this.$router.push({
                path: '/',
              });
            })
            .catch(() => {
              alert('회원가입 실패');
            });
        }
      },
    },
    head: {
      title: 'Signup',
    },
    middleware: 'anonymous',
  }
</script>