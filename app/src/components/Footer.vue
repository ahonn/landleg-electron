<template>
  <div class="landleg-footer">
    <ul class="footer-list">
      <li class="list-item" v-for="item in menu">
        <a v-link="{ name: item.link }" v-text="item.name"></a>
      </li>
    </ul>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        menu: [
          {
            name: '设置',
            link: 'home'
          },
          {
            name: '关于',
            link: 'about'
          }
        ]
      }
    }
  }
</script>

<style>
  .landleg-footer {
    width: 100%;
    height: 32px;
    position: fixed;
    bottom: 0;
    background-color: #f0f0f0;
  }

  .footer-list {
    list-style: none;
  }

  .footer-list li {
    width: 50%;
    float: left;
    font-size: 14px;
    font-weight: 200;
    line-height: 32px;
  }

  .footer-list .list-item a {
    color: #ababab;
    text-decoration: none;
    cursor: default;
  }
</style>>