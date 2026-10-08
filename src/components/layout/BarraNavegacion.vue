<template>
  <header class="h-16 bg-white flex items-center justify-between px-6 z-20 relative">
    <div class="text-xl font-montserrat text-sky-600 font-bold">
      ALORA
    </div>

    <nav class="hidden md:flex space-x-8 font-montserrat text-sm">
      <a href="#" class="text-gray-900 border-b-2 border-sky-600 pb-1">Mapa</a> 
      <a href="#" class="text-gray-500 hover:text-gray-900 transition">Prueba Uno</a> 
      <a href="#" class="text-gray-500 hover:text-gray-900 transition">Prueba Dos</a> 
      <input type="text" name="fname" class="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500" placeholder="Buscar...">
    </nav>

    <div class="flex items-center justify-end space-x-4">
      <button 
        @click="mostrarLogin = true"
        id="bttnInicioSesion" 
        class="px-4 py-1 bg-sky-600 text-white rounded-[32px] hover:bg-sky-700 transition font-montserrat cursor-pointer"
      >
        Iniciar Sesión
      </button>
    </div>
  </header>

  <div v-if="mostrarLogin" class="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
    
    <button 
      @click="mostrarLogin = false" 
      class="absolute top-6 right-8 text-white text-4xl hover:text-gray-300 transition cursor-pointer z-[1000]"
      title="Cerrar"
    >
      &times;
    </button>

    <div class="transform scale-95 w-full h-full flex items-center justify-center">
      <InicioDeSesion />
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
// Importamos el archivo con el diseño animado del Login
import InicioDeSesion from '../PopUpInicioDeSesion.vue'

// Este es el interruptor mágico. Empieza apagado (false)
const mostrarLogin = ref(false)
</script>