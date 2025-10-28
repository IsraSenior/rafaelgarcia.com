<script setup>
const config = useRuntimeConfig()
const store = useMainStore()
const { getTestimonials, getPosts } = useDirectus()
const { getAssetUrl, isUUID, isURL } = useDirectusAsset();

// Fetch testimonials from Directus
const { data: testimonials } = await useAsyncData('testimonials', () => getTestimonials())

// Fetch latest 3 blog posts from Directus
const { data: latestPosts } = await useAsyncData('latest-posts', () => getPosts({ limit: 3 }))

// SEO Meta Tags
useSeoMeta({
  title: 'Rafael García | Coach Ontológico y Comunicador Transformacional',
  description: 'Transforma tu crisis y recupera el rumbo de tu vida. Coach ontológico, comunicador y líder transformacional. Programa Camino Vital, talleres y conferencias en Colombia.',
  ogTitle: 'Rafael García | Coach Ontológico y Comunicador Transformacional',
  ogDescription: 'Transforma tu crisis y recupera el rumbo de tu vida. Convierte tus crisis en aprendizaje, sabiduría, sanación y crecimiento.',
  ogImage: `${config.public.siteUrl}/home-1.png`,
  ogUrl: config.public.siteUrl,
  ogType: 'website',
  ogLocale: 'es_CO',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Rafael García | Coach Ontológico y Comunicador Transformacional',
  twitterDescription: 'Transforma tu crisis y recupera el rumbo de tu vida. Programa Camino Vital, talleres y conferencias.',
  twitterImage: `${config.public.siteUrl}/home-1.png`,
  keywords: 'coach ontológico, desarrollo personal, liderazgo transformacional, comunicación efectiva, Camino Vital, talleres de crecimiento personal, Colombia, Rafael García, sanación emocional, equilibrio emocional',
})

useHead({
  htmlAttrs: {
    lang: 'es'
  },
  link: [
    {
      rel: 'canonical',
      href: config.public.siteUrl
    }
  ]
})


const words = [
    "Respira con calma",
    "Aquí y ahora",
    "Observa sin juzgar",
    "Silencio interior profundo",
    "Mente en paz",
    "Gracias por todo",
    "Bendiciones diarias presentes",
    "Aprecio este momento",
    "Valorar lo pequeño",
    "Amor y gratitud",
    "Sana con amor",
    "Libera tus cargas",
    "Abraza tu dolor",
    "Reconstruyete con paciencia",
    "Escucha tu alma",
    "Equilibrio en ti",
    "Calma tus pensamientos",
    "Centro en paz",
    "Fluir sin resistir",
    "Raíces bien firmes",
    "Crece cada día",
    "Aprende y evoluciona",
    "Conócete a ti",
    "Sueña sin miedo",
    "Transforma tu vida",
];
</script>

<template>
    <div>
        <section class="mt-16 md:mt-24 lg:mt-32">
            <div class="container mx-auto rounded-[40px] bg-white mt-5 md:mt-10 py-12 md:py-16 lg:py-24 px-5 md:px-10 lg:px-20 relative">
                <div class="flex flex-col lg:flex-row">
                    <div class="max-w-2xl space-y-5 relative z-10">
                        <h1 class="title title--headline text-primary font-normal !text-3xl md:!text-4xl lg:!text-5xl">Transforma tu crisis y
                            recupera el <b><i>rumbo de tu vida <u class="decoration-secondary-crecer">con tus propios
                                        recursos</u></i></b></h1>
                        <p>Convierte tus crisis en aprendizaje, sabiduría, sanación y crecimiento</p>

                        <NuxtLink to="/servicios/camino-vital" class="mt-10 btn crecer">
                            <span>Comienza Tu Camino</span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                class="size-6">
                                <path fill-rule="evenodd"
                                    d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                                    clip-rule="evenodd" />
                            </svg>
                        </NuxtLink>
                    </div>
                    <img src="/home-1.png" alt=""
                        class="hidden lg:block aspect-square w-full overflow-hidden rounded-4xl object-cover group-hover:opacity-75 sm:aspect-2/3 absolute max-w-2xl right-10 xl:right-20 top-[-40px] h-[calc(100%+80px)] drop-shadow-2xl drop-shadow-muted">
                </div>
            </div>
        </section>

        <!-- <section class="py-16">
            <div class="container px-20 mx-auto">
                <p class="font-semibold">Empresas que confiaron en este camino:</p>

                <ul class="flex items-center justify-center mt-12 space-x-20">
                    <li class="w-1/5 transition-all duration-300 ease-in-out opacity-50 filter grayscale-100 hover:grayscale-0 hover:opacity-100"
                        v-for="(logo, index) in logos" :key="index">
                        <img class="object-contain object-center w-full h-20" :src="logo" alt="">
                    </li>
                </ul>
            </div>
        </section> -->

        <section class="py-16 overflow-x-hidden lg:py-32">
            <div class="container px-5 md:px-10 lg:px-20 mx-auto">
                <h2 class="max-w-3xl mx-auto text-center title title--headline text-primary">Encuentra el equilibrio y
                    <b><i>despliega <u class="decoration-secondary-crecer">tu potencial</u></i></b>
                </h2>

                <div class="space-y-20 md:space-y-40 lg:space-y-72 mt-20 md:mt-40 lg:mt-96">
                    <article class="relative flex flex-col lg:flex-row items-center justify-between w-full gap-5 md:gap-10">
                        <IllustrationLine1 class="hidden xl:block absolute left-0 -translate-y-1/2 -top-1/4 -translate-x-1/6"
                            color="text-white" />
                        <div
                            class="flex items-center justify-center px-6 md:px-10 lg:px-12 py-8 md:py-10 w-full lg:w-1/2 lg:order-1 bg-primary rounded-[40px]">
                            <div class="space-y-5">
                                <h3 class="text-white uppertitle">¿Para qué iniciar este camino?</h3>
                                <h4 class="text-white title title--headline">
                                    Conecta con tus recursos y
                                     <b><i><u class="decoration-secondary-crecer">vive con autonomía y propósito</u></i></b>
                                </h4>
                                <p class="text-white mt-8">Con la combinación de mi experiencia personal y clínica, te
                                    ofrezco una guía profunda que integra conocimiento, práctica y vivencia para
                                    acompañarte en tu transformación personal y profesional.
                                </p>
                                <NuxtLink to="/equipo" class="mt-10 btn crecer">
                                    <span>Descubre más</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                        class="size-6">
                                        <path fill-rule="evenodd"
                                            d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </NuxtLink>
                            </div>
                        </div>
                        <div class="w-full lg:w-1/2">
                            <img src="/home-2.png" alt=""
                                class="object-cover w-full overflow-hidden aspect-square rounded-4xl group-hover:opacity-75 sm:aspect-5/4 drop-shadow-2xl drop-shadow-muted">
                        </div>
                    </article>

                    <article class="relative flex flex-col lg:flex-row items-center justify-between w-full gap-5 md:gap-10">
                        <IllustrationLine2 class="hidden xl:block absolute top-0 right-0 translate-x-full -translate-y-full"
                            color="text-white" />
                        <div class="flex items-center w-full lg:w-1/2 bg-white rounded-[40px] px-6 md:px-10 lg:px-12 py-8 md:py-10">
                            <div class="space-y-5">
                                <h3 class="uppertitle">Hecho para ti</h3>
                                <h4 class="title title--headline text-primary">
                                    Tu Camino hacia el <b><i>Bienestar y la Transformación</i></b>
                                </h4>
                                <p class="">Una gama de programas y talleres diseñados para acompañarte en tu
                                    viaje de desarrollo
                                    personal.</p>

                                <div class="mt-10 flex flex-col sm:flex-row gap-3 items-center sm:gap-5">
                                    <NuxtLink to="/servicios/camino-vital" class="btn sanar">
                                        <span>Camino Vital</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                            class="size-6">
                                            <path fill-rule="evenodd"
                                                d="M12.97 3.97 a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                                                clip-rule="evenodd" />
                                        </svg>
                                    </NuxtLink>
                                    <NuxtLink to="/servicios" class="link sanar">
                                        <span>Conoce mis talleres</span>
                                    </NuxtLink>
                                </div>
                            </div>
                        </div>
                        <div class="w-full lg:w-1/2 flex gap-5 md:gap-10 min-h-[300px] md:min-h-[400px] lg:min-h-[500px]">
                            <div class="self-end w-1/2">
                                <img src="/home-3.png" alt=""
                                    class="aspect-square max-h-[250px] md:max-h-[350px] lg:max-h-[450px] w-full overflow-hidden rounded-4xl object-cover group-hover:opacity-75 sm:aspect-1/2 drop-shadow-2xl drop-shadow-muted">
                            </div>
                            <div class="w-1/2">
                                <img src="/home-5.png" alt=""
                                    class="aspect-square max-h-[250px] md:max-h-[350px] lg:max-h-[450px] w-full overflow-hidden rounded-4xl object-cover group-hover:opacity-75 sm:aspect-1/2 drop-shadow-2xl drop-shadow-muted">
                            </div>
                        </div>
                    </article>

                    <article class="container mx-auto rounded-[40px] bg-primary mt-5 md:mt-10 py-12 md:py-16 lg:py-24 px-5 md:px-10 lg:px-20 relative">
                        <div class="flex flex-col lg:flex-row lg:justify-end items-center lg:items-start">
                            <div class="max-w-2xl lg:pl-10 xl:pl-20 space-y-5 relative z-10">
                                <h3 class="text-white uppertitle">Inicia ahora</h3>
                                <h4 class="text-white title title--headline">
                                    Descubre <br> <b><i>Tu Punto de Partida</i></b>
                                </h4>
                                <p class="text-white">Responde unas breves preguntas para identificar tus necesidades
                                    actuales y encontrar
                                    el programa perfecto para ti.</p>
                                <button @click="store.openOnboarding = true" class="mt-10 btn crecer">
                                    <span>Realizar el Test</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                        class="size-6">
                                        <path fill-rule="evenodd"
                                            d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                            <img src="/home-10.png" alt=""
                                class="hidden lg:block aspect-square w-full overflow-hidden rounded-4xl object-cover group-hover:opacity-75 sm:aspect-2/3 absolute max-w-lg left-10 xl:left-20 top-[-40px] h-[calc(100%+80px)] drop-shadow-xl drop-shadow-primary/5">
                        </div>
                    </article>

                    <!-- <article class="relative flex items-center justify-between w-full gap-10">
                        <IllustrationLine3 class="absolute left-0 -translate-x-full -translate-y-1/2 -top-1/4"
                            color="text-white" />
                        <div class="flex items-center h-full w-1/2 bg-white rounded-[40px] px-12 py-10 order-1">
                            <div class="space-y-5">
                                <h3 class="uppertitle">Inicia ahora</h3>
                                <h4 class="title title--headline text-primary">
                                    Descubre <br> <b><i>Tu Punto de Partida</i></b>
                                </h4>
                                <p>Responde unas breves preguntas para identificar tus necesidades actuales y encontrar
                                    el programa perfecto para ti.</p>
                                <button @click="store.openOnboarding = true" class="mt-10 btn crecer">
                                    <span>Realizar el Test</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                        class="size-6">
                                        <path fill-rule="evenodd"
                                            d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div class="w-1/2">
                            <img src="/home-10.png" alt=""
                                class="object-cover w-full overflow-hidden aspect-square rounded-4xl group-hover:opacity-75 sm:aspect-5/4 drop-shadow-2xl drop-shadow-muted">
                        </div>
                    </article> -->
                </div>
            </div>
        </section>

        <section clasS="py-16 md:py-32 bg-muted">
            <div class="container px-5 md:px-10 lg:px-20 mx-auto">
                <h2 class="max-w-3xl mx-auto text-center title title--headline text-primary">
                    Te acompaño desde una <b><i><u class="decoration-secondary-crecer">visión integral</u></i></b>
                </h2>
                <VideoPlayer class="mt-10 md:mt-16" />

            </div>
            <div class="flex mt-10 md:mt-16 overflow-hidden">
                <div class="flex items-center grow-0 shrink-0 basis-auto marquee">
                    <span v-for="(word, index) in words" :key="index"
                        class="block px-10 md:px-20 py-2 tracking-widest title title--element text-primary">{{ word }}</span>
                </div>
            </div>
        </section>

        <section clasS="py-16 md:py-32 bg-primary">
            <div class="container px-5 md:px-10 lg:px-20 mx-auto">
                <h2 class="text-center text-white title title--headline">
                    ¿Cómo funciona <b><i><u class="max-w-3xl mx-auto decoration-secondary-crecer">Camino
                                Vital</u></i></b> ?
                </h2>

                <div class="relative grid grid-cols-1 gap-10 md:gap-20 mt-10 md:mt-16 lg:grid-cols-2">
                    <!-- <img src="/ilustracion-spiral.svg"
                        class="absolute top-1/4 left-32 scale-x-[-1] -translate-y-1/2 -translate-x-full" /> -->
                    <div class="relative space-y-5">
                        <article class="flex p-10 space-x-10 bg-muted rounded-4xl">
                            <div>
                                <span class="title title--headline !text-secondary-estabilizar">1</span>
                            </div>
                            <div class="space-y-5">
                                <h5 class="title title--element">Módulo Estabilizar</h5>
                                <p>Recupera el equilibrio físico, emocional y mental. Aprende a cuidar tu energía y crea bases sólidas para tu bienestar.</p>
                            </div>
                        </article>
                        

                        <article class="flex p-10 space-x-10 bg-muted rounded-4xl">
                            <div>
                                <span class="title title--headline !text-secondary-sanar">2</span>
                            </div>
                            <div class="space-y-5">
                                <h5 class="title title--element">Módulo Sanar</h5>
                                <p>Libera bloqueos y sana heridas emocionales. Transforma el dolor en aprendizaje, sabiduría y autocompasión.</p>
                            </div>
                        </article>

                        <article class="flex p-10 space-x-10 bg-muted rounded-4xl">
                            <div>
                                <span class="title title--headline !text-secondary-crecer">3</span>
                            </div>
                            <div class="space-y-5">
                                <h5 class="title title--element">Módulo Crecer</h5>
                                <p>Expande tu potencial en las 6 dimensiones. Conecta con tu propósito y vive con claridad, confianza y sentido.</p>
                            </div>
                        </article>
                    </div>
                    <div>

                            <img src="/home-5.png" alt=""
                                    class="object-cover w-full overflow-hidden h-full rounded-4xl">
                    </div>

                    <div class="flex items-center justify-center md:col-span-2">
                        <NuxtLink to="/servicios/camino-vital" class="btn crecer">
                            <span>Comienza tu Camino Vital </span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                class="size-6">
                                <path fill-rule="evenodd"
                                    d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                                    clip-rule="evenodd" />
                            </svg>
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </section>

        <section clasS="py-16 md:py-32">
            <div class="container px-5 md:px-10 lg:px-20 mx-auto">
                <div class="space-y-4 text-center">
                    <h2 class="text-center title title--headline text-primary">
                        ¿Qué dicen <b><i><u class="decoration-secondary-crecer">las personas</u></i></b> que he acompañado?
                    </h2>
                    <!-- <p>Personas han confiado en mi metodología</p> -->
                </div>
            </div>

            <div class="mt-10 md:mt-16">
                <Carousel v-bind="{
                    itemsToShow: 1.2,
                    wrapAround: true,
                    gap: 20,
                    autoplay: 3000,
                    breakpoints: {
                        640: { itemsToShow: 1.5, gap: 25 },
                        768: { itemsToShow: 2.2, gap: 30 },
                        1024: { itemsToShow: 3.5, gap: 40 }
                    }
                }">
                    <Slide v-for="(testimonial, index) in testimonials" :key="index">
                        <figure class="px-10 py-10 space-x-10 space-y-5 text-center bg-white rounded-4xl">
                            <blockquote class="w-full">
                                <p class="!text-primary text-base"> {{ testimonial?.quote }} </p>
                            </blockquote>
                            <figcaption class="flex items-center justify-center mt-10 gap-x-6">
                                <img class="rounded-full size-14 bg-gray-50" :src="getAssetUrl(testimonial?.image)" :alt="testimonial?.name">
                                <div class="text-base text-left">
                                    <div class="paragrpah !text-primary !font-literata">{{testimonial?.name}}</div>
                                    <div class="mt-1 paragraph !text-sm">{{testimonial?.role}}</div>
                                </div>
                            </figcaption>
                        </figure>
                    </Slide>

                    <template #addons>
                        <!-- <Navigation /> -->
                        <!-- <Pagination /> -->
                    </template>
                </Carousel>
            </div>
        </section>

        <section class="py-16 md:py-32">
            <div class="container mx-auto">
                <div class="p-5 md:p-10 bg-primary rounded-4xl">
                    <article class="relative min-h-[40vh] md:min-h-[50vh] lg:min-h-[60vh] flex items-center justify-start px-5 md:px-10 lg:px-20">
                        <img src="/home-1-7.webp" alt=""
                            class="absolute inset-0 object-cover object-center w-full h-full overflow-hidden rounded-4xl">

                        <div class="relative max-w-lg space-y-5">
                            <h2 class="text-left text-white title title--headline">
                                ¿Te encuentras <b><i>desbordado</i></b>?
                            </h2>

                            <p class="!text-white">
                                Da el primer paso hacia tu estabilidad emocional encontrando la armonía interior y
                                recuperando
                                la calma en tu mente.
                            </p>

                            <NuxtLink to="/servicios/camino-vital" class="mt-10 btn sanar">
                                <span>Módulo Estabilizar</span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                    class="size-6">
                                    <path fill-rule="evenodd"
                                        d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                                        clip-rule="evenodd" />
                                </svg>
                            </NuxtLink>
                        </div>
                    </article>

                    <div class="grid grid-cols-1 px-5 md:px-10 lg:px-20 pt-10 divide-y md:divide-y-0 md:divide-x-2 md:grid-cols-3 divide-dashed divide-muted">
                        <!-- <div class="space-y-5 text-center">
                            <p class="text-white title title--headline">10</p>
                            <p class="text-white title title--element">Therapists</p>
                        </div> -->

                        <div class="space-y-5 text-center py-5 md:py-0">
                            <p class="text-white title title--headline">6</p>
                            <p class="text-white title title--element">Especialistas</p>
                        </div>

                        <div class="space-y-5 text-center py-5 md:py-0">
                            <p class="text-white title title--headline">5</p>
                            <p class="text-white title title--element">Servicios</p>
                        </div>

                        <div class="space-y-5 text-center py-5 md:py-0">
                            <p class="text-white title title--headline">1</p>
                            <p class="text-white title title--element">Ubicación</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="py-16 md:py-24">
            <div class="container px-5 md:px-10 lg:px-20 mx-auto">
                <div class="space-y-4 text-center">
                    <h2 class="text-center title title--headline text-primary">
                        Inspiración para <b><i><u class="decoration-secondary-crecer">tu transformación</u></i></b>
                    </h2>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 mt-10 md:mt-16">
                    <BlogTeaser
                        v-for="post in latestPosts"
                        :key="post.id"
                        :image="post.featured_image || '/vista-frontal-mujer-meditando-en-estera.jpg'"
                        :title="post.title"
                        :slug="post.slug"
                        :excerpt="post.excerpt"
                        :date="post.date_published"
                        :reading-time="post.reading_time"
                    />
                </div>

                <div class="flex items-center justify-center mt-20 md:col-span-2">
                    <NuxtLink to="/blog" class="btn crecer">
                        <span>Ver más</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                            <path fill-rule="evenodd"
                                d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                                clip-rule="evenodd" />
                        </svg>
                    </NuxtLink>
                </div>
            </div>
        </section>

        <section class="py-16 md:pt-24 md:pb-32">
            <div class="container px-5 md:px-10 lg:px-20 mx-auto">
                <article class="relative grid w-full grid-cols-1 gap-10 md:gap-20 lg:grid-cols-2">
                    <div class="relative">
                        <div class="sticky flex items-center top-10">
                            <div class="space-y-5">
                                <h3 class="uppertitle">¿Tienes alguna duda?</h3>
                                <h4 class="title title--headline text-primary">
                                    Preguntas <b><i><u class="decoration-secondary-crecer">frecuentes</u></i></b>
                                </h4>

                                <div class="relative mt-16 isolate">
                                    <img src="/home-4.png" alt=""
                                        class="object-cover w-full overflow-hidden aspect-square rounded-4xl group-hover:opacity-75 sm:aspect-5/4 drop-shadow-2xl drop-shadow-muted">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="">
                        <FAQs />
                    </div>
                </article>
            </div>
        </section>

        <EndSection />
    </div>
</template>