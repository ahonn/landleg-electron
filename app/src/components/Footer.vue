<template>
  <div v-if="showFooter" class="landleg-footer">
    <ul class="footer-list">
      <li class="list-item" v-for="item in menu">
        <a v-link="{ name: item.link }" v-text="item.name"></a>
      </li>
    </ul>
  </div>
</template>

<script>

  export default {
    props: ["showFooter"],
    data() {
      return {
        menu: [
          {
            name: '设置',
            link: 'setting'
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