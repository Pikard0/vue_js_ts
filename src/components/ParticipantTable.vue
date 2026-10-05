<script setup lang="ts">
import type { Participant } from '../types'
defineProps<{ participants: Participant[] }>()
const emit = defineEmits<{ edit: [participant: Participant]; remove: [participant: Participant] }>()
</script>
<template>
  <div v-if="participants.length" class="table"><div class="row heading"><span>Імʼя</span><span>E-mail</span><span>Телефон</span><span>Дата народження</span><span></span></div><div v-for="p in participants" :key="p.id" class="row"><strong>{{ p.name }}</strong><span>{{ p.email }}</span><span>{{ p.phone }}</span><span>{{ p.birthDate }}</span><span class="row-actions"><button @click="emit('edit', p)">Редагувати</button><button class="danger" @click="emit('remove', p)">Видалити</button></span></div></div><div v-else class="empty"><div>◎</div><h3>Список порожній</h3><p>Додайте першого учасника для початку розіграшу.</p></div>
</template>
