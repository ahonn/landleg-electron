<template>
  <landleg-header></landleg-header>
  <landleg-form :login="login" :logout="logout" :logining="logining" :result="result"></landleg-form>
  <landleg-footer :show-footer="showFooter"></landleg-footer>
</template>

<script>
  import LandlegHeader from '../components/Header.vue';
  import LandlegForm from '../components/Form.vue';
  import LandlegFooter from '../components/Footer.vue';
  
  import Landleg from '../lib/landleg.js';
  
  export default {
    data() {
      return {
        showFooter: true,
        logining: false,
        result: "登录成功",
        timer: null,
        username: null,
        password: null,
        ip: null,
        mac: null
      }
    },
    ready() {
      this.username = localStorage.username;
      this.password = localStorage.password;
      this.ip = localStorage.ip;
      this.mac = localStorage.mac;
    },
    methods: {
      login() {
        this.showFooter = false;
        const options = {
          username: this.username,
          password: this.password,
          ip: this.ip,
          mac: this.mac
        };

        console.log(options);
        Landleg.active(options, (json) => {
          console.log(json);
          if (json.rescode === '0') {
            this.logining  = false;
            this.timer = setTimeout(this.login, 120000);
          } else {
            Landleg.login(options, (json) => {
              console.log(json);
              switch(json.rescode) {
                case '0':
                  this.logining = false;
                  this.result = '登录成功';
                  this.timer = setTimeout(this.login, 120000);
                  break;
                case '13012000':
                  this.logining = false;
                  this.result = '密码错误';
                  break;
                default: 
                  this.logining = true;
              }
            })
          }
        });
      },
      logout() {
        this.showFooter = true;
        const options = {
          username: this.username,
          password: this.password,
          ip: this.ip,
          mac: this.mac
        };

        Landleg.active(options, (json) => {
          console.log(json);
          clearTimeout(this.timer);
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
    events: {
      'form-change': function (username, password) {
        this.username = localStorage.username = username;
        this.password = localStorage.password = password;
      }
    },
    components: {
      "landleg-header": LandlegHeader,
      "landleg-form": LandlegForm,
      "landleg-footer": LandlegFooter
    }
  }
</script>
