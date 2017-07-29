import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import Kasiski from './Kasiski'

Vue.use(BootstrapVue)

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	el: '#app',
	render: h => h(Kasiski)
})
