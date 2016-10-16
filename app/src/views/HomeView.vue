<template>
  <landleg-header></landleg-header>
  <landleg-form :login="login" :logout="logout" :logining="logining" :result="result"></landleg-form>
  <span class="resinfo" v-if="resinfo !== null" v-text="resinfo.replace('（Huawei）', '')"></span>
  <landleg-footer :show-footer="showFooter"></landleg-footer>
</template>

<script>
  import LandlegHeader from '../components/Header.vue'
  import LandlegForm from '../components/Form.vue'
  import LandlegFooter from '../components/Footer.vue'
  
  import Landleg from '../lib/landleg.js'
  import { message, config } from '../common.js'
  
  export default {
    data() {
      return {
        showFooter: true,
        logining: false,
        resinfo: null,
        result: null,
        timer: null,
        data: {
          username: null,
          password: null,
          ip: null,
          mac: null,
          school: null,
          nasip: null,
          icode: null
        }
      }
    },
    ready() {
      this.data.username = localStorage.username
      this.data.password = localStorage.password

      // Get school config
      if (localStorage.school === undefined) {
        let school = config.school[0]
        this.data.school = localStorage.school = school.name
        this.data.nasip = localStorage.nasip = school.nasip
        this.data.icode = localStorage.icode = school.icode
      } else {
        this.data.school = localStorage.school
        this.data.nasip = localStorage.nasip
        this.data.icode = localStorage.icode
      }

      this.data.ip = Landleg.getClientIP(this.data)
      this.data.mac = Landleg.getClientMAC(this.data)

      if (localStorage.model === "manual") {
        this.data.ip = localStorage.ip
        this.data.mac = localStorage.mac
      }
    },
    methods: {
      login() {
        this.showFooter = false

        console.log(this.data)
        Landleg.active(this.data, (json) => {
          console.log(json)
          if (json.rescode === '0') {
            this.keepActive()
          } else {
            Landleg.login(this.data, (json) => {
              console.log(json)
              switch(json.rescode) {
                case '0':
                  this.loginSuccess()
                  break
                case '13012000':
                  this.passwordError()
                  break
                default: 
                  this.loginError(json)
              }
            })
          }
        })
      },
      logout() {
        this.showFooter = true

        Landleg.active(this.data, (json) => {
          this.resinfo = null
          console.log(json)
          clearTimeout(this.timer)
          if (json.rescode === '0') {
            Landleg.logout(this.data, (json) => {
              console.log(json)
              if (json.rescode === '0') {
                this.logining = !this.logining
              }
            })
          }
        })
      },
      keepActive() {
        this.logining  = false
        this.result = message.keepActive
        this.timer = setTimeout(this.login, 120000)
      },
      loginSuccess() {
        this.logining = false
        this.resinfo = null
        this.result = message.loginSuccess
        this.timer = setTimeout(this.login, 120000)
      },
      passwordError() {
        this.logining = false
        this.resinfo = null
        this.result = message.passwordError
      },
      loginError(json) {
        this.logining = true
        this.resinfo = json.resinfo
      }
    },
    events: {
      'form-change': function (username, password) {
        this.data.username = localStorage.username = username
        this.data.password = localStorage.password = password
      }
    },
    components: {
      "landleg-header": LandlegHeader,
      "landleg-form": LandlegForm,
      "landleg-footer": LandlegFooter
    }
  }
</script>
