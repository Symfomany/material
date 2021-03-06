// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource';
import App from './App'
import router from './router'
import Vuetify from 'vuetify'


/**
 * Use Vue Resource
 */
Vue.use(VueResource);

/**
 * Use Vue Material
 */
Vue.use(Vuetify)
// Vue.use(VueMaterial)


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
