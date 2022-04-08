import { defineStore } from "pinia";
import ITodoItem from "@/types/todo.model";

interface RootState {
	todoItems: ITodoItem[];
	todosTitle: string;
	filter: {
		title: string;
		done: boolean | null;
	};
}

export const useStore = defineStore("main", {
	state: () =>
		({
			todoItems: [],
			todosTitle: "",
			filter: {
				title: "",
				done: null,
			},
		} as RootState),

	getters: {
		filteredTodoItems(state) {
			let filtered = state.todoItems;
			if (state.filter.title) {
				const titleFilter = state.filter.title.toLowerCase();
				filtered = filtered.filter(e =>
					e.title.toLowerCase().includes(titleFilter)
				);
			}
			if (state.filter.done !== null) {
				filtered = filtered.filter(e => e.done === state.filter.done);
			}
			return filtered;
		},
	},

	actions: {
		addTodo(title: string): void {
			const item: ITodoItem = {
				id: Date.now(), // create "unique" id for the sake of example
				title,
				done: false,
			};
			this.todoItems.push(item);
		},

		deleteTodo(id: number) {
			this.todoItems = this.todoItems.filter(todo => todo.id !== id);
		},

		updateTodo(item: ITodoItem): void {
			const itemIndex = this.todoItems.findIndex(todo => todo.id === item.id);
			this.todoItems[itemIndex] = item;
		},
	},
});
