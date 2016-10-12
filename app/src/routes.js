import Vue from 'vue'

export default {
  '/': {
    component: Vue.component('landing-page', require('./views/HomeView')),
    name: 'home'
  },
  '/about': {
    component: Vue.component('landing-page', require('./views/AboutView')),
    name: 'about'
  }
}
