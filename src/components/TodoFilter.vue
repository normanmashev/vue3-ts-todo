<script setup lang="ts">
import { ref } from "vue";
import { ISelectItem } from "./app/AppSelect.vue";
import { useStore } from "@/store";
import AppInput from "./app/AppInput.vue";
import AppSelect from "./app/AppSelect.vue";

const todoStatusItems = ref<ISelectItem[]>([
	{ label: "All", value: null },
	{ label: "Done", value: true },
	{ label: "Pending", value: false },
]);

const store = useStore();
</script>

<template>
	<div class="todo-filter">
		<AppInput v-model="store.filter.title" placeholder="Search by name" />
		<AppSelect v-model="store.filter.done" :items="todoStatusItems" />
	</div>
</template>

<style scoped>
.app-input {
	margin-bottom: 0.75rem;
}
</style>
