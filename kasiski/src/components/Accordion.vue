<template>
	<b-card no-block>
		<div class="card-header" @click="toggleThis"><div>{{ label }}</div></div>
		<b-collapse :id="cardId" :visible="visible" :accordion="accordion" ref="collapse">
			<div class="card-block">
				<slot><p>This card is empty</p></slot>
			</div>
		</b-collapse>
	</b-card>
</template>

<script>
export default {
	name: 'accor-item',
	props: {
		label: String,
		cardId: String,
		visible: Boolean,
		accordion: {
			type: String,
			default: "accordion",
		},
	},
	methods: {
		toggleThis () {
			this.$root.$emit("collapse::toggle", this.cardId)
		},
	},
}
</script>
