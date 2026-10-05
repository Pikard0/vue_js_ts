<script setup lang="ts">
defineProps<{ title: string }>()
const emit = defineEmits<{ close: [] }>()
</script>
<template>
  <div class="backdrop" @click.self="emit('close')" @keydown.esc="emit('close')" tabindex="-1">
    <section class="modal" role="dialog" aria-modal="true"><button class="close" aria-label="Закрити" @click="emit('close')">×</button><h2>{{ title }}</h2><slot /></section>
  </div>
</template>
