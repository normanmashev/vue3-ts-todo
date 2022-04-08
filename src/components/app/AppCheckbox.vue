<template>
	<input
		v-bind="$attrs"
		class="app-checkbox"
		type="checkbox"
		:checked="modelValue"
		:id="id"
		@change="handleChange"
	/>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	inheritAttrs: false,
	props: {
		id: { type: String, required: true },
		modelValue: { type: Boolean, required: true },
	},
	setup(props, { emit }) {
		function handleChange(event: Event) {
			emit("update:modelValue", (event.target as HTMLInputElement).checked);
		}

		return { handleChange };
	},
});
</script>

<style scoped></style>
