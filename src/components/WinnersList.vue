<script setup lang="ts">
import type { Participant } from '../types'
defineProps<{ winners: Participant[] }>()
const emit = defineEmits<{ remove: [id: number] }>()
</script>
<template>
  <section v-if="winners.length" class="winner-list"><div class="winner-title">🎉 Переможці <span>{{ winners.length }}/3</span></div><div v-for="(winner, index) in winners" :key="winner.id" class="winner"><span>#{{ index + 1 }}</span><strong>{{ winner.name }}</strong><small>{{ winner.email }}</small><button class="close-winner" @click="emit('remove', winner.id)">×</button></div></section>
</template>
