<template>
  <header role="page-header">
    <nav role="top-navigation">
      <b-navbar toggleable="lg" variant="primary" type="dark">
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-navbar-brand :to="{ name: 'base' }" class="logo">
          <img src="@/assets/logos/grtjn/grtjn-avatar.png" height="38px" />
          Venom UI Template
        </b-navbar-brand>

        <b-collapse id="nav-collapse" is-nav>
          <!-- centered using margin-left/right auto -->
          <b-navbar-nav class="nav-pills ml-auto mr-auto">
            <!-- main header nav link, driven by meta-info from routes -->
            <b-nav-item
              v-for="(route, $index) in headerRoutes"
              :key="$index"
              :to="{ name: route.name, params: { prev: $route.name } }"
              exact
              exact-active-class="active bg-dark"
              link-classes="pl-4 pr-4"
            >
              {{ route.meta.label || route.name }}
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
  computed: {
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
