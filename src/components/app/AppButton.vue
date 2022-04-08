<template>
	<button v-bind="$attrs" class="app-button" :class="compClass">
		<slot name="default"></slot>
	</button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	props: {
		icon: { type: Boolean, default: false },
		ghost: { type: Boolean, default: false },
	},

	computed: {
		compClass() {
			return { "icon": this.icon, "ghost": this.ghost };
		},
	},

	setup() {
		return {};
	},
});
</script>

<style scoped>
.app-button {
	padding: 0.5rem;
	border: 0;
	background: var(--primary);
	color: var(--white);
	border-radius: 0.2rem;
	transition: all 0.3s ease;
}
.app-button.icon {
	--size: 2rem;
	border-radius: 50%;
	width: var(--size);
	height: var(--size);
	font-size: calc(var(--size) / 1.5);
	display: flex;
	justify-content: center;
	align-items: center;
}
.app-button.ghost {
	background: transparent;
	color: var(--dark);
}
.app-button.ghost:hover {
	background: rgba(0, 0, 0, 0.1);
}
.app-button:hover {
	transform: scale(1.02);
	opacity: 0.8;
}
</style>
