import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import Vigenere from './Vigenere'

Vue.use(BootstrapVue)

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	el: '#app',
	render: h => h(Vigenere)
})
