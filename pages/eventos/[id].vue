<script setup lang="ts">
import { computed } from 'vue'
import { createError, useRoute } from '#imports'
import { eventsCatalog } from '~/data/events'
import type { EventItem } from '~/data/events'

const route = useRoute()
const currentEvent = computed<EventItem | undefined>(() =>
  eventsCatalog.find((event) => event.id === String(route.params.id))
)

if (!currentEvent.value) {
  throw createError({ statusCode: 404, statusMessage: 'Evento no encontrado' })
}

const isPastEvent = computed(() => new Date(currentEvent.value!.startDate) < new Date())

const formatFullDate = (iso: string) =>
  new Intl.DateTimeFormat('es-CO', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(iso))

const formatTimeRange = (startIso: string, endIso: string) => {
  const formatter = new Intl.DateTimeFormat('es-CO', {
    hour: '2-digit',
    minute: '2-digit',
  })
  return `${formatter.format(new Date(startIso))} — ${formatter.format(new Date(endIso))}`
}

const infoChips = computed(() => [
  {
    label: 'Modalidad',
    value: currentEvent.value!.format === 'online' ? 'Virtual' : 'Presencial',
  },
  {
    label: 'Ubicación',
    value: currentEvent.value!.location,
  },
  {
    label: 'Inversión',
    value:
      currentEvent.value!.priceType === 'free'
        ? 'Evento gratuito'
        : currentEvent.value!.priceLabel || 'Consulta valor',
  },
])

const registrationUrl = computed(
  () => currentEvent.value!.registrationUrl || '/contacto'
)

const ctaLabel = computed(() =>
  isPastEvent.value ? 'Solicitar próxima edición' : 'Reservar mi cupo'
)

const relatedEvents = computed(() =>
  eventsCatalog
    .filter((event) => event.id !== currentEvent.value!.id)
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
    .slice(0, 3)
)

const ctaIsExternal = computed(() => registrationUrl.value.startsWith('http'))
</script>

<template>
  <div class="gradient-muted min-h-screen pb-20">
    <section class="pt-20 pb-10 md:pt-28">
      <div class="container px-5 mx-auto lg:px-20">
        <NuxtLink
          to="/eventos"
          class="inline-flex items-center gap-2 text-primary hover:text-secondary-crecer transition-colors font-semibold"
        >
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Volver a eventos
        </NuxtLink>

        <article class="mt-12 bg-white rounded-4xl shadow-xl shadow-primary/10 border border-primary/10 overflow-hidden">
          <div class="grid gap-0 lg:grid-cols-[2fr_3fr]">
            <figure class="relative">
              <img
                :src="currentEvent.image"
                :alt="currentEvent.title"
                class="object-cover w-full h-full min-h-[260px] lg:min-h-[420px]"
              />
              <span
                class="absolute top-6 left-6 px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-[0.2em] text-white"
                :class="currentEvent.priceType === 'free' ? 'bg-secondary-sanar' : 'bg-secondary-crecer'"
              >
                {{ currentEvent.priceType === 'free' ? 'Gratuito' : 'De pago' }}
              </span>
              <span
                v-if="isPastEvent"
                class="absolute top-6 right-6 px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-[0.2em] bg-primary text-white"
              >
                Evento finalizado
              </span>
            </figure>

            <div class="p-8 md:p-12 flex flex-col gap-8">
              <header class="space-y-4">
                <p class="uppercase text-sm tracking-[0.3em] text-primary/60">
                  {{ formatFullDate(currentEvent.startDate) }}
                </p>
                <h1 class="title title--headline text-primary">
                  {{ currentEvent.title }}
                </h1>
                <p class="text-muted">
                  {{ currentEvent.shortDescription }}
                </p>
              </header>

              <div class="grid gap-4 md:grid-cols-3">
                <div
                  v-for="chip in infoChips"
                  :key="chip.label"
                  class="p-4 rounded-3xl bg-primary/5 border border-primary/10"
                >
                  <p class="text-xs uppercase tracking-[0.3em] text-primary/60">
                    {{ chip.label }}
                  </p>
                  <p class="text-sm font-semibold text-primary leading-snug mt-1">
                    {{ chip.value }}
                  </p>
                </div>
              </div>

              <div class="space-y-5">
                <h2 class="text-xl font-semibold text-primary">Lo que vivirás</h2>
                <p class="text-paragraph">
                  {{ currentEvent.description }}
                </p>
              </div>

              <div v-if="currentEvent.tags?.length" class="flex flex-wrap gap-3">
                <span
                  v-for="tag in currentEvent.tags"
                  :key="tag"
                  class="px-4 py-1 rounded-full bg-secondary-crecer/10 text-secondary-crecer text-sm border border-secondary-crecer/30"
                >
                  {{ tag }}
                </span>
              </div>

              <footer class="flex flex-wrap items-center justify-between gap-5 mt-auto">
                <div class="flex items-center gap-3">
                  <img
                    v-if="currentEvent.host"
                    :src="currentEvent.host.avatar"
                    :alt="currentEvent.host.name"
                    class="w-14 h-14 rounded-full object-cover border border-primary/10"
                  />
                  <div>
                    <p class="text-sm font-semibold text-primary">
                      {{ currentEvent.host?.name || 'Equipo Rafael García' }}
                    </p>
                    <p class="text-xs text-muted">
                      {{ currentEvent.host?.role || 'Facilitación del evento' }}
                    </p>
                  </div>
                </div>

                <div class="flex items-center gap-3 flex-wrap">
                  <span class="px-4 py-2 rounded-full bg-primary/5 text-sm text-primary border border-primary/10">
                    {{ formatTimeRange(currentEvent.startDate, currentEvent.endDate) }}
                  </span>
                  <NuxtLink v-if="!ctaIsExternal" :to="registrationUrl" class="btn crecer">
                    <span>{{ ctaLabel }}</span>
                    <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </NuxtLink>
                  <a
                    v-else
                    :href="registrationUrl"
                    target="_blank"
                    rel="noopener"
                    class="btn crecer"
                  >
                    <span>{{ ctaLabel }}</span>
                    <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </a>
                </div>
              </footer>
            </div>
          </div>
        </article>
      </div>
    </section>

    <section class="mt-16">
      <div class="container px-5 mx-auto lg:px-20">
        <header class="max-w-3xl space-y-3">
          <p class="uppercase text-sm tracking-[0.3em] text-primary/60">Sigue explorando</p>
          <h2 class="text-2xl font-semibold text-primary">
            Otros eventos de la agenda
          </h2>
        </header>

        <div class="mt-10 grid gap-8 md:grid-cols-3">
          <NuxtLink
            v-for="event in relatedEvents"
            :key="event.id"
            :to="`/eventos/${event.id}`"
            class="group bg-white rounded-3xl shadow-lg shadow-primary/5 border border-primary/10 overflow-hidden flex flex-col"
          >
            <img
              :src="event.image"
              :alt="event.title"
              class="object-cover w-full h-48"
            />
            <div class="p-6 space-y-3 flex flex-col">
              <div class="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.3em] text-primary/60">
                <span>{{ formatFullDate(event.startDate) }}</span>
                <span class="w-1 h-1 rounded-full bg-primary/30" aria-hidden="true"></span>
                <span>{{ event.format === 'online' ? 'Virtual' : 'Presencial' }}</span>
              </div>
              <h3 class="text-lg font-semibold text-primary group-hover:text-secondary-crecer transition-colors">
                {{ event.title }}
              </h3>
              <p class="text-sm text-muted">
                {{ event.shortDescription }}
              </p>
              <span class="mt-auto inline-flex items-center gap-2 text-primary font-semibold">
                <span>Ver detalles</span>
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
