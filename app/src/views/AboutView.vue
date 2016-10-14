<template>
  <div class="landleg-about">
    <div class="landleg-about-wrapper">
      <div class="logo-wrapper">
        <img src="http://ww2.sinaimg.cn/large/006y8lVagw1f8quctu0lmj303k03kglj.jpg" height="128" width="128">
        <h2 class="logo">Landleg <span class="version">v0.0.0</span></h2>
      </div>
      <div class="info-wrapper">
        <div class="info-item">
          <h3 class="info-title">项目地址：</h3>
          <p class="info-content">https://github.com/ahonn/landleg-electron</p>
        </div>
        <div class="info-item">
          <h3 class="info-title">项目作者：</h3>
          <p class="info-content"> Blog : http://www.ahonn.me</p>
          <p class="info-content"> Email: ahonn95@outlook.com</p>
        </div>
      </div>
    </div>
    <button class="back-button" v-link="{ name: 'home' }">返回</button>
  </div>
</template>

<script>
  export default {

  }
</script>