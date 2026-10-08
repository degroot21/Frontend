import { ref, computed, watch } from 'vue'

// Formateamos la fecha en formato YYYY-MM-DD para que sea compatible con la API de GeoNode
function formatearFechaYYYYMMDD(fecha) {
  const date = fecha instanceof Date ? fecha : new Date(fecha)

  // Si la fecha no es válida, devolvemos la fecha actual en formato YYYY-MM-DD
  if (Number.isNaN(date.getTime())) {
    return new Date().toISOString().slice(0, 10)
  }

  // Obtenemos el año, mes y día de la fecha
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // Los meses en JavaScript son base 0, por lo que sumamos 1
  const day = String(date.getDate()).padStart(2, '0') // Obtenemos el día del mes

  // Devolvemos la fecha en formato YYYY-MM-DD
  return `${year}-${month}-${day}`
}

// Función para extraer la fecha de una capa a partir de su nombre
function extraerFechaDeCapa(layerName) {
  const match = layerName.match(/(\d{4})(\d{2})(\d{2})/)
  if (!match) return null

  const [, year, month, day] = match
  return `${year}-${month}-${day}` 
}

// Definimos las capas disponibles
export const capasDisponibles = {
  clorofila: {
    label: 'Clorofila',
    layer: 'geonode:chlorophyll_transparente_20251012',
    icon: require('./assets/icons/iconClorofila.png')
  },
  cdom: {
    label: 'CDOM',
    layer: 'geonode:cdom_transparente_20251012',
    icon: require('./assets/icons/iconCDOM.png')
  },
  sdd: {
    label: 'SDD',
    layer: 'geonode:sdd_transparente_20251012',
    icon: require('./assets/icons/iconInformacionDos.png')
  },
  tss20251012: {
    label: 'TSS 2025',
    layer: 'geonode:tss_transparente_20251012_02b53e77bd23c01bff6ebf3a7134b1e8',
    icon: require('./assets/icons/iconInformacion.png')
  },
  tss20260818: {
    label: 'TSS 2026',
    layer: 'geonode:tss_transparente_20260818',
    icon: require('./assets/icons/iconPrueba.png')
  },
  tssColab: {
    label: 'TSS visual',
    layer: 'geonode:tss_visual_colab_20251012',
    icon: require('./assets/icons/iconInformacion.png')
  }
}

// Obtenemos las capas disponibles para la fecha seleccionada
export const capasParaFechaSeleccionada = computed(() => {
  return Object.entries(capasDisponibles)
    .filter(([, capa]) => extraerFechaDeCapa(capa.layer) === fechaSeleccionada.value)
    .reduce((acc, [key, capa]) => {
      acc[key] = capa
      return acc
    }, {})
})

// Obtenemos las fechas disponibles a partir de las capas disponibles, extrayendo la fecha de cada capa y eliminando duplicados
export const fechasDisponibles = computed(() => {
  const fechas = new Set()

  Object.values(capasDisponibles).forEach((capa) => {
    const fecha = extraerFechaDeCapa(capa.layer)
    if (fecha) fechas.add(fecha)
  })

  return Array.from(fechas)
    .sort()
    .map((fechaStr) => {
      const [year, month, day] = fechaStr.split('-').map(Number)
      return new Date(year, month - 1, day) 
    })
})

// Definimos la fecha seleccionada como la primera fecha disponible o la fecha actual si no hay fechas disponibles
export const fechaSeleccionada = ref(
  fechasDisponibles.value.length > 0
    ? formatearFechaYYYYMMDD(fechasDisponibles.value[fechasDisponibles.value.length - 1])
    : formatearFechaYYYYMMDD(new Date())
)

export const capaActiva = ref(
  Object.keys(capasParaFechaSeleccionada.value)[0] || null
)

// Función para establecer la capa activa si existe en las capas disponibles
export function setCapaActiva(nombre) {
  if (capasDisponibles[nombre]) {
    capaActiva.value = nombre
  }
}

// Función para establecer la fecha seleccionada, formateándola en formato YYYY-MM-DD
export function setFechaSeleccionada(fecha) {
  fechaSeleccionada.value = formatearFechaYYYYMMDD(fecha)
}

watch(fechaSeleccionada, () => {
  const disponibles = Object.keys(capasParaFechaSeleccionada.value)
  if (!disponibles.includes(capaActiva.value)) {
    capaActiva.value = disponibles[0] || null
  }
})