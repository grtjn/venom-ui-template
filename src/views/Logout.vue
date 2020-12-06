<template>
  <section role="logout">
    <h1 class="text-center">Logout</h1>
    <b-jumbotron class="w-50 mx-auto">
      <LogoutForm :logout="logout" :logoutDone="logoutDone" />
    </b-jumbotron>
  </section>
</template>

<script>
import LogoutForm from '@/components/LogoutForm';

export default {
  name: 'Logout',
  components: {
    LogoutForm
  },
  computed: {
    previousRoute() {
      return this.$store.state.route.from;
    }
  },
  methods: {
    logout() {
      return this.$store.dispatch('logout');
    },
    logoutDone() {
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
