<script setup lang="ts">
const store = useMainStore();
import { ref, computed } from 'vue'
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

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
)

interface Question {
    id: string
    text: string
}
interface Pillar {
    key: string
    label: string
    questions: Question[]
}

// 1. DATA --------------------------------------------------------------------
const pillars: Pillar[] = [
    {
        key: 'physical',
        label: 'Físico',
        questions: [
            { id: 'physical-1', text: '¿Duermes al menos 7 horas por noche?' },
            { id: 'physical-2', text: '¿Haces ejercicio 3 veces a la semana?' },
        ],
    },
    {
        key: 'emotional',
        label: 'Emocional',
        questions: [
            { id: 'emotional-1', text: '¿Identificas y nombras tus emociones a diario?' },
            { id: 'emotional-2', text: '¿Practicas técnicas de regulación cuando te sientes alterado/a?' },
        ],
    },
    {
        key: 'mental',
        label: 'Mental',
        questions: [
            { id: 'mental-1', text: '¿Dedicas tiempo a aprender algo nuevo cada semana?' },
            { id: 'mental-2', text: '¿Te resulta fácil mantener la concentración?' },
        ],
    },
    {
        key: 'social',
        label: 'Social',
        questions: [
            { id: 'social-1', text: '¿Te sientes apoyado por tu círculo cercano?' },
            { id: 'social-2', text: '¿Compartes tiempo de calidad con amigos o familia?' },
        ],
    },
    {
        key: 'spiritual',
        label: 'Espiritual',
        questions: [
            { id: 'spiritual-1', text: '¿Practicas meditación, oración o reflexión diaria?' },
            { id: 'spiritual-2', text: '¿Te sientes conectado con un propósito mayor?' },
        ],
    },
    {
        key: 'purpose',
        label: 'Propósito',
        questions: [
            { id: 'purpose-1', text: '¿Sientes que tu trabajo/proyectos reflejan tus valores?' },
            { id: 'purpose-2', text: '¿Tienes metas claras para los próximos 12 meses?' },
        ],
    },
]

// 2. STATE -------------------------------------------------------------------
const started = ref(false)
const step = ref(0)
const answers = ref<Record<string, number>>({})
const options = [
    { value: 0, label: 'Nunca' },
    { value: 1, label: 'A veces' },
    { value: 2, label: 'Frecuente' },
    { value: 3, label: 'Siempre' },
]
const showResults = ref(false)

// 3. COMPUTED ---------------------------------------------------------------
const currentPillar = computed(() => pillars[step.value])
const scores = computed(() => {
    return pillars.map((p) => {
        const total = p.questions.reduce((sum, q) => sum + (answers.value[q.id] ?? 0), 0)
        const max = p.questions.length * 3
        const pct = Math.round((total / max) * 100)
        return { key: p.key, label: p.label, score: pct }
    })
})
const strongest = computed(() => scores.value.reduce((a, b) => (b.score > a.score ? b : a)))
const weakest = computed(() => scores.value.reduce((a, b) => (b.score < a.score ? b : a)))

const chartData = computed(() => ({
    labels: scores.value.map((s) => s.label),
    datasets: [
        {
            label: 'Resultado',
            data: scores.value.map((s) => s.score),
            fill: true,
            backgroundColor: 'rgba(66, 168, 252, 0.25)',
            borderColor: 'rgba(66, 168, 252, 1)',
            pointBackgroundColor: 'rgba(66, 168, 252, 1)',
        },
    ],
}))

const chartOptions = {
    maintainAspectRatio: false,
    scales: {
        r: {
            beginAtZero: true,
            max: 100,
            ticks: { stepSize: 20 },
        },
    },
    plugins: { legend: { display: false } },
}

// 4. METHODS -----------------------------------------------------------------
function start() {
    started.value = true
}
function nextStep() {
    if (step.value < pillars.length - 1) {
        step.value++
    } else {
        showResults.value = true
    }
}
function prevStep() {
    if (step.value > 0) step.value--
}
function reset() {
    step.value = 0
    answers.value = {}
    showResults.value = false
    started.value = false
}
</script>

<template>
    <div v-if="store.openOnboarding">
        <div id="dialog" aria-labelledby="dialog-title"
            class="fixed inset-0 size-auto max-h-none max-w-none overflow-y-auto bg-transparent backdrop:bg-transparent">
            <div
                class="fixed inset-0 bg-primary/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in">
            </div>

            <div tabindex="0"
                class="flex min-h-full items-end justify-center p-4 text-center focus:outline-none sm:items-center sm:p-0">
                <div
                    class="relative transform rounded-lg gradient-muted bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-3xl sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95">
                    <div>
                        <button
                            class="absolute top-5 right-5 text-paragraph hover:text-secondary-estabilizar cursor-pointer"
                            @click.prevent="store.openOnboarding = false">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="size-10">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <div class="mt-3 text-center sm:mt-5">
                            <div class="max-w-2xl mx-auto py-12 px-4">
                                <!-- INTRO STEP -------------------------------------------------------->
                                <div v-if="!started && !showResults" class="text-center space-y-6">
                                    <h1 class="text-3xl font-literata text-primary">
                                        Evalúa tus 6 pilares
                                    </h1>
                                    <p class="text-paragraph max-w-md mx-auto">
                                        Responde unas breves preguntas y descubre tus áreas de fortaleza y de
                                        oportunidad. Sólo te tomará un par de minutos.
                                    </p>
                                    <button @click="start"
                                        class="px-6 py-3 rounded-full text-white bg-secondary-sanar hover:bg-secondary-crecer transition-colors">
                                        Comenzar test
                                    </button>
                                </div>

                                <!-- WIZARD STEPS ------------------------------------------------------>
                                <div v-else-if="started && !showResults">
                                    <!-- Progress bar -->
                                    <div class="flex items-center mb-8">
                                        <div
                                            class="flex-1 h-2 rounded-full bg-[color:var(--color-muted)] overflow-hidden">
                                            <div class="h-full bg-secondary-sanar transition-all"
                                                :style="{ width: `${((step + 1) / pillars.length) * 100}%` }" />
                                        </div>
                                        <span class="ml-3 text-sm font-medium text-paragraph">
                                            {{ step + 1 }} / {{ pillars.length }}
                                        </span>
                                    </div>

                                    <h2 class="text-2xl font-literata text-primary mb-6">
                                        {{ currentPillar.label }}
                                    </h2>

                                    <div class="space-y-6">
                                        <div v-for="q in currentPillar.questions" :key="q.id" class="space-y-2">
                                            <p class="font-public text-primary">{{ q.text }}</p>
                                            <div class="flex justify-center gap-4">
                                                <label v-for="opt in options" :key="opt.value"
                                                    class="flex items-center gap-1 text-sm cursor-pointer">
                                                    <input type="radio"
                                                        class="form-radio accent-secondary-crecer focus:ring-0"
                                                        :name="`q-${q.id}`" :value="opt.value"
                                                        v-model.number="answers[q.id]" />
                                                    {{ opt.label }}
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Navigation buttons -->
                                    <div class="flex justify-between mt-10">
                                        <button class="px-4 py-2 rounded-full border" :disabled="step === 0"
                                            @click="prevStep">
                                            Atrás
                                        </button>
                                        <button
                                            class="px-4 py-2 rounded-full text-white bg-secondary-sanar"
                                            @click="nextStep">
                                            {{ step === pillars.length - 1 ? 'Ver resultados' : 'Siguiente' }}
                                        </button>
                                    </div>
                                </div>

                                <!-- RESULTS ----------------------------------------------------------->
                                <div v-else>
                                    <div class="w-full h-80">
                                        <Radar :data="chartData" :options="chartOptions" class="w-full h-full" />
                                    </div>

                                    <div class="mt-6 text-center">
                                        <h3 class="text-xl font-medium font-literata mb-2">
                                            Áreas de fortaleza y oportunidad
                                        </h3>
                                        <p class="text-paragraph">
                                            Tu pilar más fuerte es <strong>{{ strongest.label }}</strong>
                                            ({{ strongest.score }}%) y el que más atención requiere es
                                            <strong>{{ weakest.label }}</strong> ({{ weakest.score }}%).
                                        </p>
                                        <button class="mt-6 px-4 py-2 rounded-full border" @click="reset">
                                            Repetir test
                                        </button>
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