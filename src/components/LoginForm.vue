<template>
  <b-form @submit.prevent="doLogin()">
    <b-alert :show="!!msg" :variant="success ? 'success' : 'danger'">{{
      msg
    }}</b-alert>
    <b-form-group>
      <b-input
        type="text"
        placeholder="Username"
        class="form-control"
        v-model="username"
        autocomplete="@sample-app-name login username"
      ></b-input>
    </b-form-group>
    <b-form-group>
      <b-input
        type="password"
        placeholder="Password"
        class="form-control"
        v-model="password"
        autocomplete="@sample-app-name login current-pasword"
      ></b-input>
    </b-form-group>
    <b-button-toolbar v-if="success">
      <b-button v-if="!!loginDone" @click.prevent="close()">
        Close
      </b-button>
    </b-button-toolbar>
    <b-button-toolbar v-else>
      <b-button v-if="!!loginDone" @click.prevent="close()" class="mr-2">
        Cancel
      </b-button>
      <b-button type="submit" variant="primary">
        Login
        <b-icon v-if="pending" icon="arrow-clockwise" animation="spin"></b-icon>
      </b-button>
    </b-button-toolbar>
  </b-form>
</template>

<script>
'use strict';

export default {
  name: 'LoginForm',
  props: {
    validateLogin: {
      type: Function,
      required: true
    },
    loginDone: {
      type: Function
    }
  },
  data() {
    return {
      pending: false,
      username: null,
      password: null,
      success: null,
      msg: null
    };
  },
  methods: {
    doLogin() {
      this.pending = true;
      this.success = null;
      this.msg = null;
      this.validateLogin(this.username, this.password).then(response => {
        if (response.isError) {
          this.success = false;
          if (response.error && response.error.status === 401) {
            this.msg = 'Username and/or Password Incorrect';
          } else {
            this.msg = response.error ? response.error.message : 'Unauthorized';
          }
        } else {
          this.success = true;
          this.msg = 'You successfully logged in';
          if (this.loginDone) {
            setTimeout(() => {
              this.loginDone(this.success);
            }, 1000);
          }
        }
        this.pending = false;
      });
    },
    close() {
      if (this.loginDone) {
        this.loginDone(this.success);
      }
    }
  }
};
</script>
