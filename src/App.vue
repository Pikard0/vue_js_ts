<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import SearchBar from './components/SearchBar.vue'
import Modal from './components/Modal.vue'
import ParticipantForm from './components/ParticipantForm.vue'
import NewWinnerButton from './components/NewWinnerButton.vue'
import WinnersList from './components/WinnersList.vue'
import ParticipantTable from './components/ParticipantTable.vue'
import type { Participant } from './types'
const key = 'vue-lottery-participants'
const participants = ref<Participant[]>([])
const query = ref(''); const debouncedQuery = ref(''); const sort = ref<'name'|'birthDate'>('name'); const desc = ref(false)
const modal = ref<'add'|'edit'|'delete'|null>(null); const selected = ref<Participant | undefined>(); const winners = ref<Participant[]>([])
onMounted(() => { participants.value = JSON.parse(localStorage.getItem(key) || '[]') })
watch(participants, v => localStorage.setItem(key, JSON.stringify(v)), { deep: true })
const visible = computed(() => participants.value.filter(p => p.name.toLowerCase().includes(debouncedQuery.value.toLowerCase())).sort((a,b) => { const x = a[sort.value].localeCompare(b[sort.value]); return desc.value ? -x : x }))
let timer: ReturnType<typeof setTimeout>; watch(query, () => { clearTimeout(timer); timer = setTimeout(() => { debouncedQuery.value = query.value }, 300) })
function save(value: Omit<Participant, 'id'>) { const duplicate = participants.value.some(p => p.email.toLowerCase() === value.email.toLowerCase() && p.id !== selected.value?.id); if (duplicate) return alert('Учасник з таким e-mail вже існує'); if (selected.value) Object.assign(selected.value, value); else participants.value.push({ id: Date.now(), ...value }); modal.value = null }
function remove() { if (selected.value) { participants.value = participants.value.filter(p => p.id !== selected.value!.id); winners.value = winners.value.filter(w => w.id !== selected.value!.id) }; modal.value = null }
const canDraw = computed(() => winners.value.length < 3 && participants.value.some(p => !winners.value.some(w => w.id === p.id)))
function draw() { const available = participants.value.filter(p => !winners.value.some(w => w.id === p.id)); if (!available.length) return; winners.value.push(available[Math.floor(Math.random() * available.length)]) }
function removeWinner(id: number) { winners.value = winners.value.filter(w => w.id !== id) }
function escape(e: KeyboardEvent) { if (e.key === 'Escape') modal.value = null }
onMounted(() => window.addEventListener('keydown', escape)); onUnmounted(() => window.removeEventListener('keydown', escape))
</script>
<template>
  <main class="app"><header><div><p class="eyebrow">Vue Lottery</p><h1>Учасники розіграшу</h1><p class="subtitle">казино не обмане тебе.</p></div><NewWinnerButton :disabled="!canDraw" @click="draw" /></header>
  <WinnersList :winners="winners" @remove="removeWinner" />
  <section class="toolbar"><SearchBar v-model="query" /><button @click="modal = 'add'; selected = undefined">＋ Новий учасник</button></section>
  <section class="content"><div class="table-head"><h2>Учасники <span>{{ visible.length }}</span></h2><div class="sort"><button :class="{active: sort==='name'}" @click="sort='name'">A–Z</button><button :class="{active: sort==='birthDate'}" @click="sort='birthDate'">Дата</button><button @click="desc=!desc">{{ desc ? '↓' : '↑' }}</button></div></div>
    <ParticipantTable :participants="visible" @edit="selected=$event; modal='edit'" @remove="selected=$event; modal='delete'" />
  </section>
  <Modal v-if="modal==='add' || modal==='edit'" :title="modal==='add' ? 'Новий учасник' : 'Редагувати учасника'" @close="modal=null"><ParticipantForm :participant="selected" @save="save" @cancel="modal=null" /></Modal>
  <Modal v-if="modal==='delete'" title="Видалити учасника" @close="modal=null"><p>Ви справді хочете видалити «{{ selected?.name }}»?</p><div class="actions"><button class="secondary" @click="modal=null">Ні</button><button class="danger solid" @click="remove">Так, видалити</button></div></Modal>
  </main>
</template>
