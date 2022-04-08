<script setup lang="ts">
import { toRefs } from "vue";
import { useStore } from "@/store";
import ITodoItem from "@/types/todo.model";
import AppText from "./app/AppText.vue";
import AppButton from "./app/AppButton.vue";
import AppCheckbox from "@/components/app/AppCheckbox.vue";

const props = defineProps<{ item: ITodoItem }>();
const { item } = toRefs(props);

const store = useStore();

function handleUpdate(e: string | boolean, field: string) {
	store.updateTodo({ ...item.value, [field]: e });
}
</script>

<template>
	<li
		class="todo-item"
		:class="{ done: item.done }"
		@dblclick="store.deleteTodo(item.id)"
	>
		<AppText
			:modelValue="item.title"
			@update:modelValue="handleUpdate($event, 'title')"
			editable
		/>
		<AppCheckbox
			:modelValue="item.done"
			:id="item.id.toString()"
      @dblclick.stop=""
			@update:modelValue="handleUpdate($event, 'done')"
		/>
	</li>
</template>

<style scoped>
.todo-item {
	padding: 0.5rem;
	margin-bottom: 1rem;
	background: var(--warning);
	border-radius: 0.25rem;
	color: #fff;
	display: flex;
	align-items: center;
	justify-content: space-between;
	transition: background 0.3s ease, text-decoration 0.3s;
}

.todo-item.done {
	background: var(--green);
	text-decoration: line-through;
}

.todo-item .app-text {
	margin-right: 20px;
}
</style>
