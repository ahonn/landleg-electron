<template>
  <landleg-header></landleg-header>
  <div class="landleg-about">
    <ul class="about-list">
      <li class="list-item">
        <h2>关于</h2>
        <p>软件版本：v0.0.0</p>
        <p>项目地址：<a href="">landleg-electron</a></p>
        <p>
          基于 <a href="https://cn.vuejs.org/">Vue.js</a> + <a href="electron.atom.io/">Electron</a> 的伪天翼拨号应用
        </p>
        <p>
          参考自 <a href="https://github.com/xfkencon">xfkencon</a> 的 <a href="https://github.com/xfkencon/land-leg-PY">land-leg-PY</a>
        </p>
      </li>
<!--       <li class="list-item">
        <h2>项目地址</h2>
        <a href="">landleg-electron</a>
      </li> -->
      <li class="list-item">
        <h2>联系方式</h2>
        <p>Blog: <a href="http://www.ahonn.me">ahonn</a></p>
        <p>Github: <a href="https://github.com/ahonn">ahonn</a></p>
        <p>Email: <a href="mailto:ahonn95@outlook.com">ahonn95@outlook.com</a></p>
      </li>
    </ul>
    <button class="back-button" v-link="{ name: 'home' }">返回</button>
  </div>
</template>

<script>
  import LandlegHeader from '../components/Header.vue';

  export default {
    components: {
      "landleg-header": LandlegHeader
    }
  }
</script>

<style>
  .landleg-about {
    padding: 0 30px;
    text-align: left;
  }

  .landleg-about .about-list {
    list-style: none;
  }

  .about-list .list-item {
    margin-bottom: 10px;
  }

  h2 {
    margin-bottom: 5px;
    font-size: 16px;
    font-weight: 200;
  }

  p {
    font-size: 13px;
  }

  a {
    color: #4F9AD7;
    text-decoration: none;
  }

  .landleg-about .back-button {
    width: 100%;
    height: 32px;
    margin-top: 10px;
    font-size: 14px;
    font-weight: 200;
    color: #4F9AD7;
    background-color: #fff;
    border: 1px solid #4F9AD7;
    outline: 0;
  }
</style>