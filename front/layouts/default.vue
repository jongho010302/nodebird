<template>
  <v-app>
    <nav>
      <v-app-bar color="green">
        <v-toolbar-title>
          <nuxt-link to="/">Nodebird</nuxt-link>
        </v-toolbar-title>
        <v-spacer />
        <v-toolbar-items>
          <v-form @submit.prevent="onSearchHashtag">
            <div :style="{ display: 'flex', height: '100%', alignItems: 'center' }">
              <v-text-field v-model="hashtag" label="검색" hide-details prepend-icon="mdi-magnify" :style="{ display: 'flex', alignItems: 'center'}" />
            </div>
          </v-form>
          <v-btn text nuxt to="/profile">
            <div>프로필</div>
          </v-btn>
          <v-btn text nuxt to="/signup">
            <div>회원가입</div>
          </v-btn>    
        </v-toolbar-items>
      </v-app-bar>
    </nav>
    <v-row no-gutters>
      <!-- cols 는 12고정이고 xs와 같음. -->
      <v-col cols="12" md="4">
        <login-form />
      </v-col>
      <v-col cols="12" md="8">     
        <nuxt />
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
  import 'vuetify/dist/vuetify.min.css';
  import LoginForm from '~/components/LoginForm'

  export default {
    components: {
      LoginForm,
    },
    data() {
      return {
        hashtag: '',
      }
    },
    methods: {
      onSearchHashtag() {
        this.$router.push({
          path: `/hashtag/${this.hashtag}`,
        })
        this.hashtag = '';
      }
    }
  }
</script>