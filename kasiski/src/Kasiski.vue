<template>
	<div id="app" class="container">
		<h1>Kasiski method</h1>
		
		<accor-item label="Input" visible card-id="inputpane">
			<b-form class="text-center">
				<b-form-input textarea v-model="ciphertext" :rows="7"></b-form-input>
				<b-button variant="primary" class="mt-1">Find n-tuples</b-button>
			</b-form>
		</accor-item>

		<accor-item label="Divisor table" card-id="tablepane">
		</accor-item>
	</div>
</template>

<script>
import accorItem from './components/Accordion'

export default {
	name: 'app',
	components: {
		accorItem,
	},
	data () {
		return {
			ciphertext: '',
		}
	},
}
</script>
