<template>
<div class="relative bg-white w-full max-w-4xl h-[550px] rounded-2xl shadow-2xl overflow-hidden flex">
      
  <!-- Login -->
  <div 
    class="w-1/2 h-full flex flex-col justify-center items-center px-12 transition-all duration-500 ease-in-out"
    :class="esRegistro ? '-translate-x-full opacity-0 z-0' : 'translate-x-0 opacity-100 z-10'"
  >
    <form class="w-full flex flex-col items-center">

        <h2 class="text-3xl font-montserrat text-gray-950 mb-4">Iniciar Sesión</h2>
        <span class="text-xs text-gray-400 mb-4">Ingrese su correo y contraseña</span>
        <div class="w-full flex items-center bg-gray-50 rounded-xl px-4 py-3 mb-3 border border-transparent focus-within:border-blue-900 transition">
          <input type="email" placeholder="Correo electrónico" class="w-full bg-transparent outline-none text-sm text-gray-700">
        </div>
        <div class="w-full flex items-center bg-gray-50 rounded-xl px-4 py-3 mb-3 border border-transparent focus-within:border-blue-900 transition">
          <input type="password" placeholder="Contraseña" class="w-full bg-transparent outline-none text-sm text-gray-700">
        </div>
        <a href="#" class="text-xs text-gray-500 hover:text-gray-900 transition mt-2 mb-4">¿Olvidaste tu contraseña?</a>
        <button class="w-44 bg-sky-600 text-white text-sm font-montserrat py-3 rounded-xl hover:bg-sky-700 transition shadow-md cursor-pointer mt-2">
          Iniciar Sesión
        </button>
    </form>
  </div>

  <!-- Registro -->
  <div 
    class="w-1/2 h-full flex flex-col justify-center items-center px-12 transition-all duration-500 ease-in-out absolute top-0 left-1/2"
    :class="esRegistro ? 'translate-x-0 opacity-100 z-10' : 'translate-x-full opacity-0 z-0'"
  >
  <form class="w-full flex flex-col items-center">
    <h2 class="text-3xl font-montserrat text-gray-950 mb-4">Registrarse</h2>
    <span class="text-xs text-gray-400 mb-4">Ingrese su información para registrarse</span>
    <div class="w-full flex items-center bg-gray-50 rounded-xl px-4 py-3 mb-3 border border-transparent focus-within:border-blue-900 transition">
      <input type="text" placeholder="Nombre" class="w-full bg-transparent outline-none text-sm text-gray-700">
    </div>  

    <div class="w-full flex items-center bg-gray-50 rounded-xl px-4 py-3 mb-3 border border-transparent focus-within:border-blue-900 transition">
      <input type="email" placeholder="Correo electrónico" class="w-full bg-transparent outline-none text-sm text-gray-700">
    </div>

    <div class="w-full flex items-center bg-gray-50 rounded-xl px-4 py-3 mb-3 border border-transparent focus-within:border-blue-900 transition">
      <input type="password" placeholder="Contraseña" class="w-full bg-transparent outline-none text-sm text-gray-700">
    </div>

    <button class="w-44 bg-teal-500 text-white text-sm font-montserrat py-3 rounded-xl hover:bg-teal-600 transition shadow-md cursor-pointer mt-4">
      Registrarse
    </button>
  </form>
  </div>

<!-- Panel de información lateral -->
  <div 
    class="absolute top-0 left-0 w-1/2 h-full transition-all duration-500 ease-in-out z-20 flex items-center justify-center text-white px-12 text-center overflow-hidden"
    :class="esRegistro 
      ? 'translate-x-0 bg-teal-500 rounded-r-[100px] rounded-l-none' 
      : 'translate-x-full bg-sky-600 rounded-l-[100px] rounded-r-none'"
  >
    <div v-if="!esRegistro" class="flex flex-col items-center animate-fade-in">
      <h3 class="text-4xl font-montserrat mb-4">¡Bienvenido!</h3>
      <p class="text-sm opacity-80 mb-8 max-w-[280px]">Regístrese con sus datos personales para utilizar todas las funciones del sitio</p>
      <button 
        @click="esRegistro = true" 
        class="px-10 py-2.5 border-2 border-white rounded-xl text-sm font-montserrat hover:bg-white hover:text-[#0B2545] transition cursor-pointer"
      >
        Registrarse
      </button>
    </div>

    <div v-else class="flex flex-col items-center animate-fade-in">
      <h3 class="text-4xl font-montserrat mb-4">¡Hola de nuevo!</h3>
      <p class="text-sm opacity-80 mb-8 max-w-[280px]">Inicie sesión con sus datos personales para acceder a la plataforma de monitoreo</p>
      <button 
        @click="esRegistro = false" 
        class="px-10 py-2.5 border-2 border-white rounded-xl text-sm font-montserrat hover:bg-white hover:text-[#1e3a8a] transition cursor-pointer"
      >
        Iniciar Sesión
      </button>
    </div>
  </div>

</div>  
</template>

<script setup>
import { ref } from 'vue'

// Variable que controla si estamos en modo registro
const esRegistro = ref(false)
</script>

<style scoped>
/* Animación pequeña para suavizar el cambio de los textos en el panel */
.animate-fade-in {
  animation: fadeIn 0.4s ease-in-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
</style>