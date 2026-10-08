<!-- Estructura de la pantalla --> 
<template>
    <!-- Espacio para la barra de navegación --> 
    <div class="flex flex-col h-screen w-screen overflow-hidden bg-gray-50">
        <BarraNavegacion />

        <!-- Espacio para la barra lateral --> 
        <div class="flex flex-1 overflow-hidden">
            <BarraLateral />

            <!-- Espacio para el contenido principal, es decir, el mapa --> 
            <main class="flex-1 relative">
                <ComponenteMapa />
            </main>
        </div>
    </div>
</template>

<script setup>
// Importamos los componentes que vamos a usar en esta vista
import BarraNavegacion from '../components/layout/BarraNavegacion.vue' // Importamos la barra de navegación
import BarraLateral from '../components/layout/BarraLateral.vue' // Importamos la barra lateral
import ComponenteMapa from '../components/map/VistaMapa.vue' // Importamos el componente del mapa
</script>