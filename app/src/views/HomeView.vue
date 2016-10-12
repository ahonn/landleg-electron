<template>
  <landleg-header></landleg-header>
  <landleg-form :login="login" :logout="logout" :logining="logining" :result="result"></landleg-form>
  <landleg-footer></landleg-footer>
</template>

<script>
  import LandlegHeader from '../components/Header.vue';
  import LandlegForm from '../components/Form.vue';
  import LandlegFooter from '../components/Footer.vue';
  
  import Landleg from '../lib/landleg.js';
  
  export default {
    data() {
      return {
        logining: true,
        result: "Login Result",
        username: "",
        password: "",
        ip: "10.3.62.104",
        mac: "00:e0:4c:36:02:30"
      }
    },
    methods: {
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
            setTimeout(this.login, 60000);
          } else {
            Landleg.login(options, (json) => {
              console.log(json);
              switch(json.rescode) {
                case '0':
                  this.logining = false;
                  this.result = '登录成功';
                  setTimeout(this.login, 60000);
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
    events: {
        'form-change': function (username, password) {
          this.username = username;
          this.password = password;
        }
    },
    components: {
      "landleg-header": LandlegHeader,
      "landleg-form": LandlegForm,
      "landleg-footer": LandlegFooter
    }
  }
</script>
