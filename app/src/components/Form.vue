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
  import PacmanLoader from 'vue-spinner/src/PacmanLoader.vue';

  export default {
    props: ['login', 'logout', "logining", "result"],
    data() {
      return {
        username: "",
        password: "",
        isLogin: false,
        button: {
          text: "登录",
          class: "login-button"
        }
      }
    },
    methods: {
      onInput: function () {
        this.$dispatch('form-change', this.username, this.password);
      },
      toggle: function () {
        this.isLogin = !this.isLogin;
        if (this.isLogin) {
          this.login();
          this.button = {
            text: "取消",
            class: "logout-button"
          };
        } else {
          this.logout();
          this.button = {
            text: " 登录",
            class: "login-button"
          };
        }
      }
    },
    components: {
      PacmanLoader
    }
  }
</script>

<style>
  .landleg-form {
    padding: 20px 5px;
  }

  .login-wrapper {
    margin-bottom: 30px;
  }

  .login-wrapper .logining {
    height: 64px;
    padding: 20px 0;
    margin-left: 90px;
    box-sizing: border-box;
  }

  .login-wrapper .login-text {
    font-size: 38px;
    line-height: 64px;
    font-weight: 200;
    color: #878787;
  }

  .form-wrapper {
    margin-bottom: 30px;
  }

  .form-wrapper .form-grounp {
    margin-bottom: 10px;
  }

  .form-wrapper .form-input {
    width: 200px;
    height: 26px;
    font-size: 14px;
    border: 0;
    outline: 0;
    border-bottom: 1px solid #DBDBDB;
  }

  .form-wrapper .form-input:focus {
    border-bottom: 1px solid #4F9AD7;
  }

  .form-wrapper .form-label {
    position: relative;
    top: 2px;
    margin-right: 10px;
    font-size: 14px;
    font-weight: 200;
  }

  .button {
    width: 240px;
    height: 32px;
    font-size: 14px;
    font-weight: 200;
  }

  .login-button {
    color: #fff;
    background-color: #4F9AD7;
    border: 1px solid #4F9AD7;
    outline: 0;
  }

  .logout-button {
    color: #4F9AD7;
    background-color: #fff;
    border: 1px solid #4F9AD7;
    outline: 0;
  }

</style>