<script setup lang="ts">
defineProps<{ disabled: boolean }>()
const emit = defineEmits<{ click: [] }>()
</script>
<template><button class="primary" :disabled="disabled" @click="emit('click')">Обрати переможця</button></template>
