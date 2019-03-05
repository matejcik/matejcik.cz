import Vue from 'vue'
import Kasiski from './Kasiski'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	el: '#app',
	render: h => h(Kasiski)
})
