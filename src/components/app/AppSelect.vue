<script setup lang="ts">
import { onBeforeMount, ref } from "@vue/runtime-core";

export interface ISelectItem {
	label: string;
	value: any;
}

interface SelectProps {
	items?: ISelectItem[];
	modelValue: any;
}

/* Использовал костыль, т.к. при v-bind:value к option значения приводятся к строке,
что в итоге при onChange выдаются неверные результаты */
const props = defineProps<SelectProps>();
const emit = defineEmits(["update:modelValue"]);
const selected = ref<any>(null); // Label опция выбранной опции

function handleChange(event: Event) {
	const label = (event.target as HTMLSelectElement).value;
	const newValue = props.items?.find(item => item.label === label)?.value;
	selected.value = label;
	emit("update:modelValue", newValue);
}

/* Перед первичной отрисовкой найти заранее выбранную опцию по value */
onBeforeMount(() => {
	selected.value = props.items?.find(
		item => item.value === props.modelValue
	)?.label;
});
</script>

<template>
	<select
		class="app-select form-control"
		v-bind="$attrs"
		:value="selected"
		@change="handleChange"
	>
		<slot name="items">
			<template v-if="items">
				<!-- В :value передаем label опции, чтобы при обработке события искать нужный
            value по названию опции -->
				<option v-for="item of items" :key="item.label" :value="item.label">
					{{ item.label }}
				</option>
			</template>
		</slot>
	</select>
</template>

<style scoped></style>
