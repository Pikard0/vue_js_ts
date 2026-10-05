<script setup lang="ts">
defineProps<{ modelValue: string }>()
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()
</script>
<template>
  <label class="search"><span>Пошук за іменем</span><input :value="modelValue" type="search" placeholder="Введіть ім'я..." @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)" /></label>
</template>
