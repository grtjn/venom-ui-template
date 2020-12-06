<template>
  <b-form @submit.prevent="doLogout()">
    <b-alert
      :show="!!msg"
      :variant="success === null ? 'warning' : success ? 'success' : 'danger'"
      >{{ msg }}</b-alert
    >
    <b-button-toolbar v-if="success">
      <b-button v-if="!!logoutDone" @click.prevent="close()">
        Close
      </b-button>
    </b-button-toolbar>
    <b-button-toolbar v-else>
      <b-button v-if="!!logoutDone" @click.prevent="close()" class="mr-2">
        Cancel
      </b-button>
      <b-button type="submit" variant="primary">
        Logout
        <b-icon v-if="pending" icon="arrow-clockwise" animation="spin"></b-icon>
      </b-button>
    </b-button-toolbar>
  </b-form>
</template>

<script>
'use strict';

export default {
  name: 'LogoutForm',
  props: {
    logout: {
      type: Function,
      required: true
    },
    logoutDone: {
      type: Function
    }
  },
  data() {
    return {
      pending: false,
      success: null,
      msg: 'Are you sure?'
    };
  },
  methods: {
    doLogout() {
      this.pending = true;
      this.success = null;
      this.msg = null;
      this.logout().then(response => {
        if (response.isError) {
          this.success = false;
          this.msg = response.error ? response.error.message : 'Server error';
        } else {
          this.success = true;
          this.msg = 'You successfully logged out';
          if (this.logoutDone) {
            setTimeout(() => {
              this.logoutDone(this.success);
            }, 1000);
          }
        }
        this.pending = false;
      });
    },
    close() {
      if (this.logoutDone) {
        this.logoutDone(this.success);
      }
    }
  }
};
</script>
