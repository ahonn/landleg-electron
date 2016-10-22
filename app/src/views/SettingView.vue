<template>
  <div class="landleg-setting">
    <form class="setting-form">
      <div class="setting-item">
        <h2 class="setting-title">设置 IP 地址与 MAC 地址</h2>
        <div class="setting-redio">
          <input type="radio" id="auto" value="auto" v-model="model" :checkout="model === 'auto'" @change="autoIpAndMac" />
          <label for="auto">自动</label>
          <input type="radio" id="manual" value="manual" v-model="model" :checkout="model === 'manual'" @change="getManualIpAndMac"/>
          <label for="manual">手动</label>
        </div>
        <div class="setting-body">
          <div class="auto" v-if="model === 'auto'">
            <div>
              <span class="ip-name">IP:</span>
              <span class="ip-value" v-text="ip"></span>
            </div>
            <div>
              <span class="mac-name">MAC:</span>
              <span class="mac-value" v-text="mac"></span>
            </div>
          </div>
          <div class="manual" v-if="model === 'manual'">
            <div>
              <label for="ip" class="ip-name">IP:</label>
              <input type="text" name="ip" id="ip" v-model="ip" @change="manualIpAndMac" />
            </div>
            <div>
              <label for="mac" class="mac-name">MAC:</label>
              <input type="text" name="mac" id="mac" v-model="mac" @change="manualIpAndMac" />
            </div>
          </div>
        </div>
      </div>
      <div class="setting-item">
        <h2 class="setting-title">设置学校</h2>
        <select class="setting-select" v-model="schoolNumber" @change="setSchool">
          <option v-for="(index, item) in schoolGroup" v-text="item.name" v-bind:value="index"></option>
          <option value="-1">其他</option>
        </select>
        <div class="setting-body" v-if="schoolNumber === '-1'">
          <div>
            <label class="nasip-name">接入服务器:</label>
            <input type="text" name="nasip" id="nasip" v-model="nasip" placeholder="xxx.xxx.xxx.xxx" @change="setNasipAndIcode" />
          </div>
          <div>
            <label class="icode-name">网络识别码:</label>
            <input type="text" name="icode" id="icode" v-model="icode" placeholder="xxx" @change="setNasipAndIcode" />
          </div>
          <div class="tips">
            <p>* 接入服务器即为宽带接入的 IP</p>
            <p>* 网络识别码即为内网 IP 首位</p>
          </div>
        </div>
      </div>
    </form>
    <div class="button-group">
      <button class="back-button" v-link="{ name: 'home' }">返回</button>
    </div>
  </div>
</template>

<script>
  import Landleg from '../lib/landleg.js'
  import { config } from '../common.js'

  export default {
    data() {
      return {
        model: "auto",
        ip: null,
        mac: null,
        schoolGroup: null,
        schoolNumber: 0,
        school: null,
        nasip: null,
        icode: null
      }
    },
    ready() {
      this.model = localStorage.model || "auto"
      console.log(this.model)

      this.schoolNumber = localStorage.schoolNumber || 0

      this.schoolGroup = config.school
      this.school = localStorage.school
      this.nasip = localStorage.nasip
      this.icode = localStorage.icode

      if (this.model === "auto") {
        this.ip = localStorage.ip = Landleg.getClientIP(this)
        this.mac = localStorage.mac = Landleg.getClientMAC(this)
      } else {
        this.ip = localStorage._ip
        this.mac = localStorage._mac
      }
    },
    methods: {
      autoIpAndMac: function () {
        localStorage.model = this.model
        this.ip = localStorage.ip = Landleg.getClientIP(this)
        this.mac = localStorage.mac = Landleg.getClientMAC(this)

        console.log(localStorage)
      },
      getManualIpAndMac() {
        localStorage.model = this.model
        this.ip = localStorage.ip = localStorage._ip
        this.mac = localStorage.mac = localStorage._mac

        console.log(localStorage)
      },
      manualIpAndMac: function () {
        localStorage.model = this.model
        localStorage.ip = localStorage._ip = this.ip
        localStorage.mac = localStorage._mac = this.mac

        console.log(localStorage)
      },
      setSchool: function () {
        localStorage.schoolNumber = this.schoolNumber
        if (localStorage.schoolNumber !== "-1") {
          let selectSchool = this.schoolGroup[this.schoolNumber]
          this.school = localStorage.school = selectSchool.name
          this.nasip = localStorage.nasip = selectSchool.nasip
          this.icode = localStorage.icode = selectSchool.icode
        } else {
          this.school = localStorage.school = null
          this.nasip = localStorage.nasip = null
          this.icode = localStorage.icode = null
        }

        if (this.model === "auto") {
          this.autoIpAndMac()
        }
        console.log(localStorage)
      },
      setNasipAndIcode: function () {
        localStorage.nasip = this.nasip
        localStorage.icode = this.icode

        if (this.model === "auto") {
          this.autoIpAndMac()
        }
        console.log(localStorage)
      }
    }
  }
</script>