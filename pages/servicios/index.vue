<script setup>
const { getServices } = useDirectus()
const config = useRuntimeConfig()

// Obtener todos los servicios de Directus
const { data: allServices } = await useAsyncData(
  'services-index',
  () => getServices()
)

// Separar Camino Vital del resto
const caminoVital = computed(() =>
  allServices.value?.find(service => service.slug === 'camino-vital')
)

const otherServices = computed(() =>
  allServices.value?.filter(service => service.slug !== 'camino-vital') || []
)

// SEO Meta
useSeoMeta({
  title: 'Servicios de Transformación Personal | Rafael García',
  description: 'Programa Camino Vital, talleres de crecimiento personal, sesiones de coaching ontológico y consultoría en comunicación efectiva. Transforma tu vida con Rafael García.',
  ogTitle: 'Servicios de Transformación Personal | Rafael García',
  ogDescription: 'Programa Camino Vital, talleres de crecimiento personal, sesiones de coaching ontológico y consultoría en comunicación efectiva.',
  ogImage: `${config.public.siteUrl}/home-5.png`,
  ogUrl: `${config.public.siteUrl}/servicios`,
  ogType: 'website',
  ogLocale: 'es_CO',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Servicios de Transformación Personal | Rafael García',
  twitterDescription: 'Programa Camino Vital, talleres de crecimiento personal, sesiones de coaching ontológico y consultoría.',
  twitterImage: `${config.public.siteUrl}/home-5.png`,
  keywords: 'Camino Vital, programa de desarrollo personal, talleres de crecimiento, coaching ontológico, sesiones individuales, transformación personal, Colombia'
})

useHead({
  htmlAttrs: {
    lang: 'es'
  },
  link: [
    {
      rel: 'canonical',
      href: `${config.public.siteUrl}/servicios`
    }
  ]
})
</script>

<template>
    <div>
        <section class="gradient-muted py-16 md:pt-24 md:pb-32 relative">
        <div class="container mx-auto px-5 md:px-10 lg:px-20">
            <h2 class="title title--headline text-primary text-center max-w-3xl mx-auto">Inspiración para
                <b><i>para <br class="hidden lg:block"> <u class="decoration-secondary-crecer">tu
                            transformación"</u></i></b>
            </h2>

            <div class="mt-16 md:mt-24 lg:mt-32">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
                    <!-- Camino Vital destacado - ocupa 2-3 columnas en desktop -->
                    <ServicesTeaser
                        v-if="caminoVital"
                        :service="caminoVital"
                    />

                    <!-- Resto de servicios en grid normal -->
                    <ServicesTeaser
                        v-for="service in otherServices"
                        :key="service.id"
                        :service="service"
                    />
                </div>
            </div>
        </div>
    </section>
    <EndSection variant="subscribe" />
    </div>
</template>