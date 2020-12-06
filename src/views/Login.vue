<template>
  <section role="login">
    <h1 class="text-center">Login</h1>
    <b-jumbotron class="w-50 mx-auto">
      <LoginForm :validateLogin="validateLogin" :loginDone="loginDone" />
    </b-jumbotron>
  </section>
</template>

<script>
import LoginForm from '@/components/LoginForm';

export default {
  name: 'Login',
  components: {
    LoginForm
  },
  computed: {
    previousRoute() {
      return this.$store.state.route.from;
    }
  },
  methods: {
    validateLogin(username, password) {
      return this.$store.dispatch('validateLogin', { username, password });
    },
    loginDone() {
      if (
        this.previousRoute.name &&
        this.previousRoute.name !== this.$route.name
      ) {
        this.$router
          .push({
            name: this.previousRoute.name,
            params: this.previousRoute.params
          })
          .catch(error => {
            console.info(error.message);
          });
      } else {
        // cancel
        this.$router
          .push({
            name: 'base',
            params: {}
          })
          .catch(error => {
            console.info(error.message);
          });
      }
    }
  }
};
</script>
