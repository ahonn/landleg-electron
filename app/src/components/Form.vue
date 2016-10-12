<template>
  <div class="landleg-form">
    <form @submit.prevent>
      <div v-if="isLogin" class="login-wrapper">
        <div v-if="logining" class="logining">
          <pulse-loader :loading="true" :color="'#4F9AD7'"></pulse-loader>
        </div>
        <div v-else>
          <span class="login-text" v-text="result"></span>
        </div>
      </div>
      <div v-else class="form-wrapper">
        <div class="form-grounp">
          <label for="user" class="form-label">账号</label>
          <input type="text" class="form-input" id="username" v-model="username" :disabled="isLogin"/>
        </div>
        <div class="form-grounpt">
          <label for="user" class="form-label">密码</label>
          <input type="password" class="form-input" id="password" v-model="password" :disabled="isLogin"/>
        </div>
      </div>
      <button class="{{ button.class }} button" @click="toggle" v-text="button.text"></button>
    </form>
  </div>
</template>

<script>
  import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

  import Landleg from '../lib/landleg.js';

  export default {
    data() {
      return {
        isLogin: false,
        logining: true,
        result: "",
        button: {
          text: "登录",
          class: "login-button"
        },
        username: "",
        password: "",
        ip: "10.3.206.0",
        mac: "ac:bc:32:c1:3e:b3"
      }
    },
    methods: {
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
      },
      login() {
        const options = {
          username: this.username,
          password: this.password,
          ip: this.ip,
          mac: this.mac
        };

        Landleg.active(options, (json) => {
          console.log(json);
          if (json.rescode === '0') {
            this.logining = false;
          } else {
            Landleg.login(options, (json) => {
              console.log(json);
              switch(json.rescode) {
                case '0':
                  this.logining = false;
                  this.result = '登录成功';
                  break;
                case '13012000':
                  this.logining = false;
                  this.result = '密码错误';
                  break;
              }
            })
          }
        });
      },
      logout() {
        const options = {
          username: this.username,
          password: this.password,
          ip: this.ip,
          mac: this.mac
        };

        Landleg.active(options, (json) => {
          console.log(json);
          if (json.rescode === '0') {
            Landleg.logout(options, (json) => {
              console.log(json);
              if (json.rescode === '0') {
                this.logining = !this.logining
              }
            })
          }
        })
      }
    },
    components: {
      PulseLoader
    }
  }
</script>

<style>
  .landleg-form {
    padding: 5px;
  }

  .login-wrapper {
    margin-bottom: 30px;
  }

  .login-wrapper .logining {
    height: 64px;
    padding: 20px 0;
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
    width: 180px;
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