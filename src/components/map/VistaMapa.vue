<template>
  <!-- vista del mapa -->
  <div class="w-full h-full relative">
    <div id="mapa-bacalar" class="absolute inset-0 z-0 bg-[#e5ebf0]"></div>
  </div>
</template>

<script setup>
import { onMounted, watch } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

import { capaActiva, capasDisponibles, fechaSeleccionada } from '../../estadoMapa.js'

let mapa = null
const capasLeaflet = {}

const configuracionCapas = Object.entries(capasDisponibles).map(([id, config]) => ({
  id,
  idGeoServer: config.layer
}))

const construirCapa = (capaId) => {
  const config = capasDisponibles[capaId]
  const fecha = fechaSeleccionada.value

  return L.tileLayer.wms('https://citqroo.chetumal.tecnm.mx/geoserver/wms', {
    layers: config.layer,
    format: 'image/png',
    transparent: true,
    opacity: 0.8,
    version: '1.1.1',
    time: fecha
  })
}

const actualizarCapaActiva = () => {
  if (!mapa) return

  Object.values(capasLeaflet).forEach(capaImagen => {
    if (mapa.hasLayer(capaImagen)) {
      mapa.removeLayer(capaImagen)
    }
  })

  const capaId = capaActiva.value
  const clave = `${capaId}-${fechaSeleccionada.value}`

  if (!capasLeaflet[clave]) {
    capasLeaflet[clave] = construirCapa(capaId)
  }

  mapa.addLayer(capasLeaflet[clave])
}

onMounted(() => {
  mapa = L.map('mapa-bacalar', {
    zoomControl: false,
    attributionControl: false
  }).setView([18.67, -88.39], 10)

  // Agregar capa base de OpenStreetMap
  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  maxZoom: 19
}).addTo(mapa)

  L.control.zoom({ position: 'topright' }).addTo(mapa)

  configuracionCapas.forEach(capa => {
    capasLeaflet[`${capa.id}-${fechaSeleccionada.value}`] = construirCapa(capa.id)
  })

  actualizarCapaActiva()

  setTimeout(() => {
    if (mapa) mapa.invalidateSize()
  }, 200)
})

watch([capaActiva, fechaSeleccionada], actualizarCapaActiva)
</script>