<template>
  <div id="app">
    <login-form v-if="!loggedIn"></login-form>
    <welcome-page v-else-if="loggedIn" :accessToken="accessToken"></welcome-page>
  </div>
</template>

<script>
import LoginForm from "./components/LoginForm.vue";
import Welcome from "./components/Welcome.vue";
import { bus } from "./main";

export default {
  name: "app",
  components: {
    "login-form": LoginForm,
    "welcome-page": Welcome
  },
  data() {
    return {
      loggedIn: false,
      accessToken: ""
    };
  },
  methods: {
    toggleLogin(responseData) {
      this.loggedIn = responseData.success;
      this.accessToken = responseData.accessToken;
    }
  },
  created() {
    bus.$on("loginAttempted", data => {
      this.toggleLogin(data);
    });
  }
};
</script>

<style>
*,
:after,
:before {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  outline: none;
}
body {
  margin: 0;
}
#app {
  background-image: url(./assets/PageLogin-Bg.jpg);
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  height: 100vh;
  font-family: Roboto, sans-serif;
  font-size: 14px;
  line-height: 1;
}
</style>
