<script setup lang="ts">
import { Radar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

const route = useRoute()
const testId = route.params.id

// Fetch test results
const { data: testResults, error, pending } = await useAsyncData(
  `test-results-${testId}`,
  () => $fetch(`/api/test-responses/${testId}`),
  {
    getCachedData: () => null,
  }
)

const response = computed(() => testResults.value?.data?.response)
const config = computed(() => testResults.value?.data?.config)

// Verificar si hay error o no hay datos
const hasError = computed(() => error.value || !testResults.value?.success)

// Reorganizar las dimensiones y opciones
const dimensions = computed(() => config.value?.dimensions || [])
const options = computed(() => config.value?.options || [
  { value: 0, label: 'Casi nunca' },
  { value: 1, label: 'Algunas veces' },
  { value: 2, label: 'A menudo' },
  { value: 3, label: 'Siempre' },
])

// Estado para navegación de dimensiones
const currentDim = ref(0)
const currentSub = ref(0)

// Funciones de ayuda
function answerFor(questionId: string) {
  const answerObj = response.value?.answers?.[questionId]
  if (answerObj && typeof answerObj === 'object' && 'value' in answerObj) {
    return answerObj.value ?? 0
  }
  return 0
}

function labelFromValue(v?: number) {
  const found = options.value.find(o => o.value === v)
  return found ? found.label : '—'
}

function feedbackFor(v: any) {
  const val = answerFor(v.id)
  return v.feedback?.[val] || ''
}

// Datos del gráfico
const chartData = computed(() => ({
  labels: dimensions.value.map((d: any) => d.label),
  datasets: [
    {
      label: 'Resultado',
      data: dimensions.value.map((d: any) => {
        const vars = d.variables || []
        const vals = vars.map((v: any) => answerFor(v.id))
        const pct = Math.round((vals.reduce((a: number, b: number) => a + b, 0) / (vals.length * 3)) * 100)
        return pct
      }),
      fill: true,
      backgroundColor: 'rgba(66, 168, 252, 0.25)',
      borderColor: 'rgba(66, 168, 252, 1)',
      pointBackgroundColor: 'rgba(66, 168, 252, 1)'
    }
  ]
}))

const chartOptions = {
  maintainAspectRatio: false,
  scales: {
    r: { beginAtZero: true, max: 100, ticks: { stepSize: 20 } }
  },
  plugins: { legend: { display: false } }
}

// Puntajes calculados
const scores = computed(() => response.value?.scores || [])
const strongest = computed(() => scores.value.reduce((a: any, b: any) => (b.score > a.score ? b : a), { label: '', score: 0 }))
const weakest = computed(() => scores.value.reduce((a: any, b: any) => (b.score < a.score ? b : a), { label: '', score: 100 }))

// Formatear fecha
function formatDate(date: string) {
  if (!date) return ''
  return new Intl.DateTimeFormat('es-CO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date))
}

// Formatear tiempo de completación
function formatCompletionTime(seconds: number) {
  if (!seconds) return 'N/A'
  const minutes = Math.floor(seconds / 60)
  const secs = seconds % 60
  if (minutes > 0) {
    return `${minutes} min ${secs} seg`
  }
  return `${secs} seg`
}

// Meta tags
useHead({
  title: `Resultados del Test - ${response.value?.first_name} ${response.value?.last_name}`,
  meta: [
    { name: 'description', content: 'Resultados del test de diagnóstico de las 6 dimensiones del ser humano' },
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})
</script>

<template>
  <div class="min-h-screen py-20 gradient-muted">
    <!-- Error State -->
    <div v-if="hasError" class="container px-4 mx-auto max-w-4xl">
      <div class="p-8 text-center bg-white shadow-xl rounded-3xl">
        <div class="mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-20 h-20 mx-auto text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h1 class="mb-4 text-3xl font-literata text-[color:var(--color-primary)]">Test No Encontrado</h1>
        <p class="mb-6 text-[color:var(--color-paragraph)]">
          Lo sentimos, no pudimos encontrar los resultados del test que estás buscando.
        </p>
        <NuxtLink to="/"
          class="inline-block px-6 py-3 rounded-xl text-white bg-[color:var(--color-secondary-sanar)] hover:bg-[color:var(--color-secondary-crecer)] transition-colors">
          Volver al inicio
        </NuxtLink>
      </div>
    </div>

    <!-- Loading State -->
    <div v-else-if="pending" class="container px-4 mx-auto max-w-4xl">
      <div class="p-8 text-center bg-white shadow-xl rounded-3xl">
        <div class="mb-4">
          <div class="inline-block w-16 h-16 border-4 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
        </div>
        <p class="text-[color:var(--color-paragraph)]">Cargando resultados...</p>
      </div>
    </div>

    <!-- Results Content -->
    <div v-else class="container px-4 mx-auto max-w-7xl">
      <!-- Header -->
      <div class="max-w-4xl p-8 mx-auto mb-10 bg-white shadow-xl rounded-3xl">
        <div class="text-center">
          <h1 class="mb-4 text-4xl font-literata text-[color:var(--color-primary)]">
            Resultados del Test de Diagnóstico
          </h1>
          <p class="text-xl text-[color:var(--color-paragraph)] mb-6">
            {{ response?.first_name }} {{ response?.last_name }}
          </p>

          <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div class="p-4 rounded-xl bg-[color:var(--color-muted)]">
              <p class="text-sm text-[color:var(--color-paragraph)]">Fecha</p>
              <p class="font-semibold text-[color:var(--color-primary)]">
                {{ formatDate(response?.date_created) }}
              </p>
            </div>

            <div class="p-4 rounded-xl bg-[color:var(--color-muted)]">
              <p class="text-sm text-[color:var(--color-paragraph)]">Tiempo</p>
              <p class="font-semibold text-[color:var(--color-primary)]">
                {{ formatCompletionTime(response?.completion_time) }}
              </p>
            </div>

            <div class="p-4 rounded-xl bg-[color:var(--color-muted)]">
              <p class="text-sm text-[color:var(--color-paragraph)]">Puntaje Promedio</p>
              <p class="font-semibold text-[color:var(--color-primary)]">
                {{ response?.average_score }}%
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Results -->
      <div class="max-w-6xl p-8 mx-auto bg-white shadow-xl rounded-3xl">
        <div class="grid grid-cols-1 gap-10 md:grid-cols-2">

          <!-- Details by variable -->
          <div class="flex flex-col justify-start space-y-4">
            <h2 class="text-2xl font-literata text-[color:var(--color-primary)] mb-4">
              Análisis Detallado
            </h2>

            <div class="relative flex px-3.5 py-2.5 text-sm font-semibold rounded-md shadow-xs outline-none bg-primary text-muted">
              <select v-model="currentDim" @change="currentSub = 0"
                class="z-10 w-full outline-none appearance-none">
                <option v-for="(dim, index) in dimensions" :key="dim.key" :value="index">
                  {{ dim.label }}
                </option>
              </select>

              <!-- Custom arrow -->
              <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                  class="size-4">
                  <path fill-rule="evenodd"
                    d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                    clip-rule="evenodd" />
                </svg>
              </div>
            </div>

            <div class="overflow-hidden border rounded-2xl border-primary">
              <div v-for="(v, subIndex) in dimensions[currentDim]?.variables" :key="v.key"
                class="p-4 text-left border-t first:border-t-0 border-primary">
                <div class="flex items-start justify-between gap-4">
                  <div @click="currentSub = subIndex" class="w-full cursor-pointer">
                    <div class="flex items-center justify-between w-full">
                      <h4 class="font-semibold text-[color:var(--color-primary)]">
                        {{ v.label }}
                      </h4>

                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                        :class="['size-4 transform transition-transform', { 'rotate-180': subIndex === currentSub }]">
                        <path fill-rule="evenodd"
                          d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                          clip-rule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p class="text-xs text-[color:var(--color-paragraph)]">
                        Respuesta: {{ labelFromValue(answerFor(v.id)) }}
                      </p>
                    </div>
                  </div>
                </div>
                <div v-if="currentSub === subIndex"
                  class="mt-2 text-sm text-[color:var(--color-primary)] whitespace-pre-line">
                  {{ feedbackFor(v) }}
                </div>
              </div>
            </div>
          </div>

          <!-- Graph -->
          <div>
            <h2 class="text-2xl font-literata text-[color:var(--color-primary)] mb-6">
              Visualización de Resultados
            </h2>

            <div class="w-full h-80">
              <Radar :data="chartData" :options="chartOptions" class="w-full h-full" />
            </div>

            <div class="mt-6 text-center">
              <h3 class="mb-2 text-xl font-medium font-literata">Resumen por pilar</h3>
              <p class="text-[color:var(--color-paragraph)]">
                Fortaleza: <strong>{{ strongest.label }}</strong> ({{ strongest.score }}%).

                Enfoque: <strong>{{ weakest.label }}</strong> ({{ weakest.score }}%).
              </p>
            </div>

            <!-- Contact CTA -->
            <div class="p-6 mt-8 rounded-2xl bg-gradient-to-br from-[rgba(66,168,252,0.1)] to-[rgba(254,132,65,0.1)]">
              <h3 class="mb-3 text-lg font-semibold text-[color:var(--color-primary)]">
                ¿Quieres profundizar en tus resultados?
              </h3>
              <p class="mb-4 text-sm text-[color:var(--color-paragraph)]">
                Agenda una sesión personalizada para crear un plan de transformación basado en tus resultados.
              </p>
              <NuxtLink to="/contacto"
                class="inline-block px-6 py-3 rounded-xl text-white bg-[color:var(--color-secondary-sanar)] hover:bg-[color:var(--color-secondary-crecer)] transition-colors">
                Agendar sesión
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End v-else -->
  </div>
</template>
