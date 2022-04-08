<template>
	<div class="todo-add">
		<form
			v-if="isShowForm"
			class="todo-add-form"
			@submit.prevent="handleSubmit"
		>
			<AppInput
				v-model="title"
				ref="inputRef"
				auto-focus
				placeholder="Write your todo here"
			/>
			<div class="todo-add-form__buttons">
				<AppButton type="submit" class="todo-add__btn-submit">
					Add todo
				</AppButton>
				<AppButton
					type="button"
					ghost
					icon
					class="todo-add__btn-close"
					@click="isShowForm = false"
				>
					&times;
				</AppButton>
			</div>
		</form>
		<AppButton v-else class="todo-add__btn-add" icon @click="showForm">
			+
		</AppButton>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, nextTick } from "vue";
import { useStore } from "@/store";
import AppInput from "./app/AppInput.vue";
import AppButton from "./app/AppButton.vue";

export default defineComponent({
	setup() {
		const store = useStore();
		const title = ref<string>("");

		function handleSubmit() {
			if (!title.value) return;
			store.addTodo(title.value);
			isShowForm.value = false;
			title.value = "";
		}

		const isShowForm = ref<boolean>(false);
		const inputRef = ref<InstanceType<typeof AppInput> | null>(null);

		function showForm() {
			isShowForm.value = true;
			nextTick(() => inputRef.value?.focus());
		}

		return { isShowForm, title, handleSubmit, showForm, inputRef };
	},
	components: { AppInput, AppButton },
});
</script>

<style scoped>
.todo-add-form__buttons {
	display: flex;
}
.todo-add__btn-add {
	margin: 0 auto;
}
.todo-add__btn-submit {
	margin-right: 10px;
}
.app-input {
	margin-bottom: 0.5rem;
}
</style>
