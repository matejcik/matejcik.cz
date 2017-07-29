<template>
	<div id="app" class="container">
		<h1>Kasiski method</h1>
		
		<accor-item label="Input" :visible="state === 'input'" card-id="inputpane">
			<b-form class="text-center">
				<b-form-input textarea v-model="ciphertext" :rows="7"></b-form-input>
				<b-button variant="primary" class="mt-1" @click="findNgrams">Find n-grams</b-button>
			</b-form>
		</accor-item>

		<accor-item label="Divisor table" :visible="state === 'ngrams'" card-id="tablepane">
			<table class="table" v-if="ngrams.length">
				<thead><tr>
					<th></th>
					<th class="num" v-for="n in 19">{{ n + 1 }}</th>
				</tr></thead>
				<tr v-for="n in ngrams" :key="n.text">
					<td>{{ n.text }} ({{ n.n }})</td>
					<td v-for="k in 19" :class="{ green: n.divisible(k+1) }">x</td>
				</tr>
			</table>
			<p v-else>Input ciphertext first</p>
		</accor-item>
	</div>
</template>

<script>
import accorItem from './components/Accordion'

function divisible (n) {
	let r2 = this.reps.slice()
	r2.shift()
	let dists = r2.map((e, i) => e - this.reps[i])
	console.log(`${this.text} : ${dists}`)
	for (let i of dists) {
		if (i % n === 0) return true
	}
	return false
}

export default {
	name: 'app',
	components: {
		accorItem,
	},
	data () {
		return {
			ciphertext: '',
			ngrams: [],
			state: 'input',
		}
	},
	methods: {
		findNgrams () {
			this.state = 'ngrams'
			let ng = {}
			let ciphertext = this.ciphertext.toUpperCase().replace(/[^A-Z]/g, '')
			console.log(ciphertext)

			function updateNgram (gram, n, i) {
				if (gram.length !== n) return
				let g = { text: gram, n: 0, reps: [], divisible }
				if (ng[gram]) g = ng[gram]
				g.n++
				g.reps.push(i)
				ng[gram] = g
			}

			for (let i = 0; i < ciphertext.length; i++) {
				updateNgram(ciphertext.substr(i, 3), 3, i)
				updateNgram(ciphertext.substr(i, 4), 4, i)
			}

			this.ngrams = Object.keys(ng)
				.filter(x => ng[x].n > 1)
				.map(x => ng[x])
				.sort((a, b) => (b.text.length - a.text.length) || a.text.localeCompare(b.text))
		},
	},
}
</script>

<style>
.green { color: green; }
.num { width: 2.3em; }
</style>
