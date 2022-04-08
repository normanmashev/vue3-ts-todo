<template>
	<input
		v-bind="$attrs"
		:value="modelValue"
		@input="handleInput"
		ref="inputRef"
		type="text"
		class="app-input form-control"
	/>
</template>

<script lang="ts">
import { defineComponent, nextTick, ref } from "vue";

export default defineComponent({
	props: {
		modelValue: String,
		width: { type: String, default: "100%" },
	},

	setup(props, { emit }) {
		const inputRef = ref<HTMLInputElement | null>(null);

		function focus() {
			nextTick(() => {
				inputRef.value?.focus();
			});
		}

		function handleInput(event: Event) {
			emit("update:modelValue", (event.target as HTMLInputElement).value);
		}

		return { inputRef, focus, handleInput };
	},
});
</script>

<style scoped>
.app-input {
	width: v-bind(width);
}
</style>
