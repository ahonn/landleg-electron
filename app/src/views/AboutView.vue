<template>
  <landleg-header></landleg-header>
  <div class="landleg-about">
    <ul class="about-list">
      <li class="list-item">
        <h2>关于</h2>
        <p>软件版本：v0.0.0</p>
        <p>项目地址：https://github.com/ahonn/landleg-electron</p>
        <p>
          基于 Vue.js + Electron 的伪天翼拨号应用
        </p>
        <p>
          参考自 xfkencon 的 land-leg-PY 项目
        </p>
      </li>
      <li class="list-item">
        <h2>联系方式</h2>
        <p>Blog: http://www.ahonn.me</p>  
        <p>Github: https://github.com/ahonn</p>
        <p>Email: ahonn95@outlook.com</p>
      </li>
    </ul>
    <button class="back-button" v-link="{ name: 'home' }">返回</button>
  </div>
</template>

<script>
  import LandlegHeader from 'components/Header.vue'

  export default {
    components: {
      "landleg-header": LandlegHeader
    }
  }
</script>