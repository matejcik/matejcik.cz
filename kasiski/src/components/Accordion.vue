<template>
	<b-card :header="label" v-b-toggle="cardId" no-block>
		<b-collapse :id="cardId" :visible="visible" :accordion="accordion">
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
}
</script>
