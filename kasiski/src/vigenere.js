import Vue from 'vue'
import vuePug, { pugTemplate } from "./vue-pug"
import appTmpl from "./components/vigenere.pug"

vuePug("accordion")

function isSpecial (x) {
	return isNaN(x.codePointAt(0)) || x.codePointAt(0) > 127
}

function addToLetter (x, y, base) {
	//console.log(`now at ${x}, codepoint ${x.codePointAt(0)}`)
	let n = x.codePointAt(0) - base.codePointAt(0)
	let r = (n + y + 1) % 26
	return String.fromCodePoint(base.codePointAt(0) + r)
}

function vigenere (plaintext, key) {
	key = key.toLowerCase().replace(/[^a-z]/, "")
	key = key.split("").map(x => x.codePointAt(0) - "a".codePointAt(0))

	let ciphertext = ""
	let ctr = 0
	for (let i = 0; i < plaintext.length; i++) {
		let l = plaintext[i]
		if (isSpecial(l)) {
			ciphertext += "\ufffd"
		} else if (l.match(/[A-Z]/)) {
			ciphertext += addToLetter(l, key[ctr], 'A')
			ctr++
		} else if (l.match(/[a-z]/)) {
			ciphertext += addToLetter(l, key[ctr], 'a')
			ctr++
		} else {
			ciphertext += l
		}

		ctr %= key.length
	}

	return ciphertext
}

let App = Vue.component("Vigenere", {
	render: pugTemplate(appTmpl),
	data: () => ({
		plaintext: "",
		key: "",
	}),
	computed: {
		ciphertext() {
			if (!this.plaintext) {
				return "Enter some plaintext..."
			} else if (!this.key) {
				return "Enter an encryption key..."
			} else {
				return vigenere(this.plaintext, this.key)
			}
		},
	}
})

/* eslint-disable no-new */
new Vue({
	el: '#app',
	render: h => h(App)
})
