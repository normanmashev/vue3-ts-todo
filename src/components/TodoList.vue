<script setup lang="ts">
import ITodoItem from "@/types/todo.model";
import TodoItem from "@/components/TodoItem.vue";

defineProps<{ items: ITodoItem[] }>();
</script>

<template>
	<TransitionGroup name="list" tag="ul" class="todo-list">
		<TodoItem v-for="item of items" :key="item.id" :item="item" />
	</TransitionGroup>
	<span v-if="!items.length" class="todo-list-empty">No any todos yet</span>
</template>

<style scoped>
.todo-list {
	list-style: none;
	display: flex;
	flex-direction: column;
	margin: 0 auto;
}

.todo-list-empty {
	margin-bottom: 0.75rem;
}

.list-enter-active,
.list-leave-active {
	transition: all 0.3s ease;
}
.list-enter-from,
.list-leave-to {
	opacity: 0;
	transform: translateX(30px);
}
</style>
