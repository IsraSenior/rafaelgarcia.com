<script setup lang="ts">
import { computed, ref } from 'vue'
import { eventsCatalog } from '~/data/events'
import type { EventFormatType, EventPriceType } from '~/data/events'

type FilterValue<T extends string> = 'all' | T

const priceFilters: { label: string; value: FilterValue<EventPriceType> }[] = [
  { label: 'Todos', value: 'all' },
  { label: 'Gratuitos', value: 'free' },
  { label: 'De pago', value: 'paid' },
]

const formatFilters: { label: string; value: FilterValue<EventFormatType> }[] = [
  { label: 'Todos', value: 'all' },
  { label: 'Presenciales', value: 'in-person' },
  { label: 'Virtuales', value: 'online' },
]

const selectedPrice = ref<FilterValue<EventPriceType>>('all')
const selectedFormat = ref<FilterValue<EventFormatType>>('all')

const now = computed(() => new Date())

const filteredEvents = computed(() => {
  return eventsCatalog
    .filter((event) =>
      selectedPrice.value === 'all' ? true : event.priceType === selectedPrice.value
    )
    .filter((event) =>
      selectedFormat.value === 'all' ? true : event.format === selectedFormat.value
    )
})

const upcomingEvents = computed(() =>
  [...filteredEvents.value]
    .filter((event) => new Date(event.startDate) >= now.value)
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
)

const pastEvents = computed(() =>
  [...filteredEvents.value]
    .filter((event) => new Date(event.startDate) < now.value)
    .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
)


const formatDate = (iso: string) =>
  new Intl.DateTimeFormat('es-CO', {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
  }).format(new Date(iso))

const formatTimeRange = (startIso: string, endIso: string) => {
  const formatter = new Intl.DateTimeFormat('es-CO', {
    hour: '2-digit',
    minute: '2-digit',
  })

  return `${formatter.format(new Date(startIso))} — ${formatter.format(new Date(endIso))}`
}
</script>

<template>
  <div class="gradient-muted">
    <section class="py-16 md:pt-24 md:pb-12">
      <div class="container px-5 mx-auto lg:px-20">
        <header class="max-w-3xl mx-auto text-center space-y-5">
          <p class="uppercase tracking-[0.3em] text-sm text-primary/70">Agenda</p>
          <h1 class="title title--headline text-primary">
            Encuentra el próximo espacio para tu
            <b>
              <i>
                transformación
                <u class="decoration-secondary-crecer">personal</u>
              </i>
            </b>
          </h1>
          <p class="text-muted">
            Explora experiencias presenciales y virtuales. Usa los filtros para descubrir eventos
            gratuitos, propuestas de inversión o espacios específicos según tu forma de participación.
          </p>
        </header>

        <div class="mt-12 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-start">
          <div class="flex flex-wrap justify-center gap-3">
            <template v-for="filter in priceFilters" :key="filter.value">
              <button
                type="button"
                class="px-5 py-2 rounded-full border transition-colors text-sm font-medium"
                :class="
                  selectedPrice === filter.value
                    ? 'border-primary bg-primary text-white shadow-md'
                    : 'border-primary/30 bg-white text-primary hover:border-primary hover:bg-primary/10'
                "
                @click="selectedPrice = filter.value"
              >
                {{ filter.label }}
              </button>
            </template>
          </div>
          <div class="flex flex-wrap justify-center gap-3">
            <template v-for="filter in formatFilters" :key="filter.value">
              <button
                type="button"
                class="px-5 py-2 rounded-full border transition-colors text-sm font-medium"
                :class="
                  selectedFormat === filter.value
                    ? 'border-secondary-sanar bg-secondary-sanar text-white shadow-md'
                    : 'border-secondary-sanar/30 bg-white text-secondary-sanar hover:border-secondary-sanar hover:bg-secondary-sanar/10'
                "
                @click="selectedFormat = filter.value"
              >
                {{ filter.label }}
              </button>
            </template>
          </div>
        </div>

        <section class="mt-20 space-y-10">
          <header class="flex items-center justify-between flex-wrap gap-5">
            <div>
              <h2 class="text-2xl font-semibold text-primary">Próximos eventos</h2>
              <p class="text-muted text-sm">
                Reserva tu cupo en los encuentros que sucederán pronto.
              </p>
            </div>
            <span class="rounded-full bg-white px-4 py-1 text-sm text-primary/70 border border-primary/10">
              {{ upcomingEvents.length }} en agenda
            </span>
          </header>

          <div v-if="upcomingEvents.length" class="grid gap-8">
            <article
              v-for="event in upcomingEvents"
              :key="event.id"
              class="relative bg-white rounded-4xl shadow-lg shadow-primary/5 border border-primary/10 overflow-hidden"
            >
              <div class="grid gap-8 lg:grid-cols-[2fr_3fr]">
                <div class="relative h-full">
                  <img
                    :src="event.image"
                    :alt="event.title"
                    class="object-cover w-full h-full min-h-[220px] lg:min-h-[260px]"
                  />
                  <span
                    class="absolute top-6 left-6 px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-[0.2em] text-white"
                    :class="event.priceType === 'free' ? 'bg-secondary-sanar' : 'bg-secondary-crecer'"
                  >
                    {{ event.priceType === 'free' ? 'Gratuito' : 'De pago' }}
                  </span>
                </div>

                <div class="p-8 flex flex-col gap-6">
                  <header class="space-y-3">
                    <div class="flex flex-wrap items-center gap-3 text-sm text-primary/70">
                      <span class="inline-flex items-center gap-2">
                        <svg class="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                          <line x1="16" y1="2" x2="16" y2="6" />
                          <line x1="8" y1="2" x2="8" y2="6" />
                          <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        {{ formatDate(event.startDate) }}
                      </span>
                      <span class="hidden w-px h-4 bg-primary/20 md:inline-block" aria-hidden="true"></span>
                      <span class="inline-flex items-center gap-2">
                        <svg class="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                          <circle cx="12" cy="12" r="9" />
                          <polyline points="12 7 12 12 15 15" />
                        </svg>
                        {{ formatTimeRange(event.startDate, event.endDate) }}
                      </span>
                      <span class="hidden w-px h-4 bg-primary/20 md:inline-block" aria-hidden="true"></span>
                      <span class="inline-flex items-center gap-2">
                        <svg class="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                          <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        {{ event.location }}
                      </span>
                    </div>
                    <NuxtLink :to="`/eventos/${event.id}`" class="group inline-block">
                      <h3 class="text-2xl font-semibold text-primary group-hover:text-secondary-crecer transition-colors">
                        {{ event.title }}
                      </h3>
                    </NuxtLink>
                    <p class="text-muted">
                      {{ event.shortDescription }}
                    </p>
                  </header>

                  <footer class="flex flex-wrap items-center justify-between gap-5 mt-auto">
                    <div class="flex items-center gap-3">
                      <img
                        v-if="event.host"
                        :src="event.host.avatar"
                        :alt="event.host.name"
                        class="w-12 h-12 rounded-full object-cover border border-primary/10"
                      />
                      <div>
                        <p class="text-sm font-semibold text-primary">
                          {{ event.host?.name || 'Equipo Rafael García' }}
                        </p>
                        <p class="text-xs text-muted">{{ event.host?.role || 'Facilitación' }}</p>
                      </div>
                    </div>
                    <div class="flex items-center gap-3 flex-wrap">
                      <span
                        v-if="event.priceLabel"
                        class="px-4 py-1 rounded-full bg-primary/5 text-sm text-primary border border-primary/10"
                      >
                        {{ event.priceLabel }}
                      </span>
                      <NuxtLink :to="`/eventos/${event.id}`" class="btn crecer">
                        <span>Ver detalle</span>
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                          <line x1="7" y1="17" x2="17" y2="7" />
                          <polyline points="7 7 17 7 17 17" />
                        </svg>
                      </NuxtLink>
                    </div>
                  </footer>
                </div>
              </div>
            </article>
          </div>
          <p v-else class="text-center text-muted py-10 bg-white/70 rounded-3xl border border-primary/10">
            No encontramos eventos próximos con los filtros actuales. Ajusta tu búsqueda o revisa los
            eventos pasados.
          </p>
        </section>

        <section class="mt-24 space-y-10">
          <header class="flex items-center justify-between flex-wrap gap-5">
            <div>
              <h2 class="text-2xl font-semibold text-primary">Eventos pasados</h2>
              <p class="text-muted text-sm">
                Revive los encuentros recientes y contáctanos para nuevas ediciones.
              </p>
            </div>
            <span class="rounded-full bg-white px-4 py-1 text-sm text-primary/70 border border-primary/10">
              {{ pastEvents.length }} encuentros realizados
            </span>
          </header>

          <div v-if="pastEvents.length" class="grid gap-8 md:grid-cols-2">
            <article
              v-for="event in pastEvents"
              :key="event.id"
              class="relative bg-white rounded-4xl shadow-lg shadow-primary/5 border border-primary/10 overflow-hidden flex flex-col"
            >
              <img
                :src="event.image"
                :alt="event.title"
                class="object-cover w-full h-52"
              />
              <div class="p-8 flex flex-col gap-4">
                <div class="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em] text-primary/60">
                  <span>{{ formatDate(event.startDate) }}</span>
                  <span class="w-1 h-1 rounded-full bg-primary/30" aria-hidden="true"></span>
                  <span>{{ event.format === 'online' ? 'Virtual' : 'Presencial' }}</span>
                  <span class="w-1 h-1 rounded-full bg-primary/30" aria-hidden="true"></span>
                  <span>{{ event.priceType === 'free' ? 'Gratuito' : 'De pago' }}</span>
                </div>
                <NuxtLink :to="`/eventos/${event.id}`" class="group inline-block">
                  <h3 class="text-xl font-semibold text-primary group-hover:text-secondary-crecer transition-colors">
                    {{ event.title }}
                  </h3>
                </NuxtLink>
                <p class="text-muted text-sm">
                  {{ event.shortDescription }}
                </p>
                <NuxtLink :to="`/eventos/${event.id}`" class="mt-auto inline-flex items-center gap-2 text-primary font-semibold">
                  <span>Ver resumen del evento</span>
                  <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </NuxtLink>
              </div>
            </article>
          </div>
          <p v-else class="text-center text-muted py-10 bg-white/70 rounded-3xl border border-primary/10">
            Aún no tenemos eventos pasados según tus filtros. ¡Pronto compartiremos más historias!
          </p>
        </section>
      </div>
    </section>
  </div>
</template>
