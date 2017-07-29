<template>
	<div id="app" class="container">
		<h1>Vigenere encryption</h1>
		
		<b-form>
			<label for="plaintext">Plaintext</label>
			<b-form-input textarea v-model="plaintext" :rows="7"></b-form-input>
			<label for="key" class="mt-1">Key</label>
			<b-form-input type="text" v-model="key"></b-form-input>
			<label for="ciphertext" class="mt-1">Ciphertext</label>
			<b-form-input textarea :rows="7" v-model="ciphertext"></b-form-input>
		</b-form>
	</div>
</template>

<script>
// i want a line here gods dammit

function isSpecial (x) {
	return isNaN(x.codePointAt(0)) || x.codePointAt(0) > 127
}

function addToLetter (x, y, base) {
	console.log(`now at ${x}, codepoint ${x.codePointAt(0)}`)
	let n = x.codePointAt(0) - base.codePointAt(0)
	let r = (n + y) % 26
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

export default {
	name: 'app',
	data () {
		return {
			plaintext: '',
			key: '',
		}
	},
	computed: {
		ciphertext () {
			if (this.plaintext && this.key) {
				return vigenere(this.plaintext, this.key)
			}
		},
	},
}
</script>
