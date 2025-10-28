<script setup>
import { computed } from 'vue'

const props = defineProps({
  error: Object
})

const statusCode = computed(() => props.error?.statusCode || 500)
const statusMessage = computed(() => props.error?.statusMessage || 'Error interno del servidor')

const is404 = computed(() => statusCode.value === 404)

const title = computed(() => {
  if (is404.value) {
    return 'Página no encontrada'
  }
  return 'Algo salió mal'
})

const description = computed(() => {
  if (is404.value) {
    return 'La página que buscas no existe o ha sido movida. Te invitamos a explorar nuestro contenido desde la página principal.'
  }
  return 'Ocurrió un error inesperado. Nuestro equipo ha sido notificado y estamos trabajando para resolverlo.'
})

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="gradient-muted min-h-screen flex items-center justify-center px-5">
    <div class="container mx-auto lg:px-20">
      <div class="max-w-4xl mx-auto">
        <article class="bg-white rounded-4xl shadow-xl shadow-primary/10 border border-primary/10 overflow-hidden">
          <div class="grid gap-0 lg:grid-cols-2">
            <div class="relative bg-gradient-to-br from-secondary-sanar/20 to-secondary-crecer/20 flex items-center justify-center p-12 lg:p-16">
              <div class="text-center space-y-8">
                <div class="relative flex items-center justify-center">
                  <div class="absolute inset-0 flex items-center justify-center">
                    <div class="w-40 h-40 md:w-56 md:h-56 rounded-full bg-white/30 backdrop-blur-sm"></div>
                  </div>
                  <div class="relative z-10 flex flex-col items-center gap-6">
                    <svg
                      v-if="is404"
                      class="w-24 h-24 md:w-32 md:h-32 text-secondary-sanar"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
                      <line x1="9" y1="9" x2="9.01" y2="9" />
                      <line x1="15" y1="9" x2="15.01" y2="9" />
                    </svg>
                    <svg
                      v-else
                      class="w-24 h-24 md:w-32 md:h-32 text-secondary-crecer"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                      <line x1="12" y1="9" x2="12" y2="13" />
                      <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                    <span class="text-6xl md:text-7xl font-bold text-primary tracking-tight">
                      {{ statusCode }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div class="p-8 md:p-12 flex flex-col gap-8 justify-center">
              <header class="space-y-4">
                <h1 class="title title--headline text-primary text-3xl md:text-4xl">
                  {{ title }}
                </h1>
                <p class="text-paragraph text-base md:text-lg">
                  {{ description }}
                </p>
              </header>

              <div class="space-y-4">
                <p class="text-sm text-primary/60 uppercase tracking-[0.3em]">
                  ¿Qué puedes hacer?
                </p>
                <div class="space-y-3">
                  <NuxtLink
                    to="/"
                    class="flex items-center gap-3 p-4 rounded-2xl bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-colors group"
                  >
                    <svg class="w-5 h-5 text-primary group-hover:text-secondary-crecer transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                      <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                    <div>
                      <p class="text-sm font-semibold text-primary">Ir a inicio</p>
                      <p class="text-xs text-primary">Explora desde la página principal</p>
                    </div>
                  </NuxtLink>

                  <NuxtLink
                    to="/eventos"
                    class="flex items-center gap-3 p-4 rounded-2xl bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-colors group"
                  >
                    <svg class="w-5 h-5 text-primary group-hover:text-secondary-crecer transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    <div>
                      <p class="text-sm font-semibold text-primary">Ver eventos</p>
                      <p class="text-xs text-primary">Descubre próximos encuentros</p>
                    </div>
                  </NuxtLink>

                  <NuxtLink
                    to="/servicios"
                    class="flex items-center gap-3 p-4 rounded-2xl bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-colors group"
                  >
                    <svg class="w-5 h-5 text-primary group-hover:text-secondary-crecer transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                      <path d="M12 2L2 7l10 5 10-5-10-5z" />
                      <path d="M2 17l10 5 10-5" />
                      <path d="M2 12l10 5 10-5" />
                    </svg>
                    <div>
                      <p class="text-sm font-semibold text-primary">Explorar servicios</p>
                      <p class="text-xs text-primary">Conoce nuestros programas</p>
                    </div>
                  </NuxtLink>

                  <NuxtLink
                    to="/contacto"
                    class="flex items-center gap-3 p-4 rounded-2xl bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-colors group"
                  >
                    <svg class="w-5 h-5 text-primary group-hover:text-secondary-crecer transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    <div>
                      <p class="text-sm font-semibold text-primary">Contactar</p>
                      <p class="text-xs text-primary">Escríbenos para ayudarte</p>
                    </div>
                  </NuxtLink>
                </div>
              </div>

              <footer class="pt-6 border-t border-primary/10">
                <button
                  @click="handleError"
                  class="btn crecer w-full justify-center"
                >
                  <span>Volver al inicio</span>
                  <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </footer>
            </div>
          </div>
        </article>

        <div class="mt-8 text-center">
          <p class="text-sm text-primary/60">
            Si necesitas ayuda adicional,
            <NuxtLink to="/contacto" class="underline hover:text-secondary-crecer transition-colors">
              contáctanos aquí
            </NuxtLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
