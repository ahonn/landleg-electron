<template>
  <div class="landleg-form">
    <form @submit.prevent>
      <div v-if="isLogin" class="login-wrapper">
        <div v-if="logining" class="logining">
          <pacman-loader :loading="true" :color="'#4F9AD7'"></pacman-loader>
        </div>
        <div v-else>
          <span class="login-text" v-text="result"></span>
        </div>
      </div>
      <div v-else class="form-wrapper">
        <div class="form-grounp">
          <label for="user" class="form-label">账号</label>
          <input type="text" class="form-input" id="username" v-model="username" @change="onInput" :disabled="isLogin"/>
        </div>
        <div class="form-grounpt">
          <label for="user" class="form-label">密码</label>
          <input type="password" class="form-input" id="password" v-model="password" @change="onInput" :disabled="isLogin"/>
        </div>
      </div>
      <button class="{{ button.class }} button" @click="toggle" v-text="button.text"></button>
    </form>
  </div>
</template>

<script>
  import PacmanLoader from 'vue-spinner/src/PacmanLoader.vue'

  export default {
    props: ['login', 'logout', "logining", "result"],
    data() {
      return {
        username: null,
        password: null,
        isLogin: false,
        button: {
          text: "登录",
          class: "login-button"
        }
      }
    },
    ready() {
      this.username = localStorage.username
      this.password = localStorage.password
    },
    methods: {
      onInput: function () {
        this.$dispatch('form-change', this.username, this.password)
      },
      toggle: function () {
        this.isLogin = !this.isLogin
        if (this.isLogin) {
          this.login()
          this.button = {
            text: "取消",
            class: "logout-button"
          }
        } else {
          this.logout()
          this.button = {
            text: " 登录",
            class: "login-button"
          }
        }
      }
    },
    components: {
      PacmanLoader
    }
  }
</script>