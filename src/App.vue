<script setup lang="ts">
import { onBeforeMount, onUnmounted, ref } from "vue";
import { useStore } from "@/store";

import AppText from "./components/app/AppText.vue";
import TodoAdd from "./components/TodoAdd.vue";
import TodoList from "./components/TodoList.vue";
import TodoFilter from "./components/TodoFilter.vue";
import ITodoItem from "@/types/todo.model";

const store = useStore();

const unsubscribe = store.$subscribe((mutation, state) => {
	localStorage.setItem("state", JSON.stringify(state));
});

function getDataFromLs() {
	const lsState = localStorage.getItem("state");
	if (!lsState) return;
	store.$state = JSON.parse(lsState);
}

/* Get saved state from LocalStorage before DOM is mounted */
onBeforeMount(() => {
	getDataFromLs();
});

/* Cancel store subscription */
onUnmounted(() => {
	unsubscribe();
});
</script>

<template>
	<section class="todo">
		<AppText
			v-model="store.todosTitle"
			class="todo__title"
			placeholder="Enter the project name"
			text-align="center"
			as="h1"
			editable
		/>

		<TodoFilter />

		<TodoList :items="store.filteredTodoItems" />

		<TodoAdd />
	</section>
</template>

<style>
@import "@/assets/css/variables.css";

.todo {
	padding: 0.75rem;
	max-width: 350px;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.todo__title,
.todo-filter {
	margin-bottom: 0.75rem;
}

.todo-filter,
.todo-list,
.todo-add {
	width: 100%;
}
</style>
