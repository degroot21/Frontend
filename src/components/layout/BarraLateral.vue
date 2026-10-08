<template>
  <aside class="w-64 bg-slate-50 flex flex-col z-10">
    <div class="p-6">
      <div class="flex items-center gap-3">
        <img src="../../assets/icons/iconCapas.png" alt="Icono de capas" class="w-5 h-5">
        <p class="text-sm text-gray-900">Capas de contaminantes</p>
      </div>
    </div>

    <div class="px-4 pb-3">
      <label class="block text-xs text-gray-600 mb-2">Fecha</label>
      <VueDatePicker
        v-model="fechaParaPicker"
        :enable-time-picker="false"
        :format="formatoFecha"
        :allowed-dates="fechasDisponibles"
        placeholder="Selecciona una fecha"
        class="w-full"
      />
    </div>

    <nav class="flex-1 px-4 space-y-2">
      <button
        v-for="(config, id) in capasParaFechaSeleccionada"
        :key="id"
        type="button"
        @click="setCapaActiva(id)"
        :class="[
          'w-full flex items-center justify-between px-3 py-2 text-sm rounded-[32px] transition',
          capaActiva === id ? 'bg-sky-100 text-sky-700 font-semibold' : 'text-gray-700 hover:bg-slate-200'
        ]"
      >
        <span class="flex items-center gap-2">
          <img :src="config.icon" :alt="config.label" class="w-4 h-4">
          {{ config.label }}
        </span>
      </button>
    </nav>
  </aside>
</template>

<script setup>
import { VueDatePicker } from '@vuepic/vue-datepicker'
import { computed } from 'vue'
import '@vuepic/vue-datepicker/dist/main.css'
import {
  capaActiva,
  fechaSeleccionada,
  setCapaActiva,
  setFechaSeleccionada,
  capasParaFechaSeleccionada,
  fechasDisponibles
} from '../../estadoMapa.js'

const fechaParaPicker = computed({
  get() {
    if (!fechaSeleccionada.value) return null
    const [year, month, day] = fechaSeleccionada.value.split('-').map(Number)
    return new Date(year, month - 1, day)
  },
  set(date) {
    setFechaSeleccionada(date)
  }
})

const formatoFecha = (date) => {
  if (!date) return ''
  const value = new Date(date)
  return `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(2, '0')}-${String(value.getDate()).padStart(2, '0')}`
}
</script>