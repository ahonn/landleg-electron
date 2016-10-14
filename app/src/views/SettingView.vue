<template>
  <div class="landleg-setting">
    <form class="setting-form">
      <div class="setting-item">
        <h2 class="setting-title">设置 IP 地址与 MAC 地址</h2>
        <div class="setting-redio">
          <input type="radio" id="auto" value="auto" v-model="model" @change="save">
          <label for="auto">自动</label>
          <input type="radio" id="manual" value="manual" v-model="model">
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
              <input type="text" name="ip" id="ip" v-model="ip" @change="save" />
            </div>
            <div>
              <label for="mac" class="mac-name">MAC:</label>
              <input type="text" name="mac" id="mac" v-model="mac" @change="save" />
            </div>
          </div>
        </div>
      </div>
    </form>
    <div class="button-group">
      <!-- <button class="save-button" v-if="model === 'manual'" @click="save">保存</button> -->
      <button class="back-button" v-link="{ name: 'home' }">返回</button>
    </div>
  </div>
</template>

<script>
  import Landleg from '../lib/landleg.js'

  export default {
    data() {
      return {
        model: "auto",
        ip: null,
        mac: null
      }
    },
    ready() {
      this.model = localStorage.model
      console.log(this.model)

      if (this.model === "auto") {
        this.ip = localStorage.ip = Landleg.getClientIP()
        this.mac = localStorage.mac = Landleg.getClientMAC()
      } else {
        this.ip = localStorage.ip
        this.mac = localStorage.mac
      }
    },
    methods: {
      save: function () {
        localStorage.model = this.model

        if (this.model === "auto") {
          this.ip = localStorage.ip = Landleg.getClientIP()
          this.mac = localStorage.mac = Landleg.getClientMAC()
        } else {
          localStorage.ip = this.ip
          localStorage.mac = this.mac
        }
        console.log(localStorage)
      }
    }
  }
</script>