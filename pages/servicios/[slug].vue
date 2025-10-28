<script setup>
const route = useRoute()
const { getServiceBySlug, getCaminoVitalModules } = useDirectus()
const { getAssetUrl, isUUID, isURL } = useDirectusAsset()

// Obtener el servicio por slug
const { data: service, error } = await useAsyncData(
  `service-${route.params.slug}`,
  () => getServiceBySlug(route.params.slug)
)

if (!service.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Service not found'
  })
}

// Determinar el tipo de servicio
const isCaminoVital = computed(() => service.value?.type === 'camino-vital')
const isSimpleService = computed(() => ['service', 'workshop'].includes(service.value?.type))

// Obtener módulos si es Camino Vital
const { data: modules } = await useAsyncData(
  'camino-vital-modules',
  () => isCaminoVital.value ? getCaminoVitalModules() : Promise.resolve([])
)

// Función para obtener URL de imagen
const getImageUrl = (image) => {
  if (!image) return '/home-10.png'
  if (isUUID(image)) {
    return getAssetUrl(image, { width: 800, quality: 80 })
  }
  if (isURL(image)) {
    return image
  }
  return '/home-10.png'
}

const isDirectusImage = (image) => isUUID(image)

const config = useRuntimeConfig()
const cleanDescription = service.value.description?.replace(/<[^>]*>/g, '').substring(0, 160) || ''

// SEO Meta
useSeoMeta({
  title: `${service.value.title} | Rafael García`,
  description: cleanDescription,
  ogTitle: `${service.value.title} | Rafael García`,
  ogDescription: cleanDescription,
  ogImage: getImageUrl(service.value.featured_image),
  ogUrl: `${config.public.siteUrl}/servicios/${service.value.slug}`,
  ogType: 'article',
  ogLocale: 'es_CO',
  twitterCard: 'summary_large_image',
  twitterTitle: `${service.value.title} | Rafael García`,
  twitterDescription: cleanDescription,
  twitterImage: getImageUrl(service.value.featured_image),
  keywords: `${service.value.title}, desarrollo personal, transformación, coaching ontológico, Rafael García, Colombia`
})

useHead({
  htmlAttrs: {
    lang: 'es'
  },
  link: [
    {
      rel: 'canonical',
      href: `${config.public.siteUrl}/servicios/${service.value.slug}`
    }
  ]
})
</script>

<template>
  <div class="gradient-muted">

    <!-- LAYOUT SIMPLE: Para services y workshops -->
    <section v-if="isSimpleService" class="py-16">
      <div class="container px-5 mx-auto lg:px-20">
        <article class="grid grid-cols-1 gap-10 lg:gap-20 lg:grid-cols-5">
          <!-- Imagen lateral -->
          <div class="relative lg:col-span-2">
            <div class="flex items-center lg:sticky lg:top-32">
              <div class="space-y-5">
                <div class="relative mt-16 isolate">
                  <NuxtImg
                    v-if="isDirectusImage(service.featured_image)"
                    provider="directus"
                    :src="`/assets/${service.featured_image}`"
                    :alt="service.title"
                    class="object-cover object-top w-full overflow-hidden lg:object-center aspect-square rounded-4xl group-hover:opacity-75 lg:aspect-3/4 drop-shadow-2xl drop-shadow-muted"
                    width="800"
                    height="1000"
                    quality="80"
                    loading="lazy"
                  />
                  <img
                    v-else
                    :src="getImageUrl(service.featured_image)"
                    :alt="service.title"
                    class="object-cover object-top w-full overflow-hidden lg:object-center aspect-square rounded-4xl group-hover:opacity-75 lg:aspect-3/4 drop-shadow-2xl drop-shadow-muted"
                    loading="lazy"
                  >
                </div>
              </div>
            </div>
          </div>

          <!-- Contenido -->
          <div class="lg:col-span-3">
            <section class="container px-4 py-16 mx-auto sm:px-6 lg:px-8">
              <div class="max-w-3xl mx-auto">
                <h3 class="uppertitle">Servicios</h3>
                <h1 class="title title--headline">{{ service.title }}</h1>

                <div class="mt-6 space-y-6 text-lg leading-relaxed content" v-html="service.description"></div>

                <!-- Beneficios -->
                <div v-if="service.benefits && service.benefits.length > 0" class="px-10 py-10 !text-white rounded-3xl bg-primary content my-16">
                  <h3 class="mb-8 font-medium title title--element">Beneficios principales:</h3>
                  <ul>
                    <li v-for="(item, index) in service.benefits" :key="index">
                      {{ item.benefit }}
                    </li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        </article>
      </div>
    </section>

    <!-- LAYOUT ESPECIAL: Para Camino Vital -->
    <section v-if="isCaminoVital" class="py-16">
      <div class="container px-5 mx-auto lg:px-20">
        <article class="grid grid-cols-1 gap-10 lg:gap-20 lg:grid-cols-7">
          <!-- Columna izquierda con video y beneficios -->
          <div class="relative lg:col-span-3">
            <VideoPlayer class="mt-16" :video-id="service.main_video" />

            <!-- Beneficios generales -->
            <div v-if="service.benefits && service.benefits.length > 0" class="px-10 py-10 !text-white rounded-3xl bg-primary content my-16">
              <h3 class="mb-8 font-medium title title--element">Beneficios de participar</h3>
              <ul>
                <li v-for="(item, index) in service.benefits" :key="index">
                  {{ item.benefit }}
                </li>
              </ul>
            </div>
          </div>

          <!-- Columna derecha con contenido principal -->
          <div class="lg:col-span-4">
            <section class="container px-4 py-16 mx-auto sm:px-6 lg:px-8">
              <div class="max-w-3xl mx-auto">
                <h3 class="uppertitle">Servicios</h3>
                <h1 class="title title--headline text-primary">Programa <b><i><u class="decoration-secondary-crecer">Camino Vital</u></i></b></h1>

                <div class="mt-10 space-y-6 text-lg leading-relaxed content" v-html="service.description"></div>
              </div>
            </section>
          </div>
        </article>

        <!-- Módulos (Estabilizar, Sanar, Crecer) -->
        <div v-if="modules && modules.length > 0" class="mt-16 space-y-16">
          <section
            v-for="(module, index) in modules"
            :key="index"
            class="grid items-start gap-10 lg:gap-40 lg:grid-cols-5 py-16"
            :class="{ 'lg:flex-row-reverse': index % 2 === 1 }"
          >
            <!-- Video y CTA -->
            <div class="lg:col-span-2" :class="{ 'order-1': index % 2 === 0, 'order-1 lg:order-2': index % 2 === 1 }">
              <VideoPlayerVertical class="mt-0 md:mt-16 mb-10" :video-id="module.video" />

              <div>
                <NuxtLink
                  :to="`/contacto?service=camino-vital&module=${module.slug}`"
                  class="btn justify-center w-full"
                  :class="module.color_class"
                >
                  <span>Empieza Ahora</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                    <path fill-rule="evenodd" d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                  </svg>
                </NuxtLink>
              </div>
            </div>

            <!-- Contenido del módulo -->
            <div class="space-y-6 lg:col-span-3" :class="{ 'order-2': index % 2 === 0, 'order-2 lg:order-1': index % 2 === 1 }">
              <h2 class="title title--headline text-3xl lg:text-4xl text-primary">
                Módulo <b><i><u :class="`decoration-secondary-${module.color_class}`">{{ module.name }}</u></i></b>
              </h2>

              <div class="content" v-html="module.description"></div>

              <!-- Beneficios del módulo -->
              <div v-if="module.benefits && module.benefits.length > 0" class="px-8 py-8 rounded-3xl bg-white mt-10">
                <h3 class="mb-6 font-medium title title--element text-primary">Beneficios</h3>
                <ul class="space-y-3 leading-relaxed list-disc list-inside" :class="`marker:text-secondary-${module.color_class}`">
                  <li v-for="(benefit, benefitIndex) in module.benefits" :key="benefitIndex">
                    {{ benefit.benefit }}
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>

    <!-- EndSection para Camino Vital -->
    <EndSection
      v-if="isCaminoVital"
      variant="cta"
      title='Camino Vital <b><i>es un proceso que<u class="decoration-secondary-crecer"> honra tu ritmo y tus necesidades.</u></i></b>'
      description="Te acompaña a estabilizar lo que duele, sanar lo que limita y crecer hacia la vida que quieres habitar, integrando tu ser en todas sus dimensiones."
      image="/home-11.png"
      button-text="Inicia ahora"
      :open-onboarding="true"
    />

    <!-- EndSection para servicios y talleres -->
    <EndSection
      v-if="isSimpleService"
      variant="cta"
      :title="`¿Listo para comenzar tu proceso con <b><i><u class='decoration-secondary-crecer'>${service.title}</u></i></b>?`"
      description="Da el primer paso hacia tu bienestar y transformación personal. Agenda tu sesión o consulta disponibilidad."
      image="/home-11.png"
      button-text="Agenda ahora"
      :button-link="`/contacto?service=${service.slug}`"
    />
  </div>
</template>
