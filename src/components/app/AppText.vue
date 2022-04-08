<script setup lang="ts">
import { nextTick, onBeforeMount, ref } from "vue";
import AppInput from "@/components/app/AppInput.vue";

interface TextProps {
	modelValue: string;
	as?: string;
	editable?: boolean;
	width?: string;
	textAlign?: string;
}

const props = withDefaults(defineProps<TextProps>(), {
	as: "span",
	editable: false,
	width: "100%",
	textAlign: "left",
});

const emit = defineEmits(["update:modelValue"]);

const inputRef = ref<InstanceType<typeof AppInput> | null>(null);
const isEditing = ref(false);
let initialValue = props.modelValue;

function closeEditing() {
	if (!props.modelValue) {
		if (!initialValue) return;
		emit("update:modelValue", initialValue);
	}
	initialValue = props.modelValue;
	isEditing.value = false;
}

function handleClick() {
	if (!props.editable) return;
	isEditing.value = true;
	nextTick(() => inputRef.value?.focus());
}

onBeforeMount(() => {
	if (!props.modelValue) {
		isEditing.value = true;
	}
});
</script>

<template>
	<component v-bind="$attrs" class="app-text" :is="props.as">
		<AppInput
			v-if="isEditing"
			ref="inputRef"
			:width="width"
			:modelValue="props.modelValue"
			:placeholder="$attrs.placeholder || 'Введите текст'"
			@blur="closeEditing"
			@keydown.enter="closeEditing"
			@update:modelValue="$emit('update:modelValue', $event)"
		/>
		<span v-else class="app-text__label" @click="handleClick">
			{{ props.modelValue }}
		</span>
	</component>
</template>

<style scoped>
.app-text {
	width: v-bind(width);
	text-align: v-bind(textAlign);
}
</style>
