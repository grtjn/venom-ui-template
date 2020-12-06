<template>
  <div id="app">
    <AppHeader />

    <div class="app-content">
      <b-container fluid="md">
        <transition name="fade" mode="out-in">
          <router-view />
        </transition>
      </b-container>
    </div>

    <AppFooter />
  </div>
</template>

<script>
'use strict';

import AppHeader from './AppHeader.vue';
import AppFooter from './AppFooter.vue';

export default {
  name: 'app',
  components: {
    AppHeader,
    AppFooter
  }
};
</script>

<style lang="scss">
#app {
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.2s ease;
  }
  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }
  .app-content {
    margin-top: 3em;
    margin-bottom: 3em;
  }
}
@media (min-width: 992px) {
  .perfect-center-lg {
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
  }
}
</style>
