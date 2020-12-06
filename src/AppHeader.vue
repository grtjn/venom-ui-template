<template>
  <header role="page-header">
    <nav role="top-navigation">
      <!-- show toggle for md and smaller, full navbar for lg and larger -->
      <b-navbar toggleable="lg" variant="primary" type="dark">
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-navbar-brand :to="{ name: 'base' }" class="logo">
          <img src="@/assets/logos/grtjn/grtjn-avatar.png" height="38px" />
          Venom UI Template
        </b-navbar-brand>

        <b-collapse id="nav-collapse" is-nav>
          <!-- perfectly centered (custom class in App.vue) -->
          <b-navbar-nav class="nav-pills perfect-center-lg">
            <!-- main header nav links, driven by meta-info from routes -->
            <b-nav-item
              v-for="(route, $index) in headerRoutes"
              :key="$index"
              :to="{ name: route.name, params: { prev: $route.name } }"
              exact
              exact-active-class="active bg-dark"
              link-classes="ml-2 mr-2 pl-4 pr-4"
            >
              {{ route.meta.label || route.name }}
            </b-nav-item>
          </b-navbar-nav>

          <!-- show name/version on the right -->
          <b-navbar-nav class="nav-pills ml-auto">
            <UserMenu :isAuthenticated="isAuthenticated" />
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </nav>
  </header>
</template>

<script>
'use strict';

import UserMenu from '@/components/UserMenu';

export default {
  name: 'AppHeader',
  components: {
    UserMenu
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
    headerRoutes() {
      return this.$router.options.routes.filter(function(route) {
        return route.meta && route.meta.showInHeader;
      });
    }
  }
};
</script>

<style lang="scss">
header[role='page-header'] {
  .logo:hover {
    filter: brightness(90%);
  }
  .active.bg-dark:hover {
    filter: brightness(70%);
  }
}
</style>
