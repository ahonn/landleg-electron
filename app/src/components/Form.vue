<template>
  <div class="landleg-form">
    <form @submit.prevent>
      <div class="username input">
        <label for="user">账号</label>
        <input type="text" name="username" id="username" :disabled="isLogin"/>
      </div>
      <div class="password input">
        <label for="user">密码</label>
        <input type="password" name="password" id="password" :disabled="isLogin"/>
      </div>
      <button class="{{ button.class }} button" @click="toggle" v-text="button.text"></button>
    </form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isLogin: false,
        button: {
          text: "登录",
          class: "login-button"
        }
      }
    },
    methods: {
      toggle: function () {
        this.isLogin = !this.isLogin;
        if (this.isLogin) {
          this.button = {
            text: "取消",
            class: "logout-button"
          };
        } else {
          this.button = {
            text: " 登录",
            class: "login-button"
          };
        }
      }
    }
  }
</script>

<style>
  .landleg-form {
    padding: 5px;
  }

  form .input {
    margin-bottom: 10px;
  }

  form input {
    width: 180px;
    height: 26px;
    font-size: 14px;
    border: 0;
    outline: 0;
    border-bottom: 1px solid #DBDBDB;
  }

  form input:focus {
    border-bottom: 1px solid #4F9AD7;
  }

  form label {
    position: relative;
    top: 2px;
    margin-right: 10px;
    font-size: 14px;
    font-weight: 200;
  }

  form .password {
    margin-bottom: 30px;
  }

  .button {
    width: 230px;
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