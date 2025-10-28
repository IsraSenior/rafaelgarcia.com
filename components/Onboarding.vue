<script setup lang="ts">
const store = useMainStore();
import { ref, computed, nextTick } from 'vue'
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

/** Tipos */
interface Option { value: 0 | 1 | 2 | 3; label: string }
interface Variable {
  id: string // id único de pregunta
  key: string
  label: string // NO se muestra en el wizard, sólo en resultados
  question: string
  feedback: Record<Option['value'], string>
}
interface Dimension {
  key: string
  label: string
  variables: Variable[]
}

let currentDim = ref(0);
let currentSub = ref(0);

// 1) DATA - Cargar desde Directus --------------------------------------------
const { getOnboardingTest } = useDirectus()
const { data: testData } = await useAsyncData(
  'onboarding-test',
  () => getOnboardingTest(),
  {
    // Deshabilitar caché para obtener siempre datos frescos
    getCachedData: () => null,
    server: true,
    lazy: false
  }
)

// Hacer que dimensions y options sean computed para que se actualicen cuando testData cambie
const dimensions = computed<Dimension[]>(() => testData.value?.dimensions || [])
const options = computed<Option[]>(() => testData.value?.options || [
  { value: 0, label: 'Casi nunca' },
  { value: 1, label: 'Algunas veces' },
  { value: 2, label: 'A menudo' },
  { value: 3, label: 'Siempre' },
])

// 2) STATE -------------------------------------------------------------------
const showUserForm = ref(false)
const started = ref(false)
const showResults = ref(false)
const testStartTime = ref<number | null>(null)
const submittingResults = ref(false)

// Datos del usuario
const userData = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: ''
})

// Datos técnicos capturados automáticamente
const technicalData = ref({
  userAgent: '',
  browser: '',
  browserVersion: '',
  device: '',
  os: '',
  osVersion: '',
  screenResolution: '',
  language: '',
  timezone: '',
  ip: '',
  country: '',
  city: '',
  timestamp: ''
})

// aplanar preguntas en orden (por dimensión, luego variable)
const questions = computed(() => dimensions.value.flatMap(d => d.variables.map(v => ({ id: v.id, text: v.question, dimensionKey: d.key, variableKey: v.key }))))
const totalQuestions = computed(() => questions.value.length)
const step = ref(0)
const answers = ref<Record<string, { value: number; timestamp: string }>>({})

// Template ref para el botón de siguiente
const nextButton = ref<HTMLButtonElement | null>(null)

// 3) COMPUTED ---------------------------------------------------------------
const currentQuestion = computed(() => questions.value[step.value])

// Verificar si la pregunta actual tiene respuesta
const currentQuestionAnswered = computed(() => {
  return answers.value[currentQuestion.value?.id]?.value !== undefined
})

function answerFor(questionId: string) {
  return answers.value[questionId]?.value ?? 0
}

function labelFromValue(v?: number) {
  const found = options.value.find(o => o.value === v)
  return found ? found.label : '—'
}

// puntajes por pilar (promedio % de sus variables)
const scores = computed(() => {
  return dimensions.value.map(d => {
    const vals = d.variables.map(v => answerFor(v.id))
    const pct = Math.round((vals.reduce((a, b) => a + b, 0) / (vals.length * 3)) * 100)
    return { key: d.key, label: d.label, score: pct }
  })
})

const strongest = computed(() => scores.value.reduce((a, b) => (b.score > a.score ? b : a)))
const weakest = computed(() => scores.value.reduce((a, b) => (b.score < a.score ? b : a)))

const chartData = computed(() => ({
  labels: scores.value.map(s => s.label),
  datasets: [
    {
      label: 'Resultado',
      data: scores.value.map(s => s.score),
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

// 4) METHODS -----------------------------------------------------------------
// Capturar datos técnicos del usuario
async function captureTechnicalData() {
  try {
    const ua = navigator.userAgent
    technicalData.value.userAgent = ua
    technicalData.value.language = navigator.language
    technicalData.value.screenResolution = `${window.screen.width}x${window.screen.height}`
    technicalData.value.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    technicalData.value.timestamp = new Date().toISOString()

    // Detectar browser y versión
    const browserInfo = detectBrowser(ua)
    technicalData.value.browser = browserInfo.name
    technicalData.value.browserVersion = browserInfo.version

    // Detectar OS
    const osInfo = detectOS(ua)
    technicalData.value.os = osInfo.name
    technicalData.value.osVersion = osInfo.version

    // Detectar tipo de dispositivo
    technicalData.value.device = detectDevice(ua)

    // Obtener IP y ubicación (desde API)
    try {
      const ipData = await $fetch('https://ipapi.co/json/')
      technicalData.value.ip = ipData.ip || ''
      technicalData.value.country = ipData.country_name || ''
      technicalData.value.city = ipData.city || ''
    } catch (error) {
      console.log('No se pudo obtener datos de IP/ubicación')
    }
  } catch (error) {
    console.error('Error capturando datos técnicos:', error)
  }
}

// Detectar navegador
function detectBrowser(ua: string) {
  let name = 'Unknown'
  let version = 'Unknown'

  if (ua.includes('Firefox/')) {
    name = 'Firefox'
    version = ua.match(/Firefox\/([0-9.]+)/)?.[1] || 'Unknown'
  } else if (ua.includes('Edg/')) {
    name = 'Edge'
    version = ua.match(/Edg\/([0-9.]+)/)?.[1] || 'Unknown'
  } else if (ua.includes('Chrome/')) {
    name = 'Chrome'
    version = ua.match(/Chrome\/([0-9.]+)/)?.[1] || 'Unknown'
  } else if (ua.includes('Safari/')) {
    name = 'Safari'
    version = ua.match(/Version\/([0-9.]+)/)?.[1] || 'Unknown'
  }

  return { name, version }
}

// Detectar sistema operativo
function detectOS(ua: string) {
  let name = 'Unknown'
  let version = 'Unknown'

  if (ua.includes('Windows')) {
    name = 'Windows'
    if (ua.includes('Windows NT 10.0')) version = '10/11'
    else if (ua.includes('Windows NT 6.3')) version = '8.1'
    else if (ua.includes('Windows NT 6.2')) version = '8'
    else if (ua.includes('Windows NT 6.1')) version = '7'
  } else if (ua.includes('Mac OS X')) {
    name = 'macOS'
    version = ua.match(/Mac OS X ([0-9_]+)/)?.[1]?.replace(/_/g, '.') || 'Unknown'
  } else if (ua.includes('Android')) {
    name = 'Android'
    version = ua.match(/Android ([0-9.]+)/)?.[1] || 'Unknown'
  } else if (ua.includes('iOS') || ua.includes('iPhone') || ua.includes('iPad')) {
    name = 'iOS'
    version = ua.match(/OS ([0-9_]+)/)?.[1]?.replace(/_/g, '.') || 'Unknown'
  } else if (ua.includes('Linux')) {
    name = 'Linux'
  }

  return { name, version }
}

// Detectar tipo de dispositivo
function detectDevice(ua: string) {
  if (ua.includes('Mobile') || ua.includes('Android')) return 'Mobile'
  if (ua.includes('Tablet') || ua.includes('iPad')) return 'Tablet'
  return 'Desktop'
}

// Iniciar onboarding - mostrar formulario
function start() {
  showUserForm.value = true
  captureTechnicalData()
}

// Validar y continuar al test
function startTest() {
  // Validar que al menos tenga email
  if (!userData.value.email || !userData.value.email.includes('@')) {
    alert('Por favor ingresa un email válido')
    return
  }

  if (!userData.value.firstName || !userData.value.lastName) {
    alert('Por favor ingresa tu nombre y apellido')
    return
  }

  showUserForm.value = false
  started.value = true
  testStartTime.value = Date.now() // Registrar tiempo de inicio
}

function selectOption(id: string, value: Option['value']) {
  answers.value[id] = {
    value: value,
    timestamp: new Date().toISOString()
  }
  // Enfocar el botón de siguiente después de seleccionar una opción
  nextTick(() => {
    nextButton.value?.focus()
  })
}

// Enviar resultados del test a Directus
async function submitTestResults() {
  if (submittingResults.value) return // Evitar envíos duplicados

  submittingResults.value = true

  try {
    // Calcular tiempo de completación en segundos
    const completionTime = testStartTime.value
      ? Math.round((Date.now() - testStartTime.value) / 1000)
      : null

    // Calcular puntaje promedio
    const averageScore = Math.round(
      scores.value.reduce((sum, s) => sum + s.score, 0) / scores.value.length
    )

    // Preparar datos para enviar
    const payload = {
      firstName: userData.value.firstName,
      lastName: userData.value.lastName,
      email: userData.value.email,
      phone: userData.value.phone,
      technicalData: technicalData.value,
      answers: answers.value,
      scores: scores.value,
      strongest: strongest.value,
      weakest: weakest.value,
      averageScore: averageScore,
      completionTime: completionTime
    }

    // Enviar a la API
    const response = await $fetch('/api/test-responses/submit', {
      method: 'POST',
      body: payload
    })

    if (!response.success) {
      console.error('Error al enviar resultados:', response.errors)
    } else {
      console.log('Resultados enviados exitosamente:', (response as any).response_id)
    }
  } catch (error) {
    console.error('Error al enviar resultados del test:', error)
  } finally {
    submittingResults.value = false
  }
}

async function nextStep() {
  if (step.value < totalQuestions.value - 1) {
    step.value++
  } else {
    // Enviar resultados antes de mostrar la pantalla de resultados
    await submitTestResults()
    showResults.value = true
  }
}
function prevStep() { if (step.value > 0) step.value-- }
function reset() {
  step.value = 0
  answers.value = {}
  showResults.value = false
  started.value = false
  showUserForm.value = false
  testStartTime.value = null
  submittingResults.value = false
  userData.value = { firstName: '', lastName: '', email: '', phone: '' }
  technicalData.value = {
    userAgent: '',
    browser: '',
    browserVersion: '',
    device: '',
    os: '',
    osVersion: '',
    screenResolution: '',
    language: '',
    timezone: '',
    ip: '',
    country: '',
    city: '',
    timestamp: ''
  }
}

function feedbackFor(v: Variable) {
  const val = answerFor(v.id) as Option['value']
  return v.feedback[val] || ''
}
</script>

<template>
  <div v-if="store.openOnboarding">
    <div id="dialog" aria-labelledby="dialog-title"
      class="fixed inset-0 overflow-y-auto bg-transparent size-auto max-h-none max-w-none backdrop:bg-transparent z-20">
      <div
        class="fixed inset-0 transition-opacity bg-primary/75 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in">
      </div>

      <div tabindex="0"
        class="flex items-end justify-center min-h-full p-4 text-center focus:outline-none sm:items-center sm:p-0">
        <div
          class="relative px-4 pt-5 pb-4 text-left transition-all transform bg-white shadow-xl rounded-3xl gradient-muted data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-3xl sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95">
          <div>
            <button class="absolute text-white cursor-pointer -top-10 -right-10 hover:text-secondary-estabilizar"
              @click.prevent="store.openOnboarding = false">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-10">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
            <div class="mt-3 text-center sm:mt-5">
              <div class="max-w-2xl px-4 py-12 mx-auto">
                <!-- INTRO -->
                <div v-if="!started && !showResults && !showUserForm" class="space-y-6 text-center">
                  <h1 class="text-3xl font-literata text-[color:var(--color-primary)]">Bienvenido a tu
                    Onboarding</h1>
                  <p class="text-[color:var(--color-paragraph)] max-w-xl mx-auto">
                    Responde preguntas breves sobre 6 dimensiones del ser humano. Al final te mostraremos
                    tu resultado por <strong>pilar</strong> con un gráfico y recomendaciones
                    por <strong>variable</strong>.
                  </p>
                  <button @click="start"
                    class="px-6 py-3 rounded-xl text-white bg-[color:var(--color-secondary-sanar)] hover:bg-[color:var(--color-secondary-crecer)] transition-colors">
                    Comenzar
                  </button>
                </div>

                <!-- FORMULARIO DE DATOS DEL USUARIO -->
                <div v-else-if="showUserForm && !started && !showResults" class="space-y-6">
                  <h1 class="text-3xl text-center font-literata text-[color:var(--color-primary)]">Cuéntanos sobre ti</h1>
                  <p class="text-center text-[color:var(--color-paragraph)] max-w-xl mx-auto">
                    Antes de comenzar, queremos conocerte un poco mejor. Por favor completa la siguiente información.
                  </p>

                  <form @submit.prevent="startTest" class="space-y-4">
                    <div class="grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-2">
                      <div>
                        <label for="firstName" class="block mb-2 text-sm font-medium text-left text-[color:var(--color-primary)]">
                          Nombre <span class="text-red-500">*</span>
                        </label>
                        <input
                          id="firstName"
                          v-model="userData.firstName"
                          type="text"
                          required
                          class="w-full px-4 py-2.5 border border-[color:var(--color-muted)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[color:var(--color-secondary-sanar)]"
                          placeholder="Tu nombre"
                        />
                      </div>

                      <div>
                        <label for="lastName" class="block mb-2 text-sm font-medium text-left text-[color:var(--color-primary)]">
                          Apellido <span class="text-red-500">*</span>
                        </label>
                        <input
                          id="lastName"
                          v-model="userData.lastName"
                          type="text"
                          required
                          class="w-full px-4 py-2.5 border border-[color:var(--color-muted)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[color:var(--color-secondary-sanar)]"
                          placeholder="Tu apellido"
                        />
                      </div>

                      <div>
                        <label for="email" class="block mb-2 text-sm font-medium text-left text-[color:var(--color-primary)]">
                          Correo electrónico <span class="text-red-500">*</span>
                        </label>
                        <input
                          id="email"
                          v-model="userData.email"
                          type="email"
                          required
                          class="w-full px-4 py-2.5 border border-[color:var(--color-muted)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[color:var(--color-secondary-sanar)]"
                          placeholder="tu@email.com"
                        />
                      </div>

                      <div>
                        <label for="phone" class="block mb-2 text-sm font-medium text-left text-[color:var(--color-primary)]">
                          Teléfono <span class="text-xs text-[color:var(--color-paragraph)]">(opcional)</span>
                        </label>
                        <input
                          id="phone"
                          v-model="userData.phone"
                          type="tel"
                          class="w-full px-4 py-2.5 border border-[color:var(--color-muted)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[color:var(--color-secondary-sanar)]"
                          placeholder="+57 300 123 4567"
                        />
                      </div>
                    </div>

                    <div class="pt-4">
                      <button
                        type="submit"
                        class="w-full px-6 py-3 rounded-xl text-white bg-[color:var(--color-secondary-sanar)] hover:bg-[color:var(--color-secondary-crecer)] transition-colors"
                      >
                        Comenzar el test
                      </button>
                    </div>
                  </form>
                </div>

                <!-- Loading state -->
                <div v-else-if="started && !showResults && !currentQuestion" class="text-center py-10">
                  <p class="text-[color:var(--color-paragraph)]">Cargando preguntas...</p>
                </div>

                <!-- WIZARD -->
                <div v-else-if="started && !showResults && currentQuestion">
                  <!-- progress -->
                  <div class="flex items-center mb-6">
                    <div class="flex-1 h-2 rounded-full bg-[color:var(--color-muted)] overflow-hidden">
                      <div class="h-full bg-[color:var(--color-secondary-sanar)] transition-all"
                        :style="{ width: `${((step + 1) / totalQuestions) * 100}%` }" />
                    </div>
                    <span class="ml-3 text-sm text-[color:var(--color-paragraph)]">
                      {{ step + 1 }} / {{ totalQuestions }}
                    </span>
                  </div>

                  <!-- question text (no variable shown) -->
                  <h2 class="text-2xl font-literata text-[color:var(--color-primary)] mb-6">
                    {{ currentQuestion.text }}
                  </h2>
                  <!-- <p class="text-sm text-[color:var(--color-paragraph)] mb-4">
                    <span class="text-red-500">*</span> Esta pregunta es obligatoria
                  </p> -->

                  <!-- options as button group -->
                  <div class="flex flex-wrap items-center justify-center gap-2 mb-6">
                    <button v-for="opt in options" :key="opt.value" type="button"
                      @click="selectOption(currentQuestion.id, opt.value)" :class="[
                        'px-3 py-2 rounded-xl border text-sm transition-colors',
                        answers[currentQuestion.id]?.value === opt.value
                          ? 'bg-[color:var(--color-secondary-crecer)] text-white border-transparent'
                          : 'bg-white hover:bg-[color:var(--color-muted)] border-[color:var(--color-muted)]'
                      ]">
                      {{ opt.label }}
                    </button>
                  </div>

                  <!-- nav -->
                  <div class="flex justify-between">
                    <button class="px-4 py-2 border rounded-xl disabled:opacity-50 disabled:cursor-not-allowed" :disabled="step === 0" @click="prevStep">Atrás</button>
                    <button
                      ref="nextButton"
                      class="px-4 py-2 rounded-xl text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      :class="currentQuestionAnswered ? 'bg-[color:var(--color-secondary-sanar)] hover:bg-[color:var(--color-secondary-crecer)]' : 'bg-gray-400'"
                      :disabled="!currentQuestionAnswered"
                      @click="nextStep">
                      {{ step === totalQuestions - 1 ? 'Ver resultados' : 'Siguiente' }}
                    </button>
                  </div>
                </div>

                <!-- RESULTS -->
                <div v-else>
                  <div class="grid grid-cols-1 gap-10 md:grid-cols-2">

                    <!-- details by variable -->
                    <div class="flex flex-col justify-start space-y-4">

                      <div
                        class="relative flex rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-muted shadow-xs outline-none">
                        <select v-model="currentDim" @change="currentSub = 0;"
                          class="z-10 w-full outline-none appearance-none">
                          <option v-for="(dim, index) in dimensions" :key="dim.key" :value="index">
                            {{ dim.label }}
                          </option>
                        </select>

                        <!-- Flecha custom -->
                        <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                            :class="['size-4']">
                            <path fill-rule="evenodd"
                              d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                              clip-rule="evenodd" />
                          </svg>
                        </div>
                      </div>


                      <div class="overflow-hidden border rounded-2xl border-primary">
                        <div v-for="(v, subIndex) in dimensions[currentDim].variables" :key="v.key"
                          class="p-4 text-left border-t first:border-t-0 border-primary">
                          <div class="flex items-start justify-between gap-4 ">
                            <div @click.prevent="currentSub = subIndex" class="w-full">
                              <div class="flex items-center justify-between w-full">
                                <h4 class="font-semibold text-[color:var(--color-primary)]">
                                  {{ v.label }}</h4>

                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                                  :class="['size-4 transform', { 'rotate-180': subIndex === currentSub }]">
                                  <path fill-rule="evenodd"
                                    d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                                    clip-rule="evenodd" />
                                </svg>
                              </div>
                              <div class="">
                                <p class="text-xs text-[color:var(--color-paragraph)]">
                                  Respuesta: {{ labelFromValue(answerFor(v.id)) }}</p>
                              </div>
                            </div>
                          </div>
                          <p v-if="currentSub === subIndex"
                            class="mt-2 text-[color:var(--color-primary)] whitespace-pre-line text-sm">
                            {{ feedbackFor(v) }}</p>
                        </div>
                      </div>

                    </div>

                    <!-- Graph -->
                    <div>
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

                      <div class="flex justify-center gap-3 mt-10">
                        <button
                          class="px-4 py-2 transition-all duration-300 ease-in-out border rounded-xl border-primary hover:bg-primary hover:text-muted"
                          @click="reset">Repetir test</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>