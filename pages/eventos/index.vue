<script setup>
const config = useRuntimeConfig()

// SEO Meta Tags
useSeoMeta({
  title: 'Eventos y Talleres de Transformación Personal | Rafael García',
  description: 'Descubre próximos talleres, retiros y conferencias sobre transformación personal, respiración holotropica, coaching ontológico y bienestar emocional. Eventos presenciales y virtuales.',
  ogTitle: 'Eventos y Talleres de Transformación Personal | Rafael García',
  ogDescription: 'Talleres, retiros y conferencias sobre transformación personal, respiración holotropica y bienestar emocional.',
  ogImage: `${config.public.siteUrl}/home-5.png`,
  ogUrl: `${config.public.siteUrl}/eventos`,
  ogType: 'website',
  ogLocale: 'es_CO',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Eventos y Talleres de Transformación Personal | Rafael García',
  twitterDescription: 'Talleres, retiros y conferencias sobre transformación personal y bienestar emocional.',
  twitterImage: `${config.public.siteUrl}/home-5.png`,
  keywords: 'eventos desarrollo personal, talleres transformación, retiros bienestar, respiración holotropica, conferencias Rafael García, eventos Colombia'
})

useHead({
  htmlAttrs: {
    lang: 'es'
  },
  link: [
    {
      rel: 'canonical',
      href: `${config.public.siteUrl}/eventos`
    }
  ]
})

const { data: eventsData, pending, error } = await useFetch('/api/events', {
  query: {
    upcoming: 'true',
    fields: '*,image.*'
  }
})

// Filtros reactivos
const selectedPricing = ref('all') // all, free, paid
const selectedFormat = ref('all') // all, in_person, virtual, hybrid

// Eventos con filtros aplicados
const events = computed(() => eventsData.value?.data || [])

const filteredEvents = computed(() => {
  return events.value.filter(event => {
    // Filtro por precio
    if (selectedPricing.value !== 'all') {
      if (selectedPricing.value === 'free' && event.pricing_type !== 'free') return false
      if (selectedPricing.value === 'paid' && event.pricing_type !== 'paid') return false
    }

    // Filtro por formato
    if (selectedFormat.value !== 'all' && event.format !== selectedFormat.value) {
      return false
    }

    return true
  })
})

const featuredEvents = computed(() => filteredEvents.value.filter(e => e.featured))
const upcomingEvents = computed(() => filteredEvents.value.filter(e => !e.featured))

// Función para formatear fechas
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('es-CO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

// Función para formatear precio
const formatPrice = (price) => {
  if (!price || price === 0) return 'Gratis'
  const formatted = new Intl.NumberFormat('es-CO', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price)
  return `$${formatted} COP`
}

// Función para obtener el badge del tipo de evento
const getEventTypeBadge = (type) => {
  return type === 'rafael_garcia' ? 'Rafael García' : 'Evento Colaborativo'
}

// Función para obtener el badge del formato
const getFormatBadge = (format) => {
  const formats = {
    'in_person': 'Presencial',
    'virtual': 'Virtual',
    'hybrid': 'Híbrido'
  }
  return formats[format] || format
}
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="mt-16 md:mt-24 lg:mt-32">
      <div class="container mx-auto px-5 md:px-10 lg:px-20">
        <div class="text-center mb-12 md:mb-16">
          <h1 class="title title--headline text-primary mb-6">
            Eventos y Talleres
          </h1>
          <p class="paragraph max-w-3xl mx-auto">
            Únete a nuestros talleres, retiros y conferencias diseñados para acompañarte en tu proceso de
            <span class="font-semibold text-secondary-crecer">transformación personal</span> y
            <span class="font-semibold text-secondary-sanar">bienestar emocional</span>.
          </p>
        </div>
      </div>
    </section>

    <!-- Filtros -->
    <section v-if="!pending && !error && events.length > 0" class="pb-8 md:pb-12">
      <div class="container mx-auto px-5 md:px-10 lg:px-20">
        <div class="bg-white rounded-[40px] p-6 md:p-8 shadow-sm">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <!-- Filtro por Precio -->
            <div>
              <label class="block text-sm font-semibold text-primary mb-3">
                Precio
              </label>
              <div class="flex flex-wrap gap-2">
                <button
                  @click="selectedPricing = 'all'"
                  :class="[
                    'px-4 py-2 rounded-full text-sm font-semibold transition-all',
                    selectedPricing === 'all'
                      ? 'bg-primary text-white'
                      : 'bg-muted text-paragraph hover:bg-primary/10'
                  ]"
                >
                  Todos
                </button>
                <button
                  @click="selectedPricing = 'free'"
                  :class="[
                    'px-4 py-2 rounded-full text-sm font-semibold transition-all',
                    selectedPricing === 'free'
                      ? 'bg-secondary-sanar text-white'
                      : 'bg-muted text-paragraph hover:bg-secondary-sanar/10'
                  ]"
                >
                  Gratis
                </button>
                <button
                  @click="selectedPricing = 'paid'"
                  :class="[
                    'px-4 py-2 rounded-full text-sm font-semibold transition-all',
                    selectedPricing === 'paid'
                      ? 'bg-secondary-crecer text-white'
                      : 'bg-muted text-paragraph hover:bg-secondary-crecer/10'
                  ]"
                >
                  De pago
                </button>
              </div>
            </div>

            <!-- Filtro por Formato -->
            <div>
              <label class="block text-sm font-semibold text-primary mb-3">
                Formato
              </label>
              <div class="flex flex-wrap gap-2">
                <button
                  @click="selectedFormat = 'all'"
                  :class="[
                    'px-4 py-2 rounded-full text-sm font-semibold transition-all',
                    selectedFormat === 'all'
                      ? 'bg-primary text-white'
                      : 'bg-muted text-paragraph hover:bg-primary/10'
                  ]"
                >
                  Todos
                </button>
                <button
                  @click="selectedFormat = 'in_person'"
                  :class="[
                    'px-4 py-2 rounded-full text-sm font-semibold transition-all',
                    selectedFormat === 'in_person'
                      ? 'bg-secondary-estabilizar text-white'
                      : 'bg-muted text-paragraph hover:bg-secondary-estabilizar/10'
                  ]"
                >
                  Presencial
                </button>
                <button
                  @click="selectedFormat = 'virtual'"
                  :class="[
                    'px-4 py-2 rounded-full text-sm font-semibold transition-all',
                    selectedFormat === 'virtual'
                      ? 'bg-secondary-sanar text-white'
                      : 'bg-muted text-paragraph hover:bg-secondary-sanar/10'
                  ]"
                >
                  Virtual
                </button>
                <button
                  @click="selectedFormat = 'hybrid'"
                  :class="[
                    'px-4 py-2 rounded-full text-sm font-semibold transition-all',
                    selectedFormat === 'hybrid'
                      ? 'bg-secondary-crecer text-white'
                      : 'bg-muted text-paragraph hover:bg-secondary-crecer/10'
                  ]"
                >
                  Híbrido
                </button>
              </div>
            </div>
          </div>

          <!-- Resultados -->
          <div class="mt-4 pt-4 border-t border-muted">
            <p class="text-sm text-paragraph">
              <span class="font-semibold text-primary">{{ filteredEvents.length }}</span>
              {{ filteredEvents.length === 1 ? 'evento encontrado' : 'eventos encontrados' }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Loading State -->
    <section v-if="pending" class="py-16">
      <div class="container mx-auto px-5 md:px-10 lg:px-20">
        <div class="text-center">
          <p class="paragraph">Cargando eventos...</p>
        </div>
      </div>
    </section>

    <!-- Error State -->
    <section v-else-if="error" class="py-16">
      <div class="container mx-auto px-5 md:px-10 lg:px-20">
        <div class="bg-secondary-estabilizar/10 border-l-4 border-secondary-estabilizar rounded-lg p-6">
          <p class="text-secondary-estabilizar font-semibold">Error al cargar los eventos</p>
          <p class="paragraph mt-2">Por favor, intenta nuevamente más tarde.</p>
        </div>
      </div>
    </section>

    <!-- Eventos Destacados -->
    <section v-else-if="featuredEvents.length > 0" class="pb-12 md:pb-16">
      <div class="container mx-auto px-5 md:px-10 lg:px-20">
        <h2 class="title title--element text-primary mb-8 md:mb-12">
          Eventos Destacados
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <NuxtLink
            v-for="event in featuredEvents"
            :key="event.id"
            :to="`/eventos/${event.slug}`"
            class="group bg-white rounded-[40px] overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
          >
            <!-- Imagen -->
            <div class="relative h-64 bg-gradient-to-r from-secondary-sanar/20 to-secondary-crecer/20 overflow-hidden">
              <img
                v-if="event.image"
                :src="`${config.public.directusUrl}/assets/${event.image.id}`"
                :alt="event.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div v-else class="w-full h-full flex items-center justify-center">
                <span class="text-6xl">📅</span>
              </div>

              <!-- Badges -->
              <div class="absolute top-4 left-4 flex flex-col gap-2">
                <span
                  v-if="event.pricing_type === 'free'"
                  class="inline-block bg-secondary-sanar text-white text-xs font-semibold px-3 py-1 rounded-full"
                >
                  Gratis
                </span>
                <span
                  class="inline-block bg-white/90 text-primary text-xs font-semibold px-3 py-1 rounded-full"
                >
                  {{ getFormatBadge(event.format) }}
                </span>
              </div>
            </div>

            <!-- Contenido -->
            <div class="p-6 md:p-8">
              <div class="flex items-center gap-2 text-sm text-paragraph mb-3">
                <span>📅</span>
                <span>{{ formatDate(event.date_start) }}</span>
              </div>

              <h3 class="title title--element text-primary mb-3 line-clamp-2">
                {{ event.title }}
              </h3>

              <div class="flex items-center justify-between mt-4 pt-4 border-t border-muted">
                <span class="text-sm font-semibold text-paragraph">
                  {{ getEventTypeBadge(event.event_type) }}
                </span>
                <span class="text-lg font-bold text-secondary-crecer">
                  {{ formatPrice(event.price) }}
                </span>
              </div>

              <!-- Cupos disponibles -->
              <div v-if="event.capacity > 0" class="mt-4">
                <div v-if="event.is_full" class="text-sm text-secondary-estabilizar font-semibold">
                  Cupos agotados
                </div>
                <div v-else class="text-sm text-secondary-sanar">
                  {{ event.available_spots }} cupos disponibles
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Próximos Eventos -->
    <section v-if="upcomingEvents.length > 0" class="py-12 md:py-16 bg-white">
      <div class="container mx-auto px-5 md:px-10 lg:px-20">
        <h2 class="title title--element text-primary mb-8 md:mb-12">
          Próximos Eventos
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <NuxtLink
            v-for="event in upcomingEvents"
            :key="event.id"
            :to="`/eventos/${event.slug}`"
            class="group bg-gradient-to-r from-secondary-sanar/5 to-secondary-crecer/5 rounded-[40px] overflow-hidden hover:shadow-md transition-all duration-300"
          >
            <!-- Imagen -->
            <div class="relative h-48 bg-gradient-to-r from-secondary-sanar/20 to-secondary-crecer/20 overflow-hidden">
              <img
                v-if="event.image"
                :src="`${config.public.directusUrl}/assets/${event.image.id}`"
                :alt="event.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div v-else class="w-full h-full flex items-center justify-center">
                <span class="text-5xl">📅</span>
              </div>

              <!-- Badge formato -->
              <div class="absolute top-4 right-4">
                <span class="inline-block bg-white/90 text-primary text-xs font-semibold px-3 py-1 rounded-full">
                  {{ getFormatBadge(event.format) }}
                </span>
              </div>
            </div>

            <!-- Contenido -->
            <div class="p-6">
              <div class="flex items-center gap-2 text-sm text-paragraph mb-2">
                <span>📅</span>
                <span>{{ formatDate(event.date_start) }}</span>
              </div>

              <h3 class="font-literata text-xl text-primary mb-3 line-clamp-2 font-light">
                {{ event.title }}
              </h3>

              <div class="flex items-center justify-between">
                <span class="text-lg font-bold text-secondary-crecer">
                  {{ formatPrice(event.price) }}
                </span>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Empty State -->
    <section v-if="!pending && !error && events.length === 0" class="py-16 md:py-24">
      <div class="container mx-auto px-5 md:px-10 lg:px-20">
        <div class="text-center max-w-2xl mx-auto">
          <div class="text-6xl mb-6">📅</div>
          <h3 class="title title--element text-primary mb-4">
            No hay eventos programados
          </h3>
          <p class="paragraph">
            Estamos preparando nuevos talleres y eventos. Suscríbete a nuestro boletín para recibir notificaciones cuando haya nuevas fechas disponibles.
          </p>
          <NuxtLink to="/contacto" class="btn primary mt-8">
            Contáctanos
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Spacing before EndSection -->
    <div class="py-12 md:py-16"></div>

    <!-- End Section -->
    <EndSection />
  </div>
</template>
