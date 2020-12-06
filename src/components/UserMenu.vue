<template>
  <span>
    <b-nav-item
      v-if="!isAuthenticated"
      :to="{ name: loginRoute }"
      exact
      exact-active-class="active bg-dark"
      link-classes="ml-2 mr-2 pl-4 pr-4"
    >
      Login
    </b-nav-item>
    <b-nav-dropdown
      v-else
      right
      lazy
      no-caret
      @shown="shown = true"
      @hidden="shown = false"
    >
      <template #button-content>
        <div class="btn btn-light text-dark">
          <b-icon icon="person-fill" />
          User Menu
          <b-icon v-if="shown" icon="caret-up-fill" font-scale="0.9" />
          <b-icon v-else icon="caret-down-fill" font-scale="0.9" />
        </div>
      </template>

      <!-- user menu nav links, driven by meta-info from routes -->
      <b-dropdown-item
        v-for="(route, $index) in userRoutes"
        :key="$index"
        :to="{ name: route.name, params: { prev: $route.name } }"
        exact
        exact-active-class="active bg-dark"
        link-classes="ml-2 mr-2 pl-4 pr-4"
      >
        {{ route.meta.label || route.name }}
      </b-dropdown-item>
      <b-dropdown-divider />
      <b-dropdown-text>
        <small>
          <em>{{ shortName }}</em>
        </small>
      </b-dropdown-text>
    </b-nav-dropdown>
  </span>
</template>

<script>
'use strict';

export default {
  name: 'UserMenu',
  props: {
    isAuthenticated: {
      type: Boolean,
      required: true
    },
    loginRoute: {
      type: String,
      default: 'base.login'
    }
  },
  data() {
    let version = process.env.VUE_APP_VERSION;
    return {
      shown: false,
      name: process.env.VUE_APP_NAME,
      version: version[0] === 'v' ? version : 'v' + version
    };
  },
  computed: {
    shortName() {
      return (
        this.name.replace(/^[^/]+\//, '') +
        // .replace(/^([^-]+).*$/, '$1')
        // .toUpperCase() +
        ' ' +
        this.version
      );
    },
    userRoutes() {
      return this.$router.options.routes.filter(function(route) {
        return route.meta && route.meta.showInUserMenu;
      });
    }
  }
};
</script>
