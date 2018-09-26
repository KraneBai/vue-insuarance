// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import MintUI from 'mint-ui'
import VueHighcharts from 'vue-highcharts'
import { Drawer } from 'iview'

import 'mint-ui/lib/style.css'
import 'swiper/dist/css/swiper.css'
import 'iview/dist/styles/iview.css'
import 'styles/reset.css'
import 'styles/border.css'

Vue.use(VueHighcharts)
Vue.use(MintUI)
Vue.component('Drawer', Drawer)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
