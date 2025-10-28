<script setup>
const route = useRoute()
const config = useRuntimeConfig()

// Fetch event data
const { data: eventResponse, pending, error } = await useFetch(`/api/events/${route.params.slug}`)

const event = computed(() => eventResponse.value?.data || null)

// Clean description for meta
const cleanDescription = computed(() => {
  if (!event.value?.description) return 'Evento de Rafael García'
  return event.value.description.replace(/<[^>]*>/g, '').substring(0, 160)
})

// Event image URL
const eventImageUrl = computed(() => {
  if (event.value?.image) {
    return `${config.public.directusUrl}/assets/${event.value.image}`
  }
  return `${config.public.siteUrl}/home-5.png`
})

// SEO Meta Tags
useSeoMeta({
  title: computed(() => event.value ? `${event.value.title} | Rafael García` : 'Evento | Rafael García'),
  description: cleanDescription,
  ogTitle: computed(() => event.value ? `${event.value.title} | Rafael García` : 'Evento | Rafael García'),
  ogDescription: cleanDescription,
  ogImage: eventImageUrl,
  ogUrl: computed(() => `${config.public.siteUrl}/eventos/${route.params.slug}`),
  ogType: 'event',
  ogLocale: 'es_CO',
  eventStartTime: computed(() => event.value?.date_start),
  eventEndTime: computed(() => event.value?.date_end),
  eventLocation: computed(() => event.value?.location || event.value?.virtual_link),
  twitterCard: 'summary_large_image',
  twitterTitle: computed(() => event.value ? `${event.value.title} | Rafael García` : 'Evento | Rafael García'),
  twitterDescription: cleanDescription,
  twitterImage: eventImageUrl,
  keywords: computed(() => `${event.value?.title}, evento, taller, Rafael García, transformación personal, ${event.value?.format === 'virtual' ? 'evento virtual' : 'evento presencial'}, Colombia`)
})

useHead({
  htmlAttrs: {
    lang: 'es'
  },
  link: [
    {
      rel: 'canonical',
      href: computed(() => `${config.public.siteUrl}/eventos/${route.params.slug}`)
    }
  ]
})

// Registration form
const form = ref({
  name: '',
  email: '',
  phone: ''
})

const formErrors = ref([])
const isSubmitting = ref(false)

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

// Función para manejar el registro
const handleRegistration = async () => {
  formErrors.value = []

  // Validación básica
  if (!form.value.name.trim()) {
    formErrors.value.push('El nombre es requerido')
  }
  if (!form.value.email.trim()) {
    formErrors.value.push('El email es requerido')
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    formErrors.value.push('El email no es válido')
  }

  if (formErrors.value.length > 0) {
    return
  }

  isSubmitting.value = true

  try {
    const response = await $fetch('/api/events/register', {
      method: 'POST',
      body: {
        event_id: event.value.id,
        name: form.value.name,
        email: form.value.email,
        phone: form.value.phone || null,
        source: 'website'
      }
    })

    if (response.success && response.whatsapp_url) {
      // Redirigir a WhatsApp
      window.location.href = response.whatsapp_url
    } else if (response.errors) {
      formErrors.value = response.errors
      isSubmitting.value = false
    }
  } catch (error) {
    console.error('Error al registrar:', error)
    formErrors.value = ['Hubo un error al procesar tu registro. Por favor, intenta nuevamente.']
    isSubmitting.value = false
  }
}
</script>

<template>
  <div>
    <!-- Loading State -->
    <section v-if="pending" class="py-24">
      <div class="container mx-auto px-5 md:px-10 lg:px-20">
        <div class="text-center">
          <p class="paragraph">Cargando evento...</p>
        </div>
      </div>
    </section>

    <!-- Error State -->
    <section v-else-if="error || !event" class="py-24">
      <div class="container mx-auto px-5 md:px-10 lg:px-20">
        <div class="bg-secondary-estabilizar/10 border-l-4 border-secondary-estabilizar rounded-lg p-6">
          <p class="text-secondary-estabilizar font-semibold">Evento no encontrado</p>
          <p class="paragraph mt-2">El evento que buscas no existe o ha sido eliminado.</p>
          <NuxtLink to="/eventos" class="inline-block mt-4 text-primary hover:text-secondary-crecer transition-colors">
            ← Volver a eventos
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Event Detail -->
    <section v-else class="mt-16 md:mt-24 lg:mt-32">
      <div class="container mx-auto px-5 md:px-10 lg:px-20">
        <!-- Breadcrumb -->
        <nav class="mb-8">
          <NuxtLink to="/eventos" class="text-paragraph hover:text-primary transition-colors">
            ← Volver a eventos
          </NuxtLink>
        </nav>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <!-- Main Content (Left) -->
          <div class="lg:col-span-2">
            <!-- Hero Image -->
            <div class="relative h-80 md:h-96 bg-gradient-to-r from-secondary-sanar/20 to-secondary-crecer/20 rounded-[40px] overflow-hidden mb-8">
              <img
                v-if="event.image"
                :src="`${config.public.directusUrl}/assets/${event.image.id}`"
                :alt="event.title"
                class="w-full h-full object-cover"
              />
              <div v-else class="w-full h-full flex items-center justify-center">
                <span class="text-8xl">📅</span>
              </div>

              <!-- Badges -->
              <div class="absolute top-6 left-6 flex flex-col gap-2">
                <span
                  v-if="event.pricing_type === 'free'"
                  class="inline-block bg-secondary-sanar text-white text-sm font-semibold px-4 py-2 rounded-full"
                >
                  Gratis
                </span>
                <span
                  class="inline-block bg-white/90 text-primary text-sm font-semibold px-4 py-2 rounded-full"
                >
                  {{ getFormatBadge(event.format) }}
                </span>
              </div>
            </div>

            <!-- Title and Meta -->
            <div class="mb-8">
              <h1 class="title title--headline text-primary mb-4">
                {{ event.title }}
              </h1>

              <div class="flex flex-wrap items-center gap-4 text-paragraph">
                <div class="flex items-center gap-2">
                  <span>📅</span>
                  <span>{{ formatDate(event.date_start) }}</span>
                </div>

                <div v-if="event.location" class="flex items-center gap-2">
                  <span>📍</span>
                  <span>{{ event.location }}</span>
                </div>

                <div class="flex items-center gap-2">
                  <span class="text-lg font-bold text-secondary-crecer">
                    {{ formatPrice(event.price) }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Description -->
            <div class="event-description mb-8">
              <div v-html="event.description"></div>
            </div>

            <!-- Event Details -->
            <div class="bg-gradient-to-r from-secondary-sanar/5 to-secondary-crecer/5 rounded-[40px] p-6 md:p-8 mb-8">
              <h3 class="title title--element text-primary mb-4">Detalles del Evento</h3>

              <div class="space-y-3">
                <div class="flex items-start gap-3">
                  <span class="text-xl">🗓️</span>
                  <div>
                    <p class="font-semibold text-primary">Fecha y Hora</p>
                    <p class="paragraph">
                      {{ formatDate(event.date_start) }}
                      <span v-if="event.date_end">
                        - {{ formatDate(event.date_end) }}
                      </span>
                    </p>
                  </div>
                </div>

                <div v-if="event.location" class="flex items-start gap-3">
                  <span class="text-xl">📍</span>
                  <div>
                    <p class="font-semibold text-primary">Ubicación</p>
                    <p class="paragraph">{{ event.location }}</p>
                  </div>
                </div>

                <div v-if="event.virtual_link" class="flex items-start gap-3">
                  <span class="text-xl">💻</span>
                  <div>
                    <p class="font-semibold text-primary">Enlace Virtual</p>
                    <p class="paragraph text-sm">El enlace se compartirá después del registro</p>
                  </div>
                </div>

                <div class="flex items-start gap-3">
                  <span class="text-xl">👤</span>
                  <div>
                    <p class="font-semibold text-primary">Organizador</p>
                    <p class="paragraph">{{ event.organizer_name }}</p>
                  </div>
                </div>

                <div v-if="event.capacity > 0" class="flex items-start gap-3">
                  <span class="text-xl">👥</span>
                  <div>
                    <p class="font-semibold text-primary">Capacidad</p>
                    <p class="paragraph">
                      {{ event.available_spots }} cupos disponibles de {{ event.capacity }}
                    </p>
                  </div>
                </div>

                <div class="flex items-start gap-3">
                  <span class="text-xl">🏷️</span>
                  <div>
                    <p class="font-semibold text-primary">Tipo de Evento</p>
                    <p class="paragraph">{{ getEventTypeBadge(event.event_type) }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Tags -->
            <div v-if="event.tags && event.tags.length > 0" class="flex flex-wrap gap-2">
              <span
                v-for="tag in event.tags"
                :key="tag"
                class="inline-block bg-muted text-paragraph text-sm px-4 py-2 rounded-full"
              >
                #{{ tag }}
              </span>
            </div>
          </div>

          <!-- Registration Form (Right Sidebar) -->
          <div class="lg:col-span-1">
            <div class="sticky top-24">
              <!-- Event Full -->
              <div v-if="event.is_full" class="bg-white rounded-[40px] p-6 md:p-8 shadow-sm">
                <div class="text-center">
                  <span class="text-5xl mb-4 block">😔</span>
                  <h3 class="title title--element text-primary mb-3">Cupos Agotados</h3>
                  <p class="paragraph mb-4">
                    Lo sentimos, este evento ha alcanzado su capacidad máxima.
                  </p>
                  <NuxtLink to="/eventos" class="btn primary w-full">
                    Ver otros eventos
                  </NuxtLink>
                </div>
              </div>

              <!-- Registration Form -->
              <div v-else class="bg-white rounded-[40px] p-6 md:p-8 shadow-sm">
                <h3 class="title title--element text-primary mb-4">Reserva tu Cupo</h3>

                <!-- Price -->
                <div class="bg-gradient-to-r from-secondary-sanar/10 to-secondary-crecer/10 rounded-[20px] p-4 mb-6 text-center">
                  <p class="text-sm text-paragraph mb-1">Precio</p>
                  <p class="text-3xl font-bold text-secondary-crecer">
                    {{ formatPrice(event.price) }}
                  </p>
                </div>

                <!-- Availability -->
                <div v-if="event.capacity > 0" class="mb-6">
                  <div class="flex items-center justify-between text-sm mb-2">
                    <span class="text-paragraph">Disponibilidad</span>
                    <span class="font-semibold text-primary">
                      {{ event.available_spots }} / {{ event.capacity }} cupos
                    </span>
                  </div>
                  <div class="w-full bg-muted rounded-full h-2">
                    <div
                      class="bg-secondary-sanar rounded-full h-2 transition-all"
                      :style="{ width: `${(event.available_spots / event.capacity) * 100}%` }"
                    ></div>
                  </div>
                </div>

                <!-- Form Errors -->
                <div v-if="formErrors.length > 0" class="mb-4 bg-secondary-estabilizar/10 border-l-4 border-secondary-estabilizar rounded-lg p-4">
                  <p class="text-secondary-estabilizar text-sm font-semibold mb-2">Por favor corrige los siguientes errores:</p>
                  <ul class="text-sm text-secondary-estabilizar list-disc list-inside">
                    <li v-for="(error, index) in formErrors" :key="index">{{ error }}</li>
                  </ul>
                </div>

                <!-- Form -->
                <form @submit.prevent="handleRegistration" class="space-y-4">
                  <div>
                    <label for="name" class="block text-sm font-semibold text-primary mb-2">
                      Nombre completo *
                    </label>
                    <input
                      id="name"
                      v-model="form.name"
                      type="text"
                      required
                      class="w-full px-4 py-3 rounded-[20px] border border-muted focus:border-secondary-crecer focus:outline-none transition-colors"
                      placeholder="Tu nombre"
                    />
                  </div>

                  <div>
                    <label for="email" class="block text-sm font-semibold text-primary mb-2">
                      Email *
                    </label>
                    <input
                      id="email"
                      v-model="form.email"
                      type="email"
                      required
                      class="w-full px-4 py-3 rounded-[20px] border border-muted focus:border-secondary-crecer focus:outline-none transition-colors"
                      placeholder="tu@email.com"
                    />
                  </div>

                  <div>
                    <label for="phone" class="block text-sm font-semibold text-primary mb-2">
                      Teléfono (opcional)
                    </label>
                    <input
                      id="phone"
                      v-model="form.phone"
                      type="tel"
                      class="w-full px-4 py-3 rounded-[20px] border border-muted focus:border-secondary-crecer focus:outline-none transition-colors"
                      placeholder="+57 300 123 4567"
                    />
                  </div>

                  <button
                    type="submit"
                    :disabled="isSubmitting"
                    class="btn primary w-full"
                    :class="{ 'opacity-50 cursor-not-allowed': isSubmitting }"
                  >
                    <span v-if="isSubmitting">Procesando...</span>
                    <span v-else>Reservar por WhatsApp →</span>
                  </button>

                  <p class="text-xs text-paragraph text-center">
                    Al reservar, serás redirigido a WhatsApp para confirmar tu registro con el organizador.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Spacing before EndSection -->
    <div class="py-12 md:py-16"></div>

    <!-- End Section -->
    <EndSection />
  </div>
</template>

<style scoped>
.event-description {
  font-size: 1.125rem;
  line-height: 1.75;
  color: #4e555d;
}

.event-description :deep(p) {
  margin-bottom: 1.25rem;
}

.event-description :deep(p:last-child) {
  margin-bottom: 0;
}

.event-description :deep(strong) {
  font-weight: 600;
  color: #313745;
}

.event-description :deep(ul),
.event-description :deep(ol) {
  margin: 1.5rem 0;
  padding-left: 1.75rem;
}

.event-description :deep(ul) {
  list-style-type: disc;
}

.event-description :deep(ol) {
  list-style-type: decimal;
}

.event-description :deep(li) {
  margin-bottom: 0.75rem;
  line-height: 1.75;
}

.event-description :deep(li:last-child) {
  margin-bottom: 0;
}

.event-description :deep(h2) {
  font-family: 'Literata', serif;
  font-size: 1.875rem;
  font-weight: 600;
  color: #313745;
  margin: 2rem 0 1rem 0;
}

.event-description :deep(h3) {
  font-family: 'Literata', serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: #313745;
  margin: 1.5rem 0 0.75rem 0;
}

.event-description :deep(a) {
  color: #fe8441;
  text-decoration: underline;
  transition: color 0.2s;
}

.event-description :deep(a:hover) {
  color: #e56d2d;
}
</style>
