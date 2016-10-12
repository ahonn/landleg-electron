<template>
  <header class="landleg-header">
    <h2 class="landleg-logo">Land Leg</h2>
  </header>
  <landleg-form></landleg-form>
  <landleg-footer></landleg-footer>
</template>

<script>
import LandlegForm from '../components/Form.vue'
import LandlegFooter from '../components/Footer.vue'

  export default {
    components: {
      "landleg-form": LandlegForm,
      "landleg-footer": LandlegFooter
    }
  }
</script>

<style>
  .landleg-header {
    width: 100%;
    padding-top: 40px;
    margin-bottom: 30px;
    box-sizing: border-box;
  }

  .landleg-logo {
    font-size: 44px;
    font-weight: 200;
    color: #4F9AD7;
  }
</style>>