<template>
  <footer role="page-footer">
    <!-- Using help from flex and justify to:
         stack vertically for md and smaller, justify between for lg and larger -->
    <b-navbar
      variant="secondary"
      type="dark"
      class="flex-column flex-lg-row justify-content-lg-between"
    >
      <!-- left -->
      <b-nav class="navbar-nav" role="copyright">
        <b-nav-text> &copy; {{ currentYear }} Grtjn.</b-nav-text>
      </b-nav>

      <!-- perfectly centered (custom class in App.vue) -->
      <b-nav
        class="navbar-nav perfect-center-lg"
        v-if="showSocial"
        role="social-navigation"
      >
        <b-nav-item
          href="https://twitter.com/grtjn"
          target="_blank"
          rel="noopener"
          :link-attrs="{
            'aria-label': 'Twitter'
          }"
        >
          <img
            src="@/assets/social/twitter/Twitter_Social_Icon_Circle_White.svg"
            height="32px"
            alt="Twitter"
            title="Twitter"
          />
        </b-nav-item>
        <b-nav-item
          href="https://github.com/grtjn"
          target="_blank"
          rel="noopener"
          :link-attrs="{
            'aria-label': 'Github'
          }"
        >
          <img
            src="@/assets/social/github/GitHub-Mark-Light-120px-plus.png"
            height="32px"
            alt="Github"
            title="Github"
          />
        </b-nav-item>
      </b-nav>

      <!-- right -->
      <b-nav
        pills
        class="navbar-nav justify-content-end"
        v-if="showPoweredBy"
        role="home-navigation"
      >
        <b-nav-text><small>Powered by</small></b-nav-text>

        <b-nav-item
          href="https://github.com/grtjn/venom-ui-template"
          target="_blank"
          rel="noopener"
          :link-attrs="{
            'aria-label': 'Venom UI Template'
          }"
        >
          <img
            src="@/assets/logos/grtjn/grtjn-avatar.png"
            height="28px"
            alt="Venom UI Template"
            title="Venom UI Template"
          />
        </b-nav-item>

        <b-nav-item
          href="https://vuejs.org/"
          target="_blank"
          rel="noopener"
          :link-attrs="{
            'aria-label': 'Vue.js'
          }"
        >
          <img
            src="@/assets/logos/vuejs/logo.svg"
            height="28px"
            alt="Vue.js"
            title="Vue.js"
          />
        </b-nav-item>

        <b-nav-item
          href="https://getbootstrap.com/"
          target="_blank"
          rel="noopener"
          :link-attrs="{
            'aria-label': 'Bootstrap'
          }"
        >
          <img
            src="@/assets/logos/Bootstrap/bootstrap-solid.svg"
            height="28px"
            alt="Bootstrap"
            title="Bootstrap"
          />
        </b-nav-item>

        <b-nav-item
          href="https://bootstrap-vue.org/"
          target="_blank"
          rel="noopener"
          :link-attrs="{
            'aria-label': 'BootstrapVue'
          }"
        >
          <img
            src="@/assets/logos/BootstrapVue/BootstrapVue.png"
            height="28px"
            alt="BootstrapVue"
            title="BootstrapVue"
          />
        </b-nav-item>
      </b-nav>
    </b-navbar>
  </footer>
</template>

<script>
'use strict';

export default {
  name: 'AppFooter',
  props: {
    showPoweredBy: {
      type: Boolean,
      required: false,
      default: true
    },
    showSocial: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data() {
    return {
      currentYear: new Date().getUTCFullYear()
    };
  }
};
</script>

<style lang="scss">
section[role='page-footer'] {
  // images don't get automatic hover highlight, using brightness for this
  .nav-link img:hover {
    filter: brightness(70%);
  }
}
</style>
