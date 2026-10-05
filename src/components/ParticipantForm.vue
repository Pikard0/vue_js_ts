<script setup lang="ts">
import { computed, reactive, watch } from 'vue'
import type { Participant } from '../types'
const props = defineProps<{ participant?: Participant }>()
const emit = defineEmits<{ save: [value: Omit<Participant, 'id'>]; cancel: [] }>()
const form = reactive({ name: '', email: '', phone: '+380', birthDate: '' })
const today = new Date().toISOString().slice(0, 10)
const isValid = computed(() => Boolean(form.name.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) && /^\+380\d{9}$/.test(form.phone) && form.birthDate && form.birthDate <= today))
watch(() => props.participant, (p) => Object.assign(form, p ?? { name: '', email: '', phone: '+380', birthDate: '' }), { immediate: true })
function save() {
  if (!form.name.trim()) return alert('Введіть імʼя учасника')
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return alert('Введіть коректний e-mail')
  if (!/^\+380\d{9}$/.test(form.phone)) return alert('Телефон має бути у форматі +380XXXXXXXXX')
  if (!form.birthDate) return alert('Оберіть дату народження')
  if (form.birthDate > today) return alert('Дата народження не може бути в майбутньому')
  emit('save', { name: form.name.trim(), email: form.email.trim(), phone: form.phone, birthDate: form.birthDate })
}
</script>
<template>
  <form class="form" @submit.prevent="save">
    <label>Імʼя<input v-model.trim="form.name" required /></label>
    <label>E-mail<input v-model.trim="form.email" type="email" required /></label>
    <label>Телефон<input v-model.trim="form.phone" inputmode="tel" placeholder="+380XXXXXXXXX" required /></label>
    <label>Дата народження<input v-model="form.birthDate" type="date" :max="today" required /></label>
    <div class="actions"><button type="button" class="secondary" @click="emit('cancel')">Скасувати</button><button type="submit" :disabled="!isValid">Зберегти</button></div>
  </form>
</template>
