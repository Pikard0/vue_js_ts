<script setup lang="ts">
import ParticipantForm from './ParticipantForm.vue'
import type { Participant } from '../types'
defineProps<{ participant?: Participant }>()
const emit = defineEmits<{ save: [value: Omit<Participant, 'id'>]; cancel: [] }>()
</script>
<template><ParticipantForm :participant="participant" @save="emit('save', $event)" @cancel="emit('cancel')" /></template>
